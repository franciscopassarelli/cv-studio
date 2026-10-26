import { useCV } from "@/context/cv-context";
import { useAuth } from "@/hooks/useAuth";
import { authErrorMessage } from "@/lib/auth-errors";
import { FirebaseError } from "firebase/app";
import { KeyRound, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

const WRONG_PASSWORD = ["auth/invalid-credential", "auth/wrong-password"];

function messageOf(err: unknown) {
  const code = (err as { code?: string }).code ?? "";
  if (WRONG_PASSWORD.includes(code)) return "La contraseña no es correcta.";
  if (err instanceof FirebaseError) return authErrorMessage(err);
  return err instanceof Error ? err.message : "Ocurrió un error. Probá de nuevo.";
}

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-white outline-none transition focus:border-orange-500";

export function SecuritySection() {
  const { hasPassword, changePassword, deleteAccount } = useAuth();
  const { isPremium } = useCV();

  // Cambiar contraseña
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwOk, setPwOk] = useState(false);

  // Borrar cuenta
  const [confirming, setConfirming] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError(null);
    setPwOk(false);

    if (next.length < 8) return setPwError("La contraseña nueva debe tener al menos 8 caracteres.");
    if (next !== confirm) return setPwError("Las contraseñas nuevas no coinciden.");
    if (next === current) return setPwError("La contraseña nueva tiene que ser distinta.");

    setSaving(true);
    try {
      await changePassword(current, next);
      setCurrent("");
      setNext("");
      setConfirm("");
      setPwOk(true);
    } catch (err) {
      setPwError(messageOf(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleteError(null);
    setDeleting(true);
    try {
      await deleteAccount(hasPassword ? deletePassword : undefined);
      // Recarga completa: así no queda ningún dato del usuario en memoria
      window.location.assign("/");
    } catch (err) {
      setDeleteError(messageOf(err));
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Contraseña */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <h2 className="flex items-center justify-center gap-2 text-lg font-semibold text-white">
          <KeyRound size={18} /> Contraseña
        </h2>

        {hasPassword ? (
          <form className="mt-6 space-y-4" onSubmit={handleChangePassword}>
            <input
              type="password"
              required
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Contraseña actual"
              autoComplete="current-password"
              className={inputClass}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="password"
                required
                minLength={8}
                value={next}
                onChange={(e) => setNext(e.target.value)}
                placeholder="Contraseña nueva"
                autoComplete="new-password"
                className={inputClass}
              />
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repetir contraseña nueva"
                autoComplete="new-password"
                className={inputClass}
              />
            </div>

            {pwError && <p className="text-sm text-red-400">{pwError}</p>}
            {pwOk && <p className="text-sm text-orange-400">Contraseña actualizada.</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={saving}
                className="cursor-pointer rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Cambiar contraseña"}
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-4 text-center text-sm text-zinc-500">
            Ingresás con Google, así que tu contraseña la administra tu cuenta de Google.
          </p>
        )}
      </div>

      {/* Zona de peligro */}
      <div className="rounded-2xl border border-red-500/20 bg-zinc-950 p-8">
        <h2 className="text-center text-lg font-semibold text-red-400">Borrar cuenta</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-zinc-500">
          Se eliminan tu perfil y todos tus CVs guardados. No se puede deshacer.
        </p>

        {confirming ? (
          <div className="mx-auto mt-6 max-w-sm space-y-4">
            {isPremium && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-300">
                Tenés Premium activo: al borrar la cuenta lo perdés.
              </p>
            )}

            {hasPassword ? (
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Tu contraseña para confirmar"
                autoComplete="current-password"
                className={inputClass}
              />
            ) : (
              <p className="text-center text-xs text-zinc-500">
                Te vamos a pedir que confirmes con tu cuenta de Google.
              </p>
            )}

            {deleteError && <p className="text-sm text-red-400">{deleteError}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                disabled={deleting || (hasPassword && !deletePassword)}
                onClick={handleDelete}
                className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Sí, borrar mi cuenta
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => {
                  setConfirming(false);
                  setDeleteError(null);
                  setDeletePassword("");
                }}
                className="flex-1 cursor-pointer rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="cursor-pointer rounded-lg border border-red-500/40 px-6 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              Borrar mi cuenta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}