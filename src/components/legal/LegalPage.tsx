import { LEGAL_UPDATED } from "@/config/legal";
import { Link } from "@tanstack/react-router";

interface LegalPageProps {
  title: string;
  sections: { heading: string; body: string | string[] }[];
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          ← Volver al inicio
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">Última actualización: {LEGAL_UPDATED}</p>

        <div className="mt-10 space-y-8">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold text-gray-900">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-2 space-y-3 leading-relaxed text-gray-700">
                {(Array.isArray(s.body) ? s.body : [s.body]).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}