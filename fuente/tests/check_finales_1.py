"""Verifica con sympy los ejercicios U8-U10 de los finales 2017-12-20 ... 2022-03-02 (AGA, UTN FRC).
Recalcula de forma independiente y asierta resultados e intermedios; al final comprueba que los textos clave estén en los MDX.
Uso: python3 tests/check_finales_1.py"""
import pathlib
from sympy import *

x, y, z, t, s, lam, k, h = symbols('x y z t s lam k h', real=True)
RAIZ = pathlib.Path(__file__).resolve().parent.parent
V = Matrix
cero = zeros(3, 1)


def en_plano(pl, p):
    return pl.subs({x: p[0], y: p[1], z: p[2]}) == 0


def paralelos(u, v):
    return u.cross(v) == cero


def conica_ok(gral, pts):
    for p in pts:
        assert expand(gral.subs({x: p[0], y: p[1]})) == 0, p


# =============== F-2017-12-20 y F-2019-09-11 (mismos ej.1 y ej.2) ===============
n1, n2 = V([2, -1, 2]), V([1, 3, -5])
n = n1.cross(n2)
assert list(n) == [-1, 12, 7]
assert n.dot(n1) == 0 and n.dot(n2) == 0
P = V([5, 2, -3])
plano = expand(n[0]*(x-5) + n[1]*(y-2) + n[2]*(z+3))
assert plano == -x + 12*y + 7*z + 2
assert expand(-plano) == x - 12*y - 7*z - 2
assert en_plano(plano, P)
assert plano.subs({x: 4, y: -5, z: -1}) == -69       # no contiene (4;-5;-1): da -69 != 0
assert expand(-plano).subs({x: 4, y: -5, z: -1}) == 69
# hipérbola: V(-3;±2) -> centro (-3;0), a=2, eje conjugado 6 -> b=3, eje focal vertical x=-3
Cx, Cy, a, b = -3, 0, 2, 3
c = sqrt(a**2 + b**2)
assert c == sqrt(13)
ord_h = (y-Cy)**2/a**2 - (x-Cx)**2/b**2 - 1
gen_h = expand(36*ord_h)                              # 9y^2 - 4(x+3)^2 - 36
assert gen_h == -4*x**2 + 9*y**2 - 24*x - 72
assert expand(9*y**2 - 4*(x+3)**2 - 36 - gen_h) == 0
conica_ok(gen_h, [(-3, 2), (-3, -2)])                # V, V'
# A(0;0), A'(-6;0) son extremos del eje conjugado: NO están en la hipérbola (y=0 no la corta)
assert gen_h.subs({x: 0, y: 0}) == -72 and gen_h.subs({x: -6, y: 0}) == -72
assert solve(gen_h.subs(y, 0), x) == []
e_h = c/a
assert e_h == sqrt(13)/2
assert expand(-gen_h) == 4*x**2 - 9*y**2 + 24*x + 72
assert Rational(2*b**2, a) == 9                       # LL' = 2b^2/a
# lados rectos: y = ±c  ->  x+3 = ±b^2/a = ±9/2
for yy in (sqrt(13), -sqrt(13)):
    sols = sorted(solve(gen_h.subs(y, yy), x))
    assert sols == [Rational(-15, 2), Rational(3, 2)], sols
    assert sols[1] - sols[0] == 9
# asíntotas: y = ±(a/b)(x+3) (eje focal vertical): 9y^2 - 4(x+3)^2 = 0
assert expand((3*y - 2*x - 6)*(3*y + 2*x + 6) - (9*y**2 - 4*(x+3)**2)) == 0
assert Rational(a, b) == Rational(2, 3)
# focos en la ecuación de la definición |PF - PF'| = 2a, con P = V(-3;2)
F1, F2 = (-3, sqrt(13)), (-3, -sqrt(13))
d1 = sqrt((-3-F1[0])**2 + (2-F1[1])**2)
d2 = sqrt((-3-F2[0])**2 + (2-F2[1])**2)
assert simplify(d2 - d1) == 2*a
# P(0;?) punto extra de la figura: x=0 -> 9y^2 = 4*9+36 -> y = ±2sqrt2
assert sorted(solve(gen_h.subs(x, 0), y)) == [-2*sqrt(2), 2*sqrt(2)]

