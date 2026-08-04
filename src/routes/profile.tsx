import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <ProfileLayout>
        <ProfilePage />
      </ProfileLayout>
    </ProtectedRoute>
  );
}