import { ArrowRight, FileWarning } from "lucide-react";

interface UnsavedCVDialogProps {
  open: boolean;
  name: string;
  proceedLabel: string; // "Empezar uno nuevo" / "Abrir este CV"
  onContinue: () => void; // volver al CV en curso
  onProceed: () => void; // seguir con la acción y descartar el CV en curso
  onCancel: () => void;
}

export function UnsavedCVDialog({
  open,
  name,
  proceedLabel,
  onContinue,
  onProceed,
  onCancel,
}: UnsavedCVDialogProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-pink-500" />

        <div className="p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
            <FileWarning className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Tenés un CV en curso
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Estabas armando{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">{name || "un CV sin nombre"}</strong>{" "}
            y todavía no lo descargaste. Si seguís con esta acción, ese CV se pierde.
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onContinue}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110 active:scale-[0.98]"
            >
              Seguir con mi CV en curso
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onProceed}
              className="cursor-pointer rounded-xl border border-red-500/30 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-500/10 active:scale-[0.98] dark:text-red-400"
            >
              {proceedLabel} y descartar el actual
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}