# =============== F-2018-12-04 ===============
# ej.1: t1: x+y+z=1, -3x+2y=2 ; t2: (x-2k)/(-1) = y-1 = z
na, nb = V([1, 1, 1]), V([-3, 2, 0])
v1 = na.cross(nb); assert list(v1) == [-2, -3, 5]
assert na.dot(v1) == 0 and nb.dot(v1) == 0
P1 = V([0, 1, 0]); assert P1.dot(V([1, 1, 1])) == 1 and -3*0 + 2*1 == 2     # P1 en t1
v2 = V([-1, 1, 1]); P2 = V([2*k, 1, 0])
assert v1.cross(v2) == V([-8, -3, -5]) and v1.cross(v2) != cero             # no paralelas
det = Matrix.hstack(P2 - P1, v1, v2).det()
assert factor(det) == -16*k and solve(det, k) == [0]
# para k=0 se cortan en (0;1;0): ambas rectas pasan por P1
assert P2.subs(k, 0) == P1
# k=1: distancia entre alabeadas
P2k = P2.subs(k, 1); w = v1.cross(v2); assert list(P2k - P1) == [2, 0, 0]
assert (P2k - P1).dot(w) == -16 and w.norm() == 7*sqrt(2)
dist = abs((P2k - P1).dot(w))/w.norm()
assert simplify(dist - 8*sqrt(2)/7) == 0 and abs(N(dist) - 1.6166) < 1e-3
# ej.5: x^2 + 4xy + y^2 = 3
Q = Matrix([[1, 2], [2, 1]])
assert Q.eigenvals() == {-1: 1, 3: 1}
ev = Q.eigenvects()
vm1 = [v for (l_, m_, vs) in ev if l_ == -1 for v in vs][0]
v3 = [v for (l_, m_, vs) in ev if l_ == 3 for v in vs][0]
assert paralelos(V([*vm1, 0]), V([1, -1, 0])) and paralelos(V([*v3, 0]), V([1, 1, 0]))
e1, e2 = V([1, -1])/sqrt(2), V([1, 1])/sqrt(2)      # ejes x', y'
R = Matrix.hstack(e1, e2); assert R.T*R == eye(2) and R.det() == 1
assert simplify(R.T*Q*R - diag(-1, 3)) == zeros(2, 2)
assert R[0, 0] == sqrt(2)/2 and R[1, 0] == -sqrt(2)/2   # cos θ = √2/2, sen θ = -√2/2: rotación de -45°
xp, yp = symbols('xp yp', real=True)
sust = R*V([xp, yp])
forma = expand(sust[0]**2 + 4*sust[0]*sust[1] + sust[1]**2)
assert simplify(forma + xp**2 - 3*yp**2) == 0       # -x'^2 + 3y'^2 = 3
# canónica -x'^2/3 + y'^2 = 1 : eje real = y' (dirección (1,1)), a=1, b=sqrt3, c=2, e=2
a5, b5 = 1, sqrt(3); c5 = sqrt(a5**2 + b5**2); assert c5 == 2 and c5/a5 == 2
g5 = x**2 + 4*x*y + y**2 - 3
def orig(pxp, pyp):
    r = R*V([pxp, pyp]); return (simplify(r[0]), simplify(r[1]))
