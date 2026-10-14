"""Verifica con sympy los ejercicios U8-U10 de los finales 2023-07-26, 2024-07-24, 2024-08, 2024-12-04, los sin fecha
(Córdoba final/práctico, Química), los relatos de alumnos R-01..R-04 y los sueltos G-01..G-08 (AGA, UTN FRC).
Recalcula de forma independiente y asierta resultados e intermedios; al final comprueba que los textos clave estén en los MDX.
Uso: python3 tests/check_finales_2.py"""
import pathlib
import sys
from sympy import *

x, y, z, t, lam, k, a_, b_, k1, k2, s = symbols('x y z t lam k a b k1 k2 s', real=True)
RAIZ = pathlib.Path(__file__).resolve().parent.parent
V = Matrix
cero = zeros(3, 1)


def en_plano(pl, p):
    return expand(pl.subs({x: p[0], y: p[1], z: p[2]})) == 0


def conica_ok(gral, pts):
    for p in pts:
        assert expand(gral.subs({x: p[0], y: p[1]})) == 0, p


def dist_pt_plano(P, n, D):
    return abs(n.dot(P) + D)/n.norm()


def dist_pt_recta(P, P0, d):
    return (P - P0).cross(d).norm()/d.norm()


# ============================ F-2023-07-26 ============================
# ej.3: recta por T paralela a dos planos -> director = n1 x n2
n1, n2 = V([1, 2, -3]), V([2, -1, 1])
d3 = n1.cross(n2)
assert list(d3) == [-1, -7, -5]
assert d3.dot(n1) == 0 and d3.dot(n2) == 0
T = V([1, -1, -2])
# la recta no está contenida en ningún plano (T no pertenece a π1 ni a π2): paralela y distinta
assert (n1.dot(T) + 8, n2.dot(T) - 7) == (13, -6)             # T no está en π1 ni en π2: la recta es paralela y distinta
assert n1.dot(T) + 8 == 1*1 + 2*(-1) - 3*(-2) + 8 == 13
assert n2.dot(T) - 7 == 2*1 - 1*(-1) + 1*(-2) - 7 == -6
# forma simétrica: (x-1)/1 = (y+1)/7 = (z+2)/5 ; el director (1,7,5) = -d3
assert d3 == -V([1, 7, 5])
rec = T + t*V([1, 7, 5])
for pl in (x + 2*y - 3*z + 8, 2*x - y + z - 7):
    assert simplify(pl.subs({x: rec[0], y: rec[1], z: rec[2]}) - pl.subs({x: T[0], y: T[1], z: T[2]})) == 0
# como la recta es la intersección de los planos paralelos a π1 y π2 por T:
pa = n1.dot(V([x, y, z]) - T); pb = n2.dot(V([x, y, z]) - T)
assert expand(pa) == x + 2*y - 3*z - 5 and expand(pb) == 2*x - y + z - 1
for tt in (0, 1, 2):
    P_ = rec.subs(t, tt)
    assert pa.subs({x: P_[0], y: P_[1], z: P_[2]}) == 0 and pb.subs({x: P_[0], y: P_[1], z: P_[2]}) == 0
# ej.4: elipse 25x^2-50x+9y^2+18y-191=0
g = 25*x**2 - 50*x + 9*y**2 + 18*y - 191
assert expand(25*(x-1)**2 + 9*(y+1)**2 - 225 - g) == 0
a4, b4 = 5, 3
c4 = sqrt(a4**2 - b4**2); assert c4 == 4 and Rational(c4, a4) == Rational(4, 5)
conica_ok(g, [(1, 4), (1, -6), (4, -1), (-2, -1)])               # V, V', A, A'
assert Rational(2*b4**2, a4) == Rational(18, 5)                  # LL'
for fy in (3, -5):                                               # lados rectos por F(1;3) y F'(1;-5): x = 1 ± b^2/a = 1 ± 9/5
    assert sorted(solve(g.subs(y, fy), x)) == [Rational(-4, 5), Rational(14, 5)]
