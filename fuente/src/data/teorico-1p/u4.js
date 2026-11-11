export default {
  "id": "u4",
  "number": 4,
  "title": "Sistemas lineales",
  "subtitle": "Existencia, unicidad y métodos con sus hipótesis.",
  "pages": "61–75",
  "lessons": [
    {
      "id": "concepto-1",
      "title": "Ecuación y sistema lineal",
      "body": "Una ecuación lineal en n incógnitas se puede escribir $a_1x_1+\\cdots+a_nx_n=b$, donde los $a_i$ y b son constantes del campo considerado y los $x_i$ incógnitas. Las incógnitas aparecen a la primera potencia, no multiplicadas entre sí ni dentro de funciones no lineales.\n\nUn sistema lineal es un conjunto de m ecuaciones lineales en las mismas n incógnitas que deben satisfacerse simultáneamente. Una solución es una n-upla que verifica TODAS las ecuaciones. El conjunto solución reúne todas ellas. No basta satisfacer una sola ecuación.\n\n$$Ax=b,\\quad A\\in\\mathbb R^{m\\times n},\\ x\\in\\mathbb R^n,\\ b\\in\\mathbb R^m.$$\n\nA es matriz principal/de coeficientes, x vector de incógnitas y b de términos independientes. La ampliada es $[A\\mid b]$ y tiene m×(n+1). m y n pueden ser diferentes. Ejemplo genérico 2×2: $ax+by=p$, $cx+dy=q$; a,b,c,d,p,q son datos escalares; x,y incógnitas.",
      "visual": "system",
      "read": "",
      "question": "¿Qué debe verificar una solución de un sistema?",
      "answer": "Debe satisfacer simultáneamente todas las ecuaciones; verificar una sola no alcanza."
    },
    {
      "id": "concepto-2",
      "title": "Clasificaciones",
      "body": "**Homogéneo:** b=0. **No homogéneo:** b≠0; esto significa al menos un término independiente no nulo, no que todos deban serlo.\n\nPor soluciones: compatible determinado (SCD), una única; compatible indeterminado (SCI), infinitas sobre los reales; incompatible (SI), ninguna. Todo homogéneo es compatible porque x=0 es solución trivial. Puede tener solo esa o infinitas. No confundir «indeterminado» con «incompatible».",
      "visual": "systems",
      "read": "",
      "question": "¿Homogéneo significa solución única?",
      "answer": "No. Garantiza la solución trivial. Puede tener únicamente esa solución o infinitas."
    },
    {
      "id": "concepto-3",
      "title": "Equivalencia y operaciones",
      "body": "Dos sistemas son equivalentes si tienen el mismo conjunto solución. Las operaciones elementales reversibles sobre TODA la ampliada dan sistemas equivalentes: intercambio de ecuaciones; multiplicar por escalar no nulo; sumar a una un múltiplo de otra. Se operan también los términos independientes.",
      "visual": "row-ops",
      "read": "",
      "question": "¿Qué conservan los sistemas equivalentes?",
      "answer": "Exactamente el mismo conjunto solución. Las operaciones deben aplicarse a toda la ampliada."
    },
    {
      "id": "concepto-4",
      "title": "Rouché–Frobenius",
      "body": "**Enunciado:** Un sistema de ecuaciones lineales es compatible si y solo si el rango de su matriz de coeficientes coincide con el de su matriz ampliada.\n\nPara n incógnitas, $r=r(A)$ y $r'=r([A\\mid b])$:\n\n| Condición | Clasificación | Consecuencia |\n|---|---|---|\n| r=r'=n | SCD | Solución única. |\n| r=r'<n | SCI | n−r parámetros libres. |\n| r<r' | SI | No hay solución. |\n\nNo puede ocurrir r>r': agregar una columna no reduce rango. Una fila escalonada $[0\\ \\cdots\\ 0\\mid c]$ con c≠0 expresa 0=c, una contradicción. En un homogéneo, agregar la columna nula no cambia rango: siempre compatible.\n\nLa comparación de rangos decide la existencia; su comparación con n decide la unicidad o los grados de libertad.",
      "visual": "rouche",
      "read": "",
      "question": "¿Igualdad de rangos garantiza unicidad?",
      "answer": "No. Garantiza compatibilidad. Hay unicidad si el rango común coincide además con la cantidad n de incógnitas."
    },
    {
      "id": "concepto-5",
      "title": "Interpretación geométrica",
      "body": "Para dos ecuaciones genuinas de rectas en $\\mathbb R^2$ (cada una con algún coeficiente no nulo): SCD = rectas secantes; SCI = coincidentes; SI = paralelas distintas.  La solución es la intersección de las rectas. Las letras de las ecuaciones son parámetros; el dibujo ilustra casos y no fija coeficientes particulares.\n\nEn tres incógnitas, cada ecuación genuina representa un plano; la solución es su intersección común. Pueden tener punto, recta, plano, todo el espacio o vacío, según datos y ecuaciones. No generalizar «solución única = tres planos de cualquier forma» sin analizar intersección y rangos.",
      "visual": "systems",
      "read": "",
      "question": "¿Qué representa la solución geométricamente?",
      "answer": "La intersección común de las rectas o planos que representan las ecuaciones."
    },
    {
      "id": "concepto-6",
      "title": "Gauss y Gauss–Jordan",
      "body": "**Gauss:** construir ampliada; operaciones por filas para forma escalonada; clasificar; si es compatible, despejar por sustitución regresiva, parametrizando variables libres si las hay. **Gauss–Jordan:** continuar hasta forma escalonada reducida por filas; clasificar; leer variables principales en función de libres. Ambos sirven para sistemas cuadrados o rectangulares, homogéneos o no.\n\nEjemplo genérico común, bajo a≠0:\n\n$$\\left[\\begin{array}{cc|c}a&b&p\\\\c&d&q\\end{array}\\right]\n\\xrightarrow{F_2\\leftarrow F_2-(c/a)F_1}\n\\left[\\begin{array}{cc|c}a&b&p\\\\0&\\delta&\\eta\\end{array}\\right],$$\n\ndonde $\\delta=d-cb/a$ y $\\eta=q-cp/a$. a,b,c,d,p,q son datos.\n\n- Si δ≠0: Gauss obtiene $y=\\eta/\\delta$ y $x=(p-by)/a$. Para Jordan, normalizar fila 2 por δ, eliminar b sobre ese pivote, normalizar fila 1 por a: bloque izquierdo I.\n- Si δ=0, η≠0: SI (0=η).\n- Si δ=η=0: SCI; elegir y=t y $x=(p-bt)/a$, t real.\n- Si a=0: buscar intercambio o tratar columna libre; no dividir por cero.\n\n No son métodos con conjuntos solución diferentes.",
      "visual": "gauss",
      "read": "",
      "question": "¿Qué distingue Gauss de Gauss–Jordan?",
      "answer": "Gauss llega a escalonada y usa sustitución regresiva; Jordan continúa hasta reducida. Ambos conservan el conjunto solución."
    },
    {
      "id": "concepto-7",
      "title": "Método de la matriz inversa",
      "body": "Si A es cuadrada invertible, $Ax=b\\Rightarrow x=A^{-1}b$. Premultiplicar por la izquierda porque A está a la izquierda de x. Requiere det A≠0; produce solución única. Es válido también si b=0, dando x=0. Si A no es invertible, la fórmula no se aplica y hay que clasificar por rangos.",
      "visual": "inverse",
      "read": "",
      "question": "¿Cuándo se puede escribir x=A⁻¹b?",
      "answer": "Cuando A es cuadrada e invertible. También vale si b es cero."
    },
    {
      "id": "concepto-8",
      "title": "Cramer",
      "body": "Para n ecuaciones en n incógnitas con det A≠0:\n\n$$x_i=\\frac{\\det A_i}{\\det A},\\qquad i=1,\\ldots,n.$$\n\n$A_i$ se obtiene de A reemplazando SOLO su columna i por b, sin alterar el orden de las otras. $x_i$ es la incógnita i-ésima, no una matriz. Condiciones: sistema cuadrado y matriz regular; también admite homogéneos con solución trivial.\n\nEjemplo genérico 3×3:\n\n$$A=\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix},\\quad\nb_0=\\begin{pmatrix}p\\\\q\\\\r\\end{pmatrix},\\quad\nA_1=\\begin{pmatrix}p&b&c\\\\q&e&f\\\\r&h&i\\end{pmatrix}.$$\n\nAquí se llama $b_0$ al vector para distinguirlo de la entrada b de A. $A_2$ reemplaza columna 2 y $A_3$ columna 3 por el mismo vector. Después dividir cada determinante por det A. No aplicar cocientes cuando det A=0, ni concluir infinitas soluciones solo porque los determinantes de sustitución sean cero: usar rangos.",
      "visual": "cramer",
      "read": "",
      "question": "¿Qué se reemplaza para construir Aᵢ?",
      "answer": "Solo la columna i de A por el vector de términos independientes b. Se requiere det(A)≠0."
    },
    {
      "id": "concepto-9",
      "title": "Conexiones con las próximas unidades",
      "body": "Las soluciones de Ax=0 forman un subespacio de $\\mathbb R^n$ de dimensión n−r(A). Para Ax=b compatible, todas las soluciones son $x=x_p+z$, donde $x_p$ es una solución particular y z recorre el núcleo de A. Si b≠0, ese conjunto solución no contiene al nulo y no es subespacio. ",
      "visual": "affine",
      "read": "",
      "question": "¿Qué relación hay entre soluciones del homogéneo y del no homogéneo?",
      "answer": "Si xₚ es particular, todas las soluciones son xₚ+z, con Az=0."
    }
  ]
};
