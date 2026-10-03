import os
import sys
import time
import subprocess
import argparse
import requests
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

def check_backend_ready(url="http://127.0.0.1:8000/api/health", max_retries=15):
    """Wait for backend API to be live."""
    for _ in range(max_retries):
        try:
            r = requests.get(url, timeout=1)
            if r.status_code == 200:
                return True
        except Exception:
            pass
        time.sleep(1)
    return False

def start_backend():
    print("Starting FastAPI backend on http://127.0.0.1:8000 ...")
    subprocess.run([sys.executable, "-m", "uvicorn", "backend.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"], cwd=str(BASE_DIR))

def start_frontend():
    print("Starting React + Vite frontend on http://localhost:5173 ...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    subprocess.run([npm_cmd, "run", "dev"], cwd=str(BASE_DIR / "frontend"))

def run_tests():
    print("Running comprehensive test suite with pytest...")
    res = subprocess.run([sys.executable, "-m", "pytest", "-v", "tests"], cwd=str(BASE_DIR))
    sys.exit(res.returncode)

def run_benchmark(limit=10, source="auto"):
    print(f"Running GovReport Benchmark Evaluation (limit={limit}, source={source})...")
    res = subprocess.run([sys.executable, "evaluation/evaluate_govreport.py", "--limit", str(limit), "--source", source], cwd=str(BASE_DIR))
    sys.exit(res.returncode)

def generate_diagram():
    print("Generating architecture diagrams...")
    res = subprocess.run([sys.executable, "generate_diagram.py"], cwd=str(BASE_DIR))
    sys.exit(res.returncode)

def start_both():
    print("=================================================================")
    print(" Launching AI Document Intelligence & Voice Generation Assistant")
    print(" Frontend: React + Vite (http://localhost:5173)")
    print(" Backend:  FastAPI       (http://127.0.0.1:8000)")
    print("=================================================================")
    
    # 1. Start backend process
    backend_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "backend.main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=str(BASE_DIR)
    )

    print("Waiting for backend API to initialize...")
    if not check_backend_ready():
        print("Backend failed to start. Terminating...")
        backend_proc.terminate()
        sys.exit(1)

    print("Backend is online! Swagger UI: http://127.0.0.1:8000/docs")

    # 2. Start React frontend
    try:
        start_frontend()
    finally:
        print("Shutting down backend server...")
        backend_proc.terminate()

def main():
    parser = argparse.ArgumentParser(description="AI Document Summarization & Voice Generation Assistant Launcher")
    parser.add_argument("mode", nargs="?", default="both", choices=["both", "backend", "frontend", "test", "diagram", "benchmark"],
                        help="Service mode to launch (default: both)")
    parser.add_argument("--limit", type=int, default=10, help="Number of benchmark documents to evaluate (used with 'benchmark' mode)")
    parser.add_argument("--source", default="auto", choices=["auto", "hf", "local"], help="Dataset source for benchmark ('auto', 'hf', or 'local')")
    args = parser.parse_args()

    if args.mode == "backend":
        start_backend()
    elif args.mode == "frontend":
        start_frontend()
    elif args.mode == "test":
        run_tests()
    elif args.mode == "benchmark":
        run_benchmark(limit=args.limit, source=args.source)
    elif args.mode == "diagram":
        generate_diagram()
    else:
        start_both()

if __name__ == "__main__":
    main()
