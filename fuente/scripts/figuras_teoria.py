"""Figuras del preguntero/machetes (U8-U10). Uso: python3 scripts/figuras_teoria.py -> public/figuras/teoria/*.svg"""
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

plt.rcParams.update({'svg.fonttype': 'path', 'font.size': 12, 'axes.labelsize': 12, 'axes.titlepad': 14, 'figure.facecolor': 'white',
                     'axes.facecolor': 'white', 'savefig.facecolor': 'white', 'mathtext.default': 'it'})
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'figuras', 'teoria')
os.makedirs(OUT, exist_ok=True)
AZ, RO, VE, NA, GR = '#1d4ed8', '#b91c1c', '#0f6b45', '#c2410c', '#6b7280'


def guardar(fig, nombre):
    fig.savefig(os.path.join(OUT, nombre + '.svg'), format='svg', bbox_inches='tight')
    plt.close(fig)


def flecha(ax, p, q, c, lw=2, txt=None, off=(0.05, 0.05), **kw):
    ax.annotate('', xy=q, xytext=p, arrowprops=dict(arrowstyle='-|>', color=c, lw=lw, shrinkA=0, shrinkB=0))
    if txt:
        ax.text((p[0] + q[0]) / 2 + off[0], (p[1] + q[1]) / 2 + off[1], txt, color=c, fontsize=13, **kw)


def lim2(ax, x, y):
    ax.set_xlim(*x); ax.set_ylim(*y); ax.set_aspect('equal'); ax.grid(alpha=.25)
    ax.set_xlabel('x'); ax.set_ylabel('y')


# ---------- U8 ----------
def escalar_proy():
    fig, ax = plt.subplots(figsize=(6, 3.4))
    a, b = np.array([3., 2.2]), np.array([4.5, 0.])
    w1 = (a @ b) / (b @ b) * b
    flecha(ax, (0, 0), b, VE, txt=r'$\bar b$', off=(0.9, -0.45))
    flecha(ax, (0, 0), a, AZ, txt=r'$\bar a$', off=(-0.5, 0.15))
    flecha(ax, (0, 0), w1, NA, lw=3, txt=r'$\bar w_1$', off=(-0.2, -0.5))
    flecha(ax, w1, a, RO, txt=r'$\bar w_2\perp\bar b$', off=(0.1, -0.1))
    ax.plot(*zip(w1, a), '--', color=GR, lw=1)
    ax.add_patch(plt.Polygon([[w1[0] - .2, 0], [w1[0] - .2, .2], [w1[0], .2]], fill=False, ec=GR, lw=1))
    t = np.linspace(0, np.arctan2(a[1], a[0]), 30)
    ax.plot(0.8 * np.cos(t), 0.8 * np.sin(t), color=GR)
    ax.text(0.9, 0.25, r'$\theta$', fontsize=13)
    ax.set_title(r'$\bar a=\bar w_1+\bar w_2$,  $\bar w_1=\dfrac{\bar a\cdot\bar b}{|\bar b|^2}\,\bar b$', fontsize=13)
    lim2(ax, (-0.5, 5), (-0.8, 3)); ax.set_xlabel(''); ax.set_ylabel('')
    guardar(fig, 'escalar-proyeccion')


def cubo(ax, o, a, b, c, alpha=.12):
    v = [o, o + a, o + a + b, o + b, o + c, o + a + c, o + a + b + c, o + b + c]
    caras = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [1, 2, 6, 5], [0, 3, 7, 4]]
    ax.add_collection3d(Poly3DCollection([[v[i] for i in f] for f in caras], facecolor=AZ, edgecolor=GR, alpha=alpha, lw=.8))


def flecha3(ax, p, q, c, txt=None, lw=2.2, d=(0, 0, 0)):
    ax.quiver(*p, *(q - p), color=c, lw=lw, arrow_length_ratio=.12)
    if txt:
        m = (p + q) / 2 + np.array(d)
        ax.text(*m, txt, color=c, fontsize=13)


def ejes3(ax, v=(22, -58)):
    ax.view_init(*v)
    ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')


