import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
    <Dialog open={premiumModalOpen} onOpenChange={(open) => { if (!open) closePremiumModal(); }}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0">
        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 px-6 pt-6 pb-8 text-white">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_0%,white,transparent_50%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[11px] font-semibold">
              <Crown className="h-3.5 w-3.5" /> {PREMIUM_PLAN.name}
            </div>
            <DialogHeader className="mt-3">
              <DialogTitle className="text-2xl font-bold text-white">
                Desbloquea todas las plantillas
              </DialogTitle>
              <DialogDescription className="text-white/90">
                Esta plantilla forma parte del paquete Premium. Actualiza para descargarla y acceder a todo el catálogo.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold">${PREMIUM_PLAN.price}</span>
            <span className="text-sm text-muted-foreground">{PREMIUM_PLAN.currency} / único pago</span>
          </div>

          <ul className="mt-4 space-y-2">
            {PREMIUM_PLAN.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="h-3 w-3" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2">
           <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
  <Link to="/checkout">
    <Sparkles className="h-4 w-4" />
    Comprar Premium
  </Link>
</Button>
            <Button onClick={handleKeepFree} variant="ghost" size="sm">
              Seguir usando las plantillas gratuitas
            </Button>
          </div>

          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Pagos procesados de forma segura. Próximamente con Mercado Pago.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
