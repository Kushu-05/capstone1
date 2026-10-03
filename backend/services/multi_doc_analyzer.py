import re
from typing import List, Dict, Any, Set, Tuple
from collections import Counter
from backend.services.vector_index import tokenize
from backend.utils.logger import logger

COMMON_STOP_WORDS = {
    "what", "when", "where", "which", "who", "whom", "whose", "why", "how",
    "give", "tell", "show", "explain", "summarize", "summary", "briefing",
    "words", "tokens", "detailed", "medium", "small", "short", "about",
    "with", "this", "that", "from", "into", "does", "have", "been", "will",
    "would", "could", "should", "please", "can", "you", "the", "and", "for",
    "are", "was", "were", "has", "had", "having", "section", "page", "report",
    "document", "their", "there", "they", "them", "these", "those", "such",
    "than", "then", "also", "each", "more", "most", "other", "some", "only"
}

def infer_document_domain(name: str, sections: List[str], full_text: str) -> str:
    """Infers a human-readable thematic domain for a document based on its name and content."""
    sample_text = f"{name} " + " ".join(sections[:10]) + " " + full_text[:10000]
    sample_lower = sample_text.lower()
    words = [w for w in tokenize(sample_text) if len(w) > 3 and w not in COMMON_STOP_WORDS]
    counts = Counter(words)
    top_words = [w for w, _ in counts.most_common(20)]
    top_set = set(top_words)

    # 1. Company / Corporate Annual Reporting & Longitudinal Reports
    is_annual_report = any(term in sample_lower for term in ["annual report", "10-k", "form 10-k", "shareholders", "fiscal year", "form 10-q", "annualreport"])
    has_finance_terms = any(k in top_set for k in ["revenue", "financial", "income", "operating", "cash", "diluted", "share", "shares", "assets", "cloud", "segment"]) or any(term in sample_lower for term in ["consolidated balance sheets", "income statements", "cash flows", "financial operations"])

    # Check for prominent corporate entities (e.g. Microsoft)
    if "microsoft" in sample_lower or "msft" in sample_lower:
        if is_annual_report or has_finance_terms:
            return "Microsoft Corporate & Financial Reporting"
        return "Microsoft Technology & Enterprise Ecosystem"

    if is_annual_report or (has_finance_terms and any(k in top_set for k in ["finance", "fiscal", "revenue", "budget", "expenditure", "audit", "accounting", "cost"])):
        return "Corporate Annual & Financial Reporting"

    # Specific known domains
    if any(k in top_set for k in ["cyber", "cybersecurity", "infrastructure", "circia", "cisa", "attack", "threat", "breach"]):
        return "Cybersecurity & Critical Infrastructure Policy"
    if any(k in top_set for k in ["agri", "agriculture", "crop", "fertilizer", "farming", "soil", "harvest", "grain", "wheat"]):
        return "Agronomy & Agricultural Resource Management"
    if any(k in top_set for k in ["finance", "fiscal", "revenue", "budget", "expenditure", "audit", "accounting", "cost"]):
        return "Financial Operations & Fiscal Governance"
    if any(k in top_set for k in ["health", "hospital", "patient", "clinical", "medical", "disease", "drug", "care"]):
        return "Healthcare Operations & Clinical Policy"
    if any(k in top_set for k in ["energy", "electricity", "grid", "power", "solar", "wind", "fuel", "gas", "oil"]):
        return "Energy Infrastructure & Power Utility"
    if any(k in top_set for k in ["transport", "transit", "aviation", "highway", "rail", "vehicle", "traffic"]):
        return "Transportation & Logistics Infrastructure"
    if any(k in top_set for k in ["education", "school", "student", "teacher", "academic", "university", "curriculum"]):
        return "Education & Academic Policy"
    if any(k in top_set for k in ["defense", "military", "security", "weapon", "army", "navy", "intelligence"]):
        return "Defense & National Security"

    # Fallback to cleanest title representation
    clean_name = re.sub(r'(\.pdf|\.txt|\.docx?|CRS-[A-Z0-9]+|\b\d{4,}\b|\-|_)', ' ', name).strip()
    clean_name = re.sub(r'\s+', ' ', clean_name).title()
    if len(clean_name) > 4:
        return clean_name
    if sections:
        return sections[0].strip().title()
    return "General Operational Governance"

