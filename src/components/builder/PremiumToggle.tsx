import { Crown } from "lucide-react";
import { useCV } from "@/context/cv-context";

export function PremiumToggle() {
  const { isPremium, setIsPremium } = useCV();

  return (
    <button
      type="button"
      onClick={() => setIsPremium(!isPremium)}
      title={
        isPremium
          ? "Modo Premium activo (click para desactivar)"
          : "Simular Premium"
      }
      className={[
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
        "text-[10px] font-semibold transition-colors",
        isPremium
          ? "bg-amber-500 text-white"
          : "bg-muted text-muted-foreground hover:bg-muted/70",
      ].join(" ")}
    >
      <Crown className="h-3 w-3" />

      {isPremium ? "Premium ON" : "Simular Premium"}
    </button>
  );
}

