import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Champions CV es gratuito?",
    answer:
      "Sí. Podés crear tu primer currículum gratis utilizando nuestras plantillas básicas y descargarlo directamente en PDF.",
  },
  {
    question: "¿Qué incluye el plan Premium?",
    answer:
      "El plan Premium desbloquea todas las plantillas avanzadas, creación de currículums ilimitados, cartas de presentación, optimización ATS superior, guardado en la nube y sugerencias impulsadas por Inteligencia Artificial.",
  },
  {
    question: "¿Los currículums son compatibles con ATS?",
    answer:
      "Sí. Todas nuestras plantillas están estrictamente diseñadas y estructuradas para superar los filtros de los sistemas ATS utilizados por reclutadores e industrias.",
  },
  {
    question: "¿Puedo editar mi CV después de crearlo?",
    answer:
      "Sí. Tus currículums quedan guardados en tu cuenta para que puedas modificarlos, duplicarlos o volver a descargarlos cuando lo necesites.",
  },
  {
    question: "¿Necesito instalar algún programa?",
    answer:
      "No. Champions CV funciona 100% desde la nube y directamente en tu navegador, sin necesidad de instalar ningún software adicional.",
  },
  {
    question: "¿Cómo descargo mi currículum?",
    answer:
      "Una vez que finalices la edición, vas a poder exportarlo en un clic en formato PDF de alta resolución listo para postularte.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-background py-24">
      {/* Luz ambiental de fondo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-orange-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white shadow-lg shadow-orange-500/20">
            <HelpCircle className="h-8 w-8" />
          </div>

          <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            Preguntas frecuentes
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Respondemos tus dudas
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Todo lo que necesitás saber antes de crear tu currículum.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="rounded-3xl border border-gray-200/80 bg-white/80 p-4 shadow-xl shadow-gray-200/50 backdrop-blur-md md:p-6">
          <Accordion type="single" collapsible className="w-full px-2 md:px-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-gray-100 py-1 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base font-bold text-gray-900 transition-colors duration-200 hover:text-orange-600 hover:no-underline md:text-lg">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-sm leading-relaxed text-gray-600 md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
