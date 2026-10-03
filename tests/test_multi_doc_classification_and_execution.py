import pytest
from backend.services.multi_doc_analyzer import analyze_document_relationships
from backend.agents.summarization_agent import SummarizationAgent
from backend.schemas.agent_schemas import DocumentAnalysisResult, FactItem, RiskItem

def test_relationship_classification_related():
    # Documents covering corporate annual reports / fiscal updates for the same subject
    doc1 = {
        "id": "msft_2023",
        "original_name": "Microsoft_Annual_Report_2023.pdf",
        "full_text": "Microsoft Corporation reported revenue of $211 billion for fiscal year 2023, driven by Intelligent Cloud and Azure growth. Operating income increased as commercial cloud revenue expanded.",
        "sections": ["Financial Highlights 2023", "Cloud Growth & Azure"]
    }
    doc2 = {
        "id": "msft_2024",
        "original_name": "Microsoft_Annual_Report_2024.pdf",
        "full_text": "Microsoft Corporation reported revenue of $245 billion for fiscal year 2024. Commercial cloud and Azure AI services fueled operating margins and capital investments across global data centers.",
        "sections": ["Financial Highlights 2024", "Commercial Cloud Expansion"]
    }

    result = analyze_document_relationships([doc1, doc2])
    assert result["classification"] == "RELATED"
    assert result["are_unrelated"] is False
    assert result["warning_message"] is None
    assert result["summary_strategy"] == "UNIFIED_SYNTHESIS"
    assert len(result["pairwise_scores"]) == 1
    assert result["avg_jaccard"] >= 0.15

def test_relationship_classification_unrelated():
    # Completely unrelated domains: Corporate software annual report vs Climate change paper vs Python documentation
    doc1 = {
        "id": "msft_2025",
        "original_name": "Microsoft_Annual_Report_2025.pdf",
        "full_text": "Microsoft Corporation commercial revenue and cloud subscriptions grew, generating operating cash flows and shareholder returns.",
        "sections": ["Shareholder Return", "Commercial Cloud"]
    }
    doc2 = {
        "id": "climate_paper",
        "original_name": "Climate_Change_Impact_Study.pdf",
        "full_text": "Atmospheric greenhouse gas emissions accelerate polar ice cap melting and alter oceanic precipitation cycles, impacting global biodiversity.",
        "sections": ["Atmospheric Temperature", "Ecosystem Impacts"]
    }
    doc3 = {
        "id": "python_docs",
        "original_name": "Python_Technical_Specification.txt",
        "full_text": "Python byte-code execution relies on the global interpreter lock, garbage collection, and dynamic object memory allocators.",
        "sections": ["Interpreter Internals", "Memory Management"]
    }

    result = analyze_document_relationships([doc1, doc2, doc3])
    assert result["classification"] == "UNRELATED"
    assert result["are_unrelated"] is True
    assert result["warning_message"] is not None
    assert "⚠️ The uploaded documents appear to be unrelated." in result["warning_message"]
    assert "summarized separately" in result["warning_message"]
    assert result["summary_strategy"] == "INDEPENDENT_SEPARATE"

def test_summarization_agent_related_generates_one_unified_summary():
    summarizer = SummarizationAgent()
    doc1_name = "Microsoft_Annual_Report_2023.pdf"
    doc2_name = "Microsoft_Annual_Report_2024.pdf"

    chunks = [
        {
            "chunk_id": "c1",
            "document_id": "d1",
            "document_name": doc1_name,
            "page_number": 1,
            "section_title": "Financial Highlights 2023",
            "content": "Microsoft Corporation reported revenue of $211 billion for fiscal year 2023, driven by Intelligent Cloud."
        },
        {
            "chunk_id": "c2",
            "document_id": "d2",
            "document_name": doc2_name,
            "page_number": 1,
            "section_title": "Financial Highlights 2024",
            "content": "Microsoft Corporation reported revenue of $245 billion for fiscal year 2024, with commercial cloud expansion."
        }
    ]

    analysis = DocumentAnalysisResult(
        key_facts=[
            FactItem(fact="Fiscal 2023 revenue reached $211 billion.", page=1, section="2023 Financials"),
            FactItem(fact="Fiscal 2024 revenue expanded to $245 billion.", page=1, section="2024 Financials")
        ],
        risks=[
            RiskItem(risk="Macroeconomic headwinds may pressure IT enterprise expenditure.", page=1, section="Risks")
        ],
        decisions=[],
        recommendations=[],
        action_items=[],
        relevant_sections=[]
    )

    context = {
        "is_multi_document": True,
        "classification": "RELATED",
        "are_unrelated": False,
        "document_names": [doc1_name, doc2_name],
        "requested_focus": "Executive Summary in 150 words",
        "language": "en"
    }

    draft = summarizer.run({"analysis": analysis, "chunks": chunks}, context)

    # Must be ONE unified synthesis (not separated with folder icons or separate paragraphs per doc)
    assert "📁" not in draft.executive_summary
    assert "Cross-Domain Notice" not in draft.executive_summary
    # Should synthesize both reporting periods into the unified narrative
    assert "2023" in draft.executive_summary and "2024" in draft.executive_summary
    assert len(draft.executive_summary.split()) >= 40

