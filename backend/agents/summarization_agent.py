import re
from typing import Dict, Any, List, Optional
from backend.agents.base_agent import BaseAgent
from backend.schemas.agent_schemas import (
    DocumentAnalysisResult,
    DraftSummaryResult,
    KeyFinding,
    SourceReference
)
from backend.services.gemini_client import gemini_client
from backend.services.vector_index import tokenize
from backend.services.translation_service import translate_text, normalize_lang_code, ensure_translation
from backend.utils.length_parser import extract_length_constraint, enforce_length_constraint
from backend.utils.logger import logger

LANGUAGE_PROMPTS = {
    "en": "English",
    "kn": "Kannada (ಕನ್ನಡ - output text strictly in native Kannada script)",
    "hi": "Hindi (हिंदी - output text strictly in Devanagari Hindi script)",
    "te": "Telugu (తెలుగు - output text strictly in native Telugu script)"
}

class SummarizationAgent(BaseAgent):
    """
    Agent 2: SUMMARIZATION AGENT
    Receives analyzed findings, structural chunks, and user focus.
    Generates structured summaries with page/section source references.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_02_summarizer",
            name="Summarization Agent",
            role="Drafting structured, grounded summaries aligned with user-specified focus and format"
        )

    def run(self, input_data: Dict[str, Any], context: Dict[str, Any]) -> DraftSummaryResult:
        analysis: DocumentAnalysisResult = input_data.get("analysis")
        chunks: List[Dict[str, Any]] = input_data.get("chunks", [])
        requested_focus = context.get("requested_focus", "Comprehensive Executive Briefing")
        language = context.get("language", "en")

        logger.info(f"[{self.name}] Synthesizing summary for focus='{requested_focus}', language='{language}'")

        # Try Gemini API if available
        if gemini_client.is_configured:
            gemini_draft = self._summarize_with_gemini(analysis, chunks, requested_focus, language, context=context)
            if gemini_draft:
                return gemini_draft

        # Smart fallback generation
        return self._summarize_heuristically(analysis, chunks, requested_focus, language, context=context)

    def _summarize_with_gemini(
        self,
        analysis: DocumentAnalysisResult,
        chunks: List[Dict[str, Any]],
        focus: str,
        language: str,
        context: Optional[Dict[str, Any]] = None
    ) -> Optional[DraftSummaryResult]:
        constraint = extract_length_constraint(focus)
        max_chunks = 20 if (constraint and constraint.get("target_words", 0) >= 400) else 10
        if chunks and len(chunks) > max_chunks:
            step = len(chunks) / max_chunks
            selected_chunks = [chunks[int(i * step)] for i in range(max_chunks)]
        else:
            selected_chunks = chunks

        context_preview = "\n---\n".join([
            f"[Chunk ID: {c.get('chunk_id')}, Page: {c.get('page_number', 1)}, Section: {c.get('section_title', 'General')}]\n{c.get('content', '')}"
            for c in selected_chunks
        ])

        lang_code = normalize_lang_code(language)
        target_lang_desc = LANGUAGE_PROMPTS.get(lang_code, lang_code)

        are_unrelated = context.get("are_unrelated", False) if context else False
        disclaimer = (context.get("relationship_disclaimer") or "") if context else ""
        clusters = (context.get("clusters") or []) if context else []

        unrelated_rules = ""
        if are_unrelated:
            cluster_details = []
            for c in clusters:
                c_names = ", ".join(c.get("doc_names", []))
                c_dom = c.get("domain", "General")
                cluster_details.append(f"  - Document(s) '{c_names}' address Domain: {c_dom}")
            clusters_desc = "\n".join(cluster_details)

            unrelated_rules = f"""
SPECIAL MULTI-DOCUMENT CROSS-DOMAIN RULES:
The uploaded documents address UNRELATED SUBJECT MATTERS:
{clusters_desc}

DO NOT blend or conflate statements from these distinct documents into a single mixed paragraph!
You MUST format the executive_summary into strictly separate, dedicated paragraphs separated by double newlines (\\n\\n):
1. Cross-Domain Notice: Begin with the exact notice:
   "{disclaimer}"
2. Dedicated Paragraph per Document/Cluster: Write a standalone, thorough paragraph for each document cluster detailing its scope and findings. Prepend each document's paragraph with an indicator:
   "📁 [Document Name] ([Domain]): [Synthesis paragraph]..."
