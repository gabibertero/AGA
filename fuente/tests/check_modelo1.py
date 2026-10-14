"""Verifica con sympy la solución del simulacro Modelo1 - P2 (AGA, UTN FRC). Uso: python3 tests/check_modelo1.py"""
from sympy import *

x, y, z, t, lam = symbols('x y z t lam', real=True)

# ---- Ej.1: elipse ----
gral = 9*x**2 + 25*y**2 - 54*x + 100*y - 44
orden = (x-3)**2/25 + (y+2)**2/9 - 1
assert expand(gral - 225*orden) == 0               # general = 225 * (ordinaria - 1 + 1)
assert expand(9*(x-3)**2 + 25*(y+2)**2 - 225 - gral) == 0   # paso intermedio (completar cuadrados)
C = (3, -2); a, b = 5, 3
c = sqrt(a**2 - b**2); assert c == 4
e = Rational(c, a); assert e == Rational(4, 5)
assert Rational(2*b**2, a) == Rational(18, 5)       # lado recto
for p in [(8, -2), (-2, -2), (3, 1), (3, -5)]:       # vértices en la cónica
    assert gral.subs({x: p[0], y: p[1]}) == 0
F1, F2 = (3+c, -2), (3-c, -2)
assert F1 == (7, -2) and F2 == (-1, -2)
for p in [(8, -2), (3, 1)]:                          # def. foco: d1+d2 = 2a
    assert sqrt((p[0]-F1[0])**2+(p[1]-F1[1])**2) + sqrt((p[0]-F2[0])**2+(p[1]-F2[1])**2) == 2*a
# lado recto: x = 7 -> y = -2 ± 9/5
assert solve(gral.subs(x, 7), y) == [-Rational(19, 5), Rational(-1, 5)]
assert Rational(-1, 5) - Rational(-19, 5) == Rational(18, 5)
# extremos de ambos lados rectos: x = h±c, y = k±b²/a (= -2 ± 9/5)
for xl in (7, -1):
    assert sorted(solve(gral.subs(x, xl), y)) == [Rational(-19, 5), Rational(-1, 5)]
    assert abs(Rational(-1, 5) - Rational(-19, 5)) == Rational(2*b**2, a)
    assert [-2 + Rational(b**2, a), -2 - Rational(b**2, a)] == [Rational(-1, 5), Rational(-19, 5)]
# cotas del gráfico: 2a, 2b, 2c y puntos extra de la figura sobre la cónica
assert (2*a, 2*b, 2*c) == (10, 6, 8)
assert gral.subs({x: 3, y: 1}) == 0 and gral.subs({x: 3, y: -5}) == 0   # A, A'
assert gral.subs({x: 8, y: -2}) == 0 and gral.subs({x: -2, y: -2}) == 0  # V, V'
# la fila de la tabla/figura usa exactamente estos extremos
LR = {(7, Rational(-1, 5)), (7, Rational(-19, 5)), (-1, Rational(-1, 5)), (-1, Rational(-19, 5))}
assert all(gral.subs({x: px, y: py}) == 0 for px, py in LR)

# ---- Ej.2: plano ----
n1, n2 = Matrix([1, -3, 4]), Matrix([2, 2, -1])
n = n1.cross(n2); assert list(n) == [-5, 9, 8]
P = Matrix([4, -2, 1])
plano = n[0]*(x-4) + n[1]*(y+2) + n[2]*(z-1)
assert expand(plano) == -5*x + 9*y + 8*z + 30
assert n.dot(n1) == 0 and n.dot(n2) == 0             # n es director de la recta intersección
assert plano.subs({x: 4, y: -2, z: 1}) == 0          # P en el plano
assert expand(-plano) == 5*x - 9*y - 8*z - 30
# la recta intersección es perpendicular al plano: dirección ∥ normal
assert n.cross(Matrix([5, -9, -8])) == zeros(3, 1)

# ---- Ej.3: rectas ----
A, B = Matrix([0, -1, -1]), Matrix([1, 0, 1])
u = B - A; assert list(u) == [1, 1, 2]
r1 = A + t*u
assert r1.subs(t, 0) == A and r1.subs(t, 1) == B
assert [simplify(r1[0]/1 - (r1[1]+1)/1), simplify(r1[0] - (r1[2]+1)/2)] == [0, 0]   # simétrica x=(y+1)=(z+1)/2
Cc, v = Matrix([3, -1, 2]), Matrix([-1, 2, 1])
r2 = Cc + lam*v
assert u.cross(v) != zeros(3, 1)                     # no paralelas
assert list(u.cross(v)) == [-3, -3, 3]
AC = Cc - A; assert list(AC) == [3, 0, 3]
assert Matrix.hstack(AC, u, v).det() == 0            # producto mixto 0 -> coplanares
sol = solve([r1[i]-r2[i] for i in range(3)], [t, lam], dict=True)
assert sol == [{t: 2, lam: 1}]
Q = r1.subs(t, 2); assert list(Q) == [2, 1, 3] and list(r2.subs(lam, 1)) == [2, 1, 3]
# la 3ª ecuación del sistema sola (con t, lam de las otras dos) cierra
assert solve([r1[0]-r2[0], r1[1]-r2[1]], [t, lam], dict=True) == [{t: 2, lam: 1}]
assert (r1[2]-r2[2]).subs({t: 2, lam: 1}) == 0
print("OK: todos los asserts de Modelo1 - P2 pasan")
