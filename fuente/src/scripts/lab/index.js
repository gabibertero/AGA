// Catálogo de generadores por unidad.
import { angulo, proyeccion, area, mixto } from './vectores.js';
import { rectaDosPuntos, posicionRelativa } from './rectas.js';
import { planoPuntoVectores, planoPuntoRecta, planoTresPuntos, planoPerpInterseccion, distPuntoPlano, anguloPlanos } from './planos.js';
import { conica, parabolaPunto } from './conicas.js';

export const CATALOGO = {
  U8: { nombre: 'Vectores', items: [
    { id: 'angulo', nombre: 'Ángulo entre vectores', gen: angulo },
    { id: 'proyeccion', nombre: 'Proyección de un vector sobre otro', gen: proyeccion },
    { id: 'area', nombre: 'Área (producto vectorial)', gen: area },
    { id: 'mixto', nombre: 'Producto mixto: volumen y coplanaridad', gen: mixto },
  ] },
  U9r: { nombre: 'Rectas', items: [
    { id: 'recta2p', nombre: 'Recta por dos puntos', gen: rectaDosPuntos },
    { id: 'posrel', nombre: 'Posición relativa de dos rectas', gen: posicionRelativa },
  ] },
  U9p: { nombre: 'Planos', items: [
    { id: 'plano3p', nombre: 'Plano por tres puntos', gen: planoTresPuntos },
    { id: 'planovec', nombre: 'Plano por un punto, paralelo a dos vectores', gen: planoPuntoVectores },
    { id: 'planorecta', nombre: 'Plano por un punto que contiene a la recta intersección de dos planos', gen: planoPuntoRecta },
    { id: 'planoperp', nombre: 'Plano ⟂ a la recta intersección de dos planos', gen: planoPerpInterseccion },
    { id: 'distpp', nombre: 'Distancia punto-plano', gen: distPuntoPlano },
    { id: 'angpp', nombre: 'Ángulo entre planos', gen: anguloPlanos },
  ] },
  U10: { nombre: 'Cónicas', items: [
    { id: 'conica', nombre: 'Cónica desde la ecuación general (al azar)', gen: (r) => conica(r) },
    { id: 'parabolapunto', nombre: 'Parábola con un punto: gráfico y radio vector', gen: parabolaPunto },
    ...['circunferencia', 'elipse', 'hiperbola', 'parabola'].map((t) => ({ id: t, nombre: { circunferencia: 'Circunferencia', elipse: 'Elipse', hiperbola: 'Hipérbola', parabola: 'Parábola' }[t], gen: (r) => conica(r, { tipo: t }) })),
  ] },
};
