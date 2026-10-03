import re
from typing import Optional, Dict, Any, List

def extract_length_constraint(text: str) -> Optional[Dict[str, Any]]:
    """
    Extracts word or token length constraints from user instructions or questions.
    
    Supported formats:
    - "summarize in 100 words"
    - "in 50 words"
    - "within 80 words"
    - "max 120 words"
    - "under 150 words"
    - "around 200 words"
    - "approximately 75 words"
    - "100-word summary"
    - "in 50 tokens"
    - "100 tokens"
    - "max 200 tokens"
    """
    if not text:
        return None
        
    t = text.lower()
    
    # 1. Match word constraints
    word_pattern = r'\b(?:in|under|within|max|maximum|around|approx|approximately|at most|about|limit to)?\s*(\d{1,5})\s*(?:-| )*(?:word|words)\b'
    m_word = re.search(word_pattern, t)
    if m_word:
        target_words = int(m_word.group(1))
        if target_words > 0:
            # Allow reasonable variance (20%) for natural sentence boundaries
            min_w = max(5, int(round(target_words * 0.80)))
            max_w = int(round(target_words * 1.20)) if target_words > 30 else target_words + 5
            return {
                "unit": "words",
                "target": target_words,
                "target_words": target_words,
                "min_words": min_w,
                "max_words": max_w,
                "prompt_instruction": (
                    f"STRICT WORD COUNT CONSTRAINT: Your response MUST be approximately {target_words} words "
                    f"(strictly between {min_w} and {max_w} words). Do not write more than {max_w} words."
                )
            }

    # 2. Match token constraints (1 token ~ 0.75 words)
    token_pattern = r'\b(?:in|under|within|max|maximum|around|approx|approximately|at most|about|limit to)?\s*(\d{1,5})\s*(?:-| )*(?:token|tokens)\b'
    m_token = re.search(token_pattern, t)
    if m_token:
        target_tokens = int(m_token.group(1))
        if target_tokens > 0:
            equiv_words = max(5, int(round(target_tokens * 0.75)))
            min_w = max(5, int(round(equiv_words * 0.80)))
            max_w = int(round(equiv_words * 1.20)) if equiv_words > 30 else equiv_words + 5
            return {
                "unit": "tokens",
                "target": target_tokens,
                "target_words": equiv_words,
                "min_words": min_w,
                "max_words": max_w,
                "prompt_instruction": (
                    f"STRICT TOKEN LIMIT CONSTRAINT: Your response MUST fit within {target_tokens} tokens "
                    f"(approximately {equiv_words} words, strictly between {min_w} and {max_w} words). "
                    f"Do not exceed {max_w} words."
                )
            }

    # 3. Match qualitative length modes: Detailed (1000 words) / Medium (500 words) / Small (200 words)
    # A. Detailed / Long / Comprehensive -> 1000 words
    if re.search(r'\b(detailed|detail|edatiled|long|in-depth|deep dive|exhaustive|elaborate)\b', t):
        return {
            "unit": "mode",
            "mode": "detailed",
            "target": 1000,
            "target_words": 1000,
            "min_words": 800,
            "max_words": 1200,
            "prompt_instruction": (
                "DETAILED SUMMARY CONSTRAINT: Provide an extensive, thorough executive summary of approximately 1000 words "
                "(between 800 and 1200 words) elaborating deeply on foundational context, comprehensive operational findings, "
                "critical risk exposures, governance decisions, and strategic implementation roadmaps across the document."
            )
        }

    # B. Small / Short / Brief / Concise -> 200 words
    if re.search(r'\b(small|short|brief|concise|quick|tldr|tl;dr)\b', t):
        return {
            "unit": "mode",
            "mode": "small",
            "target": 200,
            "target_words": 200,
            "min_words": 160,
            "max_words": 240,
            "prompt_instruction": (
                "CONCISE SUMMARY CONSTRAINT: Provide a compact executive summary of approximately 200 words "
                "(strictly between 160 and 240 words) capturing the essential operational findings and core takeaways."
            )
        }

    # C. Medium / Median / Moderate / Standard -> 500 words
    if re.search(r'\b(medium|medaian|median|moderate|standard|balanced)\b', t):
        return {
            "unit": "mode",
            "mode": "medium",
            "target": 500,
            "target_words": 500,
            "min_words": 400,
            "max_words": 600,
            "prompt_instruction": (
                "MEDIUM SUMMARY CONSTRAINT: Provide a balanced executive summary of approximately 500 words "
                "(strictly between 400 and 600 words) covering key operational findings, identified risks, and strategic next steps."
            )
        }

    return None

def enforce_length_constraint(text: str, constraint: Optional[Dict[str, Any]]) -> str:
    """
    Post-processes text to ensure it strictly respects the requested word/token limit.
    If text exceeds max_words, trims neatly at sentence or clause boundaries to remain
    close to target_words without exceeding max_words.
    """
    if not text or not constraint:
        return text
        
    words = text.split()
    target_words = constraint.get("target_words", 0)
    min_words = constraint.get("min_words", int(round(target_words * 0.85)))
    max_words = constraint.get("max_words", target_words)
    
    if len(words) <= max_words:
        return text

    # If text has multiple paragraphs separated by \n\n, preserve paragraph boundaries
    if "\n\n" in text:
        paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
        accumulated_paragraphs = []
        current_count = 0
        for p in paragraphs:
            p_words = len(p.split())
            if current_count + p_words <= max_words:
                accumulated_paragraphs.append(p)
                current_count += p_words
            else:
                remaining_budget = max_words - current_count
                if remaining_budget >= 15:
                    sub_constraint = {
                        "target_words": min(p_words, remaining_budget),
                        "min_words": max(10, remaining_budget - 15),
                        "max_words": remaining_budget
                    }
                    trimmed_p = enforce_length_constraint(p, sub_constraint)
                    if trimmed_p:
                        accumulated_paragraphs.append(trimmed_p)
                break
        if accumulated_paragraphs:
            return "\n\n".join(accumulated_paragraphs).strip()
        
    # Text is longer than max_words; find the nearest sentence boundary within target_words ~ max_words
    sentences = re.split(r'(?<=[.!?])\s+', text)
    accumulated_sentences = []
    current_count = 0
    
    for s in sentences:
        s_words = len(s.split())
        if current_count + s_words <= max_words:
            accumulated_sentences.append(s)
            current_count += s_words
        else:
            if not accumulated_sentences:
                truncated = " ".join(words[:target_words])
                return truncated.rstrip(",;:- ") + "."
            # If accumulated is below min_words and this sentence has content, take a sub-clause to reach target
            if current_count < min_words:
                needed = target_words - current_count
                s_tokens = s.split()
                if len(s_tokens) > needed:
                    clause = " ".join(s_tokens[:needed]).rstrip(",;:- ") + "."
                    accumulated_sentences.append(clause)
            break
            
    if accumulated_sentences:
        return " ".join(accumulated_sentences).strip()
        
    return " ".join(words[:target_words]).rstrip(",;:- ") + "."