Vv, Vv2 = orig(0, 1), orig(0, -1)
assert Vv == (sqrt(2)/2, sqrt(2)/2) and Vv2 == (-sqrt(2)/2, -sqrt(2)/2)
Aa, Aa2 = orig(sqrt(3), 0), orig(-sqrt(3), 0)
assert Aa == (sqrt(6)/2, -sqrt(6)/2) and Aa2 == (-sqrt(6)/2, sqrt(6)/2)
Ff, Ff2 = orig(0, 2), orig(0, -2)
assert Ff == (sqrt(2), sqrt(2)) and Ff2 == (-sqrt(2), -sqrt(2))
conica_ok(g5, [Vv, Vv2])
assert simplify(g5.subs({x: Aa[0], y: Aa[1]})) == -6  # A, A': extremos del eje conjugado, NO están en la hipérbola
# asíntotas: y' = ±x'/sqrt3 -> pendientes m con 1+4m+m^2=0
m = symbols('m'); assert sorted(solve(1 + 4*m + m**2, m), key=N) == [-2 - sqrt(3), -2 + sqrt(3)]
# la asíntota de pendiente -2+sqrt3 tiene dirección en nuevos ejes con y'/x' = ±1/sqrt3
dsl = V([1, -2 + sqrt(3)]); nuevos = R.T*dsl
assert simplify(abs(nuevos[1]/nuevos[0]) - 1/sqrt(3)) == 0 or simplify(abs(nuevos[1]/nuevos[0]) - sqrt(3)) == 0
# lados rectos en nuevos ejes: y'=±2 -> x' = ±b^2/a = ±3
assert sorted(solve(-xp**2/3 + 4 - 1, xp)) == [-3, 3]
Ls = [orig(3, 2), orig(-3, 2), orig(3, -2), orig(-3, -2)]
conica_ok(g5, Ls)
assert simplify(Ls[0][0] - 5*sqrt(2)/2) == 0 and simplify(Ls[0][1] + sqrt(2)/2) == 0   # L(5√2/2; -√2/2)

# =============== F-2019-07-02 ===============
# ej.1
Pa, da = V([0, -3, 3]), V([1, -1, 2])
Pb, db = V([1, -2, 3]), V([2, 3, -1])
sol = solve([Pa[i] + s*da[i] - Pb[i] - lam*db[i] for i in range(3)], [s, lam], dict=True)
assert sol == [{s: Rational(1, 5), lam: Rational(-2, 5)}]
corte = Pa + Rational(1, 5)*da
assert corte == Pb + Rational(-2, 5)*db and list(corte) == [Rational(1, 5), Rational(-16, 5), Rational(17, 5)]
assert not paralelos(da, db) and Matrix.hstack(Pb - Pa, da, db).det() == 0
nn = da.cross(db); assert list(nn) == [-5, 5, 5]
pl = expand(nn[0]*x + nn[1]*(y+3) + nn[2]*(z-3))
assert pl == -5*x + 5*y + 5*z
assert en_plano(x - y - z, Pa) and en_plano(x - y - z, Pb) and en_plano(x - y - z, corte)
assert expand(-pl/5) == x - y - z
assert V([1, -1, -1]).dot(da) == 0 and V([1, -1, -1]).dot(db) == 0
# ej.2: focos (-4;-2),(-4;-6), LL'=6
Cx, Cy = -4, Rational(-2 + -6, 2); assert Cy == -4
cc = 2; a_, b_ = symbols('a_ b_', positive=True)
sol = solve([2*b_**2/a_ - 6, a_**2 - b_**2 - cc**2], [a_, b_], dict=True)
assert sol == [{a_: 4, b_: 2*sqrt(3)}]
A2, B2 = 4, 2*sqrt(3)
ord_e = (x+4)**2/12 + (y+4)**2/16 - 1
gen_e = expand(48*ord_e)
assert gen_e == 4*x**2 + 3*y**2 + 32*x + 24*y + 64
assert expand(4*(x+4)**2 + 3*(y+4)**2 - 48 - gen_e) == 0
assert Rational(cc, A2) == Rational(1, 2)
conica_ok(gen_e, [(-4, 0), (-4, -8), (-4 + 2*sqrt(3), -4), (-4 - 2*sqrt(3), -4)])
assert Rational(2*12, 4) == 6
# lados rectos: y = -4±2 -> x+4 = ±3
for yy in (-2, -6):
    assert sorted(solve(gen_e.subs(y, yy), x)) == [-7, -1]
conica_ok(gen_e, [(-1, -2), (-7, -2), (-1, -6), (-7, -6)])
# definición: d(V,F)+d(V,F') = 2a para V(-4;0)
assert abs(0 - (-2)) + abs(0 - (-6)) == 8 == 2*A2

