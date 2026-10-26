import { useCV } from "@/context/cv-context";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CheckoutHeader } from "./CheckoutHeader";
import { PaymentMethods } from "./PaymentMethods";
import { PlanSummary } from "./PlanSummary";

export function CheckoutPage() {
  const { isPremium } = useCV();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <CheckoutHeader />

        {isPremium ? (
          <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">Ya tenés Premium activo</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              No hace falta que pagues de nuevo. Cuando tu plan venza, vas a poder renovarlo desde
              acá.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/builder"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110"
              >
                Ir al editor
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/profile"
                className="inline-flex cursor-pointer items-center rounded-xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-orange-500/60 hover:text-orange-400"
              >
                Ver mi plan
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            <PaymentMethods />

            <PlanSummary />
          </div>
        )}
      </div>
    </main>
  );
}