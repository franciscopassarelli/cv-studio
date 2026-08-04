import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";


const plans = [
  {
    name: "Gratis",
    price: "$0",
    description: "Para crear tu primer currículum.",
    highlighted: false,
    features: [
      "1 CV",
      "Plantillas gratuitas",
      "Descarga en PDF",
      "Editor completo",
      "Personalización básica",
    ],
    button: "Empezar gratis",
  },

  {
    name: "Premium",
    price: "$4.999",
    period: "/mes",
    description: "Para profesionales que quieren destacar.",
    highlighted: true,
    features: [
      "CVs ilimitados",
      "Todas las plantillas",
      "Diseños Premium",
      "Carta de presentación",
      "Optimización ATS",
      "Sin marca de agua",
      "Guardado en la nube",
      "Mejoras con IA",
    ],
    button: "Probar Premium",
  },
];


export function Pricing() {
const { user } = useAuth();
return (

<section
id="pricing"
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
Planes
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
Elige el plan perfecto para tu carrera
</h2>


<p
className="
mt-5
text-lg
text-muted-foreground
"
>
Empieza gratis y desbloquea herramientas avanzadas
cuando estés listo para destacar.
</p>


</div>



{/* Cards */}

<div
className="
grid
max-w-5xl
mx-auto
gap-8
lg:grid-cols-2
"
>


{plans.map((plan)=>(


<div
key={plan.name}
className={`
relative
rounded-3xl
border
p-8
transition-all
duration-300
hover:-translate-y-2
hover:shadow-2xl

${
plan.highlighted
?
"bg-gradient-to-br from-orange-500 to-orange-700 text-white border-orange-500 shadow-xl shadow-orange-500/20"
:
"bg-white shadow-sm"
}

`}
>


{plan.highlighted && (

<Badge
className="
absolute
right-6
top-6
gap-1
bg-white
text-orange-600
"
>

<Crown className="h-3 w-3"/>

Más popular

</Badge>

)}



<h3
className={`
text-2xl
font-bold
${plan.highlighted ? "text-white" : "text-gray-900"}
`}
>
{plan.name}
</h3>



<p
className={`
mt-2
${plan.highlighted ? "text-white/80" : "text-gray-600"}
`}
>
{plan.description}
</p>




<div className="mt-8 flex items-end gap-1">


<span
className="
text-5xl
font-bold
"
>
{plan.price}
</span>


{plan.period && (

<span
className={`
pb-2
${plan.highlighted ? "text-white/80" : "text-gray-500"}
`}
>
{plan.period}
</span>

)}


</div>



<div
className={`
my-8
h-px
${plan.highlighted ? "bg-white/20" : "bg-gray-200"}
`}
/>



<ul className="space-y-4">


{plan.features.map((feature)=>(


<li
key={feature}
className="flex items-center gap-3"
>


<div
className={`
flex
h-6
w-6
items-center
justify-center
rounded-full

${
plan.highlighted
?
"bg-white/20"
:
"bg-orange-100 text-orange-600"
}

`}
>

<Check className="h-4 w-4"/>

</div>


<span>
{feature}
</span>


</li>


))}


</ul>


<Button
  asChild
  size="lg"
  className={`
    mt-10
    w-full
    ${
      plan.highlighted
        ? "bg-white text-orange-600 hover:bg-gray-100"
        : ""
    }
  `}
  variant={plan.highlighted ? "default" : "outline"}
>
  {plan.name === "Gratis" ? (
    user ? (
      <Link to="/builder">
        {plan.button}
      </Link>
    ) : (
      <Link
        to="/login"
        search={{
          redirectTo: "/builder",
        }}
      >
        {plan.button}
      </Link>
    )
  ) : (
    user ? (
      <Link to="/checkout">
        {plan.button}
        <Sparkles className="ml-2 h-4 w-4" />
      </Link>
    ) : (
      <Link
        to="/login"
        search={{
          redirectTo: "/checkout",
        }}
      >
        {plan.button}
        <Sparkles className="ml-2 h-4 w-4" />
      </Link>
    )
  )}
</Button>



</div>


))}


</div>



</div>


</section>

)

}