# =============== F-2021-02-09 ===============
vR = V([3, -1, h]); PR = V([0, 2, 1])
nS1, nS2 = V([1, -1, 1]), V([2, 1, 1])
vS = nS1.cross(nS2); assert list(vS) == [-2, 1, 3]
PS = V([0, 1, -1])
assert 0 - 1 + (-1) == -2 and 0 + 1 + (-1) == 0     # PS en las dos ecuaciones
assert list(PS - PR) == [0, -1, -2]
dh = Matrix.hstack(PS - PR, vR, vS).det()
assert expand(dh) == 2*h + 7
assert solve(dh, h) == [Rational(-7, 2)]
assert expand(vS.cross(PS - PR).dot(vR)) == 7 + 2*h   # forma de la resolución
assert V([-2, 1, 3]).cross(V([0, -1, -2])) == V([1, -4, 2])
# no paralelas con h=-7/2
assert not paralelos(vR.subs(h, Rational(-7, 2)), vS)
# ej.5: -p x^2 + 4 y^2 + q z^2 = 16
p_, q_ = symbols('p_ q_', real=True)
# traza z=0: -p/16 x^2 + y^2/4 = 1 debe ser x^2/4 + y^2/4 = 1 (circunferencia radio 2) -> -p/16 = 1/4
assert solve(Eq(-p_/16, Rational(1, 4)), p_) == [-4]
# traza y=0 con p=-4: 4x^2 + q z^2 = 16 -> x^2/4 + z^2/(16/q) = 1 ; hipérbola semiejes 1 y 2 -> |16/q| = 1, q<0
assert solve(Eq(16/(-q_), 1), q_) == [-16]
E5 = lambda p, q: -p*x**2 + 4*y**2 + q*z**2 - 16
assert E5(-4, -16).subs(z, 0) == 4*x**2 + 4*y**2 - 16        # x^2 + y^2 = 4 -> circunferencia diámetro 4
assert E5(-4, -16).subs(y, 0) == 4*x**2 - 16*z**2 - 16       # x^2/4 - z^2 = 1 -> semiejes 2 y 1

# =============== F-2022-02-15 ===============
al, be, kk_ = symbols('alpha beta kappa', real=True)
haz = expand(al*(2*x - y + kk_) + be*(z - x - y))
nh = V([haz.coeff(x), haz.coeff(y), haz.coeff(z)])
assert list(nh) == [2*al - be, -al - be, be]
vr = V([1, -2, 1])                    # r: x-2 = (1-y)/2 = z+3 = (y-1)/(-2)
Pr = V([2, 1, -3])
for tt in (0, 1, 2):                  # el punto + t*vr satisface x-2=(1-y)/2=z+3
    px, py, pz = list(Pr + tt*vr); assert (px - 2) == Rational(1 - py, 2) == (pz + 3)
tsol = solve([nh[0] - s*vr[0], nh[1] - s*vr[1], nh[2] - s*vr[2]], [al, be, s], dict=True)
assert tsol == [{al: s, be: s}]
plH = expand(haz.subs({al: 1, be: 1}))
assert plH == x - 2*y + z + kk_
assert solve(plH.subs({x: 2, y: 1, z: -3}), kk_) == [3]
plA = x - 2*y + z + 3; assert en_plano(plA, Pr)
# (b)
plB = haz.subs({al: 1, be: 0, kk_: 1}); assert plB == 2*x - y + 1
nB = V([2, -1, 0]); vL = V([1, 2, 1]); assert nB.dot(vL) == 0
PL = V([2, 0, 1]); assert plB.subs({x: 2, y: 0}) == 5 != 0       # L no está contenida
dB = abs(5)/nB.norm(); assert dB == sqrt(5)
# distancia independiente: minimizar sobre la recta (todo punto de L tiene la misma distancia)
for tt in (0, 3, -2):
    q = PL + tt*vL; assert abs(plB.subs({x: q[0], y: q[1]}))/sqrt(5) == sqrt(5)
