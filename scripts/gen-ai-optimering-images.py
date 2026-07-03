#!/usr/bin/env python3
"""Genererar hero + inline-infografik för guiden ai-optimering (aiblogg.se)."""
import sys, os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, str(Path(__file__).parent))
import importlib.util
spec = importlib.util.spec_from_file_location("gh", str(Path(__file__).parent / "generate-hero-images.py"))
gh = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gh)

ROOT = Path("/Users/axeljonemyr/Documents/aiblogg")
INLINE = ROOT / "public/images/inline"
INLINE.mkdir(parents=True, exist_ok=True)

BG, CYAN, VIOLET, WHITE, DIM = gh.BG, gh.CYAN, gh.VIOLET, gh.WHITE, gh.DIM

# 1) HERO (title card, samma stil som OG/övriga)
hero = gh.render_card("ai-optimering-guide-hero",
                      "AI-optimering: syns i AI-modellernas svar",
                      "AI-guider", "ai-optimering")
hero.save(INLINE / "ai-optimering.webp", "WEBP", quality=88, method=6)
print("hero ok")

# 2) INLINE infografik: signalerna en AI-modell väger
W, H = 1600, 1000
img = gh.make_gradient_bg(gh.hash_seed("ai-optimering-signaler"))
img = img.resize((W, H))
d = ImageDraw.Draw(img)
PAD = 90

mono = gh.load_mono(22)
h_font = gh.load_font(58, "bold")
row_font = gh.load_font(38, "bold")
sub_font = gh.load_font(26)

d.ellipse([PAD, PAD + 6, PAD + 12, PAD + 18], fill=CYAN)
d.text((PAD + 26, PAD), "AIBLOGG.SE // AI-OPTIMERING", font=mono, fill=CYAN)
d.text((PAD, PAD + 44), "Vad en AI-modell väger när", font=h_font, fill=WHITE)
d.text((PAD, PAD + 44 + 70), "den väljer sina källor", font=h_font, fill=WHITE)

rows = [
    ("01", "Tydliga, självbärande svar", "Varje rubrik besvarar en fråga direkt, i 40-60 ord."),
    ("02", "Förstahandserfarenhet", "Konkreta siffror, modellnamn och egna tester, inte omskrivningar."),
    ("03", "Trovärdig avsändare", "Namngiven redaktion, metod och uppdaterad-datum syns på sidan."),
    ("04", "Teknisk åtkomst", "Serverrenderad text, snabb sida och crawlbar HTML."),
]
y = PAD + 250
row_h = 150
for num, title, sub in rows:
    d.rounded_rectangle([PAD, y, W - PAD, y + row_h - 24], radius=18,
                        fill=(20, 20, 24), outline=(45, 45, 52), width=1)
    d.text((PAD + 34, y + 34), num, font=row_font, fill=CYAN)
    d.text((PAD + 130, y + 26), title, font=row_font, fill=WHITE)
    d.text((PAD + 130, y + 78), sub, font=sub_font, fill=DIM)
    y += row_h

img.save(INLINE / "ai-optimering-signaler.webp", "WEBP", quality=86, method=6)
print("inline ok")
