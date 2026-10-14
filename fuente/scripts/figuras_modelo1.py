"""Genera docs/figuras/m1-ej1-elipse.svg y m1-ej3-rectas.svg. Uso: python3 scripts/figuras_modelo1.py"""
import pathlib
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

matplotlib.rcParams.update({"svg.fonttype": "none", "font.size": 12})
raiz = pathlib.Path(__file__).resolve().parent.parent
outs = [raiz / "docs" / "figuras", raiz / "public" / "figuras" / "modelo1-p2"]  # docs = fuente, public = lo que sirve el sitio
for o in outs: o.mkdir(parents=True, exist_ok=True)
def guardar(fig, nombre):
    for o in outs: fig.savefig(o / nombre)

# ---- Ej.1 ---- (notación de cátedra, U10 p.15: V/V', A/A', F/F', LL', eje focal l)
fig, ax = plt.subplots(figsize=(11, 6))
th = np.linspace(0, 2*np.pi, 400)
ax.plot(3+5*np.cos(th), -2+3*np.sin(th), color="#1f4e9c", lw=2)
ax.axhline(-2, color="gray", ls="--", lw=1); ax.axvline(3, color="gray", ls="--", lw=1)   # ejes de simetría
ax.axhline(0, color="k", lw=1); ax.axvline(0, color="k", lw=1)
for xl in (7, -1):                                                                          # lados rectos
    ax.plot([xl, xl], [-19/5, -1/5], color="#8e44ad", lw=2)
pts = [((3, -2), "C(3;-2)", (6, 6), "k"),
       ((8, -2), "V(8;-2)", (6, 8), "#c0392b"), ((-2, -2), "V'(-2;-2)", (-6, 8), "#c0392b"),
       ((3, 1), "A(3;1)", (6, 6), "#2e7d32"), ((3, -5), "A'(3;-5)", (6, -14), "#2e7d32"),
       ((7, -2), "F(7;-2)", (-6, -17), "#e67e22"), ((-1, -2), "F'(-1;-2)", (6, -17), "#e67e22"),
       ((7, -1/5), "L(7;-1/5)", (6, 4), "#8e44ad"), ((7, -19/5), "L'(7;-19/5)", (6, -12), "#8e44ad"),
       ((-1, -1/5), "M(-1;-1/5)", (-6, 4), "#8e44ad"), ((-1, -19/5), "M'(-1;-19/5)", (-6, -12), "#8e44ad")]
for (px, py), lab, off, col in pts:
    ax.plot(px, py, "o", color=col)
    ax.annotate(lab, (px, py), textcoords="offset points", xytext=off, color=col, fontsize=10,
                ha="right" if off[0] < 0 else "left")
def cota(p0, p1, txt, off):
    ax.annotate("", p1, p0, arrowprops=dict(arrowstyle="<->", color="k", lw=1))
    ax.text((p0[0]+p1[0])/2+off[0], (p0[1]+p1[1])/2+off[1], txt, ha="center", va="center", fontsize=11,
            bbox=dict(fc="white", ec="none", pad=1))
cota((-2, 1.8), (8, 1.8), "2a = 10", (0, .35))
cota((-4.6, -5), (-4.6, 1), "2b = 6", (0, 0)); ax.texts[-1].set_rotation(90)
cota((-1, -4.4), (7, -4.4), "2c = 8", (0, .3))
ax.text(8.3, -2.5, "eje focal: y = -2", color="gray", fontsize=10)
ax.text(3.15, 2.7, "eje menor: x = 3", color="gray", fontsize=10)
ax.text(7.5, -3.1, "LL' = 2b²/a = 18/5", color="#8e44ad", fontsize=10)
ax.set_xticks(range(-5, 13)); ax.set_yticks(range(-6, 4))
ax.grid(True, color="#dddddd", lw=.5)
ax.set_xlim(-5.5, 12.5); ax.set_ylim(-6, 3.4); ax.set_aspect("equal")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_title("(x-3)²/25 + (y+2)²/9 = 1     a=5, b=3, c=4, e=4/5")
fig.tight_layout(); guardar(fig, "m1-ej1-elipse.svg"); plt.close(fig)

# ---- Ej.3 ----
fig = plt.figure(figsize=(7.8, 5.6)); ax = fig.add_subplot(projection="3d")
t = np.linspace(-1.5, 3, 2); l = np.linspace(-1, 3, 2)
ax.plot(t, -1+t, -1+2*t, color="#1f4e9c", lw=2, label=r"$r_1$: x=y+1=(z+1)/2")
ax.plot(3-l, -1+2*l, 2+l, color="#c0392b", lw=2, label=r"$r_2$")
for p, lab, col in [((0, -1, -1), "A(0;-1;-1)", "#1f4e9c"), ((1, 0, 1), "B(1;0;1)", "#1f4e9c"), ((2, 1, 3), "Q(2;1;3)", "k")]:
    ax.scatter(*p, color=col, s=40); ax.text(p[0]+.1, p[1], p[2]+.2, lab, color=col)
ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_zlabel("z")
ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.02), ncol=2)
ax.view_init(22, -60)
fig.tight_layout(); guardar(fig, "m1-ej3-rectas.svg"); plt.close(fig)