# ej.4: x^2 + A(y-1)^2 + (z-3)^2 - 2x + A^2 = 0
AA = symbols('A', real=True)
S4 = x**2 + AA*(y-1)**2 + (z-3)**2 - 2*x + AA**2
comp = expand((x-1)**2 + AA*(y-1)**2 + (z-3)**2 - (1 - AA**2) - S4)
assert comp == 0
assert solve(1 - AA**2, AA) == [-1, 1]
# A=1 -> (x-1)^2+(y-1)^2+(z-3)^2=0 un punto; A=-1 -> cono
assert expand(S4.subs(AA, 1) - ((x-1)**2 + (y-1)**2 + (z-3)**2)) == 0
assert expand(S4.subs(AA, -1) - ((x-1)**2 - (y-1)**2 + (z-3)**2)) == 0
S4b = expand(S4.subs(AA, -2)); assert expand(S4b - ((x-1)**2 - 2*(y-1)**2 + (z-3)**2 + 3)) == 0
th = symbols('theta', real=True)
cur = {x: sqrt(3)*tan(th) + 1, y: sqrt(Rational(3, 2))/cos(th) + 1, z: 3}
assert simplify(S4b.subs(cur)) == 0
assert simplify(((x-1)**2 - 2*(y-1)**2 + (z-3)**2 + 3).subs(cur)) == 0
# forma canónica: -(x-1)^2/3 + (y-1)^2/(3/2) - (z-3)^2/3 = 1 (una variable positiva, dos hojas)
assert simplify(-(x-1)**2/3 + (y-1)**2/Rational(3, 2) - (z-3)**2/3 - 1 + ((x-1)**2 - 2*(y-1)**2 + (z-3)**2 + 3)/3) == 0

# =============== F-2022-02-16 ===============
# ej.1: u x X = w
u, w = V([-1, 3, 2]), V([1, 1, -1])
assert u.dot(w) == 0                                  # condición necesaria u ⟂ w
X = V(symbols('X1 X2 X3', real=True))
sol = solve(list(u.cross(X) - w), list(X), dict=True)
assert len(sol) == 1
x0 = w.cross(u)/u.dot(u); assert list(w.cross(u)) == [5, -1, 4] and u.dot(u) == 14
assert u.cross(x0) == w
for tt in (0, 1, -3, Rational(7, 5)):
    assert u.cross(x0 + tt*u) == w
gen = {X[0]: Rational(5, 14) - t, X[1]: Rational(-1, 14) + 3*t, X[2]: Rational(4, 14) + 2*t}
assert all(simplify(c_) == 0 for c_ in (u.cross(X.subs(gen)) - w))
# la solución del sistema es la misma familia
(sl,) = sol
fam = V([sl.get(X[i], X[i]) for i in range(3)])
free = list(fam.free_symbols)
assert len(free) == 1
f0 = free[0]
assert paralelos(fam - fam.subs(f0, 0), u) and u.cross(fam.subs(f0, 0)) == w
# ej.2
Pr1, dr1 = V([0, -3, 3]), V([4, 6, -2])
Pr2, dr2 = V([1, -2, 3]), V([2, 3, -1])
assert paralelos(dr1, dr2) and dr1 == 2*dr2
assert not paralelos(Pr2 - Pr1, dr2)                  # distintas (paralelas no coincidentes)
n_ = dr2.cross(Pr2 - Pr1); assert list(Pr2 - Pr1) == [1, 1, 0] and list(n_) == [1, -1, -1]
pl2 = expand(n_[0]*x + n_[1]*(y+3) + n_[2]*(z-3)); assert pl2 == x - y - z
assert en_plano(pl2, Pr1) and en_plano(pl2, Pr2) and n_.dot(dr1) == 0
# ej.4: 4x^2 + 9y^2 + 32x - 18y + 37 = 0
g4 = 4*x**2 + 9*y**2 + 32*x - 18*y + 37
assert expand(4*(x+4)**2 + 9*(y-1)**2 - 36 - g4) == 0
a4, b4 = 3, 2; c4 = sqrt(a4**2 - b4**2); assert c4 == sqrt(5)
assert Rational(2*b4**2, a4) == Rational(8, 3)
conica_ok(g4, [(-1, 1), (-7, 1), (-4, 3), (-4, -1)])
for xl in (-4 + sqrt(5), -4 - sqrt(5)):
    assert sorted(solve(g4.subs(x, xl), y)) == [Rational(-1, 3), Rational(7, 3)]
    assert Rational(7, 3) - Rational(-1, 3) == Rational(8, 3)
assert simplify(sqrt((-4-(-4+sqrt(5)))**2 + (3-1)**2) - 3) == 0    # d(A;F) = a
assert simplify(sqrt(5)/3) == sqrt(5)/3

