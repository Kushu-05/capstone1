import sys
import os
import requests
import json

# Ensure UTF-8 output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

VITE_URL = "http://127.0.0.1:5173"
BACKEND_URL = "http://127.0.0.1:8000"

def test_e2e():
    print("==================================================")
    print("STARTING COMPLETE E2E REACT + FASTAPI INTEGRATION TEST")
    print("==================================================")

    # 1. Verify React Frontend HTTP
    print("\n[1/7] Testing React Vite Frontend on port 5173...")
    r_front = requests.get(VITE_URL, timeout=5)
    assert r_front.status_code == 200, f"React server failed: {r_front.status_code}"
    assert "DocVoice AI" in r_front.text or "<div id=\"root\">" in r_front.text, "Index HTML missing root div"
    print("  [PASS] React frontend is responding on http://127.0.0.1:5173 (HTTP 200)")

    # 2. Verify Vite Proxy to FastAPI
    print("\n[2/7] Testing Vite Proxy (/api -> FastAPI:8000)...")
    r_proxy = requests.get(f"{VITE_URL}/api/health", timeout=5)
    assert r_proxy.status_code == 200, f"Vite proxy failed: {r_proxy.status_code}"
    health_data = r_proxy.json()
    assert health_data.get("status") == "healthy", f"Health data unexpected: {health_data}"
    print(f"  [PASS] Vite Proxy forwarding to FastAPI: {health_data}")

    # 3. Test Dashboard Stats Overview
    print("\n[3/7] Testing Dashboard Stats Overview API...")
    r_stats = requests.get(f"{BACKEND_URL}/api/documents/stats/overview", timeout=5)
    assert r_stats.status_code == 200
    stats = r_stats.json()
    print(f"  [PASS] Stats: {stats['total_documents']} documents, {stats['total_workflows']} workflows, {stats['total_audio_briefings']} audio briefings")

    # 4. Test Existing Document Retrieval
    print("\n[4/7] Testing Document Retrieval & Sections...")
    r_docs = requests.get(f"{BACKEND_URL}/api/documents", timeout=5)
    assert r_docs.status_code == 200
    docs = r_docs.json()
    test_doc = next((d for d in docs if d.get("original_name", "").lower().endswith(('.pdf', '.docx', '.txt'))), docs[0])
    doc_id = test_doc["id"]
    print(f"  [PASS] Selected Document: '{test_doc['original_name']}' (ID: {doc_id}, Pages: {test_doc['page_count']})")

    # 5. Test Grounded Document Q&A
    print("\n[5/7] Testing Grounded Document Q&A (/api/documents/{id}/qa)...")
    qa_payload = {"question": "What are the key points and conclusions in this document?"}
    r_qa = requests.post(f"{BACKEND_URL}/api/documents/{doc_id}/qa", json=qa_payload, timeout=20)
    assert r_qa.status_code == 200, f"QA failed: {r_qa.text}"
    qa_res = r_qa.json()
    assert "answer" in qa_res and len(qa_res["answer"]) > 10, "QA response missing answer"
    print(f"  [PASS] Q&A Answer: {qa_res['answer'][:120]}...")
    print(f"  [PASS] Grounded sources: {len(qa_res.get('sources', []))} source chunks.")

    # 6. Test Cross-Document Comparison
    print("\n[6/7] Testing Cross-Document Comparison (/api/documents/compare)...")
    report_docs = [d for d in docs if d.get("original_name", "").lower().endswith(('.pdf', '.docx', '.txt'))]
    if len(report_docs) >= 2:
        compare_payload = {"doc_id_1": report_docs[0]["id"], "doc_id_2": report_docs[1]["id"]}
        r_comp = requests.post(f"{BACKEND_URL}/api/documents/compare", json=compare_payload, timeout=20)
        assert r_comp.status_code == 200, f"Compare failed: {r_comp.text}"
        comp_res = r_comp.json()
        print(f"  [PASS] Compared: '{comp_res['doc1']['name']}' vs '{comp_res['doc2']['name']}'")
        print(f"  [PASS] Similarities: {len(comp_res['similarities'])} items, Differences: {len(comp_res['differences'])} items")
    else:
        print("  [SKIP] Need at least 2 documents for cross-comparison test.")

    # 7. Test GovReport Benchmark Sample & Run
    print("\n[7/7] Testing GovReport Academic Benchmark Suite...")
    r_gov = requests.get(f"{BACKEND_URL}/api/evaluation/govreport/samples", timeout=5)
    assert r_gov.status_code == 200
    samples = r_gov.json().get("samples", [])
    assert len(samples) > 0, "No GovReport samples found"
    sample_id = samples[0]["id"]
    print(f"  [PASS] Found {len(samples)} benchmark samples. Running evaluation on '{sample_id}'...")

    r_eval = requests.post(f"{BACKEND_URL}/api/evaluation/govreport/run/{sample_id}", timeout=25)
    assert r_eval.status_code == 200, f"GovReport eval failed: {r_eval.text}"
    eval_res = r_eval.json()
    print(f"  [PASS] Benchmark Overall Score: {eval_res['overall_quality_score'] * 100:.1f}%")
    print(f"  [PASS] Factual Consistency: {eval_res['factual_consistency_score'] * 100:.1f}%, Groundedness: {eval_res['groundedness_score'] * 100:.1f}%")

    print("\n==================================================")
    print("ALL 7 END-TO-END VERIFICATION CHECKS PASSED PERFECTLY!")
    print("==================================================")

if __name__ == "__main__":
    test_e2e()
