import { GUIDES } from "@/content/guides";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/guias/")({
  head: () => ({
    meta: [
      { title: "Guías para armar tu CV | Champions CV" },
      {
        name: "description",
        content: "Guías prácticas para escribir un currículum profesional: qué poner, cómo ordenarlo y qué errores evitar.",
      },
    ],
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          ← Volver al inicio
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900">Guías para tu CV</h1>
        <p className="mt-2 text-gray-600">Consejos prácticos para armar un currículum que se lea bien.</p>

        <div className="mt-10 space-y-5">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              to="/guias/$slug"
              params={{ slug: g.slug }}
              className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-orange-400 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900">{g.title}</h2>
              <p className="mt-2 text-gray-600">{g.description}</p>
              <p className="mt-3 text-xs text-gray-400">{g.readingMinutes} min de lectura</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}