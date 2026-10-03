#!/usr/bin/env python3
"""
GovReport Summarization Benchmark Evaluation Module
===================================================
Evaluates the multi-agent summarization and factual validation pipeline against
the official GovReport benchmark dataset (ccdv/govreport-summarization).

Key Capabilities:
- Streaming subset processing (configurable limit: 1-N documents without downloading full dataset)
- Reuses existing multi-agent pipeline (Ingestion, Chunking, Analysis, Summarization, Validation)
- Multi-dimensional scoring (Relevance, Completeness, Factual Consistency, Groundedness,
  Validation Accuracy, Overall Quality) + standard ROUGE-1, ROUGE-2, and ROUGE-L metrics
- Tracks Gatekeeper Validation Approval (is_approved_for_tts)
- Robust per-record error isolation (one bad document does not abort the run)
- Exports structured reports in both JSON and Markdown format
"""

import os
import sys
import json
import time
import argparse
import datetime
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple

# Ensure stdout and stderr handle UTF-8 cleanly on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Ensure project root is in sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from backend.config import settings
from backend.services.ingestion_service import IngestionResult, clean_text, detect_sections_from_text
from backend.services.chunking_service import chunk_document
from backend.agents.analysis_agent import DocumentAnalysisAgent
from backend.agents.summarization_agent import SummarizationAgent
from backend.agents.validation_agent import SummaryValidationAgent
from backend.services.govreport_evaluator import govreport_evaluator
from backend.utils.logger import logger


def load_govreport_hf_subset(limit: int = 10, split: str = "test") -> List[Dict[str, Any]]:
    """
    Stream a small, manageable subset of the GovReport dataset from Hugging Face.
    Uses streaming=True to avoid downloading the entire multi-gigabyte dataset.
    """
    try:
        from datasets import load_dataset
    except ImportError:
        logger.error("The 'datasets' package is required for Hugging Face streaming.")
        return []

    records = []
    print(f"[*] Connecting to Hugging Face Hub (dataset: ccdv/govreport-summarization, split: {split})...")
    try:
        ds = load_dataset("ccdv/govreport-summarization", split=split, streaming=True)
        iterator = iter(ds)
        count = 0
        for item in iterator:
            if count >= limit:
                break
            report_text = item.get("report", "")
            summary_text = item.get("summary", "")
            if not report_text or not summary_text:
                continue

            doc_id = item.get("id") or f"GovReport-{split.upper()}-{count+1:03d}"
            records.append({
                "id": doc_id,
                "title": f"GovReport Benchmark Document {count+1}",
                "agency": "US Government Agency",
                "document": report_text,
                "summary": summary_text,
                "source": "huggingface"
            })
            count += 1
            print(f"    - Loaded sample {count}/{limit}: {doc_id} ({len(report_text):,} chars)")
    except Exception as e:
        logger.warning(f"Failed to stream from Hugging Face: {e}")
        return []

    return records


def load_govreport_local_subset(limit: int = 10) -> List[Dict[str, Any]]:
    """
    Load sample documents from local `data/govreport_samples/` directory.
    Provides offline and fast testing fallback.
    """
    records = []
    samples = govreport_evaluator.list_available_samples()
    for s in samples[:limit]:
        data = govreport_evaluator.load_sample(s["id"])
        if data:
            records.append({
                "id": data.get("id", s["id"]),
                "title": data.get("title", s.get("title", "GovReport Sample")),
                "agency": data.get("agency", "Federal Agency"),
                "document": data.get("document", ""),
                "summary": data.get("summary", ""),
                "source": "local_sample"
            })
    return records


