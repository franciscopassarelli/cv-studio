import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Crown,
  FileText,
  LogOut,
  Check,
  User,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useCVs } from "@/hooks/useCVs";
import { cn } from "@/lib/utils";
import { LogoutModal } from "@/components/modals/LogoutModal";

type Tab = "info" | "plan" | "cvs";

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "info", label: "Información", icon: User },
  { id: "plan", label: "Plan", icon: Crown },
  { id: "cvs", label: "Mis CVs", icon: FileText },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUserName, logout } = useAuth();
  const { profile, loading: loadingProfile } = useUserProfile();
  const { cvs, loading: loadingCvs } = useCVs();

  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [name, setName] = useState(user?.displayName ?? "");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  // Estado para controlar la visibilidad del modal de logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isPremium =
    profile?.plan === "premium" &&
    profile?.premium?.active === true;
  const initial = (user?.displayName ?? user?.email ?? "?")
    .charAt(0)
    .toUpperCase();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSavedMessage(null);

    try {
      await updateUserName(name);
      setSavedMessage("Cambios guardados.");
    } catch {
      setSavedMessage("No pudimos guardar los cambios.");
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmLogout() {
    setLoggingOut(true);
    try {
      await logout();
      navigate({ to: "/" });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setLoggingOut(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="mb-4 flex items-center gap-2 text-sm font-medium cursor-pointer text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        Volver al menú principal
      </button>

      {/* Cover + avatar montado encima */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-zinc-900 to-zinc-900">
        <div className="h-28 w-full" />

        <div className="relative flex flex-col gap-4 px-8 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative -mt-12">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? "Avatar"}
                  className="h-24 w-24 rounded-full border-4 border-zinc-950 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-zinc-950 bg-orange-500 text-3xl font-bold text-black">
                  {initial}
                </div>
              )}
              <button
                type="button"
                disabled
                title="Próximamente"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 cursor-pointer transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Camera size={13} />
              </button>
            </div>

            <div className="pb-1">
              <p className="text-xl font-bold text-white">
                {user?.displayName ?? "Sin nombre"}
              </p>
              <p className="text-sm text-zinc-400">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-1">
            <span
              className={
                isPremium
                  ? "inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-black"
                  : "inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400"
              }
            >
              <Crown size={12} />
              {loadingProfile ? "..." : isPremium ? "Premium" : "Free"}
            </span>

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition cursor-pointer hover:border-red-500/40 hover:text-red-400"
            >
              <LogOut size={13} />
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex justify-center gap-1 border-b border-zinc-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "border-orange-500 text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenido por tab */}
      <div className="mx-auto mt-8 max-w-2xl">
        {activeTab === "info" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
            <h2 className="text-center text-lg font-semibold text-white">
              Información personal
            </h2>
            <p className="mt-1 text-center text-sm text-zinc-500">
              Estos datos son los que ven tus CVs generados.
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSave}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-white outline-none transition focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email ?? ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-zinc-500 outline-none"
                  />
                </div>
              </div>

              <p className="text-xs text-zinc-600">
                El email no se puede modificar por ahora.
              </p>

              <div className="flex items-center justify-center gap-4 border-t border-zinc-900 pt-5">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>

                {savedMessage && (
                  <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                    <Check size={14} className="text-orange-400" />
                    {savedMessage}
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {activeTab === "plan" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <Crown size={26} />
            </div>

            <p className="mt-4 text-sm text-zinc-400">Tu plan actual</p>
            <p className="text-2xl font-bold text-white">
              {loadingProfile ? "..." : isPremium ? "Premium" : "Free"}
            </p>

            {!isPremium && (
              <>
                <div className="mx-auto mt-6 grid max-w-sm gap-2 text-left text-sm text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Check size={14} className="text-orange-400" />
                    Hasta 3 CVs
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={14} className="text-orange-400" />
                    Plantillas básicas
                  </span>
                </div>

                <button className="mx-auto mt-6 flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400 cursor-pointer">
                  <Sparkles size={15} />
                  Mejorar a Premium
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "cvs" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
            <p className="text-center text-sm text-zinc-500">
              {loadingCvs ? "Cargando..." : `${cvs.length} currículums creados`}
            </p>

            {loadingCvs ? null : cvs.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                  <FileText size={26} />
                </div>

                <h3 className="mt-4 text-base font-semibold text-white">
                  Todavía no tenés ningún CV
                </h3>

                <p className="mt-2 max-w-sm text-sm text-zinc-500">
                  Creá tu primer currículum profesional y empezá a preparar tu próxima
                  oportunidad laboral.
                </p>

                <button
                  type="button"
                  onClick={() => navigate({ to: "/builder" })}
                  className="mt-6 flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400 cursor-pointer"
                >
                  <FileText size={15} />
                  Crear mi primer CV
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                      <FileText size={16} />
                    </div>
                    <p className="mt-3 text-sm font-medium text-white">
                      {cv.title}
                    </p>
                    <p className="text-xs text-zinc-500">{cv.template}</p>
                    <p className="mt-2 text-xs text-zinc-600">
                      {cv.updatedAt
                        ? cv.updatedAt.toLocaleDateString("es-AR")
                        : "—"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Componente Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        loading={loggingOut}
      />
    </div>
  );
}