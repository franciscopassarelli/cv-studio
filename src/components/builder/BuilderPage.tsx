import { useEffect, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCV } from "@/context/cv-context";
import type { TemplateId } from "@/types/cv-types";
import { CVForm } from "@/components/cv/CVForm";
import { LoginRequiredModal } from "@/components/auth/LoginRequiredModal";
import { BuilderTopBar } from "./BuilderTopBar";
import { BuilderPreview } from "./BuilderPreview";
import { BuilderTemplatesPanel } from "./BuilderTemplatesPanel";
import { WelcomeModal } from "../modals/WelcomeModal";

// Ids que puede traer ?template=... en la URL.
// Incluye los viejos en español por si alguien tiene un link guardado.
const TEMPLATE_ALIASES: Record<string, TemplateId> = {
  minimalist: "minimalist",
  professional: "professional",
  modern: "modern",
  ats: "ats",
  elegant: "elegant",
  creative: "creative",
  executive: "executive",
  techie: "techie",
  academic: "academic",
  editorial: "editorial",
  gradient: "gradient",
  compact: "compact",
  minimalista: "minimalist",
  profesional: "professional",
  moderna: "modern",
  "ats-friendly": "ats",
  ejecutiva: "executive",
};

export function BuilderPage() {
  const { user, loading } = useAuth();
  const { setTemplate } = useCV();
  const search = useSearch({ strict: false }) as { template?: string };

  const isGuest = !loading && !user;
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Modal de login para invitados
  useEffect(() => {
    if (loading) return;
    setLoginModalOpen(isGuest);
  }, [loading, isGuest]);

  // Plantilla elegida desde la landing (?template=...)
  useEffect(() => {
    const id = search.template ? TEMPLATE_ALIASES[search.template] : undefined;
    if (id) setTemplate(id);
  }, [search.template, setTemplate]);

  return (
    <>
      <div className="min-h-screen bg-muted/30">
        <BuilderTopBar />

        <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al menú principal
              </Link>
            </div>

            <BuilderTemplatesPanel disabled={isGuest} />
            <CVForm disabled={isGuest} />
          </div>

          {/* Columna derecha */}
          <BuilderPreview disabled={isGuest} />
        </main>
      </div>

      {!loading && isGuest && (
        <LoginRequiredModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      )}

      <WelcomeModal />
    </>
  );
}