def test_api_run_multi_unrelated_documents(client):
    # Upload Document 1: Cybersecurity
    doc1_bytes = (
        "SECTION: Critical Infrastructure Protection\n"
        "CISA requires all critical infrastructure sectors to report severe cyber incidents and ransomware within strict timelines."
    ).encode("utf-8")
    up1 = client.post("/api/documents/upload", files={"file": ("CRS_Cybersecurity_Notice.txt", doc1_bytes, "text/plain")})
    assert up1.status_code == 200
    doc1_id = up1.json()["document_id"]

    # Upload Document 2: Agronomy
    doc2_bytes = (
        "SECTION: Agronomy Yields\n"
        "Wheat farmers achieved superior harvest yield using organic nitrogen fertilization and drought-resistant soil cultivation."
    ).encode("utf-8")
    up2 = client.post("/api/documents/upload", files={"file": ("Wheat_Agronomy_Study.txt", doc2_bytes, "text/plain")})
    assert up2.status_code == 200
    doc2_id = up2.json()["document_id"]

    # Run multi-document pipeline
    run_res = client.post("/api/pipeline/run-multi", json={
        "document_ids": [doc1_id, doc2_id],
        "requested_focus": "Executive Briefing",
        "auto_generate_audio": False
    })
    assert run_res.status_code == 200
    data = run_res.json()

    assert data["relationship_classification"] == "UNRELATED"
    assert data["are_unrelated"] is True
    assert data["warning_message"] is not None
    assert "⚠️ The uploaded documents appear to be unrelated." in data["warning_message"]
    assert "summarized separately" in data["warning_message"]
    assert data["summary_strategy"] == "INDEPENDENT_SEPARATE"
    assert data["separate_summaries"] is not None
    assert len(data["separate_summaries"]) == 2

    # Check that each document has its own independent summary
    doc_names = [s["document_name"] for s in data["separate_summaries"]]
    assert "CRS_Cybersecurity_Notice.txt" in doc_names
    assert "Wheat_Agronomy_Study.txt" in doc_names

    for s in data["separate_summaries"]:
        assert len(s["summary"]) > 10
        assert s["factual_consistency_score"] is not None

def test_api_run_multi_related_documents(client):
    # Upload Document 1: Microsoft FY23
    doc1_bytes = (
        "SECTION: Microsoft FY23 Financials\n"
        "Microsoft Corporation generated $211 billion in revenue for fiscal year 2023 driven by cloud infrastructure and enterprise software."
    ).encode("utf-8")
    up1 = client.post("/api/documents/upload", files={"file": ("MSFT_FY23_Report.txt", doc1_bytes, "text/plain")})
    assert up1.status_code == 200
    doc1_id = up1.json()["document_id"]

    # Upload Document 2: Microsoft FY24
    doc2_bytes = (
        "SECTION: Microsoft FY24 Financials\n"
        "Microsoft Corporation generated $245 billion in revenue for fiscal year 2024 driven by cloud services and Azure AI commercial expansion."
    ).encode("utf-8")
    up2 = client.post("/api/documents/upload", files={"file": ("MSFT_FY24_Report.txt", doc2_bytes, "text/plain")})
    assert up2.status_code == 200
    doc2_id = up2.json()["document_id"]

    # Run multi-document pipeline
    run_res = client.post("/api/pipeline/run-multi", json={
        "document_ids": [doc1_id, doc2_id],
        "requested_focus": "Executive Briefing",
        "auto_generate_audio": False
    })
    assert run_res.status_code == 200
    data = run_res.json()

    assert data["relationship_classification"] == "RELATED"
    assert data["are_unrelated"] is False
    assert data["warning_message"] is None
    assert data["summary_strategy"] == "UNIFIED_SYNTHESIS"
    assert data["separate_summaries"] is None
    # Output must NOT be partitioned by folder icons for related documents
    final_sum = data["validation"]["final_validated_summary"]
    assert "📁" not in final_sum
    assert "Cross-Domain Notice" not in final_sum

