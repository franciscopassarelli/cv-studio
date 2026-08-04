import {
  FileText,
  Palette,
  Download,
  ShieldCheck,
  Sparkles,
  Clock3,
} from "lucide-react";


const features = [
  {
    icon: FileText,
    title: "Editor inteligente",
    description:
      "Completa tu experiencia laboral y observa tu currículum evolucionar en tiempo real.",
  },
  {
    icon: Palette,
    title: "Diseños profesionales",
    description:
      "Plantillas modernas creadas para destacar tu perfil ante cualquier reclutador.",
  },
  {
    icon: Download,
    title: "Exportación PDF",
    description:
      "Descarga tu CV listo para enviar, imprimir o compartir con empresas.",
  },
  {
    icon: ShieldCheck,
    title: "Preparado para ATS",
    description:
      "Optimizado para superar los filtros automáticos de selección laboral.",
  },
  {
    icon: Sparkles,
    title: "Personalización total",
    description:
      "Ajusta colores, estilos y secciones para crear un CV único.",
  },
  {
    icon: Clock3,
    title: "Crealo rápido",
    description:
      "Genera un currículum profesional en minutos sin conocimientos de diseño.",
  },
];


export function Features() {
  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        py-24
        bg-background
      "
    >

      {/* Glow fondo */}
      <div
        className="
          absolute
          top-20
          left-1/2
          -translate-x-1/2
          h-72
          w-72
          rounded-full
          bg-orange-400/10
          blur-3xl
        "
      />


      <div className="
        relative
        mx-auto
        max-w-7xl
        px-6
      ">


        {/* Header */}

        <div className="
          mx-auto
          mb-16
          max-w-3xl
          text-center
        ">

          <span
            className="
              inline-flex
              rounded-full
              border
              border-orange-200
              bg-orange-50
              px-4
              py-1
              text-sm
              font-medium
              text-orange-600
            "
          >
            Características
          </span>


          <h2
            className="
              mt-5
              text-4xl
              font-bold
              tracking-tight
              text-gray-900
              md:text-5xl
            "
          >
            Todo lo que necesitas para crear un CV ganador
          </h2>


          <p
            className="
              mt-5
              text-lg
              text-muted-foreground
            "
          >
            Una herramienta simple para crear currículums modernos,
            profesionales y preparados para conseguir más oportunidades.
          </p>

        </div>



        {/* Cards */}

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {features.map((feature)=>{

            const Icon = feature.icon;


            return (

              <div
                key={feature.title}
                className="
                  group
                  rounded-2xl
                  border
                  bg-white/70
                  backdrop-blur
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-orange-300
                  hover:shadow-xl
                "
              >

                <div
                  className="
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-orange-400
                    to-orange-600
                    text-white
                    shadow-lg
                    shadow-orange-500/20
                    transition-transform
                    group-hover:scale-110
                  "
                >
                  <Icon size={26}/>
                </div>


                <h3
                  className="
                    mb-3
                    text-xl
                    font-semibold
                    text-gray-900
                  "
                >
                  {feature.title}
                </h3>


                <p
                  className="
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  {feature.description}
                </p>


              </div>

            )

          })}

        </div>

      </div>

    </section>
  );
}