import { useAuth } from "@/hooks/useAuth";
import { authErrorMessage } from "@/lib/auth-errors";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const COOLDOWN_SECONDS = 60;

export function VerifyEmailCard() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const { user, loading, emailVerified, resendVerification, refreshUser, logout } = useAuth();

  const redirectTo = typeof search.redirectTo === "string" ? search.redirectTo : "/profile";

  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS); // el primer email acaba de salir
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  // Sin sesión no hay nada que verificar
  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", search: { redirectTo: undefined } });
  }, [loading, user, navigate]);

  // Ya verificado (incluye a los usuarios de Google): sigue al destino
  useEffect(() => {
    if (emailVerified) navigate({ to: redirectTo });
  }, [emailVerified, redirectTo, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const check = useCallback(
    async (silent: boolean) => {
      setChecking(true);
      setError(null);
      try {
        const ok = await refreshUser();
        if (!ok && !silent) {
          setMessage("Todavía no figura verificado. Abrí el link del email y probá de nuevo.");
        }
      } catch (err) {
        if (!silent) setError(authErrorMessage(err));
      } finally {
        setChecking(false);
      }
    },
    [refreshUser],
  );

  // Al volver a esta pestaña después de tocar el link, se revisa solo
  useEffect(() => {
    const onFocus = () => {
      void check(true);
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [check]);

  async function handleResend() {
    setError(null);
    setMessage(null);
    try {
      await resendVerification();
      setCooldown(COOLDOWN_SECONDS);
      setMessage("Te reenviamos el email.");
    } catch (err) {
      setError(authErrorMessage(err));
    }
  }

  async function handleOtherEmail() {
    await logout();
    navigate({ to: "/register", search: { redirectTo } });
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-zinc-950 p-8 text-center shadow-2xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
        <MailCheck size={26} />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-white">Revisá tu email</h1>
      <p className="mt-2 text-sm text-gray-400">
        Enviamos un link de verificación a{" "}
        <strong className="text-white">{user?.email ?? "tu email"}</strong>. Si no lo ves, mirá la
        carpeta de spam.
      </p>

      {message && (
        <p className="mt-5 rounded-lg border border-orange-500/30 bg-orange-500/5 p-3 text-sm text-gray-300">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-5 rounded-lg border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2.5">
        <button
          type="button"
          disabled={checking}
          onClick={() => check(false)}
          className="cursor-pointer rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {checking ? "Revisando..." : "Ya verifiqué mi email"}
        </button>

        <button
          type="button"
          disabled={cooldown > 0}
          onClick={handleResend}
          className="cursor-pointer rounded-lg border border-gray-700 py-3 text-sm font-medium text-gray-300 transition hover:border-orange-500/60 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cooldown > 0 ? `Reenviar email en ${cooldown}s` : "Reenviar email"}
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-5 text-sm">
        <button
          type="button"
          onClick={() => navigate({ to: redirectTo })}
          className="cursor-pointer text-gray-500 transition hover:text-gray-300"
        >
          Seguir sin verificar
        </button>
        <button
          type="button"
          onClick={handleOtherEmail}
          className="cursor-pointer text-gray-500 transition hover:text-gray-300"
        >
          Usar otro email
        </button>
      </div>
    </div>
  );
}