# definición: PF + PF' = 2a con P = A(4;-1)
assert sqrt((4-1)**2 + (-1-3)**2) + sqrt((4-1)**2 + (-1+5)**2) == 2*a4

# ============================ F-2024-07-24 ============================
sol = solve([2*x + 3*y - 6, x + y - 1], [x, y], dict=True)[0]
assert sol == {x: -3, y: 4}
r3 = y - 4 - 1*(x + 3)
assert expand(r3) == -x + y - 7 and expand(-r3) == x - y + 7
assert (-3) - 4 + 7 == 0
# ej.4: focos (3;4),(3;-2), e=2
Cx, Cy = 3, Rational(4 + (-2), 2); assert Cy == 1
c = 3; e = 2; a = Rational(c, e); assert a == Rational(3, 2)
b2 = c**2 - a**2; assert b2 == Rational(27, 4)
ordi = (y-1)**2/a**2 - (x-3)**2/b2 - 1
gen = expand(27*ordi)
assert gen == 12*y**2 - 24*y - 4*x**2 + 24*x - 51
assert expand(-gen) == 4*x**2 - 12*y**2 - 24*x + 24*y + 51
conica_ok(gen, [(3, Rational(5, 2)), (3, Rational(-1, 2))])
assert Rational(2*b2, a) == 9                                    # LL'
# lados rectos: y = 1 ± c = 4, -2  ->  x-3 = ±b^2/a = ±9/2
for yy in (4, -2):
    assert sorted(solve(gen.subs(y, yy), x)) == [Rational(-3, 2), Rational(15, 2)]
assert simplify(a/sqrt(b2) - 1/sqrt(3)) == 0                    # pendiente de las asíntotas ±a/b = ±1/√3
assert expand((y-1)**2/a**2 - (x-3)**2/b2) .subs({x: 3, y: 1}) == 0
# definición |PF-PF'| = 2a con P = vértice (3;5/2)
d1 = abs(Rational(5, 2) - 4); d2 = abs(Rational(5, 2) + 2); assert d2 - d1 == 2*a
# excentricidad: e = c/a = 2 > 1 -> hipérbola
assert Rational(c) / a == 2

# ============================ F-2024-08 ============================
ra, rb = V([3, -1, 1]), V([2, 0, -1])
vr = ra.cross(rb); assert list(vr) == [1, 5, 2]
assert vr.dot(ra) == 0 and vr.dot(rb) == 0
npi = V([a_, -1, 4])
assert solve(vr.dot(npi), a_) == [-3]
Pr = V([0, 3, 3])                                               # punto de r: z=2x+3, y=5x+3 con x=0
assert 3*0 - 3 + 3 == 0 and 2*0 - 3 + 3 == 0                       # (0;3;3) está en r
assert (-3)*0 - 3 + 4*3 - 2 == 7                                 # r no está contenida en π (a=-3)
assert vr.cross(npi).norm() != 0                                # r ∥ n  <=> vr x n = 0
assert simplify(vr.cross(npi)) != cero and solve(list(vr.cross(npi)), a_) == []   # perpendicular: sin solución
# ej.4: x^2+3y^2-6x+6y=0
g = x**2 + 3*y**2 - 6*x + 6*y
assert expand((x-3)**2 + 3*(y+1)**2 - 12 - g) == 0
a8, b8 = 2*sqrt(3), 2
c8 = sqrt(a8**2 - b8**2); assert c8 == 2*sqrt(2) and simplify(c8/a8 - sqrt(6)/3) == 0
conica_ok(g, [(3 + 2*sqrt(3), -1), (3 - 2*sqrt(3), -1), (3, 1), (3, -3), (0, 0), (6, 0), (0, -2), (6, -2)])
assert simplify(Rational(2*b8**2)/a8 - 4*sqrt(3)/3) == 0         # LL' = 2b^2/a = 8/(2√3)
for fx in (3 + 2*sqrt(2), 3 - 2*sqrt(2)):                        # lados rectos: y+1 = ±b^2/a = ±2/√3
    ys = sorted(solve(g.subs(x, fx), y), key=N)
    assert simplify(ys[1] - ys[0] - 4*sqrt(3)/3) == 0

