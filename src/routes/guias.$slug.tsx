import { getGuide } from "@/content/guides";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/guias/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return guide;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Champions CV` },
          { name: "description", content: loaderData.description },
        ]
      : [],
  }),
  component: GuidePage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-gray-900">No encontramos esa guía</h1>
      <Link to="/guias" className="mt-4 inline-block text-orange-500 hover:text-orange-600">
        Ver todas las guías
      </Link>
    </main>
  ),
});

function GuidePage() {
  const guide = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/guias" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          ← Todas las guías
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900">{guide.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {guide.date} · {guide.readingMinutes} min de lectura
        </p>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">{guide.intro}</p>

        <div className="mt-10 space-y-8">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-bold text-gray-900">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-gray-700">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.bullets && (
                  <ul className="list-disc space-y-1.5 pl-6">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
          <p className="font-semibold text-gray-900">¿Listo para armar tu CV?</p>
          <Link
            to="/builder"
            className="mt-3 inline-block rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Crear mi CV gratis
          </Link>
        </div>
      </article>
    </main>
  );
}