def vectorial():
    fig = plt.figure(figsize=(6, 4.4)); ax = fig.add_subplot(111, projection='3d')
    o = np.zeros(3); a = np.array([3., 0, 0]); b = np.array([1., 2.5, 0]); c = np.cross(a, b); c = c / np.linalg.norm(c) * 3
    ax.add_collection3d(Poly3DCollection([[o, a, a + b, b]], facecolor=AZ, edgecolor=AZ, alpha=.25))
    flecha3(ax, o, a, AZ, r'$\bar a$', d=(0, -.3, 0)); flecha3(ax, o, b, VE, r'$\bar b$', d=(-.3, 0, 0))
    flecha3(ax, o, c, RO, r'$\bar c=\bar a\times\bar b$', d=(.1, 0, 0))
    ax.text(1.8, 1.0, 0, 'Área', fontsize=12)
    ax.set_xlim(0, 4); ax.set_ylim(0, 3); ax.set_zlim(0, 3.2); ejes3(ax, (20, -62))
    ax.set_title(r'$|\bar a\times\bar b|=|\bar a||\bar b|\,\mathrm{sen}\,\theta$ = área del paralelogramo', fontsize=12)
    guardar(fig, 'vectorial')


def mixto():
    fig = plt.figure(figsize=(6, 4.6)); ax = fig.add_subplot(111, projection='3d')
    o = np.zeros(3); a = np.array([3., 0, 0]); b = np.array([.8, 2.4, 0]); c = np.array([.6, .8, 2.2])
    cubo(ax, o, a, b, c)
    flecha3(ax, o, a, AZ, r'$\bar a$', d=(0, -.3, 0)); flecha3(ax, o, b, VE, r'$\bar b$', d=(-.3, 0, 0)); flecha3(ax, o, c, NA, r'$\bar c$', d=(0, 0, .1))
    n = np.cross(a, b); n = n / np.linalg.norm(n) * 2.6
    flecha3(ax, o, n, RO, r'$\bar a\times\bar b$', d=(.1, 0, 0))
    ax.plot([c[0]] * 2, [c[1]] * 2, [0, c[2]], '--', color=GR)
    ax.text(c[0] + .1, c[1], c[2] / 2, 'h', fontsize=13)
    ax.set_xlim(0, 4.5); ax.set_ylim(0, 3.5); ax.set_zlim(0, 3); ejes3(ax, (22, -60))
    ax.set_title(r'$(\bar a\times\bar b)\cdot\bar c$ = volumen del paralelepípedo', fontsize=12)
    guardar(fig, 'mixto')


# ---------- U9 ----------
def recta_r2():
    fig, ax = plt.subplots(figsize=(6, 3.8))
    P1, a = np.array([1., 1.]), np.array([2., 1.])
    x = np.linspace(-1.5, 6, 2); ax.plot(P1[0] + (x - P1[0]), P1[1] + (x - P1[0]) * a[1] / a[0], color=GR, lw=1.5)
    flecha(ax, (0, 0), P1, GR, lw=1.2); P = P1 + 1.5 * a
    flecha(ax, P1, P1 + a, AZ, lw=2.5, txt=r'$\bar a$', off=(0.0, -0.45))
    flecha(ax, P1, P, RO, lw=1.2, txt=r'$\lambda\bar a$', off=(0.3, 0.1))
    ax.plot(*P1, 'o', color='k'); ax.plot(*P, 'o', color='k')
    ax.text(P1[0] - .6, P1[1] + .15, r'$P_1$', fontsize=13); ax.text(P[0] + .1, P[1] - .5, r'$P(x;y)$', fontsize=13)
    ax.text(.1, .35, r'$\overrightarrow{OP_1}$', fontsize=11)
    ax.set_title(r'$\overrightarrow{OP}=\overrightarrow{OP_1}+\lambda\,\bar a$   ($\overrightarrow{P_1P}\parallel\bar a$)', fontsize=13)
    lim2(ax, (-1, 6.2), (-.5, 4.5)); guardar(fig, 'recta-r2')


