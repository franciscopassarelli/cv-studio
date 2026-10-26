import { useAuth } from "@/hooks/useAuth";
import { authErrorMessage } from "@/lib/auth-errors";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function ForgotPasswordForm() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      // Si el email no existe se responde igual: no se revela qué emails están registrados
      if ((err as { code?: string }).code === "auth/user-not-found") {
        setSent(true);
      } else {
        setError(authErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-zinc-950 p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">Recuperar contraseña</h1>
        <p className="mt-2 text-sm text-gray-400">
          Te enviamos un link para crear una contraseña nueva.
        </p>
      </div>

      {sent ? (
        <div className="space-y-5 text-center">
          <p className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4 text-sm text-gray-300">
            Si hay una cuenta con <strong className="text-white">{email}</strong>, te enviamos un
            email con el link. Revisá también la carpeta de spam.
          </p>
          <Link
            to="/login"
            search={{ redirectTo: undefined }}
            className="inline-block text-sm font-medium text-orange-400 transition hover:text-orange-300"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar link"}
          </button>

          <p className="text-center text-sm text-gray-400">
            <Link
              to="/login"
              search={{ redirectTo: undefined }}
              className="font-medium text-orange-400 transition hover:text-orange-300"
            >
              Volver a iniciar sesión
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}