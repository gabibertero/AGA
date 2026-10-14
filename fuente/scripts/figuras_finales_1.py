"""Figuras de los finales 2017-12-20 ... 2022-03-02 (U10). Salida: public/figuras/final-AAAA-MM-DD/*.svg
Notación de cátedra (U10 p.15 y p.29): V/V', A/A', F/F', LL' (lado recto), eje focal l. Uso: python3 scripts/figuras_finales_1.py"""
import pathlib
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

matplotlib.rcParams.update({"svg.fonttype": "none", "font.size": 12})
RAIZ = pathlib.Path(__file__).resolve().parent.parent / "public" / "figuras"
AZUL, ROJO, VERDE, NARANJA, VIOLETA, GRIS = "#1f4e9c", "#c0392b", "#2e7d32", "#e67e22", "#8e44ad", "#777777"
PALETA = {"V": ROJO, "A": VERDE, "F": NARANJA, "L": VIOLETA, "M": VIOLETA, "C": "k"}


def guardar(fig, carpeta, nombre):
    d = RAIZ / carpeta
    d.mkdir(parents=True, exist_ok=True)
    fig.savefig(d / nombre, bbox_inches="tight")
    plt.close(fig)


def puntos(ax, lista):
    """lista de (x, y, rótulo, (dx, dy) en puntos); el color sale de la inicial del rótulo."""
    for px, py, lab, off in lista:
        col = PALETA.get(lab[0], "k")
        ax.plot(px, py, "o", color=col, zorder=5)
        ax.annotate(lab, (px, py), textcoords="offset points", xytext=off, color=col, fontsize=10,
                    ha="right" if off[0] < 0 else "left", zorder=6)


