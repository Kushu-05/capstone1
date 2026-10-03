import pytest
from backend.services.multi_doc_analyzer import infer_document_domain, analyze_document_relationships
from backend.agents.summarization_agent import SummarizationAgent
from backend.agents.validation_agent import SummaryValidationAgent
from backend.agents.audio_script_agent import AudioScriptAdaptationAgent
from backend.schemas.agent_schemas import DocumentAnalysisResult, FactItem, RiskItem, DecisionItem

def test_infer_document_domain():
    # Cybersecurity
    d1 = infer_document_domain(
        "CRS-R47437.pdf",
        ["CIRCIA Overview", "Critical Infrastructure"],
        "Cybersecurity incidents must be reported to CISA within 72 hours under critical infrastructure frameworks."
    )
    assert "Cybersecurity" in d1

    # Agriculture
    d2 = infer_document_domain(
        "wheat_agronomy_2024.txt",
        ["Soil Quality", "Harvest Metrics"],
        "Nitrogen fertilizer application impacts wheat crop yield and soil moisture in winter farming."
    )
    assert "Agronomy" in d2 or "Agricultural" in d2

    # Healthcare
    d3 = infer_document_domain(
        "clinical_trial_summary.pdf",
        ["Patient Care", "Hospital Protocols"],
        "Clinical trials evaluated drug efficacy and disease management across 500 hospital patients."
    )
    assert "Healthcare" in d3 or "Clinical" in d3


def test_analyze_document_relationships_unrelated():
    doc1 = {
        "id": "doc_cyber",
        "original_name": "CRS-R47437_Cybersecurity.pdf",
        "full_text": "CISA and CIRCIA establish mandatory cyber incident reporting for critical infrastructure attacks and ransomware threats across federal networks.",
        "sections": ["CIRCIA Incident Mandate", "CISA Critical Infrastructure Guidelines"]
    }
    doc2 = {
        "id": "doc_agri",
        "original_name": "Agricultural_Soil_Study.pdf",
        "full_text": "Farming agronomy practices optimize crop yields through organic fertilizer, soil nitrogen enrichment, and regulated irrigation for grain harvest.",
        "sections": ["Soil Quality and Nutrients", "Harvest Yield Analysis"]
    }

    result = analyze_document_relationships([doc1, doc2])
    assert result["are_unrelated"] is True
    assert len(result["clusters"]) == 2
    assert "Cross-Domain Notice" in result["disclaimer"]
    assert "Cybersecurity" in result["disclaimer"]
    assert "Agronomy" in result["disclaimer"] or "Agricultural" in result["disclaimer"]
    assert result["min_jaccard"] < 0.15


def test_analyze_document_relationships_related():
    doc1 = {
        "id": "doc_cyber1",
        "original_name": "CRS-R47437_CISA_Reporting.pdf",
        "full_text": "CISA establishes mandatory cyber incident reporting for critical infrastructure attacks and ransomware threats across federal networks.",
        "sections": ["Cyber Incident Mandate", "Threat Vectors"]
    }
    doc2 = {
        "id": "doc_cyber2",
        "original_name": "Federal_Cybersecurity_Incident_Protocols.pdf",
        "full_text": "Federal agencies must report cyber incidents and ransomware breaches to CISA to maintain critical infrastructure resilience.",
        "sections": ["Breach Reporting", "CISA Coordination"]
    }

    result = analyze_document_relationships([doc1, doc2])
    assert result["are_unrelated"] is False