# =============== F-2022-02-22 ===============
d1 = V([-2, -1, 2]); Pk = V([2, 3, k])
d2 = V([3, 4, 5]).cross(V([2, 2, 3])); assert list(d2) == [2, 1, -2] and d1 == -d2
Q2 = V([-1, 2, 0]); assert 3*Q2[0] + 4*Q2[1] + 5*Q2[2] == 5 and 2*Q2[0] + 2*Q2[1] + 3*Q2[2] == 2
cr = (Q2 - Pk).cross(d1)
assert list(map(expand, cr)) == [-2 - k, 2*k + 6, 1]
assert d1.norm() == 3
eq = expand(cr.dot(cr) - 74)
assert eq == 5*k**2 + 28*k - 33
assert sorted(solve(eq, k)) == [Rational(-33, 5), 1]
for kv in (1, Rational(-33, 5)):               # no hay coincidencia: Pk no está en L2
    Pq = Pk.subs(k, kv); assert not (3*Pq[0] + 4*Pq[1] + 5*Pq[2] == 5 and 2*Pq[0] + 2*Pq[1] + 3*Pq[2] == 2)
    assert simplify(((Q2 - Pq).cross(d1)).norm()/3 - sqrt(74)/3) == 0
n22 = (Q2 - Pk.subs(k, 2)).cross(d1); assert list(n22) == [-4, 10, 1]
pl22 = -4*x + 10*y + z - 24
assert en_plano(pl22, V([2, 3, 2])) and en_plano(pl22, Q2)
assert n22.dot(d1) == 0 and n22.dot(V([2, 1, -2])) == 0
# L2 está contenida: otro punto de L2: Q2 + s*d2
for tt in (1, -3):
    assert en_plano(pl22, Q2 + tt*d2) and en_plano(pl22, V([2, 3, 2]) + tt*d1)
# ej.4: A(x-2)^2 + B y^2 + C z^2 = 1
A_, B_, C_ = symbols('A_ B_ C_', real=True)
# x=2: B y^2 + C z^2 = 1, vértice (0;3) -> C = 1/9 ; foco c=sqrt5, a=3 -> b^2 = 4 -> B = 1/4
Cv = solve((C_*3**2 - 1), C_)[0]; assert Cv == Rational(1, 9)
bb2 = 3**2 - 5; assert bb2 == 4
Bv = Rational(1, bb2); assert Bv == Rational(1, 4)
Av = solve(A_*(4-2)**2 + Bv*0 + Cv*4**2 - 1, A_)[0]; assert Av == Rational(-7, 36)
S22 = Av*(x-2)**2 + Bv*y**2 + Cv*z**2 - 1
assert S22.subs({x: 4, y: 0, z: 4}) == 0
assert S22.subs({x: 2, y: 0, z: 3}) == 0
# hiperboloide de una hoja de eje x: un solo coeficiente negativo, el de (x-2)
assert Av < 0 and Bv > 0 and Cv > 0
curva = {x: 6/sqrt(7)*tan(th) + 2, y: 0, z: 3/cos(th)}
assert simplify(S22.subs(curva)) == 0
# y=0: -(x-2)^2/(36/7) + z^2/9 = 1 -> hipérbola de eje real z, a=3, b=6/sqrt7
assert simplify((-(x-2)**2/(Rational(36, 7)) + z**2/9 - 1) - S22.subs(y, 0)) == 0
# ej.5b: 5x^2 - 4xy + 8y^2 - 3 = 0
Q5 = Matrix([[5, -2], [-2, 8]]); assert Q5.eigenvals() == {4: 1, 9: 1}
assert Q5.det() == 36 > 0                            # autovalores del mismo signo -> elipse
assert 5*x**2 - 4*x*y + 8*y**2 == expand((Matrix([[x, y]])*Q5*Matrix([x, y]))[0])
# disc = B^2 - 4AC = 16 - 160 < 0
assert (-4)**2 - 4*5*8 == -144 < 0

# =============== F-2022-03-02 ===============
aa, bb = symbols('aa bb', real=True)
u1 = V([-1, 1, -2]); u2 = V([bb, 1, -1])
Aq = V([aa, 0, -1]); Bq = V([1, 0, -1])
# r1: x+y=a, 2y+z=-1 -> (a-t; t; -1-2t)
for tt in (0, 2, -1):
    Pq = Aq + tt*u1; assert Pq[0] + Pq[1] == aa and 2*Pq[1] + Pq[2] == -1
