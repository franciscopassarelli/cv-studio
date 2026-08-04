import { Link } from "@tanstack/react-router";
import { ArrowLeft, Crown } from "lucide-react";

export function CheckoutHeader() {
  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <div className="mt-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600">
          <Crown className="h-4 w-4" />

          Champions CV Premium
        </div>

        <h1 className="text-4xl font-bold">
          Finalizar compra
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Desbloqueá todas las herramientas para crear
          currículums profesionales sin límites.
        </p>
      </div>
    </>
  );
}