def test_summarization_unrelated_documents_multi_paragraph():
    summarizer = SummarizationAgent()

    doc1_name = "CRS-R47437_Cybersecurity.pdf"
    doc2_name = "Agricultural_Soil_Study.pdf"

    chunks = [
        {
            "chunk_id": "c1",
            "document_id": "d1",
            "document_name": doc1_name,
            "page_number": 1,
            "section_title": "Cyber Incident Mandate",
            "content": "CIRCIA requires covered entities to report substantial cyber incidents within 72 hours and ransomware payments within 24 hours."
        },
        {
            "chunk_id": "c2",
            "document_id": "d2",
            "document_name": doc2_name,
            "page_number": 1,
            "section_title": "Soil Management",
            "content": "Sustainable agronomy techniques improve soil organic matter and optimize wheat harvest yields under seasonal drought conditions."
        }
    ]

    analysis = DocumentAnalysisResult(
        key_facts=[
            FactItem(fact="Entities must report cyber incidents to CISA within 72 hours.", page=1, section=f"{doc1_name}: Cyber Mandate"),
            FactItem(fact="Organic nitrogen application increases wheat crop yield by 14 percent.", page=1, section=f"{doc2_name}: Soil Quality")
        ],
        risks=[
            RiskItem(risk="Unreported ransomware attacks compromise critical infrastructure security.", page=1, section=f"{doc1_name}: Risks"),
            RiskItem(risk="Nutrient depletion degrades soil productivity over repeated harvest cycles.", page=1, section=f"{doc2_name}: Soil Risks")
        ],
        decisions=[],
        recommendations=[],
        action_items=[],
        relevant_sections=[]
    )

    context = {
        "is_multi_document": True,
        "are_unrelated": True,
        "relationship_disclaimer": "⚠️ Cross-Domain Notice: The analyzed documents address distinct, unrelated subject matters ('CRS-R47437_Cybersecurity.pdf' covers Cybersecurity & Critical Infrastructure Policy, whereas 'Agricultural_Soil_Study.pdf' covers Agronomy & Agricultural Resource Management). To preserve factual integrity and prevent cross-domain conflation, their findings are organized into separate dedicated paragraphs below:",
        "clusters": [
            {"cluster_id": 1, "domain": "Cybersecurity & Critical Infrastructure Policy", "doc_names": [doc1_name], "doc_ids": ["d1"]},
            {"cluster_id": 2, "domain": "Agronomy & Agricultural Resource Management", "doc_names": [doc2_name], "doc_ids": ["d2"]}
        ],
        "domains": {
            "d1": "Cybersecurity & Critical Infrastructure Policy",
            "d2": "Agronomy & Agricultural Resource Management"
        },
        "requested_focus": "Balanced Briefing in 250 words",
        "language": "en"
    }

    draft = summarizer.run({"analysis": analysis, "chunks": chunks}, context)

    # 1. Verify multi-paragraph structure
    paragraphs = [p for p in draft.executive_summary.split("\n\n") if p.strip()]
    assert len(paragraphs) >= 3, f"Expected at least 3 distinct paragraphs, got {len(paragraphs)}"

    # 2. Verify disclaimer notice in first paragraph
    assert "Cross-Domain Notice" in paragraphs[0]
    assert "⚠️" in paragraphs[0]

    # 3. Verify each document has its own dedicated paragraph with folder icon
    doc_paragraphs = [p for p in paragraphs if not p.startswith("⚠️") and "Cross-Domain Notice" not in p and "Takeaway" not in p and "🔄" not in p]
    doc1_para = next((p for p in doc_paragraphs if doc1_name in p), None)
    doc2_para = next((p for p in doc_paragraphs if doc2_name in p), None)
    assert doc1_para is not None, f"Missing dedicated paragraph for {doc1_name}"
    assert doc2_para is not None, f"Missing dedicated paragraph for {doc2_name}"
    assert doc1_para != doc2_para, "Document paragraphs should be strictly separate"

    # 4. Verify comparative takeaway paragraph
    takeaway_para = next((p for p in paragraphs if "Takeaway" in p or "🔄" in p), None)
    assert takeaway_para is not None, "Missing comparative takeaway paragraph"


