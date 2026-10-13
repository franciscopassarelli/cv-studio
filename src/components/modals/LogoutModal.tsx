import { LogOut, X } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
}

export function LogoutModal({ isOpen, onClose, onConfirm, loading = false }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop con efecto blur y cierre al hacer click afuera */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Contenido del Modal */}
      <div className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <LogOut size={22} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white">¿Cerrar sesión?</h3>

          <p className="mt-2 text-sm text-zinc-400">
            ¿Estás seguro de que querés salir de tu cuenta? Vas a tener que volver a ingresar para
            editar tus CVs.
          </p>

          <div className="mt-6 flex w-full gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Saliendo..." : "Cerrar sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
