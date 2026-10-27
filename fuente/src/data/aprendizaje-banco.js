// Banco de preguntas de "Aprendizaje" (2º parcial teórico, U8–U10). Fiel a la teoría de src/content/teorias/.
// Para AMPLIARLO: agregá un objeto al final de BANCO (id único, formato <unidad>-<tipo>-NN).
//
// Tipos:
//   mc   -> opción múltiple: { enun, opc: [..], correcta: <índice 0-based>, expl }
//   dev  -> a desarrollar:   { enun, modelo: [líneas] }
//   graf -> interpretación de gráficos: lleva fig (nombre de src/figuras-teoria/<fig>.svg) y además
//           forma: 'mc' (con opc/correcta/expl) o 'dev' (con modelo).
// Texto: $...$ = fórmula KaTeX, **negrita**. En modelo: línea que empieza con "- " = viñeta,
// con "1. " = lista numerada, línea toda entre $$...$$ = fórmula centrada.
// Las opciones se barajan al practicar: no dependas del orden ni escribas "la anterior", "ambas", etc.
const T = String.raw;

export const BANCO = [
  // ---------------- U8 · productos entre vectores ----------------
  {
    id: 'u8-mc-01', unidad: 'U8', tipo: 'mc',
    enun: T`El producto escalar de dos vectores $\bar a\cdot\bar b$ da…`,
    opc: [T`un vector perpendicular a ambos`, T`un número (escalar)`, T`un vector paralelo al de mayor módulo`, T`el ángulo entre ellos, en grados`],
    correcta: 1,
    expl: T`El nombre dice qué devuelve: el escalar da un escalar (número). El que da un vector perpendicular es el vectorial. El ángulo se obtiene después, con $\cos\theta=\dfrac{\bar a\cdot\bar b}{\lvert\bar a\rvert\lvert\bar b\rvert}$.`,
  },
  {
    id: 'u8-mc-02', unidad: 'U8', tipo: 'mc',
    enun: T`Si $\bar a=(1;2;3)$ y $\bar b=(4;0;-1)$, ¿cuánto vale $\bar a\cdot\bar b$?`,
    opc: [T`$7$`, T`$1$`, T`$-1$`, T`$(4;0;-3)$`],
    correcta: 1,
    expl: T`Se multiplican las componentes homólogas y se suma: $1\cdot4+2\cdot0+3\cdot(-1)=4-3=1$. El resultado es un número, no un vector (por eso $(4;0;-3)$ está mal), y hay que respetar el signo de $-1$ (si no, da $7$).`,
  },
  {
    id: 'u8-mc-03', unidad: 'U8', tipo: 'mc',
    enun: T`Si $\bar a\cdot\bar b<0$, ¿cómo es el ángulo $\theta$ entre los vectores?`,
    opc: [T`agudo ($\theta<90^\circ$)`, T`recto ($\theta=90^\circ$)`, T`obtuso ($\theta>90^\circ$)`, T`no se puede saber sin los módulos`],
    correcta: 2,
    expl: T`En $\bar a\cdot\bar b=\lvert\bar a\rvert\lvert\bar b\rvert\cos\theta$ los módulos son positivos: lo único que puede cambiar de signo es $\cos\theta$. Negativo → ángulo obtuso; cero → recto; positivo → agudo.`,
  },
  {
    id: 'u8-mc-04', unidad: 'U8', tipo: 'mc',
    enun: T`Al proyectar $\bar a$ sobre $\bar b$ se obtiene $\bar w_1$ (paralelo a $\bar b$) y $\bar w_2=\bar a-\bar w_1$. ¿Qué control tiene que cumplirse exactamente?`,
    opc: [T`$\bar w_2\times\bar b=\bar 0$`, T`$\bar w_2=\bar b$`, T`$\lvert\bar w_2\rvert=1$`, T`$\bar w_2\cdot\bar b=0$`],
    correcta: 3,
    expl: T`$\bar w_2$ es la componente **ortogonal** a $\bar b$, así que su producto escalar con $\bar b$ debe dar exactamente $0$. Si diera $\bar w_2\times\bar b=\bar 0$ serían paralelos, que es lo contrario.`,
  },
  {
    id: 'u8-dev-01', unidad: 'U8', tipo: 'dev',
    enun: T`Explicá cómo se calcula el ángulo entre dos vectores $\bar a$ y $\bar b$ y qué control conviene hacer.`,
    modelo: [
      T`El producto escalar tiene la interpretación geométrica $\bar a\cdot\bar b=\lvert\bar a\rvert\lvert\bar b\rvert\cos\theta$. Despejando el coseno:`,
      T`1. Calcular $\bar a\cdot\bar b=a_1b_1+a_2b_2+a_3b_3$ y los módulos $\lvert\bar a\rvert$, $\lvert\bar b\rvert$ (con $\lvert\bar u\rvert=\sqrt{\bar u\cdot\bar u}$).`,
      T`2. $\cos\theta=\dfrac{\bar a\cdot\bar b}{\lvert\bar a\rvert\,\lvert\bar b\rvert}$.`,
      T`3. $\theta=\arccos(\dots)$.`,
      T`**Control:** $\cos\theta$ tiene que quedar entre $-1$ y $1$; si da fuera de ese rango hay un error de cuenta. El signo de $\bar a\cdot\bar b$ ya anticipa el resultado (positivo agudo, cero recto, negativo obtuso). En particular, perpendiculares $\iff\bar a\cdot\bar b=0$.`,
    ],
  },
  {
    id: 'u8-dev-02', unidad: 'U8', tipo: 'dev',
    enun: T`Descomponé $\bar a=(3;3)$ en una parte paralela y otra perpendicular a $\bar b=(1;0)$ (proyección ortogonal). Mostrá el control.`,
    modelo: [
      T`1. $\bar a\cdot\bar b=3\cdot1+3\cdot0=3$ y $\lvert\bar b\rvert^2=1$.`,
      T`2. Proyección (paralela a $\bar b$): $\bar w_1=\dfrac{\bar a\cdot\bar b}{\lvert\bar b\rvert^2}\,\bar b=3\cdot(1;0)=(3;0)$.`,
      T`3. Componente ortogonal: $\bar w_2=\bar a-\bar w_1=(3;3)-(3;0)=(0;3)$.`,
      T`**Control obligatorio:** $\bar w_2\cdot\bar b=(0;3)\cdot(1;0)=0$ ✓.`,
    ],
  },
  {
    id: 'u8-dev-03', unidad: 'U8', tipo: 'dev',
    enun: T`Definí el producto vectorial: cómo se calcula, qué significa su módulo y qué propiedades tiene. ¿Qué control hacés?`,
    modelo: [
      T`**Definición:** es el vector **perpendicular** a los dos a la vez (solo en $\mathbb R^3$).`,
      T`1. Se arma el determinante simbólico $3\times3$ con $\bar i,\bar j,\bar k$ en la 1ª fila, $\bar a$ en la 2ª y $\bar b$ en la 3ª.`,
      T`2. Se desarrolla por la 1ª fila con signos $+,-,+$:`,
      T`$$\bar a\times\bar b=(a_2b_3-a_3b_2)\,\bar i-(a_1b_3-a_3b_1)\,\bar j+(a_1b_2-a_2b_1)\,\bar k$$`,
      T`**Módulo:** $\lvert\bar a\times\bar b\rvert=\lvert\bar a\rvert\lvert\bar b\rvert\,\mathrm{sen}\,\theta$ = área del paralelogramo de lados $\bar a$ y $\bar b$ (la del triángulo es la mitad).`,
      T`**Propiedades:** $\bar a\times\bar b=-(\bar b\times\bar a)$, por eso el orden importa (regla de la mano derecha: dedos de $\bar a$ hacia $\bar b$, el pulgar marca $\bar a\times\bar b$).`,
      T`**Control:** $\bar a\times\bar b$ debe dar producto escalar $0$ con $\bar a$ y con $\bar b$.`,
    ],
  },
  {
    id: 'u8-graf-01', unidad: 'U8', tipo: 'graf', forma: 'mc', fig: 'u8-proyeccion',
    enun: T`En la figura, el vector $\bar a$ se descompuso en $\bar w_1$ (sobre la dirección de $\bar b$) y $\bar w_2$. ¿Qué representa $\bar w_2$?`,
    opc: [T`la proyección de $\bar a$ sobre $\bar b$`, T`el producto vectorial $\bar a\times\bar b$`, T`la componente de $\bar a$ perpendicular a $\bar b$, $\bar w_2=\bar a-\bar w_1$`, T`el versor de $\bar b$`],
    correcta: 2,
    expl: T`$\bar w_1$ es la «sombra» de $\bar a$ sobre $\bar b$ (la proyección); $\bar w_2$ es lo que falta para llegar a $\bar a$ y forma un ángulo recto con $\bar b$ (el cuadradito de la figura): $\bar w_2\cdot\bar b=0$.`,
  },
  {
    id: 'u8-graf-02', unidad: 'U8', tipo: 'graf', forma: 'mc', fig: 'u8-vectorial',
    enun: T`La figura muestra $\bar a\times\bar b$ saliendo perpendicular al plano de $\bar a$ y $\bar b$. ¿Qué mide su módulo $\lvert\bar a\times\bar b\rvert$?`,
    opc: [T`el volumen del paralelepípedo de aristas $\bar a$, $\bar b$ y $\bar a\times\bar b$`, T`el área del paralelogramo de lados $\bar a$ y $\bar b$`, T`el ángulo entre $\bar a$ y $\bar b$`, T`el área del triángulo de lados $\bar a$ y $\bar b$`],
    correcta: 1,
    expl: T`$\lvert\bar a\times\bar b\rvert=\lvert\bar a\rvert\lvert\bar b\rvert\,\mathrm{sen}\,\theta$ es el área del paralelogramo sombreado. El triángulo sería la mitad, $\dfrac{\lvert\bar a\times\bar b\rvert}{2}$.`,
  },
  {
    id: 'u8-graf-03', unidad: 'U8', tipo: 'graf', forma: 'dev', fig: 'u8-mixto',
    enun: T`Interpretá la figura: ¿qué representa el valor absoluto del producto mixto $\lvert(\bar a\times\bar b)\cdot\bar c\rvert$? ¿Qué pasa si da $0$? ¿Y si la figura fuera un tetraedro?`,
    modelo: [
      T`Los tres vectores $\bar a,\bar b,\bar c$ desde un vértice común arman un **paralelepípedo**; $\lvert(\bar a\times\bar b)\cdot\bar c\rvert$ (módulo del producto mixto) es su **volumen**.`,
      T`Se calcula con el determinante $3\times3$ que tiene las componentes de $\bar a,\bar b,\bar c$ en filas.`,
      T`Si el mixto da $0$, el paralelepípedo se aplana (volumen $0$): los tres vectores son **coplanares**.`,
      T`Para un **tetraedro** de aristas $\bar a,\bar b,\bar c$ se divide por $6$: $\dfrac{\lvert(\bar a\times\bar b)\cdot\bar c\rvert}{6}$.`,
      T`**Control:** áreas y volúmenes son siempre positivos (por eso el valor absoluto).`,
    ],
  },
  {
    id: 'u8-graf-04', unidad: 'U8', tipo: 'graf', forma: 'mc', fig: 'u8-angulo',
    enun: T`Según el ángulo $\theta$ que muestra la figura, ¿qué signo tiene $\bar a\cdot\bar b$?`,
    opc: [T`negativo (ángulo obtuso)`, T`cero (ángulo recto)`, T`positivo (ángulo agudo)`, T`no está definido para vectores dibujados desde el origen`],
    correcta: 2,
    expl: T`En la figura $\theta<90^\circ$ (agudo), entonces $\cos\theta>0$ y, como $\bar a\cdot\bar b=\lvert\bar a\rvert\lvert\bar b\rvert\cos\theta$, el producto escalar es positivo.`,
  },

  // ---------------- U9 · recta y plano ----------------
  {
    id: 'u9-mc-01', unidad: 'U9', tipo: 'mc',
    enun: T`En la ecuación general de la recta en $\mathbb R^2$, $Ax+By+C=0$, el vector $(A;B)$ es…`,
    opc: [T`el vector director de la recta`, T`un vector perpendicular a la recta (normal)`, T`el punto $P_1$ de la recta`, T`el vector paralelo al eje $x$`],
    correcta: 1,
    expl: T`En la general, $(A;B)$ es el vector **normal**, NO el director. El director es $(-B;A)$.`,
  },
  {
    id: 'u9-mc-02', unidad: 'U9', tipo: 'mc',
    enun: T`¿Qué fórmula se usa para el ángulo $\beta$ entre una recta de director $\bar r$ y un plano de normal $\bar n$?`,
    opc: [T`$\cos\beta=\dfrac{\lvert\bar n\cdot\bar r\rvert}{\lvert\bar n\rvert\lvert\bar r\rvert}$`, T`$\mathrm{sen}\,\beta=\dfrac{\lvert\bar n\cdot\bar r\rvert}{\lvert\bar n\rvert\lvert\bar r\rvert}$`, T`$\mathrm{sen}\,\beta=\dfrac{\lvert\bar n\times\bar r\rvert}{\lvert\bar n\rvert\lvert\bar r\rvert}$`, T`$\mathrm{sen}\,\beta=\dfrac{\bar n\cdot\bar r}{\lvert\bar n\rvert+\lvert\bar r\rvert}$`],
    correcta: 1,
    expl: T`Entre dos planos o entre dos rectas se usa **coseno**; cuando se mezclan recta y plano, **seno**. El ángulo recta–plano es el complementario del ángulo entre la recta y la normal: $\cos(90^\circ-\beta)=\mathrm{sen}\,\beta$. Ojo con la opción del producto vectorial: $\lvert\bar n\times\bar r\rvert=\lvert\bar n\rvert\lvert\bar r\rvert\,\mathrm{sen}(90^\circ-\beta)=\lvert\bar n\rvert\lvert\bar r\rvert\cos\beta$, así que ese cociente da $\cos\beta$, no $\mathrm{sen}\,\beta$.`,
  },
  {
    id: 'u9-mc-03', unidad: 'U9', tipo: 'mc',
    enun: T`¿Cuál es la distancia del punto $(0;0)$ a la recta $3x+4y-10=0$?`,
    opc: [T`$10$`, T`$\dfrac{10}{7}$`, T`$2$`, T`$\dfrac{10}{\sqrt7}$`],
    correcta: 2,
    expl: T`$d=\dfrac{\lvert Ax_0+By_0+C\rvert}{\sqrt{A^2+B^2}}=\dfrac{\lvert-10\rvert}{\sqrt{9+16}}=\dfrac{10}{5}=2$. El denominador es $\sqrt{A^2+B^2}$ (no $A+B$).`,
  },
  {
    id: 'u9-mc-04', unidad: 'U9', tipo: 'mc',
    enun: T`Dos rectas en $\mathbb R^3$ tienen directores que **no** son múltiplos. Al igualar sus ecuaciones paramétricas, el sistema resulta incompatible. ¿Cómo son las rectas?`,
    opc: [T`paralelas`, T`coincidentes`, T`se cortan en un punto`, T`alabeadas`],
    correcta: 3,
    expl: T`Directores no múltiplos → ni paralelas ni coincidentes. Si el sistema tiene solución se cortan; si es incompatible son **alabeadas**. Atajo: el mixto $[\overrightarrow{P_1P_2},\bar a_1,\bar a_2]\neq0$ también indica alabeadas.`,
  },
  {
    id: 'u9-mc-05', unidad: 'U9', tipo: 'mc',
    enun: T`¿Cuál es la ecuación general del plano que pasa por $P_1=(1;0;2)$ con normal $\bar n=(2;-1;3)$?`,
    opc: [T`$2x-y+3z-8=0$`, T`$2x-y+3z+8=0$`, T`$x-2y+2z-8=0$`, T`$2x-y+3z-4=0$`],
    correcta: 0,
    expl: T`$2(x-1)-1(y-0)+3(z-2)=0\Rightarrow 2x-y+3z-2-6=0\Rightarrow 2x-y+3z-8=0$. Control: $P_1$ verifica la ecuación ($2-0+6-8=0$).`,
  },
  {
    id: 'u9-dev-01', unidad: 'U9', tipo: 'dev',
    enun: T`Dados los puntos $A=(1;2)$ y $B=(3;6)$, escribí la ecuación de la recta que pasa por ellos en forma vectorial, simétrica y general. Explicá cómo se pasa de una a otra.`,
    modelo: [
      T`**Director:** con dos puntos, $\bar a=B-A=(2;4)$.`,
      T`- **Vectorial:** $(x;y)=(1;2)+\lambda\,(2;4)$.`,
      T`- **Paramétrica:** $x=1+2\lambda$, $\ y=2+4\lambda$.`,
      T`- **Simétrica:** $\dfrac{x-1}{2}=\dfrac{y-2}{4}$.`,
      T`- **General:** multiplicando en cruz, $4(x-1)=2(y-2)\Rightarrow\mathbf{2x-y=0}$.`,
      T`**Pasos entre formas:** vectorial → paramétrica → simétrica (se despeja $\lambda$ de cada una) → multiplicar en cruz → general. De la general a la vectorial: director $(-B;A)$ y un punto dándole un valor a $x$ y despejando $y$.`,
      T`**Control:** reemplazar $P_1$ (o cualquier punto) en cada forma; debe cumplirla. En la general, $(A;B)$ es el normal, no el director.`,
    ],
  },
  {
    id: 'u9-dev-02', unidad: 'U9', tipo: 'dev',
    enun: T`Explicá cómo se halla la ecuación del plano que pasa por tres puntos $P_1,P_2,P_3$ **no alineados** y qué control hacés.`,
    modelo: [
      T`1. Con los puntos armar dos vectores del plano: $\overrightarrow{P_1P_2}$ y $\overrightarrow{P_1P_3}$.`,
      T`2. El normal es $\bar n=\overrightarrow{P_1P_2}\times\overrightarrow{P_1P_3}$ (se puede simplificar dividiendo por un factor común).`,
      T`3. Aplicar la general con ese $\bar n=(A;B;C)$ y cualquiera de los tres puntos: $A(x-x_1)+B(y-y_1)+C(z-z_1)=0$, que distribuyendo da $Ax+By+Cz+D=0$ con $D=-(Ax_1+By_1+Cz_1)$.`,
      T`**Control:** los tres puntos deben verificar la ecuación final. Si $\bar n=\bar 0$, los tres puntos están alineados y no definen un plano. En el plano, $(A;B;C)$ **es** el normal.`,
    ],
  },
  {
    id: 'u9-dev-03', unidad: 'U9', tipo: 'dev',
    enun: T`¿Cómo se clasifican las posiciones relativas de dos rectas en $\mathbb R^3$? Incluí el atajo con el producto mixto.`,
    modelo: [
      T`Se miran primero los directores $\bar a_1,\bar a_2$:`,
      T`- **Múltiplos** → paralelas o coincidentes. Se prueba si un punto de una está en la otra: sí → **coincidentes**; no → **paralelas**.`,
      T`- **No múltiplos** → se igualan las paramétricas: con solución → **se cortan**; incompatible → **alabeadas**.`,
      T`**Atajo:** si el producto mixto $[\overrightarrow{P_1P_2},\bar a_1,\bar a_2]\neq0$, los datos no son coplanares → **alabeadas**.`,
      T`**Control:** la distancia entre alabeadas es $d=\dfrac{\lvert\overrightarrow{P_1P_2}\cdot(\bar a_1\times\bar a_2)\rvert}{\lvert\bar a_1\times\bar a_2\rvert}$; si da $0$, en realidad se cortan.`,
    ],
  },
  {
    id: 'u9-graf-01', unidad: 'U9', tipo: 'graf', forma: 'mc', fig: 'u9-plano',
    enun: T`En la figura, $\bar n$ es perpendicular al plano $\pi$ y $P$ es un punto cualquiera del plano. ¿Qué condición da la ecuación del plano?`,
    opc: [T`$\bar n\times\overrightarrow{P_1P}=\bar 0$`, T`$\bar n\cdot\overrightarrow{P_1P}=0$`, T`$\lvert\bar n\rvert=\lvert\overrightarrow{P_1P}\rvert$`, T`$\bar n=\overrightarrow{P_1P}$`],
    correcta: 1,
    expl: T`Todo vector $\overrightarrow{P_1P}$ contenido en el plano es perpendicular al normal: $\bar n\cdot\overrightarrow{P_1P}=0$. En componentes, $A(x-x_1)+B(y-y_1)+C(z-z_1)=0$, que es la ecuación general.`,
  },
  {
    id: 'u9-graf-02', unidad: 'U9', tipo: 'graf', forma: 'mc', fig: 'u9-recta-plano',
    enun: T`La figura muestra el ángulo $\beta$ entre la recta de director $\bar r$ y el plano de normal $\bar n$; entre $\bar n$ y $\bar r$ el ángulo es $90^\circ-\beta$. ¿Qué fórmula calcula $\beta$?`,
    opc: [T`$\mathrm{sen}\,\beta=\dfrac{\lvert\bar n\cdot\bar r\rvert}{\lvert\bar n\rvert\lvert\bar r\rvert}$`, T`$\cos\beta=\dfrac{\lvert\bar n\cdot\bar r\rvert}{\lvert\bar n\rvert\lvert\bar r\rvert}$`, T`$\mathrm{tg}\,\beta=\dfrac{\bar n\cdot\bar r}{\lvert\bar n\rvert\lvert\bar r\rvert}$`, T`$\beta=\bar n\cdot\bar r$`],
    correcta: 0,
    expl: T`El coseno del ángulo entre $\bar n$ y $\bar r$ es $\cos(90^\circ-\beta)=\mathrm{sen}\,\beta$, y ese coseno es $\dfrac{\lvert\bar n\cdot\bar r\rvert}{\lvert\bar n\rvert\lvert\bar r\rvert}$. Por eso en recta–plano aparece el **seno**.`,
  },
  {
    id: 'u9-graf-03', unidad: 'U9', tipo: 'graf', forma: 'dev', fig: 'u9-recta',
    enun: T`Interpretá la figura: ¿qué son $P_1$, $\bar a$ y $\lambda$? Escribí la ecuación vectorial de la recta y decí qué pasa con $\lambda=0$ y con $\lambda<0$.`,
    modelo: [
      T`$P_1$ es un punto conocido de la recta (fija **dónde** está); $\bar a$ es el vector director (fija **hacia dónde** va); $\lambda$ es el parámetro real (la recta es 1D: un solo parámetro).`,
      T`Todo punto $P$ cumple $\overrightarrow{P_1P}=\lambda\,\bar a$, o sea la ecuación **vectorial**: $(x;y)=(x_1;y_1)+\lambda\,(a_1;a_2)$ (y con $z$ en $\mathbb R^3$).`,
      T`Con $\lambda=0$ se obtiene el propio $P_1$; con $\lambda>0$ se avanza desde $P_1$ en el sentido de $\bar a$ y con $\lambda<0$ se retrocede, hacia el otro lado de $P_1$.`,
      T`Igualando cada componente se pasa a la forma paramétrica, y despejando $\lambda$ a la simétrica.`,
    ],
  },

  // ---------------- U10 · cónicas ----------------
  {
    id: 'u10-mc-01', unidad: 'U10', tipo: 'mc',
    enun: T`¿Cuáles son el centro y el radio de la circunferencia $x^2+y^2-4x+6y-3=0$?`,
    opc: [T`centro $(-2;3)$ y $r=4$`, T`centro $(2;-3)$ y $r=4$`, T`centro $(2;-3)$ y $r=16$`, T`centro $(-2;3)$ y $r=16$`],
    correcta: 1,
    expl: T`Con $D=-4$, $E=6$, $F=-3$: centro $(h;k)=\left(-\dfrac D2;-\dfrac E2\right)=(2;-3)$ y $r^2=\left(\dfrac D2\right)^2+\left(\dfrac E2\right)^2-F=4+9+3=16$, o sea $r=4$ (hay que sacar la raíz). Completando cuadrados: $(x-2)^2+(y+3)^2=16$.`,
  },
  {
    id: 'u10-mc-02', unidad: 'U10', tipo: 'mc',
    enun: T`Con $B=0$, la ecuación $4x^2-9y^2=36$ representa…`,
    opc: [T`una elipse`, T`una circunferencia`, T`una parábola`, T`una hipérbola`],
    correcta: 3,
    expl: T`Mirando los cuadráticos: los dos están, con **signos opuestos** → hipérbola. (Mismo signo y distinto coeficiente sería elipse; mismo coeficiente, circunferencia; solo uno, parábola.) Dividiendo por $36$: $\dfrac{x^2}{9}-\dfrac{y^2}{4}=1$.`,
  },
  {
    id: 'u10-mc-03', unidad: 'U10', tipo: 'mc',
    enun: T`¿Cuál es el foco de la parábola $x^2=8y$?`,
    opc: [T`$(0;2)$`, T`$(2;0)$`, T`$(0;8)$`, T`$(8;0)$`],
    correcta: 0,
    expl: T`Es de la forma $x^2=4py$ (vértice en el origen, eje en $y$: la variable que NO está al cuadrado). Entonces $4p=8$, $p=2$. El foco está a $p$ del vértice sobre el eje: $(0;2)$; la directriz es $y=-2$. Como $p>0$ abre hacia $y$ positivo.`,
  },
  {
    id: 'u10-mc-04', unidad: 'U10', tipo: 'mc',
    enun: T`¿Cuáles son las asíntotas de la hipérbola $\dfrac{x^2}{9}-\dfrac{y^2}{4}=1$ (centro en el origen)?`,
    opc: [T`$y=\pm\dfrac32\,x$`, T`$y=\pm\dfrac49\,x$`, T`$y=\pm\dfrac23\,x$`, T`$y=\pm x$`],
    correcta: 2,
    expl: T`El término positivo es $x^2$: eje transverso horizontal, y las asíntotas son $y=\pm\dfrac ba\,x$. Con $a^2=9$, $b^2=4$: $a=3$, $b=2$, entonces $y=\pm\dfrac23\,x$. (Con transverso vertical sería $\pm\dfrac ab\,x$.)`,
  },
  {
    id: 'u10-dev-01', unidad: 'U10', tipo: 'dev',
    enun: T`Elipse: definí, nombrá sus elementos y la relación entre $a$, $b$ y $c$, escribí sus ecuaciones y explicá cómo se grafica.`,
    modelo: [
      T`**Definición:** lugar geométrico de los puntos tales que la **suma** de distancias a dos focos es constante e igual a $2a$.`,
      T`**Elementos:** $a$ semieje mayor, $b$ semieje menor, $c$ distancia del centro a cada foco; $\boxed{a^2=b^2+c^2}$. Excentricidad $e=\dfrac ca$, con $0<e<1$.`,
      T`- Origen, eje focal en $x$: $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$; en $y$: $\dfrac{x^2}{b^2}+\dfrac{y^2}{a^2}=1$ ($a^2$ siempre bajo el eje focal).`,
      T`- Centro $(h;k)$, eje $\parallel x$: $\dfrac{(x-h)^2}{a^2}+\dfrac{(y-k)^2}{b^2}=1$; eje $\parallel y$: $\dfrac{(x-h)^2}{b^2}+\dfrac{(y-k)^2}{a^2}=1$.`,
      T`- General: $Ax^2+Cy^2+Dx+Ey+F=0$ ($A$ y $C$ del mismo signo y distintos).`,
      T`**Cómo graficarla:** ubicar el centro; marcar $\pm a$ (vértices) sobre el eje focal y $\pm b$ (co-vértices) sobre el otro; ubicar los focos a $\pm c$; dibujar el óvalo por esos cuatro puntos. El denominador mayor es $a^2$ y marca el eje focal.`,
    ],
  },
  {
    id: 'u10-dev-02', unidad: 'U10', tipo: 'dev',
    enun: T`Pasá la circunferencia $(x-h)^2+(y-k)^2=r^2$ de la forma ordinaria a la general, paso a paso, y explicá cómo se vuelve de la general a la ordinaria.`,
    modelo: [
      T`**Ordinaria → general:**`,
      T`1. Desarrollar los cuadrados: $(x-h)^2=x^2-2hx+h^2$, $\ (y-k)^2=y^2-2ky+k^2$.`,
      T`2. Pasar $r^2$ al otro miembro, igualando a $0$.`,
      T`3. Ordenar: $x^2+y^2-2h\,x-2k\,y+(h^2+k^2-r^2)=0$.`,
      T`4. Renombrar $D=-2h$, $E=-2k$, $F=h^2+k^2-r^2$: $\ x^2+y^2+Dx+Ey+F=0$.`,
      T`**General → ordinaria:** completar cuadrados. Centro $(h;k)=\left(-\dfrac D2;-\dfrac E2\right)$ y radio $r^2=\left(\dfrac D2\right)^2+\left(\dfrac E2\right)^2-F$.`,
      T`**Cómo graficarla:** ubicar el centro, medir $r$ arriba, abajo, izquierda y derecha (4 puntos) y unir con la curva.`,
    ],
  },
  {
    id: 'u10-dev-03', unidad: 'U10', tipo: 'dev',
    enun: T`Hipérbola: definición, relación entre $a$, $b$ y $c$, asíntotas y cómo se grafica.`,
    modelo: [
      T`**Definición:** lugar geométrico de los puntos tales que el **valor absoluto de la diferencia** de distancias a dos focos es constante e igual a $2a$.`,
      T`**Elementos:** $a$ semieje transverso, $b$ semieje conjugado, $c$ distancia del centro a cada foco; $\boxed{c^2=a^2+b^2}$ ($c$ es el mayor). Excentricidad $e=\dfrac ca>1$.`,
      T`**Ecuación:** $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$ (transverso en $x$) o $\dfrac{y^2}{a^2}-\dfrac{x^2}{b^2}=1$ (transverso en $y$); con centro $(h;k)$ se reemplazan $x\to x-h$, $y\to y-k$. General: $Ax^2-Cy^2+Dx+Ey+F=0$ (cuadráticos de signos opuestos).`,
      T`**Asíntotas** (centro en el origen): transverso horizontal $y=\pm\dfrac ba\,x$; transverso vertical $y=\pm\dfrac ab\,x$.`,
      T`**Cómo graficarla:** ubicar el centro; marcar $\pm a$ (vértices) sobre el eje transverso (el de la variable con término positivo) y $\pm b$ sobre el otro; dibujar el **rectángulo guía** de lados $2a$ y $2b$; las **diagonales** son las asíntotas; dibujar las ramas desde los vértices acercándose a ellas; focos a $\pm c$, por fuera de los vértices.`,
    ],
  },
  {
    id: 'u10-graf-01', unidad: 'U10', tipo: 'graf', forma: 'mc', fig: 'cono-parabola',
    enun: T`En la figura el plano corta al cono de forma **paralela a la generatriz**. ¿Qué cónica resulta?`,
    opc: [T`circunferencia`, T`elipse`, T`parábola`, T`hipérbola`],
    correcta: 2,
    expl: T`Plano $\perp$ al eje → circunferencia; plano inclinado sin ser paralelo a la generatriz ni al eje → elipse; **plano $\parallel$ a la generatriz → parábola**; plano $\parallel$ al eje (corta las dos hojas) → hipérbola.`,
  },
  {
    id: 'u10-graf-02', unidad: 'U10', tipo: 'graf', forma: 'mc', fig: 'deg-dos-rectas',
    enun: T`El plano de la figura pasa por el **vértice** del cono y corta las dos hojas. ¿Cuál es la intersección?`,
    opc: [T`un punto`, T`una recta`, T`una hipérbola`, T`dos rectas que se cortan`],
    correcta: 3,
    expl: T`Si el plano pasa por el vértice la cónica se degenera: solo toca el vértice → un punto; tangente a una generatriz → una recta; corta las dos hojas pasando por el vértice → **dos rectas que se cortan**.`,
  },
  {
    id: 'u10-graf-03', unidad: 'U10', tipo: 'graf', forma: 'mc', fig: 'u10-hiperbola',
    enun: T`La hipérbola de la figura tiene centro en el origen, vértices $V$, $V'$ y focos $F$, $F'$ sobre el eje horizontal. ¿Cuál es la forma de su ecuación?`,
    opc: [T`$\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$`, T`$\dfrac{y^2}{a^2}-\dfrac{x^2}{b^2}=1$`, T`$\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$`, T`$y^2=4px$`],
    correcta: 2,
    expl: T`Los vértices están sobre el eje $x$: el eje transverso es horizontal, así que el término positivo es $x^2$: $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$ y las asíntotas son $y=\pm\dfrac ba\,x$. Los focos quedan por fuera de los vértices porque $c^2=a^2+b^2$ ($c>a$).`,
  },
  {
    id: 'u10-graf-04', unidad: 'U10', tipo: 'graf', forma: 'mc', fig: 'u10-parabola',
    enun: T`En la parábola de la figura (vértice $V$, foco $F$ y directriz), ¿qué forma tiene su ecuación con vértice en el origen?`,
    opc: [T`$x^2=4py$ con $p>0$`, T`$y^2=4px$ con $p<0$`, T`$y^2=4px$ con $p>0$`, T`$x^2=4py$ con $p<0$`],
    correcta: 2,
    expl: T`El eje de simetría es horizontal (pasa por $V$ y $F$), así que la variable que NO está al cuadrado es $x$: $y^2=4px$. El foco está a la derecha del vértice y la directriz a la izquierda, o sea abre hacia el lado positivo del eje: $p>0$. Además $P$ equidista de $F$ y de la directriz.`,
  },
  {
    id: 'u10-graf-05', unidad: 'U10', tipo: 'graf', forma: 'dev', fig: 'u10-elipse',
    enun: T`Leé la elipse de la figura: nombrá los elementos marcados, indicá qué cumple el punto $P$, la relación entre $a$, $b$ y $c$ y la forma de su ecuación con centro en el origen.`,
    modelo: [
      T`**Elementos:** el centro está en el medio; $F$ y $F'$ son los focos; $V$ y $V'$ los vértices sobre el eje focal; $a$ es el semieje mayor y $b$ el semieje menor.`,
      T`**Propiedad de $P$:** para todo punto de la elipse, $PF+PF'=2a$ (la suma de distancias a los focos es constante).`,
      T`**Relación:** $a^2=b^2+c^2$, con $c$ la distancia del centro a cada foco ($a$ es el mayor). Excentricidad $e=\dfrac ca$, $0<e<1$.`,
      T`**Ecuación:** el eje focal es horizontal (focos sobre el eje $x$), entonces $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$, con $a^2$ bajo el eje focal.`,
    ],
  },
];
