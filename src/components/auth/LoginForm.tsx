import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });


  const {
    user,
    signIn,
    signInWithGoogle,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectTo =
  typeof search.redirectTo === "string"
    ? search.redirectTo
    : "/profile";

  useEffect(() => {
    if (!loading || !user) return;

    navigate({
      to: redirectTo,
    });
  }, [user, loading, redirectTo, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
    } catch {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(
        "Error al iniciar sesión con Google:",
        error
      );

      setError("No pudimos iniciar sesión con Google.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-zinc-950 p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          Bienvenido de nuevo
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Iniciá sesión para continuar creando tus CVs
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Contraseña
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
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
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Ingresando..."
            : "Iniciar sesión"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-800" />

        <span className="text-sm text-gray-500">
          o
        </span>

        <div className="h-px flex-1 bg-gray-800" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-white py-3 font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Ingresando..."
          : "Continuar con Google"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-400">
        ¿Todavía no tenés cuenta?{" "}

        <Link
          to="/register"
          search={{ redirectTo }}
          className="font-medium text-orange-400 transition hover:text-orange-300"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
