export default {
  "id": "u7",
  "number": 7,
  "title": "Autovalores y autovectores",
  "subtitle": "Caracterización, autoespacios y diagonalización.",
  "pages": "143–149",
  "lessons": [
    {
      "id": "concepto-1",
      "title": "Definiciones y significado geométrico",
      "body": "Sea A una matriz cuadrada de orden n sobre un campo K (real o complejo). Un escalar λ es autovalor/valor propio de A si existe un vector v NO NULO tal que:\n\n$$Av=\\lambda v.$$\n\nEse v es autovector/vector propio asociado a λ. A es matriz del operador, v vector de entrada de n componentes, λ escalar. Para un operador T:V→V: T(v)=λv, v≠0. Es necesario que el operador vaya al mismo espacio para comparar salida con el vector original.\n\n**Interpretación real:** la imagen es un múltiplo del vector: si λ>0 conserva sentido; λ<0 invierte; λ=0 lo envía al origen. Si |λ|>1 aumenta longitud; 0<|λ|<1 la reduce; |λ|=1 conserva longitud. Para λ=0 la imagen no tiene dirección, por eso decir «es múltiplo de v» es más preciso que decir sin excepciones «siempre conserva dirección».\n\nv no puede ser cero porque A0=λ0 se verifica para cualquier λ y no caracteriza ningún autovalor. **λ sí puede ser cero**: corresponde a un vector no nulo del núcleo y A singular.  Es un esquema del caso λ>1, no una ilustración de todos los casos a la vez.",
      "visual": "eigen",
      "read": "",
      "question": "¿Por qué se excluye v=0 y no λ=0?",
      "answer": "El vector cero verificaría la igualdad para cualquier λ y no caracteriza autovalores. λ=0 sí puede ser autovalor y significa que hay un vector no nulo en el núcleo."
    },
    {
      "id": "concepto-2",
      "title": "Caracterización",
      "body": "Partir de Av=λv y escribir λv=λIv. Entonces:\n\n$$Av=\\lambda v\\ \\Longleftrightarrow\\ (A-\\lambda I_n)v=0.$$\n\nSe necesita una solución v≠0 del homogéneo. Para una matriz cuadrada eso ocurre si y solo si A−λI es singular, es decir:\n\n$$\\lambda\\text{ es autovalor de A}\\ \\Longleftrightarrow\\ \\det(A-\\lambda I_n)=0.$$\n\nI_n es identidad n×n. Se resta λ a cada entrada diagonal; las demás entradas no cambian. No restar λ a todas las entradas. El vector de la derecha es el nulo de Kⁿ. Es la misma relación «homogéneo con solución no trivial ↔ matriz singular» de U4.",
      "visual": "eigen-equation",
      "read": "",
      "question": "¿Por qué aparece el determinante en la caracterización?",
      "answer": "Se exige una solución no trivial de (A−λI)v=0. Para una matriz cuadrada eso equivale a det(A−λI)=0."
    },
    {
      "id": "concepto-3",
      "title": "Polinomio y ecuación característica",
      "body": "**Polinomio característico:** $p_A(\\lambda)=\\det(A-\\lambda I_n)$. Es un polinomio de grado n en λ. **Ecuación característica:** $p_A(\\lambda)=0$. Sus raíces, tomadas en el campo considerado, son los autovalores. La expresión del polinomio no es por sí sola una ecuación a resolver hasta igualarla a cero.\n\nEjemplo genérico de orden 2:\n\n$$A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix},\\quad\nA-\\lambda I=\\begin{pmatrix}a-\\lambda&b\\\\c&d-\\lambda\\end{pmatrix},$$\n\n$$p_A(\\lambda)=(a-\\lambda)(d-\\lambda)-bc\n=\\lambda^2-(a+d)\\lambda+(ad-bc).$$\n\n**Significado de los términos:** λ² es el de mayor grado (orden 2); a+d es traza de A; ad−bc es determinante de A; a,b,c,d son entradas fijas; λ es la variable del polinomio. Al resolver p=0 λ pasa a designar cada raíz/valor propio.\n\nEn orden n, con la convención det(A−λI): coeficiente principal (−1)ⁿ; coeficiente de λⁿ⁻¹ igual a (−1)ⁿ⁻¹ tr A; término independiente det A. Para orden 3:\n\n$$p_A(\\lambda)=-\\lambda^3+\\operatorname{tr}(A)\\lambda^2-s_2(A)\\lambda+\\det A,$$\n\ndonde $s_2(A)$ es suma de los menores principales de orden 2, obtenidos usando los mismos dos índices para filas y columnas. Para $A=(a_{ij})$ de orden 3:\n\n$$s_2=(a_{11}a_{22}-a_{12}a_{21})+(a_{11}a_{33}-a_{13}a_{31})+(a_{22}a_{33}-a_{23}a_{32}).$$\n\nLos coeficientes intermedios generales se relacionan con sumas de menores principales de cada orden. No son «la suma de todos los elementos» ni todos los menores arbitrarios. Si se usa alternativamente q=det(λI−A), q=(−1)ⁿp: mismas raíces, signos globales distintos. No mezclar ambas convenciones en un desarrollo.",
      "visual": "characteristic",
      "read": "",
      "question": "¿Qué diferencia hay entre polinomio y ecuación característica?",
      "answer": "El polinomio es p(λ)=det(A−λI); la ecuación se obtiene al igualarlo a cero."
    },
    {
      "id": "concepto-4",
      "title": "Cantidad de raíces y campo",
      "body": "Sobre los complejos, un polinomio característico de grado n tiene n raíces CONTANDO multiplicidades. No necesariamente n raíces distintas. Sobre reales puede no tener n raíces reales: las no reales aparecen en pares conjugados si A es real. ",
      "visual": "roots",
      "read": "",
      "question": "¿Siempre hay n autovalores reales distintos?",
      "answer": "No. Sobre ℂ hay n raíces contando multiplicidades. Sobre ℝ pueden faltar raíces reales."
    },
    {
      "id": "concepto-5",
      "title": "Subespacio propio y cálculo de autovectores",
      "body": "Para λ autovalor:\n\n$$E_\\lambda=\\ker(A-\\lambda I)=\\{v\\in K^n:Av=\\lambda v\\}.$$\n\nEλ es un subespacio e INCLUYE al nulo; sus elementos NO NULOS son los autovectores asociados a λ. El conjunto de autovectores sin agregar el cero no es un subespacio.\n\nProcedimiento: hallar p; resolver p=0; para cada raíz λi resolver (A−λiI)v=0; parametrizar; elegir una base del núcleo. No se necesita normalizar autovectores para que sean válidos; cualquier múltiplo no nulo sigue siendo autovector del mismo autovalor.",
      "visual": "eigenspace",
      "read": "",
      "question": "¿El autoespacio incluye al vector nulo?",
      "answer": "Sí. Eλ es un subespacio; sus elementos no nulos son los autovectores asociados a λ."
    },
    {
      "id": "concepto-6",
      "title": "Propiedades",
      "body": "- A y Aᵗ tienen el mismo polinomio y autovalores; sus autovectores no tienen por qué coincidir.\n- Una matriz triangular tiene como autovalores sus entradas diagonales, con multiplicidad.\n- La suma de autovalores es tr A y su producto det A, contando multiplicidades y raíces complejas cuando haga falta.\n- Autovectores asociados a autovalores DISTINTOS son LI.\n- Si A es invertible y Av=λv, entonces λ≠0 y A⁻¹v=λ⁻¹v. Mismo vector, autovalor recíproco.\n- Si Av=λv, entonces (kA)v=(kλ)v. Para k≠0 se conservan los autoespacios correspondientes bajo el cambio λ↦kλ; k=0 es caso degenerado (la matriz cero tiene a todo vector no nulo como autovector).\n- A real simétrica tiene autovalores reales, es diagonalizable por una base ortonormal real y los autoespacios de autovalores distintos son ortogonales.\n- A es singular si y solo si 0 es un autovalor. No confundir autovalor cero con autovector cero.",
      "visual": "eigen-properties",
      "read": "",
      "question": "¿Qué relación tienen los autovalores con traza y determinante?",
      "answer": "La suma es la traza y el producto el determinante, contando multiplicidades y raíces complejas cuando corresponda."
    },
    {
      "id": "concepto-7",
      "title": "Multiplicidad",
      "body": "Multiplicidad algebraica m_a(λ): veces que λ aparece como raíz de p. Multiplicidad geométrica m_g(λ): dimensión de Eλ, número de autovectores LI de ese autoespacio. Para cada autovalor, $1\\le m_g(\\lambda)\\le m_a(\\lambda)$. Tener una raíz repetida no impide por sí solo diagonalizar: hay que revisar el número de autovectores LI.",
      "visual": "multiplicity",
      "read": "",
      "question": "¿Una raíz doble garantiza dos autovectores LI?",
      "answer": "No. Hay que calcular la dimensión del autoespacio: su multiplicidad geométrica puede ser uno."
    },
    {
      "id": "concepto-8",
      "title": "Semejanza y diagonalización",
      "body": "A es diagonalizable sobre K si existe una matriz P invertible sobre K tal que:\n\n$$D=P^{-1}AP$$\n\nsea diagonal. P se llama matriz de paso/modal; sus columnas son autovectores LI de A. En D se colocan los autovalores en el MISMO orden que sus autovectores en P. n es orden de A; P,A,D son n×n. Geométricamente, se usa una base de direcciones propias para describir el mismo operador.\n\n**Caracterización:** diagonalizable ⇔ tiene n autovectores LI ⇔ existe una base de autovectores. Si el polinomio se descompone en el campo considerado, también equivale a que la suma de dimensiones de autoespacios sea n, o m_g=m_a para cada autovalor. n autovalores distintos en K son condición suficiente, no necesaria.\n\n**Ejemplos genéricos:** diag(λ,λ) es diagonalizable aunque repita autovalor; $\\begin{pmatrix}\\lambda&c\\\\0&\\lambda\\end{pmatrix}$ con c≠0 no lo es, porque Eλ tiene dimensión 1 y el orden es 2. λ,c son escalares fijos. Una matriz real con autovalores no reales no es diagonalizable sobre R; puede serlo sobre C.\n\n**Pasos:** calcular raíces; obtener bases de autoespacios; reunir n vectores LI; colocarlos por columnas en P; ordenar valores en D; verificar AP=PD o P⁻¹AP=D. Si no se reúnen n, no es diagonalizable en ese campo. No invertir P si sus columnas son dependientes.",
      "visual": "diagonalization",
      "read": "",
      "question": "¿Hacen falta n autovalores distintos para diagonalizar?",
      "answer": "No. Hacen falta n autovectores LI. Valores distintos son suficientes, pero no necesarios."
    }
  ]
};