def analyze_document_relationships(docs: List[Any]) -> Dict[str, Any]:
    """
    Analyzes thematic and lexical overlap across multiple uploaded documents.
    Detects whether documents belong to unrelated domains and partitions them
    into clusters for multi-paragraph structured synthesis.
    """
    if not docs:
        return {
            "classification": "SINGLE",
            "are_unrelated": False,
            "warning_message": None,
            "summary_strategy": "SINGLE_DOC",
            "pairwise_scores": [],
            "avg_jaccard": 1.0,
            "min_jaccard": 1.0,
            "shared_themes": [],
            "distinct_aspects": [],
            "clusters": [],
            "domains": {},
            "disclaimer": "",
            "doc_profiles": []
        }

    # Extract substantive tokens and inferred domains
    doc_profiles = []
    for d in docs:
        if isinstance(d, dict):
            d_id = d.get("id") or str(len(doc_profiles))
            d_name = d.get("original_name") or f"Document {len(doc_profiles)+1}"
            d_text = d.get("full_text") or ""
            raw_sections = d.get("sections") or []
        else:
            d_id = getattr(d, "id", None) or str(len(doc_profiles))
            d_name = getattr(d, "original_name", None) or f"Document {len(doc_profiles)+1}"
            d_text = getattr(d, "full_text", None) or ""
            raw_sections = getattr(d, "sections", None) or []
        
        # Sections
        sec_titles = []
        for s in raw_sections:
            if isinstance(s, str):
                sec_titles.append(s)
            elif hasattr(s, "section_title"):
                sec_titles.append(s.section_title)
            elif isinstance(s, dict):
                sec_titles.append(s.get("title") or s.get("section_title", ""))

        tokens = set([w for w in tokenize(d_text) if len(w) > 3 and w not in COMMON_STOP_WORDS])
        domain = infer_document_domain(d_name, sec_titles, d_text)

        doc_profiles.append({
            "id": d_id,
            "name": d_name,
            "tokens": tokens,
            "domain": domain,
            "text": d_text,
            "sections": sec_titles
        })

    if len(doc_profiles) == 1:
        return {
            "classification": "SINGLE",
            "are_unrelated": False,
            "warning_message": None,
            "summary_strategy": "SINGLE_DOC",
            "pairwise_scores": [],
            "avg_jaccard": 1.0,
            "min_jaccard": 1.0,
            "shared_themes": [],
            "distinct_aspects": [],
            "clusters": [{"cluster_id": 1, "domain": doc_profiles[0]["domain"], "docs": [doc_profiles[0]]}],
            "domains": {doc_profiles[0]["id"]: doc_profiles[0]["domain"]},
            "disclaimer": "",
            "doc_profiles": doc_profiles
        }

    # Compute pairwise Jaccard similarities and shared tokens
    pairwise_scores: List[Dict[str, Any]] = []
    all_jaccards: List[float] = []

    for i in range(len(doc_profiles)):
        for j in range(i + 1, len(doc_profiles)):
            p1 = doc_profiles[i]
            p2 = doc_profiles[j]
            inter_tokens = p1["tokens"] & p2["tokens"]
            inter = len(inter_tokens)
            union = len(p1["tokens"] | p2["tokens"])
            jaccard = round(inter / union if union else 0.0, 4)
            all_jaccards.append(jaccard)
            pairwise_scores.append({
                "doc1": p1["name"],
                "doc2": p2["name"],
                "doc1_domain": p1["domain"],
                "doc2_domain": p2["domain"],
                "jaccard_similarity": jaccard,
                "common_tokens_count": inter,
                "common_tokens_sample": sorted(list(inter_tokens))[:10]
            })

    avg_jaccard = sum(all_jaccards) / len(all_jaccards) if all_jaccards else 1.0
    min_jaccard = min(all_jaccards) if all_jaccards else 1.0

    # Determine 3-way classification: RELATED, PARTIALLY_RELATED, UNRELATED
    domains_differ = any(p["doc1_domain"] != p["doc2_domain"] for p in pairwise_scores)
    all_domains_match = all(p["doc1_domain"] == p["doc2_domain"] for p in pairwise_scores)

    if (min_jaccard < 0.12 and domains_differ) or (avg_jaccard < 0.14) or (min_jaccard < 0.08):
        classification = "UNRELATED"
        are_unrelated = True
        summary_strategy = "INDEPENDENT_SEPARATE"
        warning_message = (
            "⚠️ The uploaded documents appear to be unrelated. "
            "They will be summarized separately instead of being combined into a single summary."
        )
    elif all_domains_match and avg_jaccard >= 0.15:
        classification = "RELATED"
        are_unrelated = False
        summary_strategy = "UNIFIED_SYNTHESIS"
        warning_message = None
    elif avg_jaccard >= 0.20:
        classification = "RELATED"
        are_unrelated = False
        summary_strategy = "UNIFIED_SYNTHESIS"
        warning_message = None
    else:
        classification = "PARTIALLY_RELATED"
        are_unrelated = False
        summary_strategy = "HYBRID_SYNTHESIS"
        warning_message = None

    # Identify shared themes and distinct aspects across documents
    all_tokens_list = [p["tokens"] for p in doc_profiles]
    common_all = set.intersection(*all_tokens_list) if all_tokens_list else set()
    shared_themes = sorted(list(common_all))[:8]

    distinct_aspects = []
    for p in doc_profiles:
        other_tokens = set.union(*[other["tokens"] for other in doc_profiles if other["id"] != p["id"]]) if len(doc_profiles) > 1 else set()
        unique_tokens = p["tokens"] - other_tokens
        if unique_tokens:
            distinct_aspects.append(f"{p['name']}: {', '.join(sorted(list(unique_tokens))[:5])}")

    # Build thematic clusters (group related docs together, keep unrelated apart)
    clusters: List[Dict[str, Any]] = []
    visited: Set[str] = set()

    cluster_id = 1
    for p in doc_profiles:
        if p["id"] in visited:
            continue
        current_cluster = [p]
        visited.add(p["id"])

        for other in doc_profiles:
            if other["id"] in visited:
                continue
            inter = len(p["tokens"] & other["tokens"])
            union = len(p["tokens"] | other["tokens"])
            score = inter / union if union else 0.0
            if score >= 0.18 and p["domain"] == other["domain"]:
                current_cluster.append(other)
                visited.add(other["id"])

        clusters.append({
            "cluster_id": cluster_id,
            "domain": current_cluster[0]["domain"],
            "docs": current_cluster,
            "doc_names": [d["name"] for d in current_cluster],
            "doc_ids": [d["id"] for d in current_cluster]
        })
        cluster_id += 1

    # Format the cross-domain disclaimer (preserving compatibility)
    disclaimer = ""
    if are_unrelated:
        domain_parts = [f"'{c['doc_names'][0]}' covers {c['domain']}" for c in clusters]
        domain_summary = ", whereas ".join(domain_parts) if len(domain_parts) <= 3 else "distinct institutional domains"
        disclaimer = (
            f"⚠️ Cross-Domain Notice: The analyzed documents address distinct, unrelated subject matters ({domain_summary}). "
            f"To preserve factual integrity and prevent cross-domain conflation, their findings are organized into separate dedicated paragraphs below:"
        )

    domains_map = {p["id"]: p["domain"] for p in doc_profiles}

    logger.info(
        f"[MultiDocAnalyzer] Evaluated {len(doc_profiles)} documents: classification={classification}, "
        f"are_unrelated={are_unrelated}, clusters={len(clusters)}, avg_jaccard={avg_jaccard:.3f}"
    )

    return {
        "classification": classification,
        "are_unrelated": are_unrelated,
        "warning_message": warning_message,
        "summary_strategy": summary_strategy,
        "pairwise_scores": pairwise_scores,
        "avg_jaccard": round(avg_jaccard, 4),
        "min_jaccard": round(min_jaccard, 4),
        "shared_themes": shared_themes,
        "distinct_aspects": distinct_aspects,
        "clusters": clusters,
        "domains": domains_map,
        "disclaimer": disclaimer,
        "doc_profiles": doc_profiles
    }
