import os
import sys
from pathlib import Path
import matplotlib.pyplot as plt
import matplotlib.patches as patches

BASE_DIR = Path(__file__).resolve().parent.parent

def build_single_page_architecture_pdf(output_pdf_path: str):
    """
    Renders an ultra-clean, elegant, single-page architecture PDF for DocVoice AI.
    Uses 100% native vector graphics (PDF) for razor-sharp text, perfect alignment,
    and zero pixelation or visual clutter.
    """
    fig, ax = plt.subplots(figsize=(16.5, 10.5), dpi=300)
    ax.set_xlim(0, 16.5)
    ax.set_ylim(0, 10.5)
    ax.axis("off")

    fig.patch.set_facecolor("#F8FAFC")
    ax.set_facecolor("#F8FAFC")

    # =========================================================================
    # 1. HEADER SECTION (y: 9.35 to 10.18)
    # =========================================================================
    header_box = patches.FancyBboxPatch(
        (0.5, 9.35), 15.5, 0.83, boxstyle="round,pad=0.06",
        facecolor="#0F172A", edgecolor="#1E293B", linewidth=1.2
    )
    ax.add_patch(header_box)

    ax.text(
        0.8, 9.80, "DOCVOICE AI", fontsize=15, fontweight="bold",
        color="#38BDF8", va="center"
    )
    ax.text(
        2.85, 9.80, "|   System Architecture Blueprint", fontsize=13, fontweight="bold",
        color="#F8FAFC", va="center"
    )
    ax.text(
        0.8, 9.54, "Autonomous 5-Agent Document Intelligence • Dynamic Length Control • Neural Audio Synthesis",
        fontsize=8.3, color="#94A3B8", va="center"
    )

    # Top right badges (x: 10.8 to 15.8)
    badges = [
        ("FastAPI Async", "#10B981"),
        ("React 18 (3D)", "#6366F1"),
        ("Edge-TTS Neural", "#EC4899"),
        ("GovReport Eval", "#F59E0B")
    ]
    cur_x = 10.9
    for label, bg in badges:
        bw = 1.15
        bp = patches.FancyBboxPatch(
            (cur_x, 9.54), bw, 0.36, boxstyle="round,pad=0.04",
            facecolor=bg, edgecolor=None, alpha=0.95
        )
        ax.add_patch(bp)
        ax.text(cur_x + bw / 2, 9.72, label, fontsize=7.5, fontweight="bold",
                color="#FFFFFF", ha="center", va="center")
        cur_x += bw + 0.12

    # Helper function for drawing cards
    def draw_card(x, y, w, h, tag, title, bullet_lines, bg_color, border_color):
        card = patches.FancyBboxPatch(
            (x, y), w, h, boxstyle="round,pad=0.05",
            facecolor=bg_color, edgecolor=border_color, linewidth=1.2
        )
        ax.add_patch(card)

        # Header tag + title
        full_title = f"[{tag}]  {title}" if tag else title
        ax.text(x + 0.15, y + h - 0.22, full_title, fontsize=8.4, fontweight="bold",
                color="#0F172A", va="center")

        # Separator line under title
        ax.plot([x + 0.15, x + w - 0.15], [y + h - 0.36, y + h - 0.36],
                color=border_color, linewidth=0.8, alpha=0.7)

        # Bullet lines
        line_y = y + h - 0.56
        for line in bullet_lines:
            ax.text(x + 0.15, line_y, line, fontsize=7.3, color="#334155", va="center")
            line_y -= 0.21

    # Helper function for flow arrows
    def draw_flow_arrow(x1, y1, x2, y2, label="", label_pos=0.5):
        ax.annotate(
            "", xy=(x2, y2), xytext=(x1, y1),
            arrowprops=dict(facecolor="#2563EB", edgecolor="#1D4ED8", width=1.6, headwidth=6.0, headlength=6.0)
        )
        if label:
            mx = x1 + (x2 - x1) * label_pos
            my = y1 + (y2 - y1) * label_pos
            ax.text(mx, my + 0.14, label, ha="center", va="center",
                    fontsize=6.9, fontweight="bold", color="#1D4ED8",
                    bbox=dict(boxstyle="round,pad=0.1", facecolor="#EFF6FF", edgecolor="#93C5FD", lw=0.7))

    # Helper function for elbow arrows
    def draw_elbow_arrow(pts, label="", label_pt=None):
        for i in range(len(pts) - 1):
            p1, p2 = pts[i], pts[i+1]
            is_last = (i == len(pts) - 2)
            if is_last:
                ax.annotate(
                    "", xy=p2, xytext=p1,
                    arrowprops=dict(facecolor="#2563EB", edgecolor="#1D4ED8", width=1.6, headwidth=6.0, headlength=6.0)
                )
            else:
                ax.plot([p1[0], p2[0]], [p1[1], p2[1]], color="#2563EB", linewidth=1.8)
        if label and label_pt:
            ax.text(label_pt[0], label_pt[1], label, ha="center", va="center",
                    fontsize=6.9, fontweight="bold", color="#1D4ED8",
                    bbox=dict(boxstyle="round,pad=0.1", facecolor="#EFF6FF", edgecolor="#93C5FD", lw=0.7))

    # =========================================================================
    # 2. COLUMN 1: INGESTION & CONTEXT (x: 0.5 to 3.9)
    # =========================================================================
    col1_bg = patches.FancyBboxPatch(
        (0.5, 1.15), 3.4, 8.0, boxstyle="round,pad=0.08",
        facecolor="#F0F9FF", edgecolor="#BAE6FD", linewidth=1.2
    )
    ax.add_patch(col1_bg)
    ax.text(0.7, 8.90, "1. INGESTION & CONTEXT", fontsize=10.0, fontweight="bold", color="#0369A1", va="center")

    draw_card(
        0.7, 7.10, 3.0, 1.55,
        "INPUT", "Document Ingestion",
        [
            "- Multi-format: PDF, DOCX, TXT",
            "- Magic bytes verification & 10MB limit",
            "- In-memory stream parsing (PyPDF, docx)",
            "- Rejection of empty or corrupted files"
        ],
        "#FFFFFF", "#7DD3FC"
    )

    draw_card(
        0.7, 5.20, 3.0, 1.60,
        "QUERY", "Natural Language Focus",
        [
            "- Custom query & analytical focus area",
            "- Word budget (e.g. 'summarize in 100 words')",
            "- Token budget (e.g. 'in 60 tokens')",
            "- Dynamic regex parser extraction"
        ],
        "#FFFFFF", "#7DD3FC"
    )

    draw_card(
        0.7, 3.30, 3.0, 1.60,
        "CHUNK", "Sentence Chunker",
        [
            "- Noise scrubbing & whitespace cleanup",
            "- Overlapping sentence chunker (1000 tok)",
            "- Sliding window context preservation",
            "- Indexed with document ID & chunk index"
        ],
        "#FFFFFF", "#7DD3FC"
    )

    draw_card(
        0.7, 1.40, 3.0, 1.60,
        "POOLER", "Adaptive Context Pooler",
        [
            "- Scales chunks dynamically to word budget",
            "- Short (<60w): Intro + Conclusion chunks",
            "- Medium (~100w): Multi-chunk balanced sweep",
            "- Extended (200w+): Full corpus coverage"
        ],
        "#FFFFFF", "#7DD3FC"
    )

    # Arrows inside Column 1
    draw_flow_arrow(2.2, 7.10, 2.2, 6.80)
    draw_flow_arrow(2.2, 5.20, 2.2, 4.90)
    draw_flow_arrow(2.2, 3.30, 2.2, 3.00)

    # Connection: Column 1 -> Column 2
    draw_flow_arrow(3.9, 7.87, 4.65, 7.87, label="Clean Chunks")

    # =========================================================================
    # 3. COLUMN 2: 5-AGENT AUTONOMOUS CORE & GATEKEEPER (x: 4.65 to 11.85)
    # =========================================================================
    col2_bg = patches.FancyBboxPatch(
        (4.65, 1.15), 7.2, 8.0, boxstyle="round,pad=0.08",
        facecolor="#EEF2FF", edgecolor="#C7D2FE", linewidth=1.2
    )
    ax.add_patch(col2_bg)
    ax.text(4.85, 8.90, "2. AUTONOMOUS 5-AGENT CORE & VALIDATION GATEKEEPER", fontsize=10.0, fontweight="bold", color="#3730A3", va="center")

    # LEFT SUB-COLUMN (x: 4.85 to 7.95)
    draw_card(
        4.85, 6.45, 3.1, 2.15,
        "AGENT 1", "Document Analysis",
        [
            "- Deep semantic & structural inspection",
            "- Identifies core themes, topics & tone",
            "- Discovers numerical & financial claims",
            "- Formats structured AnalysisResult",
            "- Emits: AnalysisResult contract"
        ],
        "#FFFFFF", "#A5B4FC"
    )

    draw_card(
        4.85, 3.90, 3.1, 2.20,
        "AGENT 2", "Summarization Engine",
        [
            "- Dynamic Word/Token Budget Control",
            "- Strict Single-Paragraph Mandate",
            "- Heuristic sentence extraction & Gemini",
            "- Adaptive length scaling without loss",
            "- Emits: SummaryDraft contract"
        ],
        "#FFFFFF", "#A5B4FC"
    )

    draw_card(
        4.85, 1.35, 3.1, 2.20,
        "AGENT 3", "Summary Validation",
        [
            "- Verifies numerical facts against chunks",
            "- Calculates source chunk token overlap",
            "- Detects & scrubs hallucinated claims",
            "- Enforces length ceiling & paragraph flow",
            "- Emits: ValidationReport contract"
        ],
        "#FFFFFF", "#A5B4FC"
    )

    # Arrows in Left Sub-column
    draw_flow_arrow(6.40, 6.45, 6.40, 6.10, label="Themes & Context")
    draw_flow_arrow(6.40, 3.90, 6.40, 3.55, label="Draft Summary")

    # RIGHT SUB-COLUMN (x: 8.55 to 11.65)
    draw_card(
        8.55, 6.45, 3.1, 2.15,
        "GATEKEEPER", "TTS Safety Barrier",
        [
            "- Strict Hard Barrier: is_approved_for_tts",
            "- HTTP 403 Forbidden lock on rejected drafts",
            "- Trims length cleanly at clause boundaries",
            "- Blocks speech engine from ungrounded text",
            "- Emits: ValidatedSummaryPayload"
        ],
        "#FEF2F2", "#FCA5A5"
    )

    draw_card(
        8.55, 3.90, 3.1, 2.20,
        "AGENT 4", "Quality Evaluation",
        [
            "- Multi-dimensional scoring (0-1.0):",
            "  * Factual accuracy & Groundedness",
            "  * Coherence & Readability index",
            "- GovReport academic benchmark telemetry",
            "- Automated ROUGE-1, ROUGE-2, ROUGE-L",
            "- Emits: QualityScore contract"
        ],
        "#FFFFFF", "#A5B4FC"
    )

    draw_card(
        8.55, 1.35, 3.1, 2.20,
        "AGENT 5", "Neural Voice Gen",
        [
            "- Microsoft Edge-TTS Neural Synthesizer",
            "- Multilingual voice matrix (8 voices):",
            "  * English (Andrew / Aria Neural)",
            "  * Kannada (Gagan / Sapna Neural)",
            "  * Hindi (Madhur / Swara Neural)",
            "  * Telugu (Mohan / Shruti Neural)",
            "- Outputs: High-fidelity streaming MP3"
        ],
        "#FFFFFF", "#A5B4FC"
    )

    # Arrow from Agent 3 (bottom left) across gap and up to Gatekeeper (top right)
    draw_elbow_arrow([
        (7.95, 2.45),
        (8.25, 2.45),
        (8.25, 7.52),
        (8.55, 7.52)
    ], label="Audit Pass", label_pt=(8.25, 5.0))

    # Arrows in Right Sub-column: Gatekeeper down to Agent 4 and Agent 5
    draw_flow_arrow(10.10, 6.45, 10.10, 6.10, label="Approved Summary")
    draw_flow_arrow(10.10, 3.90, 10.10, 3.55, label="TTS Payload")

    # =========================================================================
    # 4. COLUMN 3: DELIVERY & BENCHMARKS (x: 12.55 to 16.0)
    # =========================================================================
    col3_bg = patches.FancyBboxPatch(
        (12.55, 1.15), 3.45, 8.0, boxstyle="round,pad=0.08",
        facecolor="#ECFDF5", edgecolor="#A7F3D0", linewidth=1.2
    )
    ax.add_patch(col3_bg)
    ax.text(12.75, 8.90, "3. PRESENTATION & BENCHMARK", fontsize=10.0, fontweight="bold", color="#065F46", va="center")

    draw_card(
        12.75, 7.10, 3.05, 1.55,
        "UI", "React 18 + Three.js 3D",
        [
            "- Interactive 3D particle sphere visualizer",
            "- Real-time audio frequency waveform player",
            "- Word count & token telemetry meters",
            "- Single-paragraph clean typography"
        ],
        "#FFFFFF", "#6EE7B7"
    )

    draw_card(
        12.75, 5.20, 3.05, 1.60,
        "VOICE", "Hands-Free Voice Mode",
        [
            "- Web Speech API microphone input",
            "- Voice-prompted questions & queries",
            "- Auto-play spoken audio responses",
            "- Full visual-impairment accessibility"
        ],
        "#FFFFFF", "#6EE7B7"
    )

    draw_card(
        12.75, 3.30, 3.05, 1.60,
        "EVAL", "GovReport Benchmark",
        [
            "- Live streaming GAO / CRS federal reports",
            "- Automated ROUGE-1 / 2 / L computation",
            "- Hallucination rate & groundedness logs",
            "- Academic gold-standard verification"
        ],
        "#FFFFFF", "#6EE7B7"
    )

    draw_card(
        12.75, 1.40, 3.05, 1.60,
        "API", "FastAPI & SQLite Storage",
        [
            "- Sub-millisecond async route dispatch",
            "- SQLite ACID document & chunk repository",
            "- Complete A2A message transaction log",
            "- Auto-generated OpenAPI / Swagger docs"
        ],
        "#FFFFFF", "#6EE7B7"
    )

    # Connections into Column 3 (in the gap x: 11.65 to 12.75)
    # From Agent 4 into GovReport Benchmark
    draw_flow_arrow(11.65, 4.80, 12.75, 4.10, label="ROUGE Metrics", label_pos=0.45)
    # From Agent 5 into React UI & API
    draw_flow_arrow(11.65, 2.45, 12.75, 2.20, label="Streamed MP3", label_pos=0.45)

    # Internal UI connections
    draw_flow_arrow(14.25, 7.10, 14.25, 6.80)

    # =========================================================================
    # 5. FOOTER SUMMARY STRIP (y: 0.32 to 0.95)
    # =========================================================================
    footer_box = patches.FancyBboxPatch(
        (0.5, 0.32), 15.5, 0.65, boxstyle="round,pad=0.06",
        facecolor="#1E293B", edgecolor="#334155", linewidth=1.0
    )
    ax.add_patch(footer_box)

    footer_items = [
        ("FastAPI Async", "#38BDF8"),
        ("React 18 (3D)", "#818CF8"),
        ("5 Autonomous Agents", "#34D399"),
        ("Word/Token Budget Engine", "#FBBF24"),
        ("Strict Safety Barrier", "#F87171"),
        ("Edge-TTS Neural (4 Langs)", "#F472B6"),
        ("GovReport Benchmark", "#A78BFA"),
        ("29/29 Passing Pytest", "#4ADE80")
    ]

    fx = 0.70
    for text, col in footer_items:
        pill_w = len(text) * 0.080 + 0.28
        p = patches.FancyBboxPatch(
            (fx, 0.46), pill_w, 0.38, boxstyle="round,pad=0.04",
            facecolor="#0F172A", edgecolor=col, linewidth=1.0
        )
        ax.add_patch(p)
        ax.text(fx + pill_w / 2, 0.65, text, fontsize=7.2, fontweight="bold",
                color=col, ha="center", va="center")
        fx += pill_w + 0.12

    output_path = Path(output_pdf_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(str(output_path), format="pdf", bbox_inches="tight", dpi=300)
    plt.close()
    print(f"Single-page Architecture PDF successfully built at: {output_path.resolve()}")

if __name__ == "__main__":
    out_pdf = BASE_DIR / "docs" / "ARCHITECTURE.pdf"
    build_single_page_architecture_pdf(str(out_pdf))
