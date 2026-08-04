import { CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CheckoutSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md rounded-3xl border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />

        <h1 className="mt-6 text-3xl font-bold">
          ¡Pago realizado!
        </h1>

        <p className="mt-4 text-muted-foreground">
          Ya sos usuario Premium. Ahora podés crear
          currículums sin límites.
        </p>

        <Button
          asChild
          className="mt-8"
        >
          <Link to="/builder">
            Ir al Builder
          </Link>
        </Button>
      </div>
    </main>
  );
}