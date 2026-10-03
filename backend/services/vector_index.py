import re
import math
import threading
from typing import List, Dict, Any, Tuple, Optional, Union
from collections import Counter
from backend.services.chunking_service import ChunkItem
from backend.config import settings
from backend.utils.logger import logger

# Lazy-loaded singletons
_embedding_lock = threading.Lock()
_embedding_model = None

_reranker_lock = threading.Lock()
_reranker_model = None

_chroma_lock = threading.Lock()
_chroma_client = None
_chroma_collection = None


def tokenize(text: str) -> List[str]:
    """Tokenize and normalize text into lowercase terms."""
    return re.findall(r"\b[a-zA-Z0-9_-]{2,}\b", text.lower())


def get_embedding_model():
    """Singleton getter for SentenceTransformers semantic embedding model."""
    global _embedding_model
    if _embedding_model is None:
        with _embedding_lock:
            if _embedding_model is None:
                try:
                    from sentence_transformers import SentenceTransformer
                    model_name = settings.EMBEDDING_MODEL_NAME
                    logger.info(f"Loading local semantic embedding model: '{model_name}' on {settings.EMBEDDING_DEVICE}")
                    _embedding_model = SentenceTransformer(model_name, device=settings.EMBEDDING_DEVICE)
                    logger.info(f"Semantic embedding model '{model_name}' loaded successfully.")
                except Exception as e:
                    logger.error(f"Failed to load SentenceTransformer model: {e}")
                    raise e
    return _embedding_model


def get_reranker_model():
    """Singleton getter for local CrossEncoder reranking model."""
    global _reranker_model
    if not settings.ENABLE_RERANKING:
        return None
    if _reranker_model is None:
        with _reranker_lock:
            if _reranker_model is None:
                try:
                    from sentence_transformers import CrossEncoder
                    model_name = settings.RERANKER_MODEL_NAME
                    logger.info(f"Loading local CrossEncoder reranker model: '{model_name}'")
                    _reranker_model = CrossEncoder(model_name)
                    logger.info(f"Reranker model '{model_name}' loaded successfully.")
                except Exception as e:
                    logger.warning(f"Could not load CrossEncoder reranker: {e}. Reranking will be bypassed.")
                    _reranker_model = None
    return _reranker_model


def get_chroma_collection():
    """Singleton getter for persistent ChromaDB collection."""
    global _chroma_client, _chroma_collection
    if _chroma_collection is None:
        with _chroma_lock:
            if _chroma_collection is None:
                try:
                    import chromadb
                    persist_path = str(settings.CHROMA_PERSIST_DIRECTORY)
                    logger.info(f"Initializing persistent ChromaDB client at: {persist_path}")
                    _chroma_client = chromadb.PersistentClient(path=persist_path)
                    _chroma_collection = _chroma_client.get_or_create_collection(
                        name=settings.CHROMA_COLLECTION_NAME,
                        metadata={"hnsw:space": "cosine"}
                    )
                    logger.info(f"ChromaDB collection '{settings.CHROMA_COLLECTION_NAME}' ready.")
                except Exception as e:
                    logger.error(f"Failed to initialize ChromaDB: {e}")
                    raise e
    return _chroma_collection


