import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function CheckoutFailure() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">

      <div className="text-center max-w-md">

        <XCircle className="mx-auto h-16 w-16 text-red-500" />

        <h1 className="mt-6 text-3xl font-bold">
          No se pudo completar el pago
        </h1>

        <p className="mt-4 text-muted-foreground">
          Hubo un problema con la operación.
          Podés volver a intentarlo.
        </p>


        <Button
          asChild
          className="mt-8"
        >
          <Link to="/checkout">
            Intentar nuevamente
          </Link>
        </Button>

      </div>

    </main>
  );
}