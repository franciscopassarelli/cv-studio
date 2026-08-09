import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CVProvider } from "@/context/cv-context"; // <--- 1. Importa tu CVProvider

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <CVProvider> 
        <ProfileLayout>
          <ProfilePage />
        </ProfileLayout>
      </CVProvider>
    </ProtectedRoute>
  );
}