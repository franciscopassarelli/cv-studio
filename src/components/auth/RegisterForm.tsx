import { useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const { signUp, signInWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectTo =
    typeof search.redirectTo === "string"
      ? search.redirectTo
      : "/profile";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      await signUp(name, email, password);

      navigate({
        to: redirectTo,
      });
    } catch {
      setError("No pudimos crear tu cuenta. Probá con otro email.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
  setError(null);
  setLoading(true);

  try {
    await signInWithGoogle();

    // Firebase ya autenticó al usuario.
    // Esperamos un tick para que el estado de auth se sincronice.
    await new Promise((resolve) => setTimeout(resolve, 100));

    navigate({
      to: redirectTo,
    });
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    setError("No pudimos iniciar sesión con Google.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Crear cuenta
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Empezá a crear tus CVs profesionales
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Nombre completo
          </label>

          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Contraseña
          </label>

          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>

          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">o</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        onClick={handleGoogle}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Continuar con Google
      </button>

      <p className="mt-5 text-center text-sm text-gray-500">
        ¿Ya tenés una cuenta?{" "}
        <Link
          to="/login"
          search={{ redirectTo }}
          className="font-medium text-orange-500 hover:text-orange-600"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}