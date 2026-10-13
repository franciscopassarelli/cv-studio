import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function CheckoutPending() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-md">
        <Clock className="mx-auto h-16 w-16 text-orange-500" />

        <h1 className="mt-6 text-3xl font-bold">Pago pendiente</h1>

        <p className="mt-4 text-muted-foreground">
          Mercado Pago todavía está procesando tu pago. Te avisaremos cuando quede confirmado.
        </p>

        <Button asChild className="mt-8">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
