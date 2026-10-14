"""Genera public/figuras/modelo2-p2/m2-ej3-parabola.svg. Uso: python3 scripts/figuras_modelo2.py
Notación de cátedra (U10 p.54): l directriz, a eje, F foco, A = l∩a, V vértice, LL' lado recto, D pie de P sobre l."""
import pathlib
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

matplotlib.rcParams.update({"svg.fonttype": "none", "font.size": 12})
out = pathlib.Path(__file__).resolve().parent.parent / "public" / "figuras" / "modelo2-p2"
out.mkdir(parents=True, exist_ok=True)

fig, ax = plt.subplots(figsize=(10, 7.6))
yy = np.linspace(-5, 5, 400)
ax.plot(5 - (yy+1)**2/4, yy, color="#1f4e9c", lw=2)                       # (y+1)^2 = -4(x-5)
ax.axvline(6, color="#c0392b", lw=1.5)                                    # directriz l: x = 6
ax.axhline(-1, color="gray", ls="--", lw=1)                               # eje a: y = -1
ax.axhline(0, color="k", lw=1); ax.axvline(0, color="k", lw=1)
ax.plot([4, 4], [-3, 1], color="#8e44ad", lw=2)                           # lado recto LL'
ax.plot([1, 4], [3, -1], color="#e67e22", lw=2)                           # radio vector FP
ax.plot([1, 6], [3, 3], color="#2e7d32", lw=1.5, ls="--")                # PD
pts = [((5, -1), "V(5;-1)", (3, -15), "#c0392b"), ((4, -1), "F(4;-1)", (-6, -16), "#e67e22"),
       ((6, -1), "A(6;-1)", (6, 5), "#c0392b"), ((4, 1), "L(4;1)", (7, 4), "#8e44ad"),
       ((4, -3), "L'(4;-3)", (7, -4), "#8e44ad"), ((1, 3), "P(1;3)", (-6, 7), "k"),
       ((6, 3), "D(6;3)", (7, 5), "#2e7d32")]
for (px, py), lab, off, col in pts:
    ax.plot(px, py, "o", color=col)
    ax.annotate(lab, (px, py), textcoords="offset points", xytext=off, color=col, fontsize=11,
                ha="right" if off[0] < 0 else "left")
box = dict(fc="white", ec="none", pad=1)
ax.text(1.55, 0.5, "|PF| = 5 (radio vector)", color="#e67e22", fontsize=11, rotation=-53, ha="center", va="center")
ax.text(3.5, 3.3, "|PD| = 5", color="#2e7d32", fontsize=11, ha="center", bbox=box)
ax.text(6.15, 5.3, "l: x = 6 (directriz)", color="#c0392b", fontsize=11)
ax.text(-3.8, -0.75, "a: y = -1 (eje)", color="gray", fontsize=11)
ax.text(3.8, -2.2, "LL' = |4p| = 4", color="#8e44ad", fontsize=11, ha="right")
ax.set_xticks(range(-5, 10)); ax.set_yticks(range(-6, 7))
ax.grid(True, color="#dddddd", lw=.5)
ax.set_xlim(-5, 9.5); ax.set_ylim(-6, 6); ax.set_aspect("equal")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_title("(y+1)² = -4(x-5)     4p = -4 (p = -1, |p| = 1), abre hacia la izquierda")
fig.tight_layout(); fig.savefig(out / "m2-ej3-parabola.svg"); plt.close(fig)
