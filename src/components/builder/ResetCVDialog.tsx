import { RefreshCw } from "lucide-react";
import { useCV } from "@/context/cv-context";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ResetCVDialog() {
  const { reset } = useCV();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4" />

          <span className="hidden sm:inline">
            Ejemplo
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Restablecer el CV de ejemplo?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Esta acción reemplazará tus datos actuales por la
            información de ejemplo. Podrás volver a editarlos
            después.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={reset}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Restablecer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

