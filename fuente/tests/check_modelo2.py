"""Verifica con sympy la solución del simulacro Modelo2 - P2 (AGA, UTN FRC). Uso: python3 tests/check_modelo2.py"""
import pathlib
from sympy import *

x, y, z, lam = symbols('x y z lam', real=True)
mdx = (pathlib.Path(__file__).resolve().parent.parent / "src/content/parciales/modelo2-p2.mdx").read_text()
def en_mdx(txt): assert txt in mdx, f"falta en el MDX: {txt}"

# ---- Ej.1: plano paralelo a v y u por (1;-3;2) ----
v, u = Matrix([3, 1, -1]), Matrix([1, -2, -1])
n = v.cross(u); assert list(n) == [-3, 2, -7]
assert n.dot(v) == 0 and n.dot(u) == 0
plano = n[0]*(x-1) + n[1]*(y+3) + n[2]*(z-2)
assert expand(plano) == -3*x + 2*y - 7*z + 23
assert expand(-plano) == 3*x - 2*y + 7*z - 23
assert (3*x - 2*y + 7*z - 23).subs({x: 1, y: -3, z: 2}) == 0
# comprobación independiente: determinante [X-P, v, u] = 0 da el mismo plano (salvo signo)
d = Matrix([[x-1, y+3, z-2], list(v), list(u)]).det()
assert expand(d + (3*x - 2*y + 7*z - 23)) == 0   # d = (X-P)·n = -(3x-2y+7z-23)
en_mdx("3x-2y+7z-23=0"); en_mdx("(-3;2;-7)")

# ---- Ej.2: plano por P(2;1;-3) que contiene π1∩π2 ----
p1 = x - y - z - 8; p2 = 3*x - y - 4
P = {x: 2, y: 1, z: -3}
assert p1.subs(P) == -4 and p2.subs(P) == 1          # P no está en ningún plano del haz
assert solve(-4 + lam*1, lam) == [4]                  # π1 + λπ2 con λ = 4
plano2 = expand(p1 + 4*p2); assert plano2 == 13*x - 5*y - z - 24
assert plano2.subs(P) == 0
n1, n2 = Matrix([1, -1, -1]), Matrix([3, -1, 0])
dd = n1.cross(n2); assert list(dd) == [-1, -3, 2]     # director de la recta
sol = solve([p1.subs(z, 0), p2], [x, y], dict=True); assert sol == [{x: -2, y: -10}]
Q = Matrix([-2, -10, 0])                              # punto de la recta
assert p1.subs({x: -2, y: -10, z: 0}) == 0 and p2.subs({x: -2, y: -10}) == 0
nn = dd.cross(Matrix([2, 1, -3]) - Q); assert list(nn) == [-13, 5, 1]   # camino alternativo
assert expand(-(nn[0]*(x+2) + nn[1]*(y+10) + nn[2]*z) - plano2) == 0
# la recta está contenida en el plano: su director es ⟂ a la normal
assert Matrix([13, -5, -1]).dot(dd) == 0
en_mdx("13x-5y-z-24=0")

# ---- Ej.3: parábola y²+2y+4x-19=0, ordenada 3 ----
gral = y**2 + 2*y + 4*x - 19
assert expand((y+1)**2 + 4*(x-5) - gral) == 0         # (y+1)² = -4(x-5)
p = 1                                                 # 4p = 4
V, F = (5, -1), (5-p, -1); assert F == (4, -1)
assert gral.subs({x: 5, y: -1}) == 0                  # vértice en la curva
dir_x = 5 + p; assert dir_x == 6                      # directriz x = 6, A(6;-1)
assert solve(gral.subs(y, 3), x) == [1]; Pp = (1, 3)
rv = sqrt((Pp[0]-F[0])**2 + (Pp[1]-F[1])**2); assert rv == 5
assert abs(dir_x - Pp[0]) == 5                        # |PD| = |PF| (definición)
assert 4*p == 4 and sorted(solve(gral.subs(x, 4), y)) == [-3, 1]   # lado recto L(4;1), L'(4;-3)
assert abs(1 - (-3)) == 4*p
# puntos de la curva cumplen |PF| = |PD| (definición)
for yv in (-5, -3, 0, 1, 3):                          # puntos de la curva cumplen |PF| = |PD|
    xv = solve(gral.subs(y, yv), x)[0]
    assert sqrt((xv-4)**2 + (yv+1)**2) == abs(6-xv)
en_mdx("(y+1)^2=-4(x-5)")
print("OK: todos los asserts de Modelo2 - P2 pasan")
