"""Contact sheet: sheet.py out.jpg img1 img2 ... (labels = parent/name)."""
import sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
W = int(__import__('os').environ.get('W', 360)); cols = int(__import__('os').environ.get('C', 5))
ims = []
for f in files:
    im = Image.open(f).convert('RGB'); im.thumbnail((W, W*2)); ims.append((f, im))
H = max(im.height for _, im in ims)
rows = (len(ims)+cols-1)//cols
sheet = Image.new('RGB', (cols*W, rows*(H+22)), 'white'); dr = ImageDraw.Draw(sheet)
for i, (f, im) in enumerate(ims):
    x, y = (i%cols)*W, (i//cols)*(H+22)
    sheet.paste(im, (x, y+22)); dr.text((x+4, y+4), '/'.join(f.split('/')[-2:]), fill='red')
sheet.save(out, quality=80)