def test_validation_preserves_multi_paragraph_structure():
    validator = SummaryValidationAgent()

    full_text = (
        "CIRCIA requires covered entities to report substantial cyber incidents within 72 hours. "
        "Sustainable agronomy techniques improve soil organic matter and optimize wheat harvest yields."
    )

    doc1_name = "CRS-R47437_Cybersecurity.pdf"
    doc2_name = "Agricultural_Soil_Study.pdf"

    chunks = [
        {"chunk_id": "c1", "page_number": 1, "content": "CIRCIA requires covered entities to report substantial cyber incidents within 72 hours."},
        {"chunk_id": "c2", "page_number": 1, "content": "Sustainable agronomy techniques improve soil organic matter and optimize wheat harvest yields."}
    ]

    expected_summary = (
        "⚠️ Cross-Domain Notice: The analyzed documents address distinct, unrelated subject matters.\n\n"
        f"📁 {doc1_name} (Cybersecurity): Operational assessments indicate that CIRCIA requires entities to report substantial cyber incidents within 72 hours.\n\n"
        f"📁 {doc2_name} (Agronomy): Operational assessments confirm that sustainable agronomy techniques improve soil organic matter and optimize wheat harvest yields.\n\n"
        "🔄 Cross-Domain Institutional Takeaway: Comparative analysis underscores that these documents govern completely separate operational landscapes."
    )

    from backend.schemas.agent_schemas import DraftSummaryResult, KeyFinding, SourceReference
    draft_summary = DraftSummaryResult(
        requested_focus="Comprehensive Executive Briefing",
        executive_summary=expected_summary,
        key_findings=[
            KeyFinding(finding="Cyber reporting is required within 72 hours", source_refs=[SourceReference(page=1, section="Overview", chunk_id="c1", quote_or_topic="72 hours")])
        ],
        source_references=[SourceReference(page=1, section="Overview", chunk_id="c1", quote_or_topic="72 hours")],
        raw_draft=expected_summary
    )

    context = {
        "are_unrelated": True,
        "language": "en"
    }

    val_res = validator.run({"draft": draft_summary, "chunks": chunks, "full_text": full_text}, context)

    # Verify that validation preserved paragraph boundaries
    val_paragraphs = [p for p in val_res.final_validated_summary.split("\n\n") if p.strip()]
    assert len(val_paragraphs) >= 3, f"Validation flattened paragraphs! Expected >= 3 paragraphs, got {len(val_paragraphs)}"
    assert "Cross-Domain Notice" in val_res.final_validated_summary
    assert doc1_name in val_res.final_validated_summary
    assert doc2_name in val_res.final_validated_summary
    assert val_res.factual_consistency_score >= 0.80
    assert val_res.is_approved_for_tts is True


def test_audio_script_unrelated_adaptation():
    audio_agent = AudioScriptAdaptationAgent()

    from backend.schemas.agent_schemas import ValidationResult
    val_result = ValidationResult(
        factual_consistency_score=0.95,
        groundedness_score=0.95,
        validation_accuracy_score=0.95,
        unsupported_claims=[],
        contradictions=[],
        missing_info=[],
        final_validated_summary=(
            "⚠️ Cross-Domain Notice: The analyzed documents address distinct, unrelated subject matters.\n\n"
            "📁 CRS-R47437.pdf (Cybersecurity): CIRCIA requires covered entities to report substantial cyber incidents within 72 hours.\n\n"
            "📁 Agricultural_Soil.pdf (Agronomy): Sustainable agronomy techniques improve soil organic matter and optimize wheat harvest yields.\n\n"
            "🔄 Cross-Domain Institutional Takeaway: Comparative analysis underscores that these documents govern completely separate operational landscapes."
        ),
        is_approved_for_tts=True
    )

    context = {
        "are_unrelated": True,
        "language": "en"
    }

    script_res = audio_agent.run({"validation": val_result, "document_name": "multi-document briefing"}, context)

    assert "cross-domain" in script_res.broadcast_script.lower() or "distinct" in script_res.broadcast_script.lower()
    assert "distinct" in script_res.broadcast_script.lower() or "unrelated" in script_res.broadcast_script.lower()
    assert len(script_res.spoken_anchors) >= 3
