"""Verifica con sympy la solución del 2º parcial curso 1R5 (AGA, UTN FRC). Uso: python3 tests/check_1r5.py"""
import pathlib
from sympy import *

x, y, z, t, s = symbols('x y z t s', real=True)
mdx = (pathlib.Path(__file__).resolve().parent.parent / "src/content/parciales/1r5-2p.mdx").read_text()
def en_mdx(txt): assert txt in mdx, f"falta en el MDX: {txt}"

# ---- Ej.1: cónica 9x²+4y²-54x+16y+61=0 ----
gral = 9*x**2 + 4*y**2 - 54*x + 16*y + 61
assert expand(9*(x-3)**2 + 4*(y+2)**2 - 36 - gral) == 0            # completar cuadrados: =36
assert expand(36*((x-3)**2/4 + (y+2)**2/9 - 1) - gral) == 0         # ordinaria
a, b = 3, 2; c = sqrt(a**2 - b**2); assert c == sqrt(5)             # eje focal vertical (a² bajo y)
e = c/a; assert e == sqrt(5)/3
LR = Rational(2*b**2, a); assert LR == Rational(8, 3)
C = (3, -2)
for p in [(3, 1), (3, -5), (5, -2), (1, -2)]:                       # V, V', A, A' sobre la cónica
    assert gral.subs({x: p[0], y: p[1]}) == 0
F, F2 = (3, -2 + c), (3, -2 - c)
for p in [(3, 1), (5, -2)]:                                         # d1 + d2 = 2a
    d1 = sqrt((p[0]-F[0])**2 + (p[1]-F[1])**2); d2 = sqrt((p[0]-F2[0])**2 + (p[1]-F2[1])**2)
    assert simplify(d1 + d2) == 2*a
assert simplify(sqrt((5-3)**2 + (-2-F[1])**2) - a) == 0              # d(A,F) = a
assert (2*a, 2*b, simplify(2*c)) == (6, 4, 2*sqrt(5))
# extremos del lado recto: y = -2 ± √5, x = 3 ± b²/a = 3 ± 4/3
for yl in (-2 + sqrt(5), -2 - sqrt(5)):
    assert sorted(solve(gral.subs(y, yl), x)) == [Rational(5, 3), Rational(13, 3)]
    assert Rational(13, 3) - Rational(5, 3) == LR
en_mdx("\\dfrac{(x-3)^2}{4}+\\dfrac{(y+2)^2}{9}=1")

# ---- Ej.2: r1 (lectura manuscrita) x/1=(y-1)/1=(z-2)/(-1); r2: (3,-1,1)+s(1,0,2) ----
A, u = Matrix([0, 1, 2]), Matrix([1, 1, -1])
B, v = Matrix([3, -1, 1]), Matrix([1, 0, 2])
r1 = A + t*u; r2 = B + s*v
assert [simplify(r1[0]/1 - (r1[1]-1)/1), simplify(r1[0]/1 - (r1[2]-2)/(-1))] == [0, 0]   # simétrica de r1
assert u.cross(v) != zeros(3, 1)                                    # no paralelas
n = u.cross(v); assert list(n) == [2, -3, -1]
AB = B - A; assert list(AB) == [3, -2, -1]
mixto = AB.dot(n); assert mixto == 13 and Matrix.hstack(AB, u, v).det() == 13   # ≠ 0: alabeadas
assert solve([r1[i] - r2[i] for i in range(3)], [t, s], dict=True) == []         # sistema incompatible
assert solve([r1[1] - r2[1], r1[0] - r2[0]], [t, s], dict=True) == [{t: -2, s: -5}]
assert (r1[2] - r2[2]).subs({t: -2, s: -5}) == 4 - (-9)            # 3.ª ecuación: 4 ≠ -9
assert n.norm() == sqrt(14)
dist = Rational(13)/sqrt(14); assert simplify(dist - 13*sqrt(14)/14) == 0
# comprobación independiente: minimizar |r1(t) - r2(s)|² (pie de la perpendicular común)
D2 = sum((r1[i] - r2[i])**2 for i in range(3))
sol = solve([diff(D2, t), diff(D2, s)], [t, s], dict=True)[0]
assert simplify(sqrt(D2.subs(sol)) - dist) == 0
assert n.dot(r1.subs(t, sol[t]) - r2.subs(s, sol[s])).is_nonzero   # el vector entre los pies es ∥ a n
assert (r1.subs(t, sol[t]) - r2.subs(s, sol[s])).cross(n) == zeros(3, 1)
en_mdx("\\dfrac{13}{\\sqrt{14}}")

# ---- Ej.3: plano 3x+12y-4z-39=0, P(-3;-4;2) ----
pi = 3*x + 12*y - 4*z - 39
assert solve(pi.subs({y: 0, z: 0}), x) == [13]
assert solve(pi.subs({x: 0, z: 0}), y) == [Rational(13, 4)]
assert solve(pi.subs({x: 0, y: 0}), z) == [-Rational(39, 4)]
nn = Matrix([3, 12, -4]); assert nn.norm() == 13
num = pi.subs({x: -3, y: -4, z: 2}); assert num == -104
assert Abs(num)/nn.norm() == 8
# comprobación: pie de la perpendicular por P cae en el plano y |P - pie| = 8
Pt = Matrix([-3, -4, 2]); lam = solve(pi.subs({x: -3+3*s, y: -4+12*s, z: 2-4*s}), s)[0]
pie = Pt + lam*nn; assert pi.subs({x: pie[0], y: pie[1], z: pie[2]}) == 0 and (pie - Pt).norm() == 8
en_mdx("d(P,\\pi)=8")
print("OK: todos los asserts de 1R5 - 2P pasan")