def plano_normal():
    fig = plt.figure(figsize=(6, 4.6)); ax = fig.add_subplot(111, projection='3d')
    P1 = np.array([1., 1., 1.]); n = np.array([1., 1., 2.]); n = n / np.linalg.norm(n) * 2
    u = np.array([1., -1., 0.]); u = u / np.linalg.norm(u); v = np.cross(n, u); v = v / np.linalg.norm(v)
    s = 2.2
    pts = [P1 + s * (i * u + j * v) for i, j in [(-1, -1), (1, -1), (1, 1), (-1, 1)]]
    ax.add_collection3d(Poly3DCollection([pts], facecolor=AZ, edgecolor=AZ, alpha=.18))
    P = P1 + 1.2 * u + .8 * v
    flecha3(ax, P1, P1 + n, RO, r'$\bar n(A;B;C)$', d=(.1, 0, 0))
    ax.plot(*zip(P1, P), color=GR, lw=2); ax.plot(*P1, 'ko'); ax.plot(*P, 'ko')
    ax.text(*(P1 + [-.3, -.2, -.3]), r'$P_1$', fontsize=13); ax.text(*(P + [.1, .1, .1]), r'$P(x;y;z)$', fontsize=13)
    ax.text(*((P1 + P) / 2 + [.1, 0, -.4]), r'$\overrightarrow{P_1P}$', fontsize=12, color=GR)
    ax.set_xlim(-1, 4); ax.set_ylim(-1, 4); ax.set_zlim(-1, 4); ejes3(ax, (20, -55))
    ax.set_title(r'$\bar n\cdot\overrightarrow{P_1P}=0$', fontsize=13)
    guardar(fig, 'plano-normal')


def plano_param():
    fig = plt.figure(figsize=(6, 4.6)); ax = fig.add_subplot(111, projection='3d')
    P1 = np.array([0.5, 0.5, 0.5]); u = np.array([2., .3, 0.]); v = np.array([.2, 2., .5])
    pts = [P1 + i * u + j * v for i, j in [(-.3, -.3), (1.3, -.3), (1.3, 1.3), (-.3, 1.3)]]
    ax.add_collection3d(Poly3DCollection([pts], facecolor=AZ, edgecolor=AZ, alpha=.18))
    P = P1 + .9 * u + .7 * v
    flecha3(ax, P1, P1 + u, VE, r'$\bar u$', d=(0, -.3, 0)); flecha3(ax, P1, P1 + v, NA, r'$\bar v$', d=(-.3, 0, 0))
    ax.plot(*zip(P1, P), color=RO, lw=2); ax.plot(*P1, 'ko'); ax.plot(*P, 'ko')
    O = np.zeros(3); ax.plot(*zip(O, P1), '--', color=GR)
    ax.text(*(P1 + [-.4, 0, .2]), r'$P_1$', fontsize=13); ax.text(*(P + [.1, .1, .1]), r'$P$', fontsize=13)
    ax.set_xlim(0, 3); ax.set_ylim(0, 3); ax.set_zlim(0, 2); ejes3(ax, (22, -62))
    ax.set_title(r'$\overrightarrow{OP}=\overrightarrow{OP_1}+\alpha\,\bar v+\beta\,\bar u$', fontsize=13)
    guardar(fig, 'plano-param')


def alabeadas():
    fig = plt.figure(figsize=(6, 4.6)); ax = fig.add_subplot(111, projection='3d')
    a1, a2 = np.array([1., 0, 0]), np.array([0., 1, 0])
    P1, P2 = np.array([0., 0, 0]), np.array([0., 0, 2.])
    t = np.array([-2, 2.])
    for P, a, c, nm in [(P1, a1, AZ, r'$r_1$'), (P2, a2, VE, r'$r_2$')]:
        ax.plot(*(P[:, None] + a[:, None] * t), color=c, lw=2); ax.text(*(P + a * 2.1), nm, color=c, fontsize=13)
    for z, c in [(0, AZ), (2, VE)]:
        ax.add_collection3d(Poly3DCollection([[(-2, -2, z), (2, -2, z), (2, 2, z), (-2, 2, z)]], facecolor=c, alpha=.08, edgecolor='none'))
    flecha3(ax, P1, P2, RO, r'$d$', d=(.1, 0, 0))
    ax.text(0.1, 0.1, -.4, r'$P_1$', fontsize=12); ax.text(.1, .1, 2.2, r'$P_2$', fontsize=12)
    ax.text(.1, -.6, 1, r'$\bar n=\bar a_1\times\bar a_2$', fontsize=12, color=RO)
    ax.set_xlim(-2, 2); ax.set_ylim(-2, 2); ax.set_zlim(-.5, 2.5); ejes3(ax, (18, -50))
    ax.set_title(r'$d=\dfrac{|\overrightarrow{P_1P_2}\cdot(\bar a_1\times\bar a_2)|}{|\bar a_1\times\bar a_2|}$', fontsize=13)
    guardar(fig, 'alabeadas')


