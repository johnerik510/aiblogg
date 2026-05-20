#!/usr/bin/env python3
"""
Ersätter {/* INLINE-BILD: ... */}-kommentaren i varje MDX med en faktisk <Figure>-tag.
Importerar också Figure-komponenten om den saknas.
"""
import re, json
from pathlib import Path

ROOT = Path("/Users/axeljonemyr/Documents/aiblogg")
POSTS = ROOT / "src/content/posts"
INLINE = ROOT / "public/images/inline"
MANIFEST = json.loads((INLINE / "_manifest.json").read_text())

ALT_TEXTS = {
    "basta-ai-verktyg-svenska": "Modern arbetsplats med flera AI-verktyg på en bärbar dator",
    "ai-verktyg-gratis": "Översikt av gratis AI-verktyg på en skärm",
    "chatgpt-vs-claude": "Två chattgränssnitt jämförda sida vid sida",
    "perplexity-svenska": "Sökresultat i AI-sökmotor",
    "gemini-ai-svenska": "Google Gemini-gränssnitt på mobil",
    "cursor-ai-svenska": "Utvecklare som kodar med AI-stöd i Cursor",
    "chatgpt-svenska-guide": "Person som skriver med ChatGPT på laptop",
    "chatgpt-gratis-svenska": "ChatGPT-konversation på en smartphone",
    "vad-ar-chatgpt": "Visualisering av AI-koncept med neuralt nätverk",
    "vad-ar-en-prompt": "Närbild av tangentbord vid prompt-skrivande",
    "ai-i-excel-och-sheets": "Kalkylblad med dataanalys på skärm",
    "ai-for-smaforetag": "Småföretagare arbetar vid datorn",
    "ai-motesprotokoll": "Videomöte med deltagare på laptop",
    "ai-kundtjanst": "Kundtjänst-chattgränssnitt på dator",
    "ai-policy-arbetsplats": "Möte där policydokument diskuteras",
    "ai-personligt-brev-cv": "CV och personligt brev som skrivs på dator",
    "gdpr-chatgpt": "Digitalt lås som illustrerar dataskydd",
    "chatgpt-detector-svenska": "Förstoringsglas över text på skärm",
    "dina-data-i-ai": "Server-rack i datacenter",
    "deepfake-skydd": "Ansiktsigenkänningsteknik som illustration",
    "ai-bedragerier-sverige": "Mobiltelefon med säkerhetsvarning",
    "ai-bilder-gratis": "Kreativ arbetsplats med digital konst",
    "skapa-ai-bilder": "Designer som arbetar med digital bildgenerering",
    "ai-genererade-bilder": "Färgglad abstrakt digital konst",
    "midjourney-svenska": "Kreativ designprocess vid datorn",
    "sora-ai-video": "Videoredigeringsmiljö i en studio",
    "eu-ai-act-sverige": "Europeisk parlamentsbyggnad",
    "ai-sverige-strategi": "Svensk regeringsbyggnad",
    "ai-och-jobben": "Modernt kontorslandskap med människor som arbetar",
    "ai-i-skolan": "Klassrum med elever och bärbara datorer",
    "ai-energi-elforbrukning": "Elproduktionsanläggning i landskap",
}

# Pattern att ersätta
PATTERN = re.compile(r"\{/\*\s*INLINE-BILD:[^*]*\*/\}")

def inject(mdx_path: Path):
    slug = mdx_path.stem
    img_path = f"/images/inline/{slug}.webp"
    if not (INLINE / f"{slug}.webp").exists():
        return False, "ingen bild"
    alt = ALT_TEXTS.get(slug, f"Illustration till artikel om {slug.replace('-', ' ')}")
    attribution = MANIFEST.get(slug, {}).get("attribution", "")

    text = mdx_path.read_text()

    # Säkerställ att Figure är importerad
    if "import Figure" not in text:
        # Sätt in efter senaste import (typiskt Callout/FAQ)
        text = re.sub(
            r"(import FAQ from '[^']+';\n)",
            r"\1import Figure from '../../../components/Figure.astro';\n",
            text,
            count=1,
        )

    figure_tag = f'<Figure src="{img_path}" alt="{alt}" caption="{attribution}" />'

    if PATTERN.search(text):
        text = PATTERN.sub(figure_tag, text, count=1)
        action = "ersatt kommentar"
    else:
        # Lägg in efter första H2 om kommentar saknas
        text2 = re.sub(r"(\n## [^\n]+\n)", r"\1\n" + figure_tag + "\n", text, count=1)
        if text2 == text:
            return False, "ingen H2 hittades"
        text = text2
        action = "lade in efter första H2"

    mdx_path.write_text(text)
    return True, action

def main():
    count = 0
    for mdx in POSTS.rglob("*.mdx"):
        ok, msg = inject(mdx)
        status = "✓" if ok else "✗"
        print(f"  {status} {mdx.relative_to(POSTS)}: {msg}")
        if ok:
            count += 1
    print(f"\n{count} artiklar uppdaterade")

if __name__ == "__main__":
    main()
