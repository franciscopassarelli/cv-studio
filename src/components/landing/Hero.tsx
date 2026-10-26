import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background py-16">
      {/* Fondo animado / Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-gradient absolute top-12 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-orange-400/20 to-amber-300/20 blur-[130px]" />
        <div className="absolute bottom-10 right-10 h-[380px] w-[380px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge superior */}
        <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-orange-200/60 bg-gradient-to-r from-orange-50/80 to-amber-50/80 px-4 py-1.5 text-xs font-semibold text-orange-700 shadow-sm backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
          <span>12 plantillas profesionales para tu CV</span>
        </div>

        {/* Título Principal */}
        <h1 className="mt-6 animate-fade-up text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl lg:text-8xl">
          Destacá tu carrera con{" "}
          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
            Champions CV
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
          Elegí entre 12 plantillas profesionales, editá con vista previa en tiempo real y
          descargá tu PDF en minutos. Incluye una plantilla pensada para sistemas ATS.
        </p>

        {/* Botones de acción */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Botón Mágico Principal */}
          <Button
            size="lg"
            asChild
            className="group relative overflow-hidden rounded-2xl border border-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-6 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/35 active:scale-[0.98]"
          >
            <Link to="/builder" className="flex items-center gap-2">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <Sparkles className="h-5 w-5 text-amber-200 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>Crear mi CV gratis</span>
              <ArrowRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Botón Secundario */}
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-2xl border-gray-200 bg-white/70 px-8 py-6 text-base font-semibold text-gray-700 backdrop-blur-md transition-all duration-200 hover:bg-gray-100/80 hover:text-gray-900 shadow-sm"
          >
            <a href="#templates">Ver plantillas</a>
          </Button>
        </div>

        {/* Micro-features */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Plantilla ATS incluida</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Descarga en PDF al instante</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Sin tarjeta requerida</span>
          </div>
        </div>
      </div>

      {/* CV Flotante Decorativo */}
      <div className="animate-float absolute -bottom-12 right-12 hidden lg:block opacity-90 transition-all hover:opacity-100 hover:scale-105">
        <div className="w-[300px] rounded-2xl border border-gray-200/80 bg-white/90 p-5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-400 to-amber-300" />
            <div className="space-y-1">
              <div className="h-3.5 w-28 rounded bg-gray-800" />
              <div className="h-2.5 w-20 rounded bg-gray-400" />
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="h-2 w-full rounded bg-gray-100" />
            <div className="h-2 w-4/5 rounded bg-gray-100" />
            <div className="h-2 w-2/3 rounded bg-gray-100" />
          </div>

          <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/60 p-3">
            <div className="flex items-center justify-between text-[10px] font-semibold text-orange-700">
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> Plantilla ATS
              </span>
              <span>Incluida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}