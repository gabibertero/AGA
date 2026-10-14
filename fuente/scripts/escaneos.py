#!/usr/bin/env python3
"""Genera public/escaneos/<id>/p<N>.webp desde los PDFs originales (../<fuente>) segun docs/escaneos.json.
Por pagina: "rot" (grados, opcional), "cajas" [[x0,y0,x1,y1,motivo],...] en coords relativas 0-1 de la pagina
(ya rotada) a tapar con gris, "limpiar_fondo" true (blanquea texto tenue del reverso, conserva tinta), y "crop" [x0,y0,x1,y1] opcional (se aplica DESPUES de tapar).
Uso: python3 scripts/escaneos.py [id ...]   (sin args: todos). Idempotente: pisa los .webp."""
import json, os, sys
import fitz
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAXW = 1400
FONDO = 180  # umbral de gris: todo lo mas claro pasa a blanco

def main(ids):
    man = json.load(open(os.path.join(ROOT, "docs/escaneos.json"), encoding="utf-8"))
    for i in ids or man:
        if i not in man:
            sys.exit(f"id desconocido: {i} (ver docs/escaneos.json)")
        doc = fitz.open(os.path.join(ROOT, "..", man[i]["fuente"]))
        out = os.path.join(ROOT, "public/escaneos")
        os.makedirs(os.path.join(out, i), exist_ok=True)
        for n, cfg in man[i]["paginas"].items():
            if not 1 <= int(n) <= len(doc):
                sys.exit(f"{i}: pagina {n} fuera de rango (1-{len(doc)})")
            page = doc[int(n) - 1]
            pm = page.get_pixmap(matrix=fitz.Matrix(MAXW / page.rect.width, MAXW / page.rect.width), alpha=False)
            im = Image.frombytes("RGB", (pm.width, pm.height), pm.samples)
            if cfg.get("limpiar_fondo"):
                g = ImageOps.autocontrast(im.convert("L"), cutoff=1)
                im = Image.composite(Image.new("RGB", im.size, "white"), im, g.point(lambda v: 255 if v > FONDO else 0))
            if cfg.get("rot"):
                im = im.rotate(-cfg["rot"], expand=True)
            d = ImageDraw.Draw(im)
            for x0, y0, x1, y1, _motivo in cfg.get("cajas", []):
                b = [x0 * im.width, y0 * im.height, x1 * im.width, y1 * im.height]
                d.rectangle(b, fill="#9a9a9a")
                f = ImageFont.load_default(size=max(10, min(16, int((b[3] - b[1]) / 3))))
                d.text((b[0] + 6, b[1] + 4), "dato personal oculto", fill="#333333", font=f)
            if cfg.get("crop"):
                x0, y0, x1, y1 = cfg["crop"]
                im = im.crop((int(x0 * im.width), int(y0 * im.height), int(x1 * im.width), int(y1 * im.height)))
            if im.width > MAXW:
                im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
            dest = os.path.join(out, i, f"p{n}.webp")
            if os.path.commonpath([os.path.realpath(dest), os.path.realpath(out)]) != os.path.realpath(out):
                sys.exit(f"salida fuera de public/escaneos: {dest}")
            im.save(dest, "WEBP", quality=70)
        doc.close()
        print(i, "ok", flush=True)

if __name__ == "__main__":
    main(sys.argv[1:])
