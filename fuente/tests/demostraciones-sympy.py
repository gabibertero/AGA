"""Self-check sympy de demostraciones.js: cada hueco 'ok' es correcto y las distractoras NO.
Uso: python3 tests/demostraciones-sympy.py  (requiere node + sympy)"""
import json, subprocess, os
from sympy import symbols, expand, simplify, Eq
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application, convert_xor
T = standard_transformations + (implicit_multiplication_application, convert_xor)
x, y, h, k, r, a, b, p, A, C, D, E, F = symbols('x y h k r a b p A C D E F')
S = dict(x=x, y=y, h=h, k=k, r=r, a=a, b=b, p=p)
P = lambda s: parse_expr(s, local_dict=S, transformations=T)
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
js = "import('./src/data/demostraciones.js').then(m=>console.log(JSON.stringify(m.DEMOSTRACIONES)))"
D_ = {d['id']: d for d in json.loads(subprocess.check_output(['node', '-e', js], cwd=root))}

# Ecuaciones como (miembro izq - miembro der)
ordin = {
 'demo-circunferencia': (x-h)**2+(y-k)**2-r**2,
 'demo-elipse': (x-h)**2/a**2+(y-k)**2/b**2-1,
 'demo-parabola': (x-h)**2-4*p*(y-k),
 'demo-parabola-horizontal': (y-k)**2-4*p*(x-h),
 'demo-hiperbola': (x-h)**2/a**2-(y-k)**2/b**2-1,
}
# factor por el que se multiplica la ordinaria para llegar a la general
factor = {'demo-circunferencia': 1, 'demo-elipse': a**2*b**2, 'demo-parabola': 1, 'demo-parabola-horizontal': 1, 'demo-hiperbola': a**2*b**2}
# general con los coeficientes identificados en los pasos finales
general = {
 'demo-circunferencia': x**2+y**2-2*h*x-2*k*y+(h**2+k**2-r**2),
 'demo-elipse': b**2*x**2+a**2*y**2-2*b**2*h*x-2*a**2*k*y+(b**2*h**2+a**2*k**2-a**2*b**2),
 'demo-parabola': x**2-2*h*x-4*p*y+(h**2+4*p*k),
 'demo-parabola-horizontal': y**2-2*k*y-4*p*x+(k**2+4*p*h),
 'demo-hiperbola': b**2*x**2-a**2*y**2-2*b**2*h*x+2*a**2*k*y+(b**2*h**2-a**2*k**2-a**2*b**2),
}
for i in ordin:  # 1) la cadena completa: ordinaria expandida == general
    assert expand(factor[i]*ordin[i] - general[i]) == 0, i

# 2) por paso: valor correcto de cada hueco (None = se chequea la línea contra 'general')
verdad = {
 'demo-circunferencia': [P('x^2-2hx+h^2'), P('y^2-2ky+k^2'), P('h^2+k^2-r^2'), P('-2h'), P('-2k'), P('h^2+k^2-r^2')],
 'demo-elipse': [P('a^2b^2'), P('b^2x^2-2b^2hx+b^2h^2'), P('a^2y^2-2a^2ky+a^2k^2'), P('b^2h^2+a^2k^2-a^2b^2'),
                 P('b^2'), P('a^2'), P('-2b^2h'), P('-2a^2k'), P('b^2h^2+a^2k^2-a^2b^2')],
 'demo-parabola': [P('x^2-2hx+h^2'), P('4py-4pk'), P('h^2+4pk'), P('-2h'), P('-4p'), P('h^2+4pk')],
 'demo-parabola-horizontal': [P('y^2-2ky+k^2'), P('4px-4ph'), P('k^2+4ph'), P('-4p'), P('-2k'), P('k^2+4ph')],
 'demo-hiperbola': [P('a^2b^2'), P('b^2x^2-2b^2hx+b^2h^2'), P('-a^2y^2+2a^2ky-a^2k^2'), P('b^2h^2-a^2k^2-a^2b^2'),
                    P('b^2'), P('-a^2'), P('-2b^2h'), P('2a^2k'), P('b^2h^2-a^2k^2-a^2b^2')],
}
n = 0
for i, d in D_.items():
    assert len(d['pasos']) == len(verdad[i]), f'{i}: nº de pasos'
    for j, (paso, v) in enumerate(zip(d['pasos'], verdad[i])):
        hueco = [s['b'] for s in paso['linea'] if 'b' in s]
        assert len(hueco) == 1, f'{i} paso {j+1}: un hueco'
        op, ok = hueco[0]['op'], hueco[0]['ok']
        for m, o in enumerate(op):
            igual = simplify(expand(P(o) - v)) == 0
            assert igual == (m == ok), f'{i} paso {j+1}: opción {o!r} {"debería" if m == ok else "NO debería"} ser correcta'
        n += 1
    # la línea 'reemplazá' (con la opción ok) arma exactamente la general
    for paso in d['pasos']:
        if paso['que'].startswith('Reemplaz'):
            tex = ''.join(s['t'] if 't' in s else s['b']['op'][s['b']['ok']] for s in paso['linea'])
            assert tex.endswith('=0'), i
            assert expand(P(tex[:-2]) - general[i]) == 0, f'{i}: línea reemplazá != general'
    print('OK', i, len(d['pasos']), 'pasos')
# 3) convención de cátedra: general Ax²+Cy²+... leída por coeficientes (C firmada)
def coef(g, v, e): return expand(g).coeff(v, e)
gh = general['demo-hiperbola']
assert simplify(coef(gh, y, 2) + a**2) == 0 and simplify(coef(gh, x, 2) - b**2) == 0, 'A = b^2, C = -a^2'
assert simplify(coef(gh, x, 1) + 2*b**2*h) == 0 and simplify(coef(gh, y, 1) - 2*a**2*k) == 0
gp = general['demo-parabola-horizontal']
assert (coef(gp, y, 2), coef(gp, x, 2), coef(gp, x, 1), coef(gp, y, 1)) == (1, 0, -4*p, -2*k)
assert simplify(expand(gp).subs({x: 0, y: 0}) - (k**2+4*p*h)) == 0
assert D_['demo-parabola']['general'].startswith('Ax^2') and D_['demo-hiperbola']['general'] == 'Ax^2+Cy^2+Dx+Ey+F=0'
assert not any('^' in (b.get('pista') or '') for d in D_.values() for ps in d['pasos'] for s_ in ps['linea'] if 'b' in s_ for b in [s_['b']]), 'pistas sin ^'
print('Huecos verificados:', n)
