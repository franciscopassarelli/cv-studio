import { useRef, useState } from "react";
import { useCV } from "@/context/cv-context";
import { useAuth } from "@/hooks/useAuth";
import { nanoid } from "nanoid";
import { Loader2, Upload } from "lucide-react";
import type { CVData } from "@/types/cv-types";

const FUNCTIONS_URL = import.meta.env.VITE_FUNCTIONS_BASE_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "No se pudo importar el CV.");
      }

      const importedData: CVData = result.data;
      setData(importedData);
      closeWelcomeModal();
    } catch (err) {
      setImportError(
        err instanceof Error ? err.message : "Ocurrió un error al importar el CV."
      );
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-zinc-200 dark:border-zinc-800">
        
        {/* Botón cerrar */}
        <button 
          onClick={closeWelcomeModal}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          ¡Hola! ¿Cómo te gustaría crear tu CV?
        </h2>

        <div className="space-y-4">
          {/* Opción 1: Desde cero */}
          <div 
            onClick={clearData}
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-orange-500 cursor-pointer transition-all bg-zinc-50 dark:bg-zinc-800/50 group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500">Desde cero</span>
              <span className="text-xs bg-orange-100 dark:bg-orange-950/50 text-orange-600 px-2 py-0.5 rounded-full font-medium">Recomendado</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Creá un CV a tu medida con ayuda de la IA. Personalizá secciones y elegí entre plantillas.
            </p>
          </div>

          {/* Opción 2: A partir de un ejemplo */}
          <div 
            onClick={loadSampleData}
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-orange-500 cursor-pointer transition-all bg-zinc-50 dark:bg-zinc-800/50 group"
          >
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 block mb-1">A partir de un ejemplo de CV</span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Empezá con un CV profesional ya armado y editalo a tu gusto.
            </p>
          </div>

          {/* Opción 3: Importar tu CV */}
          <div 
            onClick={importing ? undefined : triggerFileSelect}
            className={`p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all bg-zinc-50 dark:bg-zinc-800/50 group ${
              importing ? "cursor-wait opacity-70" : "hover:border-orange-500 cursor-pointer"
            }`}
          >
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 flex items-center gap-2 mb-1">
              {importing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analizando tu CV...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Importá tu CV
                </>
              )}
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Subí tu CV actual en PDF y deja que el sistema extraiga los datos automáticamente.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {importError && (
            <p className="text-sm text-red-500 -mt-2">{importError}</p>
          )}
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
      // reader.result viene como "data:application/pdf;base64,XXXXX" — solo necesitamos la parte base64
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}