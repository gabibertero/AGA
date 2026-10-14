"""Figuras de los finales 2023-07-26 ... G-08 (U9/U10). Salida: public/figuras/<id>/*.svg
Notación de cátedra (U10 p.15 y p.29): V/V', A/A', F/F', LL' (lado recto), eje focal l. Uso: python3 scripts/figuras_finales_2.py [--png DIR]
(--png guarda además una copia PNG en DIR para revisar las figuras a ojo)."""
import pathlib
import re
import sys
import numpy as np
import sympy as sp
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

matplotlib.rcParams.update({"svg.fonttype": "none", "font.size": 12})
RAIZ = pathlib.Path(__file__).resolve().parent.parent / "public" / "figuras"
PNG = pathlib.Path(sys.argv[sys.argv.index("--png") + 1]) if "--png" in sys.argv else None
AZUL, ROJO, VERDE, NARANJA, VIOLETA, GRIS = "#1f4e9c", "#c0392b", "#2e7d32", "#e67e22", "#8e44ad", "#777777"
PALETA = {"V": ROJO, "A": VERDE, "F": NARANJA, "L": VIOLETA, "M": VIOLETA, "C": "k", "P": "k", "T": "k"}


def guardar(fig, carpeta, nombre):
    d = RAIZ / carpeta
    d.mkdir(parents=True, exist_ok=True)
    fig.savefig(d / nombre, bbox_inches="tight")
    if PNG:
        PNG.mkdir(parents=True, exist_ok=True)
        fig.savefig(PNG / f"{carpeta}__{nombre.replace('.svg', '.png')}", bbox_inches="tight", dpi=80)
    plt.close(fig)


def fmt(v):
    """número sympy -> texto corto con √ (p.ej. 3+2√3, 5/2)."""
    s = str(sp.nsimplify(v)).replace(" ", "").replace("*", "")
    return re.sub(r"sqrt\((\d+)\)", r"√\1", s)


def par(px, py):
    return f"({fmt(px)};{fmt(py)})"


