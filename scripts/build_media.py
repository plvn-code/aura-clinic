"""Build every image the site uses into public/img/ (WebP).

Run:  ~/Desktop/nudes/research/.venv/bin/python -I scripts/build_media.py
Sources:
  - Unsplash (free licence, commercial use, no attribution required) — ids in research/stockprev.json,
    downloaded at full size into originals/stock/ and recorded in originals/stock/SOURCES.json
  - Instagram @aura_clinic__ post covers (originals/ig/), highlight frames (originals/hl/),
    first frames of the «ВРАЧИ» highlight videos (originals/frames/)
"""
import json
import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/img"
ORIG = ROOT / "originals"

# public name -> Unsplash preview name (research/stockprev.json key)
STOCK = {
    "hero-1": "asian-woman-skincare-12.jpg",
    "hero-2": "facial-treatment-02.jpg",
    "hero-3": "beauty-injection-13.jpg",
    "s-chistka": "facial-treatment-04.jpg",
    "s-pilingi": "skincare-clinic-13.jpg",
    "s-botox": "beauty-injection-10.jpg",
    "s-kontur": "lip-filler-16.jpg",
    "s-biorevit": "beauty-injection-16.jpg",
    "s-mezo": "beauty-injection-02.jpg",
    "s-apparat": "cosmetologist-13.jpg",
    "s-laser": "skincare-clinic-06.jpg",
    "s-body": "woman-glowing-skin-02.jpg",
    "tex-cream": "skin-care-texture-00.jpg",
    "tex-gel": "skin-care-texture-06.jpg",
    "tex-serum": "skin-care-texture-13.jpg",
    "tex-fold": "skin-care-texture-14.jpg",
    "portrait": "asian-woman-beauty-portrait-06.jpg",
    "mood-warm": "facial-treatment-08.jpg",
    "serum": "beauty-serum-02.jpg",
    "mask": "facial-treatment-00.jpg",
    "interior": "skincare-clinic-14.jpg",
}

# public name -> (source file glob, crop box as fractions l, t, r, b, max width)
def ig(i):
    return next((ORIG / "ig").glob(f"{i:03d}-*.jpg"))

CLINIC = {
    "clinic/facade": (lambda: ig(146), (0, 0, 1, 0.44)),
    "clinic/team": (lambda: ig(134), (0, 0.215, 1, 0.80)),
    "clinic/procedure": (lambda: ig(9), (0, 0.02, 1, 0.56)),
}

DOCTORS = {
    "doctors/diana": (ORIG / "frames/doc00.jpg", (0.1, 0.10, 0.9, 0.665)),
    "doctors/aruzhan": (ORIG / "frames/doc01.jpg", (0.1, 0.10, 0.9, 0.665)),
    "doctors/altynai": (ORIG / "frames/doc02.jpg", (0.1, 0.055, 0.9, 0.62)),
    "doctors/fatima": (ORIG / "frames/doc03.jpg", (0.1, 0.10, 0.9, 0.665)),
    "doctors/gulnaz": (ORIG / "frames/doc04.jpg", (0.1, 0.10, 0.9, 0.665)),
    "doctors/aigerim": (None, (0.2, 0.305, 0.8, 0.735)),
}

RESULTS = {
    "results/botox-1": ORIG / "hl/botox/03.jpg",
    "results/botox-2": ORIG / "hl/botox/09.jpg",
    "results/botox-3": ORIG / "hl/botox/15.jpg",
    "results/botox-4": ORIG / "hl/botox/05.jpg",
    "results/botox-5": ORIG / "hl/botox/13.jpg",
    "results/botox-6": ORIG / "hl/botox/07.jpg",
    "results/clean-5": ORIG / "hl/черные-точки/09.jpg",
    "results/clean-6": ORIG / "hl/черные-точки/14.jpg",
    "results/clean-1": ORIG / "hl/черные-точки/06.jpg",
    "results/clean-2": ORIG / "hl/черные-точки/07.jpg",
    "results/clean-3": ORIG / "hl/черные-точки/16.jpg",
    "results/clean-4": ORIG / "hl/черные-точки/02.jpg",
}


def save(im: Image.Image, name: str, max_side: int, q: int = 80) -> None:
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    out = OUT / f"{name}.webp"
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "WEBP", quality=q, method=6)
    print(f"{out.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {out.stat().st_size // 1024} KB")


def crop(im: Image.Image, box) -> Image.Image:
    w, h = im.size
    l, t, r, b = box
    return im.crop((round(l * w), round(t * h), round(r * w), round(b * h)))


def stock() -> None:
    prev = json.load(open(ROOT / "research/stockprev.json"))
    src_dir = ORIG / "stock"
    src_dir.mkdir(parents=True, exist_ok=True)
    sources = {}
    for name, key in STOCK.items():
        url = prev[key]
        sources[name] = {"url": url, "page": "https://unsplash.com/photos/" + url.rsplit("photo-", 1)[1], "licence": "Unsplash License"}
        raw = src_dir / f"{name}.jpg"
        if not raw.exists():
            req = urllib.request.Request(url + "?w=2200&q=85&fm=jpg", headers={"User-Agent": "Mozilla/5.0"})
            raw.write_bytes(urllib.request.urlopen(req, timeout=60).read())
        max_side = 2000 if name.startswith("hero") else 1500
        save(Image.open(raw), f"stock/{name}", max_side, 78)
    json.dump(sources, open(src_dir / "SOURCES.json", "w"), indent=1)


def clinic() -> None:
    for name, (src, box) in CLINIC.items():
        save(crop(Image.open(src()), box), name, 1200, 82)
    for name, (src, box) in DOCTORS.items():
        path = src or ig(149)
        save(crop(Image.open(path), box), name, 900, 84)
    for name, src in RESULTS.items():
        save(Image.open(src), name, 900, 80)


if __name__ == "__main__":
    what = sys.argv[1:] or ["stock", "clinic"]
    if "stock" in what:
        stock()
    if "clinic" in what:
        clinic()
