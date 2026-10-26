import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT_EMAIL } from "@/config/legal";
import { PREMIUM_CURRENCY, PREMIUM_PERIOD, PREMIUM_PRICE } from "@/config/plan-features";
import { HelpCircle } from "lucide-react";

const premiumPrice = `${PREMIUM_PRICE} ${PREMIUM_CURRENCY}${PREMIUM_PERIOD ?? ""}`;

const faqs = [
  {
    question: "¿Champions CV es gratuito?",
    answer:
      "Sí. Con una cuenta gratuita podés usar 4 plantillas, editar con vista previa en tiempo real y descargar tu CV en PDF. El plan Premium suma más plantillas y opciones de personalización.",
  },
  {
    question: "¿Qué incluye el plan Premium?",
    answer: `Es un pago único de ${premiumPrice}, por 12 meses y sin renovación automática. Incluye las 8 plantillas Premium, tipografía y tamaño a tu medida, y la posibilidad de reabrir y editar tus CVs guardados.`,
  },
  {
    question: "¿Las plantillas son compatibles con ATS?",
    answer:
      "Incluimos una plantilla ATS Friendly, gratuita, pensada para leerse bien en esos sistemas. Ninguna plantilla puede garantizar que un CV pase un filtro, porque cada empresa configura el suyo. En la sección de guías explicamos cómo armar un CV claro.",
  },
  {
    question: "¿Puedo editar mi CV después de crearlo?",
    answer:
      "Mientras editás, tu borrador se guarda en tu navegador. Al descargarlo, el CV queda en Mis CVs: con el plan Free podés volver a descargarlo, y con Premium también podés reabrirlo y editarlo.",
  },
  {
    question: "¿Necesito instalar algún programa?",
    answer:
      "No. Champions CV funciona desde tu navegador, sin instalar ningún software adicional.",
  },
  {
    question: "¿Cómo descargo mi currículum?",
    answer:
      "Cuando termines de editar, lo descargás en PDF y queda listo para enviar. Necesitás una cuenta gratuita para descargar.",
  },
  {
    question: "¿Puedo pedir la devolución si compro Premium?",
    answer: `Sí. Tenés 10 días corridos desde la compra para arrepentirte y pedir la devolución escribiendo a ${CONTACT_EMAIL} desde el email de tu cuenta. Los detalles están en los Términos y condiciones.`,
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