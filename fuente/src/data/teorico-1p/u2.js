export default {
  "id": "u2",
  "number": 2,
  "title": "Matrices",
  "subtitle": "Elementos, operaciones y condiciones de operabilidad.",
  "pages": "25–36",
  "lessons": [
    {
      "id": "elementos",
      "title": "Concepto, notación y elementos",
      "body": "Una matriz es un arreglo rectangular de elementos dispuestos en m filas y n columnas. Se escribe $A=(a_{ij})\\in\\mathbb R^{m\\times n}$ (o sobre $\\mathbb C$ si se especifica). m y n son enteros positivos; i identifica fila y j columna; $a_{ij}$ es la entrada en esa posición. El tamaño es m×n, filas primero. No llamar determinante a una matriz. Una matriz de orden 3 es cuadrada 3×3.\n\n$$A=\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix}.$$\n\nLas letras representan elementos arbitrarios del campo; i en esta matriz es solo una entrada, no la unidad imaginaria.  ",
      "visual": "matrix",
      "read": "",
      "question": "¿Qué indican los subíndices de una entrada?",
      "answer": "El primer subíndice identifica la fila y el segundo la columna. El tamaño se escribe filas por columnas."
    },
    {
      "id": "fila-columna",
      "title": "Matriz fila / columna",
      "body": "**Fila / columna**: Tamaño 1×n / m×1.\n\n$$F=\\begin{pmatrix}a&b&c\\end{pmatrix},\\qquad C=\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-fila-columna",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Tamaño 1×n / m×1."
    },
    {
      "id": "rectangular",
      "title": "Matriz rectangular horizontal / vertical",
      "body": "**Rectangular horizontal / vertical**: m<n / m>n.\n\n$$A\\in\\mathbb R^{m\\times n},\\quad m<n\\text{ o }m>n.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-rectangular",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "m<n / m>n."
    },
    {
      "id": "cuadrada",
      "title": "Matriz cuadrada",
      "body": "**Cuadrada**: m=n.\n\n$$A\\in\\mathbb R^{n\\times n}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-cuadrada",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "m=n."
    },
    {
      "id": "nula",
      "title": "Matriz nula",
      "body": "**Nula**: Todas las entradas cero.\n\n$$0_{m\\times n}=(0).$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-nula",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Todas las entradas cero."
    },
    {
      "id": "diagonal",
      "title": "Matriz diagonal",
      "body": "**Diagonal**: Cuadrada, $a_{ij}=0$ cuando i≠j.\n\n$$D=\\begin{pmatrix}a&0&0\\\\0&b&0\\\\0&0&c\\end{pmatrix}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-diagonal",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Cuadrada, $a_{ij}=0$ cuando i≠j."
    },
    {
      "id": "escalar",
      "title": "Matriz escalar",
      "body": "**Escalar**: Diagonal, todas las entradas diagonales iguales al mismo escalar k.\n\n$$kI_n=\\begin{pmatrix}k&0&0\\\\0&k&0\\\\0&0&k\\end{pmatrix}\\quad(n=3).$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-escalar",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Diagonal, todas las entradas diagonales iguales al mismo escalar k."
    },
    {
      "id": "identidad",
      "title": "Matriz identidad Iₙ",
      "body": "**Identidad $I_n$**: Diagonal con unos en la diagonal.\n\n$$I_3=\\begin{pmatrix}1&0&0\\\\0&1&0\\\\0&0&1\\end{pmatrix}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-identidad",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Diagonal con unos en la diagonal."
    },
    {
      "id": "triangular-superior",
      "title": "Matriz triangular superior",
      "body": "**Triangular superior**: Cuadrada, ceros debajo de la diagonal: i>j.\n\n$$\\begin{pmatrix}a&b&c\\\\0&d&e\\\\0&0&f\\end{pmatrix}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-triangular-superior",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Cuadrada, ceros debajo de la diagonal: i>j."
    },
    {
      "id": "triangular-inferior",
      "title": "Matriz triangular inferior",
      "body": "**Triangular inferior**: Cuadrada, ceros encima de la diagonal: i<j.\n\n$$\\begin{pmatrix}a&0&0\\\\b&c&0\\\\d&e&f\\end{pmatrix}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-triangular-inferior",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Cuadrada, ceros encima de la diagonal: i<j."
    },
    {
      "id": "simetrica",
      "title": "Matriz simétrica",
      "body": "**Simétrica**: Cuadrada, $A^t=A$, es decir $a_{ij}=a_{ji}$.\n\n$$\\begin{pmatrix}a&b&c\\\\b&d&e\\\\c&e&f\\end{pmatrix}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-simetrica",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Cuadrada, $A^t=A$, es decir $a_{ij}=a_{ji}$."
    },
    {
      "id": "antisimetrica",
      "title": "Matriz antisimétrica",
      "body": "**Antisimétrica**: Cuadrada, $A^t=-A$; sobre reales/complejos, diagonal nula.\n\n$$\\begin{pmatrix}0&a&b\\\\-a&0&c\\\\-b&-c&0\\end{pmatrix}.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-antisimetrica",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Cuadrada, $A^t=-A$; sobre reales/complejos, diagonal nula."
    },
    {
      "id": "ortogonal",
      "title": "Matriz ortogonal real",
      "body": "**Ortogonal real**: Cuadrada, $A^tA=AA^t=I$, equivalente a $A^{-1}=A^t$.\n\n$$A^tA=AA^t=I_n\\quad\\Longleftrightarrow\\quad A^{-1}=A^t.$$\n\nLas letras representan escalares; m es cantidad de filas, n de columnas, e i,j indican fila y columna de una entrada. Una matriz puede pertenecer a varias clases.",
      "visual": "class-ortogonal",
      "read": "Los ceros y unos son estructurales; las letras representan entradas genéricas.",
      "question": "¿Qué condición define esta clase de matriz?",
      "answer": "Cuadrada, $A^tA=AA^t=I$, equivalente a $A^{-1}=A^t$."
    },
    {
      "id": "diagonal-traza",
      "title": "Diagonal principal y traza",
      "body": "La **diagonal principal** de una matriz cuadrada está formada por los elementos cuyos subíndices son iguales. Va desde el extremo superior izquierdo al inferior derecho.\n\nLa **traza** es la suma de esos elementos:\n\n$$\\operatorname{tr}(A)=\\sum_{i=1}^{n}a_{ii}.$$\n\nA es cuadrada de orden n; aᵢᵢ es la entrada de fila i y columna i. La traza es un escalar: se suman las entradas diagonales, no se multiplican.",
      "visual": "matrix",
      "read": "",
      "question": "¿Cómo reconocés los elementos de la diagonal principal?",
      "answer": "Tienen subíndices iguales: a₁₁, a₂₂, …, aₙₙ."
    },
    {
      "id": "suma-escalar",
      "title": "Igualdad, suma y producto por escalar",
      "body": "Dos matrices son iguales si tienen el mismo tamaño y todas sus entradas homólogas son iguales. Para A y B del mismo tamaño, $A+B=(a_{ij}+b_{ij})$. La condición de igual tamaño es indispensable. Para k escalar, $kA=(ka_{ij})$.\n\nSuma: clausura, conmutativa, asociativa, neutro nulo del mismo tamaño y opuesto −A. Producto por escalar: $k(A+B)=kA+kB$, $(k+l)A=kA+lA$, $k(lA)=(kl)A$, $1A=A$. Siempre declarar matrices del tamaño apropiado y k,l escalares.",
      "visual": "matrix-sum",
      "read": "",
      "question": "¿Cuándo se pueden sumar dos matrices?",
      "answer": "Cuando tienen exactamente el mismo tamaño. Se suman entradas homólogas."
    },
    {
      "id": "producto",
      "title": "Producto matricial",
      "body": "El producto AB está definido si la cantidad de columnas de A coincide con la cantidad de filas de B. Si A es m×n y B es n×p, AB es m×p, con entradas:\n\n$$c_{ij}=\\sum_{k=1}^{n}a_{ik}b_{kj}.$$\n\nC=AB; i recorre las m filas, j las p columnas y k las n posiciones que se combinan. Cada $c_{ij}$ es la suma de productos de elementos homólogos de la fila i de A y de la columna j de B. \n\n**Ejemplo genérico:**\n\n$$\\begin{pmatrix}a&b&c\\\\d&e&f\\end{pmatrix}\n\\begin{pmatrix}p&q\\\\r&s\\\\t&u\\end{pmatrix}\n=\\begin{pmatrix}ap+br+ct&aq+bs+cu\\\\dp+er+ft&dq+es+fu\\end{pmatrix}.$$\n\n**Procedimiento:** comprobar tamaños (2×3 y 3×2); prever salida 2×2; elegir fila y columna; multiplicar parejas; sumar; repetir para cada entrada. Letras a,…,u son escalares arbitrarios. No son productos entrada a entrada.\n\n**Propiedades**, cuando todos los productos indicados existen: asociativa $(AB)C=A(BC)$; distributivas $A(B+C)=AB+AC$, $(A+B)C=AC+BC$; compatibilidad con escalares $k(AB)=(kA)B=A(kB)$; identidad $I_mA=AI_n=A$ para A m×n; producto con matriz nula da la nula del tamaño correspondiente.\n\n**No conmutativa en general:** AB puede existir sin que BA exista; si ambos existen pueden tener tamaños diferentes; incluso con mismo tamaño pueden ser distintos. Existen A,B no nulas con AB=0. Cancelar por una matriz requiere condiciones: si A es invertible, AB=AC implica B=C. Ejemplo genérico de producto nulo: $A=\\begin{pmatrix}a&b\\\\0&0\\end{pmatrix}$, $B=\\begin{pmatrix}-b&0\\\\a&0\\end{pmatrix}$ con $(a,b)\\ne(0,0)$; ambas son no nulas y AB=0.",
      "visual": "matrix-product",
      "read": "",
      "question": "¿Qué dimensiones deben coincidir para multiplicar?",
      "answer": "Las columnas de A deben coincidir con las filas de B. Si A es m×n y B es n×p, AB es m×p."
    },
    {
      "id": "transpuesta",
      "title": "Transpuesta",
      "body": "La transpuesta $A^t$ se obtiene intercambiando filas por columnas: $(A^t)_{ij}=a_{ji}$; si A es m×n, $A^t$ es n×m. Propiedades: $(A^t)^t=A$; $(A+B)^t=A^t+B^t$; $(kA)^t=kA^t$; $(AB)^t=B^tA^t$ (se invierte el orden). Para A real, $AA^t$ y $A^tA$ son simétricas aunque A sea rectangular.",
      "visual": "transpose",
      "read": "",
      "question": "¿Qué ocurre al transponer un producto?",
      "answer": "Se transpone cada factor y se invierte el orden: (AB)ᵗ=BᵗAᵗ."
    },
    {
      "id": "operaciones-elementales",
      "title": "Operaciones elementales y equivalencia por filas",
      "body": "Tres operaciones: $F_i\\leftrightarrow F_j$; $F_i\\leftarrow kF_i$ con k≠0; $F_i\\leftarrow F_i+kF_j$ con i≠j y k cualquiera. $F_i$ significa fila i. Multiplicar una fila por cero pierde información y no es operación elemental reversible.\n\nA y B son equivalentes por filas si una sucesión finita de operaciones elementales transforma una en la otra. Conservan rango y, si se actúa sobre toda la matriz ampliada de un sistema, el conjunto solución. No necesariamente conservan determinante ni entradas. La forma escalonada reducida por filas es única.",
      "visual": "row-ops",
      "read": "",
      "question": "¿Por qué no se multiplica una fila por cero?",
      "answer": "Se perdería información y la operación no sería reversible. El factor debe ser no nulo."
    },
    {
      "id": "escalonada",
      "title": "Escalonada y reducida por filas",
      "body": "**Pivote/conductor:** primer elemento no nulo de una fila no nula, según el contexto de eliminación. Forma escalonada: filas nulas al final; el primer no nulo de cada fila no nula está más a la derecha que el de la fila anterior. Por ello hay ceros debajo de los pivotes. Reducida por filas: además todos los pivotes valen 1 y cada pivote es el único elemento no nulo de su columna.\n\nNo confundir triangular (cuadrada y ceros a un lado de la diagonal) con escalonada (puede ser rectangular). No exigir pivotes 1 para una forma escalonada ordinaria.\n\nContraejemplos genéricos de tamaño 2×3 para cada condición de la reducida: a≠0 cuando se indica.\n\n- Orden de conductores: $\\begin{pmatrix}0&1&a\\\\1&0&b\\end{pmatrix}$.\n- Pivote unitario: $\\begin{pmatrix}k&a&b\\\\0&0&0\\end{pmatrix}$, k≠0,1.\n- Columna de pivote con otra entrada no nula: $\\begin{pmatrix}1&a&b\\\\0&1&c\\end{pmatrix}$, a≠0.\n- Fila nula debajo: $\\begin{pmatrix}0&0&0\\\\1&a&b\\end{pmatrix}$.",
      "visual": "echelon",
      "read": "",
      "question": "¿Toda escalonada es reducida?",
      "answer": "No. La reducida exige además pivotes iguales a uno y ceros en el resto de cada columna pivote."
    },
    {
      "id": "rango",
      "title": "Rango y matriz elemental",
      "body": "El rango de A es la dimensión de su espacio de filas, igual a la de su espacio de columnas: cantidad máxima de filas o columnas LI. Se obtiene contando pivotes o filas no nulas de una forma escalonada. $0\\le r(A)\\le\\min(m,n)$; se cuentan filas, no se suman sus entradas.\n\nUna matriz elemental E se obtiene aplicando UNA operación elemental a una identidad. Premultiplicar A por E efectúa esa operación sobre sus filas. E es invertible; la operación inversa produce $E^{-1}$. Las operaciones de columnas se representan por posmultiplicación y no se usan indistintamente para mantener el sistema ampliado.",
      "visual": "rank",
      "read": "",
      "question": "¿Cómo se calcula el rango por filas?",
      "answer": "Se cuentan los pivotes o las filas no nulas de una forma escalonada."
    },
    {
      "id": "inversa",
      "title": "Inversa",
      "body": "Una matriz cuadrada A es invertible si existe B del mismo orden tal que AB=BA=I. B es única y se escribe $A^{-1}$. Caracterizaciones equivalentes: rango n; n filas/columnas LI; reducida igual a I; determinante distinto de cero (conexión U3).\n\nMétodo por filas: formar $[A\\mid I]$; aplicar las mismas operaciones a ambos bloques; si se obtiene $[I\\mid C]$, entonces C=$A^{-1}$. Si no hay n pivotes, no existe inversa. Un cero inicial en la diagonal NO prueba singularidad: puede requerir permutar filas.\n\nPropiedades con hipótesis: $(AB)^{-1}=B^{-1}A^{-1}$ si A,B invertibles; $(A^{-1})^{-1}=A$; $(A^t)^{-1}=(A^{-1})^t$; $(kA)^{-1}=k^{-1}A^{-1}$ para k≠0; $(A^r)^{-1}=(A^{-1})^r$ para entero r positivo.",
      "visual": "inverse",
      "read": "",
      "question": "¿Un cero en la diagonal impide invertir?",
      "answer": "No. Puede ser necesario intercambiar filas. La inversibilidad depende de tener rango completo."
    }
  ]
};
