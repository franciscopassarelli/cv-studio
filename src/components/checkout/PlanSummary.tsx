import { Check } from "lucide-react";

const features = [
  "CVs ilimitados",
  "Todas las plantillas",
  "Diseños Premium",
  "Optimización ATS",
  "Carta de presentación",
  "Mejoras con IA",
];

export function PlanSummary() {
  return (
    <aside className="rounded-3xl border bg-card p-8 shadow-sm">
      <h2 className="text-xl font-semibold">
        Resumen del plan
      </h2>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground">
          Champions CV Premium
        </p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-5xl font-bold">
            $4.999
          </span>

          <span className="pb-2 text-muted-foreground">
            / mes
          </span>
        </div>
      </div>

      <div className="my-8 h-px bg-border" />

      <ul className="space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3"
          >
            <Check className="h-5 w-5 text-orange-500" />

            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}