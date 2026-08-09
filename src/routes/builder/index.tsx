import { createFileRoute } from "@tanstack/react-router";
import { CVProvider } from "@/context/cv-context";
import { PremiumModal } from "@/components/cv/PremiumModal";
import { Toaster } from "@/components/ui/sonner";
import { BuilderPage} from "@/components/builder/BuilderPage";
import { WelcomeModal } from "@/components/modals/WelcomeModal";

export const Route = createFileRoute("/builder/")({
  head: () => ({
    meta: [
      {
        title: "Champions CV — Generador de currículums profesionales",
      },
      {
        name: "description",
        content:
          "Crea currículums profesionales en minutos. Elige entre plantillas modernas, edita en tiempo real y descarga tu CV en PDF.",
      },
      {
        property: "og:title",
        content:
          "Champions CV — Generador de currículums profesionales",
      },
      {
        property: "og:description",
        content:
          "Crea currículums profesionales en minutos. Vista previa en tiempo real y descarga en PDF.",
      },
    ],
  }),

  component: () => (
    <CVProvider>
      <BuilderPage />
      <WelcomeModal />
      <PremiumModal />
      <Toaster richColors position="top-right" />
    </CVProvider>
  ),
});