class LocalVectorKnowledgeBase:
    """
    Hybrid Vector Knowledge Base combining:
    1. Dense Semantic Retrieval via persistent ChromaDB & SentenceTransformers (multilingual-e5)
    2. Sparse Keyword Retrieval via BM25 Okapi (rank-bm25)
    3. Rank Fusion via Reciprocal Rank Fusion (RRF)
    4. Two-stage Neural Reranking via SentenceTransformers CrossEncoder
    Preserves exact backward-compatible API interface.
    """

    def __init__(self):
        self.chunks_cache: Dict[str, Dict[str, Any]] = {}
        self.bm25_corpus: List[Dict[str, Any]] = []
        self.bm25_index = None
        self._load_existing_from_chroma()

    def _load_existing_from_chroma(self):
        """Warm up local in-memory cache and BM25 index from persistent ChromaDB on startup."""
        try:
            col = get_chroma_collection()
            count = col.count()
            if count > 0:
                logger.info(f"Restoring {count} existing chunks from persistent ChromaDB collection...")
                existing = col.get(include=["documents", "metadatas"])
                ids = existing.get("ids", [])
                docs = existing.get("documents", [])
                metadatas = existing.get("metadatas", [])
                for i, chunk_id in enumerate(ids):
                    meta = metadatas[i] if i < len(metadatas) else {}
                    content = docs[i] if i < len(docs) else ""
                    item = {
                        "chunk_id": chunk_id,
                        "document_id": meta.get("document_id", ""),
                        "page_number": int(meta.get("page_number", 1)),
                        "section_title": meta.get("section_title", "General"),
                        "content": content,
                        "char_start": int(meta.get("char_start", 0)),
                        "char_end": int(meta.get("char_end", len(content))),
                        "token_estimate": int(meta.get("token_estimate", len(content.split())))
                    }
                    self.chunks_cache[chunk_id] = item
                self._rebuild_bm25_index()
                logger.info(f"ChromaDB cache warmed with {len(self.chunks_cache)} items.")
        except Exception as e:
            logger.warning(f"Could not warm up cache from ChromaDB on startup: {e}")

    def _rebuild_bm25_index(self):
        """Rebuild BM25Okapi index over active cached corpus."""
        self.bm25_corpus = list(self.chunks_cache.values())
        if not self.bm25_corpus:
            self.bm25_index = None
            return
        try:
            from rank_bm25 import BM25Okapi
            tokenized_corpus = [tokenize(item["content"]) for item in self.bm25_corpus]
            self.bm25_index = BM25Okapi(tokenized_corpus)
        except Exception as e:
            logger.warning(f"Failed to build BM25Okapi index: {e}")
            self.bm25_index = None

    def _format_passage(self, text: str) -> str:
        """Add model-specific prefix for passages if using e5 models."""
        if "e5" in settings.EMBEDDING_MODEL_NAME.lower():
            return f"passage: {text}"
        return text

    def _format_query(self, text: str) -> str:
        """Add model-specific prefix for queries if using e5 models."""
        if "e5" in settings.EMBEDDING_MODEL_NAME.lower():
            return f"query: {text}"
        return text

    def build_index(self, chunk_items: List[Any]) -> None:
        """
        Build and persist semantic embeddings and BM25 index for a set of document chunks.
        Prevents duplicate chunks by purging prior chunks belonging to the same document_id.
        """
        if not chunk_items:
            return

        formatted_chunks = [c.to_dict() if isinstance(c, ChunkItem) else dict(c) for c in chunk_items]
        doc_ids_to_clean = {c.get("document_id") for c in formatted_chunks if c.get("document_id")}

        # Deduplication: remove existing chunks for these documents first
        col = get_chroma_collection()
        for doc_id in doc_ids_to_clean:
            self.delete_document(doc_id)

        # Prepare lists for ChromaDB upsert
        ids = []
        documents = []
        metadatas = []
        passages_to_embed = []

        for c in formatted_chunks:
            chunk_id = str(c.get("chunk_id", f"chk_{len(self.chunks_cache)}"))
            content = c.get("content", "")
            ids.append(chunk_id)
            documents.append(content)
            passages_to_embed.append(self._format_passage(content))
            metadatas.append({
                "document_id": str(c.get("document_id", "")),
                "page_number": int(c.get("page_number", 1)),
                "section_title": str(c.get("section_title", "General")),
                "char_start": int(c.get("char_start", 0)),
                "char_end": int(c.get("char_end", len(content))),
                "token_estimate": int(c.get("token_estimate", len(content.split())))
            })
            self.chunks_cache[chunk_id] = {
                "chunk_id": chunk_id,
                "document_id": str(c.get("document_id", "")),
                "page_number": int(c.get("page_number", 1)),
                "section_title": str(c.get("section_title", "General")),
                "content": content,
                "char_start": int(c.get("char_start", 0)),
                "char_end": int(c.get("char_end", len(content))),
                "token_estimate": int(c.get("token_estimate", len(content.split())))
            }

        # Compute embeddings using local SentenceTransformer
        embed_model = get_embedding_model()
        embeddings = embed_model.encode(passages_to_embed, normalize_embeddings=True).tolist()

        # Persistent ChromaDB Upsert
        col.upsert(
            ids=ids,
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas
        )
        logger.info(f"Persisted {len(ids)} chunk embeddings into ChromaDB collection '{settings.CHROMA_COLLECTION_NAME}'.")

        # Update sparse BM25 index
        self._rebuild_bm25_index()

    def add_chunks(self, chunk_items: List[Any]) -> None:
        """Alias to build_index for incremental additions."""
        self.build_index(chunk_items)

    def is_document_indexed(self, document_id: str) -> bool:
        """Checks if any chunk for document_id exists in cache."""
        if not document_id:
            return False
        return any(c.get("document_id") == str(document_id) for c in self.chunks_cache.values())

    def ensure_document_indexed(self, document_id: str, chunk_items: List[Any]) -> bool:
        """
        Indexes document chunks only if they are not already in memory or ChromaDB.
        Avoids redundant embedding re-computation and cache thrashing.
        """
        if not document_id or not chunk_items:
            return False
        if self.is_document_indexed(document_id):
            return True
        logger.info(f"Document '{document_id}' not found in active vector index. Indexing {len(chunk_items)} chunks...")
        self.build_index(chunk_items)
        return True

    def sync_database_documents(self, db: Any) -> int:
        """
        Synchronizes documents from SQLite DocumentChunk table that are missing from ChromaDB.
        Safe, non-destructive backfill.
        """
        try:
            from backend.models.database_models import DocumentChunk
            all_chunks = db.query(DocumentChunk).all()
            missing_by_doc: Dict[str, List[Any]] = {}
            for c in all_chunks:
                if not self.is_document_indexed(c.document_id):
                    if c.document_id not in missing_by_doc:
                        missing_by_doc[c.document_id] = []
                    missing_by_doc[c.document_id].append({
                        "chunk_id": c.id,
                        "document_id": c.document_id,
                        "chunk_index": c.chunk_index,
                        "page_number": c.page_number,
                        "section_title": c.section_title,
                        "content": c.content,
                        "char_start": c.char_start,
                        "char_end": c.char_end,
                        "token_estimate": c.token_estimate
                    })
            if missing_by_doc:
                logger.info(f"Syncing {len(missing_by_doc)} missing documents into ChromaDB knowledge base...")
                total_synced = 0
                for doc_id, chunks in missing_by_doc.items():
                    self.build_index(chunks)
                    total_synced += len(chunks)
                logger.info(f"Successfully synced {total_synced} chunks across {len(missing_by_doc)} documents.")
                return len(missing_by_doc)
            return 0
        except Exception as e:
            logger.warning(f"Database document sync encountered an error: {e}")
            return 0

    def delete_document(self, document_id: str) -> None:
        """Deletes all chunks associated with a document_id from ChromaDB and BM25 index."""
        if not document_id:
            return
        try:
            col = get_chroma_collection()
            col.delete(where={"document_id": document_id})
        except Exception as e:
            logger.debug(f"ChromaDB delete where document_id='{document_id}': {e}")

        # Clean from in-memory cache
        to_del = [cid for cid, c in self.chunks_cache.items() if c.get("document_id") == document_id]
        for cid in to_del:
            self.chunks_cache.pop(cid, None)

        self._rebuild_bm25_index()

    # --------------------------------------------------------------------------
    # Retrieval Engines (Dense, Sparse, Hybrid RRF, Reranker)
    # --------------------------------------------------------------------------
    def _dense_search(self, query: str, top_k: int, document_ids: Optional[Union[str, List[str]]] = None) -> List[Tuple[str, float]]:
        """Dense semantic retrieval via ChromaDB and SentenceTransformers embeddings."""
        col = get_chroma_collection()
        embed_model = get_embedding_model()
        formatted_q = self._format_query(query)
        q_emb = embed_model.encode([formatted_q], normalize_embeddings=True).tolist()

        where_filter = None
        if document_ids:
            if isinstance(document_ids, (list, tuple, set)):
                doc_list = [str(d) for d in document_ids if d]
                if len(doc_list) == 1:
                    where_filter = {"document_id": doc_list[0]}
                elif len(doc_list) > 1:
                    where_filter = {"document_id": {"$in": doc_list}}
            else:
                where_filter = {"document_id": str(document_ids)}

        total_in_col = col.count()
        if total_in_col == 0:
            logger.info("[Dense-Retrieval] ChromaDB collection is empty.")
            return []

        # Bound n_results by matching chunks if filter is active
        if where_filter:
            target_ids = set(document_ids) if isinstance(document_ids, (list, tuple, set)) else {str(document_ids)}
            matching_count = sum(1 for c in self.chunks_cache.values() if c.get("document_id") in target_ids)
            max_avail = min(matching_count, total_in_col) if matching_count > 0 else total_in_col
        else:
            max_avail = total_in_col

        n_results = min(max(top_k * 3, 5), max(max_avail, 1))

        query_kwargs = {
            "query_embeddings": q_emb,
            "n_results": n_results,
            "include": ["metadatas", "documents", "distances"]
        }
        if where_filter:
            query_kwargs["where"] = where_filter

        try:
            res = col.query(**query_kwargs)
        except Exception as e:
            logger.warning(f"ChromaDB dense query failed: {e}")
            return []

        scored_ids: List[Tuple[str, float]] = []
        if res and res.get("ids") and len(res["ids"]) > 0:
            ids = res["ids"][0]
            distances = res["distances"][0] if res.get("distances") else [0.5] * len(ids)
            for cid, dist in zip(ids, distances):
                # In cosine space, cosine distance is 1 - cosine_similarity
                similarity = round(max(0.0, 1.0 - float(dist)), 4)
                scored_ids.append((cid, similarity))
        
        logger.info(f"[Retrieval-Dense] Query: '{query[:40]}' | Filter: {where_filter} | Returned {len(scored_ids)} dense candidates")
        return scored_ids

    def _sparse_search(self, query: str, top_k: int, document_ids: Optional[Union[str, List[str]]] = None) -> List[Tuple[str, float]]:
        """Sparse keyword retrieval via BM25 Okapi."""
        if not self.bm25_index or not self.bm25_corpus:
            return []

        q_tokens = tokenize(query)
        if not q_tokens:
            return []

        target_ids = None
        if document_ids:
            target_ids = set(document_ids) if isinstance(document_ids, (list, tuple, set)) else {str(document_ids)}

        scores = self.bm25_index.get_scores(q_tokens)
        scored_pairs: List[Tuple[str, float]] = []
        for i, score in enumerate(scores):
            chunk = self.bm25_corpus[i]
            if target_ids and chunk.get("document_id") not in target_ids:
                continue
            if score > 0:
                scored_pairs.append((chunk["chunk_id"], float(score)))

        scored_pairs.sort(key=lambda x: x[1], reverse=True)
        top_sparse = scored_pairs[:top_k * 3]
        logger.info(f"[Retrieval-Sparse] Query: '{query[:40]}' | Tokens: {q_tokens[:5]} | Filter: {document_ids} | Returned {len(top_sparse)} BM25 candidates")
        return top_sparse

    def search(
        self,
        query: str,
        top_k: int = 5,
        document_id: Optional[Union[str, List[str]]] = None,
        document_ids: Optional[Union[str, List[str]]] = None
    ) -> List[Dict[str, Any]]:
        """
        Search knowledge base for chunks most relevant to query.
        Implements Hybrid Retrieval (Dense ChromaDB + Sparse BM25 via RRF) and Neural Reranking.
        """
        target_docs = document_ids or document_id
        target_set = None
        if target_docs:
            target_set = set(target_docs) if isinstance(target_docs, (list, tuple, set)) else {str(target_docs)}

        if not query.strip() or not self.chunks_cache:
            # Fallback if no query or empty
            matching = [c for c in self.chunks_cache.values() if not target_set or c.get("document_id") in target_set]
            return matching[:top_k]

        mode = (settings.RETRIEVAL_MODE or "hybrid").lower().strip()
        candidate_ids: List[str] = []
        initial_scores: Dict[str, float] = {}

        if mode == "dense":
            dense_pairs = self._dense_search(query, top_k=top_k, document_ids=target_docs)
            candidate_ids = [cid for cid, _ in dense_pairs]
            initial_scores = {cid: score for cid, score in dense_pairs}

        elif mode == "sparse":
            sparse_pairs = self._sparse_search(query, top_k=top_k, document_ids=target_docs)
            candidate_ids = [cid for cid, _ in sparse_pairs]
            initial_scores = {cid: score for cid, score in sparse_pairs}

        else:
            # Hybrid Retrieval: ChromaDB Dense + BM25 Sparse with Reciprocal Rank Fusion (RRF)
            dense_pairs = self._dense_search(query, top_k=top_k * 2, document_ids=target_docs)
            sparse_pairs = self._sparse_search(query, top_k=top_k * 2, document_ids=target_docs)

            rrf_k = settings.RRF_K
            rrf_scores: Dict[str, float] = Counter()

            for rank, (cid, _) in enumerate(dense_pairs, start=1):
                rrf_scores[cid] += 1.0 / (rrf_k + rank)

            for rank, (cid, _) in enumerate(sparse_pairs, start=1):
                rrf_scores[cid] += 1.0 / (rrf_k + rank)

            sorted_rrf = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
            candidate_ids = [cid for cid, _ in sorted_rrf]
            # Normalize RRF scores to 0.0 - 1.0 range
            max_rrf = sorted_rrf[0][1] if sorted_rrf else 1.0
            initial_scores = {cid: round(score / max_rrf, 4) for cid, score in sorted_rrf}
            logger.info(f"[Retrieval-Hybrid] Dense candidates: {len(dense_pairs)} | Sparse candidates: {len(sparse_pairs)} | Combined RRF: {len(candidate_ids)}")

        # If no candidates found through hybrid/dense, fall back to any chunks matching doc_id
        if not candidate_ids:
            matching = [c for c in self.chunks_cache.values() if not target_set or c.get("document_id") in target_set]
            for c in matching[:top_k]:
                candidate_ids.append(c["chunk_id"])
                initial_scores[c["chunk_id"]] = 0.5
            logger.info(f"[Retrieval-Fallback] No search candidates found. Using {len(candidate_ids)} fallback chunks matching document.")

        # Take candidates for possible reranking (up to top_k * 2)
        top_candidates = [self.chunks_cache[cid] for cid in candidate_ids if cid in self.chunks_cache][:max(top_k * 2, top_k)]

        # Two-stage Neural Reranking via SentenceTransformers CrossEncoder
        reranker = get_reranker_model()
        if reranker and len(top_candidates) > 1:
            try:
                pairs = [[query, c["content"]] for c in top_candidates]
                cross_scores = reranker.predict(pairs)
                for idx, c in enumerate(top_candidates):
                    raw_s = float(cross_scores[idx])
                    # Calibrated sigmoid normalization strictly preserving rank
                    norm_score = 1.0 / (1.0 + math.exp(-raw_s))
                    c_dict = dict(c)
                    c_dict["similarity_score"] = round(norm_score, 4)
                    top_candidates[idx] = c_dict

                top_candidates.sort(key=lambda x: x["similarity_score"], reverse=True)
                top_results = top_candidates[:top_k]
                logger.info(f"[Retrieval-Rerank] Reranked {len(top_candidates)} candidates with CrossEncoder. Top score: {top_results[0]['similarity_score']} (chunk: {top_results[0]['chunk_id']})")
                return top_results
            except Exception as e:
                logger.warning(f"Reranking encountered an issue: {e}. Falling back to hybrid fusion scores.")

        # Default: Use hybrid/initial scores
        results = []
        for c in top_candidates[:top_k]:
            item = dict(c)
            item["similarity_score"] = initial_scores.get(item["chunk_id"], 0.75)
            results.append(item)
        logger.info(f"[Retrieval-Final] Returning {len(results)} chunks. Top score: {results[0]['similarity_score'] if results else 0.0}")
        return results

    def get_chunk_by_id(self, chunk_id: str) -> Optional[Dict[str, Any]]:
        """Fetch chunk by chunk_id from cache or ChromaDB."""
        if chunk_id in self.chunks_cache:
            return dict(self.chunks_cache[chunk_id])

        try:
            col = get_chroma_collection()
            res = col.get(ids=[chunk_id], include=["documents", "metadatas"])
            if res and res.get("ids") and len(res["ids"]) > 0:
                doc = res["documents"][0] if res.get("documents") else ""
                meta = res["metadatas"][0] if res.get("metadatas") else {}
                item = {
                    "chunk_id": chunk_id,
                    "document_id": meta.get("document_id", ""),
                    "page_number": int(meta.get("page_number", 1)),
                    "section_title": meta.get("section_title", "General"),
                    "content": doc,
                    "char_start": int(meta.get("char_start", 0)),
                    "char_end": int(meta.get("char_end", len(doc))),
                    "token_estimate": int(meta.get("token_estimate", len(doc.split())))
                }
                self.chunks_cache[chunk_id] = item
                return item
        except Exception as e:
            logger.debug(f"Could not fetch chunk '{chunk_id}' from ChromaDB: {e}")

        return None


# ------------------------------------------------------------------------------
# Global Singleton & Transparent Backward-Compatible Proxy
# ------------------------------------------------------------------------------
_kb_singleton_lock = threading.Lock()
_kb_singleton_instance: Optional[LocalVectorKnowledgeBase] = None

def get_knowledge_base() -> LocalVectorKnowledgeBase:
    """Thread-safe singleton getter for the active LocalVectorKnowledgeBase."""
    global _kb_singleton_instance
    if _kb_singleton_instance is None:
        with _kb_singleton_lock:
            if _kb_singleton_instance is None:
                _kb_singleton_instance = LocalVectorKnowledgeBase()
    return _kb_singleton_instance

class _KnowledgeBaseProxy:
    """Transparent proxy delegating to singleton get_knowledge_base()."""
    def __getattr__(self, name: str) -> Any:
        return getattr(get_knowledge_base(), name)

global_knowledge_base = _KnowledgeBaseProxy()