# ============================ F-2024-12-04 ============================
p1, p2 = V([1, -1, -4]), V([1, 0, -2])
v1 = p1.cross(p2); assert list(v1) == [2, -2, 1]
assert v1.dot(p1) == 0 and v1.dot(p2) == 0
P0 = V([-1, 0, 0]); assert p1.dot(P0) + 1 == 0 and p2.dot(P0) + 1 == 0
v2 = V([2, 1, 0])
n = v1.cross(v2); assert list(n) == [-1, 2, 6]
pl = expand(n.dot(V([x, y, z]) - P0)); assert pl == -x + 2*y + 6*z - 1
assert n.dot(v1) == 0 and n.dot(v2) == 0
gen_pl = expand(-pl); assert gen_pl == x - 2*y - 6*z + 1
# segmentaria: x/(-1) + y/(1/2) + z/(1/6) = 1
assert [solve(pl.subs({y: 0, z: 0}), x)[0], solve(pl.subs({x: 0, z: 0}), y)[0], solve(pl.subs({x: 0, y: 0}), z)[0]] == [-1, Rational(1, 2), Rational(1, 6)]
# r1 contenida: otro punto de r1 (z=1: x=1, y=-4+... ) -> x-2z+1=0 -> x=1; x-y-4z+1=0 -> y=-2
Q1 = V([1, -2, 1]); assert p1.dot(Q1) + 1 == 0 and p2.dot(Q1) + 1 == 0
assert en_plano(pl, P0) and en_plano(pl, Q1)
assert Q1 - P0 == V([2, -2, 1]) == v1
# ej.4: hipérbola centro (0;0), V(9;0), 2c=30
a12, c12 = 9, 15; b12 = sqrt(c12**2 - a12**2); assert b12 == 12
gen = 144*x**2 - 81*y**2 - 81*144
assert expand(144*x**2 - 81*y**2 - 11664 - gen) == 0
assert expand(gen/11664 - (x**2/81 - y**2/144 - 1)) == 0
conica_ok(gen, [(9, 0), (-9, 0)])
assert Rational(c12, a12) == Rational(5, 3)
assert Rational(2*b12**2, a12) == 32
assert sorted(solve(gen.subs(x, 15), y)) == [-16, 16]
assert Rational(b12, a12) == Rational(4, 3)
assert abs(sqrt((9-15)**2) - sqrt((9+15)**2)) == 18             # |VF - VF'| = 2a

# ============================ F-SF-CBA-FINAL ============================
g = 9*x**2 + y**2 - 36*x + 8*y + 43
assert expand(9*(x-2)**2 + (y+4)**2 - 9 - g) == 0
a_e, b_e = 3, 1; c_e = sqrt(a_e**2 - b_e**2); assert c_e == 2*sqrt(2)
conica_ok(g, [(2, -1), (2, -7), (3, -4), (1, -4)])
assert simplify(c_e/a_e - 2*sqrt(2)/3) == 0
assert Rational(2*b_e**2, a_e) == Rational(2, 3)
for fy in (-4 + 2*sqrt(2), -4 - 2*sqrt(2)):
    xs = sorted(solve(g.subs(y, fy), x), key=N); assert simplify(xs[1] - xs[0] - Rational(2, 3)) == 0
# ej.3: π: -2x+z=-2
npl = V([-2, 0, 1]); assert solve((-2*x + z + 2).subs(x, 0), z) == [-2]     # traza con YZ: x=0, z=-2
dir_ = V([1, 0, 2]); assert dir_.dot(npl) == 0
assert -2*0 + 0 != -2                                                       # el origen no está en π
assert V([0, 1, 0]).dot(npl) == 0 and V([1, 0, 2]).dot(npl) == 0

