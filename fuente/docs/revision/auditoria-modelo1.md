# Auditoría Modelo1 - P2 (2º parcial práctico AGA, UTN FRC) — 2026-10-14 — Puntaje: 84/100

Archivos revisados: `src/content/parciales/modelo1-p2.mdx`, `docs/solucion-modelo1.md`, `tests/check_modelo1.py`, las dos figuras SVG de `public/figuras/modelo1-p2/`. Revisé las cuentas a mano (y el script sympy es coherente con ellas).

Limitación: no pude abrir `U10 - Geometria.pdf` ni `U9` (falta `pdftoppm`). Los elementos que exige la cátedra para la elipse los saqué de `parciales/2do-parcial/Modelo teorico 2P.md` y de `Plan tutor sabado.md`, que son apuntes derivados. Verificalo contra el PDF de cátedra antes de dar por cerrado el punto C1.

## Desglose

| Rubro | Puntos | Comentario |
|---|---|---|
| Corrección matemática (3 ejercicios) | 30/30 | Ordinaria, C, a, b, c, V, B, F, e, LR, producto vectorial, plano, simétrica, mixto y Q(2;1;3): todo verificado. |
| Elementos del gráfico de la elipse (consigna) | 12/20 | Falta el lado recto dibujado y las longitudes de los ejes; la graduación no marca los puntos clave. |
| Coherencia gráfico-analítica | 9/10 | La elipse es coherente (centro, vértices, focos y ejes caen en su lugar). La figura 3D de Ej3 también (A, B, Q y r2 consistentes), pero no es legible. |
| Notación y justificaciones al estilo cátedra | 11/15 | Falta la notación V/V', A/A', F/F'; falta justificar 225>0 y que las normales no son paralelas. |
| Pasos de hoja de examen | 12/15 | Hay Qué/Por qué en cada paso; el Ej2 no cierra con una frase de respuesta. |
| Errores comunes pertinentes | 8/10 | Buenos. Falta el error de graficar con escala distinta en x e y, y el de no marcar el lado recto. |
| Claridad para estudiar | 2/0 (extra) | Pistas escalonadas y comprobaciones. Compensa parte de lo descontado. |

Total: 84/100. Faltan unos 6 puntos para llegar al 90, que se recuperan con C1 y C2.

## Hallazgos críticos (bloquean el 90)

C1. El gráfico de la elipse no incluye el lado recto ni las longitudes de los ejes. La consigna dice "el gráfico solo se corrige si tiene todos los elementos" y "si el gráfico está mal, no se corrige el ejercicio". La cátedra (`Modelo teorico 2P.md`, l.207-252) pide como elementos: centro, focos F/F', vértices V/V' (extremos del eje mayor), eje mayor 2a, eje menor 2b con extremos A/A', distancia focal 2c, excentricidad y lado recto 2b²/a. La figura dibuja C, V1, V2, B1, B2, F1, F2 y los dos ejes (y=-2, x=3). No dibuja el lado recto y no rotula 2a=10, 2b=6, 2c=8. La tabla del texto calcula LR=18/5 pero ese dato no aparece en el gráfico ni sus extremos (7;-2±9/5)=(7;-1/5),(7;-19/5) y (-1;-1/5),(-1;-19/5). Esos extremos sí aparecen en el script sympy (`check_modelo1.py` l.22) pero no en la resolución.
Arreglo: dibujar los 2 segmentos del lado recto por F1 y F2 (4 puntos), rotular 2a, 2b y 2c sobre los ejes, y agregar a la tabla del Ej1 una fila "Extremos del lado recto". Agregar al "Ojo con" que si el parcial pide todos los elementos, la lista mínima a marcar es C, V, V', A, A', F, F', ejes, LR.

C2. La graduación de los ejes no coincide con los puntos clave. Los ticks de la figura van de 2 en 2 (-4, -2, 0, 2, ... 12 en x; -6, -4, -2, 0, 2 en y). Los valores 3, 7, -1 (x) y 1, -5 (y) quedan entre marcas y sin graduar. "Escala coherente" es justo lo que la cátedra revisa. Un alumno que copie esta figura no sabe dónde graduar.
Arreglo: ticks cada 1 en ambos ejes (o al menos marcar explícitamente 3, 7, -1, 8, -2 en x y 1, -2, -5 en y), con la misma escala en x e y (ya se cumple: 29.94 px/unidad en ambos).

## Mejoras (no bloquean)

M1. Notación. El sitio usa V1, V2, B1, B2, F1, F2. La cátedra usa F/F', V/V' (extremos del eje mayor) y A/A' (extremos del eje menor). Unificar o aclarar la equivalencia en una nota ("V1=V, V2=V', B1=A, B2=A'"). Ojo: A también es un punto del Ej3, aclarar que son contextos distintos.

M2. Ej1, Paso 1. Dice "elipse (o degenerada; se confirma al completar cuadrados)" pero después no confirma. Agregar una línea tras 9(x-3)²+25(y+2)²=225: "225>0 ⇒ elipse real (si fuera 0 sería un punto; si fuera negativo, vacío)".

