import os
import sys
import zipfile
from pathlib import Path

source_dir = Path(r"C:\Users\Administrator\Documents\document_summarization")
output_zip = Path(r"C:\Users\Administrator\Documents\document_summarization_updated.zip")

EXCLUDE_DIRS = {
    ".venv",
    "node_modules",
    "__pycache__",
    ".pytest_cache",
    ".git",
    "scratch",
}

EXCLUDE_EXTENSIONS = {
    ".pyc",
    ".pyo",
    ".tmp",
}

print(f"Creating zip file from {source_dir} -> {output_zip}...", flush=True)

file_count = 0
total_uncompressed_bytes = 0

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zip_file:
    for root, dirs, files in os.walk(source_dir):
        # Prune excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith(".")]

        rel_root = Path(root).relative_to(source_dir)
        if any(part in EXCLUDE_DIRS for part in rel_root.parts):
            continue

        for file in files:
            file_path = Path(root) / file
            if file_path.suffix.lower() in EXCLUDE_EXTENSIONS:
                continue

            archive_path = Path("document_summarization") / rel_root / file
            
            try:
                zip_file.write(file_path, str(archive_path))
                file_count += 1
                total_uncompressed_bytes += file_path.stat().st_size
                if file_count % 100 == 0:
                    print(f"Archived {file_count} files...", flush=True)
            except Exception as e:
                print(f"Skipping {file_path}: {e}", flush=True)

zip_size_mb = output_zip.stat().st_size / (1024 * 1024)
uncompressed_mb = total_uncompressed_bytes / (1024 * 1024)

print(f"DONE! Successfully packaged {file_count} files.", flush=True)
print(f"Uncompressed size: {uncompressed_mb:.2f} MB", flush=True)
print(f"Compressed zip size: {zip_size_mb:.2f} MB", flush=True)
print(f"Zip created at: {output_zip}", flush=True)