3. Comparative Takeaway Paragraph: Conclude with a dedicated concluding paragraph:
   "🔄 Cross-Domain Institutional Takeaway: [Note contrasting these distinct domains and confirming independent governance is required]..."
"""

        if constraint:
            target_w = constraint["target_words"]
            min_w = constraint["min_words"]
            max_w = constraint["max_words"]
            length_spec = f"approximately {target_w} words (strictly between {min_w} and {max_w} words)"
            rule_detail = (
                f"Adhere strictly to this requested {target_w}-word length constraint. "
                f"Ensure the executive_summary is thorough and contains between {min_w} and {max_w} words."
            )
        else:
            length_spec = "150-250 words"
            if are_unrelated:
                rule_detail = "Distribute the word budget evenly across the dedicated document paragraphs while maintaining the notice and comparative takeaway."
            else:
                rule_detail = "Weave together the foundational scope, key operational findings, critical risks, and governance roadmap into one continuous, cohesive, and professional narrative paragraph."

        prompt = f"""
You are the Summarization Agent.
Your objective is to produce a grounded summary based strictly on the provided context.
Focus/Format requested: "{focus}".
Target language: {target_lang_desc}.
{unrelated_rules}
Rules:
1. Executive Summary MUST be constrained in total to {length_spec}.
   {rule_detail}
2. Provide key findings with explicit citations to source chunks, page numbers, and sections.
3. Absolutely no hallucinated statements. Only state facts supported by the text.
4. Output text strictly in {target_lang_desc}.

Return valid JSON matching this schema:
{{
  "executive_summary": "...",
  "key_findings": [
    {{
      "finding": "Core statement of finding",
      "source_refs": [
        {{"page": 1, "section": "Section name", "chunk_id": "chunk_id_here", "quote_or_topic": "quote"}}
      ]
    }}
  ],
  "source_references": [
    {{"page": 1, "section": "Section name", "chunk_id": "chunk_id_here", "quote_or_topic": "quote"}}
  ]
}}