M3. Ej1, Comprobación. La comprobación más rápida de hoja es reemplazar los 4 vértices en la general: B1(3;1) da 81+25-162+100-44=0. Hoy solo se prueba V1 y B1 por la definición. Agregar B1 en la general (es una cuenta de 10 segundos).

M4. Ej1. Dar también la ecuación de los ejes en forma vectorial o paramétrica solo si la cátedra lo pide; por ahora las rectas y=-2 y x=3 alcanzan. No agregar nada más.

M5. Ej2. Falta una línea que justifique que la intersección π1∩π2 existe: n1×n2=(-5;9;8)≠0 ⇒ los planos no son paralelos ⇒ se cortan en una recta. Hoy se usa n1×n2 como director sin decir que es no nulo. Cerrar el ejercicio con una frase de respuesta: "El plano pedido es 5x-9y-8z-30=0".

M6. Ej2, Pista 3 y Paso 4. Mezcla de signos (se trabaja con n=(-5;9;8) y se cambia a 5x-9y-8z-30=0 al final). Aclarar en una línea que ambas son la misma ecuación (multiplicar por -1) para que el alumno no crea que es un error.

M7. Ej3, figura 3D. La figura matplotlib 3D es coherente (verifiqué que A, B y Q están sobre r1, y que Q está sobre r2), pero es imposible de reproducir a mano y no tiene líneas guía a los ejes. No marca el punto C(3;-1;2) de r2 ni su director. El enunciado de Ej3 no pide gráfico, y la consigna general solo dice "realizar los esquemas pertinentes". Agregar una nota explícita: "el Ej3 no exige gráfico; si lo hacés, un esquema con dos rectas secantes y Q rotulado alcanza". Opcional: marcar C y dar proyecciones punteadas de Q.

M8. Ej3, Paso de la simétrica. Agregar el paso intermedio "ecuaciones paramétricas de r1: x=t, y=-1+t, z=-1+2t" antes de la simétrica (se usa luego en el sistema), así el alumno ve de dónde sale r1(t) que aparece en el Paso 6.

M9. Ej3. La consigna dice "en el caso de que sean concurrentes decir en qué punto". Cerrar con la frase "r1 y r2 son concurrentes (secantes) en Q(2;1;3)". Ya está en la Solución; ponerla también al final de los Pasos.

M10. Errores comunes. Sumar a Ej1: graficar con escala distinta en x e y, o no rotular los extremos del lado recto. Sumar a Ej3: confundir "no paralelas" con "se cortan" (ya está) y no verificar la 3ª ecuación (ya está).

## Autocorrección Bien / A medias / Mal (100% / 50% / 0%)

Opinión: es razonable como estimación de estudio, con dos ajustes. La cátedra corrige primero por resultados, y si la tabla de resultados está mal el ejercicio se evalúa sin mirar el desarrollo (el criterio de la consigna es binario por resultado). Hay entonces tres matices:

1. "A medias" es una categoría de autoevaluación, no de la cátedra. Sirve para detectar que el procedimiento estaba bien pero hubo un error de cuentas. Conviene decir en la UI que el 50% es una estimación y que en el parcial real un resultado incorrecto puede valer 0.
2. En el Ej1 la regla "gráfico mal ⇒ ejercicio sin corregir" y "gráfico incoherente ⇒ 0" pesa más que el resultado. Para el Ej1, un gráfico incompleto debería ser como máximo "A medias" en la autocorrección, y "Mal" si falta un elemento obligatorio (la cátedra lo trata como 0). Esto no está en la rúbrica actual de `solucion-modelo1.md`, que hoy pone "algún rótulo faltante" en "A medias".
3. Las rúbricas de `solucion-modelo1.md` no están en el `.mdx` del sitio (el sitio solo tiene la tabla de respuestas). Si la autocorrección vive en `Ejercicio.astro`, mostrar el criterio de cada ejercicio al lado de los botones.

## Criterios propuestos (1 línea cada uno)

Ejercicio 1 (30 pts)
- Bien: ordinaria correcta + C, a, b, c, V, V', A, A', F, F', e y LR correctos + gráfico con TODOS esos elementos, escala graduada y coherente con lo analítico.
- A medias: ordinaria y elementos correctos pero falta un dato no obligatorio en la tabla (p. ej. LR), o error menor de cuentas arrastrado que no cambia la forma del gráfico.
- Mal: ordinaria incorrecta (h, k, a o b mal), eje mayor mal orientado, o gráfico faltante, incompleto (sin focos, vértices o ejes) o incoherente.

Ejercicio 2 (30 pts)
- Bien: plano 5x-9y-8z-30=0 (o múltiplo no nulo) con la normal (-5;9;8) justificada como director de la recta intersección.
- A medias: normal correcta pero error aritmético en D al desarrollar, o plano correcto sin justificar de dónde sale la normal.
- Mal: normal incorrecta (n1, n2 solos, o producto vectorial mal calculado) o plano que no pasa por P(4;-2;1).

