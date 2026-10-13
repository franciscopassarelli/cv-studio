import { Link } from "@tanstack/react-router";
import { LogIn, UserPlus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginRequiredModal({ open, onOpenChange }: LoginRequiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <LogIn className="h-7 w-7" />
          </div>

          <DialogTitle className="text-xl">Necesitás iniciar sesión</DialogTitle>

          <DialogDescription className="pt-2 text-sm leading-6">
            Podés explorar el creador de CV y ver las plantillas disponibles, pero necesitás una
            cuenta para comenzar a crear y guardar tu currículum.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-3">
          <Button asChild className="w-full bg-orange-500 text-white hover:bg-orange-600">
            <Link
              to="/login"
              search={{
                redirectTo: "/builder",
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar sesión
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link
              to="/register"
              search={{
                redirectTo: "/builder",
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Crear cuenta gratis
            </Link>
          </Button>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Tu cuenta incluye acceso al plan Free.
        </p>
      </DialogContent>
    </Dialog>
  );
}