Matrix_ = Matrix.hstack(Bq - Aq, u1, u2)
assert expand(Matrix_.det()) in (1 - aa, aa - 1)
assert expand(u1.dot(u2)) == 3 - bb
assert solve([1 - aa, 3 - bb], [aa, bb], dict=True) == [{aa: 1, bb: 3}]
cross12 = u1.cross(u2); assert list(map(expand, cross12)) == [1, -2*bb - 1, -1 - bb]
# (b) a=0, b=-1
A0, u10, u20 = V([0, 0, -1]), V([-1, 1, -2]), V([-1, 1, -1])
assert not paralelos(u10, u20)
w2 = u10.cross(u20); assert list(w2) == [1, 1, 0]
AB = V([1, 0, -1]) - A0; assert list(AB) == [1, 0, 0]
d_b = abs(AB.dot(w2))/w2.norm(); assert d_b == sqrt(2)/2 and AB.dot(w2) == 1
# independiente: minimizar |P1(t)-P2(l)|^2
tt_, ll_ = symbols('tt_ ll_', real=True)
P1_ = A0 + tt_*u10; P2_ = V([1, 0, -1]) + ll_*u20
D2 = (P1_ - P2_).dot(P1_ - P2_)
sm = solve([diff(D2, tt_), diff(D2, ll_)], [tt_, ll_], dict=True)
assert len(sm) == 1 and simplify(sqrt(D2.subs(sm[0])) - sqrt(2)/2) == 0
# ej.3 (A-2)x^2 + y^2 + B z^2 = A
Ac, Bc = symbols('Ac Bc', real=True)
SS = (Ac - 2)*x**2 + y**2 + Bc*z**2 - Ac
assert SS.subs({Ac: 2, Bc: 2}) == y**2 + 2*z**2 - 2
# eje menor 2 -> semieje 1: y^2/2 + z^2/(2/B)=1; semiejes sqrt2 y sqrt(2/B)
assert solve(Eq(2/Bc, 1), Bc) == [2]
assert solve(Eq(sqrt(2), 1), Bc) == []               # la otra opción (y es el menor) es imposible
assert sqrt(2/2) < sqrt(2)                           # con B=2 el menor es el de z (=1)
Sb = SS.subs({Ac: 1, Bc: 1}); assert expand(Sb + x**2 - y**2 - z**2 + 1) == 0
tr = expand(Sb.subs(y, x)); assert tr == z**2 - 1
assert solve(tr, z) == [-1, 1]
for zz in (1, -1):
    assert Sb.subs({x: t, y: t, z: zz}) == 0


# =============== comprobaciones que figuran en los MDX ===============
# 2018 ej.1: plano por P1 con normal v1 x v2 y distancia de P2 al plano
assert expand(-8*(x-0) - 3*(y-1) - 5*(z-0)) == -8*x - 3*y - 5*z + 3
assert abs(8*2 + 3*1 + 5*0 - 3)/sqrt(64 + 9 + 25) == 16/(7*sqrt(2))
# 2018 ej.5: invariantes (traza y determinante) y punto L
assert Q.trace() == 2 and Q.det() == -3
# 2021 ej.1: con h=-7/2 las rectas se cortan en (-6;4;8)
hh = Rational(-7, 2)
lam_ = symbols('lam_')
Rl = V([0, 2, 1]) + lam_*V([3, -1, hh])
assert solve([Rl[0] - Rl[1] + Rl[2] + 2, 2*Rl[0] + Rl[1] + Rl[2]], [lam_], dict=True) == [{lam_: -2}]
assert list(Rl.subs(lam_, -2)) == [-6, 4, 8]
# 2022-02-15 ej.1a: r corta al plano en (2;1;-3); ej.4: el cono para A=-1 en la general
sr = symbols('sr'); rr = V([2, 1, -3]) + sr*V([1, -2, 1])
assert solve((x - 2*y + z + 3).subs({x: rr[0], y: rr[1], z: rr[2]}), sr) == [0]
assert expand(S4.subs(AA, -1) - ((x-1)**2 - (y-1)**2 + (z-3)**2)) == 0
# 2022-02-16 ej.1: otro miembro de la familia (s=2) y relación entre las dos formas
assert u.cross(V([2, -5, -3])) == w
assert V([0, 1, 1]) + Rational(5, 14)*V([1, -3, -2]) - V([-0, 0, 0]) == V([Rational(5, 14), 1 - Rational(15, 14), 1 - Rational(10, 14)]) == V([Rational(5, 14), Rational(-1, 14), Rational(4, 14)])
assert V([5, -1, 4]).dot(u) == 0
# 2022-02-22 ej.1: normas para k=1 y k=-33/5
assert V([-3, 8, 1]).dot(V([-3, 8, 1])) == 74 and V([Rational(23, 5), Rational(-36, 5), 1]).dot(V([Rational(23, 5), Rational(-36, 5), 1])) == 74
# 2022-02-22 ej.4: la parametrización y P(4;0;4) en la superficie; ej.5b: autovector de lambda=4
assert Q5.eigenvects()[0][0] in (4, 9)
assert (Q5 - 4*eye(2))*V([2, 1]) == zeros(2, 1)
# 2022-03-02 ej.1: con a=1,b=3 las rectas comparten el punto (1;0;-1)
assert Aq.subs(aa, 1) == V([1, 0, -1]) == Bq
assert u1.dot(u2.subs(bb, 3)) == 0

