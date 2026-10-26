export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string; // lo que Google muestra en los resultados (unos 150 caracteres)
  date: string; // YYYY-MM-DD
  readingMinutes: number;
  intro: string;
  sections: GuideSection[];
}

export const GUIDES: Guide[] = [
  {
    slug: "cv-para-programadores",
    title: "Cómo armar un CV para programadores y desarrolladores",
    description:
      "Qué poner en el CV de un programador: resumen, proyectos, tecnologías y errores comunes, con ejemplos para estructurar tu currículum.",
    date: "2026-10-26",
    readingMinutes: 5,
    intro:
      "Un CV de desarrollador se lee distinto al de otros rubros: quien lo revisa busca tu stack, qué construiste y qué impacto tuvo. Esta guía te ayuda a ordenarlo.",
    sections: [
      {
        heading: "Empezá por un resumen corto y concreto",
        paragraphs: [
          "Dos o tres líneas alcanzan: qué tipo de rol buscás, con qué tecnologías trabajás y cuántos años de experiencia tenés.",
          "[TU EXPERIENCIA: agregá un ejemplo real de cómo escribiste el tuyo.]",
        ],
      },
      {
        heading: "Mostrá proyectos, no solo tecnologías",
        paragraphs: [
          "Una lista de tecnologías dice qué conocés, pero un proyecto muestra qué hiciste con ellas. Para cada uno, contá el problema que resolvía, qué usaste y qué resultado tuvo.",
        ],
        bullets: [
          "Incluí el link al repositorio o a la demo, y chequeá que funcionen.",
          "Priorizá dos o tres proyectos relevantes para el puesto antes que diez a medias.",
          "Si es un proyecto real con usuarios, decilo.",
        ],
      },
      {
        heading: "Ordená tu stack por categorías",
        paragraphs: [
          "Agrupá lo que usás en lenguajes, frameworks, bases de datos y herramientas. Dejá arriba lo que pide la oferta, y sacá lo que ya no usás.",
        ],
      },
      {
        heading: "Describí tu experiencia con resultados",
        paragraphs: [
          "En cada puesto, empezá las frases con verbos de acción y sumá números cuando puedas: tiempos de carga, usuarios, errores resueltos.",
          "[TU EXPERIENCIA: sumá un ejemplo de antes y después de una frase de tu propio CV.]",
        ],
      },
      {
        heading: "Errores comunes",
        paragraphs: ["Estos son los que más se repiten en CVs de programadores:"],
        bullets: [
          "Barras de nivel por habilidad: no dicen nada concreto sobre cuánto sabés.",
          "Un email poco profesional o links rotos al portfolio.",
          "CVs de varias páginas sin necesidad.",
          "Tecnologías listadas sin ningún proyecto que las respalde.",
        ],
      },
      {
        heading: "Probalo en un formato ATS",
        paragraphs: [
          "Muchas empresas filtran los CVs con sistemas automáticos. Un diseño simple, de una columna y con títulos claros se lee mejor. En Champions CV podés elegir la plantilla ATS y descargar tu PDF gratis.",
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);