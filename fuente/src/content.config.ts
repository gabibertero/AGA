import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const parciales = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/parciales' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    fecha: z.string().optional(), // tal cual figura en el examen; los modelos no traen
    tipo: z.enum(['práctico', 'teórico', 'modelo', 'final']), // final = banco extra: solo sus ejercicios de U8–U10
    tema: z.string().optional(),
    fuente: z.string(), // ruta del PDF relativa a la carpeta de la materia
    paginasEnunciado: z.string(),
    paginasResolucion: z.string().optional(), // sin resolución oficial = se omite
    orden: z.number(),
    unidades: z.array(z.string()),
  }),
});

// Preguntero teórico (U8–U10): un MDX por unidad con varias <Pregunta>. Machetes: un MDX por tema.
const preguntas = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/preguntas' }),
  schema: z.object({ titulo: z.string(), unidad: z.string(), orden: z.number() }),
});

const machetes = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/machetes' }),
  schema: z.object({ titulo: z.string(), unidad: z.string(), orden: z.number(), resumen: z.string() }),
});

export const collections = { parciales, preguntas, machetes };
