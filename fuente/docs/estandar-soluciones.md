# Estándar de soluciones (AGA)

Adaptado de AM II. Todavía no hay ejercicio resuelto de referencia: el primero que se cierre pasa a ser el modelo.

## Estructura por ejercicio (en este orden, tras `<Enunciado>`)
`<Pista>` ×3 → `<Paso>` ×4–8 → `<Solucion>` → `<Comprobacion>` → `<ResolucionOficial>`.
Todo lo elaborado vive en esos componentes ("Elaborado para el sitio — no oficial"). No se toca el texto del `<Enunciado>`.

## Escalera de pistas (estricta)
- **P1:** solo ayuda a *reconocer* el tipo (preguntas guía). No nombra el método ni linkea el machete.
- **P2:** nombra el método, dice qué hay que plantear y linkea el machete (cuando existan los machetes).
- **P3:** el planteo casi hecho (límites, forma de y_p, P y Q), sin llegar al resultado.

## Formato de cada Paso
**Qué** se hace, **Por qué** corresponde, **Cómo reconocerlo** (cuando aplique) y el cálculo.
Regla: ningún `=` esconde más de una operación (evaluar límites, cambios de signo, suma de ecuaciones, agrupar términos: en líneas separadas).
Lenguaje claro y cercano (rioplatense), sin suponer teoría dominada. Justificar lo no obvio (r ≥ 0, jacobiano, sentido de recorrido, resonancia).

## Solución y "Ojo con"
`<Solucion>`: resultado final destacado (`$$…$$`, con unidades si hay) y una línea **Ojo con:** con el error típico del tipo.

## Comprobación
Camino independiente (otro orden o coordenadas, definición vs Green, derivar implícitamente, sustituir en la EDO, cálculo geométrico alternativo). Nunca solo "orden de magnitud".
No menciona la resolución oficial: la comparación con el profe vive solo en `<ResolucionOficial>`.

## Figuras (matplotlib → SVG)
- Script reproducible en `figuras/src/<id>_ejN.py`, salida en `public/figuras/<id>/ejN.svg`, fondo blanco, `svg.fonttype=none`.
- Ancho ~7.8 in, texto ≥ 12 pt, leyenda fuera del área dibujada, ejes rotulados.
- Mostrar el sólido/región completo (perspectiva 3D para volúmenes + un corte) y rotular lo que se resta o limita.
- Insertar con `<img src={`${import.meta.env.BASE_URL}figuras/<id>/ejN.svg`} alt="…" />` con alt descriptivo; mirarla renderizada antes de cerrar.

## Test sympy por examen
`tests/check_<id>.py`: recalcula de forma independiente y asierta resultados **e intermedios** (cada tramo, primitiva, coeficiente y valor de la comprobación) y que el mismo texto LaTeX esté en el MDX (`en_mdx`). Sin asserts vacíos. Correr con `python3 tests/check_<id>.py`.
Verificar con sympy: producto vectorial/mixto (`Matrix.cross`), sistemas (`solve`), distancias y completar cuadrados de cónicas.

## Discrepancias con la oficial
Nunca se corrige en silencio. Se anota en `docs/revision/<id>-discrepancias.md` (ej, qué dice el escaneo, qué da sympy, causa probable) y en el MDX, dentro de `<ResolucionOficial>` o de una nota aparte, "⚠️ La resolución oficial da X; el recálculo da Y — pendiente de confirmar con la cátedra". Erratas evidentes del profe (ej. "=84" por 8) se registran sin cambiar el resultado.

## Notación de la cátedra
A confirmar en cada uso con las fuentes (vectores con barra/sombrero, ecuaciones paramétrica/simétrica/general de recta y plano, forma ordinaria de cónicas). Español rioplatense.
