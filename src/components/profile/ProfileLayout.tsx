import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

export function ProfileLayout({ children }: Props) {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 sm:px-8">
        {children}

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="gap-2 rounded-full px-8"
          >
            <Link to="/builder">
              <Sparkles className="h-5 w-5" />
              Crear un nuevo CV
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}