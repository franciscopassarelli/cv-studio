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
          "Un ejemplo: «Desarrollador frontend con 3 años de experiencia en React y TypeScript. Construyo interfaces rápidas y accesibles, y me interesa el trabajo cercano al producto.»",
          "Si recién empezás, reemplazá los años de experiencia por lo que construiste: «Desarrollador junior en JavaScript. Armé una aplicación web completa con login, base de datos y pagos online.»",
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
          "Un ejemplo de antes y después. Antes: «Trabajé en el desarrollo del sitio web de la empresa.» Después: «Reduje el tiempo de carga de la página principal de 4 a 1,8 segundos optimizando imágenes y dividiendo el código.» La segunda frase dice qué hiciste y cuánto cambió.",
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
  {
    slug: "cv-sin-experiencia",
    title: "CV sin experiencia: cómo armar tu primer currículum",
    description:
      "Cómo armar tu primer CV cuando no tenés experiencia laboral: qué incluir, cómo mostrar lo que sabés con ejemplos reales y por qué importa la prolijidad.",
    date: "2026-10-26",
    readingMinutes: 5,
    intro:
      "El primer CV suele dar miedo, porque parece que no hay nada para contar. Sí lo hay: lo que hace falta es ordenarlo y animarse a mostrarlo con honestidad. Esta guía sale de lo que aprendí armando el mío.",
    sections: [
      {
        heading: "Tomate el tiempo de decidir qué mostrar",
        paragraphs: [
          "Mi primer paso fue armar un CV en una de esas aplicaciones conocidas, y después me hice un portfolio. Lo que aprendí en el camino es que hacer un CV exige prolijidad y tiempo: no se trata de completar casilleros, sino de decidir qué información querés que vea de verdad quien lo revisa.",
          "Antes de escribir, preguntate qué querés que sepan de vos en los primeros diez segundos de lectura, y empezá por eso.",
        ],
      },
      {
        heading: "Empezá a crear tu experiencia con lo que ya hacés",
        paragraphs: [
          "Si todavía no tenés trabajos para listar, podés construir tu experiencia desde tu vida cotidiana. Empezá por algo, por más chico que sea: lo importante es empezar.",
        ],
        bullets: [
          "Proyectos personales o de estudio, con lo que hiciste y cómo lo resolviste.",
          "Cursos y certificaciones, junto con algo concreto que construiste con ellos.",
          "Trabajos informales, changas o ayuda en un negocio familiar.",
          "Voluntariado, comunidades, clubes o grupos de estudio.",
          "Idiomas y herramientas que ya usás con soltura.",
        ],
      },
      {
        heading: "Destacá lo que sabés con confianza, sin inflarte",
        paragraphs: [
          "Lo esencial es mostrar con confianza lo que sabés y cuidar la calidad. No se trata de agrandarse ni de inflarse, sino de respaldar con ejemplos reales las soluciones que propusiste. Animate a decir qué valor ofrecés.",
          "Un ejemplo. Antes: «Responsable, proactivo y con ganas de aprender.» Después: «Organicé en una planilla el inventario de un negocio familiar, y así dejamos de quedarnos sin mercadería.» La segunda frase se puede comprobar y se recuerda.",
        ],
      },
      {
        heading: "Sin relleno y sin repetirte",
        paragraphs: [
          "Un CV corto y claro se lee mejor que uno largo. Cada línea tiene que aportar algo nuevo.",
        ],
        bullets: [
          "Sacá las frases genéricas que podría escribir cualquier persona.",
          "No repitas la misma idea en el resumen, en los proyectos y en las habilidades.",
          "Una página alcanza para un primer CV.",
          "Si una línea no suma, borrala.",
        ],
      },
      {
        heading: "Cómo ordenarlo cuando no hay experiencia laboral",
        paragraphs: [
          "Cuando no hay trabajos para mostrar, cambia el orden de las secciones. Una estructura que funciona:",
        ],
        bullets: [
          "Datos de contacto: nombre, email profesional, teléfono y, si tenés, link a tu portfolio.",
          "Resumen de dos o tres líneas: qué buscás y qué sabés hacer.",
          "Proyectos: lo más fuerte que hiciste, con el resultado.",
          "Formación y cursos.",
          "Habilidades y herramientas, e idiomas.",
        ],
      },
      {
        heading: "Sentí que tenés algo para ofrecer",
        paragraphs: [
          "Un CV también es una actitud. Si vos no creés que tenés algo para ofrecer, nadie lo va a ver. Escribilo con seguridad, y siempre con ejemplos que puedas sostener en una entrevista.",
        ],
      },
      {
        heading: "Armalo y descargalo",
        paragraphs: [
          "En Champions CV podés elegir entre cuatro plantillas gratuitas, incluida la plantilla ATS, editar con vista previa en tiempo real y descargar tu PDF sin costo.",
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);