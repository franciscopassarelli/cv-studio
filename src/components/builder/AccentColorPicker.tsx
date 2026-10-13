import { Palette } from "lucide-react";
import { useCV } from "@/context/cv-context";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const COLORS = [
  "#2563eb",
  "#0ea5e9",
  "#0d9488",
  "#16a34a",
  "#ca8a04",
  "#ea580c",
  "#dc2626",
  "#db2777",
  "#9333ea",
  "#111827",
];

export function AccentColorPicker() {
  const { data, setData } = useCV();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Palette className="h-4 w-4" />

          <span className="hidden sm:inline">Color</span>

          <span
            className="ml-1 inline-block h-3 w-3 rounded-full border"
            style={{
              backgroundColor: data.accent,
            }}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-52">
        <div className="grid grid-cols-5 gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Seleccionar color ${color}`}
              onClick={() =>
                setData((current) => ({
                  ...current,
                  accent: color,
                }))
              }
              className="h-7 w-7 rounded-full border transition-transform hover:scale-110"
              style={{
                backgroundColor: color,
                outline: data.accent === color ? "2px solid black" : "none",
                outlineOffset: 2,
              }}
            />
          ))}
        </div>

        <div className="mt-3">
          <label className="text-[10px] text-muted-foreground">Personalizado</label>

          <input
            type="color"
            value={data.accent}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                accent: event.target.value,
              }))
            }
            className="mt-1 h-8 w-full rounded border"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
