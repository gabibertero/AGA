"""Verifica con sympy las fórmulas y ejemplos numéricos de preguntero y machetes (U8-U10). Uso: python3 tests/check_teoria.py"""
import pathlib
from sympy import *

RAIZ = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'content'
TEXTO = ''.join(p.read_text() for d in ('preguntas', 'machetes') for p in (RAIZ / d).glob('*.mdx'))
def en_mdx(s):  # el mismo resultado debe estar escrito en el contenido
    assert s in TEXTO, f'falta en el MDX: {s}'

x, y, z, lam, rho, k, t = symbols('x y z lam rho k t', real=True)
V = Matrix

# ---------- U8 ----------
assert V([2, -3, 1]).dot(V([-3, 2, 4])) == -8; en_mdx('=-6-6+4=-8')
u, v = V([1, 3]), V([-3, 2])
assert simplify(u.dot(v) / (u.norm() * v.norm()) - 3 / sqrt(130)) == 0
assert abs(N(acos(Rational(3) / sqrt(130)), 6) * 180 / N(pi) - 74.7) < 0.1        # 74,7° (el Apunte redondea a 74°)
a, b = V([2, -1, 3]), V([4, -1, 2])
w1 = a.dot(b) / b.dot(b) * b; w2 = a - w1
assert a.dot(b) == 15 and b.dot(b) == 21
assert w1 == V([Rational(20, 7), -Rational(5, 7), Rational(10, 7)]) and w2 == V([-Rational(6, 7), -Rational(2, 7), Rational(11, 7)])  # U8 p.7 trae 4/7: errata
en_mdx('\\tfrac{11}7'); assert w2.dot(b) == 0 and w1 + w2 == a                                             # w2 ⟂ b, a = w1 + w2
c = V([0, 1, -4]).cross(V([2, -1, 1])); assert c == V([-3, -8, -2]); en_mdx('-3\\bar i-8\\bar j-2\\bar k')
assert V([1, 0, 0]).cross(V([0, 1, 1])).dot(V([0, 0, 5])) == 5 and Matrix([[1, 0, 0], [0, 1, 1], [0, 0, 5]]).det() == 5
# área del triángulo del Apunte p.173 y |a×b|^2 = |a|^2|b|^2 - (a·b)^2
P1, P2, P3 = V([2, 2, 0]), V([-1, 0, 2]), V([0, 4, 3])
cr = (P2 - P1).cross(P3 - P1); assert cr == V([-10, 5, -10]) and cr.norm() == 15
p, q = V([1, -5, 6]), V([2, 1, 2]); assert p.cross(q).dot(p.cross(q)) == p.dot(p) * q.dot(q) - p.dot(q) ** 2
# anticonmutativa, paralelismo, coplanaridad
assert a.cross(b) == -b.cross(a) and V([-3, 1, 2]).cross(V([3, -1, -2])) == V([0, 0, 0])
assert V([1, 2, 3]).dot(V([4, 5, 6]).cross(V([7, 8, 9]))) == 0                      # coplanares (det 0)
assert Rational(1, 6) * abs(Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]).det()) == Rational(1, 6)   # tetraedro unitario
# cosenos directores
d = V([1, 2, 2]); assert sum((di / d.norm()) ** 2 for di in d) == 1

