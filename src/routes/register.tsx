import { createFileRoute, Link } from "@tanstack/react-router";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirectTo: typeof search.redirectTo === "string" ? search.redirectTo : "/profile/profile",
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black px-4">
      <Link
        to="/"
        className="
          absolute left-6 top-6
          rounded-lg border border-gray-800
          px-4 py-2 text-sm text-gray-400
          transition hover:border-orange-500
          hover:text-orange-400
        "
      >
        ← Volver al inicio
      </Link>

      <RegisterForm />
    </main>
  );
}