# ============================ F-SF-CBA-PRAC ============================
rr = V([-3, -2, 2]) + t*V([1, 2, 1])
fx = (2*x - y + z).subs({x: rr[0], y: rr[1], z: rr[2]})
assert expand(fx) == t - 2 and solve(fx, t) == [2]
Pi = rr.subs(t, 2); assert list(Pi) == [-1, 2, 4] and 2*Pi[0] - Pi[1] + Pi[2] == 0
assert V([2, -1, 1]).dot(V([1, 2, 1])) == 1 != 0                           # no paralela -> corte único
g = 8*x**2 + 4*y**2 + 24*x - 4*y - 13
assert expand(8*(x + Rational(3, 2))**2 + 4*(y - Rational(1, 2))**2 - 32 - g) == 0
a_c, b_c = 2*sqrt(2), 2; c_c = sqrt(a_c**2 - b_c**2); assert c_c == 2
assert simplify(c_c/a_c - sqrt(2)/2) == 0
cx, cy = Rational(-3, 2), Rational(1, 2)
conica_ok(g, [(cx, cy + 2*sqrt(2)), (cx, cy - 2*sqrt(2)), (cx + 2, cy), (cx - 2, cy)])
assert simplify(2*b_c**2/a_c - 2*sqrt(2)) == 0                      # LL' = 8/(2√2)
for fyy in (cy + 2, cy - 2):                                              # lados rectos: x+3/2 = ±b^2/a = ±√2
    xs = sorted(solve(g.subs(y, fyy), x), key=N); assert simplify(xs[1] - xs[0] - 2*sqrt(2)) == 0

# ============================ F-SF-QUIM ============================
P1, Pq = V([3, 1, 4]), V([0, -5, 0])
P2_, P3_, P4_ = V([-1, 5, 7]), V([7, -3, 8]), V([-3, 0, 7])
dr = P3_ - P2_; assert list(dr) == [8, -8, 1]
u1 = P1 - Pq; assert list(u1) == [3, 6, 4]
nq = u1.cross(dr); assert list(nq) == [38, 29, -72]
plq = expand(nq.dot(V([x, y, z]) - Pq)); assert plq == 38*x + 29*y - 72*z + 145
assert en_plano(plq, P1) and en_plano(plq, Pq)
assert nq.dot(dr) == 0
assert plq.subs({x: -3, y: 0, z: 7}) == -473
assert not en_plano(plq, P4_)
assert gcd_list([38, 29, 72, 145]) == 1
g = 4*x**2 + 16*x - 2*y**2 - 4*y + 5
assert expand(4*(x + 2)**2 - 2*(y + 1)**2 - 9 - g) == 0
aq2, bq2 = Rational(9, 4), Rational(9, 2)
cq = sqrt(aq2 + bq2); assert cq == 3*sqrt(3)/2
eq_ = cq/sqrt(aq2); assert simplify(eq_ - sqrt(3)) == 0
conica_ok(g, [(Rational(-1, 2), -1), (Rational(-7, 2), -1)])
assert simplify(2*bq2/sqrt(aq2) - 6) == 0                                 # LL' = 2b^2/a = 9/(3/2)
assert simplify(sqrt(aq2/bq2) - sqrt(2)/2) == 0                          # pendiente de asíntotas: b/a  (eje focal horizontal) = √2
assert simplify(sqrt(bq2/aq2) - sqrt(2)) == 0
for fxx in (-2 + cq, -2 - cq):
    ys = sorted(solve(g.subs(x, fxx), y), key=N); assert simplify(ys[1] - ys[0] - 6) == 0

