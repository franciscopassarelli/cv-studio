import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔐 ProtectedRoute:", {
      loading,
      user: user?.email ?? null,
      pathname: window.location.pathname,
    });

    if (!loading && !user) {
      console.log("🚨 ProtectedRoute REDIRIGE AL LOGIN");

      navigate({
        to: "/login",
        search: {
          redirectTo:
            window.location.pathname +
            window.location.search,
        },
      });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          Cargando...
        </p>
      </div>
    );
  }

  if (!user) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">
        Redirigiendo...
      </p>
    </div>
  );
}

  return <>{children}</>;
}