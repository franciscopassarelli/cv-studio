import { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCV } from "@/context/cv-context";

interface Props {
  children: ReactNode;
}

export function ProfileLayout({ children }: Props) {
  const navigate = useNavigate();
  const { reset, openWelcomeModal } = useCV();

  const handleNuevoCV = () => {
    reset(); // Limpia los datos anteriores
    openWelcomeModal(); // Abre el modal de bienvenida
    navigate({ to: "/builder" }); // Navega al editor
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 sm:px-8">
        {children}

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="gap-2 rounded-full px-8 cursor-pointer"
            onClick={handleNuevoCV}
          >
            <Sparkles className="h-5 w-5" />
            Crear un nuevo CV
          </Button>
        </div>
      </div>
    </div>
  );
}