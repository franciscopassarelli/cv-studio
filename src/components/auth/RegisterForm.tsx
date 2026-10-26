import { useAuth } from "@/hooks/useAuth";
import { authErrorMessage } from "@/lib/auth-errors";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export function RegisterForm() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const { signUp, signInWithGoogle } = useAuth();
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectTo = typeof search.redirectTo === "string" ? search.redirectTo : "/profile";

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError(null);

  if (password.length < 8) {
    setError("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Las contraseñas no coinciden.");
    return;
  }

  if (!accepted) {
    setError("Tenés que aceptar los Términos y la Política de privacidad.");
    return;
  }

  setLoading(true);

  try {
    await signUp(name, email, password);
    navigate({ to: "/verify-email", search: { redirectTo } });
  } catch (err) {
    setError(authErrorMessage(err) || "No pudimos crear tu cuenta. Probá de nuevo.");
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
    } catch (err) {
  console.error("Error al iniciar sesión con Google:", err);
  setError(authErrorMessage(err) || null);
} finally {
      setLoading(false);
    }
  }

  

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Crear cuenta</h1>

        <p className="mt-2 text-sm text-gray-500">Empezá a crear tus CVs profesionales</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre completo</label>

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
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>

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
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Contraseña</label>

          <input
            type="password"
            required
            minLength={8}
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

        <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600">
  <input
    type="checkbox"
    checked={accepted}
    onChange={(e) => setAccepted(e.target.checked)}
    className="mt-0.5 h-4 w-4 cursor-pointer accent-orange-500"
  />
  <span>
    Acepto los{" "}
    <a
      href="/terms"
      target="_blank"
      rel="noreferrer"
      className="font-medium text-orange-500 hover:text-orange-600"
    >
      Términos y condiciones
    </a>{" "}
    y la{" "}
    <a
      href="/privacy"
      target="_blank"
      rel="noreferrer"
      className="font-medium text-orange-500 hover:text-orange-600"
    >
      Política de privacidad
    </a>
    .
  </span>
</label>

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
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
        type="button"
        onClick={handleGoogle}
        disabled={loading || !accepted}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-700 bg-white py-3 font-medium text-gray-900 transition hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        {loading ? "Ingresando..." : "Continuar con Google"}
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
