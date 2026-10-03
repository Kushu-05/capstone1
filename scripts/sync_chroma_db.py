import sys
from pathlib import Path

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.database import SessionLocal
from backend.services.vector_index import get_knowledge_base

def main():
    print("Initializing Vector Knowledge Base...")
    kb = get_knowledge_base()
    print(f"Current chunks in cache: {len(kb.chunks_cache)}")
    
    db = SessionLocal()
    try:
        print("Synchronizing any unindexed SQLite documents into ChromaDB...")
        synced_count = kb.sync_database_documents(db)
        print(f"Sync complete. New documents indexed: {synced_count}")
        print(f"Total chunks now in persistent cache: {len(kb.chunks_cache)}")
        print(f"BM25 index ready: {kb.bm25_index is not None}")
    finally:
        db.close()

if __name__ == "__main__":
    main()