# ---------- U10 ----------
def secciones():
    fig, axs = plt.subplots(1, 4, figsize=(9.5, 2.9))
    t = np.linspace(0, 2 * np.pi, 200)
    axs[0].plot(np.cos(t), np.sin(t), color=AZ, lw=2); axs[0].set_title('Circunferencia\nplano perp. al eje', fontsize=11)
    axs[1].plot(1.4 * np.cos(t), np.sin(t), color=AZ, lw=2); axs[1].set_title('Elipse\nplano inclinado', fontsize=11)
    x = np.linspace(-1.5, 1.5, 100); axs[2].plot(x, x ** 2, color=AZ, lw=2); axs[2].set_title('Parábola\nplano ∥ generatriz', fontsize=11)
    u = np.linspace(-1.3, 1.3, 100)
    for s in (1, -1): axs[3].plot(s * np.cosh(u), np.sinh(u), color=AZ, lw=2)
    axs[3].set_title('Hipérbola\nplano ∥ eje', fontsize=11)
    for ax in axs: ax.set_aspect('equal'); ax.axis('off')
    guardar(fig, 'secciones-conicas')


def _marca(ax, p, txt, dx=.08, dy=.1, c='k'):
    ax.plot(*p, 'o', color=c, ms=5); ax.text(p[0] + dx, p[1] + dy, txt, fontsize=12, color=c)


def elipse():
    a, b = 5., 3.; c = 4.
    fig, ax = plt.subplots(figsize=(6.2, 4))
    t = np.linspace(0, 2 * np.pi, 300); ax.plot(a * np.cos(t), b * np.sin(t), color=AZ, lw=2)
    ax.axhline(0, color=GR, lw=1); ax.axvline(0, color=GR, lw=1)
    for p, n, dx, dy in [((a, 0), "V", .15, .15), ((-a, 0), "V'", -.6, .15), ((0, b), "A", .12, .1), ((0, -b), "A'", .12, -.4)]:
        _marca(ax, p, n, dx, dy)
    _marca(ax, (c, 0), 'F', -.1, -.5, RO); _marca(ax, (-c, 0), "F'", -.2, -.5, RO)
    for xx in (c, -c):
        ax.plot([xx, xx], [-b ** 2 / a, b ** 2 / a], color=VE, lw=2)
    ax.text(c + .15, b ** 2 / a + .12, 'L', color=VE, fontsize=12); ax.text(c + .15, -b ** 2 / a - .5, "L'", color=VE, fontsize=12)
    P = (a * np.cos(1), b * np.sin(1)); ax.plot(*P, 'ko', ms=4); ax.text(P[0] + .1, P[1] + .1, 'P', fontsize=12)
    ax.plot([c, P[0]], [0, P[1]], color=GR, lw=1, ls='--'); ax.plot([-c, P[0]], [0, P[1]], color=GR, lw=1, ls='--')
    ax.text(-a + .1, -.5, r'$\ell$: eje focal', fontsize=11, color=GR); ax.text(.1, -.5, 'C', fontsize=12)
    ax.set_title(r'$\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$,  $a^2=b^2+c^2$,  $PF+PF^\prime=2a$,  $LL^\prime=\dfrac{2b^2}{a}$', fontsize=11)
    lim2(ax, (-6.2, 6.2), (-4, 4)); guardar(fig, 'elipse')


