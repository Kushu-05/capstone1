import matplotlib.pyplot as plt
import matplotlib.patches as patches
from pathlib import Path

def generate_architecture_diagram():
    output_dir = Path(__file__).resolve().parent / "docs"
    output_dir.mkdir(parents=True, exist_ok=True)

    fig, ax = plt.subplots(figsize=(16, 10), dpi=300)
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 10)
    ax.axis("off")

    # Background canvas
    fig.patch.set_facecolor("#F8FAFC")
    ax.set_facecolor("#F8FAFC")

    # Title
    ax.text(8, 9.6, "AI Powered Document Summarization & Voice Generation Assistant",
            ha="center", va="center", fontsize=18, fontweight="bold", color="#0F172A")
    ax.text(8, 9.2, "End-to-End Multi-Agent Architecture, A2A Communication, Strict Validation & Voice Synthesis",
            ha="center", va="center", fontsize=11, color="#475569")

    # Styling helper
    def draw_box(x, y, w, h, title, subtitle, color, border_color="#CBD5E1"):
        rect = patches.FancyBboxPatch(
            (x, y), w, h, boxstyle="round,pad=0.2",
            facecolor=color, edgecolor=border_color, linewidth=1.5
        )
        ax.add_patch(rect)
        ax.text(x + w / 2, y + h * 0.65, title, ha="center", va="center",
                fontsize=10.5, fontweight="bold", color="#0F172A")
        ax.text(x + w / 2, y + h * 0.32, subtitle, ha="center", va="center",
                fontsize=8.5, color="#334155")

    def draw_arrow(x1, y1, x2, y2, label=""):
        ax.annotate(
            "", xy=(x2, y2), xytext=(x1, y1),
            arrowprops=dict(facecolor="#3B82F6", edgecolor="#2563EB", width=2, headwidth=8, headlength=8)
        )
        if label:
            mx, my = (x1 + x2) / 2, (y1 + y2) / 2
            ax.text(mx, my + 0.25, label, ha="center", va="center",
                    fontsize=8.5, fontweight="bold", color="#1D4ED8",
                    bbox=dict(boxstyle="round,pad=0.2", facecolor="#EFF6FF", edgecolor="#BFDBFE", lw=0.8))

    # ROW 1: Ingestion & Knowledge Base (y: 7.2 to 8.4)
    draw_box(0.8, 7.3, 2.6, 1.2, "Document Input", "PDF, DOCX, TXT\nMagic Byte Security", "#E0F2FE", "#7DD3FC")
    draw_box(4.0, 7.3, 2.8, 1.2, "Structural Ingestion", "PyMuPDF / python-docx\nPage & Section Preservation", "#E0E7FF", "#A5B4FC")
    draw_box(7.4, 7.3, 2.8, 1.2, "Section-Aware Chunker", "Sliding Window Chunks\nExact Offset & Page Metadata", "#EDE9FE", "#C4B5FD")
    draw_box(10.8, 7.3, 3.8, 1.2, "Knowledge Base Index", "Local TF-IDF & Vector Index\nSource Grounding & Retrieval", "#FCE7F3", "#F472B6")

    draw_arrow(3.4, 7.9, 4.0, 7.9)
    draw_arrow(6.8, 7.9, 7.4, 7.9)
    draw_arrow(10.2, 7.9, 10.8, 7.9)

    # Vertical handoff to Agents
    draw_arrow(12.7, 7.3, 12.7, 5.8, "Source Chunks")

    # ROW 2: Multi-Agent Handoff & A2A Workflow (y: 4.2 to 5.6)
    # Stage 1: Analysis Agent
    draw_box(0.8, 4.4, 3.0, 1.3, "Agent 1: Document Analysis", "Extracts Facts, Risks, Decisions,\nRecommendations & Action Items", "#FEF3C7", "#FCD34D")
    
    # Stage 2: Summarization Agent
    draw_box(4.5, 4.4, 3.0, 1.3, "Agent 2: Summarization", "Generates Structured Summary\nFocus Formats & Citations", "#DCFCE7", "#86EFAC")

    # Stage 3: Summary Validation Agent
    draw_box(8.2, 4.4, 3.2, 1.3, "Agent 3: Summary Validation", "Scans Claims vs Chunks\nHallucination Removal & Gatekeeper", "#FEE2E2", "#FCA5A5")

    # Stage 4: Quality & Evaluation Agent
    draw_box(12.1, 4.4, 3.1, 1.3, "Agent 4: Quality Evaluator", "Relevance, Completeness,\nConsistency & Groundedness", "#F3E8FF", "#D8B4FE")

    # A2A Communication arrows
    draw_arrow(3.8, 5.05, 4.5, 5.05, "A2A: AnalysisMsg")
    draw_arrow(7.5, 5.05, 8.2, 5.05, "A2A: DraftSummary")
    draw_arrow(11.4, 5.05, 12.1, 5.05, "A2A: ValidatedMsg")

    # ROW 3: Synthesis, Gatekeeper, TTS & UI (y: 1.0 to 2.6)
    # Strict Gatekeeper Check
    draw_box(8.2, 1.8, 3.2, 1.3, "Strict Gatekeeper", "Requires is_approved_for_tts=True\nBlocks Unvalidated Drafts", "#FFE4E6", "#FDA4AF")
    draw_arrow(9.8, 4.4, 9.8, 3.1, "Validated Summary")

    # Text-to-Speech
    draw_box(4.5, 1.8, 3.0, 1.3, "Edge-TTS Engine", "Multi-Language Neural Audio\n(EN, HI, KN, TA voices)", "#CFFAFE", "#67E8F9")
    draw_arrow(8.2, 2.45, 7.5, 2.45, "Approved Audio Stream")

    # Streamlit User Application
    draw_box(0.8, 1.8, 3.0, 1.3, "Streamlit UI & REST API", "Interactive Dashboards, Q&A,\nAudio Player & Feedback", "#E0F2FE", "#38BDF8")
    draw_arrow(4.5, 2.45, 3.8, 2.45, "Audio Stream")

    # GovReport Benchmark box
    draw_box(12.1, 1.8, 3.1, 1.3, "GovReport Benchmark", "Long-Doc Standard Dataset\nEvaluation Against Reference", "#E2E8F0", "#94A3B8")
    draw_arrow(13.6, 4.4, 13.6, 3.1, "Eval Scores")

    # Output file paths
    png_path = output_dir / "architecture_diagram.png"
    pdf_path = output_dir / "architecture_diagram.pdf"
    jpg_path = output_dir / "architecture_diagram.jpg"

    plt.tight_layout()
    plt.savefig(png_path, format="png", dpi=300, bbox_inches="tight")
    plt.savefig(pdf_path, format="pdf", dpi=300, bbox_inches="tight")
    plt.savefig(jpg_path, format="jpeg", dpi=300, bbox_inches="tight")
    plt.close()

    print(f"Architecture diagrams generated successfully:")
    print(f"- PNG: {png_path}")
    print(f"- PDF: {pdf_path}")
    print(f"- JPG: {jpg_path}")

if __name__ == "__main__":
    generate_architecture_diagram()
