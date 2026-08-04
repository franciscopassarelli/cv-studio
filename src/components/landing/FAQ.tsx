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
      "Sí. Puedes crear tu primer currículum gratis utilizando nuestras plantillas básicas y descargarlo en PDF.",
  },
  {
    question: "¿Qué incluye el plan Premium?",
    answer:
      "Premium desbloquea todas las plantillas, múltiples currículums, cartas de presentación, almacenamiento en la nube y futuras herramientas con inteligencia artificial.",
  },
  {
    question: "¿Los currículums son compatibles con ATS?",
    answer:
      "Sí. Todas nuestras plantillas están diseñadas para funcionar correctamente con sistemas ATS utilizados por empresas y reclutadores.",
  },
  {
    question: "¿Puedo editar mi CV después de crearlo?",
    answer:
      "Sí. Tus currículums quedan guardados en tu cuenta para modificarlos, duplicarlos o descargarlos nuevamente cuando quieras.",
  },
  {
    question: "¿Necesito instalar algún programa?",
    answer:
      "No. Champions CV funciona directamente desde el navegador, sin necesidad de instalar nada.",
  },
  {
    question: "¿Cómo descargo mi currículum?",
    answer:
      "Cuando finalices tu CV podrás exportarlo en formato PDF y compartirlo fácilmente con empresas o reclutadores.",
  },
];


export function FAQ() {

return (

<section
id="faq"
className="
relative
overflow-hidden
py-24
bg-background
"
>


{/* Glow */}

<div
className="
absolute
right-0
top-20
h-72
w-72
rounded-full
bg-orange-400/10
blur-3xl
"
/>



<div className="mx-auto max-w-4xl px-6 relative">


{/* Header */}

<div
className="
mb-14
text-center
"
>


<div
className="
mx-auto
mb-5
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-orange-100
text-orange-600
"
>
<HelpCircle size={28}/>
</div>



<span
className="
rounded-full
bg-orange-100
px-4
py-1
text-sm
font-medium
text-orange-600
"
>
Preguntas frecuentes
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
Respondemos tus dudas
</h2>



<p
className="
mt-5
text-lg
text-muted-foreground
"
>
Todo lo que necesitas saber antes de crear tu currículum.
</p>


</div>




{/* Accordion */}

<div
className="
rounded-3xl
border
bg-white
p-4
shadow-sm
"
>


<Accordion
type="single"
collapsible
className="w-full px-4"
>


{faqs.map((faq,index)=>(


<AccordionItem
key={index}
value={`item-${index}`}
className="
border-gray-200
"
>


<AccordionTrigger
className="
text-left
text-base
font-semibold
text-gray-900
hover:text-orange-600
"
>

{faq.question}

</AccordionTrigger>



<AccordionContent
className="
leading-7
text-gray-600
"
>

{faq.answer}

</AccordionContent>


</AccordionItem>


))}


</Accordion>


</div>



</div>


</section>

)

}