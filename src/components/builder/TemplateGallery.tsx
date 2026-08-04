import { LayoutTemplate } from "lucide-react";
import { TemplateSelector } from "@/components/cv/TemplateSelector";
import { PremiumToggle } from "./PremiumToggle";

export function TemplateGallery() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-4 w-4" />

          <h2 className="text-sm font-semibold">
            Galería de plantillas
          </h2>
        </div>

        <PremiumToggle />
      </div>

      <TemplateSelector />
    </div>
  );
}