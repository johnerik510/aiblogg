#!/usr/bin/env python3
"""
Hämtar kontextuella inline-foton från Unsplash per artikel.
Söker på primärsökord + tema-engelska översättning.
Sparar som /public/images/inline/{slug}.webp, max 100KB.
"""
import os, re, json, time, urllib.request, urllib.parse
from pathlib import Path
from PIL import Image
from io import BytesIO

ROOT = Path("/Users/axeljonemyr/Documents/aiblogg")
OUT = ROOT / "public/images/inline"
OUT.mkdir(parents=True, exist_ok=True)

UNSPLASH_KEY = "TIG9cndohuEFKhSIOW2g7ve_hsBaKDW_1Z9ZPSwJKnA"

# Sökord per slug (svensk -> engelska, kontextuellt relevanta)
QUERIES = {
    # VERKTYG
    "basta-ai-verktyg-svenska": "laptop technology workspace modern",
    "ai-verktyg-gratis": "free software apps screen",
    "chatgpt-vs-claude": "ai chatbot comparison technology",
    "perplexity-svenska": "search engine results screen",
    "gemini-ai-svenska": "google ai mobile interface",
    "cursor-ai-svenska": "developer coding screen editor",
    # GUIDER
    "chatgpt-svenska-guide": "person typing laptop chatbot interface",
    "chatgpt-gratis-svenska": "smartphone chat ai conversation",
    "vad-ar-chatgpt": "artificial intelligence brain concept",
    "vad-ar-en-prompt": "typing keyboard close up code",
    "ai-i-excel-och-sheets": "spreadsheet data analysis screen",
    # JOBB
    "ai-for-smaforetag": "small business owner laptop office",
    "ai-motesprotokoll": "video conference meeting laptop",
    "ai-kundtjanst": "customer service chat support",
    "ai-policy-arbetsplats": "office meeting document policy",
    "ai-personligt-brev-cv": "resume application laptop writing",
    # INTEGRITET
    "gdpr-chatgpt": "data privacy lock security digital",
    "chatgpt-detector-svenska": "magnifying glass text screen analysis",
    "dina-data-i-ai": "server data center technology",
    "deepfake-skydd": "face recognition security technology",
    "ai-bedragerier-sverige": "phone scam alert security",
    # BILD & VIDEO
    "ai-bilder-gratis": "creative digital art workspace",
    "skapa-ai-bilder": "designer creative computer art",
    "ai-genererade-bilder": "abstract digital art colorful",
    "midjourney-svenska": "artistic creative process design",
    "sora-ai-video": "video editing studio screen",
    # SAMHÄLLE
    "eu-ai-act-sverige": "european parliament government building",
    "ai-sverige-strategi": "stockholm sweden government",
    "ai-och-jobben": "modern office workplace people",
    "ai-i-skolan": "students classroom laptops education",
    "ai-energi-elforbrukning": "power plant electricity infrastructure",
}

def search_unsplash(query, slug):
    url = f"https://api.unsplash.com/search/photos?query={urllib.parse.quote(query)}&per_page=5&orientation=landscape&content_filter=high"
    req = urllib.request.Request(url, headers={"Authorization": f"Client-ID {UNSPLASH_KEY}"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            data = json.loads(r.read())
        results = data.get("results", [])
        if not results:
            return None, None
        # Pseudo-stabil val: hash slug till index
        idx = sum(ord(c) for c in slug) % len(results)
        photo = results[idx]
        photo_url = photo["urls"]["regular"]  # ~1080w
        attribution = f"Foto: {photo['user']['name']} via Unsplash"
        return photo_url, attribution
    except Exception as e:
        print(f"  ! Error för {query}: {e}")
        return None, None

def download_and_optimize(url, out_path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        img = Image.open(BytesIO(r.read())).convert("RGB")
    # Begränsa storlek till max 1200px bredd
    if img.width > 1200:
        new_h = int(img.height * (1200 / img.width))
        img = img.resize((1200, new_h), Image.LANCZOS)
    # Spara som WebP, justera kvalitet tills under 100KB
    quality = 85
    while quality > 50:
        img.save(out_path, "WEBP", quality=quality, method=6)
        if out_path.stat().st_size < 100_000:
            break
        quality -= 5
    return out_path.stat().st_size

def main():
    manifest = {}
    print(f"Hämtar {len(QUERIES)} inline-bilder från Unsplash...")
    for slug, query in QUERIES.items():
        out_path = OUT / f"{slug}.webp"
        if out_path.exists() and out_path.stat().st_size > 0:
            print(f"  · {slug}.webp (skip, finns)")
            continue
        url, attribution = search_unsplash(query, slug)
        if not url:
            print(f"  ✗ {slug}: ingen träff för '{query}'")
            continue
        try:
            size = download_and_optimize(url, out_path)
            manifest[slug] = {"attribution": attribution, "query": query}
            print(f"  ✓ {slug}.webp ({size//1024} KB)")
        except Exception as e:
            print(f"  ✗ {slug}: {e}")
        time.sleep(0.3)  # rate-limit-vänligt
    # Skriv manifest
    (OUT / "_manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    print(f"\n{len(manifest)}/{len(QUERIES)} bilder hämtade")

if __name__ == "__main__":
    main()