Ejercicio 3 (40 pts)
- Bien: simétrica x/1=(y+1)/1=(z+1)/2 correcta + "no paralelas" + "se cortan" justificado (mixto 0 o sistema compatible) + Q(2;1;3) con la 3ª ecuación verificada.
- A medias: simétrica correcta y posición relativa correcta, pero sin punto de corte, con el punto mal por cuentas, o punto correcto sin justificar la posición.
- Mal: simétrica incorrecta, o posición relativa equivocada (alabeadas o paralelas).

## Prueba de examen (simulando a un alumno solo con este material)

- Ej1: resuelvo y obtengo la ordinaria y todos los elementos numéricos. No puedo graficar el lado recto con confianza porque sus extremos no están dados (C1), y no sé qué marcar en los ejes (C2).
- Ej2: se resuelve completo. Falta solo la frase de respuesta final y la verificación de que los planos no son paralelos (M5).
- Ej3: se resuelve completo. El esquema no es reproducible a mano (M7).

## Re-auditoría

Fecha: 2026-10-14. Puntaje: **93/100** (antes 84). Revisé `modelo1-p2.mdx`, `solucion-modelo1.md`, `check_modelo1.py` y las dos figuras (leí el SVG: coordenadas de ticks, curva, puntos y rótulos; no pude renderizarlas, así que la legibilidad visual de la figura 3D del Ej3 no está verificada). Las cuentas siguen todas correctas.

### Estado de los ítems anteriores

| Ítem | Estado | Evidencia |
|---|---|---|
| C1 lado recto y ejes | Resuelto | La figura dibuja los 2 lados rectos con 4 extremos rotulados (L, L', M, M'), cotas 2a=10, 2b=6, 2c=8 y "LL' = 2b²/a = 18/5". Fila "Extremos del lado recto" en la tabla, lista mínima en "Ojo con" y asserts en el script. Verifiqué en píxeles que L, L', M, M', V, V', A, A', F y F' caen en su lugar. |
| C2 graduación | Resuelto | Ticks cada 1 (x de -5 a 12, y de -6 a 3). Escala idéntica en x e y (38.77 px/u). Aparecen 3, 7, -1, 8, -2, 1 y -5. |
| M1 notación | Resuelto | V/V', A/A', F/F', LL' en pista, paso y figura. Aclara que A y B del Ej3 son otro contexto. |
| M2 (225>0) | Resuelto | |
| M3 (comprobación con A en la general) | Resuelto | También se comprueba L en la general. |
| M4 | No aplicaba | |
| M5 (no paralelas + frase final del Ej2) | Resuelto | |
| M6 (signos) | Resuelto | |
| M7 (Ej3 sin gráfico exigido) | Resuelto | Hay nota en la figura. Opcional pendiente: no se marca C ni hay rótulos r1/r2 en la figura. |
| M8 (paramétricas de r1) | Resuelto | |
| M9 (frase final Ej3) | Resuelto | |
| M10 (errores comunes) | Resuelto | |
| Autocorrección (criterios por ejercicio) | Resuelto con reparos | `Ejercicio.astro` los muestra tras entregar y rotula "A medias (50%, estimación de estudio)". Ver N1 y N2. |

### Errores nuevos (ninguno crítico)

N1 (menor). Contradicción en los criterios del Ej1. "A medias" dice "un gráfico incompleto como mucho vale A medias". "Mal" dice "gráfico ... sin un elemento obligatorio (focos, vértices, ejes)". Un gráfico sin focos cumple ambas. Hay que separar: sin un elemento obligatorio es Mal, y con rótulos o cotas menores faltantes (2a, 2b, 2c o los extremos del lado recto) es A medias. Aplica a `modelo1-p2.mdx` l.33 y `solucion-modelo1.md` l.71-72.

N2 (menor). Inconsistencia sobre el lado recto. En "A medias" figura "falta un dato no obligatorio de la tabla (p. ej. LR)". Pero "Ojo con" y la lista mínima exigen marcar los extremos de los lados rectos en el gráfico. Hay que decidir si el lado recto es obligatorio y decirlo igual en todos lados. Sugerencia: obligatorio en el gráfico, y sacarlo de ese ejemplo.

N3 (cosmético). La figura rotula "eje focal l: y = -2" y el texto usa "eje mayor". La "l" no está definida. Poner "eje mayor (focal): y = -2".

N4 (cosmético). En Ej3 Paso 2 hay dos "Qué:" dentro del mismo Paso (paramétricas y simétrica). Partir en dos Pasos.

### Desglose

| Rubro | Puntos | Comentario |
|---|---|---|
| Corrección matemática | 30/30 | |
| Elementos del gráfico de la elipse | 19/20 | Completo. Resta N2. |
| Coherencia gráfico-analítica | 10/10 | Verificada en coordenadas. |
| Notación y justificaciones al estilo cátedra | 14/15 | Confirmada con U10 p. 15. M/M' son rótulo propio, ya aclarado. |
| Pasos de hoja de examen | 14/15 | N4. |
| Errores comunes pertinentes | 10/10 | |
| Autocorrección y criterios (ajuste) | -4 | N1 y N2 pueden confundir al alumno. |
| **Total** | **93/100** | Objetivo ≥90 cumplido. |

No verificado: el render real del SVG 3D del Ej3 y que `npm run build` y `npm test` pasen.
