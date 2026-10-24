import { useCV } from "@/context/cv-context";
import { useAuth } from "@/hooks/useAuth";
import {
  emptyCV,
  type Certification,
  type CVData,
  type Education,
  type Experience,
  type Language,
  type Skill,
  type TechItem,
} from "@/types/cv-types";
import { ArrowRight, FilePlus, LayoutTemplate, Loader2, Sparkles, Upload, X } from "lucide-react";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";

/**
 * Importar CV con IA (Gemini). Desactivado hasta cargar crédito en AI Studio.
 * Para reactivarlo: cambiar a true.
 */
const IMPORT_CV_ENABLED = false;

const FUNCTIONS_URL = import.meta.env.VITE_FUNCTIONS_BASE_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/* ---------- Normalización del CV importado ----------
 * La IA puede devolver un CV incompleto: secciones faltantes, ítems sin id
 * o campos en null. Esto lo convierte siempre en un CVData válido.
 */
const str = (v: unknown) => (typeof v === "string" ? v : "");

function normalizeList<T extends { id: string }>(list: unknown, defaults: Omit<T, "id">): T[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({ ...defaults, ...item, id: str(item.id) || nanoid(6) }) as T);
}

function normalizeImportedCV(raw: unknown): CVData {
  const r = (raw ?? {}) as Partial<CVData>;
  const p = (r.personal ?? {}) as Partial<CVData["personal"]>;

  return {
    accent: str(r.accent) || emptyCV.accent,
    personal: {
      fullName: str(p.fullName),
      title: str(p.title),
      email: str(p.email),
      phone: str(p.phone),
      location: str(p.location),
      website: str(p.website),
      linkedin: str(p.linkedin),
      github: str(p.github),
      summary: str(p.summary),
      photo: "", // la foto no viene del PDF
    },
    experience: normalizeList<Experience>(r.experience, {
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }),
    education: normalizeList<Education>(r.education, {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    }),
    technologies: normalizeList<TechItem>(r.technologies, { name: "" }),
    skills: normalizeList<Skill>(r.skills, { name: "", level: 3 }),
    certifications: normalizeList<Certification>(r.certifications, {
      name: "",
      issuer: "",
      date: "",
    }),
    languages: normalizeList<Language>(r.languages, { name: "", level: "" }),
  };
}

/* ---------- Tarjeta de opción ---------- */
interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function OptionCard({ icon, title, description, badge, onClick, disabled }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-left transition dark:border-zinc-800 dark:bg-zinc-800/50 ${
        disabled
          ? "cursor-wait opacity-70"
          : "cursor-pointer hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.99]"
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-pink-500 group-hover:text-white">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</span>
          {badge && (
            <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </span>
      </span>

      <ArrowRight className="h-4 w-4 shrink-0 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
    </button>
  );
}

export function WelcomeModal() {
  const { welcomeModalOpen, closeWelcomeModal, loadSampleData, clearData, setData } = useCV();
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!welcomeModalOpen) return null;

  function triggerFileSelect() {
    setImportError(null);
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo si falla

    if (!file) return;

    if (file.type !== "application/pdf") {
      setImportError("Solo se aceptan archivos PDF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImportError("El archivo no puede superar los 5MB.");
      return;
    }

    if (!user) {
      setImportError("Necesitás iniciar sesión para importar un CV.");
      return;
    }

    setImporting(true);
    setImportError(null);

    try {
      const fileBase64 = await fileToBase64(file);
      const token = await user.getIdToken();

      const response = await fetch(`${FUNCTIONS_URL}/importCV`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileBase64 }),
      });

      // Si la función devuelve un error que no es JSON (ej. 500 en HTML), no explota acá
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error ?? "No se pudo importar el CV.");
      }

      if (!result?.data) {
        throw new Error("No se pudieron extraer datos del CV.");
      }

      setData(normalizeImportedCV(result.data));
      closeWelcomeModal();
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Ocurrió un error al importar el CV.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        {/* Franja de color superior */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-pink-500" />

        {/* Botón cerrar */}
        <button
          type="button"
          onClick={closeWelcomeModal}
          aria-label="Cerrar"
          className="absolute right-4 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            ¡Hola! ¿Cómo querés crear tu CV?
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Elegí cómo arrancar. Después podés cambiar todo.
          </p>

          <div className="mt-6 space-y-3">
            <OptionCard
              icon={<FilePlus className="h-6 w-6" />}
              title="Desde cero"
              badge="Recomendado"
              description="Creá un CV a tu medida. Personalizá secciones y elegí entre plantillas."
              onClick={clearData}
            />

            <OptionCard
              icon={<LayoutTemplate className="h-6 w-6" />}
              title="A partir de un ejemplo"
              description="Empezá con un CV profesional ya armado y editalo a tu gusto."
              onClick={loadSampleData}
            />

            {/* Importar tu CV (oculto mientras IMPORT_CV_ENABLED sea false) */}
            {IMPORT_CV_ENABLED && (
              <>
                <OptionCard
                  icon={
                    importing ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Upload className="h-6 w-6" />
                    )
                  }
                  title={importing ? "Analizando tu CV..." : "Importá tu CV"}
                  description="Subí tu CV actual en PDF y dejá que el sistema extraiga los datos automáticamente."
                  onClick={triggerFileSelect}
                  disabled={importing}
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {importError && <p className="text-sm text-red-500">{importError}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // reader.result viene como "data:application/pdf;base64,XXXXX": solo necesitamos la parte base64
      resolve(result.split(",")[1]);
    };
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}