import { Link } from "@tanstack/react-router";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";


export function Footer() {

return (

<footer
className="
relative
overflow-hidden
bg-zinc-950
text-white
"
>


{/* Glow */}

<div
className="
absolute
left-1/2
top-0
h-72
w-72
-translate-x-1/2
rounded-full
bg-orange-500/20
blur-3xl
"
/>



<div
className="
relative
mx-auto
max-w-7xl
px-6
py-16
"
>


<div
className="
grid
gap-12
md:grid-cols-4
"
>


{/* Brand */}

<div
className="
md:col-span-1
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-orange-500
text-white
shadow-lg
shadow-orange-500/30
"
>

<FileText className="h-6 w-6"/>

</div>


<div>

<h3
className="
text-xl
font-bold
"
>
Champions CV
</h3>

<p
className="
text-xs
text-white/50
"
>
Currículums profesionales
</p>

</div>


</div>



<p
className="
mt-5
text-sm
leading-6
text-white/60
"
>
Crea currículums modernos, optimizados para ATS
y preparados para conseguir mejores oportunidades.
</p>


</div>





{/* Producto */}

<div>


<h4
className="
font-semibold
"
>
Producto
</h4>


<ul
className="
mt-5
space-y-3
text-sm
text-white/60
"
>


<li>
<a
href="#features"
className="transition hover:text-orange-400"
>
Características
</a>
</li>


<li>
<a
href="#templates"
className="transition hover:text-orange-400"
>
Plantillas
</a>
</li>


<li>
<a
href="#pricing"
className="transition hover:text-orange-400"
>
Planes
</a>
</li>


</ul>


</div>





{/* Navegación */}

<div>


<h4
className="
font-semibold
"
>
Navegación
</h4>


<ul
className="
mt-5
space-y-3
text-sm
text-white/60
"
>


<li>

<Link
to="/"
className="transition hover:text-orange-400"
>
Inicio
</Link>

</li>


<li>

<Link
to="/builder"
className="transition hover:text-orange-400"
>
Crear CV
</Link>

</li>


<li>

<a
href="#faq"
className="transition hover:text-orange-400"
>
Preguntas frecuentes
</a>

</li>


</ul>


</div>





{/* Contacto */}

<div>


<h4
className="
font-semibold
"
>
Contacto
</h4>


<div
className="
mt-5
space-y-5
"
>


<a
href="mailto:contacto@championscv.com"
className="
flex
items-center
gap-2
text-sm
text-white/60
transition
hover:text-orange-400
"
>

<Mail className="h-4 w-4"/>

contacto@championscv.com

</a>



<div
className="
flex
gap-3
"
>


<a
href="https://github.com"
target="_blank"
rel="noreferrer"
className="
rounded-xl
border
border-white/10
p-2
transition
hover:border-orange-500
hover:text-orange-400
"
>

<Github className="h-5 w-5"/>

</a>



<a
href="https://linkedin.com"
target="_blank"
rel="noreferrer"
className="
rounded-xl
border
border-white/10
p-2
transition
hover:border-orange-500
hover:text-orange-400
"
>

<Linkedin className="h-5 w-5"/>

</a>



</div>


</div>


</div>



</div>





{/* Bottom */}

<div
className="
mt-14
flex
flex-col
items-center
justify-between
gap-4
border-t
border-white/10
pt-6
text-sm
text-white/50
md:flex-row
"
>


<p>
© {new Date().getFullYear()} Champions CV. Todos los derechos reservados.
</p>



<div
className="
flex
gap-6
"
>

<a
href="#"
className="hover:text-white"
>
Privacidad
</a>


<a
href="#"
className="hover:text-white"
>
Términos
</a>


</div>


</div>



</div>


</footer>

)

}