def marco(ax, xlim, ylim, titulo):
    ax.axhline(0, color="k", lw=1); ax.axvline(0, color="k", lw=1)
    # de a 1 si entra; si no, de a 3 desde el 0 (en 2024-12-04 caen a=9, b=12, c=15 sobre marcas)
    st = 1 if max(xlim[1] - xlim[0], ylim[1] - ylim[0]) <= 24 else 3
    ax.set_xticks(range(int(xlim[0]) // st * st, int(xlim[1]) + 1, st)); ax.set_yticks(range(int(ylim[0]) // st * st, int(ylim[1]) + 1, st))
    ax.grid(True, color="#dddddd", lw=.5)
    ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.set_aspect("equal")
    ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_title(titulo, fontsize=11)


def rot(ax, txt, xy, off, col, ha="left", va="center", fs=9):
    ax.annotate(txt, xy, textcoords="offset points", xytext=off, color=col, fontsize=fs, ha=ha, va=va, zorder=6,
                bbox=dict(fc="white", ec="none", pad=.6, alpha=.8))


def cota(ax, p0, p1, txt, rotacion=0):
    ax.annotate("", p1, p0, arrowprops=dict(arrowstyle="<->", color="k", lw=1))
    ax.text((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, txt, ha="center", va="center", fontsize=10, rotation=rotacion,
            bbox=dict(fc="white", ec="none", pad=1), zorder=7)


def conica(tipo, cx, cy, a, b, orient, xlim, ylim, titulo, carpeta, nombre, tam=(8.6, 7.4), cotas=False, extra=None, dv=None, ov=None):
    """Elipse/hipérbola de ejes paralelos a los coordenados. a = semieje sobre el eje focal (mayor en la elipse, transverso en la
    hipérbola), b = el otro. orient 'h' (eje focal horizontal) o 'v'. Dibuja TODOS los elementos: C, V/V', A/A', F/F', LL', eje focal."""
    a, b, cx, cy = sp.nsimplify(a), sp.nsimplify(b), sp.nsimplify(cx), sp.nsimplify(cy)
    c = sp.sqrt(a**2 - b**2) if tipo == "e" else sp.sqrt(a**2 + b**2)
    lr = b**2 / a                                            # semilado recto
    fa, fb, fc, flr = float(a), float(b), float(c), float(lr)
    X, Y = float(cx), float(cy)
    P = (lambda u, v: (X + u, Y + v)) if orient == "h" else (lambda u, v: (X + v, Y + u))   # (u sobre eje focal, v transversal)
    fig, ax = plt.subplots(figsize=tam)
    if tipo == "e":
        th = np.linspace(0, 2*np.pi, 600)
        pts = np.array([P(fa*np.cos(q), fb*np.sin(q)) for q in th]); ax.plot(pts[:, 0], pts[:, 1], color=AZUL, lw=2)
    else:
        u = np.linspace(-1.9, 1.9, 500)
        for sg in (1, -1):
            pts = np.array([P(sg*fa*np.cosh(q), fb*np.sinh(q)) for q in u]); ax.plot(pts[:, 0], pts[:, 1], color=AZUL, lw=2)
        L = 40
        for sg in (1, -1):                                   # asíntotas y rectángulo auxiliar
            q = np.array([P(-L*fa, -sg*L*fb), P(L*fa, sg*L*fb)]); ax.plot(q[:, 0], q[:, 1], color=GRIS, ls="-.", lw=1)
        rect = np.array([P(-fa, -fb), P(fa, -fb), P(fa, fb), P(-fa, fb), P(-fa, -fb)]); ax.plot(rect[:, 0], rect[:, 1], color="#bbbbbb", ls=":", lw=1)
    big = 60
    e1 = np.array([P(-big, 0), P(big, 0)]); e2 = np.array([P(0, -big), P(0, big)])
    ax.plot(e1[:, 0], e1[:, 1], color=GRIS, ls="--", lw=1); ax.plot(e2[:, 0], e2[:, 1], color=GRIS, ls="--", lw=1)
    for sg in (1, -1):                                       # lados rectos por F y F'
        q = np.array([P(sg*fc, -flr), P(sg*fc, flr)]); ax.plot(q[:, 0], q[:, 1], color=VIOLETA, lw=2)

    def pto(u, v, lab, col):
        px, py = P(u, v); ax.plot(px, py, "o", color=col, zorder=5); return px, py
    # rótulos: V/V' y F/F' a lados opuestos del eje focal, A/A' hacia afuera, L/M hacia afuera
    pc = pto(0, 0, "C", "k")
    rot(ax, f"C{par(cx, cy)}", pc, (-6, -12) if orient == "h" else (-6, 7), "k", ha="right")
    for sg, n in ((1, ""), (-1, "'")):
        ou = sg * a
        px, py = pto(float(ou), 0, "V", ROJO)
        o = (ov or {}).get("V" + n)
        rot(ax, f"V{n}{par(*[sp.nsimplify(q) for q in P(ou, 0)])}", (px, py), o[:2] if o else ((0, 9) if orient == "h" else (8, 0)), ROJO,
            ha=o[2] if o else ("center" if orient == "h" else "left"), va=o[3] if o else ("bottom" if orient == "h" else "center"))
        px, py = pto(0, float(sg*b), "A", VERDE)
        rot(ax, f"A{n}{par(*[sp.nsimplify(q) for q in P(0, sg*b)])}", (px, py), (8, 0) if orient == "h" else (0, 9), VERDE,
            ha="left" if orient == "h" else "center", va="center" if orient == "h" else "bottom")
        px, py = pto(float(sg*c), 0, "F", NARANJA)
        o = (ov or {}).get("F" + n)
        rot(ax, f"F{n}{par(*[sp.nsimplify(q) for q in P(sg*c, 0)])}", (px, py), o[:2] if o else ((6, -12) if orient == "h" else (6, -5)), NARANJA,
            ha=o[2] if o else "left", va=o[3] if o else "top")
    nombres = {(1, 1): "L", (1, -1): "L'", (-1, 1): "M", (-1, -1): "M'"}
    for (su, sv), n in nombres.items():
        px, py = pto(float(su*c), float(sv*lr), n, VIOLETA)
        rot(ax, f"{n}{par(*[sp.nsimplify(q) for q in P(su*c, sv*lr)])}", (px, py), (7 * su, 5 * sv) if orient == "h" else (7 * sv, 5 * su), VIOLETA,
            ha="left" if (su if orient == "h" else sv) > 0 else "right", va="bottom" if sv * (1 if orient == "h" else 0) >= 0 and orient == "h" and sv > 0 else "center")
    if cotas:
        o = 0.35
        if orient == "h":
            cota(ax, (X - fa, Y - fb - o), (X + fa, Y - fb - o), f"2a = {fmt(2*a)}")
            cota(ax, (X - fb - o, Y - fb), (X - fb - o, Y + fb), f"2b = {fmt(2*b)}", 90) if tipo == "e" else None
        else:
            cota(ax, (X - fb - o, Y - fa), (X - fb - o, Y + fa), f"2a = {fmt(2*a)}", 90)
    if orient == "h":
        ax.text(xlim[1] - .3, Y + .15, "eje focal l", color=GRIS, fontsize=9, ha="right", va="bottom")
        ax.text(X + .15, ylim[1] - .3, "eje no focal", color=GRIS, fontsize=9, ha="left", va="top", rotation=90)
    else:
        ax.text(X - .15, ylim[1] - .3, "eje focal l", color=GRIS, fontsize=9, ha="right", va="top", rotation=90)
        ax.text(xlim[1] - .3, Y + .15, "eje no focal", color=GRIS, fontsize=9, ha="right", va="bottom")
    if extra:
        extra(ax, P)
    marco(ax, xlim, ylim, titulo)
    fig.tight_layout(); guardar(fig, carpeta, nombre)


# ---------------------------------------------------------------- F-2023-07-26 ej.4: elipse vertical
conica("e", 1, -1, 5, 3, "v", (-6, 8), (-8, 6), "(x-1)²/9 + (y+1)²/25 = 1     a=5, b=3, c=4, e=4/5", "final-2023-07-26", "ej4-elipse.svg", (7.4, 8.6))
# ---------------------------------------------------------------- F-2024-07-24 ej.4: hipérbola vertical
conica("h", 3, 1, sp.Rational(3, 2), sp.Rational(3, 2)*sp.sqrt(3), "v", (-5, 11), (-6, 8), "(y-1)²/(9/4) - (x-3)²/(27/4) = 1     a=3/2, b=3√3/2, c=3, e=2",
       "final-2024-07-24", "ej4-hiperbola.svg", (9.2, 8.2))
# ---------------------------------------------------------------- F-2024-08 ej.4: elipse horizontal (pasa por el origen)
conica("e", 3, -1, 2*sp.sqrt(3), 2, "h", (-2, 9), (-4, 3), "(x-3)²/12 + (y+1)²/4 = 1     a=2√3, b=2, c=2√2, e=√6/3", "final-2024-08", "ej4-elipse.svg", (9.4, 6.2))
# ---------------------------------------------------------------- F-2024-12-04 ej.4: hipérbola horizontal
conica("h", 0, 0, 9, 12, "h", (-22, 22), (-20, 20), "x²/81 - y²/144 = 1     a=9, b=12, c=15, e=5/3", "final-2024-12-04", "ej4-hiperbola.svg", (9.4, 8.6))
# ---------------------------------------------------------------- F-SF-CBA-FINAL ej.2: elipse vertical
conica("e", 2, -4, 3, 1, "v", (-2, 6), (-8, 0), "(x-2)² + (y+4)²/9 = 1     a=3, b=1, c=2√2, e=2√2/3", "final-sf-cba-final", "ej2-elipse.svg", (7.6, 7.8), ov={"V": (8, 6, "left", "bottom"), "V'": (8, -8, "left", "top"), "F": (-8, -12, "right", "top"), "F'": (-8, -12, "right", "top")})
# ---------------------------------------------------------------- F-SF-CBA-PRAC ej.4: elipse vertical
conica("e", sp.Rational(-3, 2), sp.Rational(1, 2), 2*sp.sqrt(2), 2, "v", (-6, 3), (-3, 4), "(x+3/2)²/4 + (y-1/2)²/8 = 1     a=2√2, b=2, c=2, e=√2/2",
       "final-sf-cba-prac", "ej4-elipse.svg", (7.8, 7.0))
# ---------------------------------------------------------------- F-SF-QUIM ej.3: hipérbola horizontal
conica("h", -2, -1, sp.Rational(3, 2), 3*sp.sqrt(2)/2, "h", (-9, 5), (-6, 4), "(x+2)²/(9/4) - (y+1)²/(9/2) = 1     a=3/2, b=3√2/2, c=3√3/2, e=√3",
       "final-sf-quim", "ej3-hiperbola.svg", (9.6, 6.8))

# ---------------------------------------------------------------- F-2024-07-24 ej.3: rectas en R²
fig, ax = plt.subplots(figsize=(7.4, 7.0))
xs = np.array([-9, 6])
ax.plot(xs, (6 - 2*xs)/3, color=AZUL, lw=2); ax.plot(xs, 1 - xs, color=VERDE, lw=2); ax.plot(xs, xs + 7, color=ROJO, lw=2)
rot(ax, "r1: 2x+3y-6=0", (5, -4/3), (0, 8), AZUL, ha="right"); rot(ax, "r2: x+y-1=0", (-5, 6), (6, 0), VERDE)
rot(ax, "r3: x-y+7=0 (pendiente 1)", (-8, -1), (0, 8), ROJO, ha="left")
ax.plot(-3, 4, "o", color="k", zorder=5); rot(ax, "P(-3;4) = r1 ∩ r2", (-3, 4), (8, 6), "k")
ax.plot([-3, 0, 3, 0], [4, 7, 0, 2], "o", color=GRIS, ms=3)
marco(ax, (-9, 6), (-4, 9), "Rectas r1, r2 y la pedida r3 (pasa por P con pendiente 1)")
fig.tight_layout(); guardar(fig, "final-2024-07-24", "ej3-rectas.svg")

# ---------------------------------------------------------------- R-01 ej.4: circunferencia
fig, ax = plt.subplots(figsize=(7.4, 7.2))
th = np.linspace(0, 2*np.pi, 500); r17 = np.sqrt(17)
ax.plot(-1 + r17*np.cos(th), 2 + r17*np.sin(th), color=AZUL, lw=2)
for px, py, lab, off, col in [(0, 6, "P1(0;6)", (6, 5), "k"), (3, 1, "P2(3;1)", (6, -12), "k"), (-2, 6, "P3(-2;6)", (-6, 6), "k"),
                              (-1, 2, "C(-1;2)", (-8, -14), "k")]:
    ax.plot(px, py, "o", color=col, zorder=5); rot(ax, lab, (px, py), off, col, ha="right" if off[0] < 0 else "left")
ax.plot([-1, -1 + r17], [2, 2], color=ROJO, lw=1.5); rot(ax, "r = √17", (-1 + r17/2, 2), (0, 6), ROJO, ha="center", fs=10)
marco(ax, (-7, 6), (-4, 8), "(x+1)² + (y-2)² = 17     C(-1;2), r=√17")
fig.tight_layout(); guardar(fig, "final-relatos", "r01-ej4-circunferencia.svg")


# ---------------------------------------------------------------- parábolas
def parabola(ax, vx, vy, p, orient, rng, col=AZUL):
    s = np.linspace(-rng, rng, 400)
    if orient == "x":   # (y-vy)^2 = 4p (x-vx)
        ax.plot(vx + s**2/(4*p), vy + s, color=col, lw=2)
    else:               # (x-vx)^2 = 4p (y-vy)
        ax.plot(vx + s, vy + s**2/(4*p), color=col, lw=2)


# R-03 ej.4: y² = 9x ; V(0;0), p = 9/4, F(9/4;0), directriz x=-9/4, P(4;6), radio vector = 25/4
fig, ax = plt.subplots(figsize=(8.8, 7.0))
p = 9/4
parabola(ax, 0, 0, p, "x", 7.4)
ax.plot([-p, -p], [-8, 8], color=GRIS, ls="--", lw=1.2); rot(ax, "directriz x = -9/4", (-p, -7.2), (6, 0), GRIS)
ax.plot([-3, 12], [0, 0], color=GRIS, ls="--", lw=1)
rot(ax, "eje focal l: y = 0", (11, 0), (0, 8), GRIS, ha="right")
ax.plot([p, p], [-4.5, 4.5], color=VIOLETA, lw=2); rot(ax, "LL' = 4p = 9", (p, -2.2), (8, 0), VIOLETA)
for px, py, lab, off, col in [(0, 0, "V(0;0)", (-6, 8), ROJO), (p, 0, "F(9/4;0)", (-4, -14), NARANJA), (p, 4.5, "L(9/4;9/2)", (6, 3), VIOLETA),
                              (p, -4.5, "L'(9/4;-9/2)", (6, -12), VIOLETA), (4, 6, "P(4;6)", (6, 3), "k")]:
    ax.plot(px, py, "o", color=col, zorder=5); rot(ax, lab, (px, py), off, col, ha="right" if off[0] < 0 else "left")
ax.plot([p, 4], [0, 6], color=ROJO, lw=1.8); rot(ax, "radio vector 25/4", (3.1, 3), (8, -6), ROJO, ha="left", fs=10)
ax.plot([4, -p], [6, 6], color=GRIS, lw=1.2, ls=":"); rot(ax, "d(P, directriz) = 25/4", (0.8, 6), (0, 7), GRIS, ha="center", fs=9)
marco(ax, (-4, 12), (-8, 8), "y² = 9x     V(0;0), 4p = 9, p = 9/4, e = 1")
fig.tight_layout(); guardar(fig, "final-relatos", "r03-ej4-parabola.svg")

# R-04 ej.1 (ejemplo propio): F(1;2), directriz y=-2 -> V(1;0), p=2, (x-1)² = 8y
fig, ax = plt.subplots(figsize=(8.0, 7.0))
parabola(ax, 1, 0, 2, "y", 6)
ax.plot([-6, 8], [-2, -2], color=GRIS, ls="--", lw=1.2); rot(ax, "directriz y = -2", (7.8, -2), (0, 8), GRIS, ha="right")
ax.plot([1, 1], [-3, 8], color=GRIS, ls="--", lw=1); rot(ax, "eje focal l: x = 1", (1, 7.4), (6, 0), GRIS)
ax.plot([-3, 5], [2, 2], color=VIOLETA, lw=2); rot(ax, "LL' = 4p = 8", (-1.5, 2), (0, -12), VIOLETA, ha="center")
for px, py, lab, off, col in [(1, 0, "V(1;0)", (6, -12), ROJO), (1, 2, "F(1;2)", (6, 6), NARANJA), (5, 2, "L(5;2)", (6, 5), VIOLETA),
                              (-3, 2, "L'(-3;2)", (-6, 5), VIOLETA)]:
    ax.plot(px, py, "o", color=col, zorder=5); rot(ax, lab, (px, py), off, col, ha="right" if off[0] < 0 else "left")
marco(ax, (-7, 9), (-4, 8), "Ejemplo propio: (x-1)² = 8y     V(1;0), F(1;2), directriz y=-2, p=2")
fig.tight_layout(); guardar(fig, "final-relatos", "r04-ej1-parabola.svg")


# ---------------------------------------------------------------- 3D (esquemas)
def ejes3d(ax, xl, yl, zl, tit):
    ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_zlabel("z")
    ax.set_xlim(*xl); ax.set_ylim(*yl); ax.set_zlim(*zl)
    ax.set_xticks(range(int(xl[0]), int(xl[1]) + 1, 2)); ax.set_yticks(range(int(yl[0]), int(yl[1]) + 1, 2)); ax.set_zticks(range(int(zl[0]), int(zl[1]) + 1, 2))
    ax.set_title(tit, fontsize=11)


# F-2023-07-26 ej.3: planos π1, π2 y la recta por T paralela a los dos
fig = plt.figure(figsize=(8.4, 7.4)); ax = fig.add_subplot(projection="3d")
gx, gy = np.meshgrid(np.linspace(-3, 5, 14), np.linspace(-4, 4, 14))
z1 = (gx + 2*gy + 8)/3; z2 = 7 - 2*gx + gy; z2[np.abs(z2) > 8] = np.nan
ax.plot_surface(gx, gy, z1, color=AZUL, alpha=.30, linewidth=0)
ax.plot_surface(gx, gy, z2, color=VERDE, alpha=.30, linewidth=0)
tt = np.linspace(-.55, .55, 50)
ax.plot(1 + tt, -1 + 7*tt, -2 + 5*tt, color=ROJO, lw=2.5)
ax.plot([1], [-1], [-2], "o", color="k"); ax.text(1.2, -1, -3.2, "T", fontsize=11)
ax.text2D(.02, .93, "π1: x+2y-3z+8=0 (azul)", color=AZUL, fontsize=10, transform=ax.transAxes)
ax.text2D(.02, .89, "π2: 2x-y+z-7=0 (verde)", color="#1b5e20", fontsize=10, transform=ax.transAxes)
ax.text2D(.02, .85, "recta: T(1;-1;-2) + t(1;7;5) (roja)", color=ROJO, fontsize=10, transform=ax.transAxes)
ejes3d(ax, (-3, 5), (-4, 4), (-8, 8), "Recta por T paralela a π1 y a π2 (esquema)")
ax.view_init(22, -62); guardar(fig, "final-2023-07-26", "ej3-recta.svg")

# G-03 b: plano x+y+z=-2 y la recta (-1;-1;0)+λ(1;0;-1)
fig = plt.figure(figsize=(8.4, 7.4)); ax = fig.add_subplot(projection="3d")
gx, gy = np.meshgrid(np.linspace(-4, 3, 14), np.linspace(-4, 3, 14))
ax.plot_surface(gx, gy, -2 - gx - gy, color=AZUL, alpha=.30, linewidth=0)
ax.plot_surface(gx, gy, np.zeros_like(gx), color=GRIS, alpha=.12, linewidth=0)
tt = np.linspace(-2.2, 2.2, 50)
ax.plot(-1 + tt, -1 + 0*tt, 0 - tt, color=ROJO, lw=2.5)
ax.plot([-1], [-1], [0], "o", color="k"); ax.text(-0.8, -1, 0.5, "P(-1;-1;0)", fontsize=10)
ax.text2D(.02, .93, "π: x+y+z=-2 (azul)", color=AZUL, fontsize=10, transform=ax.transAxes)
ax.text2D(.02, .89, "z = 0 (gris)", color=GRIS, fontsize=10, transform=ax.transAxes)
ax.text2D(.02, .85, "r: (-1;-1;0)+λ(1;0;-1) (roja)", color=ROJO, fontsize=10, transform=ax.transAxes)
ejes3d(ax, (-4, 3), (-4, 3), (-6, 3), "Plano π y una recta de π que corta z=0 solo en P (esquema)")
ax.view_init(24, -58); guardar(fig, "final-sueltos", "g03b-plano.svg")

# G-08 b: y = 4(z-1)² - 1 (cilindro parabólico de generatrices paralelas a x)
fig = plt.figure(figsize=(8.4, 7.4)); ax = fig.add_subplot(projection="3d")
gx, gz = np.meshgrid(np.linspace(-3, 3, 14), np.linspace(-0.6, 2.6, 30))
ax.plot_surface(gx, 4*(gz - 1)**2 - 1, gz, color=AZUL, alpha=.40, linewidth=0)
zz = np.linspace(-0.6, 2.6, 80)
ax.plot(0*zz, 4*(zz - 1)**2 - 1, zz, color=ROJO, lw=2.5)
ax.plot([0], [-1], [1], "o", color="k"); ax.text(0.1, -1.8, 1.0, "V(0;-1;1)", fontsize=10)
ax.text2D(.02, .92, "traza en x=0 (roja): y = 4(z-1)² - 1", color=ROJO, fontsize=10, transform=ax.transAxes)
ejes3d(ax, (-3, 3), (-2, 10), (-1, 3), "y = 4(z-1)² - 1: cilindro parabólico (generatrices ∥ eje x)")
ax.view_init(20, -52); guardar(fig, "final-sueltos", "g08b-cilindro.svg")
print("figuras OK")
