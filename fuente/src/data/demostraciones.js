// Demostraciones guiadas: pasar de la ecuación ORDINARIA a la GENERAL de cada cónica,
// completando huecos de opción múltiple. NO es una página aparte: cada demostración es
// una "pregunta de aprendizaje" (tipo 'demo') que se mezcla en el banco de aprendizaje
// y se resuelve en el mismo flujo. El motor (aprendizaje.js) la dibuja con los huecos en
// orden; reusa los estilos .ap-opc (✓/✗) de la página de aprendizaje.
//
// Esquema de cada demostración (= ítem del banco, tipo 'demo'):
//   { id, tipo:'demo', titulo, unidad, ordinaria, general, pasos: [ paso ] }
//   ordinaria / general: TeX (sin $…$) que se muestran como punto de partida y resultado.
//   paso: { que, porque, linea }
//     que    = título corto del paso (texto; la matemática va entre $…$, el motor la renderiza con conTex).
//     pista (dentro del hueco) = texto plano (textContent): matemática en Unicode (r², a²b²), sin ^.
//     porque = justificación que se revela al acertar (texto; puede llevar TeX con \( \)).
//     linea  = lista de segmentos, en orden, que forman la igualdad del paso:
//       { t: '<TeX fijo>' }                              segmento fijo
//       { b: { op: ['<TeX>', …], ok: <idx>, pista? } }   un hueco (una opción correcta)
//   Convención: UN hueco por paso (en el celu es más claro). Las opciones son TeX.
//
// Para que entren al banco: en aprendizaje-banco.js importar DEMOSTRACIONES y spread-earlas
// en BANCO (recién cuando el motor maneje tipo 'demo').

