import { useCV } from "@/context/cv-context";
import { TEMPLATE_CATALOG, type TemplateId } from "@/types/cv-types";
import { cn } from "@/lib/utils";
import { Check, Crown, Lock } from "lucide-react";

export function TemplateSelector() {
  const { template, setTemplate, isPremium } = useCV();
  return (
    <div className="space-y-4">
      <TemplateGroup
        label="Gratuitas"
        badgeClass="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
        items={TEMPLATE_CATALOG.filter((t) => t.tier === "free")}
        selected={template}
        onSelect={setTemplate}
      />
      <TemplateGroup
        label="Premium"
        badgeClass="bg-amber-500/10 text-amber-700 dark:text-amber-400"
        icon={<Crown className="h-3 w-3" />}
        items={TEMPLATE_CATALOG.filter((t) => t.tier === "premium")}
        selected={template}
        onSelect={setTemplate}
        premiumUnlocked={isPremium}
      />
    </div>
  );
}

function TemplateGroup({
  label,
  items,
  selected,
  onSelect,
  badgeClass,
  icon,
  premiumUnlocked,
}: {
  label: string;
  items: typeof TEMPLATE_CATALOG;
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
  badgeClass: string;
  icon?: React.ReactNode;
  premiumUnlocked?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
            badgeClass,
          )}
        >
          {icon}
          {label}
        </span>
        <span className="text-[10px] text-muted-foreground">{items.length} plantillas</span>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {items.map((t) => {
          const active = selected === t.id;
          const locked = t.tier === "premium" && !premiumUnlocked;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={cn(
                "group relative text-left rounded-lg border p-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50",
                active
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-accent/40",
              )}
            >
              <div className="relative">
                <TemplateThumb id={t.id} active={active} />
                {t.tier === "premium" && (
                  <span className="absolute top-1 right-1 inline-flex items-center gap-0.5 rounded-full bg-amber-500 text-white px-1.5 py-0.5 text-[9px] font-bold shadow-sm">
                    <Crown className="h-2.5 w-2.5" />
                    PRO
                  </span>
                )}
                {locked && (
                  <span className="absolute bottom-1 right-1 rounded-md bg-black/70 p-1 text-white">
                    <Lock className="h-2.5 w-2.5" />
                  </span>
                )}
                {active && (
                  <span className="absolute -top-1 -left-1 rounded-full bg-primary text-primary-foreground p-0.5 shadow">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <div className="mt-2">
                <div className="text-xs font-semibold truncate">{t.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{t.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TemplateThumb({ id, active }: { id: TemplateId; active: boolean }) {
  const accent = active ? "bg-primary" : "bg-neutral-400";
  const base = "rounded-md bg-white border border-black/10 aspect-[3/4] p-1.5 overflow-hidden flex";
  switch (id) {
    case "minimalist":
      return (
        <div className={base + " flex-col gap-1"}>
          <div className="h-1 w-2/3 bg-neutral-900 rounded" />
          <div className="h-0.5 w-1/2 bg-neutral-400 rounded" />
          <div className="mt-1 h-px w-full bg-neutral-300" />
          <div className="mt-1 space-y-0.5">
            <div className="h-0.5 w-full bg-neutral-300 rounded" />
            <div className="h-0.5 w-11/12 bg-neutral-300 rounded" />
            <div className="h-0.5 w-3/4 bg-neutral-300 rounded" />
          </div>
        </div>
      );
    case "professional":
      return (
        <div className={base + " flex-col gap-1"}>
          <div className={`h-1 w-full ${accent} rounded`} />
          <div className="h-1.5 w-2/3 bg-neutral-900 rounded" />
          <div className="flex-1 flex gap-1 mt-1">
            <div className="flex-[2] space-y-0.5">
              <div className="h-0.5 w-full bg-neutral-300" />
              <div className="h-0.5 w-5/6 bg-neutral-300" />
              <div className="h-0.5 w-11/12 bg-neutral-300" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="h-0.5 w-full bg-neutral-300" />
              <div className="h-0.5 w-4/5 bg-neutral-300" />
            </div>
          </div>
        </div>
      );
    case "modern":
      return (
        <div className={base}>
          <div className={`w-1/3 ${accent} rounded-l-sm -m-1.5 mr-0 p-1.5 flex flex-col gap-1`}>
            <div className="h-2 w-2 rounded-full bg-white/60 self-center" />
            <div className="h-0.5 w-full bg-white/60 rounded" />
            <div className="h-0.5 w-2/3 bg-white/60 rounded" />
          </div>
          <div className="flex-1 pl-1.5 space-y-0.5">
            <div className="h-1 w-3/4 bg-neutral-900 rounded" />
            <div className="h-0.5 w-full bg-neutral-300" />
            <div className="h-0.5 w-11/12 bg-neutral-300" />
            <div className="h-0.5 w-2/3 bg-neutral-300" />
          </div>
        </div>
      );
    case "elegant":
      return (
        <div className={base + " flex-col items-center gap-1"}>
          <div className="h-1 w-3/4 bg-neutral-900 rounded" />
          <div className={`h-0.5 w-6 ${accent} rounded`} />
          <div className="h-0.5 w-1/2 bg-neutral-400 rounded" />
          <div className="mt-1 space-y-0.5 w-full">
            <div className="h-0.5 w-full bg-neutral-300 rounded mx-auto" />
            <div className="h-0.5 w-5/6 bg-neutral-300 rounded mx-auto" />
          </div>
        </div>
      );
    case "creative":
      return (
        <div className={base + " flex-col gap-1 relative"}>
          <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full ${accent} opacity-40`} />
          <div className="h-2 w-4/5 bg-neutral-900 rounded" />
          <div className={`h-1 w-1/3 ${accent} rounded-full`} />
          <div className="flex gap-1 flex-1 mt-1">
            <div className="flex-[2] border border-neutral-900 rounded-sm" />
            <div className="flex-1 space-y-0.5">
              <div className="h-0.5 w-full bg-neutral-300" />
              <div className="h-0.5 w-2/3 bg-neutral-300" />
            </div>
          </div>
        </div>
      );
    case "ats":
      return (
        <div className={base + " flex-col gap-1"}>
          <div className="h-1 w-1/2 bg-neutral-900 rounded" />
          <div className="h-px w-full bg-neutral-900" />
          <div className="h-0.5 w-1/3 bg-neutral-900" />
          <div className="space-y-0.5">
            <div className="h-0.5 w-full bg-neutral-400" />
            <div className="h-0.5 w-full bg-neutral-400" />
            <div className="h-0.5 w-5/6 bg-neutral-400" />
          </div>
        </div>
      );
    case "executive":
      return (
        <div className={base + " flex-col gap-1 p-0 overflow-hidden"}>
          <div className="bg-neutral-900 p-1.5">
            <div className="h-1 w-2/3 bg-white rounded" />
            <div className={`h-0.5 w-1/3 ${accent} rounded mt-1`} />
          </div>
          <div className="p-1.5 space-y-0.5 flex-1">
            <div className="h-0.5 w-full bg-neutral-300" />
            <div className="h-0.5 w-5/6 bg-neutral-300" />
            <div className="h-0.5 w-2/3 bg-neutral-300" />
          </div>
        </div>
      );
    case "techie":
      return (
        <div className="rounded-md aspect-[3/4] p-1.5 overflow-hidden flex flex-col gap-1 bg-[#0b0f17] border border-black/20">
          <div className="flex gap-0.5">
            <div className="h-1 w-1 rounded-full bg-red-500" />
            <div className="h-1 w-1 rounded-full bg-yellow-500" />
            <div className="h-1 w-1 rounded-full bg-green-500" />
          </div>
          <div className={`h-1 w-1/2 ${accent} rounded mt-1`} />
          <div className="space-y-0.5">
            <div className="h-0.5 w-full bg-neutral-600 rounded" />
            <div className="h-0.5 w-5/6 bg-neutral-600 rounded" />
            <div className="h-0.5 w-3/4 bg-neutral-600 rounded" />
          </div>
        </div>
      );
    case "academic":
      return (
        <div className={base + " flex-col items-center gap-1"}>
          <div className="h-1 w-2/3 bg-neutral-900 rounded" />
          <div className="h-0.5 w-1/3 bg-neutral-500 rounded" />
          <div className="h-px w-full bg-neutral-500 mt-1" />
          <div className="w-full space-y-0.5 mt-1">
            <div className="h-0.5 w-full bg-neutral-300" />
            <div className="h-0.5 w-full bg-neutral-300" />
            <div className="h-0.5 w-11/12 bg-neutral-300" />
          </div>
        </div>
      );
    case "editorial":
      return (
        <div className="rounded-md aspect-[3/4] overflow-hidden flex bg-white border border-black/10">
          <div className={`w-2/5 ${accent} p-1 flex flex-col gap-1`}>
            <div className="h-0.5 w-full bg-white/80 rounded" />
            <div className="h-1 w-3/4 bg-white rounded" />
            <div className="mt-1 h-0.5 w-full bg-white/60 rounded" />
          </div>
          <div className="flex-1 p-1 space-y-0.5">
            <div className="h-1 w-2/3 bg-neutral-900 rounded" />
            <div className="h-0.5 w-full bg-neutral-300" />
            <div className="h-0.5 w-5/6 bg-neutral-300" />
          </div>
        </div>
      );
    case "gradient":
      return (
        <div className="rounded-md aspect-[3/4] overflow-hidden flex flex-col bg-white border border-black/10">
          <div
            className={`h-1/3 ${accent} p-1`}
            style={{ backgroundImage: "linear-gradient(135deg, currentColor, #111827)" }}
          >
            <div className="h-1 w-3/4 bg-white/90 rounded" />
            <div className="h-0.5 w-1/2 bg-white/70 rounded mt-1" />
          </div>
          <div className="flex-1 p-1 space-y-0.5">
            <div className="h-0.5 w-full bg-neutral-300" />
            <div className="h-0.5 w-11/12 bg-neutral-300" />
            <div className="flex gap-0.5 mt-1">
              <div className={`h-1 w-3 ${accent} rounded-full opacity-70`} />
              <div className={`h-1 w-4 ${accent} rounded-full opacity-70`} />
            </div>
          </div>
        </div>
      );
    case "compact":
      return (
        <div className={base + " flex-col gap-0.5"}>
          <div className="flex justify-between">
            <div className="h-1 w-1/2 bg-neutral-900 rounded" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-4 bg-neutral-400" />
              <div className="h-0.5 w-3 bg-neutral-400" />
            </div>
          </div>
          <div className={`h-px w-full ${accent}`} />
          <div className="flex gap-1 flex-1 mt-0.5">
            <div className="flex-[2] space-y-0.5">
              <div className="h-0.5 w-full bg-neutral-300" />
              <div className="h-0.5 w-11/12 bg-neutral-300" />
              <div className="h-0.5 w-5/6 bg-neutral-300" />
              <div className="h-0.5 w-3/4 bg-neutral-300" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="h-0.5 w-full bg-neutral-300" />
              <div className="h-0.5 w-2/3 bg-neutral-300" />
            </div>
          </div>
        </div>
      );
  }
}
