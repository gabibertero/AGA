export default {
  "id": "u5",
  "number": 5,
  "title": "Espacios vectoriales",
  "subtitle": "Operaciones, axiomas, subespacios, bases y dimensión.",
  "pages": "91–104",
  "lessons": [
    {
      "id": "concepto-1",
      "title": "Espacio vectorial",
      "body": "Un espacio vectorial real V es una estructura algebraica formada por un conjunto no vacío de objetos llamados vectores, con una suma y un producto por escalares reales que satisfacen los diez axiomas de espacio vectorial.\n\n**Elementos de la definición:**\n\n- **Conjunto V:** reúne los objetos con los que trabajamos. Pueden ser n-uplas, matrices, polinomios o funciones, no solo flechas.\n- **Estructura algebraica:** conjunto acompañado por operaciones y reglas. No es simplemente «una región del dibujo».\n- **Suma:** combina dos vectores del conjunto.\n- **Producto por escalar:** combina un número real con un vector.\n- **Axiomas:** condiciones que deben cumplir esas operaciones; no conclusiones deducidas ni valores numéricos particulares.\n\nLa naturaleza de los objetos puede variar; las reglas son lo común. Ejemplos: $\\mathbb R^n$ con operaciones usuales, matrices de un tamaño fijo, polinomios de grado a lo sumo r (incluido el polinomio cero). No usar «exactamente grado r» porque el cero y las sumas pueden salir del conjunto.\n\n Los esquemas representan pertenencia al conjunto; el escalar pertenece a $\\mathbb R$ y el resultado de ambas operaciones queda en V.",
      "visual": "space",
      "read": "",
      "question": "¿Por qué una matriz o un polinomio pueden llamarse vectores?",
      "answer": "Porque ser vector en esta estructura depende de satisfacer los axiomas con sus operaciones; no de tener forma de flecha."
    },
    {
      "id": "concepto-2",
      "title": "Leyes de composición interna y externa",
      "body": "La suma es ley de composición **interna**: $+:V\\times V\\to V$, $(u,v)\\mapsto u+v$. Ambas entradas y salida son vectores de V.\n\nEl producto por escalar es ley de composición **externa**: $\\mathbb R\\times V\\to V$, $(k,u)\\mapsto ku$. Se usa un escalar de un conjunto distinto, el campo de escalares; la salida sigue siendo un vector de V. «Externa» no significa que el resultado quede fuera de V.\n\nSímbolos: $\\times$ entre conjuntos significa producto cartesiano (pares de entradas); $\\to$ indica dominio y codominio; $\\mapsto$ muestra cómo se transforma una entrada. u,v son vectores, k real. No confundir producto cartesiano con producto vectorial.",
      "visual": "operations",
      "read": "",
      "question": "¿Externa significa que el resultado sale de V?",
      "answer": "No. El escalar pertenece al campo y la salida permanece en V."
    },
    {
      "id": "concepto-3",
      "title": "Diez axiomas",
      "body": "Para todo u,v,w en V y k,l reales:\n\n| Nº | Nombre | Expresión genérica |\n|---|---|---|\n| 1 | Cerradura de suma | $u+v\\in V$. |\n| 2 | Conmutativa de suma | $u+v=v+u$. |\n| 3 | Asociativa de suma | $(u+v)+w=u+(v+w)$. |\n| 4 | Neutro aditivo | Existe $0_V\\in V$ y $u+0_V=0_V+u=u$. |\n| 5 | Opuesto aditivo | Para cada u existe −u en V y $u+(-u)=0_V$. |\n| 6 | Cerradura de producto por escalar | $ku\\in V$. |\n| 7 | Distributiva respecto de vectores | $k(u+v)=ku+kv$. |\n| 8 | Distributiva respecto de escalares | $(k+l)u=ku+lu$. |\n| 9 | Asociativa de escalares | $k(lu)=(kl)u$. |\n| 10 | Identidad multiplicativa | $1u=u$. |\n\n0_V es el vector nulo del conjunto, no necesariamente el número cero; por ejemplo puede ser matriz nula o polinomio cero. 1 es el neutro del campo de escalares. Para ejemplificar un axioma en $\\mathbb R^3$, se toman $u=(u_1,u_2,u_3)$, v y w análogos y se escriben ambos miembros por componentes. Ejemplo axioma 7: $k(u+v)=(k(u_1+v_1),\\ldots,k(u_3+v_3))=(ku_1+kv_1,\\ldots,ku_3+kv_3)=ku+kv$. Las igualdades se justifican por distributividad de los reales.",
      "visual": "axioms",
      "read": "",
      "question": "¿Qué diferencia hay entre el cero vectorial y el uno escalar?",
      "answer": "El cero vectorial es el neutro de la suma de V; el uno escalar pertenece al campo y satisface 1u=u."
    },
    {
      "id": "concepto-4",
      "title": "Subespacio vectorial",
      "body": "Un subconjunto no vacío W de un espacio vectorial V es un subespacio de V si, con la misma suma y el mismo producto por escalares de V, W es también un espacio vectorial.\n\n**Condiciones:** W⊆V, contiene $0_V$, es cerrado para suma y producto por cualquier escalar del mismo campo. Equivalente: W no vacío y cerrado bajo ambas operaciones; el nulo se deduce tomando k=0. \n\nNo hay que verificar de nuevo las reglas que ya son válidas en V; cerradura y no vaciedad aseguran que las operaciones y los elementos necesarios quedan dentro de W. El opuesto se obtiene como (−1)u.\n\n**Ejemplo genérico:** $W=\\{(x,y,0):x,y\\in\\mathbb R\\}\\subset\\mathbb R^3$. Nulo: (0,0,0) cumple la condición. Si $u=(a,b,0)$ y $v=(c,d,0)$, entonces $u+v=(a+c,b+d,0)\\in W$; para k real, $ku=(ka,kb,0)\\in W$. El plano permanece cerrado.\n\n**Contraejemplo genérico:** $H=\\{(x,y,c):x,y\\in\\mathbb R\\}$ para c fijo no nulo. El vector cero no pertenece a H; por eso no es subespacio. Tampoco la suma de dos vectores de H queda en H: su tercera componente es 2c≠c. No confundir «subconjunto» y «subespacio».\n\n El dibujo muestra un plano por el origen, los vectores u,v y su suma. Un plano trasladado que no contiene origen falla. Pasar por el origen es necesario, pero solo eso no basta para un conjunto cualquiera (por ejemplo unión de dos rectas distintas).\n\nSubespacios triviales: {0_V} y V. En $\\mathbb R^2$: {0}, rectas por origen y todo el plano. En $\\mathbb R^3$: {0}, rectas y planos por origen, y todo el espacio.",
      "visual": "subspace",
      "read": "",
      "question": "¿Contener al vector nulo alcanza para ser subespacio?",
      "answer": "No. También debe ser cerrado bajo suma y bajo producto por todo escalar, con las operaciones de V."
    },
    {
      "id": "concepto-5",
      "title": "Generación y subespacio generado",
      "body": "Para $S=\\{v_1,\\ldots,v_r\\}\\subset V$, $\\operatorname{span}(S)=\\{a_1v_1+\\cdots+a_rv_r:a_i\\in\\mathbb R\\}$ es el conjunto de todas sus combinaciones lineales; es un subespacio. S **genera V** si span(S)=V, es decir, PARA TODO v en V existen coeficientes que lo expresan como combinación de S.\n\nUna cosa es generar algún subespacio y otra generar TODO el espacio indicado. Dos vectores LI en $\\mathbb R^3$ generan un plano, pero no $\\mathbb R^3$. \n\nPara caracterizar un subespacio generado, se puede expresar sus vectores con parámetros o mediante ecuaciones homogéneas que sean necesarias y suficientes para pertenecer. Relacionar con el sistema cuya matriz tiene como columnas los generadores.",
      "visual": "span",
      "read": "",
      "question": "¿Dos vectores LI de ℝ³ generan ℝ³?",
      "answer": "No. Generan un plano por el origen. Para generar ℝ³ hace falta alcanzar todo vector del espacio."
    },
    {
      "id": "concepto-6",
      "title": "LI y LD",
      "body": "LI: $a_1v_1+\\cdots+a_rv_r=0$ obliga a todos los coeficientes cero. LD: existe una relación con alguno no nulo. En un conjunto finito no vacío, LD equivale a que al menos un vector se expresa como combinación de los demás (considerando que el nulo es combinación vacía si solo hay un vector nulo).\n\n**Relación con generador:** no hay equivalencia general. Un conjunto LI puede no generar V y un generador puede ser LD. Coinciden como criterios alternativos de BASE si ya se sabe que el conjunto tiene exactamente n vectores y dim V=n.\n\n**Contraejemplos genéricos del modelo oficial:** si $B=\\{u,v,w\\}$ es base de un V de dimensión 3, {u,v} es LI y no genera V; {u,v,w,u+v} genera V y es LD. Aquí u,v,w son vectores arbitrarios de una base, sin coordenadas numéricas particulares. No afirmar que «no hay relación»: hay relación a través de base, dimensión y eliminación de redundancias.",
      "visual": "independence",
      "read": "",
      "question": "¿LI y conjunto generador son equivalentes?",
      "answer": "No en general. Una parte propia de una base es LI sin generar V; agregar a una base un vector redundante da un generador LD."
    },
    {
      "id": "concepto-7",
      "title": "Base",
      "body": "Una base de V es un conjunto de vectores de V que es linealmente independiente y genera V. Ambas condiciones son necesarias. Esto equivale a que cada vector de V admite una única expresión como combinación lineal de los vectores de la base.\n\nGenerar da existencia de la expresión; LI da unicidad. La base no tiene que ser ortogonal ni formada por versores. Base ordenada: además se fija el orden para definir coordenadas.\n\n**Ejemplo genérico en $\\mathbb R^3$:** $B=\\{(a,0,0),(b,c,0),(d,e,f)\\}$, con a,c,f no nulos. La matriz con esos vectores como columnas es triangular superior y su determinante es acf≠0. Por tanto sus columnas son LI y generan $\\mathbb R^3$. No confundir las tres filas con las tres columnas del ejemplo. ",
      "visual": "basis",
      "read": "El esquema muestra una base de dos vectores de un plano. El ejemplo algebraico de arriba construye una base de tres vectores de ℝ³.",
      "question": "¿Qué aporta cada condición de base?",
      "answer": "Generar asegura existencia de la expresión; la independencia lineal asegura su unicidad."
    },
    {
      "id": "concepto-8",
      "title": "Dimensión y teoremas de caracterización",
      "body": "En dimensión finita, la dimensión de V es la cantidad de vectores de cualquiera de sus bases; coincide con el máximo número de vectores LI. Todas las bases tienen igual cantidad, aunque sus vectores sean distintos. dim{0}=0 (base vacía); no decir que {0} es base del espacio cero porque contiene un vector dependiente.\n\nSi dim V=n: más de n vectores son LD; menos de n vectores no generan V; n vectores LI forman base; n vectores que generan forman base; un conjunto LI con menos de n vectores puede ampliarse a base; un generador finito puede reducirse a base eliminando redundancias. Para W⊆V subespacio, dim W≤dim V y, en dimensión finita, igualdad de dimensiones implica W=V.",
      "visual": "dimension",
      "read": "",
      "question": "¿Una base de un espacio de dimensión n puede tener más de n vectores?",
      "answer": "No. Todas sus bases tienen exactamente n vectores. Más de n vectores son LD."
    },
    {
      "id": "concepto-9",
      "title": "Coordenadas y cambio de base",
      "body": "Para una base ordenada $B=(b_1,\\ldots,b_n)$, todo v se escribe de manera única $v=c_1b_1+\\cdots+c_nb_n$. Su vector de coordenadas es $[v]_B=(c_1,\\ldots,c_n)^t$. Los c son coeficientes respecto de B; no confundirlos con el vector original como objeto.\n\nAl cambiar de B a C, v permanece igual y cambian sus coordenadas. Fijar siempre la dirección de la matriz:\n\n$$[v]_C=P_{C\\leftarrow B}[v]_B,\\quad\nP_{C\\leftarrow B}=\\big([b_1]_C\\ \\cdots\\ [b_n]_C\\big).$$\n\nSus columnas son las coordenadas de la base de origen B respecto de la base destino C. Es invertible; la transición inversa es su inversa. Para bases de $\\mathbb R^n$, si $M_B$ y $M_C$ tienen las bases por columnas en coordenadas canónicas, $P_{C\\leftarrow B}=M_C^{-1}M_B$.\n\n**Ejemplo genérico:** si $b_1=ac_1+bc_2$ y $b_2=dc_1+ec_2$, con c1,c2 vectores de C y a,b,d,e escalares, entonces $P_{C\\leftarrow B}=\\begin{pmatrix}a&d\\\\b&e\\end{pmatrix}$ y ae−bd≠0 por ser ambas bases.  La matriz permite traducir coordenadas, no desplaza el vector.",
      "visual": "change-basis",
      "read": "",
      "question": "¿Qué cambia al cambiar de base?",
      "answer": "Cambian sus coordenadas; el vector permanece igual. La matriz debe indicar base de origen y de destino."
    }
  ]
};