def cota(ax, p0, p1, txt, rot=0):
    ax.annotate("", p1, p0, arrowprops=dict(arrowstyle="<->", color="k", lw=1))
    ax.text((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, txt, ha="center", va="center", fontsize=11, rotation=rot,
            bbox=dict(fc="white", ec="none", pad=1), zorder=7)


def marco(ax, xlim, ylim, titulo):
    ax.axhline(0, color="k", lw=1); ax.axvline(0, color="k", lw=1)
    ax.set_xticks(range(int(xlim[0]), int(xlim[1]) + 1)); ax.set_yticks(range(int(ylim[0]), int(ylim[1]) + 1))
    ax.grid(True, color="#dddddd", lw=.5)
    ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.set_aspect("equal")
    ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_title(titulo, fontsize=12)


# ---------------------------------------------------------------- F-2019-07-02, ej.2: elipse vertical
fig, ax = plt.subplots(figsize=(8.6, 7.4))
th = np.linspace(0, 2*np.pi, 500); s3 = np.sqrt(3)
ax.plot(-4 + 2*s3*np.cos(th), -4 + 4*np.sin(th), color=AZUL, lw=2)
ax.plot([-4, -4], [-9, 1], color=GRIS, ls="--", lw=1); ax.plot([-10, 4], [-4, -4], color=GRIS, ls="--", lw=1)
for yl in (-2, -6):
    ax.plot([-7, -1], [yl, yl], color=VIOLETA, lw=2)                       # lados rectos por F y F'
puntos(ax, [(-4, -4, "C(-4;-4)", (6, 6)),
            (-4, 0, "V(-4;0)", (7, 4)), (-4, -8, "V'(-4;-8)", (7, -12)),
            (-4 + 2*s3, -4, "A(-4+2√3;-4)", (4, 7)), (-4 - 2*s3, -4, "A'(-4-2√3;-4)", (4, 8)),
            (-4, -2, "F(-4;-2)", (-6, 8)), (-4, -6, "F'(-4;-6)", (-6, -14)),
            (-1, -2, "L(-1;-2)", (6, 4)), (-7, -2, "L'(-7;-2)", (-6, 4)),
            (-1, -6, "M(-1;-6)", (6, -13)), (-7, -6, "M'(-7;-6)", (-6, -13))])
cota(ax, (-9.2, -8), (-9.2, 0), "2a = 8", 90)
cota(ax, (-4 - 2*s3, -8.5), (-4 + 2*s3, -8.5), "2b = 4√3")
cota(ax, (-2.3, -6), (-2.3, -2), "2c = 4", 90)
ax.text(-3.85, 0.45, "eje focal l: x = -4", color=GRIS, fontsize=10)
ax.text(0.1, -4.45, "eje menor: y = -4", color=GRIS, fontsize=10)
ax.text(-7.0, -0.9, "LL' = 6", color=VIOLETA, fontsize=10)
marco(ax, (-10, 4), (-9, 1), "(x+4)²/12 + (y+4)²/16 = 1     a=4, b=2√3, c=2, e=1/2")
fig.tight_layout(); guardar(fig, "final-2019-07-02", "ej2-elipse.svg")

# ---------------------------------------------------------------- F-2022-02-16, ej.4: elipse horizontal
fig, ax = plt.subplots(figsize=(9.6, 6.2))
s5 = np.sqrt(5)
ax.plot(-4 + 3*np.cos(th), 1 + 2*np.sin(th), color=AZUL, lw=2)
ax.plot([-9, 3], [1, 1], color=GRIS, ls="--", lw=1); ax.plot([-4, -4], [-3, 5], color=GRIS, ls="--", lw=1)
for xl in (-4 + s5, -4 - s5):
    ax.plot([xl, xl], [1 - 4/3, 1 + 4/3], color=VIOLETA, lw=2)
puntos(ax, [(-4, 1, "C(-4;1)", (-6, 7)),
            (-1, 1, "V(-1;1)", (6, -14)), (-7, 1, "V'(-7;1)", (-5, 5)),
            (-4, 3, "A(-4;3)", (6, 4)), (-4, -1, "A'(-4;-1)", (6, -12)),
            (-4 + s5, 1, "F(-4+√5;1)", (-4, -15)), (-4 - s5, 1, "F'(-4-√5;1)", (4, -15)),
            (-4 + s5, 1 + 4/3, "L(-4+√5;7/3)", (5, 4)), (-4 + s5, 1 - 4/3, "L'(-4+√5;-1/3)", (5, -12)),
            (-4 - s5, 1 + 4/3, "M(-4-√5;7/3)", (-5, 4)), (-4 - s5, 1 - 4/3, "M'(-4-√5;-1/3)", (-5, -12))])
cota(ax, (-7, 3.9), (-1, 3.9), "2a = 6")
cota(ax, (-8.3, -1), (-8.3, 3), "2b = 4", 90)
cota(ax, (-4 - s5, -2.4), (-4 + s5, -2.4), "2c = 2√5")
ax.text(-0.6, 1.15, "eje focal l: y = 1", color=GRIS, fontsize=10)
ax.text(-3.9, 4.55, "eje menor: x = -4", color=GRIS, fontsize=10)
ax.text(-8.9, -1.9, "LL' = 2b²/a = 8/3 (por F y por F')", color=VIOLETA, fontsize=10)
marco(ax, (-9, 3), (-3, 5), "(x+4)²/9 + (y-1)²/4 = 1     a=3, b=2, c=√5, e=√5/3")
fig.tight_layout(); guardar(fig, "final-2022-02-16", "ej4-elipse.svg")

# ---------------------------------------------------------------- F-2017-12-20 y F-2019-09-11, ej.2: hipérbola vertical
fig, ax = plt.subplots(figsize=(8.6, 8.2))
u = np.linspace(-1.6, 1.6, 400); s13 = np.sqrt(13)
for sg in (1, -1):                                                           # y^2/4 - (x+3)^2/9 = 1
    ax.plot(-3 + 3*np.sinh(u), sg*2*np.cosh(u), color=AZUL, lw=2)
xs = np.linspace(-10, 4, 2)
ax.plot(xs, (2/3)*(xs + 3), color=GRIS, ls="-.", lw=1); ax.plot(xs, -(2/3)*(xs + 3), color=GRIS, ls="-.", lw=1)
ax.plot([-6, 0, 0, -6, -6], [2, 2, -2, -2, 2], color="#bbbbbb", lw=1, ls=":")     # rectángulo auxiliar 2b x 2a
ax.plot([-3, -3], [-6, 6], color=GRIS, ls="--", lw=1); ax.plot([-10, 4], [0, 0], color=GRIS, ls="--", lw=1)
for yl in (s13, -s13):
    ax.plot([-3 - 4.5, -3 + 4.5], [yl, yl], color=VIOLETA, lw=2)             # lados rectos
puntos(ax, [(-3, 0, "C(-3;0)", (6, -13)),
            (-3, 2, "V(-3;2)", (7, 3)), (-3, -2, "V'(-3;-2)", (7, -12)),
            (0, 0, "A(0;0)", (5, -13)), (-6, 0, "A'(-6;0)", (-5, -13)),
            (-3, s13, "F(-3;√13)", (-8, 6)), (-3, -s13, "F'(-3;-√13)", (-8, -14)),
            (1.5, s13, "L(3/2;√13)", (6, 10)), (-7.5, s13, "M(-15/2;√13)", (-6, 10)),
            (1.5, -s13, "L'(3/2;-√13)", (6, -18)), (-7.5, -s13, "M'(-15/2;-√13)", (-6, -18))])
cota(ax, (-4.2, -2), (-4.2, 2), "2a = 4", 90)
cota(ax, (-6, 0.6), (0, 0.6), "2b = 6")
cota(ax, (-1.6, -s13), (-1.6, s13), "2c = 2√13", 90)
ax.text(-9.9, 0.2, "eje conjugado: y = 0", color=GRIS, fontsize=10)
ax.text(-2.85, 5.5, "eje focal l: x = -3", color=GRIS, fontsize=10)
ax.text(1.0, 4.4, "y = (2/3)(x+3)", color=GRIS, fontsize=10); ax.text(1.0, -5.0, "y = -(2/3)(x+3)", color=GRIS, fontsize=10)
ax.text(-9.9, 4.3, "LL' = 2b²/a = 9", color=VIOLETA, fontsize=10)
marco(ax, (-10, 4), (-6, 6), "y²/4 - (x+3)²/9 = 1     a=2, b=3, c=√13, e=√13/2")
fig.tight_layout()
for car in ("final-2017-12-20", "final-2019-09-11"):                           # mismo enunciado en los dos finales
    fig.savefig((RAIZ / car).mkdir(parents=True, exist_ok=True) or (RAIZ / car / "ej2-hiperbola.svg"))
plt.close(fig)

# ---------------------------------------------------------------- F-2018-12-04, ej.5: hipérbola rotada x^2+4xy+y^2=3
fig, ax = plt.subplots(figsize=(8.6, 8.2))
r2 = np.sqrt(2)
e1 = np.array([1, -1])/r2; e2 = np.array([1, 1])/r2                          # ejes x' (λ=-1) e y' (λ=3)
def O(xp, yp): return xp*e1 + yp*e2
u = np.linspace(-1.8, 1.8, 400)
for sg in (1, -1):                                                           # -x'^2/3 + y'^2 = 1
    P = np.array([O(np.sqrt(3)*np.sinh(v), sg*np.cosh(v)) for v in u])
    ax.plot(P[:, 0], P[:, 1], color=AZUL, lw=2)
L = 4.2
ax.plot([-L*e1[0], L*e1[0]], [-L*e1[1], L*e1[1]], color=NARANJA, lw=1.2, ls="--")   # eje x'
ax.plot([-L*e2[0], L*e2[0]], [-L*e2[1], L*e2[1]], color=NARANJA, lw=1.2, ls="--")   # eje y' (focal)
for sg in (1, -1):
    d = O(np.sqrt(3), sg*1)                                                  # asíntotas y' = ±x'/√3
    ax.plot([-4*d[0], 4*d[0]], [-4*d[1], 4*d[1]], color=GRIS, ls="-.", lw=1)
ax.annotate("", xy=tuple(2.5*e1), xytext=(0, 0), arrowprops=dict(arrowstyle="->", color=NARANJA, lw=1.5))
ax.annotate("", xy=tuple(2.5*e2), xytext=(0, 0), arrowprops=dict(arrowstyle="->", color=NARANJA, lw=1.5))
ax.text(*(2.5*e1 + np.array([0.15, -0.1])), "x'", color=NARANJA, fontsize=13)
ax.text(*(2.5*e2 + np.array([-0.45, 0.05])), "y'", color=NARANJA, fontsize=13)
pts = [((0, 0), "C(0;0)", (-26, 5)),
       (tuple(O(0, 1)), "V(√2/2;√2/2)", (6, -14)), (tuple(O(0, -1)), "V'(-√2/2;-√2/2)", (-6, 8)),
       (tuple(O(np.sqrt(3), 0)), "A(√6/2;-√6/2)", (6, -4)), (tuple(O(-np.sqrt(3), 0)), "A'(-√6/2;√6/2)", (-6, 6)),
       (tuple(O(0, 2)), "F(√2;√2)", (8, -2)), (tuple(O(0, -2)), "F'(-√2;-√2)", (-6, -14))]
for (px, py), lab, off in pts:
    col = PALETA.get(lab[0], "k")
    ax.plot(px, py, "o", color=col, zorder=5)
    ax.annotate(lab, (px, py), textcoords="offset points", xytext=off, color=col, fontsize=10,
                ha="right" if off[0] < 0 else "left", zorder=6)
for sx, sy in [(3, 2), (3, -2), (-3, 2), (-3, -2)]:                          # extremos de LL' (y'=±2, x'=±3)
    p = O(sx, sy); ax.plot(*p, "o", color=VIOLETA, zorder=5)
for sy in (2, -2):
    a_, b_ = O(-3, sy), O(3, sy); ax.plot([a_[0], b_[0]], [a_[1], b_[1]], color=VIOLETA, lw=2)
ax.annotate("L(5√2/2;-√2/2)", tuple(O(3, 2)), textcoords="offset points", xytext=(6, -2), color=VIOLETA, fontsize=10)
ax.annotate("M(-√2/2;5√2/2)", tuple(O(-3, 2)), textcoords="offset points", xytext=(-6, 6), color=VIOLETA, fontsize=10, ha="right")
ax.annotate("L'(√2/2;-5√2/2)", tuple(O(3, -2)), textcoords="offset points", xytext=(6, -6), color=VIOLETA, fontsize=10)
ax.annotate("M'(-5√2/2;√2/2)", tuple(O(-3, -2)), textcoords="offset points", xytext=(-6, 6), color=VIOLETA, fontsize=10, ha="right")
ax.text(0.9, 2.3, "eje focal l: x - y = 0 (eje y')", color=NARANJA, fontsize=10, rotation=45)
ax.text(2.3, -2.3, "eje x': x + y = 0", color=NARANJA, fontsize=10)
ax.text(3.4, -1.5, "asíntota y = (-2+√3)x", color=GRIS, fontsize=10, rotation=-15, va="top")      # pendiente -2+√3 ≈ -0.27
ax.text(-1.75, 3.9, "asíntota y = (-2-√3)x", color=GRIS, fontsize=9.5, rotation=-75, ha="center", va="center")  # pendiente -2-√3 ≈ -3.73
ax.annotate("", O(0.9, 1), O(0.9, -1), arrowprops=dict(arrowstyle="<->", color="k", lw=1))     # 2a = |VV'| = 2
ax.text(*O(0.9, -0.5), "2a = 2", fontsize=10, rotation=45, ha="center", va="center", bbox=dict(fc="white", ec="none", pad=1), zorder=7)
ax.annotate("", O(np.sqrt(3), 0.5), O(-np.sqrt(3), 0.5), arrowprops=dict(arrowstyle="<->", color="k", lw=1))  # 2b = |AA'| = 2√3
ax.text(*O(-1.2, 0.5), "2b = 2√3", fontsize=10, rotation=-45, ha="center", va="center", bbox=dict(fc="white", ec="none", pad=1), zorder=7)
marco(ax, (-6, 7), (-5, 5), "x² + 4xy + y² = 3  →  -x'²/3 + y'² = 1     a=1, b=√3, c=2, e=2")
fig.tight_layout(); guardar(fig, "final-2018-12-04", "ej5-hiperbola-rotada.svg")
print("figuras OK")