export const DEMOSTRACIONES = [
  {
    id: 'demo-circunferencia',
    tipo: 'demo',
    titulo: 'Circunferencia',
    unidad: 'U10',
    ordinaria: '(x-h)^2+(y-k)^2=r^2',
    general: 'x^2+y^2+Dx+Ey+F=0',
    pasos: [
      {
        que: 'Desarrollá el cuadrado en x',
        porque: 'Cuadrado del binomio: el doble producto lleva signo menos, \\((x-h)^2 = x^2 - 2hx + h^2\\).',
        linea: [
          { t: '(x-h)^2 =' },
          { b: { op: ['x^2-2hx+h^2', 'x^2-h^2', 'x^2+2hx+h^2'], ok: 0, pista: 'el término del medio va restando' } },
        ],
      },
      {
        que: 'Desarrollá el cuadrado en y',
        porque: 'Mismo binomio, ahora con \\(y\\) y \\(k\\): \\((y-k)^2 = y^2 - 2ky + k^2\\).',
        linea: [
          { t: '(y-k)^2 =' },
          { b: { op: ['y^2-2ky+k^2', 'y^2+k^2', 'y^2-2ky-k^2'], ok: 0 } },
        ],
      },
      {
        que: 'Reemplazá e igualá a cero',
        porque: 'Sustituís los dos desarrollos y pasás \\(r^2\\) al otro miembro: queda el término independiente \\(h^2 + k^2 - r^2\\).',
        linea: [
          { t: 'x^2+y^2-2hx-2ky+' },
          { b: { op: ['h^2+k^2-r^2', 'h^2+k^2+r^2', 'r^2-h^2-k^2'], ok: 0, pista: 'r² estaba a la derecha; pasa restando' } },
          { t: '=0' },
        ],
      },
      {
        que: 'Identificá D (coeficiente de x)',
        porque: 'Comparando con \\(x^2+y^2+Dx+Ey+F=0\\), el coeficiente de \\(x\\) es \\(D = -2h\\).',
        linea: [
          { t: 'D =' },
          { b: { op: ['-2h', '2h', '-h'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá E (coeficiente de y)',
        porque: 'El coeficiente de \\(y\\) es \\(E = -2k\\).',
        linea: [
          { t: 'E =' },
          { b: { op: ['-2k', '2k', '-k'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá F (término independiente)',
        porque: 'El término sin \\(x\\) ni \\(y\\) es \\(F = h^2 + k^2 - r^2\\). Con \\(A = C = 1\\) (iguales) es una circunferencia.',
        linea: [
          { t: 'F =' },
          { b: { op: ['h^2+k^2-r^2', 'h^2+k^2', '-r^2'], ok: 0 } },
        ],
      },
    ],
  },
  {
    id: 'demo-elipse',
    tipo: 'demo',
    titulo: 'Elipse (eje focal ∥ al eje x, a > b)',
    unidad: 'U10',
    ordinaria: '\\dfrac{(x-h)^2}{a^2}+\\dfrac{(y-k)^2}{b^2}=1',
    general: 'Ax^2+Cy^2+Dx+Ey+F=0',
    pasos: [
      {
        que: 'Sacá los denominadores (× $a^2b^2$)',
        porque: 'Multiplicás ambos miembros por \\(a^2 b^2\\): cada fracción pierde su denominador y el \\(1\\) de la derecha queda \\(a^2 b^2\\).',
        linea: [
          { t: 'b^2(x-h)^2+a^2(y-k)^2=' },
          { b: { op: ['a^2b^2', '1', 'a^2+b^2'], ok: 0, pista: '1 multiplicado por a²b²' } },
        ],
      },
      {
        que: 'Desarrollá $b^2(x-h)^2$',
        porque: '\\(b^2(x-h)^2 = b^2x^2 - 2b^2hx + b^2h^2\\).',
        linea: [
          { t: 'b^2(x-h)^2=' },
          { b: { op: ['b^2x^2-2b^2hx+b^2h^2', 'b^2x^2-b^2h^2', 'b^2(x^2-h^2)'], ok: 0 } },
        ],
      },
      {
        que: 'Desarrollá $a^2(y-k)^2$',
        porque: '\\(a^2(y-k)^2 = a^2y^2 - 2a^2ky + a^2k^2\\).',
        linea: [
          { t: 'a^2(y-k)^2=' },
          { b: { op: ['a^2y^2-2a^2ky+a^2k^2', 'a^2y^2+a^2k^2', 'a^2(y^2-k^2)'], ok: 0 } },
        ],
      },
      {
        que: 'Reemplazá y ordená igualando a cero',
        porque: 'Sustituís los dos desarrollos y pasás \\(a^2 b^2\\) restando: el término independiente es \\(b^2h^2 + a^2k^2 - a^2b^2\\).',
        linea: [
          { t: 'b^2x^2+a^2y^2-2b^2hx-2a^2ky+' },
          { b: { op: ['b^2h^2+a^2k^2-a^2b^2', 'b^2h^2+a^2k^2+a^2b^2', 'a^2b^2-b^2h^2-a^2k^2'], ok: 0, pista: 'a²b² estaba a la derecha; pasa restando' } },
          { t: '=0' },
        ],
      },
      {
        que: 'Identificá A (coeficiente de $x^2$)',
        porque: 'El número que multiplica a \\(x^2\\) es \\(A = b^2\\).',
        linea: [
          { t: 'A=' },
          { b: { op: ['b^2', 'a^2', '1'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá C (coeficiente de $y^2$)',
        porque: 'El número que multiplica a \\(y^2\\) es \\(C = a^2\\).',
        linea: [
          { t: 'C=' },
          { b: { op: ['a^2', 'b^2', '1'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá D (coeficiente de x)',
        porque: '\\(D = -2b^2h\\).',
        linea: [
          { t: 'D=' },
          { b: { op: ['-2b^2h', '-2a^2h', '2b^2h'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá E (coeficiente de y)',
        porque: '\\(E = -2a^2k\\).',
        linea: [
          { t: 'E=' },
          { b: { op: ['-2a^2k', '-2b^2k', '2a^2k'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá F (término independiente)',
        porque: '\\(F = b^2h^2 + a^2k^2 - a^2b^2\\). Como \\(A = b^2\\) y \\(C = a^2\\) tienen el mismo signo (y son distintos), es una elipse; si fueran iguales sería una circunferencia.',
        linea: [
          { t: 'F=' },
          { b: { op: ['b^2h^2+a^2k^2-a^2b^2', 'b^2h^2+a^2k^2', '-a^2b^2'], ok: 0 } },
        ],
      },
    ],
  },
  {
    id: 'demo-parabola',
    tipo: 'demo',
    titulo: 'Parábola (eje ∥ al eje y)',
    unidad: 'U10',
    ordinaria: '(x-h)^2=4p(y-k)',
    general: 'Ax^2+Dx+Ey+F=0',
    pasos: [
      {
        que: 'Desarrollá el cuadrado en x',
        porque: 'Cuadrado del binomio: el doble producto lleva signo menos, \\((x-h)^2 = x^2 - 2hx + h^2\\).',
        linea: [
          { t: '(x-h)^2 =' },
          { b: { op: ['x^2-2hx+h^2', 'x^2-h^2', 'x^2+2hx+h^2'], ok: 0, pista: 'el término del medio va restando' } },
        ],
      },
      {
        que: 'Distribuí 4p en el segundo miembro',
        porque: 'La propiedad distributiva multiplica \\(4p\\) por cada término del paréntesis: \\(4p(y-k) = 4py - 4pk\\).',
        linea: [
          { t: '4p(y-k) =' },
          { b: { op: ['4py-4pk', '4py-k', '4py+4pk'], ok: 0, pista: '4p multiplica a los dos términos' } },
        ],
      },
      {
        que: 'Reemplazá e igualá a cero',
        porque: 'Sustituís los dos desarrollos y pasás todo al primer miembro: \\(4p(y-k)\\) cambia de signo, así que aparece \\(-4py\\) y \\(+4pk\\). El término independiente es \\(h^2 + 4pk\\).',
        linea: [
          { t: 'x^2-2hx-4py+' },
          { b: { op: ['h^2+4pk', 'h^2-4pk', 'h^2+pk'], ok: 0, pista: 'al pasar -4pk restando, cambia a +4pk' } },
          { t: '=0' },
        ],
      },
      {
        que: 'Identificá D (coeficiente de x)',
        porque: 'Comparando con \\(Ax^2+Dx+Ey+F=0\\) (acá \\(A = 1\\)), el coeficiente de \\(x\\) es \\(D = -2h\\).',
        linea: [
          { t: 'D =' },
          { b: { op: ['-2h', '2h', '-h'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá E (coeficiente de y)',
        porque: 'El coeficiente de \\(y\\) es \\(E = -4p\\).',
        linea: [
          { t: 'E =' },
          { b: { op: ['-4p', '4p', '-p'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá F (término independiente)',
        porque: 'El término sin \\(x\\) ni \\(y\\) es \\(F = h^2 + 4pk\\). Hay un solo término cuadrático (\\(x^2\\), con \\(C = 0\\)): es una parábola de eje paralelo a y.',
        linea: [
          { t: 'F =' },
          { b: { op: ['h^2+4pk', 'h^2-4pk', '4pk'], ok: 0 } },
        ],
      },
    ],
  },
  {
    id: 'demo-parabola-horizontal',
    tipo: 'demo',
    titulo: 'Parábola (eje ∥ al eje x)',
    unidad: 'U10',
    ordinaria: '(y-k)^2=4p(x-h)',
    general: 'Cy^2+Dx+Ey+F=0',
    pasos: [
      {
        que: 'Desarrollá el cuadrado en y',
        porque: 'Cuadrado del binomio: el doble producto lleva signo menos, \\((y-k)^2 = y^2 - 2ky + k^2\\).',
        linea: [
          { t: '(y-k)^2 =' },
          { b: { op: ['y^2-2ky+k^2', 'y^2-k^2', 'y^2+2ky+k^2'], ok: 0, pista: 'el término del medio va restando' } },
        ],
      },
      {
        que: 'Distribuí 4p en el segundo miembro',
        porque: 'La propiedad distributiva multiplica \\(4p\\) por cada término del paréntesis: \\(4p(x-h) = 4px - 4ph\\).',
        linea: [
          { t: '4p(x-h) =' },
          { b: { op: ['4px-4ph', '4px-h', '4px+4ph'], ok: 0, pista: '4p multiplica a los dos términos' } },
        ],
      },
      {
        que: 'Reemplazá e igualá a cero',
        porque: 'Sustituís los dos desarrollos y pasás todo al primer miembro: \\(4p(x-h)\\) cambia de signo, así que aparece \\(-4px\\) y \\(+4ph\\). El término independiente es \\(k^2 + 4ph\\).',
        linea: [
          { t: 'y^2-2ky-4px+' },
          { b: { op: ['k^2+4ph', 'k^2-4ph', 'k^2+ph'], ok: 0, pista: 'al pasar -4ph restando, cambia a +4ph' } },
          { t: '=0' },
        ],
      },
      {
        que: 'Identificá D (coeficiente de x)',
        porque: 'Comparando con \\(Cy^2+Dx+Ey+F=0\\) (acá \\(C = 1\\)), el coeficiente de \\(x\\) es \\(D = -4p\\). Ojo: respecto de la parábola vertical, D y E se intercambian.',
        linea: [
          { t: 'D =' },
          { b: { op: ['-4p', '4p', '-p'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá E (coeficiente de y)',
        porque: 'El coeficiente de \\(y\\) es \\(E = -2k\\).',
        linea: [
          { t: 'E =' },
          { b: { op: ['-2k', '2k', '-k'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá F (término independiente)',
        porque: 'El término sin \\(x\\) ni \\(y\\) es \\(F = k^2 + 4ph\\). Hay un solo término cuadrático (\\(y^2\\), con \\(A = 0\\)): es una parábola de eje paralelo a x.',
        linea: [
          { t: 'F =' },
          { b: { op: ['k^2+4ph', 'k^2-4ph', '4ph'], ok: 0 } },
        ],
      },
    ],
  },
  {
    id: 'demo-hiperbola',
    tipo: 'demo',
    titulo: 'Hipérbola (eje transverso ∥ al eje x)',
    unidad: 'U10',
    ordinaria: '\\dfrac{(x-h)^2}{a^2}-\\dfrac{(y-k)^2}{b^2}=1',
    general: 'Ax^2+Cy^2+Dx+Ey+F=0',
    pasos: [
      {
        que: 'Sacá los denominadores (× $a^2b^2$)',
        porque: 'Multiplicás ambos miembros por \\(a^2 b^2\\): cada fracción pierde su denominador y el \\(1\\) de la derecha queda \\(a^2 b^2\\).',
        linea: [
          { t: 'b^2(x-h)^2-a^2(y-k)^2=' },
          { b: { op: ['a^2b^2', '1', 'a^2-b^2'], ok: 0, pista: '1 multiplicado por a²b²' } },
        ],
      },
      {
        que: 'Desarrollá $b^2(x-h)^2$',
        porque: '\\(b^2(x-h)^2 = b^2x^2 - 2b^2hx + b^2h^2\\).',
        linea: [
          { t: 'b^2(x-h)^2=' },
          { b: { op: ['b^2x^2-2b^2hx+b^2h^2', 'b^2x^2-b^2h^2', 'b^2(x^2-h^2)'], ok: 0 } },
        ],
      },
      {
        que: 'Desarrollá $-a^2(y-k)^2$',
        porque: 'El signo menos delante de \\(a^2\\) afecta a los tres términos del desarrollo: \\(-a^2(y-k)^2 = -a^2y^2 + 2a^2ky - a^2k^2\\).',
        linea: [
          { t: '-a^2(y-k)^2=' },
          { b: { op: ['-a^2y^2+2a^2ky-a^2k^2', '-a^2y^2-2a^2ky-a^2k^2', '-a^2y^2+2a^2ky+a^2k^2'], ok: 0, pista: 'el signo − cambia los tres términos de (y−k)²' } },
        ],
      },
      {
        que: 'Reemplazá y ordená igualando a cero',
        porque: 'Sustituís los dos desarrollos y pasás \\(a^2 b^2\\) restando: el término independiente es \\(b^2h^2 - a^2k^2 - a^2b^2\\).',
        linea: [
          { t: 'b^2x^2-a^2y^2-2b^2hx+2a^2ky+' },
          { b: { op: ['b^2h^2-a^2k^2-a^2b^2', 'b^2h^2+a^2k^2-a^2b^2', 'a^2b^2-b^2h^2+a^2k^2'], ok: 0, pista: 'a²b² estaba a la derecha; pasa restando' } },
          { t: '=0' },
        ],
      },
      {
        que: 'Identificá A (coeficiente de $x^2$)',
        porque: 'El número que multiplica a \\(x^2\\) es \\(A = b^2\\) (positivo; C va a salir negativo).',
        linea: [
          { t: 'A=' },
          { b: { op: ['b^2', 'a^2', '-b^2'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá C (coeficiente de $y^2$)',
        porque: 'El término es \\(-a^2y^2\\), así que \\(C = -a^2\\). Como \\(A = b^2 > 0\\) y \\(C < 0\\), tienen signo distinto: es lo que reconoce a la hipérbola.',
        linea: [
          { t: 'C=' },
          { b: { op: ['-a^2', 'a^2', '-b^2'], ok: 0, pista: 'es el coeficiente de y² tal cual, con su signo' } },
        ],
      },
      {
        que: 'Identificá D (coeficiente de x)',
        porque: '\\(D = -2b^2h\\).',
        linea: [
          { t: 'D=' },
          { b: { op: ['-2b^2h', '-2a^2h', '2b^2h'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá E (coeficiente de y)',
        porque: '\\(E = 2a^2k\\) (el signo es positivo por el menos que traía \\(-a^2(y-k)^2\\)).',
        linea: [
          { t: 'E=' },
          { b: { op: ['2a^2k', '-2a^2k', '2b^2k'], ok: 0 } },
        ],
      },
      {
        que: 'Identificá F (término independiente)',
        porque: '\\(F = b^2h^2 - a^2k^2 - a^2b^2\\). Como \\(A = b^2 > 0\\) y \\(C = -a^2 < 0\\) tienen signo distinto, es una hipérbola.',
        linea: [
          { t: 'F=' },
          { b: { op: ['b^2h^2-a^2k^2-a^2b^2', 'b^2h^2+a^2k^2-a^2b^2', 'b^2h^2-a^2k^2'], ok: 0 } },
        ],
      },
    ],
  },
];
