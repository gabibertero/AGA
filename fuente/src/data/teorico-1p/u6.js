export default {
  "id": "u6",
  "number": 6,
  "title": "Transformaciones lineales",
  "subtitle": "Aplicaciones, linealidad, núcleo, imagen y representación.",
  "pages": "113–135",
  "lessons": [
    {
      "id": "concepto-1",
      "title": "Aplicación o transformación",
      "body": "Una aplicación $F:V\\to W$ es una función que a cada vector de V le asigna un único vector de W. V es dominio y W codominio. El vector F(v) es la imagen del vector v; el conjunto de todas las imágenes es la imagen o recorrido de F, contenido en W.\n\n**Condiciones constitutivas:** existencia para todo vector del dominio y unicidad de la imagen. Cada entrada tiene imagen; una entrada no tiene dos imágenes distintas. Distintas entradas pueden compartir imagen y no todos los elementos de W tienen que ser alcanzados. Eso último distingue aplicación de inyectividad y sobreyectividad. No declarar «uno a uno» ni «biunívoca» como condición para ser aplicación.\n\n Rotular V, W, v y F(v). Las flechas parten de todo elemento del dominio (el dibujo muestra representantes) y cada entrada tiene una sola salida. Una imagen puede recibir varias flechas.\n\nSi V2 y W3 designan espacios de dimensiones 2 y 3, se fijan bases ordenadas $(u_1,u_2)$ y $(w_1,w_2,w_3)$ para usar coordenadas genéricas; no identificar todos los espacios abstractos con flechas físicas sin explicación. Se puede ejemplificar con V2=$\\mathbb R^2$, W3=$\\mathbb R^3$:\n\n$$F(x,y)=(x,y,x^2).$$\n\nx,y son reales arbitrarios, la salida es una terna única. Es una aplicación y no es lineal por el término cuadrático. Si se trabaja con bases abstractas: $F(su_1+tu_2)=sw_1+tw_2+s^2w_3$, con s,t reales y ambas bases declaradas. Unicidad de coordenadas garantiza definición sin ambigüedad.",
      "visual": "application",
      "read": "",
      "question": "¿Qué dos condiciones definen una aplicación?",
      "answer": "Existencia de imagen para toda entrada del dominio y unicidad de esa imagen."
    },
    {
      "id": "concepto-2",
      "title": "Tipos de aplicación",
      "body": "Inyectiva: $F(u)=F(v)\\Rightarrow u=v$; no repite imágenes entre entradas distintas. Sobreyectiva: Im F=W; todo elemento del codominio tiene preimagen. Biyectiva: ambas; existe función inversa sobre W. Estas son propiedades adicionales posibles, no exigencias para ser aplicación. ",
      "visual": "map-types",
      "read": "",
      "question": "¿Ser aplicación exige ser biyectiva?",
      "answer": "No. Inyectividad y sobreyectividad son propiedades adicionales; una aplicación puede no cumplirlas."
    },
    {
      "id": "concepto-3",
      "title": "Transformación lineal",
      "body": "Una aplicación T:V→W entre espacios vectoriales sobre el MISMO campo es lineal si:\n\n$$T(u+v)=T(u)+T(v),\\qquad T(ku)=kT(u),$$\n\npara TODO u,v∈V y TODO escalar k. Primera: aditividad; segunda: homogeneidad. No basta que se cumplan para un ejemplo numérico ni con k particular. Equivalente: preserva combinaciones lineales, $T(au+bv)=aT(u)+bT(v)$ para todos los objetos adecuados.\n\nEjemplo genérico $T:\\mathbb R^2\\to\\mathbb R^3$:\n\n$$T(x,y)=(ax+by,cx+dy,ex+fy),$$\n\ncon a,b,c,d,e,f constantes reales fijas. Si $u=(u_1,u_2)$ y $v=(v_1,v_2)$, al distribuir se verifican ambas condiciones. Los coeficientes de T están fijos; u,v,k varían. No confundir escalar de la propiedad con los coeficientes de la ley.\n\nContraejemplo genérico que lleva nulo a nulo: F(x,y)=(x,y,x²). $F(ku)$ tiene tercera componente $k^2u_1^2$ y kF(u) tiene $ku_1^2$; no son iguales para todo k,u. Así T(0)=0 es necesario, pero no suficiente.",
      "visual": "linearity",
      "read": "",
      "question": "¿T(0)=0 alcanza para asegurar linealidad?",
      "answer": "No. F(x,y)=(x,y,x²) lleva cero a cero pero no conserva todos los productos por escalares."
    },
    {
      "id": "concepto-4",
      "title": "Consecuencias, tipos y operador",
      "body": "Si T es lineal: $T(0_V)=0_W$; $T(-v)=-T(v)$; $T(u-v)=T(u)-T(v)$; preserva cualquier combinación lineal finita. \n\nTransformación nula: T(v)=0_W para todo v; lineal entre cualesquiera V,W. Identidad: $I_V:V\\to V$, $I_V(v)=v$; lineal. Un operador lineal es una transformación lineal de V en SÍ MISMO; igual dimensión de dos espacios distintos no basta para llamarlo operador sin identificar dominio y codominio.",
      "visual": "operator",
      "read": "",
      "question": "¿Qué es un operador lineal?",
      "answer": "Una transformación lineal de un espacio vectorial en sí mismo."
    },
    {
      "id": "concepto-5",
      "title": "Núcleo e imagen",
      "body": "$$\\ker T=\\{v\\in V:T(v)=0_W\\},\\qquad\n\\operatorname{Im}T=\\{T(v):v\\in V\\}\\subseteq W.$$\n\nNúcleo: vectores de ENTRADA enviados al nulo del codominio. Imagen: vectores de SALIDA efectivamente alcanzados. El nulo 0_W está en la imagen porque T(0_V)=0_W. Para T lineal, ker T es subespacio de V e Im T subespacio de W.\n\nPara T(x)=Ax con A m×n: ker T es el conjunto solución de Ax=0 en $\\mathbb R^n$; Im T es espacio generado por columnas de A en $\\mathbb R^m$. Las columnas de A son las imágenes de la base canónica del dominio. Una base del núcleo se obtiene resolviendo el homogéneo y parametrizando; NO son, en general, las filas no nulas de A reducida.\n\n**Ejemplo genérico:** $T(x,y)=(ax+by,0)$ con a≠0 y b fijo. Núcleo: $\\{t(-b,a):t\\in\\mathbb R\\}$; imagen: $\\{(s,0):s\\in\\mathbb R\\}$. Aquí t y s son parámetros independientes y a,b datos.  La recta núcleo pertenece al dominio y se colapsa al origen; la recta imagen está en el codominio. No dibujar que toda entrada va al cero si solo pertenece al núcleo una recta.",
      "visual": "kernel",
      "read": "",
      "question": "¿Dónde están el núcleo y la imagen?",
      "answer": "El núcleo es subespacio del dominio; la imagen es subespacio del codominio."
    },
    {
      "id": "concepto-6",
      "title": "Rango, nulidad y teorema de la dimensión",
      "body": "Rango T = dim Im T; nulidad T = dim ker T. Si dim V=n es finita:\n\n$$\\dim V=\\dim\\ker T+\\dim\\operatorname{Im}T.$$\n\nEs rango–nulidad. Se suma la dimensión del núcleo y de la imagen y se obtiene dimensión del DOMINIO, no del codominio. Para A m×n: rango T=r(A), nulidad T=n−r(A). n es cantidad de columnas/variables de entrada; m cantidad de componentes de salida.\n\nT lineal es inyectiva ⇔ ker T={0_V}; sobreyectiva ⇔ Im T=W. Si V,W tienen igual dimensión finita, inyectividad, sobreyectividad y biyectividad son equivalentes; sin esa hipótesis no lo son. Si dim V>dim W, no puede ser inyectiva; si dim V<dim W, no puede ser sobreyectiva.",
      "visual": "rank-nullity",
      "read": "",
      "question": "¿Rango más nulidad da qué dimensión?",
      "answer": "La dimensión del dominio, si es finita. Para una matriz m×n, da n."
    },
    {
      "id": "concepto-7",
      "title": "Matriz estándar y matrices en otras bases",
      "body": "Para T:$\\mathbb R^n\\to\\mathbb R^m$ lineal, su matriz estándar es $A=(T(e_1)\\ \\cdots\\ T(e_n))$, colocando como columnas las imágenes de los vectores de la base canónica. Tiene m filas y n columnas, y T(x)=Ax.\n\nPara bases ordenadas B=(b1,…,bn) de V y C=(c1,…,cm) de W:\n\n$$[T(v)]_C=[T]_{C\\leftarrow B}[v]_B,\\qquad\n[T]_{C\\leftarrow B}=\\big([T(b_1)]_C\\ \\cdots\\ [T(b_n)]_C\\big).$$\n\nCada columna se calcula aplicando T al vector de la base de entrada y expresando la salida en la base C. No colocar simplemente T(bj) en coordenadas canónicas si la base de salida no es canónica.",
      "visual": "transform-matrix",
      "read": "",
      "question": "¿Cómo se forma la matriz de T en bases dadas?",
      "answer": "Cada columna contiene las coordenadas en la base de salida de la imagen de un vector de la base de entrada."
    },
    {
      "id": "concepto-8",
      "title": "Composición",
      "body": "Si T:V→W y S:W→U son lineales, $S\\circ T:V\\to U$ está dada por $(S\\circ T)(v)=S(T(v))$. Se aplica primero la de la derecha. En bases compatibles, su matriz es BA si A representa T y B representa S. Comprobar dimensiones. No invertir el orden del producto.\n\nLa identidad actúa como neutro para composición. Una transformación lineal biyectiva tiene inversa lineal; en bases compatibles, la matriz de la inversa es A⁻¹.",
      "visual": "composition",
      "read": "",
      "question": "¿Qué transformación se aplica primero en S∘T?",
      "answer": "Primero T y después S. Si sus matrices compatibles son A y B, la composición tiene matriz BA."
    },
    {
      "id": "concepto-9",
      "title": "Operadores geométricos en el plano",
      "body": "Operaciones sobre un vector genérico (x,y), con parámetros fijos:\n\n| Operador | Regla / matriz estándar |\n|---|---|\n| Dilatación / contracción uniforme | T(v)=kv; matriz kI; k>1 / 0<k<1. |\n| Reflexión respecto de eje x | (x,y)↦(x,−y); diag(1,−1). |\n| Proyección sobre eje x | (x,y)↦(x,0); diag(1,0). |\n| Rotación de ángulo θ | $\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$. |\n| Cizallamiento horizontal | (x,y)↦(x+ky,y); $\\begin{pmatrix}1&k\\\\0&1\\end{pmatrix}$. |\n\nθ es ángulo fijo (convencionalmente positivo antihorario), k parámetro real fijo. Trasladar por vector fijo b≠0, F(v)=v+b, NO es lineal porque F(0)=b≠0. No confundir trasladar un representante de vector libre con aplicar una traslación afín a todos los puntos.",
      "visual": "geometry",
      "read": "",
      "question": "¿Una traslación por un vector no nulo es lineal?",
      "answer": "No. F(v)=v+b con b≠0 cumple F(0)=b≠0."
    },
    {
      "id": "concepto-10",
      "title": "Semejanza / similaridad",
      "body": "A y D cuadradas del mismo orden son semejantes si existe P invertible tal que D=P⁻¹AP. Representan el mismo operador lineal en bases distintas. Si P lleva coordenadas de la base nueva C a la vieja B, $[v]_B=P[v]_C$, entonces la matriz nueva es $[T]_C=P^{-1}[T]_BP$. Declarar dirección de P antes de usar fórmula. Conservarán determinante, traza y autovalores. No confundir equivalencia por filas con semejanza.",
      "visual": "similarity",
      "read": "",
      "question": "¿Qué significa que dos matrices sean semejantes?",
      "answer": "Representan el mismo operador en bases distintas: D=P⁻¹AP para alguna P invertible."
    }
  ]
};