# ============================ R-01 y R-02 (plano por la intersección, paralelo a (1;3;-1)) ============================
q1, q2 = x - y + 2*z + 4, 2*x + y + 3*z - 9
nn = V([1 + 2*lam, -1 + lam, 2 + 3*lam]); vv = V([1, 3, -1])
assert solve(nn.dot(vv), lam) == [2]
haz = expand(q1 + 2*q2); assert haz == 5*x + y + 8*z - 14
assert V([5, 1, 8]).dot(vv) == 0
# el plano contiene la recta de intersección: dir = n1 x n2 ⟂ (5,1,8); y un punto común está en el plano
vi = V([1, -1, 2]).cross(V([2, 1, 3])); assert list(vi) == [-5, 1, 3] and vi.dot(V([5, 1, 8])) == 0
ptint = solve([q1.subs({y: 0}), q2.subs({y: 0})], [x, z], dict=True)[0]
assert en_plano(haz, (ptint[x], 0, ptint[z]))   # un punto de la recta de intersección está en el plano del haz
# no es la misma que π1 ni π2 (λ finito, λ≠0)
assert haz != q1 and haz != q2
# R-01 ej.4: circunferencia por (0;6), (3;1), (-2;6)
D, E, F = symbols('D E F')
sc = solve([36 + 6*E + F, 9 + 1 + 3*D + E + F, 4 + 36 - 2*D + 6*E + F], [D, E, F]); assert sc == {D: 2, E: -4, F: -12}
gc = x**2 + y**2 + 2*x - 4*y - 12
assert expand((x + 1)**2 + (y - 2)**2 - 17 - gc) == 0
conica_ok(gc, [(0, 6), (3, 1), (-2, 6)])
conica_ok(gc, [(-1, 2 + sqrt(17)), (-1, 2 - sqrt(17)), (-1 + sqrt(17), 2), (-1 - sqrt(17), 2)])
# R-02 ej.1: haz de cónicas Ca + λ Cb, centro en 2x+y+3=0
Ca, Cb = (x - 2)**2 + (y - 5)**2, (x + 3)**2 + y**2
fam = expand(Ca + lam*Cb)
A_ = fam.coeff(x, 2); B_ = fam.coeff(x, 1); C_ = fam.coeff(y, 1)
assert A_ == 1 + lam and fam.coeff(y, 2) == 1 + lam and fam.coeff(x, 1).subs(y, 0) == -4 + 6*lam and C_.subs(x, 0) == -10
xc = -(-4 + 6*lam)/(2*(1 + lam)); yc = 10/(2*(1 + lam))
assert solve(2*xc + yc + 3, lam) == [4]
g_r2 = expand(fam.subs(lam, 4)); assert g_r2 == 5*x**2 + 5*y**2 + 20*x - 10*y + 65
assert expand((g_r2/5) - ((x + 2)**2 + (y - 1)**2 + 8)) == 0          # (x+2)^2+(y-1)^2 = -8: circunferencia imaginaria
assert (xc.subs(lam, 4), yc.subs(lam, 4)) == (-2, 1) and 2*(-2) + 1 + 3 == 0
# cada generatriz es un "círculo de radio 0" (un solo punto real): no hay punto real común
assert Ca.subs({x: 2, y: 5}) == 0 and Cb.subs({x: -3, y: 0}) == 0 and Cb.subs({x: 2, y: 5}) == 50 and Ca.subs({x: -3, y: 0}) == 50   # dos puntos distintos: sin punto real común
# R-03 ej.4: parábola y^2 = 9x, radio vector del punto de ordenada 6
assert solve(Eq(36, 9*x), x) == [4]
pp = Rational(9, 4); Fp = (pp, 0)
rv = sqrt((4 - Fp[0])**2 + 6**2); assert rv == Rational(25, 4) and rv == 4 + pp   # distancia al foco = x + p (def. con directriz)
assert Rational(4)*pp == 9 and 4*pp == 9                                          # LL' = 4p = 9
assert sorted(solve(y**2 - 9*Fp[0], y)) == [-Rational(9, 2), Rational(9, 2)]
# R-03 ej.3 y R-04: método (plano por tres puntos / haz) con ejemplo propio, no del examen
ex = [V([1, 0, 0]), V([0, 2, 0]), V([0, 0, 3])]
nex = (ex[1] - ex[0]).cross(ex[2] - ex[0]); assert list(nex) == [6, 3, 2]
assert en_plano(6*x + 3*y + 2*z - 6, ex[0]) and en_plano(6*x + 3*y + 2*z - 6, ex[1]) and en_plano(6*x + 3*y + 2*z - 6, ex[2])
# R-04 ej.1: parábola de ejemplo propio F(1;2), directriz y=-2 -> vértice (1;0), p=2, (x-1)^2 = 8y
pe = 2
for px_ in (-3, 1, 5):
    yy_ = Rational((px_ - 1)**2, 8)
    assert sqrt((px_ - 1)**2 + (yy_ - 2)**2) == yy_ + 2             # dist. al foco = dist. a la directriz y=-2
