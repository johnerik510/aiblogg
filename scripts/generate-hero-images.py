#!/usr/bin/env python3
"""
Genererar branded hero-bilder för alla artiklar i aiblogg.se.
Hypermodern AI-estetik: dark bg + cyan→violet gradient + mono category label + title.
"""
import json, os, math, random, hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path("/Users/axeljonemyr/Documents/aiblogg")
OUT = ROOT / "public/images/articles"
OUT.mkdir(parents=True, exist_ok=True)

# Hero-storlek (16:9, hög kvalitet)
W, H = 1600, 900

# Brand-färger
BG = (10, 10, 11)          # #0A0A0B
CYAN = (0, 229, 255)        # accent
VIOLET = (139, 92, 246)     # violet
WHITE = (245, 245, 247)
DIM = (113, 113, 122)

# Fonter (system-fallback om Geist inte finns)
def load_font(size, weight="bold"):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if weight == "bold" else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def load_mono(size):
    candidates = [
        "/System/Library/Fonts/Menlo.ttc",
        "/System/Library/Fonts/Monaco.ttf",
        "/System/Library/Fonts/Courier.ttc",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def hash_seed(text):
    return int(hashlib.md5(text.encode("utf-8")).hexdigest()[:8], 16)

def make_gradient_bg(seed):
    """Diagonal gradient med subtle blobs per artikel."""
    rng = random.Random(seed)
    img = Image.new("RGB", (W, H), BG)
    # Skapa två stora blobs via radial gradient
    blob_layer = Image.new("RGB", (W, H), BG)
    bd = ImageDraw.Draw(blob_layer)
    # Blob 1 (cyan)
    cx1 = rng.randint(int(W*0.05), int(W*0.4))
    cy1 = rng.randint(int(H*0.05), int(H*0.4))
    r1 = rng.randint(int(W*0.4), int(W*0.7))
    for r in range(r1, 0, -8):
        a = int(40 * (1 - r/r1) ** 2)
        bd.ellipse([cx1-r, cy1-r, cx1+r, cy1+r],
                   fill=(min(255, BG[0]+int(CYAN[0]*a/255)),
                         min(255, BG[1]+int(CYAN[1]*a/255)),
                         min(255, BG[2]+int(CYAN[2]*a/255))))
    # Blob 2 (violet)
    cx2 = rng.randint(int(W*0.55), int(W*0.95))
    cy2 = rng.randint(int(H*0.55), int(H*0.95))
    r2 = rng.randint(int(W*0.4), int(W*0.7))
    overlay = Image.new("RGB", (W, H), (0,0,0))
    od = ImageDraw.Draw(overlay)
    for r in range(r2, 0, -8):
        a = int(50 * (1 - r/r2) ** 2)
        od.ellipse([cx2-r, cy2-r, cx2+r, cy2+r],
                   fill=(int(VIOLET[0]*a/255), int(VIOLET[1]*a/255), int(VIOLET[2]*a/255)))
    blob_layer = Image.blend(blob_layer, overlay, 0.5)
    blob_layer = blob_layer.filter(ImageFilter.GaussianBlur(radius=80))
    img = Image.blend(img, blob_layer, 1.0)
    # Grid-pattern overlay (subtle)
    grid = Image.new("RGBA", (W, H), (0,0,0,0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 80):
        gd.line([(x, 0), (x, H)], fill=(255,255,255,8), width=1)
    for y in range(0, H, 80):
        gd.line([(0, y), (W, y)], fill=(255,255,255,8), width=1)
    img = Image.alpha_composite(img.convert("RGBA"), grid).convert("RGB")
    return img

def wrap_title(text, font, max_width, draw):
    words = text.split()
    lines, current = [], []
    for w in words:
        test = (" ".join(current + [w])).strip()
        bbox = draw.textbbox((0,0), test, font=font)
        if bbox[2] - bbox[0] > max_width and current:
            lines.append(" ".join(current))
            current = [w]
        else:
            current.append(w)
    if current:
        lines.append(" ".join(current))
    return lines

def render_card(slug, title, category_label, primary_kw):
    seed = hash_seed(slug)
    img = make_gradient_bg(seed)
    draw = ImageDraw.Draw(img)

    # Padding
    PAD = 80
    inner_w = W - PAD*2

    # Logo + brand top-left
    logo_y = PAD - 10
    # Liten gradient-square som logo
    logo_size = 36
    logo_box = Image.new("RGBA", (logo_size, logo_size), (0,0,0,0))
    ld = ImageDraw.Draw(logo_box)
    for i in range(logo_size):
        t = i / logo_size
        r = int(CYAN[0]*(1-t) + VIOLET[0]*t)
        g = int(CYAN[1]*(1-t) + VIOLET[1]*t)
        b = int(CYAN[2]*(1-t) + VIOLET[2]*t)
        ld.line([(0, i), (logo_size, i)], fill=(r, g, b, 255))
    # Round corners
    mask = Image.new("L", (logo_size, logo_size), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, logo_size, logo_size], radius=8, fill=255)
    img.paste(logo_box, (PAD, logo_y), mask)

    brand_font = load_font(22, "bold")
    draw.text((PAD + logo_size + 14, logo_y + 6), "aiblogg.se", font=brand_font, fill=WHITE)

    # Category label (mono uppercase, mörk cyan)
    mono = load_mono(20)
    cat_text = category_label.upper()
    cat_y = H // 2 - 200
    # Cyan dot
    draw.ellipse([PAD, cat_y + 8, PAD + 10, cat_y + 18], fill=CYAN)
    draw.text((PAD + 22, cat_y), cat_text, font=mono, fill=CYAN)

    # Title (huge, white, wrapped)
    title_font = load_font(72, "bold")
    lines = wrap_title(title, title_font, inner_w, draw)
    # Truncate to max 4 rader
    if len(lines) > 4:
        lines = lines[:4]
        lines[-1] += "..."

    line_h = 86
    total_h = len(lines) * line_h
    start_y = cat_y + 50
    for i, line in enumerate(lines):
        draw.text((PAD, start_y + i*line_h), line, font=title_font, fill=WHITE)

    # Primary keyword som "tag" nederkant
    kw_font = load_mono(18)
    kw_text = f"# {primary_kw}"
    kw_y = H - PAD - 30
    draw.text((PAD, kw_y), kw_text, font=kw_font, fill=DIM)

    # Decorative element bottom-right
    deco_x = W - PAD - 200
    deco_y = H - PAD - 20
    # Glowy line
    for i in range(200, 0, -2):
        alpha = int(60 * (i/200))
        draw.line([(deco_x + (200-i), deco_y), (deco_x + (200-i)+1, deco_y)],
                  fill=(CYAN[0], CYAN[1], CYAN[2], alpha))
    draw.line([(deco_x, deco_y), (W - PAD, deco_y)], fill=CYAN, width=2)

    # Subtle vignette
    vignette = Image.new("L", (W, H), 255)
    vd = ImageDraw.Draw(vignette)
    for r in range(0, max(W, H), 20):
        vd.ellipse([-r, -r, W+r, H+r], outline=max(60, 255 - r//4))
    # Skip vignette for speed

    return img

def main():
    articles_data = []
    # Läs articles.ts genom regex-extraktion (enkelt)
    ts_content = (ROOT / "src/data/articles.ts").read_text()

    import re
    # Match objects efter "slug:" tills nästa "{"
    pattern = re.compile(
        r"\{\s*slug:\s*'([^']+)'.*?title:\s*'([^']+)'.*?categoryLabel:\s*'([^']+)'.*?primaryKeyword:\s*'([^']+)'",
        re.DOTALL,
    )
    for m in pattern.finditer(ts_content):
        slug, title, cat, kw = m.groups()
        articles_data.append((slug, title, cat, kw))

    print(f"Genererar {len(articles_data)} hero-bilder...")
    for slug, title, cat, kw in articles_data:
        out_path = OUT / f"{slug}.webp"
        img = render_card(slug, title, cat, kw)
        img.save(out_path, "WEBP", quality=88, method=6)
        print(f"  ✓ {out_path.name}")

    # Generera även default OG
    og_path = ROOT / "public/images/og/default.webp"
    og_path.parent.mkdir(parents=True, exist_ok=True)
    img = render_card("default", "AI på svenska, utan hype", "aiblogg.se", "ai sverige")
    img.save(og_path, "WEBP", quality=88, method=6)
    print(f"  ✓ {og_path}")

if __name__ == "__main__":
    main()
