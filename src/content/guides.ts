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
  {
    slug: "errores-comunes-en-un-cv",
    title: "Errores comunes en un CV y cómo evitarlos",
    description:
      "Los errores más frecuentes al armar un currículum, como el exceso de relleno y de diseño, y cómo corregirlos para que tu CV sea simple y directo.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "En mi primer CV cometí un error que se repite mucho: quise llenarlo de cosas. Esta guía junta ese y otros errores comunes, y cómo evitarlos.",
    sections: [
      {
        heading: "Demasiado relleno y demasiado diseño",
        paragraphs: [
          "El error que cometí en mi primer CV fue sumar mucho relleno y mucho diseño. Con el tiempo entendí que a veces conviene ser simple y directo.",
          "Colores, íconos, columnas y gráficos pueden distraer de lo importante, que es lo que sabés hacer. Además, suelen leerse peor en sistemas automáticos y al imprimir.",
        ],
        bullets: [
          "Usá un solo tipo de letra y pocos colores.",
          "Dejá márgenes y espacios para que el texto respire.",
          "Poné primero lo más importante para el puesto.",
        ],
      },
      {
        heading: "Frases genéricas que podría escribir cualquiera",
        paragraphs: [
          "«Responsable, proactivo y con ganas de aprender» no dice nada que se pueda comprobar. Reemplazalo por algo concreto.",
          "Un ejemplo. Antes: «Soy una persona organizada.» Después: «Armé un sistema de turnos en una planilla compartida y redujimos los cruces de horarios.» La segunda frase se entiende y se recuerda.",
        ],
      },
      {
        heading: "Información que no suma al puesto",
        paragraphs: [
          "Cada línea tiene que aportar algo para el puesto al que te postulás. Si no aporta, sobra.",
        ],
        bullets: [
          "Estudios o cursos viejos que no tienen relación con la oferta.",
          "Pasatiempos que no cuentan nada de vos.",
          "La misma idea repetida en el resumen, en la experiencia y en las habilidades.",
        ],
      },
      {
        heading: "Errores de ortografía y de formato",
        paragraphs: [
          "Una errata puede restarle seriedad a un buen perfil. Leelo en voz alta, dejalo reposar un día y pedile a otra persona que lo lea.",
          "Cuidá también que el formato sea parejo: el mismo estilo de fechas, de viñetas y de títulos en todo el documento.",
        ],
      },
      {
        heading: "Datos de contacto mal puestos",
        paragraphs: [
          "Es el error más tonto y el más caro: si no pueden contactarte, el CV no sirve.",
        ],
        bullets: [
          "Usá un email profesional, de preferencia con tu nombre.",
          "Revisá que el teléfono esté bien escrito.",
          "Chequeá que los links a tu portfolio o perfil funcionen.",
        ],
      },
      {
        heading: "Enviar el mismo CV a todas las ofertas",
        paragraphs: [
          "No hace falta rehacerlo cada vez, pero sí ajustar el resumen y lo que destacás según el puesto. Leé la oferta y poné arriba lo que más se relaciona con lo que piden.",
        ],
      },
      {
        heading: "Cómo revisarlo",
        paragraphs: [
          "Mirá tu CV como lo miraría quien lo recibe: unos segundos para entender quién sos y qué sabés hacer. Si en ese tiempo no se entiende, simplificá. En Champions CV podés probar distintas plantillas con vista previa en tiempo real y descargar tu PDF gratis.",
        ],
      },
    ],
  },
  {
    slug: "como-armar-un-portfolio",
    title: "Cómo armar un portfolio que sume experiencia a tu CV",
    description:
      "Cómo armar un portfolio a partir de tu propia experiencia y usarlo como un proyecto más que suma a tu currículum, con consejos para elegir qué mostrar.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "Armé mi portfolio en base a mi experiencia y lo usé como un proyecto más que suma. Así lo encaré, y esto es lo que te recomiendo si querés hacer el tuyo.",
    sections: [
      {
        heading: "Un portfolio también es un proyecto",
        paragraphs: [
          "Mi portfolio salió de mi propia experiencia y lo traté como un proyecto más, que además suma experiencia. Hay que diseñarlo, decidir qué mostrar, publicarlo y mantenerlo, y todo eso también cuenta.",
          "Si todavía no tenés trabajos para listar en tu CV, armar un portfolio es una buena forma de empezar a generar esa experiencia.",
        ],
      },
      {
        heading: "Elegí qué mostrar",
        paragraphs: [
          "Dos o tres trabajos bien presentados valen más que diez a medias. Para cada uno, contá el problema, qué hiciste vos y qué resultado tuvo.",
        ],
        bullets: [
          "Elegí lo más relevante para el tipo de puesto que buscás.",
          "Explicá tu rol, sobre todo si fue un trabajo en equipo.",
          "Sumá un link a la demo o al repositorio, si corresponde, y chequeá que funcione.",
        ],
      },
      {
        heading: "Mantenelo simple y directo",
        paragraphs: [
          "Lo mismo que vale para el CV vale para el portfolio: simple y directo. Que cargue rápido, que se entienda en pocos segundos y que no haga falta adivinar dónde hacer clic.",
        ],
      },
      {
        heading: "Qué incluir",
        paragraphs: ["Con estos elementos alcanza para un primer portfolio:"],
        bullets: [
          "Una presentación corta: quién sos y qué hacés.",
          "Tus mejores proyectos, con el contexto de cada uno.",
          "Tus datos de contacto.",
          "Un link para descargar tu CV en PDF.",
        ],
      },
      {
        heading: "Mantenelo actualizado",
        paragraphs: [
          "Un portfolio abandonado con links rotos juega en contra. Revisalo de vez en cuando, sumá lo último que hiciste y sacá lo que ya no te representa.",
        ],
      },
      {
        heading: "Enlazalo desde tu CV",
        paragraphs: [
          "Poné el link en tu sección de contacto y comprobá que funcione antes de enviarlo. El CV cuenta quién sos en una página, y el portfolio muestra lo que hiciste.",
        ],
      },
    ],
  },
  {
    slug: "cv-ats",
    title: "CV para sistemas ATS: qué son y cómo armar uno claro",
    description:
      "Qué es un sistema ATS, por qué conviene un CV simple y claro, y qué tener en cuenta al elegir una plantilla pensada para que se lea bien.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "Muchas empresas usan sistemas que reciben y ordenan los CVs antes de que los vea una persona. Ninguna plantilla garantiza nada, pero hay formas de armar un CV que se lea bien, tanto para las máquinas como para las personas.",
    sections: [
      {
        heading: "Qué es un ATS",
        paragraphs: [
          "ATS significa Applicant Tracking System, o sistema de seguimiento de candidatos. Es un software que recibe los CVs, los ordena y permite buscar entre ellos.",
          "Cada empresa lo usa a su manera, y no todas filtran de la misma forma. Por eso conviene pensar en un CV claro y fácil de leer, más que en un truco.",
        ],
      },
      {
        heading: "Lo que suele ayudar",
        paragraphs: ["Estas prácticas se recomiendan seguido porque facilitan la lectura:"],
        bullets: [
          "Un diseño de una sola columna.",
          "Títulos claros y conocidos: Experiencia, Educación, Habilidades.",
          "Texto real, no imágenes de texto.",
          "Fuentes estándar y sin adornos que dificulten la lectura.",
          "Un PDF con texto seleccionable. Probalo: si podés seleccionar el texto con el mouse, es texto.",
        ],
      },
      {
        heading: "Usá las palabras de la oferta",
        paragraphs: [
          "Leé la oferta y fijate qué términos usa para los puestos, las herramientas y las habilidades. Si de verdad lo hiciste o lo sabés, usá esas mismas palabras en tu CV.",
        ],
      },
      {
        heading: "Mi experiencia con la plantilla ATS",
        paragraphs: [
          "Cuando armé la plantilla ATS de Champions CV, lo que me llamó la atención es que es sólida y prolija, con buena amplitud y comunicación clara. Además, recibí feedback en poco tiempo.",
          "Eso no significa que una plantilla garantice pasar un filtro: depende de cada sistema y de cada oferta. Pero un diseño limpio es un muy buen punto de partida.",
        ],
      },
      {
        heading: "Escribí primero para personas",
        paragraphs: [
          "Al final, el CV lo lee una persona. Un buen CV para un ATS también es un buen CV para quien lo recibe: ordenado, directo y con ejemplos reales. En Champions CV podés elegir la plantilla ATS, que es gratuita, editarla con vista previa en tiempo real y descargar tu PDF.",
        ],
      },
    ],
  },
  {
    slug: "datos-personales-en-el-cv",
    title: "Qué datos personales poner en tu CV y cuáles no",
    description:
      "Qué datos conviene incluir en un currículum, cuáles evitar y cómo mostrar tu personalidad sin dudar, sabiendo que quien lo lee no te ve.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "Una de las dudas más comunes al armar un CV es cuánto contar de uno mismo. No existe la información perfecta, pero hay criterios que ayudan a decidir.",
    sections: [
      {
        heading: "No existe la información perfecta",
        paragraphs: [
          "No hay una lista perfecta de datos, y cada puesto pide algo distinto. Quien lee tu CV no te ve, así que el CV tiene que hacer el trabajo de destacarte.",
          "Decidí con criterio, sin dudar, y no te quedes dándole vueltas después de enviarlo.",
        ],
      },
      {
        heading: "Los datos que sí conviene incluir",
        paragraphs: ["Lo básico para que puedan ubicarte:"],
        bullets: [
          "Nombre completo.",
          "Un email profesional.",
          "Teléfono.",
          "Ciudad y provincia o país, sin la dirección completa.",
          "Links a tu LinkedIn o a tu portfolio, si tenés.",
        ],
      },
      {
        heading: "Los datos que conviene evitar",
        paragraphs: [
          "Hay información que no suele hacer falta para postularte y que es mejor no difundir.",
        ],
        bullets: [
          "El número de DNI o CUIL: se usa para trámites y no hace falta para presentarte.",
          "El domicilio completo.",
          "Fotos o imágenes de documentos.",
          "Estado civil o datos familiares, que no aportan a tu perfil profesional.",
        ],
      },
      {
        heading: "La foto y la edad: depende del puesto",
        paragraphs: [
          "La foto no es obligatoria. Algunas ofertas la piden o la esperan y otras no. Si la ponés, que sea clara y profesional. Para sistemas automáticos, suele ser preferible un diseño sin foto.",
        ],
      },
      {
        heading: "Mostrá un poco de tu personalidad",
        paragraphs: [
          "Como quien lee no te ve, contá un poco quién sos. Un resumen con tu forma de trabajar, o un interés que se relacione con el puesto, hace que el CV se recuerde.",
          "Hacelo con ejemplos reales y sin inflarte: la idea es destacar, no exagerar.",
        ],
      },
      {
        heading: "Cuidá tus datos",
        paragraphs: [
          "Enviá tu CV a empresas y personas reales, y tené presente que si lo publicás online cualquiera puede verlo. Si vas a publicarlo, pensá dos veces antes de incluir tu teléfono o tu mail personal.",
        ],
      },
      {
        heading: "Decidí y avanzá",
        paragraphs: [
          "Revisalo una vez más y enviá tu CV. Con Champions CV podés probar las plantillas, ver cómo queda en tiempo real y descargar el PDF gratis.",
        ],
      },
    ],
  },
    {
    slug: "resumen-profesional-cv",
    title: "Cómo escribir el resumen profesional de tu CV (con ejemplos)",
    description:
      "Cómo escribir un resumen profesional claro y breve para tu currículum: una fórmula simple, ejemplos de antes y después y los errores más comunes.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "El resumen es lo primero que se lee de tu CV, y muchas veces lo único que se lee con atención. En pocas líneas tiene que decir quién sos, qué sabés hacer y qué buscás.",
    sections: [
      {
        heading: "Qué es y para qué sirve",
        paragraphs: [
          "Es un párrafo corto, de dos a cuatro líneas, que va arriba de todo, debajo de tu nombre y tus datos de contacto. Funciona como una presentación: quien lo lee decide en pocos segundos si sigue con el resto.",
          "No es una lista de cualidades ni una biografía. Es una síntesis de lo que ofrecés, pensada para el puesto al que te postulás.",
        ],
      },
      {
        heading: "Una fórmula simple",
        paragraphs: ["Si no sabés por dónde empezar, armalo en tres partes:"],
        bullets: [
          "Quién sos: tu perfil o rol y, si querés, tus años de experiencia.",
          "Qué sabés hacer: dos o tres cosas concretas, con herramientas o resultados.",
          "Qué buscás o qué aportás: el tipo de puesto o el valor que ofrecés.",
        ],
      },
      {
        heading: "Ejemplos de antes y después",
        paragraphs: [
          "Los ejemplos que siguen son inventados, solo para ilustrar el formato.",
          "Antes: «Persona responsable y proactiva, en busca de nuevas oportunidades laborales.» Después: «Administrativa con 4 años de experiencia en facturación y atención a proveedores. Trabajo con Excel y sistemas de gestión, y busco sumarme a un equipo de administración.»",
          "Antes: «Apasionado por la tecnología.» Después: «Desarrollador web junior con proyectos propios en JavaScript y React. Armé una aplicación con login y pagos online, y busco mi primera experiencia en un equipo de producto.»",
        ],
      },
      {
        heading: "Si todavía no tenés experiencia",
        paragraphs: [
          "Reemplazá los años de trabajo por lo que ya hiciste: proyectos, cursos, trabajos informales o voluntariados. Lo importante es que sea real y que lo puedas explicar en una entrevista.",
          "No hace falta inflar nada. Una frase honesta y concreta se recuerda más que una exagerada.",
        ],
      },
      {
        heading: "Adaptalo a cada puesto",
        paragraphs: [
          "Leé la oferta y fijate qué piden. Ajustá una o dos frases del resumen para que lo más relevante quede primero. Con cambiar unas pocas palabras alcanza, no hace falta reescribirlo cada vez.",
        ],
      },
      {
        heading: "Errores comunes",
        paragraphs: ["Estos son los que más se repiten:"],
        bullets: [
          "Frases genéricas que podría escribir cualquiera, como «proactivo y con ganas de aprender».",
          "Resúmenes largos que parecen una biografía.",
          "Repetir en el resumen lo que ya dice el resto del CV.",
          "Afirmar cosas que después no podés respaldar.",
        ],
      },
      {
        heading: "Escribilo al final",
        paragraphs: [
          "Un buen truco es dejarlo para el último momento: cuando ya armaste el resto del CV, te queda más claro qué querés destacar. En Champions CV podés ver cómo queda mientras lo editás, con vista previa en tiempo real.",
        ],
      },
    ],
  },
  {
    slug: "cuantas-paginas-debe-tener-un-cv",
    title: "¿Cuántas páginas debe tener un CV? Una o dos",
    description:
      "Cuántas páginas debe tener un currículum según tu experiencia, qué priorizar, qué sacar y cómo achicarlo sin dejar la letra ilegible.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "No hay una regla oficial, pero sí un criterio práctico: tu CV tiene que ser lo bastante largo para mostrar lo importante y lo bastante corto para que se lea completo.",
    sections: [
      {
        heading: "Una página: cuándo alcanza",
        paragraphs: [
          "Si estás empezando, tenés poca experiencia o tu trayectoria relevante entra sin apretar, una página es lo mejor. Un CV de una página bien ordenado se lee mejor que uno de dos con relleno.",
        ],
      },
      {
        heading: "Dos páginas: cuándo tiene sentido",
        paragraphs: [
          "Si tenés varios años de trayectoria relevante, muchos proyectos o publicaciones, una segunda página puede estar justificada. Pero tiene que aportar información nueva, no repetir ni rellenar.",
          "Más de dos páginas rara vez hace falta.",
        ],
      },
      {
        heading: "Qué priorizar",
        paragraphs: ["Cuando tenés que decidir qué queda, seguí este orden:"],
        bullets: [
          "Lo más reciente primero.",
          "Lo más relacionado con el puesto, arriba.",
          "Resultados antes que tareas: qué lograste, no solo qué hacías.",
        ],
      },
      {
        heading: "Qué sacar",
        paragraphs: ["Para achicar sin perder lo importante, empezá por acá:"],
        bullets: [
          "Trabajos muy antiguos que no tienen relación con la oferta.",
          "Cursos básicos o viejos que ya no suman.",
          "Datos personales que no hacen falta.",
          "Frases genéricas y repeticiones.",
        ],
      },
      {
        heading: "Cómo achicarlo sin romperlo",
        paragraphs: [
          "Dejá entre tres y cinco viñetas por puesto, y agrupá estudios y cursos en una sola sección.",
          "No resuelvas el problema bajando la letra o los márgenes al mínimo: si tenés que apretar tanto para que entre, es señal de que sobra contenido.",
        ],
      },
      {
        heading: "Cuando se pasa por pocas líneas",
        paragraphs: [
          "Si apenas un par de líneas se pasan a la segunda página, recortá. Una segunda hoja casi vacía da una mala impresión y se resuelve sacando lo menos importante.",
        ],
      },
      {
        heading: "Probalo mientras lo armás",
        paragraphs: [
          "En Champions CV podés ver cómo queda tu CV mientras lo editás, con vista previa en tiempo real, y probar distintas plantillas hasta encontrar la que mejor ordene tu información.",
        ],
      },
    ],
  },
  {
    slug: "cv-atencion-al-cliente-y-administrativos",
    title: "CV para atención al cliente y puestos administrativos",
    description:
      "Cómo armar un CV para atención al cliente o puestos administrativos: qué destacar, cómo mostrar resultados y qué herramientas incluir.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "En atención al cliente y en administración se busca gente organizada, que se comunique bien y maneje las herramientas del puesto. Tu CV tiene que mostrarlo con hechos, no con adjetivos.",
    sections: [
      {
        heading: "Qué suelen buscar",
        paragraphs: ["Aunque cada empresa es distinta, estas cosas se repiten en las ofertas:"],
        bullets: [
          "Comunicación clara y buen trato con las personas.",
          "Orden y atención al detalle.",
          "Manejo de herramientas: planillas, sistemas de gestión, facturación.",
          "Confiabilidad: cumplir horarios y plazos.",
        ],
      },
      {
        heading: "Un resumen que diga algo",
        paragraphs: [
          "Un ejemplo inventado para ilustrar: «Asistente administrativa con 3 años de experiencia en facturación y atención telefónica. Manejo Excel y sistemas de gestión, y busco sumarme a un equipo donde pueda ordenar procesos.»",
        ],
      },
      {
        heading: "Mostrá resultados, aunque sean chicos",
        paragraphs: [
          "Evitá describir solo tus tareas. Contá qué cambió gracias a lo que hacías.",
          "Un ejemplo inventado para ilustrar. Antes: «Atención de clientes por teléfono y por mail.» Después: «Atendía unas 40 consultas por día por teléfono y por mail, y resolvía la mayoría en el primer contacto.» La segunda frase se puede imaginar y se recuerda.",
        ],
      },
      {
        heading: "Las herramientas: solo las que usás",
        paragraphs: [
          "Listá lo que manejás de verdad, y usá los mismos nombres que aparecen en la oferta.",
        ],
        bullets: [
          "Planillas: Excel o Google Sheets.",
          "Correo y calendarios.",
          "Sistemas de gestión, facturación o CRM, si los usaste.",
          "Atención por chat o por redes, si la tuviste.",
        ],
      },
      {
        heading: "Habilidades blandas con ejemplos",
        paragraphs: [
          "En vez de escribir «buena comunicación» o «trabajo en equipo», contá una situación concreta: un reclamo que resolviste, un proceso que ordenaste o una tarea que coordinaste con otras personas.",
        ],
      },
      {
        heading: "Otros datos que suman",
        paragraphs: ["Para estos puestos, suelen importar mucho:"],
        bullets: [
          "Tu disponibilidad horaria.",
          "La zona donde vivís o a la que podés viajar.",
          "Idiomas, si el puesto los pide.",
          "Estudios y cursos relacionados.",
        ],
      },
      {
        heading: "Armalo y descargalo",
        paragraphs: [
          "En Champions CV podés elegir entre 12 plantillas, 4 de ellas gratuitas, editar con vista previa en tiempo real y descargar tu CV en PDF.",
        ],
      },
    ],
  },
  {
    slug: "carta-de-presentacion",
    title: "Cómo escribir una carta de presentación breve y efectiva",
    description:
      "Cómo escribir una carta de presentación corta que acompañe tu CV: estructura en tres partes, un ejemplo y los errores más comunes.",
    date: "2026-10-26",
    readingMinutes: 4,
    intro:
      "La carta de presentación no reemplaza a tu CV: lo acompaña y explica por qué te interesa ese puesto. No siempre se pide, pero cuando sí, conviene que sea corta, propia y pensada para esa oferta.",
    sections: [
      {
        heading: "Cuándo escribirla",
        paragraphs: [
          "Leé bien la oferta: si pide carta, escribila. Si no la pide, puede igualmente ayudarte cuando necesitás dar contexto que el CV no cuenta, por ejemplo un cambio de rubro, un primer empleo o un motivo concreto por el que te interesa esa empresa.",
        ],
      },
      {
        heading: "Estructura en tres partes",
        paragraphs: ["Con tres párrafos cortos alcanza:"],
        bullets: [
          "Apertura: quién sos y a qué puesto te postulás.",
          "Desarrollo: por qué encajás, con uno o dos ejemplos concretos.",
          "Cierre: tu disponibilidad y un agradecimiento.",
        ],
      },
      {
        heading: "Un ejemplo",
        paragraphs: [
          "El siguiente ejemplo es inventado, solo para ilustrar la estructura.",
          "«Hola, equipo de Distribuidora Norte: me llamo Lucía Gómez y me postulo al puesto de asistente administrativa. En mi trabajo anterior me ocupaba de la facturación y de la atención a proveedores, y armé una planilla de seguimiento que ayudó a reducir los pagos atrasados. Me interesa este puesto porque busco un lugar donde ordenar procesos y trabajar en equipo. Tengo disponibilidad inmediata y quedo a disposición para una entrevista. Gracias por su tiempo. Saludos cordiales, Lucía Gómez.»",
        ],
      },
      {
        heading: "Personalizala para cada oferta",
        paragraphs: [
          "Mencioná el nombre de la empresa y el puesto, y sumá una referencia concreta que muestre que leíste la oferta. Si conocés el nombre de quien recibe las postulaciones, usalo. Mandar la misma carta a todos lados se nota.",
        ],
      },
      {
        heading: "Errores comunes",
        paragraphs: ["Estos son los que más se repiten:"],
        bullets: [
          "Repetir el CV en vez de aportar algo nuevo.",
          "Escribir una carta demasiado larga: media página suele alcanzar.",
          "Usar frases genéricas que sirven para cualquier puesto.",
          "No revisar la ortografía.",
          "Un tono demasiado rígido o demasiado informal.",
        ],
      },
      {
        heading: "Cómo enviarla",
        paragraphs: [
          "Fijate qué pide la oferta: algunas piden la carta como archivo adjunto y otras, en el cuerpo del mail. Usá un asunto claro que incluya el puesto, por ejemplo «Postulación: asistente administrativa».",
        ],
      },
      {
        heading: "Primero el CV",
        paragraphs: [
          "La carta acompaña al CV, así que dejá el CV listo antes. En Champions CV podés armarlo con vista previa en tiempo real y descargarlo en PDF.",
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);