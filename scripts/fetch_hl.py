"""Download highlight frames (image covers) into originals/hl/<title-slug>/NN.jpg and optionally videos."""
import json, sys, re, urllib.request, concurrent.futures as cf
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
raw = open(ROOT / "research/ig_hl.json").read()
d = json.loads(raw)
if isinstance(d, str): d = json.loads(d)
json.dump(d, open(ROOT / "research/ig_hl.json", "w"), ensure_ascii=False, indent=1)
want = sys.argv[1:]
slug = lambda t: re.sub(r"[^a-zа-я0-9]+", "-", t.lower()).strip("-")
jobs = []
for r in d.values():
    s = slug(r["title"])
    if want and s not in want: continue
    for i, it in enumerate(r["items"]):
        out = ROOT / "originals/hl" / s / f"{i:02d}.jpg"
        if not out.exists() and it["img"]: jobs.append((it["img"], out))
def get(job):
    url, out = job
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read())
with cf.ThreadPoolExecutor(8) as ex: list(ex.map(get, jobs))
print(len(jobs), "files;", [slug(r["title"]) for r in d.values()])
