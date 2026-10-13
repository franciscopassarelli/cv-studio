import { FileText, Palette, Download, ShieldCheck, Sparkles, Clock3 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Editor inteligente",
    description:
      "Completa tu experiencia laboral y observa tu currículum evolucionar en tiempo real con vista previa instantánea.",
  },
  {
    icon: Palette,
    title: "Diseños profesionales",
    description:
      "Plantillas modernas creadas por expertos para destacar tu perfil ante cualquier equipo de reclutamiento.",
  },
  {
    icon: Download,
    title: "Exportación PDF ultra rápida",
    description:
      "Descarga tu CV listo para enviar, imprimir o compartir en plataformas de empleo en segundos.",
  },
  {
    icon: ShieldCheck,
    title: "Preparado para ATS",
    description:
      "Formatos optimizados para superar con éxito los filtros automáticos de los sistemas de selección laboral.",
  },
  {
    icon: Sparkles,
    title: "Personalización total",
    description:
      "Ajusta colores, tipografías y orden de secciones para crear una presentación que refleje tu marca personal.",
  },
  {
    icon: Clock3,
    title: "Crealo en minutos",
    description:
      "Genera un currículum de impacto rápidamente, sin necesidad de conocimientos de diseño o edición.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-background py-24">
      {/* Fondo ambiental / Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[450px] w-[650px] rounded-full bg-orange-500/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            Características
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Todo lo que necesitas para crear un CV ganador
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Una herramienta simple e intuitiva para construir currículums modernos, profesionales y
            listos para conseguir más entrevistas.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-gray-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-orange-300/80 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div>
                  {/* Icon Container */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>

                  <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
