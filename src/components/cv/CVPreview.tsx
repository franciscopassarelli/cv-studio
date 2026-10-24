import { useCV } from "@/context/cv-context";
import { requestFieldFocus } from "@/lib/cv-focus";
import type { CVData, TemplateId } from "@/types/cv-types";
import { defaultStyle, resolveStyle } from "@/types/cv-types";
import { useEffect, useRef, useState } from "react";
import {
  A4_HEIGHT,
  A4_WIDTH,
  ATSTemplate,
  CreativeTemplate,
  ElegantTemplate,
  MinimalistTemplate,
  ModernTemplate,
  ProfessionalTemplate,
} from "./templates";
import {
  AcademicTemplate,
  CompactTemplate,
  EditorialTemplate,
  ExecutiveTemplate,
  GradientTemplate,
  TechieTemplate,
} from "./templates-premium";

const STYLE_CSS = `
.cv-styled > * {
  width: calc(${A4_WIDTH}px / var(--cv-zoom, 1)) !important;
  min-height: calc(${A4_HEIGHT}px / var(--cv-zoom, 1)) !important;
}
.cv-font-sans, .cv-font-sans * { font-family: Arial, Helvetica, sans-serif !important; }
.cv-font-serif, .cv-font-serif * { font-family: "Times New Roman", Times, serif !important; }
.cv-font-mono, .cv-font-mono * { font-family: "Courier New", Courier, monospace !important; }
`;

const TEMPLATES: Record<TemplateId, React.ComponentType<{ data: CVData }>> = {
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

const EDITABLE_CSS = `
:where(.cv-editable [data-cv-field]) {
  cursor: pointer;
  outline: 2px dashed transparent;
  outline-offset: 3px;
  transition: outline-color .15s ease, background-color .15s ease;
}
:where(.cv-editable [data-cv-field]:hover:not(:has([data-cv-field]:hover))) {
  outline-color: rgb(249 115 22 / .75);
  background-color: rgb(249 115 22 / .06);
}
`;

interface CVPreviewProps {
  interactive?: boolean;
}

export function CVPreview({ interactive = true }: CVPreviewProps) {
  const { data, template, isPremium } = useCV();
const style = isPremium ? resolveStyle(data) : defaultStyle;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [changing, setChanging] = useState(false);

  // Escala la hoja A4 al ancho disponible. ResizeObserver en vez de
  // window.resize: también reacciona si cambia el ancho del panel.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const width = el.clientWidth - 32;
      setScale(Math.min(1.2, Math.max(0.5, width / A4_WIDTH)));
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pequeña transición al cambiar de plantilla
  useEffect(() => {
    setChanging(true);
    const timer = setTimeout(() => setChanging(false), 200);
    return () => clearTimeout(timer);
  }, [template]);

  // Delegación de eventos: un solo onClick para toda la plantilla
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cv-field]");
    const path = target?.dataset.cvField;
    if (path) requestFieldFocus(path);
  };

  const Tpl = TEMPLATES[template] ?? MinimalistTemplate;

  

  return (
    <div ref={containerRef} className="flex justify-center py-8">
      {interactive && <style>{EDITABLE_CSS}</style>}

      <div style={{ width: A4_WIDTH * scale, height: A4_HEIGHT * scale }}>
        <div
          onClick={handleClick}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: A4_WIDTH,
            height: A4_HEIGHT,
          }}
          className={`
            overflow-hidden rounded-sm bg-white shadow-2xl ring-1 ring-black/10
            transition-all duration-300
            ${interactive ? "cv-editable" : ""}
            ${changing ? "opacity-50 scale-[0.98]" : "opacity-100"}
          `}
        >
          <style>{STYLE_CSS}</style>
<div
  className={`cv-styled ${style.fontFamily !== "default" ? `cv-font-${style.fontFamily}` : ""}`}
  style={{ zoom: style.fontScale, "--cv-zoom": style.fontScale } as React.CSSProperties}
>
  <Tpl data={data} />
</div>
        </div>
      </div>
    </div>
  );
}
