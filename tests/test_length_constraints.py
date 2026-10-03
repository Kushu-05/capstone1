import pytest
from backend.utils.length_parser import extract_length_constraint, enforce_length_constraint
from backend.agents.summarization_agent import SummarizationAgent
from backend.agents.validation_agent import SummaryValidationAgent
from backend.schemas.agent_schemas import DocumentAnalysisResult, FactItem, RiskItem, DecisionItem, RecommendationItem, ActionItem

def test_extract_length_constraint():
    # Qualitative length modes
    cdetailed = extract_length_constraint("Detailed Summary")
    assert cdetailed is not None
    assert cdetailed["mode"] == "detailed"
    assert cdetailed["target"] == 1000
    assert cdetailed["min_words"] == 800
    assert cdetailed["max_words"] == 1200

    cmedium = extract_length_constraint("Medium Summary")
    assert cmedium is not None
    assert cmedium["mode"] == "medium"
    assert cmedium["target"] == 500
    assert cmedium["min_words"] == 400
    assert cmedium["max_words"] == 600

    csmall = extract_length_constraint("Small Summary")
    assert csmall is not None
    assert csmall["mode"] == "small"
    assert csmall["target"] == 200
    assert csmall["min_words"] == 160
    assert csmall["max_words"] == 240

    # Word count extraction
    c100 = extract_length_constraint("Please summarize in 100 words")
    assert c100 is not None
    assert c100["unit"] == "words"
    assert c100["target"] == 100
    assert c100["min_words"] == 80
    assert c100["max_words"] == 120

    c50 = extract_length_constraint("give summarize in 50 words please")
    assert c50 is not None
    assert c50["unit"] == "words"
    assert c50["target"] == 50
    assert c50["min_words"] == 40
    assert c50["max_words"] == 60

    c_under = extract_length_constraint("under 75 words")
    assert c_under is not None
    assert c_under["target"] == 75

    # Token extraction
    ctok = extract_length_constraint("summarize in 60 tokens")
    assert ctok is not None
    assert ctok["unit"] == "tokens"
    assert ctok["target"] == 60
    assert ctok["target_words"] == 45

    # None when no length constraint is specified
    cnone = extract_length_constraint("Summarize the main financial risks and governance decisions")
    assert cnone is None

def test_enforce_length_constraint():
    c50 = extract_length_constraint("in 50 words")
    
    # Text shorter than constraint remains intact
    short_text = "This is a short summary that is well within the limits."
    assert enforce_length_constraint(short_text, c50) == short_text

    # Text longer than constraint is trimmed cleanly
    long_sentences = (
        "First sentence provides baseline context about the document. "
        "Second sentence highlights critical operational metrics and key findings. "
        "Third sentence details the identified risk factors and compliance mandates. "
        "Fourth sentence details governance milestones scheduled for next quarter. "
        "Fifth sentence adds extra background information that exceeds the requested limit."
    )
    trimmed = enforce_length_constraint(long_sentences, c50)
    words = trimmed.split()
    assert len(words) <= c50["max_words"]
    assert trimmed.endswith(".")

