import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, ArrowRight } from "lucide-react";


const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Ideal para perfiles corporativos y administrativos.",
    premium: false,
  },
  {
    id: 2,
    name: "Modern",
    description: "Perfecta para tecnología, desarrollo y startups.",
    premium: false,
  },
  {
    id: 3,
    name: "Creative",
    description: "Diseñada para perfiles creativos y marketing.",
    premium: true,
  },
  {
    id: 4,
    name: "Minimal",
    description: "Simple, elegante y enfocada en contenido.",
    premium: false,
  },
  {
    id: 5,
    name: "Executive",
    description: "Para líderes, managers y profesionales senior.",
    premium: true,
  },
  {
    id: 6,
    name: "Classic",
    description: "El formato tradicional que funciona siempre.",
    premium: false,
  },
];


export function Templates() {

return (

<section
id="templates"
className="
relative
overflow-hidden
py-24
bg-muted/20
"
>


<div className="mx-auto max-w-7xl px-6">


{/* Header */}

<div
className="
mx-auto
mb-16
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
Plantillas
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
Diseños profesionales que hacen destacar tu perfil
</h2>


<p
className="
mt-5
text-lg
text-muted-foreground
"
>
Elige una plantilla optimizada para ATS y crea un currículum
que transmita profesionalismo desde el primer vistazo.
</p>


</div>



{/* Grid */}

<div
className="
grid
gap-8
sm:grid-cols-2
lg:grid-cols-3
"
>


{templates.map((template)=>(


<div
key={template.id}
className="
group
overflow-hidden
rounded-3xl
border
bg-white
shadow-sm
transition-all
duration-300
hover:-translate-y-2
hover:shadow-2xl
"
>


{/* Preview */}

<div
className="
relative
flex
h-96
items-center
justify-center
bg-gradient-to-br
from-gray-50
to-gray-100
"
>


{template.premium && (

<Badge
className="
absolute
right-5
top-5
gap-1
bg-orange-500
"
>
<Crown className="h-3 w-3"/>
Premium
</Badge>

)}



{/* CV Preview */}

<div
className="
h-[290px]
w-[210px]
rounded-lg
border
bg-white
p-4
shadow-xl
transition-transform
duration-300
group-hover:scale-105
"
>


<div className="h-5 w-24 rounded bg-gray-300"/>


<div className="mt-5 space-y-2">

<div className="h-2 rounded bg-gray-200"/>
<div className="h-2 rounded bg-gray-200"/>
<div className="h-2 w-4/5 rounded bg-gray-200"/>

</div>


<div className="mt-8 h-3 w-20 rounded bg-orange-400"/>


<div className="mt-3 space-y-2">

<div className="h-2 rounded bg-gray-200"/>
<div className="h-2 rounded bg-gray-200"/>
<div className="h-2 w-3/4 rounded bg-gray-200"/>

</div>



</div>



</div>



{/* Info */}

<div className="p-6">


<h3
className="
text-xl
font-semibold
text-gray-900
"
>
{template.name}
</h3>


<p
className="
mt-2
text-sm
text-gray-600
"
>
{template.description}
</p>



<Button
asChild
className="
mt-6
w-full
bg-orange-500
hover:bg-orange-600
"
>

<Link to="/builder">

Usar plantilla

<ArrowRight className="ml-2 h-4 w-4"/>

</Link>

</Button>


</div>


</div>


))}


</div>


</div>

</section>

)

}