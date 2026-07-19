#!/usr/bin/env python3
"""Genererar hero + inline-infografik for guiden styra-elforbrukning-smarta-system (aiblogg.se)."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
import importlib.util

sys.path.insert(0, str(Path(__file__).parent))
spec = importlib.util.spec_from_file_location("gh", str(Path(__file__).parent / "generate-hero-images.py"))
gh = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gh)

ROOT = Path("/Users/axeljonemyr/Documents/aiblogg")
INLINE = ROOT / "public/images/inline"
INLINE.mkdir(parents=True, exist_ok=True)

BG, CYAN, VIOLET, WHITE, DIM = gh.BG, gh.CYAN, gh.VIOLET, gh.WHITE, gh.DIM

# 1) HERO (title card, samma stil som ovriga)
hero = gh.render_card("styra-elforbrukning-smarta-system",
                      "Styr elforbrukningen med smarta system",
                      "AI-guider", "smart elstyrning")
hero.save(INLINE / "styra-elforbrukning-smarta-system.webp", "WEBP", quality=88, method=6)
print("hero ok")

# 2) INLINE infografik: sa kapar smarta system elrakningen
W, H = 1600, 1000
img = gh.make_gradient_bg(gh.hash_seed("styra-elforbrukning-infografik"))
img = img.resize((W, H))
d = ImageDraw.Draw(img)
PAD = 90

mono = gh.load_mono(22)
h_font = gh.load_font(58, "bold")
row_font = gh.load_font(38, "bold")
sub_font = gh.load_font(26)

d.ellipse([PAD, PAD + 6, PAD + 12, PAD + 18], fill=CYAN)
d.text((PAD + 26, PAD), "AIBLOGG.SE // SMART ELSTYRNING", font=mono, fill=CYAN)
d.text((PAD, PAD + 44), "Fyra satt smarta system", font=h_font, fill=WHITE)
d.text((PAD, PAD + 44 + 70), "kapar elrakningen", font=h_font, fill=WHITE)

rows = [
    ("01", "Flytta lasten till billiga timmar", "Smarta uttag och timers kor tvatt och disk nar spotpriset ar lagt."),
    ("02", "Ladda elbilen automatiskt", "Laddboxen startar sjalv de billigaste nattimmarna."),
    ("03", "Styr varmen efter priset", "Termostat och varmepump sanker effekten nar elen ar dyr."),
    ("04", "Foljer upp och finjusterar", "Appar och AI lar sig ditt monster och optimerar over tid."),
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

img.save(INLINE / "styra-elforbrukning-infografik.webp", "WEBP", quality=86, method=6)
print("inline ok")
