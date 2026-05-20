#!/usr/bin/env python3
"""Ersätt em-dash (—) och en-dash (–) med komma/kolon i alla .mdx + articles.ts."""
import re
from pathlib import Path

ROOT = Path("/Users/axeljonemyr/Documents/aiblogg")
TARGETS = [
    *ROOT.glob("src/content/posts/**/*.mdx"),
    ROOT / "src/data/articles.ts",
]

# Patterns:
# " — " (space dash space)  -> ", "
# "—" in title between phrases (title:'X — Y') -> ", "
# "ord—ord" (no space) -> "ord, ord"
# Same for en-dash –

def fix_text(text: str) -> str:
    # Title-style: replace "A — B" with "A, B" (consistent comma)
    text = re.sub(r"\s*[—–]\s*", ", ", text)
    return text

changed = 0
for path in TARGETS:
    if not path.exists():
        continue
    orig = path.read_text()
    new = fix_text(orig)
    if new != orig:
        path.write_text(new)
        changed += 1
        print(f"  fixed: {path.relative_to(ROOT)}")

print(f"\nTotal: {changed} files updated")
