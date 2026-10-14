"""Genera public/figuras/1r5-2p/1r5-ej1-elipse.svg. Uso: python3 scripts/figuras_1r5.py
Notación de cátedra (U10 p.15): V/V' eje mayor, A/A' eje menor, F/F' focos, LL' lado recto."""
import pathlib
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

matplotlib.rcParams.update({"svg.fonttype": "none", "font.size": 12})
out = pathlib.Path(__file__).resolve().parent.parent / "public" / "figuras" / "1r5-2p"
out.mkdir(parents=True, exist_ok=True)
s5 = np.sqrt(5); yF, yF2 = -2 + s5, -2 - s5

fig, ax = plt.subplots(figsize=(9.5, 8))
th = np.linspace(0, 2*np.pi, 400)
ax.plot(3+2*np.cos(th), -2+3*np.sin(th), color="#1f4e9c", lw=2)
ax.axvline(3, color="gray", ls="--", lw=1); ax.axhline(-2, color="gray", ls="--", lw=1)   # ejes de simetría
ax.axhline(0, color="k", lw=1); ax.axvline(0, color="k", lw=1)
for yl in (yF, yF2):                                                                      # lados rectos
    ax.plot([5/3, 13/3], [yl, yl], color="#8e44ad", lw=2)
pts = [((3, -2), "C(3;-2)", (6, -15), "k"),
       ((3, 1), "V(3;1)", (6, 6), "#c0392b"), ((3, -5), "V'(3;-5)", (6, -14), "#c0392b"),
       ((5, -2), "A(5;-2)", (6, 6), "#2e7d32"), ((1, -2), "A'(1;-2)", (-6, 6), "#2e7d32"),
       ((3, yF), "F(3;-2+√5)", (6, -14), "#e67e22"), ((3, yF2), "F'(3;-2-√5)", (6, 7), "#e67e22"),
       ((13/3, yF), "L(13/3;-2+√5)", (7, 4), "#8e44ad"), ((5/3, yF), "L'(5/3;-2+√5)", (-7, 4), "#8e44ad"),
       ((13/3, yF2), "M(13/3;-2-√5)", (7, -13), "#8e44ad"), ((5/3, yF2), "M'(5/3;-2-√5)", (-7, -13), "#8e44ad")]
for (px, py), lab, off, col in pts:
    ax.plot(px, py, "o", color=col)
    ax.annotate(lab, (px, py), textcoords="offset points", xytext=off, color=col, fontsize=10, bbox=dict(fc="white", ec="none", pad=0.5),
                ha="right" if off[0] < 0 else "left")
box = dict(fc="white", ec="none", pad=1)
def cota(p0, p1, txt, off, rot=0):
    ax.annotate("", p1, p0, arrowprops=dict(arrowstyle="<->", color="k", lw=1))
    ax.text((p0[0]+p1[0])/2+off[0], (p0[1]+p1[1])/2+off[1], txt, ha="center", va="center", fontsize=11, rotation=rot, bbox=box)
cota((7.4, -5), (7.4, 1), "2a = 6", (.45, 0), 90)
cota((1, -5.6), (5, -5.6), "2b = 4", (0, -.4))
cota((-.6, yF2), (-.6, yF), "2c = 2√5", (-.5, 0), 90)
ax.text(3.15, 2.0, "eje mayor (focal): x = 3", color="gray", fontsize=10)
ax.text(5.3, -2.5, "eje menor: y = -2", color="gray", fontsize=10)
ax.text(5.3, 1.3, "LL' = 2b²/a = 8/3", color="#8e44ad", fontsize=10)
ax.set_xticks(range(-3, 10)); ax.set_yticks(range(-7, 4))
ax.grid(True, color="#dddddd", lw=.5)
ax.set_xlim(-3, 9); ax.set_ylim(-7, 3); ax.set_aspect("equal")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_title("(x-3)²/4 + (y+2)²/9 = 1     a=3, b=2, c=√5, e=√5/3")
fig.tight_layout(); fig.savefig(out / "1r5-ej1-elipse.svg"); plt.close(fig)