assert expand(((x - 1)**2 - 8*y) - (x**2 - 2*x - 8*y + 1)) == 0

# ============================ G-01 ============================
na = V([-2, 3, 4]); dL = V([-3, -1, 6]); PL = V([1, 2, -2])
nb = na.cross(dL); assert list(nb) == [22, 0, 11]
assert nb.dot(na) == 0 and nb.dot(dL) == 0
beta = expand(nb.dot(V([x, y, z]) - PL) / 11); assert beta == 2*x + z
assert en_plano(beta, PL) and en_plano(beta, PL + 5*dL)
kd = symbols('kd', real=True)
dd = V([kd, -1 - kd, 1]); P0b = V([0, 1, 0])
dist2 = (P0b.cross(dd)).dot(P0b.cross(dd)) / dd.dot(dd)             # distancia^2 del origen a la recta
sol_k = solve(Eq(dist2, 1), kd); assert sol_k == [-1]
assert factor(dd.dot(dd) - (P0b.cross(dd)).dot(P0b.cross(dd))) == (kd + 1)**2
# ============================ G-02 ============================
npi_g = V([1, 1, 1]).cross(V([0, 1, 2])); assert list(npi_g) == [1, -2, 1]
kk = symbols('kk', real=True)
dr_g = V([1, 1/kk, 1])                                            # r: x = k y = z+1 -> x=u, y=u/k, z=u-1
cr = dr_g.cross(npi_g); assert solve(cr[0], kk) == [Rational(-1, 2)] and simplify(cr.subs(kk, Rational(-1, 2))) == cero
plg = expand(npi_g.dot(V([x, y, z]) - V([0, 0, -1]))); assert plg == x - 2*y + z + 1
assert en_plano(plg, (0, 0, -1))

assert en_plano(plg, (1, 1, 1)) is False
assert en_plano(plg, V([0, 0, -1]) + V([1, 1, 1]) + V([0, 1, 2]))
assert simplify(dist_pt_plano(V([1, 1, 1]), npi_g, 1) - sqrt(6)/6) == 0
# ============================ G-03 ============================
bb, kk3 = symbols('bb kk3', real=True)
assert solve(V([1, bb, 1]).dot(V([1, 2, 1])), bb) == [-1]
n3 = V([1, -1, 1]); P3_r = V([-1, 4, 2])

assert sorted(solve(Eq(abs(kk3)/sqrt(3), sqrt(3)), kk3)) == [-3, 3]
assert n3.dot(P3_r) == -3                    # con k=-3 el punto (-1;4;2) de r está en el plano: r quedaría CONTENIDA en π
assert n3.dot(P3_r) != 3                     # con k=3 la recta es paralela y distinta
# b) b=1, k=-2: x+y+z=-2 ; recta por P(-1;-1;0)
n3b = V([1, 1, 1]); Pb = V([-1, -1, 0]); assert n3b.dot(Pb) == -2
d3b = V([1, 0, -1]); assert n3b.dot(d3b) == 0 and d3b[2] != 0
r3b = Pb + lam*d3b
assert simplify(n3b.dot(r3b)) == -2                                  # toda la recta está en π
assert solve(r3b[2], lam) == [0] and r3b.subs(lam, 0) == Pb          # corta z=0 solo en P
# ============================ G-04 ============================
dL4 = V([1, 0, 0]); P4a = V([1, 3, 4])
n4 = dL4.cross(P4a); assert list(n4) == [0, -4, 3]                    # el plano pasa por el origen (eje x) y contiene a L
pl4 = -4*y + 3*z
assert en_plano(pl4, V([0, 0, 0])) and en_plano(pl4, P4a) and en_plano(pl4, V([5, 0, 0]))
d4 = dist_pt_recta(V([0, 0, 0]), P4a, dL4); assert d4 == 5           # L ∥ eje x: distancia = |(0;3;4)|
assert dL4.cross(dL4) == cero                                        # son paralelas: se usa distancia punto-recta
# ============================ G-05 ============================
u5, w5 = V([0, 1, 1]), V([2, 0, 3]); P05 = V([1, -1, 0])
n5 = u5.cross(w5); assert list(n5) == [3, 2, -2]
pl5 = expand(n5.dot(V([x, y, z]) - P05)); assert pl5 == 3*x + 2*y - 2*z - 1
assert solve(pl5.subs({y: 0, z: 0}), x) == [Rational(1, 3)]
L5 = V([Rational(1, 3), 0, 0]) + lam*n5

