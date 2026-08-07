import { Link } from "@tanstack/react-router";
import { ArrowLeft, Crown } from "lucide-react";

export function CheckoutHeader() {
  return (
    <>
      <Link
        to="/"
        className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/50 px-3.5 py-2 text-xs font-semibold text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white shadow-sm"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        <span>Volver al inicio</span>
      </Link>

      <div className="mt-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-sm">
          <Crown className="h-3.5 w-3.5 text-orange-500" />
          <span>Champions CV Premium</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Finalizar compra
        </h1>

        <p className="max-w-xl text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          Desbloqueá todas las herramientas y plantillas profesionales para
          crear tu currículum sin límites.
        </p>
      </div>
    </>
  );
}