def hiperbola():
    a, b = 2., 3.; c = np.hypot(a, b)
    fig, ax = plt.subplots(figsize=(6.2, 4.2))
    u = np.linspace(-1.4, 1.4, 200)
    for s in (1, -1): ax.plot(s * a * np.cosh(u), b * np.sinh(u), color=AZ, lw=2)
    x = np.linspace(-5, 5, 2)
    for s in (1, -1): ax.plot(x, s * b / a * x, '--', color=NA, lw=1.3)
    ax.text(3.2, 4.6, r'$y=\frac{b}{a}x$', color=NA, fontsize=12); ax.text(3.2, -5.2, r'$y=-\frac{b}{a}x$', color=NA, fontsize=12)
    ax.axhline(0, color=GR, lw=1); ax.axvline(0, color=GR, lw=1)
    _marca(ax, (a, 0), 'V', .1, .15); _marca(ax, (-a, 0), "V'", -.55, .15)
    _marca(ax, (0, b), 'A', .12, .1, VE); _marca(ax, (0, -b), "A'", .12, -.4, VE)
    _marca(ax, (c, 0), 'F', .1, -.5, RO); _marca(ax, (-c, 0), "F'", -.5, -.5, RO)
    for xx in (c, -c): ax.plot([xx, xx], [-b ** 2 / a, b ** 2 / a], color=VE, lw=2)
    ax.text(c + .1, b ** 2 / a - .4, 'L', color=VE, fontsize=12)
    ax.set_title(r'$\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$,  $c^2=a^2+b^2$,  $|PF-PF^\prime|=2a$,  $LL^\prime=\dfrac{2b^2}{a}$', fontsize=11)
    lim2(ax, (-6.5, 6.5), (-6, 6)); guardar(fig, 'hiperbola')


def parabola():
    p = 1.
    fig, ax = plt.subplots(figsize=(6.2, 3.8))
    y = np.linspace(-3.2, 3.2, 200); ax.plot(y ** 2 / (4 * p), y, color=AZ, lw=2)
    ax.axvline(-p, color=NA, lw=2); ax.text(-p - .95, 2.6, r'$\ell$: directriz', color=NA, fontsize=11)
    ax.axhline(0, color=GR, lw=1); ax.text(3.3, .15, r'$a$: eje', color=GR, fontsize=11)
    _marca(ax, (0, 0), 'V', .12, -.45); _marca(ax, (p, 0), 'F', .1, -.5, RO); _marca(ax, (-p, 0), 'A', -.5, -.45, VE)
    ax.plot([p, p], [-2 * p, 2 * p], color=VE, lw=2); ax.text(p + .1, 2 * p + .1, 'L', color=VE, fontsize=12); ax.text(p + .1, -2 * p - .5, "L'", color=VE, fontsize=12)
    P = (2.25, 3.0 * 0 + 3.0); P = (9 / 4, 3.); ax.plot(*P, 'ko', ms=4); ax.text(P[0] + .1, P[1] + .1, 'P', fontsize=12)
    ax.plot([P[0], -p], [P[1], P[1]], ':', color=GR); ax.plot([P[0], p], [P[1], 0], ':', color=GR); ax.text(-p + .1, P[1] + .1, 'D', fontsize=12)
    ax.set_title(r'$y^2=4px$,  $PF=DP$,  $LL^\prime=4p$,  $e=1$', fontsize=12)
    lim2(ax, (-3, 5.5), (-3.6, 3.8)); guardar(fig, 'parabola')


def circunferencia():
    fig, ax = plt.subplots(figsize=(5, 3.6)); h, k, r = 2., 1., 2.
    t = np.linspace(0, 2 * np.pi, 200); ax.plot(h + r * np.cos(t), k + r * np.sin(t), color=AZ, lw=2)
    P = (h + r * np.cos(.8), k + r * np.sin(.8)); flecha(ax, (h, k), P, RO, txt='r', off=(-.25, .1))
    _marca(ax, (h, k), 'C(h;k)', .1, -.5); ax.plot(*P, 'ko', ms=4); ax.text(P[0] + .1, P[1], 'P(x;y)', fontsize=12)
    ax.axhline(0, color=GR, lw=1); ax.axvline(0, color=GR, lw=1)
    ax.set_title(r'$(x-h)^2+(y-k)^2=r^2$', fontsize=13); lim2(ax, (-1, 5), (-1.5, 3.8)); guardar(fig, 'circunferencia')