# ---------- U9 ----------
# punto-normal: T(-2;-1;5), n=(5;-2;4) -> 5x-2y+4z-12=0
pl = 5 * (x + 2) - 2 * (y + 1) + 4 * (z - 5); assert expand(pl) == 5 * x - 2 * y + 4 * z - 12; en_mdx('5x-2y+4z-12=0')
# plano por 3 puntos del Apunte: P1(2;-1;1), P2(-2;1;3), P3(3;2;-2) -> 6x+5y+7z-14=0
Q1, Q2, Q3 = V([2, -1, 1]), V([-2, 1, 3]), V([3, 2, -2])
n = (Q2 - Q1).cross(Q3 - Q1); assert n == V([-12, -10, -14])
plano = Matrix([[x - 2, y + 1, z - 1], [-4, 2, 2], [1, 3, -3]]).det()
assert simplify(plano / -2 - (6 * x + 5 * y + 7 * z - 14)) == 0
for Q in (Q1, Q2, Q3): assert (6 * x + 5 * y + 7 * z - 14).subs({x: Q[0], y: Q[1], z: Q[2]}) == 0
# distancia punto-recta en R2: 3x-4y+12=0 y (4;-1) -> 28/5
assert Rational(abs(3 * 4 - 4 * (-1) + 12), 5) == Rational(28, 5); en_mdx('\\dfrac{28}{5}')
# forma normal: 3x+4y-5=0 -> cos w=3/5, sen w=4/5, p=1
assert (3 / sqrt(25), 4 / sqrt(25), 5 / sqrt(25)) == (Rational(3, 5), Rational(4, 5), 1)
# distancia punto-recta en R3: |P1P0 × a| / |a|, contra minimización directa
P1r, a_r, P0 = V([1, 0, 2]), V([2, 1, -1]), V([3, 3, 3])
d3 = (P0 - P1r).cross(a_r).norm() / a_r.norm()
dist2 = (P1r + lam * a_r - P0).dot(P1r + lam * a_r - P0)
assert simplify(sqrt(dist2.subs(lam, solve(diff(dist2, lam), lam)[0])) - d3) == 0
# distancia entre alabeadas contra minimización en (lam, rho)
A1, d1, A2, d2 = V([0, 0, 0]), V([1, 0, 0]), V([0, 0, 2]), V([0, 1, 0])
nn = d1.cross(d2); dAl = abs((A2 - A1).dot(nn)) / nn.norm(); assert dAl == 2
D2 = (A1 + lam * d1 - A2 - rho * d2).dot(A1 + lam * d1 - A2 - rho * d2)
s = solve([diff(D2, lam), diff(D2, rho)], [lam, rho]); assert sqrt(D2.subs(s)) == dAl
# distancia entre planos paralelos 8x-4y+z+9=0 y 8x-4y+z-36=0 -> 5
assert Rational(abs(36 + 9), sqrt(8 ** 2 + 4 ** 2 + 1)) == 5; en_mdx('\\dfrac{|36+9|}{\\sqrt{81}}=5')
assert (8 * 0 - 4 * 0 + 36 - 36) == 0                                              # (0;0;36) pertenece al 2º plano
# ángulo recta-plano con seno: r || n -> 90°, r ⟂ n -> 0°
n1, r1 = V([1, 2, 2]), V([2, 4, 4]); assert n1.dot(r1) / (n1.norm() * r1.norm()) == 1
n2, r2 = V([1, 1, 1]), V([1, -1, 0]); assert n2.dot(r2) == 0
# recta intersección de dos planos: director n1×n2 y un punto de la recta satisface ambos
pi1, pi2 = x + y + z - 3, x - y + 2 * z - 2
dirr = V([1, 1, 1]).cross(V([1, -1, 2])); sol = solve([pi1.subs(z, 0), pi2.subs(z, 0)], [x, y])
pt = V([sol[x], sol[y], 0])
for lm in (0, 1, 5):
    r = pt + lm * dirr; assert pi1.subs({x: r[0], y: r[1], z: r[2]}) == 0 and pi2.subs({x: r[0], y: r[1], z: r[2]}) == 0
# haz de planos: todo plano pi1 + k pi2 contiene la recta intersección
for kv in (-2, 0, 3):
    r = pt + 2 * dirr; assert (pi1 + kv * pi2).subs({x: r[0], y: r[1], z: r[2]}) == 0
# haz de rectas por la intersección de r1:x+y-2=0 y r2:x-y=0 -> punto (1;1)
for kv in (-3, 1, 7): assert ((x + y - 2) + kv * (x - y)).subs({x: 1, y: 1}) == 0
# ángulo entre rectas con tangente: m1=1, m2=3 vs producto escalar con directores (1;1),(1;3)
tg = abs(Rational(3 - 1, 1 + 3)); co = V([1, 1]).dot(V([1, 3])) / (V([1, 1]).norm() * V([1, 3]).norm())
assert simplify(tg - sqrt(1 - co ** 2) / co) == 0
# segmentaria del plano: 2x+3y+6z-12=0 -> a=6,b=4,c=2
assert (-Rational(-12, 2), -Rational(-12, 3), -Rational(-12, 6)) == (6, 4, 2)

