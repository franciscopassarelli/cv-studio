import { useCV } from "@/context/cv-context";
import { cn } from "@/lib/utils";
import { defaultStyle, resolveStyle, type CVStyle, type FontFamilyId } from "@/types/cv-types";
import { Crown, Lock } from "lucide-react";

const FONTS: { id: FontFamilyId; label: string }[] = [
  { id: "default", label: "Original" },
  { id: "sans", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "mono", label: "Mono" },
];

export function StylePanel() {
  const { data, setData, isPremium, openPremiumModal } = useCV();
  const style = resolveStyle(data);

  const update = (patch: Partial<CVStyle>) => {
    if (!isPremium) return openPremiumModal();
    setData((d) => ({ ...d, style: { ...resolveStyle(d), ...patch } }));
  };

  return (
    <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <Crown className="h-3.5 w-3.5 text-amber-500" />
        Personalización avanzada
        {!isPremium && <Lock className="h-3 w-3 text-muted-foreground" />}
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {FONTS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => update({ fontFamily: f.id })}
            className={cn(
              "rounded-md border px-2 py-1.5 text-xs transition-colors",
              style.fontFamily === f.id ? "border-primary bg-primary/5" : "border-border hover:bg-accent/40",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <label className="block text-xs text-muted-foreground">
        Tamaño ({Math.round(style.fontScale * 100)}%)
        <input
          type="range" min={0.9} max={1.1} step={0.02}
          value={style.fontScale}
          onChange={(e) => update({ fontScale: Number(e.target.value) })}
          className="mt-1 w-full"
        />
      </label>

      {isPremium && (
        <button
          type="button"
          className="text-xs text-muted-foreground underline"
          onClick={() => setData((d) => ({ ...d, style: { ...defaultStyle } }))}
        >
          Restablecer
        </button>
      )}
    </div>
  );
}