import { useCV } from "@/context/cv-context";
import { ArrowRight, FilePlus, LayoutTemplate, Sparkles, X } from "lucide-react";

/* ---------- Tarjeta de opción ---------- */
interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick?: () => void;
}

function OptionCard({ icon, title, description, badge, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-800/50"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-pink-500 group-hover:text-white">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</span>
          {badge && (
            <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </span>
      </span>

      <ArrowRight className="h-4 w-4 shrink-0 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
    </button>
  );
}

export function WelcomeModal() {
  const { welcomeModalOpen, closeWelcomeModal, loadSampleData, clearData } = useCV();

  if (!welcomeModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        {/* Franja de color superior */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-pink-500" />

        {/* Botón cerrar */}
        <button
          type="button"
          onClick={closeWelcomeModal}
          aria-label="Cerrar"
          className="absolute right-4 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            ¡Hola! ¿Cómo querés crear tu CV?
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Elegí cómo arrancar. Después podés cambiar todo.
          </p>

          <div className="mt-6 space-y-3">
            <OptionCard
              icon={<FilePlus className="h-6 w-6" />}
              title="Desde cero"
              badge="Recomendado"
              description="Creá un CV a tu medida. Personalizá secciones y elegí entre plantillas."
              onClick={clearData}
            />

            <OptionCard
              icon={<LayoutTemplate className="h-6 w-6" />}
              title="A partir de un ejemplo"
              description="Empezá con un CV profesional ya armado y editalo a tu gusto."
              onClick={loadSampleData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}