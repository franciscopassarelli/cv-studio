import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { createPaymentPreference } from "@/services/payment.service";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PaymentMethods() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  

  const handlePayment = async () => {
    try {
       setIsLoading(true);
       await createPaymentPreference();
        } catch (error) {
          console.error("Error al iniciar el checkout de Mercado Pago:", error);
          toast.error(error instanceof Error ? error.message : "No se pudo iniciar el pago.");
         setIsLoading(false);
        }
      };

  const isButtonDisabled = isLoading || !user;

  return (
    <section className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        Método de pago
      </h2>

      <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
        Elegí cómo querés abonar tu acceso a Champions CV Premium.
      </p>

      {/* Tarjeta de Método de Pago Seleccionado */}
      <div className="relative mt-6 rounded-2xl border-2 border-orange-500 bg-orange-500/5 p-5 sm:p-6 transition-all shadow-sm">
        <span className="absolute -top-3 right-4 rounded-full bg-orange-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          Recomendado
        </span>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
            <CreditCard className="h-6 w-6" />
          </div>

          <div className="space-y-0.5">
            <h3 className="font-bold text-gray-900 dark:text-white">Mercado Pago</h3>

            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Tarjetas de crédito, débito, Mercado Crédito y dinero en cuenta.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        size="lg"
        disabled={isButtonDisabled}
        onClick={handlePayment}
        className="mt-8 h-12 w-full rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
            <span>Generando pago...</span>
          </div>
        ) : (
          <span>Continuar a Mercado Pago</span>
        )}
      </Button>

      {/* Trust message */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>Procesamiento 100% encriptado y seguro</span>
      </div>
    </section>
  );
}
