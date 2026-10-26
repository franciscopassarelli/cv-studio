import { Download, FileEdit, LayoutTemplate } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    title: "Completá tus datos",
    description:
      "Agregá tu experiencia, estudios y habilidades en un editor simple, con vista previa en tiempo real.",
  },
  {
    icon: LayoutTemplate,
    title: "Elegí tu diseño",
    description: "Elegí entre 12 plantillas, 4 de ellas gratuitas, y personalizá el color.",
  },
  {
    icon: Download,
    title: "Descargá y postulate",
    description:
      "Descargá tu CV en PDF, listo para enviar. Necesitás una cuenta gratuita para descargar.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background py-24">
      {/* Fondo ambiental */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-orange-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            ¿Cómo funciona?
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Creá tu CV en 3 simples pasos
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Desde cero hasta un currículum listo para enviar, en pocos minutos.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid gap-10 md:grid-cols-3">
          {/* Línea conectora entre pasos (Desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-28 hidden h-1 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 opacity-30 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative flex flex-col justify-between">
                {/* Badge de Paso */}
                <div className="absolute -left-2 -top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-orange-300/50 bg-gradient-to-br from-orange-500 to-amber-500 font-extrabold text-white shadow-md shadow-orange-500/30">
                  {index + 1}
                </div>

                {/* Card principal */}
                <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-gray-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-orange-300/80 hover:shadow-xl hover:shadow-orange-500/10">
                  <div>
                    {/* Contenedor del ícono */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}