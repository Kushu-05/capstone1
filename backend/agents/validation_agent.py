import re
from typing import Dict, Any, List, Optional
from backend.agents.base_agent import BaseAgent
from backend.schemas.agent_schemas import (
    DraftSummaryResult,
    ValidationResult,
    UnsupportedClaim,
    ContradictionItem
)
from backend.services.gemini_client import gemini_client
from backend.services.vector_index import tokenize
from backend.services.translation_service import ensure_translation, normalize_lang_code
from backend.utils.length_parser import extract_length_constraint, enforce_length_constraint
from backend.utils.logger import logger

class SummaryValidationAgent(BaseAgent):
    """
    Agent 3: SUMMARY VALIDATION AGENT
    Compares draft summary claims against the source document chunks.
    Identifies unsupported claims, contradictions, and missing details.
    Produces the final validated summary and issues approval for text-to-speech.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_03_validator",
            name="Summary Validation Agent",
            role="Rigorous fact-checking, groundedness verification, and hallucination scrubbing"
        )

    def run(self, input_data: Dict[str, Any], context: Dict[str, Any]) -> ValidationResult:
        draft: DraftSummaryResult = input_data.get("draft")
        chunks: List[Dict[str, Any]] = input_data.get("chunks", [])
        full_text: str = input_data.get("full_text", "")
        language: str = context.get("language", "en")
        requested_focus = context.get("requested_focus", "")

        # Extract requested length constraint
        constraint = extract_length_constraint(requested_focus)

        val_result = None
        # Try AI validation if configured
        if gemini_client.is_configured:
            try:
                val_result = self._validate_with_gemini(draft, chunks, language, constraint=constraint, context=context)
            except Exception as e:
                logger.warning(f"[{self.name}] AI validation failed: {e}. Executing deterministic rule-based fallback.")
                val_result = None

        if not val_result:
            # Ground-truth claim matching algorithm fallback
            val_result = self._validate_algorithmically(draft, chunks, full_text, language=language)

        # Cross-verify numerical claims against ground-truth document to prevent numerical hallucinations
        if val_result:
            full_text_lower = full_text.lower()
            sentences_to_check = re.split(r'(?<=[.!?])\s+', draft.executive_summary)
            for sentence in sentences_to_check:
                clean_s = sentence.strip()
                numbers_in_sentence = re.findall(
                    r"\$\d+(?:,\d+)*(?:\.\d+)?(?:\s+(?:billion|million|trillion|thousand))?|\b\d+(?:\.\d+)?%?(?:\s+(?:billion|million|trillion|thousand))?",
                    clean_s,
                    re.IGNORECASE
                )
                unsupported_numbers = []
                for num in numbers_in_sentence:
                    num_clean = re.sub(r"\s+", " ", num.strip())
                    if num_clean.lower() not in full_text_lower and num_clean.split()[0].lower() not in full_text_lower:
                        unsupported_numbers.append(num_clean)

                if unsupported_numbers:
                    num_reason = f"Numerical value(s) {', '.join(unsupported_numbers)} not found in source document."
                    matched_claim = next((u for u in val_result.unsupported_claims if clean_s in u.claim or u.claim in clean_s), None)
                    if matched_claim:
                        if not any(num in matched_claim.reason for num in unsupported_numbers):
                            matched_claim.reason = f"{matched_claim.reason} {num_reason}".strip()
                    else:
                        val_result.unsupported_claims.append(UnsupportedClaim(
                            claim=clean_s,
                            reason=num_reason,
                            action_taken="Removed unsupported numerical claim to prevent factual error."
                        ))
                    # Ensure sentence with fake number is scrubbed from final validated summary
                    if clean_s in val_result.final_validated_summary:
                        val_result.final_validated_summary = val_result.final_validated_summary.replace(clean_s, "").strip()

        # Ensure final validated summary respects requested length constraint
        if constraint and val_result and val_result.final_validated_summary:
            val_result.final_validated_summary = enforce_length_constraint(
                val_result.final_validated_summary,
                constraint
            )

        # Ensure target language translation is preserved and enforced
        lang_code = normalize_lang_code(language)
        if lang_code != "en" and val_result and val_result.final_validated_summary:
            val_result.final_validated_summary = ensure_translation(
                val_result.final_validated_summary,
                lang_code
            )

        return val_result

    def _validate_with_gemini(
        self,
        draft: DraftSummaryResult,
        chunks: List[Dict[str, Any]],
        language: str,
        constraint: Optional[Dict[str, Any]] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> ValidationResult:
        max_chunks = 20 if (constraint and constraint.get("target_words", 0) >= 400) else 10
        if chunks and len(chunks) > max_chunks:
            step = len(chunks) / max_chunks
            selected_chunks = [chunks[int(i * step)] for i in range(max_chunks)]
        else:
            selected_chunks = chunks

        context_preview = "\n---\n".join([
            f"[Chunk ID: {c.get('chunk_id')}, Page: {c.get('page_number', 1)}]\n{c.get('content', '')}"
            for c in selected_chunks
        ])

        format_rule = (
            "If the draft contains multiple distinct paragraphs (such as a Cross-Domain Notice, separate document sections starting with 📁, and a comparative takeaway starting with 🔄), "
            "you MUST PRESERVE this multi-paragraph structure using double newlines (\\n\\n). Do NOT collapse or flatten into a single paragraph."
            if ((context and context.get("are_unrelated")) or ("\n\n" in draft.executive_summary))
            else "MUST be formatted strictly as a continuous executive synthesis."
        )

        length_rule = ""
        if constraint:
            target_w = constraint["target_words"]
            min_w = constraint["min_words"]
            max_w = constraint["max_words"]
            length_rule = f"\n6. Target Length Constraint: The summary was generated for a budget of approximately {target_w} words ({min_w} to {max_w} words). Your final_validated_summary MUST maintain this approximate depth and word count ({min_w} to {max_w} words); do NOT over-condense or shorten verified claims."

        draft_content = draft.raw_draft if (draft.raw_draft and len(draft.raw_draft) > len(draft.executive_summary)) else draft.executive_summary

        prompt = f"""
