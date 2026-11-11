# Respuestas modelo del primer parcial

Alcance: U1–U7 del apunte de Álgebra y Geometría Analítica 2026. Texto de estudio elaborado con ChatGPT, con hipótesis, propiedades y ejemplos genéricos. No se presenta como respuesta oficial ni transcripción literal.

## Actualizar una respuesta al practicar

Los conceptos tienen un identificador estable en `src/data/teorico-1p/uN.js`. Reemplazar la definición (`def`) o el desarrollo (`body`, Markdown con LaTeX) del concepto indicado con la versión corregida de Gavi. Conservar el identificador: es la clave de progreso y borrador del navegador. Los gráficos se eligen con `visual`; son SVG propios, disponibles desde el HTML y sin servicios externos. `question` y `answer` son la comprobación breve, separada de la respuesta modelo principal.

No confundir los borradores personales del navegador con respuestas ya revisadas. No hay corrección automática ni sincronización entre dispositivos.

## Fuentes y revisión

Se consultaron las páginas conceptuales del apunte 2026: U1 9–19, U2 25–36, U3 47–54, U4 61–75, U5 91–104, U6 113–135, U7 143–149, y las guías locales de tutoría previamente preparadas. Se retienen ejemplos con letras; los controles numéricos de U1 solo exploran el esquema.

Correcciones matemáticas respecto de erratas del apunte:

- U1 pp. 14–18: uniformidad solo en el sentido válido; módulo de kv con valor absoluto; tres vectores LI para generar ℝ³.
- U2 p. 36: un cero aislado en la diagonal no impide invertir; puede requerirse permutación.
- U3 pp. 50–53: signos alternados de cofactores y efecto individual de operaciones sobre el determinante.
- U4 pp. 63–66: el rango cuenta filas no nulas; la inversa también resuelve homogéneos cuando existe.
- U5 pp. 94 y 102: el producto por cero da el vector nulo, que puede quedar fuera del subconjunto; dirección coherente de la matriz de cambio de base.
- U6 p. 117: filas no nulas de una escalonada dan una base del espacio fila, no del núcleo. El núcleo se obtiene resolviendo Ax=0.
- U7 pp. 144–147: autovector siempre no nulo, aunque λ=0; raíces contando multiplicidades sobre ℂ; diagonalización condicionada al campo.

Validación: compilación con KaTeX, navegación y persistencia con Playwright en escritorio y móvil; comprobaciones simbólicas de los ejemplos con parámetros. Los commits separan infraestructura/U1, cada unidad incorporada y la compilación final para GitHub Pages.

Resultado de la tanda inicial: 79 conceptos (U1: 16; U2: 21; U3: 6; U4: 9; U5: 9; U6: 10; U7: 8). Compilación de 46 páginas correcta; 216 pruebas generales aprobadas y recorrido específico de 8 pruebas aprobado tras el último ajuste de fórmulas en móvil. Se verifica el ancho después de cargar las fuentes. Se comprobaron simbólicamente seis relaciones: cofactores, triangulación, producto nulo, polinomio característico de orden dos, núcleo y raíz repetida.