# =============== los MDX tienen los textos verificados ===============
def en_mdx(fname, *trozos):
    txt = (RAIZ / 'src' / 'content' / 'parciales' / fname).read_text(encoding='utf-8')
    for tr in trozos:
        assert tr in txt, f'{fname}: falta {tr!r}'
    assert 'Solución elaborada — no oficial, verificada con sympy' in txt, fname

SOL = {
 'final-2017-12-20.mdx': ['x-12y-7z-2=0', r'\frac{y^2}{4}-\frac{(x+3)^2}{9}=1', r'F(-3;\sqrt{13})', r'e=\tfrac{\sqrt{13}}{2}', "LL'=9", '4x^2-9y^2+24x+72=0', 'no contiene'],
 'final-2019-09-11.mdx': ['x-12y-7z-2=0', r'\frac{y^2}{4}-\frac{(x+3)^2}{9}=1', r'F(-3;\sqrt{13})', r'e=\tfrac{\sqrt{13}}{2}', "LL'=9", '4x^2-9y^2+24x+72=0', 'no contiene'],
 'final-2018-12-04.mdx': [r'k=0', r'\frac{8\sqrt2}{7}', r"-\frac{x'^2}{3}+y'^2=1", r'V(\tfrac{\sqrt2}{2};\tfrac{\sqrt2}{2})', r'F(\sqrt2;\sqrt2)'],
 'final-2019-07-02.mdx': [r'\left(\tfrac15;-\tfrac{16}5;\tfrac{17}5\right)', 'x-y-z=0', r'\frac{(x+4)^2}{12}+\frac{(y+4)^2}{16}=1', '4x^2+3y^2+32x+24y+64=0', r'e=\tfrac12'],
 'final-2021-02-09.mdx': [r'h=-\tfrac72', 'p=-4', 'q=-16'],
 'final-2022-02-15.mdx': ['x-2y+z+3=0', r'\sqrt5', 'A=-1', 'hiperboloide de dos hojas', r'x=1+\sqrt3\tan\theta'],
 'final-2022-02-16.mdx': [r'\vec x=\tfrac1{14}(5;-1;4)+t(-1;3;2)', 'x-y-z=0', r'\frac{(x+4)^2}{9}+\frac{(y-1)^2}{4}=1', r'e=\tfrac{\sqrt5}{3}'],
 'final-2022-02-22.mdx': [r'k=1', r'k=-\tfrac{33}{5}', '-4x+10y+z-24=0', 'hiperboloide de una hoja', r'x=2+\tfrac{6}{\sqrt7}\tan t', 'Falso'],
 'final-2022-03-02.mdx': ['a=1', 'b=3', r'\tfrac{\sqrt2}{2}', 'A=B=2', 'dos rectas paralelas'],
}
import sys
if '--solo-calculo' not in sys.argv:
    for f, tr in SOL.items():
        en_mdx(f, *tr)
print('OK: check_finales_1.py - todos los asserts pasan')
