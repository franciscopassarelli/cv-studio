import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPaymentPreference } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";

export function PaymentMethods() {
  const { user } = useAuth();

  const handlePayment = () => {
    if (!user || !user.email) {
      console.error("No hay usuario autenticado.");
      return;
    }

    createPaymentPreference(user.uid, user.email);
  };

  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">
        Método de pago
      </h2>

      <p className="mt-2 text-muted-foreground">
        Elegí cómo querés pagar tu suscripción.
      </p>

      <div className="mt-8 rounded-2xl border p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-orange-100 p-3">
            <CreditCard className="h-6 w-6 text-orange-600" />
          </div>

          <div>
            <h3 className="font-medium">
              Mercado Pago
            </h3>

            <p className="text-sm text-muted-foreground">
              Tarjetas de crédito, débito y dinero en cuenta.
            </p>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-10 w-full bg-orange-500 hover:bg-orange-600"
        onClick={handlePayment}
      >
        Continuar con Mercado Pago
      </Button>
    </section>
  );
}