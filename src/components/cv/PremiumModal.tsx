import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCV } from "@/context/cv-context";
import { TEMPLATE_CATALOG } from "@/types/cv-types";
import { Crown, Check, Sparkles } from "lucide-react";
import { PREMIUM_PLAN } from "@/lib/premium";
import { Link } from "@tanstack/react-router";

export function PremiumModal() {
  const { premiumModalOpen, closePremiumModal, setTemplate } = useCV();

  function handleKeepFree() {
    const firstFree = TEMPLATE_CATALOG.find((t) => t.tier === "free");
    if (firstFree) setTemplate(firstFree.id);
    closePremiumModal();
  }

  return (
    <Dialog
      open={premiumModalOpen}
      onOpenChange={(open) => {
        if (!open) closePremiumModal();
      }}
    >
      <DialogContent className="sm:max-w-md overflow-hidden p-0 rounded-2xl border-none shadow-2xl">
        {/* Cabecera Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 px-6 pt-7 pb-8 text-white">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_50%_0%,white,transparent_75%)]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-sm border border-white/20">
              <Crown className="h-3.5 w-3.5 text-amber-200" />
              <span>{PREMIUM_PLAN.name}</span>
            </div>

            <DialogHeader className="mt-4 text-left">
              <DialogTitle className="text-2xl font-extrabold tracking-tight text-white">
                Desbloqueá todas las plantillas
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-white/90 leading-relaxed mt-1">
                Esta plantilla forma parte del paquete Premium. Actualizá para descargarla y acceder
                a todo el catálogo sin límites.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Cuerpos y Beneficios */}
        <div className="px-6 py-6 bg-white dark:bg-zinc-950">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              ${PREMIUM_PLAN.price}
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {PREMIUM_PLAN.currency} / mes
            </span>
          </div>

          <ul className="mt-5 space-y-2.5">
            {PREMIUM_PLAN.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2.5">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-orange-500/35 active:scale-[0.99]"
            >
              <Link
                to="/checkout"
                onClick={closePremiumModal}
                className="flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-amber-200 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span>Comprar Premium</span>
              </Link>
            </Button>

            <Button
              onClick={handleKeepFree}
              variant="ghost"
              size="sm"
              className="font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Seguir usando plantillas gratuitas
            </Button>
          </div>

          <p className="mt-4 text-center text-[11px] font-medium text-gray-400 dark:text-gray-500">
            Pagos procesados de forma segura. Próximamente con Mercado Pago.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