# ---------- U10 ----------
# circunferencia: x²+y²-4x+2y-5=0 -> C(2;-1), r²=10
circ = x**2 + y**2 - 4 * x + 2 * y - 5
assert expand((x - 2)**2 + (y + 1)**2 - 10 - circ) == 0; en_mdx('(x-2)^2+(y+1)^2=10')
# elipse del Modelo: 9x²+25y²-54x+100y-44=0 -> (x-3)²/25+(y+2)²/9=1
el = 9 * x**2 + 25 * y**2 - 54 * x + 100 * y - 44
assert expand(225 * ((x - 3)**2 / 25 + (y + 2)**2 / 9 - 1) - el) == 0; en_mdx('\\dfrac{(x-3)^2}{25}+\\dfrac{(y+2)^2}{9}=1')
a_, b_ = 5, 3; c_ = sqrt(a_**2 - b_**2); assert c_ == 4 and Rational(c_, a_) == Rational(4, 5)
assert Rational(2 * b_**2, a_) == Rational(18, 5)
# lado recto de la elipse x²/a²+y²/b²=1 en x=c: y=±b²/a
ya = solve((x**2 / 25 + y**2 / 9 - 1).subs(x, 4), y); assert sorted(ya) == [-Rational(9, 5), Rational(9, 5)]
# deducción de la elipse: PF+PF'=2a ⇒ b²x²+a²y²=a²b² (verificación numérica en un punto y algebraica)
A_, C_ = symbols('A_ C_', positive=True); B_ = sqrt(A_**2 - C_**2)
Pt = (A_ * cos(t), B_ * sin(t))
suma = sqrt((Pt[0] - C_)**2 + Pt[1]**2) + sqrt((Pt[0] + C_)**2 + Pt[1]**2)
for val in (0.3, 1.1, 2.0): assert abs(N(suma.subs({A_: 5, C_: 4, t: val})) - 10) < 1e-9
# excentricidades: elipse<1, hipérbola>1, parábola=1 por definición (PF=DP)
assert Rational(4, 5) < 1 and sqrt(13) / 2 > 1
# hipérbola x²/4 - y²/12 = 1: c=4, e=2, asíntotas y=±sqrt(3)x, lado recto 2b²/a = 12
a_h, b_h = 2, sqrt(12); c_h = sqrt(a_h**2 + b_h**2); assert c_h == 4 and Rational(c_h, a_h) == 2 and 2 * b_h**2 / a_h == 12
assert limit(b_h / a_h * sqrt(1 - a_h**2 / x**2), x, oo) == sqrt(3)               # y/x → b/a
yh = solve((x**2 / 4 - y**2 / 12 - 1).subs(x, 4), y); assert sorted(yh) == [-6, 6]  # y = ±b²/a = ±6
# hipérbola general del Apunte: -x²+3y²+4x-6y-13=0 -> (y-1)²/4 - (x-2)²/12 = 1
hg = -x**2 + 3 * y**2 + 4 * x - 6 * y - 13
assert expand(12 * ((y - 1)**2 / 4 - (x - 2)**2 / 12 - 1) - hg) == 0; en_mdx('\\dfrac{(y-1)^2}{4}-\\dfrac{(x-2)^2}{12}=1')
assert sqrt(4 + 12) == 4                                                           # c = 4
# elipse del Apunte: 4x²+2y²+2x-y-6=0 -> (x+1/4)²/(51/32)+(y-1/4)²/(51/16)=1
eg = 4 * x**2 + 2 * y**2 + 2 * x - y - 6
assert expand(Rational(51, 8) * ((x + Rational(1, 4))**2 / Rational(51, 32) + (y - Rational(1, 4))**2 / Rational(51, 16) - 1) - eg) == 0
# parábola: y²=4px, lado recto 4p, foco (p;0) a igual distancia de la directriz
pp = 3
assert solve((y**2 - 4 * pp * x).subs(x, pp), y) == [-2 * pp, 2 * pp]
pq = Symbol('pq', positive=True)
assert expand(((x - pq)**2 + y**2) - (x + pq)**2 - (y**2 - 4 * pq * x)) == 0       # PF²=DP² ⇔ y²=4px
# parábola del Apunte: 4y²+8x-12y+13=0 -> (y-3/2)² = -2(x+1/2)·... verificar completando cuadrados
pa = 4 * y**2 + 8 * x - 12 * y + 13
assert expand(4 * ((y - Rational(3, 2))**2 + 2 * (x + Rational(1, 2))) - pa) == 0  # vértice (-1/2;3/2), 4p=-2
# EGC: discriminante de A y C para cada tipo (ejemplos)

# ---------- cuádricas ----------
a2, b2, c2 = 9, 4, 1
ellipsoide = x**2 / a2 + y**2 / b2 + z**2 / c2 - 1
assert ellipsoide.subs(z, 0) == x**2 / 9 + y**2 / 4 - 1                            # traza: elipse
h1 = x**2 / a2 + y**2 / b2 - z**2 / c2 - 1
assert h1.subs(y, 0) == x**2 / 9 - z**2 - 1 and h1.subs(z, 0) == x**2 / 9 + y**2 / 4 - 1   # hipérbola / elipse
h2 = z**2 / c2 - x**2 / a2 - y**2 / b2 - 1
assert h2.subs(z, 0) == -x**2 / 9 - y**2 / 4 - 1 and solve(h2.subs({x: 0, y: 0}), z) == [-1, 1]  # sin traza en z=0; vértices z=±c
assert all(not im(s).is_zero for s in solve(h2.subs({z: Rational(1, 2), y: 0}), x))   # |z|<c ⇒ x imaginario
pe = x**2 / a2 + y**2 / b2 - z
assert pe.subs(y, 0) == x**2 / 9 - z and solve(pe.subs({z: 0, y: 0}), x) == [0]   # parábola xz; z=0 solo el vértice
assert expand(pe.subs({x: 0, y: 0, z: 0})) == 0 and pe.subs(z, 1) == x**2 / 9 + y**2 / 4 - 1  # z=1: elipse
ph = x**2 / a2 - y**2 / b2 - z
assert expand(ph.subs(z, 0) - (x / 3 - y / 2) * (x / 3 + y / 2)) == 0                  # z=0: par de rectas y=±(b/a)x
assert ph.subs(x, 0) == -y**2 / 4 - z and ph.subs(y, 0) == x**2 / 9 - z            # parábolas opuestas
cono = x**2 / a2 + y**2 / b2 - z**2 / c2
assert expand(cono.subs(y, 0) - (x / 3 - z) * (x / 3 + z)) == 0                        # y=0: par de rectas
esf = x**2 + y**2 + z**2 - 25; assert esf.subs(z, 0) == x**2 + y**2 - 25
print('check_teoria OK')