def test_summarization_agent_various_word_budgets():
    agent = SummarizationAgent()
    val_agent = SummaryValidationAgent()

    analysis = DocumentAnalysisResult(
        document_id="doc_test",
        domain="finance",
        key_facts=[
            FactItem(fact="Q3 revenue increased by 18 percent to 4.2 million dollars.", page=1, section="Finance"),
            FactItem(fact="Operating margin expanded by 340 basis points year over year.", page=1, section="Finance"),
            FactItem(fact="Customer retention reached 94 percent across enterprise tiers.", page=2, section="Operations"),
            FactItem(fact="Cloud infrastructure expenditure was reduced by 12 percent.", page=2, section="Operations")
        ],
        risks=[
            RiskItem(risk="Supply chain disruptions could increase delivery lag by 14 days.", severity="medium", page=2),
            RiskItem(risk="Currency fluctuation creates revenue volatility across overseas hubs.", severity="low", page=2)
        ],
        decisions=[
            DecisionItem(decision="Board approved expansion into APAC markets.", page=1)
        ],
        recommendations=[
            RecommendationItem(recommendation="Maintain hedging strategy against currency volatility.", page=3)
        ],
        action_items=[
            ActionItem(action="Deploy automated financial tracking software by Q4.", page=3)
        ],
        relevant_sections=[]
    )

    chunks = [
        {"chunk_id": "c1", "page_number": 1, "section_title": "Finance", "content": "Q3 revenue grew by 18 percent. Operating margin expanded by 340 basis points."},
        {"chunk_id": "c2", "page_number": 2, "section_title": "Operations", "content": "Customer retention reached 94 percent. Cloud infrastructure expenditure was reduced by 12 percent."},
        {"chunk_id": "c3", "page_number": 3, "section_title": "Recommendations", "content": "Maintain hedging strategy against currency volatility. Deploy automated tracking software by Q4."}
    ]

    # Test 50-word budget
    res50 = agent.run(
        input_data={"analysis": analysis, "chunks": chunks},
        context={"requested_focus": "summarize in 50 words", "language": "en"}
    )
    w50 = len(res50.executive_summary.split())
    assert 35 <= w50 <= 60, f"Expected ~50 words, got {w50}"
    assert "\n" not in res50.executive_summary

    # Test 100-word budget
    res100 = agent.run(
        input_data={"analysis": analysis, "chunks": chunks},
        context={"requested_focus": "summarize in 100 words", "language": "en"}
    )
    w100 = len(res100.executive_summary.split())
    assert 75 <= w100 <= 125, f"Expected ~100 words, got {w100}"
    assert "\n" not in res100.executive_summary

    # Test ValidationAgent honors 50-word constraint
    val_res = val_agent.run(
        input_data={"draft": res50, "chunks": chunks, "full_text": " ".join([c["content"] for c in chunks])},
        context={"requested_focus": "summarize in 50 words", "language": "en"}
    )
    val_w50 = len(val_res.final_validated_summary.split())
    assert 35 <= val_w50 <= 60, f"ValidationAgent produced {val_w50} words instead of ~50 words"

def test_detailed_medium_small_modes():
    agent = SummarizationAgent()

    analysis = DocumentAnalysisResult(
        document_id="doc_test",
        domain="finance",
        key_facts=[
            FactItem(fact="Q3 revenue increased by 18 percent to 4.2 million dollars.", page=1, section="Finance"),
            FactItem(fact="Operating margin expanded by 340 basis points year over year.", page=1, section="Finance"),
            FactItem(fact="Customer retention reached 94 percent across enterprise tiers.", page=2, section="Operations"),
            FactItem(fact="Cloud infrastructure expenditure was reduced by 12 percent.", page=2, section="Operations")
        ],
        risks=[
            RiskItem(risk="Supply chain disruptions could increase delivery lag by 14 days.", severity="medium", page=2),
            RiskItem(risk="Currency fluctuation creates revenue volatility across overseas hubs.", severity="low", page=2)
        ],
        decisions=[
            DecisionItem(decision="Board approved expansion into APAC markets.", page=1)
        ],
        recommendations=[
            RecommendationItem(recommendation="Maintain hedging strategy against currency volatility.", page=3)
        ],
        action_items=[
            ActionItem(action="Deploy automated financial tracking software by Q4.", page=3)
        ],
        relevant_sections=[]
    )

    chunks = [
        {"chunk_id": "c1", "page_number": 1, "section_title": "Finance", "content": "Q3 revenue grew by 18 percent. Operating margin expanded by 340 basis points."},
        {"chunk_id": "c2", "page_number": 2, "section_title": "Operations", "content": "Customer retention reached 94 percent. Cloud infrastructure expenditure was reduced by 12 percent."},
        {"chunk_id": "c3", "page_number": 3, "section_title": "Recommendations", "content": "Maintain hedging strategy against currency volatility. Deploy automated tracking software by Q4."}
    ]

    # Test Small Summary (200 words)
    res_small = agent._summarize_heuristically(analysis, chunks, "Small Summary", "en")
    w_small = len(res_small.executive_summary.split())
    assert 150 <= w_small <= 250, f"Expected ~200 words for small summary, got {w_small}"

    # Test Medium Summary (500 words)
    res_med = agent._summarize_heuristically(analysis, chunks, "Medium Summary", "en")
    w_med = len(res_med.executive_summary.split())
    assert 380 <= w_med <= 620, f"Expected ~500 words for medium summary, got {w_med}"

    # Test Detailed Summary (1000 words)
    res_det = agent._summarize_heuristically(analysis, chunks, "Detailed Summary", "en")
    w_det = len(res_det.executive_summary.split())
    assert 750 <= w_det <= 1250, f"Expected ~1000 words for detailed summary, got {w_det}"