assert expand(pl5.subs({x: L5[0], y: L5[1], z: L5[2]})) == 17*lam         # L corta a π solo en lam=0: P
assert solve(17*lam, lam) == [0]
# ============================ G-06 ============================
tt, uu = symbols('tt uu', real=True)
rg = V([4 + 3*tt, 2 + tt, -tt]); sg = V([1 + uu, 1 - uu, 1 + 2*uu])
assert (1 - sg[2])/(-2) == uu and (sg[1] - 1)/(-1) == uu and sg[0] - 1 == uu
ss = solve(list(rg - sg), [tt, uu], dict=True); assert ss == [{tt: -1, uu: 0}]
Pg = rg.subs(tt, -1); assert list(Pg) == [1, 1, 1]
nh1, nh2 = V([1, 1, 0]), V([0, 1, -1]); vh = nh1.cross(nh2); assert list(vh) == [-1, 1, 1]
assert nh1.dot(V([0, 0, 0])) == 0
dg = dist_pt_recta(Pg, V([0, 0, 0]), vh); assert dg == sqrt(Rational(8, 3)) and dg**2 == Rational(8, 3)
assert simplify(dg - 2*sqrt(6)/3) == 0
# ============================ G-07 ============================
ur, wr = V([1, -1, 0]), V([0, k1, 1])
nq7 = ur.cross(wr); assert list(nq7) == [-1, -1, k1]
dr7 = V([1, 1, 0]).cross(V([0, 2, 1])); assert list(dr7) == [1, -1, 2]
assert solve(nq7.dot(dr7), k1) == [0]
pl7 = expand(nq7.subs(k1, 0).dot(V([x, y, z]) - V([1, 2, 3]))); assert pl7 == -x - y + 3
Pr7 = V([k2, 0, 0]); assert k2 + 0 == k2 and 2*0 + 0 == 0
assert expand((x + y - k2).subs({x: k2, y: 0})) == 0 and (0 + 2*0) == 0
d7 = abs(pl7.subs({x: k2, y: 0}))/sqrt(2)
assert sorted(solve(Eq(d7, sqrt(2)), k2)) == [1, 5]
assert solve(nq7.dot(dr7).subs(k1, 1), k1) == [] and nq7.dot(dr7).subs(k1, 1) == 2  # con k1≠0 la recta corta al plano: distancia 0
# ============================ G-08 ============================
A8, B8 = symbols('A8 B8', real=True)
S8 = A8*x**2 - B8*y + 4*(z - 1)**2 - B8
tr_y2 = expand(S8.subs(y, 2)); assert expand(tr_y2 - (A8*x**2 + 4*(z - 1)**2 - 3*B8)) == 0
assert solve(A8 - 4, A8) == [4]                                       # circunferencia: coeficientes iguales
tr_z1 = expand(S8.subs(z, 1)); assert tr_z1 == A8*x**2 - B8*y - B8
sol8 = solve([tr_z1.subs({x: t, y: 2*t**2 - 1}).expand().coeff(t, 2), A8 - 4], [A8, B8], dict=True)
assert sol8 == [{A8: 4, B8: 2}]
assert expand(tr_z1.subs({A8: 4, B8: 2, x: t, y: 2*t**2 - 1})) == 0
assert expand(tr_y2.subs({A8: 4, B8: 2}) - (4*x**2 + 4*(z - 1)**2 - 6)) == 0   # x^2+(z-1)^2 = 3/2
S8b = expand(S8.subs({A8: 0, B8: 1})); assert expand(S8b - (4*(z - 1)**2 - y - 1)) == 0                       # y = 4(z-1)^2 - 1 : cilindro parabólico, eje x


