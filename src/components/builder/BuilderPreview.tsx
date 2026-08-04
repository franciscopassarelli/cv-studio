import { Eye } from "lucide-react";
import { CVPreview } from "@/components/cv/CVPreview";
import { DownloadPDFButton } from "@/components/cv/DownloadPDFButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface BuilderPreviewProps {
  disabled?: boolean;
}

export function BuilderPreview({ disabled = false }: BuilderPreviewProps) {
  return (
    <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-gradient-to-b from-muted/40 to-muted/10 shadow-sm">
        {/* Header preview */}
        <div className="flex items-center justify-between border-b border-border/60 bg-card/60 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            Vista previa en tiempo real
          </div>

          <div className="hidden sm:block">
            <DownloadPDFButton />
          </div>
        </div>

        {/* Preview */}
        <div className={`h-[calc(100%-3rem)] overflow-auto ${disabled ? "pointer-events-none opacity-60" : ""}`}>
          <CVPreview />
        </div>
      </div>

      {/* Vista móvil */}
      <div className="mt-3 sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full" disabled={disabled}>
              <Eye className="mr-2 h-4 w-4" />
              Ver vista previa
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="h-[90vh] overflow-auto p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle>Vista previa</SheetTitle>
            </SheetHeader>

            <div className="p-2">
              <CVPreview />
            </div>

            <div className="sticky bottom-0 flex justify-end border-t bg-background p-3">
              <DownloadPDFButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}