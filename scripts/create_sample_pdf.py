import fitz
from pathlib import Path

def create_sample_pdf(output_path: str):
    doc = fitz.open()
    
    # Page dimensions: A4 (595 x 842 points)
    W, H = 595, 842
    
    # ---------------- PAGE 1: Executive Summary & Project Background ----------------
    page1 = doc.new_page(width=W, height=H)
    
    # Header Banner
    page1.draw_rect(fitz.Rect(0, 0, W, 70), fill=(0.06, 0.12, 0.22)) # Deep navy
    page1.insert_text(fitz.Point(40, 36), "PROJECT HORIZON: ENTERPRISE AI STRATEGY REPORT", fontsize=13, fontname="helv", color=(1, 1, 1))
    page1.insert_text(fitz.Point(40, 54), "Confidential Strategic Briefing • Global Operations Division • Fiscal Year 2026", fontsize=9, fontname="helv", color=(0.7, 0.8, 0.95))
    
    # Section 1 Header
    page1.insert_text(fitz.Point(40, 105), "1. Executive Summary & Strategic Objectives", fontsize=14, fontname="helv", color=(0.1, 0.2, 0.5))
    page1.draw_line(fitz.Point(40, 112), fitz.Point(555, 112), color=(0.8, 0.85, 0.9), width=1.5)
    
    p1_text = (
        "Project Horizon represents a comprehensive initiative to deploy enterprise-grade generative AI "
        "and autonomous multi-agent intelligence across Global Logistics, Financial Operations, and Customer Support. "
        "The primary objective is to modernize legacy document workflows, reduce processing bottlenecks by 65%, "
        "and establish a secure on-premise knowledge management framework across 14 international offices.\n\n"
        "Over the past 12 months, our research task force benchmarked 18 distinct large language models and evaluated "
        "retrieval-augmented generation (RAG) architectures against a corpus of 120,000 regulatory compliance filings. "
        "This strategic roadmap details our architectural choices, budget allocation, operational KPIs, security safeguards, "
        "and multi-agent orchestration principles."
    )
    page1.insert_textbox(fitz.Rect(40, 125, 555, 260), p1_text, fontsize=10, fontname="times-roman", lineheight=1.4)
    
    # Section 2 Header
    page1.insert_text(fitz.Point(40, 285), "2. Program Scope & Multi-Agent Architecture", fontsize=14, fontname="helv", color=(0.1, 0.2, 0.5))
    page1.draw_line(fitz.Point(40, 292), fitz.Point(555, 292), color=(0.8, 0.85, 0.9), width=1.5)
    
    p1_scope = (
        "The project deployment comprises four specialized autonomous layers:\n\n"
        "• Document Extraction Layer: Employs optical character recognition and layout analysis to preserve complex "
        "tables, headers, and hierarchical page structures from PDF, DOCX, and unstructured scanned files.\n\n"
        "• Semantic Knowledge Base: Partitions ingested documents into overlapping 512-token chunks, computing dense "
        "vector embeddings and sparse BM25 indices to enable zero-loss factual retrieval.\n\n"
        "• Multi-Agent Reasoning Pipeline: Orchestrates four distinct AI roles including Document Analysis, Contextual "
        "Summarization, Factual Validation Gatekeeper, and Academic Quality Evaluation.\n\n"
        "• Neural Speech Generation Engine: Synthesizes high-fidelity voice briefings strictly from certified validated "
        "text, ensuring zero audio hallucination and compliance with accessibility mandates."
    )
    page1.insert_textbox(fitz.Rect(40, 305, 555, 480), p1_scope, fontsize=10, fontname="times-roman", lineheight=1.35)
    
    # Callout Box: Strategic Priorities
    page1.draw_rect(fitz.Rect(40, 500, 555, 590), fill=(0.94, 0.96, 1.0), color=(0.2, 0.4, 0.8), width=1)
    page1.insert_text(fitz.Point(55, 522), "KEY STRATEGIC PRIORITY", fontsize=10, fontname="helv", color=(0.1, 0.3, 0.7))
    p1_box = (
        "Absolute Factual Grounding: Under no circumstances may AI agents generate unverifiable statements. "
        "Every numerical claim, contract term, and executive decision must be mapped to an explicit page and section anchor. "
        "Any draft failing the gatekeeper validation check will be halted prior to text-to-speech rendering."
    )
    page1.insert_textbox(fitz.Rect(55, 532, 540, 580), p1_box, fontsize=9.5, fontname="times-italic", lineheight=1.3)
    
    # Footer Page 1
    page1.draw_line(fitz.Point(40, 800), fitz.Point(555, 800), color=(0.85, 0.85, 0.85), width=1)
    page1.insert_text(fitz.Point(40, 815), "Project Horizon Strategy Report • Page 1 of 3", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))
    page1.insert_text(fitz.Point(440, 815), "Strictly Confidential • Internal Use Only", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))
    
    # ---------------- PAGE 2: Key Operational Findings & Numerical Metrics ----------------
    page2 = doc.new_page(width=W, height=H)
    
    # Header Banner
    page2.draw_rect(fitz.Rect(0, 0, W, 70), fill=(0.06, 0.12, 0.22))
    page2.insert_text(fitz.Point(40, 36), "PROJECT HORIZON: ENTERPRISE AI STRATEGY REPORT", fontsize=13, fontname="helv", color=(1, 1, 1))
    page2.insert_text(fitz.Point(40, 54), "Section 3: Key Operational Findings & Numerical Facts", fontsize=9, fontname="helv", color=(0.7, 0.8, 0.95))
    
    # Section 3 Header
    page2.insert_text(fitz.Point(40, 105), "3. Operational Findings & Quantitative Metrics", fontsize=14, fontname="helv", color=(0.1, 0.2, 0.5))
    page2.draw_line(fitz.Point(40, 112), fitz.Point(555, 112), color=(0.8, 0.85, 0.9), width=1.5)
    
    p2_intro = (
        "Phase 1 pilot testing conducted across three operational test sites (Frankfurt, Singapore, and New York) "
        "produced verified baseline metrics that confirm substantial gains in turnaround velocity and cost efficiency. "
        "The evaluation cohort comprised 1,450 complex legal contracts, financial audits, and technical specification files."
    )
    page2.insert_textbox(fitz.Rect(40, 125, 555, 185), p2_intro, fontsize=10, fontname="times-roman", lineheight=1.4)
    
    # Metric Summary Table Box
    page2.draw_rect(fitz.Rect(40, 195, 555, 345), fill=(0.98, 0.98, 0.99), color=(0.8, 0.8, 0.85), width=1)
    page2.draw_rect(fitz.Rect(40, 195, 555, 225), fill=(0.15, 0.25, 0.45)) # Table header
    page2.insert_text(fitz.Point(55, 214), "Performance Metric", fontsize=10, fontname="helv", color=(1, 1, 1))
    page2.insert_text(fitz.Point(230, 214), "Legacy Benchmark", fontsize=10, fontname="helv", color=(1, 1, 1))
    page2.insert_text(fitz.Point(365, 214), "AI Pipeline Pilot", fontsize=10, fontname="helv", color=(1, 1, 1))
    page2.insert_text(fitz.Point(475, 214), "Improvement", fontsize=10, fontname="helv", color=(1, 1, 1))
    
    rows = [
        ("Document Review Latency", "4.8 hours / document", "12.4 minutes / document", "95.7% Faster"),
        ("Annual Operating Cost", "$22.4M labor cost", "$8.2M managed cost", "$14.2M Saved"),
        ("Factual Grounding Accuracy", "88.2% manual checks", "99.4% multi-agent verified", "+11.2% Gain"),
        ("Executive Audio Digest Time", "30 minutes manual read", "3.2 minutes audio briefing", "89.3% Reduction")
    ]
    
    y = 245
    for metric, legacy, pilot, gain in rows:
        page2.insert_text(fitz.Point(55, y), metric, fontsize=9, fontname="helv", color=(0.1, 0.1, 0.1))
        page2.insert_text(fitz.Point(230, y), legacy, fontsize=9, fontname="helv", color=(0.4, 0.4, 0.4))
        page2.insert_text(fitz.Point(365, y), pilot, fontsize=9, fontname="helv", color=(0.1, 0.5, 0.2))
        page2.insert_text(fitz.Point(475, y), gain, fontsize=9, fontname="helv", color=(0.1, 0.4, 0.8))
        page2.draw_line(fitz.Point(45, y + 6), fitz.Point(550, y + 6), color=(0.9, 0.9, 0.9), width=0.5)
        y += 26
        
    # Section 4: Key Decisions
    page2.insert_text(fitz.Point(40, 375), "4. Board Decisions & Approved Governance", fontsize=14, fontname="helv", color=(0.1, 0.2, 0.5))
    page2.draw_line(fitz.Point(40, 382), fitz.Point(555, 382), color=(0.8, 0.85, 0.9), width=1.5)
    
    p2_decisions = (
        "On March 14, 2026, the Executive Technology Steering Committee approved the following binding decisions:\n\n"
        "1. Full Production Approval: Allocated $18.5 million capital expenditure across Q2 2026 through Q4 2027.\n"
        "2. Mandatory Validation Gatekeeper: Enacted Policy AI-04 requiring automated factual verification for all "
        "AI-generated summaries prior to executive distribution or text-to-speech audio rendering.\n"
        "3. Zero Data Retention Agreement: Enforced strict contractual terms ensuring no proprietary company data is used "
        "to train commercial foundation models."
    )
    page2.insert_textbox(fitz.Rect(40, 395, 555, 540), p2_decisions, fontsize=10, fontname="times-roman", lineheight=1.4)
    
    # Footer Page 2
    page2.draw_line(fitz.Point(40, 800), fitz.Point(555, 800), color=(0.85, 0.85, 0.85), width=1)
    page2.insert_text(fitz.Point(40, 815), "Project Horizon Strategy Report • Page 2 of 3", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))
    page2.insert_text(fitz.Point(440, 815), "Strictly Confidential • Internal Use Only", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))
    
    # ---------------- PAGE 3: Risk Factors, Strategic Recommendations & Action Items ----------------
    page3 = doc.new_page(width=W, height=H)
    
    # Header Banner
    page3.draw_rect(fitz.Rect(0, 0, W, 70), fill=(0.06, 0.12, 0.22))
    page3.insert_text(fitz.Point(40, 36), "PROJECT HORIZON: ENTERPRISE AI STRATEGY REPORT", fontsize=13, fontname="helv", color=(1, 1, 1))
    page3.insert_text(fitz.Point(40, 54), "Section 5: Risk Factors, Recommendations & Strategic Action Plan", fontsize=9, fontname="helv", color=(0.7, 0.8, 0.95))
    
    # Section 5: Risk Factors
    page3.insert_text(fitz.Point(40, 105), "5. Identified Risk Factors & Mitigation Protocols", fontsize=14, fontname="helv", color=(0.1, 0.2, 0.5))
    page3.draw_line(fitz.Point(40, 112), fitz.Point(555, 112), color=(0.8, 0.85, 0.9), width=1.5)
    
    p3_risks = (
        "• Hallucination Exposure in Financial Data: Large language models demonstrate a baseline 3.4% error rate on complex "
        "nested financial tables. Mitigation: Dual-pass validation agent cross-references every extracted number against source page cells.\n\n"
        "• Cross-Border Data Residency (GDPR & APPI): Processing European documents on US-hosted endpoints introduces regulatory penalties. "
        "Mitigation: Regional edge inference clusters deployed in Frankfurt and Tokyo.\n\n"
        "• Latency in Text-to-Speech Generation: Neural speech synthesis for 2,000-word summaries initially exceeded 45 seconds. "
        "Mitigation: Implemented chunked edge streaming to begin audio playback within 1.8 seconds of validation sign-off."
    )
    page3.insert_textbox(fitz.Rect(40, 125, 555, 270), p3_risks, fontsize=10, fontname="times-roman", lineheight=1.35)
    
    # Section 6: Recommendations & Action Plan
    page3.insert_text(fitz.Point(40, 290), "6. Strategic Recommendations & Action Items", fontsize=14, fontname="helv", color=(0.1, 0.2, 0.5))
    page3.draw_line(fitz.Point(40, 297), fitz.Point(555, 297), color=(0.8, 0.85, 0.9), width=1.5)
    
    p3_recs = (
        "The following actionable roadmap must be executed over the next 90 days:\n\n"
        "• Action Item 1 (Target: May 15, 2026): Finalize containerized on-premise deployment of PyMuPDF document extraction "
        "and hybrid vector/BM25 retrieval services across all regional data centers.\n\n"
        "• Action Item 2 (Target: June 1, 2026): Launch enterprise pilot with 350 executive stakeholders, measuring user "
        "feedback ratings and tracking validation pass rates.\n\n"
        "• Action Item 3 (Target: June 30, 2026): Implement automated weekly GovReport benchmark runs to ensure factual "
        "consistency scores consistently exceed 90% across multi-page technical documents.\n\n"
        "• Action Item 4 (Target: July 15, 2026): Expand multi-lingual neural speech generation support to French, German, "
        "Japanese, and Mandarin Chinese."
    )
    page3.insert_textbox(fitz.Rect(40, 310, 555, 500), p3_recs, fontsize=10, fontname="times-roman", lineheight=1.35)
    
    # Sign-off box
    page3.draw_rect(fitz.Rect(40, 520, 555, 600), fill=(0.96, 0.98, 0.96), color=(0.2, 0.6, 0.3), width=1)
    page3.insert_text(fitz.Point(55, 542), "EXECUTIVE SIGN-OFF & CERTIFICATION", fontsize=10, fontname="helv", color=(0.1, 0.5, 0.2))
    p3_sign = (
        "Approved by: Chief Technology Officer & Head of Global AI Governance\n"
        "Classification: Enterprise Confidential • Verification Status: Approved for Deployment\n"
        "Document Hash: SHA-256 / 4c98e21f98bc3201a"
    )
    page3.insert_textbox(fitz.Rect(55, 550, 540, 595), p3_sign, fontsize=9, fontname="helv", lineheight=1.3)
    
    # Footer Page 3
    page3.draw_line(fitz.Point(40, 800), fitz.Point(555, 800), color=(0.85, 0.85, 0.85), width=1)
    page3.insert_text(fitz.Point(40, 815), "Project Horizon Strategy Report • Page 3 of 3", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))
    page3.insert_text(fitz.Point(440, 815), "Strictly Confidential • Internal Use Only", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))
    
    # Save PDF
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out))
    doc.close()
    print(f"Sample PDF created successfully at: {out.resolve()}")

if __name__ == "__main__":
    create_sample_pdf("data/input/Enterprise_AI_Strategy_Report_2026.pdf")
    create_sample_pdf("Enterprise_AI_Strategy_Report_2026.pdf")