# ============================ los MDX tienen los textos verificados ============================
def en_mdx(fname, *trozos):
    txt = (RAIZ / 'src' / 'content' / 'parciales' / fname).read_text(encoding='utf-8')
    for tr in trozos:
        assert tr in txt, f'{fname}: falta {tr!r}'
    assert 'Solución elaborada — no oficial, verificada con sympy' in txt, fname
    return txt


SOL = {
 'final-2023-07-26.mdx': [r'\frac{x-1}{1}=\frac{y+1}{7}=\frac{z+2}{5}', r'\frac{(x-1)^2}{9}+\frac{(y+1)^2}{25}=1', r'e=\tfrac45', 'F(1;3)', r"LL'=\tfrac{18}{5}"],
 'final-2024-07-24.mdx': ['x-y+7=0', r'\frac{(y-1)^2}{9/4}-\frac{(x-3)^2}{27/4}=1', '4x^2-12y^2-24x+24y+51=0', 'e=2', "LL'=9"],
 'final-2024-08.mdx': ['a=-3', 'no existe', r'\frac{(x-3)^2}{12}+\frac{(y+1)^2}{4}=1', r'e=\tfrac{\sqrt6}{3}', r'c=2\sqrt2'],
 'final-2024-12-04.mdx': ['x-2y-6z+1=0', r'\frac{x}{-1}+\frac{y}{1/2}+\frac{z}{1/6}=1', r'\frac{x^2}{81}-\frac{y^2}{144}=1', r'e=\tfrac53', "LL'=32"],
 'final-sf-cba-final.mdx': [r'(x-2)^2+\frac{(y+4)^2}{9}=1', r'e=\tfrac{2\sqrt2}{3}', 'x=0', 'z=-2', r'(0;0;0)+\lambda(1;0;2)'],
 'final-sf-cba-prac.mdx': [r'(-1;2;4)', r'\frac{(x+3/2)^2}{4}+\frac{(y-1/2)^2}{8}=1', r'e=\tfrac{\sqrt2}{2}'],
 'final-sf-quim.mdx': ['38x+29y-72z+145=0', 'no pertenece', r'\frac{(x+2)^2}{9/4}-\frac{(y+1)^2}{9/2}=1', r'e=\sqrt3'],
 'final-relatos.mdx': ['5x+y+8z-14=0', 'x^2+y^2+2x-4y-12=0', r'\tfrac{25}{4}', 'enunciado reconstruido por alumnos, no oficial'],
 'final-sueltos.mdx': ['2x+z=0', 'k=-1', r'k=-\dfrac12', r'\dfrac{\sqrt6}{6}', 'k=3', '-4y+3z=0', r'\left(\tfrac13;0;0\right)', r'\sqrt{\tfrac83}',
                       'k_1=0', 'k_2=5', 'A=4', 'B=2', 'cilindro parabólico'],
}
if '--solo-calculo' not in sys.argv:
    for f, tr in SOL.items():
        txt = en_mdx(f, *tr)
        assert 'tipo: "final"' in txt and 'orden: 2' in txt, f
    # los relatos y los G llevan rótulo y marcas de pendiente
    r = en_mdx('final-relatos.mdx')
    assert r.count('enunciado reconstruido por alumnos, no oficial') >= 8
    g = en_mdx('final-sueltos.mdx')
    assert 'pendiente de revisión' in g
    import re
    for f in SOL:   # toda figura referenciada existe
        for carp, nom in re.findall(r'figuras/([\w-]+)/([\w.-]+\.svg)', (RAIZ / 'src' / 'content' / 'parciales' / f).read_text(encoding='utf-8')):
            assert (RAIZ / 'public' / 'figuras' / carp / nom).exists(), (f, carp, nom)
    assert '5x^2+5y^2+20x-10y+65=0' in en_mdx('final-relatos.mdx')
print('OK: check_finales_2.py - todos los asserts pasan')
