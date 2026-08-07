import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, ArrowRight, Sparkles } from "lucide-react";

type TemplateLayout =
  | "minimal"
  | "classic"
  | "sidebar"
  | "header-dark"
  | "techie";

interface TemplateItem {
  id: string;
  name: string;
  description: string;
  premium: boolean;
  layout: TemplateLayout;
}

const templates: TemplateItem[] = [
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Serif, elegante y limpio. Enfoque puro en legibilidad.",
    premium: false,
    layout: "minimal",
  },
  {
    id: "profesional",
    name: "Profesional",
    description: "Diseño clásico equilibrado en dos columnas.",
    premium: false,
    layout: "classic",
  },
  {
    id: "moderna",
    name: "Moderna",
    description: "Sidebar lateral destacado para habilidades y datos clave.",
    premium: false,
    layout: "sidebar",
  },
  {
    id: "ats-friendly",
    name: "ATS Friendly",
    description: "Estructura optimizada 100% para escaneo de bots de RRHH.",
    premium: false,
    layout: "minimal",
  },
  {
    id: "ejecutiva",
    name: "Ejecutiva",
    description: "Header oscuro elegante para cargos senior y directivos.",
    premium: true,
    layout: "header-dark",
  },
  {
    id: "techie",
    name: "Techie",
    description: "Estilo monoespaciado pensado para desarrolladores y IT.",
    premium: true,
    layout: "techie",
  },
];

export function Templates() {
  return (
    <section id="templates" className="relative overflow-hidden bg-background py-24">
      {/* Luz ambiental de fondo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-orange-500/5 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            Plantillas
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Diseños profesionales que hacen destacar tu perfil
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Elegí una plantilla optimizada para ATS y creá un currículum que
            transmita profesionalismo desde el primer vistazo.
          </p>
        </div>

        {/* Grid de Plantillas */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Preview Canvas */}
              <div className="relative flex h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100/70 to-gray-200/50 p-6">
                {template.premium && (
                  <Badge className="absolute right-5 top-5 z-20 gap-1.5 rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                    <Crown className="h-3.5 w-3.5" />
                    PRO
                  </Badge>
                )}

                {/* Hoja de CV Miniatura */}
                <div className="relative flex h-[250px] w-[185px] overflow-hidden rounded-lg border border-gray-200/80 bg-white p-3 shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {/* Minimal / ATS Friendly */}
                  {template.layout === "minimal" && (
                    <div className="flex w-full flex-col gap-2">
                      <div className="mx-auto h-3 w-24 rounded bg-gray-800" />
                      <div className="mx-auto h-1.5 w-32 rounded bg-gray-300" />
                      <div className="my-1 h-px w-full bg-gray-200" />
                      <div className="h-2 w-16 rounded bg-gray-700" />
                      <div className="h-1.5 w-full rounded bg-gray-200" />
                      <div className="h-1.5 w-5/6 rounded bg-gray-200" />
                      <div className="mt-2 h-2 w-20 rounded bg-gray-700" />
                      <div className="h-1.5 w-full rounded bg-gray-200" />
                      <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                    </div>
                  )}

                  {/* Classic */}
                  {template.layout === "classic" && (
                    <div className="flex w-full flex-col gap-2">
                      <div className="h-3 w-28 rounded bg-gray-800" />
                      <div className="h-1.5 w-36 rounded bg-gray-300" />
                      <div className="mt-1 grid grid-cols-3 gap-2">
                        <div className="col-span-2 space-y-1.5">
                          <div className="h-2 w-16 rounded bg-orange-400" />
                          <div className="h-1.5 w-full rounded bg-gray-200" />
                          <div className="h-1.5 w-full rounded bg-gray-200" />
                          <div className="h-1.5 w-3/4 rounded bg-gray-200" />
                        </div>
                        <div className="col-span-1 space-y-1.5 border-l border-gray-100 pl-1.5">
                          <div className="h-2 w-10 rounded bg-gray-600" />
                          <div className="h-1.5 w-full rounded bg-gray-200" />
                          <div className="h-1.5 w-full rounded bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sidebar */}
                  {template.layout === "sidebar" && (
                    <div className="-m-3 flex h-[250px] w-[185px]">
                      <div className="w-1/3 space-y-2 bg-gray-100 p-2 border-r border-gray-200">
                        <div className="mx-auto h-8 w-8 rounded-full bg-gray-300" />
                        <div className="h-1.5 w-full rounded bg-gray-400" />
                        <div className="h-1.5 w-3/4 rounded bg-gray-400" />
                      </div>
                      <div className="w-2/3 space-y-2 p-3">
                        <div className="h-3 w-20 rounded bg-gray-800" />
                        <div className="h-1.5 w-16 rounded bg-gray-300" />
                        <div className="mt-3 h-2 w-12 rounded bg-orange-400" />
                        <div className="h-1.5 w-full rounded bg-gray-200" />
                        <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                      </div>
                    </div>
                  )}

                  {/* Header Dark */}
                  {template.layout === "header-dark" && (
                    <div className="-m-3 flex w-[185px] flex-col">
                      <div className="space-y-1 bg-zinc-900 p-3 text-white">
                        <div className="h-3 w-24 rounded bg-white" />
                        <div className="h-1.5 w-32 rounded bg-zinc-500" />
                      </div>
                      <div className="space-y-2 p-3">
                        <div className="h-2 w-16 rounded bg-zinc-700" />
                        <div className="h-1.5 w-full rounded bg-gray-200" />
                        <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                        <div className="mt-3 h-2 w-16 rounded bg-zinc-700" />
                        <div className="h-1.5 w-full rounded bg-gray-200" />
                      </div>
                    </div>
                  )}

                  {/* Techie */}
                  {template.layout === "techie" && (
                    <div className="-m-3 flex w-[185px] flex-col border border-zinc-800 bg-zinc-950 p-3">
                      <div className="h-3 w-24 rounded bg-emerald-400" />
                      <div className="mt-1 h-1.5 w-28 rounded bg-zinc-600" />
                      <div className="mt-3 h-2 w-16 rounded bg-emerald-500" />
                      <div className="mt-1 h-1.5 w-full rounded bg-zinc-800" />
                      <div className="mt-1 h-1.5 w-4/5 rounded bg-zinc-800" />
                      <div className="mt-3 h-2 w-12 rounded bg-emerald-500" />
                      <div className="mt-1 h-1.5 w-full rounded bg-zinc-800" />
                    </div>
                  )}
                </div>

                {/* Overlay flotante en Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Contenido / Botón */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {template.name}
                </h3>

                <p className="mt-2 min-h-[40px] text-sm text-gray-600">
                  {template.description}
                </p>

                {template.premium ? (
                  <Button
                    asChild
                    size="lg"
                    className="group relative mt-6 w-full overflow-hidden rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98]"
                  >
                    <Link
                      to="/builder"
                      search={{ template: template.id }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                      <span>Usar plantilla</span>
                      <Sparkles className="h-4 w-4 text-amber-200 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="mt-6 w-full rounded-xl border-2 border-gray-200 bg-white font-bold text-gray-800 transition-all duration-200 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600"
                  >
                    <Link
                      to="/builder"
                      search={{ template: template.id }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Usar plantilla</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}