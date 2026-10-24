import { TemplateSelector } from "@/components/cv/TemplateSelector";
import { LayoutTemplate } from "lucide-react";
import { StylePanel } from "./StylePanel";

interface BuilderTemplatesPanelProps {
  disabled?: boolean;
}

export function BuilderTemplatesPanel({ disabled = false }: BuilderTemplatesPanelProps) {
  return (
    <section className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-4 w-4 cursor-pointer" />

          <h2 className="text-sm font-semibold">Galería de plantillas</h2>
        </div>
      </div>

      <div className={disabled ? "pointer-events-none opacity-60" : ""}>
        <TemplateSelector />
        <StylePanel />
      </div>

      
      
    </section>
  );
}