def run_pipeline_on_document(
    doc_id: str,
    doc_text: str,
    requested_focus: str = "Comprehensive Executive Briefing",
    language: str = "en"
) -> Tuple[Any, Any, Any]:
    """
    Executes the existing multi-agent summarization and validation pipeline
    on the provided document text without modifying core code.
    """
    # 1. Ingestion representation
    cleaned = clean_text(doc_text)
    sections = detect_sections_from_text(cleaned)
    pages = [{"page_number": 1, "text": cleaned}]

    ingestion = IngestionResult(
        full_text=cleaned,
        pages=pages,
        sections=sections,
        page_count=max(len(sections), 1),
        word_count=len(cleaned.split()),
        char_count=len(cleaned)
    )

    # 2. Section & page aware chunking
    chunks = chunk_document(doc_id, ingestion)
    chunks_dict = [c.to_dict() for c in chunks]

    # Context definition
    context = {
        "workflow_run_id": f"benchmark_{doc_id}",
        "language": language,
        "requested_focus": requested_focus
    }

    # 3. Agent 1: Document Analysis Agent
    analysis_agent = DocumentAnalysisAgent()
    analysis_input = {
        "full_text": cleaned,
        "chunks": chunks_dict,
        "sections": sections
    }
    analysis = analysis_agent.run(analysis_input, context)

    # 4. Agent 2: Summarization Agent
    summarization_agent = SummarizationAgent()
    sum_input = {
        "analysis": analysis,
        "chunks": chunks_dict
    }
    draft = summarization_agent.run(sum_input, context)

    # 5. Agent 3: Summary Validation Agent (Strict Fact-Checking Gatekeeper)
    validation_agent = SummaryValidationAgent()
    val_input = {
        "draft": draft,
        "chunks": chunks_dict,
        "full_text": cleaned
    }
    validation = validation_agent.run(val_input, context)

    return analysis, draft, validation


