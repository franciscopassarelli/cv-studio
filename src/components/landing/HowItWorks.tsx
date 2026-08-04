import { FileEdit, LayoutTemplate, Download } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    title: "Completa tus datos",
    description:
      "Agrega tu experiencia, estudios, habilidades y proyectos con un editor simple.",
  },
  {
    icon: LayoutTemplate,
    title: "Elige tu diseño",
    description:
      "Selecciona una plantilla profesional y adapta los colores a tu estilo.",
  },
  {
    icon: Download,
    title: "Descarga y postula",
    description:
      "Exporta tu CV en PDF optimizado para ATS y listo para enviar.",
  },
];


export function HowItWorks() {

return (

<section
id="how-it-works"
className="
relative
overflow-hidden
py-24
bg-background
"
>


<div className="mx-auto max-w-7xl px-6">


{/* Header */}

<div
className="
mx-auto
mb-20
max-w-3xl
text-center
"
>

<span
className="
inline-flex
rounded-full
bg-orange-100
px-4
py-1
text-sm
font-medium
text-orange-600
"
>
¿Cómo funciona?
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
Crea tu CV profesional en 3 simples pasos
</h2>


<p
className="
mt-5
text-lg
text-muted-foreground
"
>
Desde cero hasta un currículum listo para enviar
en pocos minutos.
</p>


</div>



{/* Steps */}

<div
className="
relative
grid
gap-10
md:grid-cols-3
"
>


{/* Línea */}

<div
className="
absolute
left-1/2
top-20
hidden
h-1
w-2/3
-translate-x-1/2
rounded-full
bg-orange-100
lg:block
"
/>



{steps.map((step,index)=>{


const Icon = step.icon;


return (

<div
key={step.title}
className="
relative
"
>


{/* Número */}

<div
className="
absolute
-left-1
-top-5
z-10
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-orange-500
text-white
font-bold
shadow-lg
shadow-orange-500/30
"
>
{index+1}
</div>



<div
className="
rounded-3xl
border
bg-white
p-8
shadow-sm
transition-all
duration-300
hover:-translate-y-2
hover:shadow-xl
hover:border-orange-200
"
>


<div
className="
mb-6
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-orange-50
text-orange-600
"
>
<Icon size={32}/>
</div>



<h3
className="
text-xl
font-semibold
text-gray-900
"
>
{step.title}
</h3>


<p
className="
mt-4
leading-7
text-gray-600
"
>
{step.description}
</p>


</div>


</div>


)


})}



</div>


</div>


</section>

)

}