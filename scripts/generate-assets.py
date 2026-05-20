#!/usr/bin/env python3
"""Genererar author-avatar, favicon, OG-bild för aiblogg.se"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

ROOT = Path("/Users/axeljonemyr/Documents/aiblogg")
CYAN = (0, 229, 255)
VIOLET = (139, 92, 246)
BG = (10, 10, 11)
WHITE = (245, 245, 247)
DIM = (113, 113, 122)

def load_font(size, weight="bold"):
    paths = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if weight == "bold" else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for p in paths:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except: pass
    return ImageFont.load_default()

def gradient_square(size, c1, c2):
    img = Image.new("RGB", (size, size), BG)
    d = ImageDraw.Draw(img)
    for i in range(size):
        t = i/size
        r = int(c1[0]*(1-t) + c2[0]*t)
        g = int(c1[1]*(1-t) + c2[1]*t)
        b = int(c1[2]*(1-t) + c2[2]*t)
        d.line([(0,i),(size,i)], fill=(r,g,b))
    return img

def author_avatar():
    """Stylized AH-initial avatar med gradient bg."""
    size = 400
    img = gradient_square(size, CYAN, VIOLET)
    # Dim overlay
    overlay = Image.new("RGB", (size, size), BG)
    img = Image.blend(img, overlay, 0.35)
    # Add radial highlight top-left
    blob = Image.new("RGB", (size, size), BG)
    bd = ImageDraw.Draw(blob)
    for r in range(int(size*0.6), 0, -2):
        a = int(80 * (1 - r/(size*0.6))**2)
        bd.ellipse([size*0.1-r, size*0.1-r, size*0.1+r, size*0.1+r],
                   fill=(min(255, BG[0]+int(CYAN[0]*a/255)),
                         min(255, BG[1]+int(CYAN[1]*a/255)),
                         min(255, BG[2]+int(CYAN[2]*a/255))))
    blob = blob.filter(ImageFilter.GaussianBlur(40))
    img = Image.blend(img, blob, 0.6)

    d = ImageDraw.Draw(img)
    font = load_font(180, "bold")
    text = "AH"
    bbox = d.textbbox((0,0), text, font=font)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    d.text(((size-tw)//2 - bbox[0], (size-th)//2 - bbox[1] - 10), text, font=font, fill=WHITE)

    # Subtle border via mask (round)
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse([0,0,size,size], fill=255)
    out = Image.new("RGBA", (size, size), (0,0,0,0))
    out.paste(img, (0,0), mask)
    # Convert back to RGB with bg
    final = Image.new("RGB", (size, size), BG)
    final.paste(out, (0,0), mask)
    return final

def favicon_svg():
    """SVG favicon — gradient square."""
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E5FF"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#g)"/>
</svg>'''

def main():
    # Author avatar
    avatar = author_avatar()
    avatar.save(ROOT / "public/images/authors/adrian.webp", "WEBP", quality=92, method=6)
    print("✓ author avatar")

    # Favicon
    (ROOT / "public/favicon.svg").write_text(favicon_svg())
    print("✓ favicon")

if __name__ == "__main__":
    main()
