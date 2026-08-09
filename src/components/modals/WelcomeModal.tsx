import { useCV } from "@/context/cv-context";

export function WelcomeModal() {
  const { welcomeModalOpen, closeWelcomeModal, loadSampleData, clearData } = useCV();

  if (!welcomeModalOpen) return null;

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
            onClick={() => {
              alert("Próximamente: Importar PDF con IA");
            }}
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-orange-500 cursor-pointer transition-all bg-zinc-50 dark:bg-zinc-800/50 group"
          >
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 block mb-1">Importá tu CV</span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Subí tu CV actual en PDF y deja que el sistema extraiga los datos automáticamente.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}