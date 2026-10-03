import io
import pytest
from fastapi.testclient import TestClient

def test_api_health(client: TestClient):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data

def test_upload_invalid_extension(client: TestClient):
    file_content = b"Binary executable code"
    files = {"file": ("malicious.exe", file_content, "application/octet-stream")}
    response = client.post("/api/documents/upload", files=files)
    assert response.status_code == 400
    assert "Unsupported file type" in response.json()["detail"]

def test_upload_empty_file(client: TestClient):
    files = {"file": ("empty.txt", b"", "text/plain")}
    response = client.post("/api/documents/upload", files=files)
    assert response.status_code == 400
    assert "empty" in response.json()["detail"].lower()

def test_upload_valid_txt_and_run_pipeline(client: TestClient):
    content = (
        "SECTION 1: OVERVIEW\n"
        "Federal agencies spent $42 billion on research grants in fiscal year 2021.\n\n"
        "SECTION 2: RISKS\n"
        "A critical risk of timeline delay was observed in 34 percent of grants.\n\n"
        "SECTION 3: DECISIONS & RECOMMENDATIONS\n"
        "The director decided to mandate quarterly audits.\n"
        "We recommend establishing automated alerts."
    ).encode("utf-8")

    files = {"file": ("test_report.txt", content, "text/plain")}
    upload_res = client.post("/api/documents/upload", files=files)
    assert upload_res.status_code == 200
    upload_data = upload_res.json()
    doc_id = upload_data["document_id"]
    assert upload_data["chunks_count"] > 0

    # Test listing documents
    list_res = client.get("/api/documents")
    assert list_res.status_code == 200
    assert len(list_res.json()) >= 1

    # Test document detail
    detail_res = client.get(f"/api/documents/{doc_id}")
    assert detail_res.status_code == 200
    assert detail_res.json()["id"] == doc_id

    # Test knowledge base search
    search_res = client.get(f"/api/documents/{doc_id}/search?q=research+grants")
    assert search_res.status_code == 200
    assert len(search_res.json()["results"]) > 0

    # Test running multi-agent pipeline
    run_payload = {
        "document_id": doc_id,
        "requested_focus": "Identify the major risks and decisions",
        "language": "en",
        "auto_generate_audio": False
    }
    pipeline_res = client.post("/api/pipeline/run", json=run_payload)
    assert pipeline_res.status_code == 200
    run_data = pipeline_res.json()
    run_id = run_data["workflow_run_id"]
    assert run_data["status"] == "COMPLETED"
    assert run_data["validation"]["is_approved_for_tts"] is True

    # Test retrieve pipeline run
    get_run_res = client.get(f"/api/pipeline/runs/{run_id}")
    assert get_run_res.status_code == 200
    assert get_run_res.json()["workflow_run_id"] == run_id

    # Test feedback submission
    feedback_payload = {
        "workflow_run_id": run_id,
        "rating": 5,
        "is_helpful": True,
        "feedback_text": "Highly accurate and grounded summary."
    }
    fb_res = client.post("/api/feedback", json=feedback_payload)
    assert fb_res.status_code == 200
    assert fb_res.json()["rating"] == 5

    # Test retrieve feedback
    fb_list_res = client.get(f"/api/feedback/workflow/{run_id}")
    assert fb_list_res.status_code == 200
    assert len(fb_list_res.json()) >= 1

def test_govreport_endpoints(client: TestClient):
    # Test listing GovReport samples
    list_samples = client.get("/api/evaluation/govreport/samples")
    assert list_samples.status_code == 200
    samples = list_samples.json()["samples"]
    assert len(samples) >= 1

    sample_id = samples[0]["id"]

    # Test running benchmark evaluation on sample
    bench_res = client.post(f"/api/evaluation/govreport/run/{sample_id}")
    assert bench_res.status_code == 200
    bench_data = bench_res.json()
    assert bench_data["overall_quality_score"] > 0.5
    assert bench_data["factual_consistency_score"] > 0.5
