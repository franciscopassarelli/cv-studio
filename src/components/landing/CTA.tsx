import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-rose-600 px-8 py-16 text-center text-white shadow-2xl shadow-orange-500/30 md:px-16 md:py-20">
          {/* Luces decorativas de fondo */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Ícono de encabezado */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-inner backdrop-blur-md">
              <Sparkles className="h-8 w-8 text-amber-100" />
            </div>

            <h2 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              ¿Listo para conseguir más entrevistas?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/95 md:text-xl">
              Creá un currículum moderno, profesional y optimizado para ATS en
              pocos minutos. Empezá gratis y destacá entre los demás postulantes.
            </p>

            {/* Acciones principales */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group relative h-13 overflow-hidden rounded-xl bg-white px-8 font-bold text-orange-600 shadow-xl transition-all duration-300 hover:bg-orange-50 hover:shadow-white/20 active:scale-95"
              >
                <Link to="/builder" className="flex items-center justify-center gap-2">
                  <span>Crear mi CV Gratis</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-xl border-white/40 bg-white/10 px-8 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-orange-600"
              >
                <Link to="/builder">Ver Plan Premium</Link>
              </Button>
            </div>

            {/* Badges de confianza */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-white/90 sm:text-sm">
              <span className="flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 backdrop-blur-sm">
                <Check className="h-4 w-4 text-amber-200" /> Sin tarjeta de crédito
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 backdrop-blur-sm">
                <Check className="h-4 w-4 text-amber-200" /> Descarga en PDF
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 backdrop-blur-sm">
                <Check className="h-4 w-4 text-amber-200" /> Compatible con ATS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}