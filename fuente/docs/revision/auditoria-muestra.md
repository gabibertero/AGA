# Auditoría de muestra — contenido nuevo AGA (2º parcial práctico) — 2026-10-14

Criterio: el mismo que `auditoria-modelo1.md` (piloto 93/100). Revisé los MDX, las 3 figuras SVG (coordenadas de ticks, curvas, puntos y rótulos; no pude renderizarlas), `conica.js`, `conicas.js` y los tres `check_*.py`. Rehice a mano las cuentas de todos los ejercicios: dan bien.

Limitación: `pdftoppm` no está instalado, así que NO pude abrir `U10 - Geometria.pdf` p. 54 ni p. 15. La notación de la parábola (l, a, F, A, V, LL') la tomo de lo que declara el MDX; el "radio vector" lo contrasté con `finales/Final AGA.html` (apunte derivado: "radio focal o radio vector = recta que une F con P"). Verificar contra el PDF antes de cerrar C1 y C2.

## Resumen

| Ítem | Puntaje | Críticos |
|---|---|---|
| modelo2-p2 (+ figura) | 91 | ninguno |
| 1r5-2p (+ figura) | 91 | ninguno (r1 pendiente bien marcada) |
| final-2018-12-04 | 90 | ninguno |
| final-2021-02-09 | 94 | ninguno |
| Laboratorio (conica.js, conicas.js) | 80 | C1 convención de p contradice al MDX; C2 la parábola no usa A, l, a |

## 1. modelo2-p2 — 91/100

Matemática 30/30: ordinaria (y+1)²=-4(x-5), V(5;-1), F(4;-1), l: x=6, A(6;-1), LL'=4, L(4;1), L'(4;-3), P(1;3), |FP|=5 y |PD|=5. Ej.1 (3x-2y+7z-23=0) y Ej.2 (13x-5y-z-24=0, λ=4) correctos, con comprobación alternativa. Figura coherente: la curva pasa por (1;-5), (5;-1), (-4;5); V, F, A, L, L', P, D caen en su lugar; escala idéntica en x e y (38,96 px/u); ticks de a 1.

Críticos: ninguno.

Mejoras:
- M1. Criterios del Ej.3: "A medias" admite "falta directriz, eje, extremos del lado recto o el segmento FP", pero "Ojo con" dice que todos son obligatorios. Es la misma contradicción N1/N2 del piloto. Separar: falta un elemento obligatorio (l, a, F, V, LL' o FP) = Mal; falta solo A, D o una cota = A medias.
- M2. D (pie de la perpendicular desde P a l) figura dentro de "Notación de cátedra (U10, p. 54)". Si D no es de cátedra, sacarlo de esa línea y rotularlo "propio" (como se hizo con M/M').
- M3. p queda con signo (p=-1) y se dice "distancia = |p|". Agregar una línea: "p<0 sólo indica el sentido; la distancia V–F es |p|". Alinear con el laboratorio (ver C1).
- M4. Figura: los rótulos V(5;-1) y A(6;-1) quedan pegados (misma altura, uno termina donde empieza el otro). Subir A unos 12 px.
- M5. Enunciado ambiguo ("parábola cuya ordenada es 3"): la lectura "punto de ordenada 3" está explicada y respaldada por el apunte de cátedra. Alcanza. Mantener.
- M6. Ej.2: justificar que π1 y π2 se cortan ya está (normales no proporcionales). Sin cambios.

## 2. 1r5-2p — 91/100

Matemática 30/30: ordinaria (x-3)²/4+(y+2)²/9=1, eje mayor vertical, C(3;-2), a=3, b=2, c=√5, V/V', A/A', F/F', e=√5/3, LR=8/3 con 4 extremos; Ej.2 mixto 13≠0, d=13/√14; Ej.3 cortes (13;0;0), (0;13/4;0), (0;0;-39/4) y d=8. Verifiqué la figura en píxeles: C, V, V', A, A', F, F', L, L', M, M' en su lugar, cotas 2a, 2b, 2c, escala igual en x e y (49,74 px/u). Comprobación de la perpendicular común (t=11/14, s=-5/14) verificada a mano.

r1 del Ej.2: bien tratada. Está marcada "pendiente de revisión" en el enunciado, en la solución, en el "Ojo con" y en la tabla de respuestas, y se aclara que `Resoluciones.html` (tercero, no oficial) da la misma lectura y el mismo resultado. No hay nada para corregir; sólo mantener el cartel hasta contrastar con el original de cátedra.

Críticos: ninguno.

Mejoras:
- M1. Mismo problema de criterios que en modelo2: en el Ej.1 "A medias" dice "le falta algún elemento, p. ej. los extremos del LR o un foco", pero el foco está en la lista mínima obligatoria. Sacar "un foco" de ese ejemplo.
- M2. Ej.2 vale 20+15: los criterios no distinguen a) de b). Agregar una línea "a) 20: se cruzan justificado; b) 15: distancia".
- M3. Ej.1 vale 35 puntos y la cátedra corrige primero por resultados: agregar al "Ojo con" la frase del recuadro del examen ("si los resultados de la tabla son incorrectos no se mira el desarrollo"). Este examen no la trae impresa en la foto, así que ponerla como recordatorio del modelo oficial, no como cita del 1R5.
- M4. Verificar que `escaneos/1r5-2p.jpg` no tape ni muestre nombre/legajo (el inventario dice que en A están en blanco; confirmar en la imagen publicada).

## 3a. final-2018-12-04 — 90/100

Matemática 30/30. Ej.1: v1=(-2;-3;5), mixto -16k, k=0, corte en (0;1;0); k=1 alabeadas, d=8√2/7≈1,62. Ej.5: autovalores -1 y 3, canónica -x'²/3+y'²=1, hipérbola con eje transverso y' (recta x-y=0), a=1, b=√3, c=2, e=2. Verifiqué a mano V, A, F y los cuatro extremos de lados rectos en ejes originales (todos bien), las asíntotas y=(-2±√3)x y la comprobación L en la general. Escala de la figura igual en x e y (42,15 px/u).

Críticos: ninguno.

Mejoras:
- M1. "Q tiene det 1 (rotación de 45°)": en realidad es una rotación de -45° (los ejes giran 45° en sentido horario; x' queda sobre x+y=0). Escribir "rotación de ángulo -45°". Un alumno que dibuje los ejes nuevos con +45° los pone al revés (y' sobre x+y=0), y el ejercicio vale cero por gráfico mal.
- M2. Figura: las asíntotas están dibujadas pero sin rótulo con su ecuación, y no hay cotas 2a=2 y 2b=2√3 (el piloto sí exigió cotas). Agregar "y=(-2+√3)x" y "y=(-2-√3)x" y las dos cotas. Nota: en el rótulo de la figura dice "eje focal l"; definir l como eje focal en el texto o escribir "eje focal (transverso)".
- M3. Tabla de elementos: la columna "En (x;y)" no lleva LL'=6 con el signo de "doble lado recto" aclarado (hay dos). Una línea alcanza.
- M4. Criterios del Ej.5: "A medias" admite que falten "focos, asíntotas, extremos del LL'". Focos son obligatorios: pasarlos a Mal (misma regla que arriba).
- M5. Fuente: es de otra regional (UTN.BA); está dicho. Agregar que la cátedra FRC pide la misma construcción pero que ese final no sale de ella.

## 3b. final-2021-02-09 — 94/100

Matemática 30/30. Ej.1: director de S (-2;1;3), P_S(0;1;-1), P_RP_S=(0;-1;-2), determinante 7+2h, h=-7/2; no paralelas, se cortan en (-6;4;8) (comprobado). Ej.5: p=-4, q=-16; traza z=0: x²+y²=4; traza y=0: x²/4-z²=1; superficie = hiperboloide de una hoja de eje z.

Críticos: ninguno.

Mejoras:
- M1. Ej.5: aclarar que "diámetro 4" no agrega una condición independiente: con p=-4 el radio sale 2 solo (porque el término 4y²=16 ya fija y²=4). Una línea.
- M2. Ej.5: agregar un dibujo opcional de las dos trazas o decir expresamente que el ejercicio no pide gráfico.
- M3. Ej.1: el "Ojo con" cita el truco (v_S × P_RP_S)·v_R sin mostrarlo. O se muestra o se saca.
- M4. Fuente: es una resolución tipeada de tercero ("Andrea Rey" figura en el pie, según el inventario). Confirmar que su nombre no aparece en ningún texto publicado (la nota actual no lo menciona: bien).

## 4. Laboratorio — 80/100 (objetivo no alcanzado)

Para elipse e hipérbola la notación coincide con la de cátedra y con los MDX: C, a, b, c, V/V', A/A' (extremos del eje menor/conjugado), F/F', e, LR=2b²/a, L/L' por F y M/M' por F', eje focal, asíntotas ±. Verifiqué que `elementos()` da los mismos puntos que el MDX de 1r5 (ori 'v': L(h+b²/a; k+c) = (13/3; -2+√5)) y que la ordinaria y la general son correctas para los 4 tipos y las 4 orientaciones de parábola. Los pasos de completar cuadrados dan bien incluso con el mcd (rhs = a²b²/m).

Críticos (bloquean el 90):
- C1. Convención de p contradice al MDX. En `conicas.js` (paso "Leer") y `conica.js` (`elementosTex`) p es siempre positivo: para (y+1)²=-4(x-5) imprime "4p=4 ⇒ p=1; abre hacia la izquierda" al lado de una ordinaria que muestra -4. `modelo2-p2.mdx` dice "4p=-4 ⇒ p=-1". Un alumno que estudie con las dos cosas ve dos convenciones para el mismo objeto. Elegir una según `U10 p. 54` (el apunte derivado define p como longitud del segmento V–F, lo que favorece p>0 y escribir "(y-k)²=-4p(x-h) abre a la izquierda") y alinear lab y MDX. Si se deja p con signo, que el lab imprima "4p=-4".
- C2. `elementosTex` para parábola no usa la notación declarada ("notación de cátedra"): falta A = l∩a, y la directriz y el eje no se rotulan l y a (dice "directriz: x=6", "eje: y=-1"). El MDX de modelo2 sí lista A, l, a, F, V, LL'. Agregar `A(…)`, `l: x=…`, `a: y=…` en `conica.js` (calcular A = (dir.x; k) o (h; dir.y)).

Mejoras:
- M1. Elipse/hipérbola: agregar 2a, 2b, 2c y la ecuación del eje menor/conjugado (hoy sólo "eje focal"); el MDX de 1r5 los lista.
- M2. Hipérbola: agregar "A y A' no pertenecen a la curva" (el final 2018 lo dice; el lab no).
- M3. M y M' son rótulo propio, no de cátedra: el paso dice "(notación de cátedra)" sin aclararlo. Agregar "M, M': rótulo propio para el 2.º lado recto" como en los MDX.
- M4. El lab nombra la circunferencia sólo con C y r: bien, pero no ofrece el elemento "diámetro". Aceptable.
- M5. No hay test del lab contra los MDX (no existe `check_lab`). Agregar un assert con `elementos({tipo:'elipse',h:3,k:-2,a:3,b:2,ori:'v'})` contra los valores de 1r5, y con la parábola de modelo2 (p=1, ori 'izq') contra V, F, L, L'.

## Verificación sympy existente

- `check_modelo2.py`: cubre los tres ejercicios, incluidos |PF|=|PD|, extremos del LL' y camino alternativo del Ej.2. No chequea A(6;-1) como punto ni las coordenadas de la figura. Suficiente.
- `check_1r5.py`: cubre los tres, incluida la perpendicular común y extremos del lado recto. Suficiente.
- `check_finales_1.py`: cubre 2018 (ej.1 y ej.5, con A, F, V, L, asíntotas) y 2021 (ej.1 y ej.5). Suficiente. Agregar un assert sobre el ángulo de Q (cos θ=√2/2, sin θ=-√2/2) para blindar M1 del 2018.

## No verificado

Contenido de `U10 - Geometria.pdf` (p. 15, p. 54); render real de los SVG; `npm run build` / `npm test`; que `ej5-hiperbola-rotada.svg` dibuje las dos ramas completas (leí rótulos y ejes, no la curva).