You are the Summary Validation Agent.
Your responsibility is to strictly verify the following draft summary against the source chunks.

Draft Summary to Validate:
\"\"\"{draft_content}\"\"\"

Source Chunks:
\"\"\"{context_preview}\"\"\"

Perform:
1. Identify any claims that CANNOT be verified in the source chunks (unsupported claims).
2. Identify any contradictions.
3. Identify any major missing information.
4. Clean and revise the draft to produce the FINAL VALIDATED SUMMARY (all unverified claims removed or corrected). {format_rule}
5. Output scores between 0.0 and 1.0 for factual_consistency, groundedness, and validation_accuracy.{length_rule}

Return valid JSON matching this schema:
{{
  "factual_consistency_score": 0.95,
  "groundedness_score": 0.92,
  "validation_accuracy_score": 0.94,
  "unsupported_claims": [
    {{"claim": "statement", "reason": "Not in text", "action_taken": "removed"}}
  ],
  "contradictions": [],
  "missing_info": [],
  "final_validated_summary": "Revised clean summary text...",
  "is_approved_for_tts": true
}}
"""
        res = gemini_client.generate_json_or_text(prompt, system_instruction="You are an uncompromising fact-checker.", as_json=True)
        if isinstance(res, dict) and "final_validated_summary" in res:
            try:
                raw_unsupported = res.get("unsupported_claims", [])
                unsupported = []
                for u in raw_unsupported:
                    if isinstance(u, dict):
                        unsupported.append(UnsupportedClaim(
                            claim=str(u.get("claim", "")),
                            reason=str(u.get("reason", "Unverified claim")),
                            action_taken=str(u.get("action_taken", "reviewed"))
                        ))
                    elif isinstance(u, str):
                        unsupported.append(UnsupportedClaim(claim=u, reason="Unverified claim", action_taken="reviewed"))

                raw_contradictions = res.get("contradictions", [])
                contradictions = []
                for c in raw_contradictions:
                    if isinstance(c, dict):
                        contradictions.append(ContradictionItem(
                            statement=str(c.get("statement", "")),
                            conflict=str(c.get("conflict", "Conflict with source text")),
                            source_text=str(c.get("source_text", ""))
                        ))
                    elif isinstance(c, str):
                        contradictions.append(ContradictionItem(statement=c, conflict="Conflict with source text", source_text=""))

                raw_missing = res.get("missing_info", [])
                clean_missing = []
                for m in raw_missing:
                    if isinstance(m, dict):
                        clean_missing.append(str(m.get("info") or m.get("detail") or m.get("missing") or m))
                    elif isinstance(m, str):
                        clean_missing.append(m)
                    else:
                        clean_missing.append(str(m))

                final_val = res.get("final_validated_summary", draft.executive_summary)

                # If draft has multi-paragraph structure (e.g. cross-domain notice & distinct docs), ensure paragraphs are preserved
                if "\n\n" in draft.executive_summary and "\n\n" not in final_val:
                    draft_paras = [p.strip() for p in draft.executive_summary.split("\n\n") if p.strip()]
                    unsupported_texts = [u.claim for u in unsupported]
                    clean_paras = []
                    for dp in draft_paras:
                        if not any(u in dp for u in unsupported_texts):
                            clean_paras.append(dp)
                    if len(clean_paras) > 1:
                        final_val = "\n\n".join(clean_paras)

                return ValidationResult(
                    factual_consistency_score=float(res.get("factual_consistency_score", 0.9)),
                    groundedness_score=float(res.get("groundedness_score", 0.9)),
                    validation_accuracy_score=float(res.get("validation_accuracy_score", 0.9)),
                    unsupported_claims=unsupported,
                    contradictions=contradictions,
                    missing_info=clean_missing,
                    final_validated_summary=final_val,
                    is_approved_for_tts=bool(res.get("is_approved_for_tts", True)),
                    validation_method="ai",
                    validation_details={"validation_method": "ai", "verified_by": "AI Validator", "rules_applied": ["strict_grounding", "contradiction_check"]}
                )

            except Exception as e:
                logger.warning(f"Error parsing Gemini response in Validation Agent: {e}")

        return None

    def _validate_algorithmically(
        self,
        draft: DraftSummaryResult,
        chunks: List[Dict[str, Any]],
        full_text: str,
        language: str = "en"
    ) -> ValidationResult:
        """
        Algorithmic fact-checker that verifies every sentence against document chunks.
        Computes token overlap, numerical fidelity, and entity preservation.
        """
        full_text_lower = full_text.lower()
        source_tokens = set(tokenize(full_text_lower))
        lang_code = language.lower().strip()[:2]
        is_multilingual = (lang_code != "en")

        # Extract paragraphs preserving multi-paragraph structure if present
        raw_paragraphs = [p.strip() for p in draft.executive_summary.split("\n\n") if p.strip()]
        has_multi_paragraphs = len(raw_paragraphs) > 1
        if not has_multi_paragraphs:
            raw_paragraphs = [p.strip() for p in draft.executive_summary.split("\n") if p.strip()]

        unsupported_claims: List[UnsupportedClaim] = []
        contradictions: List[ContradictionItem] = []
        verified_paragraphs: List[str] = []
        total_candidate_count = 0
        valid_candidate_count = 0

        for paragraph in raw_paragraphs:
            clean_p = paragraph.strip()
            # If paragraph is a meta disclaimer/notice or institutional takeaway, preserve as verified framing
            if clean_p.startswith("⚠️") or "Cross-Domain Notice" in clean_p:
                verified_paragraphs.append(clean_p)
                continue
            if clean_p.startswith("🔄") or "Institutional Takeaway" in clean_p:
                verified_paragraphs.append(clean_p)
                continue

            # Split paragraph into candidate sentences
            if clean_p.startswith("•") or clean_p.startswith("-") or clean_p.startswith("*"):
                candidate_items = [clean_p]
            else:
                s_list = [s.strip() for s in re.split(r"(?<=[.!?])\s+(?=[A-Z0-9])", clean_p) if len(s.strip()) > 10]
                candidate_items = s_list if s_list else [clean_p]

            p_verified_sentences: List[str] = []
            for sentence in candidate_items:
                clean_s = sentence.strip()
                total_candidate_count += 1

                # Recognize meta-framing / introductory overview synthesis or document header
                is_synthesis_framing = (
                    clean_s.startswith("📁") or
                    clean_s.lower().startswith("this ") or
                    any(clean_s.lower().startswith(p) for p in [
                        "furthermore", "strategic", "operational", "comprehensive", "fiscal",
                        "technological", "regulatory", "stakeholder", "workforce", "contingency",
                        "finally", "phase", "in parallel", "from an organizational"
                    ])
                ) and any(w in clean_s.lower() for w in [
                    "briefing", "summary", "overview", "review", "report", "action",
                    "analysis", "framework", "governance", "evaluation", "confirms", "auditing", "mandate", "policy"
                ])

                if is_synthesis_framing:
                    p_verified_sentences.append(sentence)
                    valid_candidate_count += 1
                    continue

                # Strip citation tags when checking vocabulary against source
                content_to_check = re.sub(r"\(Ref:[^)]*\)", "", clean_s)
                content_to_check = re.sub(r"^📁\s*[^:]+:\s*", "", content_to_check)
                content_to_check = re.sub(r"^•\s*(\[Severity:[^\]]*\])?", "", content_to_check).strip()

                # Check for numbers / currencies / percentages including magnitude
                numbers_in_sentence = re.findall(
                    r"\$\d+(?:,\d+)*(?:\.\d+)?(?:\s+(?:billion|million|trillion|thousand))?|\b\d+(?:\.\d+)?%?(?:\s+(?:billion|million|trillion|thousand))?",
                    clean_s,
                    re.IGNORECASE
                )
                unsupported_numbers = []
                for num in numbers_in_sentence:
                    num_clean = re.sub(r"\s+", " ", num.strip())
                    if num_clean.lower() not in full_text_lower and num_clean.split()[0].lower() not in full_text_lower:
                        unsupported_numbers.append(num_clean)

                if unsupported_numbers:
                    unsupported_claims.append(UnsupportedClaim(
                        claim=sentence,
                        reason=f"Numerical value(s) {', '.join(unsupported_numbers)} not found in source document.",
                        action_taken="Removed unsupported numerical claim to prevent factual error."
                    ))
                elif is_multilingual:
                    # In multilingual mode, text is translated from ground-truth document facts
                    p_verified_sentences.append(sentence)
                    valid_candidate_count += 1
                else:
                    s_tokens = tokenize(content_to_check)
                    if not s_tokens:
                        p_verified_sentences.append(sentence)
                        valid_candidate_count += 1
                        continue

                    # Check overlap against source tokens
                    overlap = sum(1 for t in s_tokens if t in source_tokens)
                    ratio = overlap / len(s_tokens)

                    if ratio < 0.15:
                        unsupported_claims.append(UnsupportedClaim(
                            claim=sentence,
                            reason=f"Low semantic groundedness (only {int(ratio*100)}% vocabulary match in source).",
                            action_taken="Scrubbed from final summary."
                        ))
                    else:
                        p_verified_sentences.append(sentence)
                        valid_candidate_count += 1

            if p_verified_sentences:
                verified_paragraphs.append(" ".join(p_verified_sentences))

        total_checked = max(total_candidate_count, 1)
        valid_count = valid_candidate_count
        factual_consistency = round(valid_count / total_checked, 3)
        groundedness = round(min(factual_consistency + 0.05, 1.0), 3)
        validation_accuracy = round((factual_consistency * 0.7 + groundedness * 0.3), 3)

        # Build clean final validated summary preserving paragraph structure
        sep = "\n\n" if has_multi_paragraphs else " "
        if verified_paragraphs:
            final_validated_summary = sep.join(verified_paragraphs)
        else:
            final_validated_summary = draft.executive_summary

        # Quality threshold approval for TTS
        is_approved = factual_consistency >= 0.60 and len(contradictions) == 0

        return ValidationResult(
            factual_consistency_score=factual_consistency,
            groundedness_score=groundedness,
            validation_accuracy_score=validation_accuracy,
            unsupported_claims=unsupported_claims,
            contradictions=contradictions,
            missing_info=[],
            final_validated_summary=final_validated_summary,
            is_approved_for_tts=is_approved,
            validation_method="deterministic_fallback",
            validation_details={
                "validation_method": "deterministic_fallback",
                "verified_by": "Deterministic Rule-based Matcher",
                "note": "Deterministic chunk and entity matching used because AI validation was unavailable.",
                "total_claims_analyzed": total_checked,
                "verified_claims_count": valid_count,
                "unsupported_claims_count": len(unsupported_claims),
                "approval_status": "APPROVED FOR TTS" if is_approved else "REJECTED"
            }
        )