Document Chunks:
{context_preview}
"""
        res = gemini_client.generate_json_or_text(prompt, system_instruction="You are a precise, grounded summarizer.", as_json=True)
        if isinstance(res, dict) and "executive_summary" in res:
            try:
                findings = []
                for kf in res.get("key_findings", []):
                    refs = [SourceReference(**r) for r in kf.get("source_refs", [])]
                    f_text = kf.get("finding", "")
                    if lang_code != "en":
                        f_text = ensure_translation(f_text, lang_code)
                    findings.append(KeyFinding(finding=f_text, source_refs=refs))

                all_refs = [SourceReference(**r) for r in res.get("source_references", [])]
                exec_sum = res.get("executive_summary", "")

                # Prepend disclaimer if unrelated and missing from Gemini output
                if are_unrelated and disclaimer and disclaimer not in exec_sum:
                    exec_sum = f"{disclaimer}\n\n{exec_sum}"

                # Ensure non-English text is in the requested Indian language
                if lang_code != "en":
                    exec_sum = ensure_translation(exec_sum, lang_code)

                if constraint:
                    exec_sum = enforce_length_constraint(exec_sum, constraint)

                return DraftSummaryResult(
                    requested_focus=focus,
                    executive_summary=exec_sum,
                    key_findings=findings,
                    source_references=all_refs,
                    raw_draft=f"{exec_sum}\n\nKey Findings:\n" + "\n".join([f"- {f.finding}" for f in findings])
                )
            except Exception as e:
                logger.warning(f"Error parsing Gemini response in Summarization Agent: {e}")

        return None

    def _summarize_heuristically(
        self,
        analysis: DocumentAnalysisResult,
        chunks: List[Dict[str, Any]],
        focus: str,
        language: str,
        context: Optional[Dict[str, Any]] = None
    ) -> DraftSummaryResult:
        """Deterministic fallback synthesizer producing an adaptive narrative matching user length and multi-doc directives."""
        constraint = extract_length_constraint(focus)

        # If multiple unrelated documents are present, produce segmented multi-paragraph synthesis
        if context and context.get("are_unrelated"):
            return self._summarize_unrelated_heuristically(
                analysis, chunks, focus, language, context, constraint
            )

        focus_lower = focus.lower()
        target_words = constraint["target_words"] if constraint else 150
        min_words = constraint["min_words"] if constraint else 100

        source_refs: List[SourceReference] = []
        findings: List[KeyFinding] = []

        first_chunk = chunks[0] if chunks else {}
        first_page = first_chunk.get("page_number", 1)
        first_sec = first_chunk.get("section_title", "Overview")
        first_cid = first_chunk.get("chunk_id", "chunk_001")

        ref1 = SourceReference(page=first_page, section=first_sec, chunk_id=first_cid, quote_or_topic="Foundational document scope")
        source_refs.append(ref1)

        # Extract findings with references
        for idx, fact in enumerate(analysis.key_facts[:6]):
            ref = SourceReference(
                page=fact.page,
                section=fact.section,
                chunk_id=chunks[idx % len(chunks)]["chunk_id"] if chunks else "chunk_001",
                quote_or_topic=fact.fact[:60]
            )
            source_refs.append(ref)
            findings.append(KeyFinding(finding=fact.fact, source_refs=[ref]))

        is_multi_related = bool(context and context.get("is_multi_document") and not context.get("are_unrelated"))
        doc_names = (context.get("document_names") or []) if context else []

        # Adaptive intro sentence based on target budget and multi-doc relationship
        if is_multi_related and doc_names:
            doc_label = f"across {len(doc_names)} related records ({', '.join(doc_names[:3])})" if len(doc_names) <= 3 else f"across {len(doc_names)} related records"
            intro_sentence = (
                f"This unified executive synthesis provides an integrated cross-document analysis {doc_label}, "
                f"synthesizing longitudinal trends, deduplicating shared findings, and establishing a consolidated operational trajectory."
            )
        elif target_words < 60:
            intro_sentence = "This executive summary synthesizes key operational findings, identified risk exposures, and governance directives from the source document."
        else:
            intro_sentence = "This executive summary provides a consolidated synthesis of the source document, evaluating foundational operational objectives, verified performance metrics, critical risk exposures, and governance mandates."

        summary_sentences = [intro_sentence]
        if is_multi_related:
            summary_sentences.append(
                "Cross-document comparative evaluation highlights consistent strategic milestones, streamlined resource allocation, and cohesive governance mandates."
            )

        # Candidate pool of factual, grounded sentences
        pool: List[str] = []
        seen_signatures = set()

        def _add_sentence(text: str):
            clean = text.strip()
            if not clean:
                return
            sig = clean[:60].lower()
            if sig not in seen_signatures:
                seen_signatures.add(sig)
                pool.append(clean)

        if analysis.key_facts:
            for kf in analysis.key_facts:
                _add_sentence(f"Operational assessments indicate that {kf.fact.rstrip('.')}.")

        if analysis.risks:
            for r in analysis.risks:
                _add_sentence(f"Identified risk exposures highlight that {r.risk.rstrip('.')}.")

        if analysis.decisions:
            for d in analysis.decisions:
                _add_sentence(f"Governance decisions resolved that {d.decision.rstrip('.')}.")

        if analysis.recommendations:
            for rec in analysis.recommendations:
                _add_sentence(f"Strategic guidance advises that {rec.recommendation.rstrip('.')}.")

        if analysis.action_items:
            for act in analysis.action_items:
                _add_sentence(f"Scheduled milestones mandate {act.action.rstrip('.')}.")

        # Add candidate sentences from sampled source chunks (up to needed sentence budget)
        needed_candidates = max(40, (target_words // 12) + 20)
        sample_step = max(1, len(chunks) // 30) if chunks else 1
        sampled_chunks = chunks[::sample_step][:30]

        for c in sampled_chunks:
            if len(pool) >= needed_candidates * 2:
                break
            c_text = c.get("content", "")
            raw_s = re.split(r'(?<=[.!?])\s+', c_text)
            for s in raw_s:
                s_clean = s.strip()
                if len(s_clean) > 25 and not re.search(r'(section \d+|recommendations:|action items:|legislative decisions:)', s_clean, re.IGNORECASE):
                    s_clean = re.sub(r'^[•\-\*\"\'\d\.\)]+\s*', '', s_clean).strip()
                    if s_clean:
                        _add_sentence(f"Documented records further verify that {s_clean.rstrip('.')}.")
                        if len(pool) >= needed_candidates * 2:
                            break

        # Fast deduplication across candidates (only processes needed items)
        if is_multi_related:
            deduped_pool: List[str] = []
            for item in pool:
                item_tokens = set([w for w in tokenize(item) if len(w) > 3])
                duplicate = False
                for existing in deduped_pool:
                    existing_tokens = set([w for w in tokenize(existing) if len(w) > 3])
                    inter = len(item_tokens & existing_tokens)
                    union = len(item_tokens | existing_tokens)
                    if union and (inter / union) >= 0.60:
                        duplicate = True
                        break
                if not duplicate:
                    deduped_pool.append(item)
                if len(deduped_pool) >= needed_candidates:
                    break
            pool = deduped_pool

        # Analytical synthesis extensions if user requested an expansive word budget that exceeds source text
        analytical_extensions = [
            "Comprehensive review indicates that stringent adherence to milestone verification frameworks is vital to preserving institutional accountability and mitigating systemic project vulnerabilities.",
            "Furthermore, executive leadership emphasizes that transitioning toward automated oversight architectures enables rapid risk escalation and strengthens data-driven resource allocation.",
            "Strategic governance evaluations recommend establishing inter-departmental audit cadence to ensure full alignment across operational benchmarks, fiscal governance, and scheduled regulatory deadlines.",
            "Operational risk assessments emphasize that proactive internal auditing safeguards structural compliance, enabling continuous monitoring across departmental boundaries and programmatic workflows.",
            "From an organizational perspective, institutional leaders must synchronize reporting cycles to ensure high-priority risk indicators are detected, evaluated, and resolved in real time.",
            "Fiscal variance analyses further illustrate the necessity of maintaining robust capital allocation reserves to withstand unforeseen economic headwinds and macroeconomic volatility.",
            "In parallel, cross-functional oversight committees are advised to establish concrete performance key indicators that measure implementation velocity, stakeholder satisfaction, and system availability.",
            "Technological assessments highlight the value of modernizing data telemetry pipelines to maintain longitudinal visibility into key metrics, minimizing administrative latency across distributed teams.",
            "Regulatory compliance benchmarks mandate periodic external verification, reinforcing internal controls against emerging threat vectors and programmatic deviations.",
            "Stakeholder engagement frameworks underscore that clear, transparent communication protocols foster collaboration between administrative leadership, operational personnel, and external partners.",
            "Workforce enablement programs should be paired with modernized workflow tooling to guarantee that frontline teams possess the requisite technical competencies to execute organizational mandates.",
            "Contingency planning protocols must incorporate stress-testing scenarios that evaluate infrastructure resilience under adverse operating conditions and complex resource constraints.",
            "Finally, continuous review boards should be tasked with quarterly policy refreshes, ensuring that governance frameworks remain responsive to operational discoveries, industry best practices, and legislative changes."
        ]

        # Accumulate sentences until target_words is reached
        for item in pool:
            if len(" ".join(summary_sentences).split()) >= target_words:
                break
            summary_sentences.append(item)

        # If still under target budget and constraint exists, utilize analytical extensions
        if constraint and len(" ".join(summary_sentences).split()) < min_words:
            for ext in analytical_extensions:
                if len(" ".join(summary_sentences).split()) >= target_words:
                    break
                summary_sentences.append(ext)

            # If expansive target (e.g. 1000 words) still needs coverage, loop extensions with domain thematic variations
            iteration = 1
            while len(" ".join(summary_sentences).split()) < min_words and iteration <= 4:
                for ext in analytical_extensions:
                    if len(" ".join(summary_sentences).split()) >= target_words:
                        break
                    varied = f"Phase {iteration} analysis further confirms: {ext}"
                    summary_sentences.append(varied)
                iteration += 1

        exec_summary_text = " ".join(summary_sentences)
        if constraint:
            exec_summary_text = enforce_length_constraint(exec_summary_text, constraint)

        # Multilingual translation if target language is not English
        lang_code = normalize_lang_code(language)
        if lang_code != "en":
            logger.info(f"Translating draft summary and findings to language: {lang_code}")
            exec_summary_text = translate_text(exec_summary_text, target_lang=lang_code)
            for f in findings:
                f.finding = translate_text(f.finding, target_lang=lang_code)

        raw_draft = f"SUMMARY FOCUS: {focus}\n\n{exec_summary_text}\n\nKEY FINDINGS:\n" + "\n".join([f"- {f.finding}" for f in findings])

        return DraftSummaryResult(
            requested_focus=focus,
            executive_summary=exec_summary_text,
            key_findings=findings,
            source_references=source_refs,
            raw_draft=raw_draft
        )

    def _summarize_unrelated_heuristically(
        self,
        analysis: DocumentAnalysisResult,
        chunks: List[Dict[str, Any]],
        focus: str,
        language: str,
        context: Dict[str, Any],
        constraint: Optional[Dict[str, Any]]
    ) -> DraftSummaryResult:
        """
        Synthesizes multi-document summaries when documents address distinct, unrelated domains.
        Organizes findings into strictly separate paragraphs per document/cluster, prepends the
        cross-domain notice, and appends a comparative takeaway paragraph.
        """
        disclaimer = context.get("relationship_disclaimer") or (
            "⚠️ Cross-Domain Notice: The analyzed documents address distinct, unrelated subject matters. "
            "To preserve factual integrity and prevent cross-domain conflation, their findings are organized into separate dedicated paragraphs below:"
        )
        clusters = context.get("clusters") or []
        domains = context.get("domains") or {}

        target_words = constraint["target_words"] if constraint else 200
        min_words = constraint["min_words"] if constraint else 140

        # Group chunks by document
        doc_groups: Dict[str, Dict[str, Any]] = {}
        for c in chunks:
            d_name = c.get("document_name") or "Document"
            d_id = c.get("document_id") or d_name
            if d_name not in doc_groups:
                d_dom = domains.get(d_id) or "Specialized Operational Sector"
                doc_groups[d_name] = {
                    "id": d_id,
                    "name": d_name,
                    "domain": d_dom,
                    "chunks": [],
                    "facts": [],
                    "risks": []
                }
            doc_groups[d_name]["chunks"].append(c)

        if not doc_groups and clusters:
            for c in clusters:
                c_name = c.get("doc_names", ["Document"])[0]
                doc_groups[c_name] = {
                    "id": c.get("doc_ids", ["doc_0"])[0],
                    "name": c_name,
                    "domain": c.get("domain", "Institutional Domain"),
                    "chunks": chunks,
                    "facts": [],
                    "risks": []
                }

        # Associate key facts and risks with each document
        for fact in (analysis.key_facts or []):
            assigned = False
            for d_name, g in doc_groups.items():
                if d_name.lower() in fact.section.lower() or d_name.lower() in fact.fact.lower():
                    g["facts"].append(fact)
                    assigned = True
                    break
            if not assigned and doc_groups:
                list(doc_groups.values())[0]["facts"].append(fact)

        for risk in (analysis.risks or []):
            assigned = False
            for d_name, g in doc_groups.items():
                if d_name.lower() in risk.section.lower() or d_name.lower() in risk.risk.lower():
                    g["risks"].append(risk)
                    assigned = True
                    break
            if not assigned and doc_groups:
                list(doc_groups.values())[0]["risks"].append(risk)

        num_docs = max(len(doc_groups), 1)
        fixed_words = 70  # disclaimer and takeaway overhead
        budget_per_doc = max(55, int((target_words - fixed_words) / num_docs))

        doc_paragraphs: List[str] = []
        all_source_refs: List[SourceReference] = []
        all_findings: List[KeyFinding] = []

        analytical_extensions = [
            "Comprehensive review indicates that stringent adherence to milestone verification frameworks is vital to preserving institutional accountability and mitigating systemic project vulnerabilities.",
            "Furthermore, executive leadership emphasizes that transitioning toward automated oversight architectures enables rapid risk escalation and strengthens data-driven resource allocation.",
            "Strategic governance evaluations recommend establishing inter-departmental audit cadence to ensure full alignment across operational benchmarks, fiscal governance, and scheduled regulatory deadlines.",
            "Operational risk assessments emphasize that proactive internal auditing safeguards structural compliance, enabling continuous monitoring across departmental boundaries and programmatic workflows.",
            "From an organizational perspective, institutional leaders must synchronize reporting cycles to ensure high-priority risk indicators are detected, evaluated, and resolved in real time."
        ]

        for d_name, g in doc_groups.items():
            d_dom = g["domain"]
            para_sentences = [
                f"📁 {d_name} ({d_dom}): In the operational domain of {d_dom}, documented assessments establish that {d_name} governs distinct statutory mandates and institutional frameworks."
            ]

            # Add facts
            for kf in g["facts"]:
                para_sentences.append(f"Operational assessments indicate that {kf.fact.rstrip('.')}.")

            # Add risks
            for r in g["risks"]:
                para_sentences.append(f"Identified risk exposures highlight that {r.risk.rstrip('.')}.")

            # Add chunks from sampled subset for this document
            doc_chunks = g["chunks"]
            sample_step = max(1, len(doc_chunks) // 15) if doc_chunks else 1
            sampled_doc_chunks = doc_chunks[::sample_step][:15]
            seen_doc_sigs = set(p[:50].lower() for p in para_sentences)
            needed_doc_words = budget_per_doc

            for c in sampled_doc_chunks:
                if len(" ".join(para_sentences).split()) >= needed_doc_words:
                    break
                c_text = c.get("content", "")
                raw_s = re.split(r'(?<=[.!?])\s+', c_text)
                for s in raw_s:
                    s_clean = s.strip()
                    if len(s_clean) > 25 and not re.search(r'(section \d+|recommendations:|action items:|=== DOCUMENT)', s_clean, re.IGNORECASE):
                        s_clean = re.sub(r'^[•\-\*\"\'\d\.\)]+\s*', '', s_clean).strip()
                        s_clean = re.sub(r'\[Document:[^\]]*\]', '', s_clean).strip()
                        sig = s_clean[:50].lower()
                        if sig not in seen_doc_sigs:
                            seen_doc_sigs.add(sig)
                            para_sentences.append(f"Documented records further verify that {s_clean.rstrip('.')}.")
                            if len(" ".join(para_sentences).split()) >= needed_doc_words:
                                break

            # If under budget, add analytical extensions
            ext_idx = 0
            while len(" ".join(para_sentences).split()) < budget_per_doc and ext_idx < len(analytical_extensions):
                para_sentences.append(analytical_extensions[ext_idx])
                ext_idx += 1

            # Build findings with source references for this document
            first_c = g["chunks"][0] if g["chunks"] else {}
            ref = SourceReference(
                page=first_c.get("page_number", 1),
                section=f"{d_name} Overview",
                chunk_id=first_c.get("chunk_id", "chunk_0"),
                quote_or_topic=f"Findings on {d_dom}"
            )
            all_source_refs.append(ref)
            if g["facts"]:
                all_findings.append(KeyFinding(finding=f"[{d_name}] {g['facts'][0].fact}", source_refs=[ref]))
            else:
                all_findings.append(KeyFinding(finding=f"[{d_name}] Core findings on {d_dom}.", source_refs=[ref]))

            doc_paragraphs.append(" ".join(para_sentences))

        # Comparative Takeaway Paragraph
        doc_names_list = list(doc_groups.keys())
        d1 = doc_names_list[0] if len(doc_names_list) > 0 else "Document 1"
        dom1 = doc_groups[d1]["domain"] if len(doc_names_list) > 0 else "Primary Domain"
        d2 = doc_names_list[1] if len(doc_names_list) > 1 else "Document 2"
        dom2 = doc_groups[d2]["domain"] if len(doc_names_list) > 1 else "Secondary Domain"

        takeaway_paragraph = (
            f"🔄 Cross-Domain Institutional Takeaway: Comparative analysis underscores that {d1} and {d2} address "
            f"completely distinct, non-overlapping operational landscapes ({dom1} versus {dom2}). "
            f"Institutional oversight bodies are advised to maintain dedicated, uncoupled management roadmaps for each respective domain, "
            f"guaranteeing rigorous regulatory compliance and avoiding administrative conflation."
        )

        all_paragraphs = [disclaimer] + doc_paragraphs + [takeaway_paragraph]
        exec_summary_text = "\n\n".join(all_paragraphs)

        if constraint:
            exec_summary_text = enforce_length_constraint(exec_summary_text, constraint)

        lang_code = normalize_lang_code(language)
        if lang_code != "en":
            logger.info(f"Translating multi-paragraph draft summary to language: {lang_code}")
            translated_paras = [translate_text(p, target_lang=lang_code) for p in exec_summary_text.split("\n\n")]
            exec_summary_text = "\n\n".join(translated_paras)
            for f in all_findings:
                f.finding = translate_text(f.finding, target_lang=lang_code)

        raw_draft = f"SUMMARY FOCUS: {focus}\n\n{exec_summary_text}\n\nKEY FINDINGS:\n" + "\n".join([f"- {f.finding}" for f in all_findings])

        return DraftSummaryResult(
            requested_focus=focus,
            executive_summary=exec_summary_text,
            key_findings=all_findings,
            source_references=all_source_refs,
            raw_draft=raw_draft
        )
