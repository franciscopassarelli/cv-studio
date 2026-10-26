import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FREE_FEATURES,
  PREMIUM_FEATURES,
  PREMIUM_PERIOD,
  PREMIUM_PRICE,
} from "@/config/plan-features";
import { useCV } from "@/context/cv-context";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Gratis",
    price: "$0",
    period: undefined as string | undefined,
    description: "Para crear tu primer currículum sin costo.",
    highlighted: false,
    features: FREE_FEATURES,
    button: "Empezar gratis",
  },
  {
    name: "Premium",
    price: PREMIUM_PRICE,
    period: PREMIUM_PERIOD,
    description: "Para profesionales que buscan diferenciarse e impresionar.",
    highlighted: true,
    features: PREMIUM_FEATURES,
    button: "Probar Premium",
  },
];

export function Pricing() {
  const { user } = useAuth();
  const { isPremium } = useCV();

  return (
    <section id="pricing" className="relative overflow-hidden bg-background py-24">
      {/* Luz de fondo suave */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-orange-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            Planes
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Elegí el plan perfecto para tu carrera
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Empieza gratis y desbloquea herramientas avanzadas cuando estés listo para destacar.
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 hover:shadow-2xl ${
                plan.highlighted
                  ? "border-orange-500/50 bg-zinc-950 text-white shadow-2xl shadow-orange-500/10"
                  : "border-gray-200 bg-white text-gray-900 shadow-sm"
              }`}
            >
              {/* Resplandor superior en la card Premium */}
              {plan.highlighted && (
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
              )}

              <div>
                {/* Header Card */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.highlighted && (
                    <Badge className="gap-1.5 rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                      <Crown className="h-3.5 w-3.5" />
                      Más popular
                    </Badge>
                  )}
                </div>

                <p
                  className={`mt-2 text-sm ${plan.highlighted ? "text-zinc-400" : "text-gray-600"}`}
                >
                  {plan.description}
                </p>

                {/* Precio */}
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span
                      className={`pb-1 text-sm font-medium ${
                        plan.highlighted ? "text-zinc-400" : "text-gray-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <div className={`my-8 h-px ${plan.highlighted ? "bg-zinc-800" : "bg-gray-200"}`} />

                {/* Lista de características */}
                <ul className="space-y-4 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.highlighted
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className={plan.highlighted ? "text-zinc-300" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón de Acción */}
              {/* Botón de Acción */}
<div className="mt-10">
  {plan.highlighted ? (
    <Button
      asChild
      size="lg"
      className="group relative w-full overflow-hidden rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/35 active:scale-[0.98]"
    >
      <Link
        to={user ? (isPremium ? "/builder" : "/checkout") : "/login"}
        search={
          user
            ? undefined
            : {
                redirectTo: "/checkout",
              }
        }
        className="flex items-center justify-center gap-2 py-6 text-base"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
        <span>{isPremium ? "Ya sos Premium · Ir al editor" : plan.button}</span>
        <Sparkles className="h-4 w-4 text-amber-200 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      </Link>
    </Button>
  ) : (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="w-full rounded-xl border-2 border-gray-200 bg-white font-bold text-gray-800 transition-all duration-200 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 py-6 text-base"
    >
      <Link
        to={user ? "/builder" : "/login"}
        search={
          user
            ? undefined
            : {
                redirectTo: "/builder",
              }
        }
      >
        {plan.button}
      </Link>
    </Button>
  )}
</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
