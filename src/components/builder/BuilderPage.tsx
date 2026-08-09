import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CVForm } from "@/components/cv/CVForm";
import { LoginRequiredModal } from "@/components/auth/LoginRequiredModal";
import { BuilderTopBar } from "./BuilderTopBar";
import { BuilderPreview } from "./BuilderPreview";
import { BuilderTemplatesPanel } from "./BuilderTemplatesPanel";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { WelcomeModal } from "../modals/WelcomeModal";


export function BuilderPage() {
  const { user, loading } = useAuth();

  const isGuest = !loading && !user;

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (loading) return;

    setLoginModalOpen(isGuest);
  }, [loading, isGuest]);

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
        <LoginRequiredModal
          open={loginModalOpen}
          onOpenChange={setLoginModalOpen}
        />
      )}

      <WelcomeModal />
    </>
  );
}