import { Check, Sparkles } from "lucide-react";

const features = [
  "CVs ilimitados",
  "Todas las plantillas exclusivas",
  "Descargas en PDF de alta calidad",
  "Optimización de palabras clave ATS",
  "Cartas de presentación inteligentes",
  "Sugerencias y mejoras con IA",
];

export function PlanSummary() {
  return (
    <aside className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Resumen del plan
        </h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
          <Sparkles className="h-3.5 w-3.5" />
          Pro
        </span>
      </div>

      {/* Tarjeta de Precio */}
      <div className="mt-6 rounded-2xl bg-gray-50 p-5 dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800/80">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Champions CV Premium
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            $4.999
          </span>
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            ARS / mes
          </span>
        </div>
      </div>

      <div className="my-6 h-px bg-gray-100 dark:bg-zinc-800" />

      {/* Lista de Features */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          ¿Qué incluye tu plan?
        </p>

        <ul className="space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-6 h-px bg-gray-100 dark:bg-zinc-800" />

      {/* Desglose de Pago */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Subtotal</span>
          <span>$4.999 ARS</span>
        </div>
        <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
          <span>Acceso total con IA</span>
          <span>Incluido</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-bold text-gray-900 dark:text-white border-t border-gray-100 dark:border-zinc-800">
          <span>Total hoy</span>
          <span className="text-orange-600 dark:text-orange-400">$4.999 ARS</span>
        </div>
      </div>
    </aside>
  );
}