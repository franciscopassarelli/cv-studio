import { useCV } from "@/context/cv-context";
import {
  MinimalistTemplate, ProfessionalTemplate, ModernTemplate,
  ElegantTemplate, CreativeTemplate, ATSTemplate, A4_WIDTH, A4_HEIGHT,
} from "./templates";
import {
  ExecutiveTemplate, TechieTemplate, AcademicTemplate,
  EditorialTemplate, GradientTemplate, CompactTemplate,
} from "./templates-premium";
import type { TemplateId } from "@/types/cv-types";
import { useEffect, useRef, useState } from "react";

const TEMPLATES: Record<TemplateId, React.ComponentType<{ data: import("@/types/cv-types").CVData }>> = {
  minimalist: MinimalistTemplate,
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  ats: ATSTemplate,
  elegant: ElegantTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  techie: TechieTemplate,
  academic: AcademicTemplate,
  editorial: EditorialTemplate,
  gradient: GradientTemplate,
  compact: CompactTemplate,
};
export function CVPreview() {

const { data, template } = useCV();

const containerRef = useRef<HTMLDivElement>(null);

const [scale,setScale]=useState(1);
const [changing,setChanging]=useState(false);



useEffect(()=>{

function recalc(){

const el=containerRef.current;

if(!el)return;

const width=el.clientWidth-32;

setScale(
Math.min(
1.2,
Math.max(
0.5,
width/A4_WIDTH
)
)
);

}


recalc();

window.addEventListener(
"resize",
recalc
);


return ()=>window.removeEventListener(
"resize",
recalc
);


},[]);



useEffect(()=>{

setChanging(true);

const timer=setTimeout(
()=>setChanging(false),
200
);

return ()=>clearTimeout(timer);

},[template]);



const Tpl =
TEMPLATES[template] ??
MinimalistTemplate;



return (

<div
ref={containerRef}
className="
flex
justify-center
py-8
"
>


<div
style={{
width:A4_WIDTH*scale,
height:A4_HEIGHT*scale
}}
>


<div

style={{

transform:`scale(${scale})`,

transformOrigin:"top left",

width:A4_WIDTH,

height:A4_HEIGHT

}}

className={`
overflow-hidden
rounded-sm
bg-white
shadow-2xl
ring-1
ring-black/10
transition-all
duration-300

${changing
?
"opacity-50 scale-[0.98]"
:
"opacity-100"
}

`}
>


<Tpl data={data}/>


</div>


</div>


</div>

)

}