# ---------- cuádricas ----------
def malla(ax, X, Y, Z, c=AZ, n=14):
    ax.plot_wireframe(X, Y, Z, color=c, lw=.6, rstride=max(1, X.shape[0] // n), cstride=max(1, X.shape[1] // n))


def cuadrica(nombre, titulo, f, rango=None, extra=None):
    fig = plt.figure(figsize=(5.6, 4.4)); ax = fig.add_subplot(111, projection='3d')
    f(ax)
    ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z'); ax.set_title(titulo, fontsize=12)
    ax.view_init(22, -58)
    guardar(fig, nombre)


def _ejes(ax, L):
    ax.set_xlim(-L, L); ax.set_ylim(-L, L); ax.set_zlim(-L, L)


def todas_cuadricas():
    u, v = np.meshgrid(np.linspace(0, 2 * np.pi, 41), np.linspace(0, np.pi, 21))
    a, b, c = 3., 2., 1.5
    def esfera(ax):
        malla(ax, 2.5 * np.cos(u) * np.sin(v), 2.5 * np.sin(u) * np.sin(v), 2.5 * np.cos(v), n=20); _ejes(ax, 3)
    cuadrica('cuad-esfera', r'Esfera  $x^2+y^2+z^2=r^2$', esfera)
    def elips(ax):
        malla(ax, a * np.cos(u) * np.sin(v), b * np.sin(u) * np.sin(v), c * np.cos(v), n=20); _ejes(ax, 3)
    cuadrica('cuad-elipsoide', r'Elipsoide  $\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$', elips)
    w = np.linspace(-1.5, 1.5, 21); U, W = np.meshgrid(np.linspace(0, 2 * np.pi, 41), w)
    def h1(ax):
        malla(ax, a * np.cosh(W) * np.cos(U), b * np.cosh(W) * np.sin(U), c * np.sinh(W) * 1.6, n=20); _ejes(ax, 4)
    cuadrica('cuad-hiperboloide1', r'Hiperboloide de 1 hoja  $\frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=1$', h1)
    def h2(ax):
        for s in (1, -1):
            malla(ax, a * np.sinh(W) * np.cos(U), b * np.sinh(W) * np.sin(U), s * c * np.cosh(W) * 1.6, n=20)
        _ejes(ax, 4)
    cuadrica('cuad-hiperboloide2', r'Hiperboloide de 2 hojas  $\frac{z^2}{c^2}-\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$', h2)
    X, Y = np.meshgrid(np.linspace(-2, 2, 25), np.linspace(-2, 2, 25))
    def pe(ax):
        malla(ax, X, Y, X ** 2 / 2 + Y ** 2 / 2, n=20); ax.set_zlim(0, 4)
    cuadrica('cuad-paraboloide-elip', r'Paraboloide elíptico  $\frac{x^2}{a^2}+\frac{y^2}{b^2}=cz$', pe)
    def ph(ax):
        malla(ax, X, Y, X ** 2 / 2 - Y ** 2 / 2, n=20); ax.set_zlim(-2, 2)
    cuadrica('cuad-paraboloide-hip', r'Paraboloide hiperbólico  $\frac{x^2}{a^2}-\frac{y^2}{b^2}=cz$', ph)
    Z, U2 = np.meshgrid(np.linspace(-2, 2, 21), np.linspace(0, 2 * np.pi, 41))
    def cono(ax):
        malla(ax, 1.2 * Z * np.cos(U2), 0.8 * Z * np.sin(U2), Z, n=20); _ejes(ax, 2.5)
    cuadrica('cuad-cono', r'Cono elíptico  $\frac{x^2}{a^2}+\frac{y^2}{b^2}=\frac{z^2}{c^2}$', cono)
    def cil(ax):
        malla(ax, 2 * np.cos(U2), 1.2 * np.sin(U2), Z * 1.2, n=20); _ejes(ax, 2.5)
    cuadrica('cuad-cilindro', r'Cilindro elíptico  $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ (eje z)', cil)


if __name__ == '__main__':
    for f in (escalar_proy, vectorial, mixto, recta_r2, plano_normal, plano_param, alabeadas, secciones, elipse, hiperbola, parabola, circunferencia, todas_cuadricas):
        f()
    print('OK', len(os.listdir(OUT)), 'figuras en', os.path.abspath(OUT))
