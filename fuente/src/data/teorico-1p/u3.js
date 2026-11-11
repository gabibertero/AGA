export default {
  "id": "u3",
  "number": 3,
  "title": "Determinantes",
  "subtitle": "Del escalar asociado a la triangulación y la adjunta.",
  "pages": "47–54",
  "lessons": [
    {
      "id": "concepto-1",
      "title": "Determinante",
      "body": "El determinante es un escalar asociado a una matriz cuadrada. Se define como la suma de sus productos elementales con signo. Un producto elemental selecciona exactamente una entrada de cada fila y de cada columna; el signo depende de la paridad de la permutación correspondiente.\n\nPara A de orden n, se escribe $\\det(A)$ o $|A|$. n es número de filas y columnas; el resultado es un número, no otra matriz. No existe determinante ordinario para matrices rectangulares no cuadradas.\n\n$$\\det A=\\sum_{\\sigma\\in S_n}\\operatorname{sgn}(\\sigma)\\prod_{i=1}^{n}a_{i,\\sigma(i)}.$$\n\n$S_n$ es el conjunto de permutaciones de n índices; $\\sigma$ indica qué columna se elige para cada fila i; $\\operatorname{sgn}(\\sigma)$ vale +1 o −1; el producto selecciona una entrada por fila y columna. ",
      "visual": "determinant",
      "read": "",
      "question": "¿A qué matrices se les asocia un determinante?",
      "answer": "El determinante ordinario se define para matrices cuadradas y su resultado es un escalar."
    },
    {
      "id": "concepto-2",
      "title": "Métodos y alcance",
      "body": "Para orden 2: $\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc$. Para orden 3 se puede usar Sarrus:\n\n$$\\det\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix}=aei+bfg+cdh-ceg-bdi-afh.$$\n\nLas letras son entradas arbitrarias. **Sarrus es particular para 3×3**; no se extiende agregando diagonales a órdenes mayores. Métodos generales: desarrollo por cofactores (Laplace), triangulación y definición por permutaciones.",
      "visual": "sarrus",
      "read": "",
      "question": "¿Se puede aplicar Sarrus a una matriz de orden cuatro?",
      "answer": "No. Sarrus es particular para orden tres. Para orden cuatro sirven Laplace o triangulación."
    },
    {
      "id": "concepto-3",
      "title": "Menor complementario, cofactor y Laplace",
      "body": "El menor complementario $M_{ij}$ de una entrada $a_{ij}$ es el determinante de la submatriz obtenida al suprimir fila i y columna j. El cofactor o adjunto de ESA entrada es $C_{ij}=(-1)^{i+j}M_{ij}$. i,j son sus índices; la paridad fija el signo.\n\nDesarrollo por fila i: $\\det A=\\sum_{j=1}^n a_{ij}C_{ij}$. Por columna j: $\\det A=\\sum_{i=1}^n a_{ij}C_{ij}$. Elegir una sola fila o columna; cada entrada multiplica SU cofactor. Ejemplo genérico por primera fila de 3×3:\n\n$$\\det A=a(ei-fh)-b(di-fg)+c(dh-eg).$$\n\nSi una línea tiene ceros, disminuye la cantidad de términos que hay que evaluar. No omitir el signo alternado del cofactor.",
      "visual": "cofactor",
      "read": "",
      "question": "¿En qué se distinguen menor y cofactor?",
      "answer": "El menor es un determinante obtenido al suprimir una fila y una columna. El cofactor agrega el signo (−1)ⁱ⁺ʲ."
    },
    {
      "id": "concepto-4",
      "title": "Propiedades",
      "body": "1. $\\det(A^t)=\\det A$.\n2. Intercambiar dos filas o dos columnas cambia el signo. Dos filas/columnas iguales dan determinante cero.\n3. Si dos filas o dos columnas son proporcionales, el determinante es cero.\n4. Multiplicar UNA fila por k multiplica el determinante por k. Para TODA la matriz n×n: $\\det(kA)=k^n\\det A$.\n5. Una fila o columna nula implica determinante cero. La recíproca es falsa.\n6. Linealidad en una línea manteniendo las demás fijas. Consecuencia crucial: $F_i\\leftarrow F_i+kF_j$ con i≠j no cambia el determinante. También vale para columnas.\n7. Si A es triangular (incluida diagonal), $\\det A=\\prod_{i=1}^n a_{ii}$.\n8. Para A y B cuadradas del mismo orden: $\\det(AB)=\\det A\\det B$.\n9. Si A es invertible, $\\det(A^{-1})=1/\\det A$.\n\nLa propiedad 6 no significa que $\\det(A+B)=\\det A+\\det B$ para matrices arbitrarias: la linealidad se aplica a UNA línea por vez.\n\nEjemplo genérico de la consecuencia de 6:\n\n$$\\begin{vmatrix}a+kc&b+kd\\\\c&d\\end{vmatrix}=(a+kc)d-(b+kd)c=ad-bc.$$\n\nAquí $F_1\\leftarrow F_1+kF_2$ y k es cualquier escalar. Distinguir cambiar la matriz de cambiar su determinante.",
      "visual": "det-properties",
      "read": "",
      "question": "¿Qué pasa al multiplicar toda A por k?",
      "answer": "Si A tiene orden n, det(kA)=kⁿdet(A). Escalar una sola fila produce un único factor k."
    },
    {
      "id": "concepto-5",
      "title": "Triangulación",
      "body": "Se transforma una matriz cuadrada en una triangular mediante operaciones elementales y se calcula el producto de los elementos diagonales, compensando los cambios de signo y factores producidos por las operaciones.\n\nLa matriz inicial NO necesita ser triangular. Las sumas de múltiplos de otra fila conservan el determinante; los intercambios lo cambian de signo; multiplicar una fila por k lo multiplica por k. Si se quiere que las operaciones sean reversibles, k≠0.\n\nEjemplo genérico no triangulado:\n\n$$A=\\begin{pmatrix}a&b&c\\\\ka&d&e\\\\la&m&n\\end{pmatrix},\\qquad a\\ne0,\\ k\\ne0.$$\n\nLas letras son escalares; k≠0 asegura una entrada no nula debajo de la diagonal. Procedimiento:\n\n1. $F_2\\leftarrow F_2-kF_1$; $F_3\\leftarrow F_3-lF_1$.\n2. Nombrar $p=d-kb$, $q=e-kc$, $r=m-lb$, $s=n-lc$. Se obtiene $\\begin{pmatrix}a&b&c\\\\0&p&q\\\\0&r&s\\end{pmatrix}$.\n3. Si p≠0, $F_3\\leftarrow F_3-(r/p)F_2$ y queda $\\begin{pmatrix}a&b&c\\\\0&p&q\\\\0&0&s-rq/p\\end{pmatrix}$.\n4. Todas esas operaciones preservan el determinante. Por triangularidad:\n\n$$\\det A=ap(s-rq/p)=a(ps-rq).$$\n\nSi p=0 y r≠0, intercambiar filas 2 y 3 y compensar el signo; si p=r=0, ya es triangular y tiene diagonal con cero, por lo que det=0. Si el primer pivote a fuese cero, buscar intercambio posible en esa columna antes de dividir. Un pivote cero aislado NO autoriza a concluir singularidad.\n\nPara una 4×4: eliminar posiciones (2,1),(3,1),(4,1); luego (3,2),(4,2); luego (4,3), comprobando pivotes antes de dividir. Se obtiene T triangular y $\\det T=t_{11}t_{22}t_{33}t_{44}$. Si hubo s intercambios y factores de fila $k_1,\\ldots,k_q$ no nulos:\n\n$$\\det A=\\frac{(-1)^s\\det T}{k_1\\cdots k_q}.$$\n\ns es cantidad de intercambios; los k registran TODAS las multiplicaciones de filas; si no hubo escalados el denominador es 1. No confundir triangularizar con reducir a identidad.\n\n",
      "visual": "triangular",
      "read": "",
      "question": "¿Cómo se compensan intercambios y escalados al triangular?",
      "answer": "Cada intercambio cambia el signo y cada escalado multiplica el determinante por su factor. Para recuperar el original se compensan ambos efectos."
    },
    {
      "id": "concepto-6",
      "title": "Singularidad e inversa por adjunta",
      "body": "A cuadrada es regular/no singular si det A≠0, y singular si det A=0. En orden n: no singular equivale a rango n, inversibilidad y filas/columnas LI. Singular equivale a rango menor que n y dependencia de filas/columnas, no a «tiene alguna entrada cero».\n\nLa matriz de cofactores es $C=(C_{ij})$. La **matriz adjunta** es $\\operatorname{Adj}(A)=C^t$, la transpuesta de la matriz de cofactores. No confundir cofactor de una entrada con adjunta de la matriz completa.\n\n$$A^{-1}=\\frac{1}{\\det A}\\operatorname{Adj}(A),\\qquad\\det A\\ne0.$$\n\nPasos: calcular determinante y verificar no cero; calcular menores; aplicar signos; formar matriz de cofactores; transponer; dividir por el determinante. Justificación breve: $A\\operatorname{Adj}(A)=\\operatorname{Adj}(A)A=\\det(A)I$.\n\nEjemplo genérico 3×3 para $A=\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix}$:\n\n$$C=\\begin{pmatrix}ei-fh&fg-di&dh-eg\\\\ch-bi&ai-cg&bg-ah\\\\bf-ce&cd-af&ae-bd\\end{pmatrix}.$$\n\nLuego $\\operatorname{Adj}(A)=C^t$ y dividir por $a(ei-fh)-b(di-fg)+c(dh-eg)$ si es no nulo.",
      "visual": "adjugate",
      "read": "",
      "question": "¿Cómo se construye la adjunta?",
      "answer": "Se calculan los cofactores y se transpone su matriz. Si det(A)≠0, A⁻¹=Adj(A)/det(A)."
    }
  ]
};