def evaluate_benchmark(
    limit: int = 10,
    source: str = "auto",
    split: str = "test",
    output_dir: Optional[Path] = None,
    requested_focus: str = "Comprehensive Executive Briefing",
    verbose: bool = True
) -> Dict[str, Any]:
    """
    Runs the full benchmark evaluation over a subset of GovReport documents.
    """
    output_dir = output_dir or (PROJECT_ROOT / "data" / "benchmark_results")
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 78)
    print(" GOVREPORT BENCHMARK EVALUATION: MULTI-AGENT SUMMARIZATION & VALIDATION")
    print("=" * 78)
    print(f"Target Limit : {limit} document(s)")
    print(f"Dataset Split: {split}")
    print(f"Source Mode  : {source}")
    print(f"Output Dir   : {output_dir}")
    print("-" * 78)

    # 1. Load dataset subset
    records: List[Dict[str, Any]] = []
    if source in ("hf", "auto"):
        records = load_govreport_hf_subset(limit=limit, split=split)

    if not records and source in ("local", "auto"):
        print("[!] Using local GovReport benchmark samples from data/govreport_samples/...")
        records = load_govreport_local_subset(limit=limit)

    if not records:
        print("[X] Error: Could not load any GovReport benchmark documents.")
        return {"error": "No records available", "evaluated_count": 0}

    print(f"\n[+] Successfully prepared {len(records)} benchmark document(s) for evaluation.\n")

    results = []
    failed_cases = []
    start_time = time.time()

    for idx, item in enumerate(records, 1):
        doc_id = item.get("id", f"doc_{idx}")
        title = item.get("title", "GovReport Document")
        doc_text = item.get("document", "")
        ref_summary = item.get("summary", "")

        print(f"[{idx}/{len(records)}] Processing: {doc_id} - '{title[:65]}...'")
        doc_word_count = len(doc_text.split())
        ref_word_count = len(ref_summary.split())
        print(f"    - Document Words : {doc_word_count:,}")
        print(f"    - Reference Words: {ref_word_count:,}")

        # Validation of input record
        if not doc_text or len(doc_text.strip()) < 50:
            err = "Malformed record: document text is empty or too short."
            print(f"    [!] SKIPPED: {err}")
            failed_cases.append({"index": idx, "id": doc_id, "error": err})
            continue

        if not ref_summary or len(ref_summary.strip()) < 20:
            err = "Malformed record: reference summary is missing."
            print(f"    [!] SKIPPED: {err}")
            failed_cases.append({"index": idx, "id": doc_id, "error": err})
            continue

        try:
            t0 = time.time()
            # Run multi-agent pipeline
            analysis, draft, validation = run_pipeline_on_document(
                doc_id=doc_id,
                doc_text=doc_text,
                requested_focus=requested_focus
            )
            elapsed = round(time.time() - t0, 2)

            generated_summary = validation.final_validated_summary
            is_approved = validation.is_approved_for_tts

            # Compute evaluation metrics against GovReport ground truth reference
            eval_metrics = govreport_evaluator.evaluate_summary(
                source_document=doc_text,
                generated_summary=generated_summary,
                reference_summary=ref_summary
            )

            rouge_scores = eval_metrics.get("rouge_scores", {})
            r1 = rouge_scores.get("rouge_1", {}).get("f1", 0.0)
            r2 = rouge_scores.get("rouge_2", {}).get("f1", 0.0)
            rl = rouge_scores.get("rouge_l", {}).get("f1", 0.0)

            print(f"    -> Status: {'APPROVED FOR TTS [PASS]' if is_approved else 'BLOCKED BY GATEKEEPER [BLOCKED]'}")
            print(f"    -> Overall Quality : {int(eval_metrics['overall_quality_score']*100)}%")
            print(f"    -> Factual Ground  : {int(eval_metrics['factual_consistency_score']*100)}%")
            print(f"    -> ROUGE-1 / 2 / L : {r1*100:.1f}% / {r2*100:.1f}% / {rl*100:.1f}%")
            print(f"    -> Pipeline Latency: {elapsed}s\n")

            if verbose:
                print(f"    [GENERATED SUMMARY]:\n    {generated_summary[:280]}...\n")
                print(f"    [REFERENCE SUMMARY]:\n    {ref_summary[:280]}...\n")

            results.append({
                "index": idx,
                "document_id": doc_id,
                "title": title,
                "agency": item.get("agency", "Federal Agency"),
                "source": item.get("source", "unknown"),
                "document_word_count": doc_word_count,
                "reference_word_count": ref_word_count,
                "generated_summary_word_count": len(generated_summary.split()),
                "generated_summary": generated_summary,
                "reference_summary": ref_summary,
                "is_approved_for_tts": is_approved,
                "unsupported_claims_count": len(validation.unsupported_claims),
                "relevance_score": eval_metrics["relevance_score"],
                "completeness_score": eval_metrics["completeness_score"],
                "factual_consistency_score": eval_metrics["factual_consistency_score"],
                "groundedness_score": eval_metrics["groundedness_score"],
                "validation_accuracy_score": eval_metrics["validation_accuracy_score"],
                "overall_quality_score": eval_metrics["overall_quality_score"],
                "rouge_1": r1,
                "rouge_2": r2,
                "rouge_l": rl,
                "elapsed_seconds": elapsed
            })

        except Exception as e:
            logger.error(f"Error evaluating document {doc_id}: {e}", exc_info=True)
            print(f"    [X] FAILED: {str(e)}\n")
            failed_cases.append({
                "index": idx,
                "document_id": doc_id,
                "title": title,
                "error": str(e)
            })

    total_time = round(time.time() - start_time, 2)
    successful_count = len(results)

    # 3. Calculate Aggregate Benchmark Averages
    averages = {}
    if successful_count > 0:
        keys_to_avg = [
            "relevance_score", "completeness_score", "factual_consistency_score",
            "groundedness_score", "validation_accuracy_score", "overall_quality_score",
            "rouge_1", "rouge_2", "rouge_l"
        ]
        for k in keys_to_avg:
            averages[k] = round(sum(r[k] for r in results) / successful_count, 4)

        tts_approved_count = sum(1 for r in results if r["is_approved_for_tts"])
        tts_approval_rate = round(tts_approved_count / successful_count, 4)
    else:
        tts_approved_count = 0
        tts_approval_rate = 0.0

    timestamp_str = datetime.datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    report_data = {
        "benchmark_name": "GovReport Long Document Summarization Benchmark",
        "dataset_name": "ccdv/govreport-summarization",
        "timestamp_utc": datetime.datetime.utcnow().isoformat() + "Z",
        "total_documents_requested": limit,
        "total_documents_processed": len(records),
        "successful_evaluations": successful_count,
        "failed_evaluations": len(failed_cases),
        "tts_approval_rate": tts_approval_rate,
        "total_time_seconds": total_time,
        "average_metrics": averages,
        "results": results,
        "failed_cases": failed_cases
    }

    # 4. Save JSON Report
    json_path = output_dir / f"govreport_benchmark_{timestamp_str}.json"
    latest_json_path = output_dir / "govreport_benchmark_latest.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)
    with open(latest_json_path, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)

    # 5. Generate and Save Markdown Report
    md_content = generate_markdown_report(report_data)
    md_path = output_dir / f"govreport_benchmark_{timestamp_str}.md"
    latest_md_path = output_dir / "govreport_benchmark_latest.md"
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)
    with open(latest_md_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    # 6. Print Formatted Summary to Console
    print_terminal_summary(report_data, str(json_path), str(md_path))

    return report_data


def generate_markdown_report(data: Dict[str, Any]) -> str:
    """Generates an academic-grade Markdown benchmark report."""
    avg = data.get("average_metrics", {})
    md = [
        "# GovReport Benchmark Evaluation Report",
        "",
        f"**Dataset**: `{data.get('dataset_name')}`  ",
        f"**Date**: {data.get('timestamp_utc')}  ",
        f"**Documents Evaluated**: {data.get('successful_evaluations')} / {data.get('total_documents_processed')}  ",
        f"**Validation TTS Approval Rate**: {int(data.get('tts_approval_rate', 0) * 100)}%  ",
        f"**Total Benchmark Execution Time**: {data.get('total_time_seconds')}s  ",
        "",
        "## 1. Aggregate Benchmark Metrics",
        "",
        "| Evaluation Metric | Benchmark Average | Description |",
        "| :--- | :---: | :--- |",
        f"| **Overall Quality** | **{avg.get('overall_quality_score', 0)*100:.1f}%** | Composite multi-dimensional quality index |",
        f"| **Factual Consistency** | **{avg.get('factual_consistency_score', 0)*100:.1f}%** | Freedom from factual errors / contradictions |",
        f"| **Source Groundedness** | **{avg.get('groundedness_score', 0)*100:.1f}%** | Traceability of metrics, dates, and claims |",
        f"| **Relevance** | **{avg.get('relevance_score', 0)*100:.1f}%** | Alignment with ground-truth reference summary |",
        f"| **Completeness** | **{avg.get('completeness_score', 0)*100:.1f}%** | Structural coverage of findings, risks & actions |",
        f"| **Validation Accuracy** | **{avg.get('validation_accuracy_score', 0)*100:.1f}%** | Certified statements passing gatekeeper scrutiny |",
        f"| **ROUGE-1 (F1)** | **{avg.get('rouge_1', 0)*100:.1f}%** | Unigram lexical overlap against reference |",
        f"| **ROUGE-2 (F1)** | **{avg.get('rouge_2', 0)*100:.1f}%** | Bigram contextual overlap against reference |",
        f"| **ROUGE-L (F1)** | **{avg.get('rouge_l', 0)*100:.1f}%** | Longest common sentence sequence overlap |",
        "",
        "## 2. Per-Document Evaluation Results",
        "",
        "| # | Document ID | Agency | Doc Words | Ref Words | Gen Words | Quality | Factual | ROUGE-1 | ROUGE-L | TTS Gatekeeper |",
        "| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |"
    ]

    for r in data.get("results", []):
        tts_badge = "✅ Approved" if r["is_approved_for_tts"] else "⛔ Blocked"
        md.append(
            f"| {r['index']} | `{r['document_id']}` | {r['agency'][:20]} | {r['document_word_count']:,} | "
            f"{r['reference_word_count']:,} | {r['generated_summary_word_count']:,} | "
            f"{r['overall_quality_score']*100:.1f}% | {r['factual_consistency_score']*100:.1f}% | "
            f"{r['rouge_1']*100:.1f}% | {r['rouge_l']*100:.1f}% | {tts_badge} |"
        )

    if data.get("failed_cases"):
        md.extend([
            "",
            "## 3. Failed / Error Cases",
            "",
            "| # | Document ID | Error Details |",
            "| :--- | :--- | :--- |"
        ])
        for fc in data["failed_cases"]:
            md.append(f"| {fc.get('index')} | `{fc.get('document_id')}` | {fc.get('error')} |")

    md.extend([
        "",
        "## 4. Qualitative Examples",
        ""
    ])
    for r in data.get("results", [])[:3]:
        md.extend([
            f"### Document: {r['document_id']} — {r['title']}",
            "",
            f"**Factual Consistency**: {r['factual_consistency_score']*100:.1f}% | **ROUGE-1**: {r['rouge_1']*100:.1f}% | **ROUGE-L**: {r['rouge_l']*100:.1f}%",
            "",
            "#### Generated Single Executive Paragraph:",
            f"> {r['generated_summary']}",
            "",
            "#### Ground-Truth Reference Summary:",
            f"> {r['reference_summary']}",
            "",
            "---"
        ])

    return "\n".join(md)


def print_terminal_summary(data: Dict[str, Any], json_path: str, md_path: str):
    """Prints a structured summary table to stdout."""
    avg = data.get("average_metrics", {})
    succ = data.get("successful_evaluations", 0)
    total = data.get("total_documents_processed", 0)
    failed = data.get("failed_evaluations", 0)

    print("\n" + "=" * 78)
    print("                     GOVREPORT BENCHMARK SUMMARY REPORT")
    print("=" * 78)
    print(f"Evaluated Successfully: {succ} / {total} document(s) (Failures: {failed})")
    print(f"TTS Gatekeeper Rate   : {int(data.get('tts_approval_rate', 0)*100)}% Approved")
    print(f"Execution Duration    : {data.get('total_time_seconds')} seconds")
    print("-" * 78)
    print("AVERAGE BENCHMARK METRICS:")
    print(f"  * Overall Summary Quality : {avg.get('overall_quality_score', 0)*100:5.1f}%")
    print(f"  * Factual Consistency     : {avg.get('factual_consistency_score', 0)*100:5.1f}%")
    print(f"  * Source Groundedness     : {avg.get('groundedness_score', 0)*100:5.1f}%")
    print(f"  * Relevance to Reference  : {avg.get('relevance_score', 0)*100:5.1f}%")
    print(f"  * Completeness (Thematic) : {avg.get('completeness_score', 0)*100:5.1f}%")
    print(f"  * Validation Accuracy     : {avg.get('validation_accuracy_score', 0)*100:5.1f}%")
    print(f"  * ROUGE-1 F1 Score        : {avg.get('rouge_1', 0)*100:5.1f}%")
    print(f"  * ROUGE-2 F1 Score        : {avg.get('rouge_2', 0)*100:5.1f}%")
    print(f"  * ROUGE-L F1 Score        : {avg.get('rouge_l', 0)*100:5.1f}%")
    print("-" * 78)

    if data.get("results"):
        print("DOCUMENT PERFORMANCE BREAKDOWN:")
        for r in data["results"]:
            status = "APPROVED" if r["is_approved_for_tts"] else "BLOCKED"
            print(f"  [{r['index']}] {r['document_id']:<24} | Qual: {r['overall_quality_score']*100:4.1f}% | Fact: {r['factual_consistency_score']*100:4.1f}% | R-1: {r['rouge_1']*100:4.1f}% | TTS: {status}")

    if data.get("failed_cases"):
        print("\nFAILED CASES:")
        for fc in data["failed_cases"]:
            print(f"  [X] {fc.get('document_id')}: {fc.get('error')}")

    print("-" * 78)
    print(f"Saved JSON Report: {json_path}")
    print(f"Saved Markdown   : {md_path}")
    print("=" * 78 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description="GovReport Long Document Summarization Benchmark Evaluator"
    )
    parser.add_argument(
        "--limit", "-n",
        type=int,
        default=10,
        help="Number of GovReport documents to evaluate (default: 10). Start small (e.g. 3-5) for rapid testing."
    )
    parser.add_argument(
        "--source",
        choices=["auto", "hf", "local"],
        default="auto",
        help="Dataset source: 'auto' (tries HF streaming, falls back to local), 'hf' (HuggingFace only), 'local' (local samples only)."
    )
    parser.add_argument(
        "--split",
        default="test",
        choices=["test", "validation", "train"],
        help="GovReport dataset split (default: test)."
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default=None,
        help="Directory to save benchmark reports (default: data/benchmark_results)."
    )
    parser.add_argument(
        "--focus",
        type=str,
        default="Comprehensive Executive Briefing",
        help="Requested focus/prompt for the summarization agent."
    )
    parser.add_argument(
        "--quiet", "-q",
        action="store_true",
        help="Suppress verbose generated and reference summary printing during benchmark run."
    )

    args = parser.parse_args()

    out_dir = Path(args.output_dir) if args.output_dir else None
    evaluate_benchmark(
        limit=args.limit,
        source=args.source,
        split=args.split,
        output_dir=out_dir,
        requested_focus=args.focus,
        verbose=not args.quiet
    )


if __name__ == "__main__":
    main()
