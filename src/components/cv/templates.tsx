import type { CVData } from "@/types/cv-types";
import { formatDate } from "@/types/cv-types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

// A4 approx: 210 x 297 mm → 794 x 1123 px @ 96dpi
export const A4_WIDTH = 794;
export const A4_HEIGHT = 1123;

export function MinimalistTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  return (
    <div className="bg-white text-neutral-900 font-serif" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, padding: "56px 64px" }}>
      <header className="border-b border-neutral-300 pb-6">
        <h1 className="text-4xl font-light tracking-tight">{p.fullName || "Tu Nombre"}</h1>
        {p.title && <p className="mt-1 text-sm text-neutral-600 italic">{p.title}</p>}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-600">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>·</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>·</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <span>·</span>}
          {p.website && <span>{p.website}</span>}
        </div>
      </header>

      {p.summary && (
        <Section title="Perfil">
          <p className="text-[12px] leading-relaxed text-neutral-700">{p.summary}</p>
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title="Experiencia">
          <div className="space-y-4">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{e.role}</h3>
                    <p className="text-xs text-neutral-600">{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    {formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}
                  </span>
                </div>
                {e.description && (
                  <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700">
                    {e.description.split("\n").filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Educación">
          <div className="space-y-3">
            {data.education.map((ed) => (
              <div key={ed.id} className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-sm font-medium">{ed.degree}</h3>
                  <p className="text-xs text-neutral-600">{ed.institution}{ed.field ? ` · ${ed.field}` : ""}</p>
                </div>
                <span className="text-[11px] text-neutral-500">{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(data.technologies.length > 0 || data.skills.length > 0) && (
        <Section title="Habilidades">
          <p className="text-[12px] text-neutral-700">
            {[...data.technologies.map((t) => t.name), ...data.skills.map((s) => s.name)].filter(Boolean).join(" · ")}
          </p>
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title="Idiomas">
          <p className="text-[12px] text-neutral-700">
            {data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
          </p>
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title="Certificaciones">
          <ul className="space-y-1 text-[12px] text-neutral-700">
            {data.certifications.map((c) => (
              <li key={c.id}>{c.name} — {c.issuer} <span className="text-neutral-500">({formatDate(c.date)})</span></li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">{title}</h2>
      {children}
    </section>
  );
}

/* ----------------------- Professional (classic two-col header) ----------------------- */
export function ProfessionalTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-white text-neutral-900" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "Georgia, serif" }}>
      <header className="px-16 py-10" style={{ borderBottom: `4px solid ${accent}` }}>
        <h1 className="text-4xl font-bold uppercase tracking-wide">{p.fullName || "Tu Nombre"}</h1>
        {p.title && <p className="mt-1 text-lg" style={{ color: accent }}>{p.title}</p>}
        <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-neutral-700">
          {p.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>}
          {p.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{p.website}</span>}
          {p.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{p.linkedin}</span>}
          {p.github && <span className="flex items-center gap-1"><Github className="h-3 w-3" />{p.github}</span>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8 px-16 py-8">
        <div className="col-span-2 space-y-6">
          {p.summary && <BlockP title="Perfil profesional" accent={accent}><p className="text-[12px] leading-relaxed">{p.summary}</p></BlockP>}
          {data.experience.length > 0 && (
            <BlockP title="Experiencia laboral" accent={accent}>
              <div className="space-y-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex justify-between">
                      <h3 className="font-bold text-sm">{e.role}</h3>
                      <span className="text-[11px] text-neutral-600">{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</span>
                    </div>
                    <p className="text-[12px] italic text-neutral-700">{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                    {e.description && (
                      <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-800">
                        {e.description.split("\n").filter(Boolean).map((l, i) => <li key={i}>{l}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </BlockP>
          )}
          {data.education.length > 0 && (
            <BlockP title="Educación" accent={accent}>
              <div className="space-y-3">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <div className="flex justify-between">
                      <h3 className="font-bold text-sm">{ed.degree}</h3>
                      <span className="text-[11px] text-neutral-600">{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</span>
                    </div>
                    <p className="text-[12px] italic">{ed.institution}</p>
                    {ed.description && <p className="text-[12px] text-neutral-700">{ed.description}</p>}
                  </div>
                ))}
              </div>
            </BlockP>
          )}
        </div>
        <aside className="space-y-6">
          {data.technologies.length > 0 && (
            <BlockP title="Tecnologías" accent={accent}>
              <ul className="text-[12px] space-y-0.5">{data.technologies.map((t) => <li key={t.id}>· {t.name}</li>)}</ul>
            </BlockP>
          )}
          {data.skills.length > 0 && (
            <BlockP title="Habilidades" accent={accent}>
              <ul className="text-[12px] space-y-0.5">{data.skills.map((s) => <li key={s.id}>· {s.name}</li>)}</ul>
            </BlockP>
          )}
          {data.languages.length > 0 && (
            <BlockP title="Idiomas" accent={accent}>
              <ul className="text-[12px] space-y-0.5">{data.languages.map((l) => <li key={l.id}>{l.name} — {l.level}</li>)}</ul>
            </BlockP>
          )}
          {data.certifications.length > 0 && (
            <BlockP title="Certificaciones" accent={accent}>
              <ul className="text-[12px] space-y-1">{data.certifications.map((c) => <li key={c.id}><span className="font-semibold">{c.name}</span><br /><span className="text-neutral-600">{c.issuer}</span></li>)}</ul>
            </BlockP>
          )}
        </aside>
      </div>
    </div>
  );
}
function BlockP({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>{title}</h2>
      <div className="border-t border-neutral-300 pt-2">{children}</div>
    </section>
  );
}

/* ----------------------- Modern (colored sidebar + cards) ----------------------- */
export function ModernTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-white text-neutral-900 grid grid-cols-[260px_1fr]" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "Inter, system-ui, sans-serif" }}>
      <aside style={{ backgroundColor: accent }} className="text-white p-8 space-y-6">
        <div>
          <div className="mx-auto h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
            {(p.fullName || "?").split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
        </div>
        <div>
          <h2 className="text-[10px] uppercase tracking-widest opacity-70">Contacto</h2>
          <ul className="mt-2 space-y-1.5 text-[11px]">
            {p.email && <li className="flex items-start gap-2"><Mail className="h-3 w-3 mt-0.5 shrink-0" /><span className="break-all">{p.email}</span></li>}
            {p.phone && <li className="flex items-start gap-2"><Phone className="h-3 w-3 mt-0.5 shrink-0" />{p.phone}</li>}
            {p.location && <li className="flex items-start gap-2"><MapPin className="h-3 w-3 mt-0.5 shrink-0" />{p.location}</li>}
            {p.website && <li className="flex items-start gap-2"><Globe className="h-3 w-3 mt-0.5 shrink-0" /><span className="break-all">{p.website}</span></li>}
            {p.linkedin && <li className="flex items-start gap-2"><Linkedin className="h-3 w-3 mt-0.5 shrink-0" /><span className="break-all">{p.linkedin}</span></li>}
            {p.github && <li className="flex items-start gap-2"><Github className="h-3 w-3 mt-0.5 shrink-0" /><span className="break-all">{p.github}</span></li>}
          </ul>
        </div>
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[10px] uppercase tracking-widest opacity-70">Habilidades</h2>
            <ul className="mt-2 space-y-2 text-[11px]">
              {data.skills.map((s) => (
                <li key={s.id}>
                  <div className="flex justify-between"><span>{s.name}</span></div>
                  <div className="mt-1 h-1 w-full rounded bg-white/20">
                    <div className="h-1 rounded bg-white" style={{ width: `${(s.level / 5) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-[10px] uppercase tracking-widest opacity-70">Idiomas</h2>
            <ul className="mt-2 space-y-1 text-[11px]">
              {data.languages.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name}</span><span className="opacity-80">{l.level}</span></li>)}
            </ul>
          </div>
        )}
      </aside>

      <main className="p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold">{p.fullName || "Tu Nombre"}</h1>
          {p.title && <p className="text-sm font-medium" style={{ color: accent }}>{p.title}</p>}
        </header>
        {p.summary && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Perfil</h2>
            <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">{p.summary}</p>
          </section>
        )}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Experiencia</h2>
            <div className="mt-2 space-y-4">
              {data.experience.map((e) => (
                <div key={e.id} className="relative pl-4 border-l-2" style={{ borderColor: accent }}>
                  <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold">{e.role}</h3>
                    <span className="text-[11px] text-neutral-500">{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</span>
                  </div>
                  <p className="text-[12px] text-neutral-600">{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  {e.description && (
                    <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700">
                      {e.description.split("\n").filter(Boolean).map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Educación</h2>
            <div className="mt-2 space-y-2">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold">{ed.degree}</h3>
                    <span className="text-[11px] text-neutral-500">{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</span>
                  </div>
                  <p className="text-[12px] text-neutral-600">{ed.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {data.technologies.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Tecnologías</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {data.technologies.map((t) => (
                <span key={t.id} className="rounded-full px-2.5 py-0.5 text-[11px]" style={{ backgroundColor: `${accent}15`, color: accent }}>{t.name}</span>
              ))}
            </div>
          </section>
        )}
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Certificaciones</h2>
            <ul className="mt-2 space-y-1 text-[12px]">
              {data.certifications.map((c) => <li key={c.id}><span className="font-semibold">{c.name}</span> — {c.issuer} <span className="text-neutral-500">({formatDate(c.date)})</span></li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

/* ----------------------- Elegant (serif, gold accents) ----------------------- */
export function ElegantTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-[#fbf9f4] text-neutral-900" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "'Playfair Display', Georgia, serif", padding: "64px 72px" }}>
      <header className="text-center">
        <h1 className="text-5xl font-normal tracking-wide">{p.fullName || "Tu Nombre"}</h1>
        <div className="mx-auto mt-2 h-px w-20" style={{ backgroundColor: accent }} />
        {p.title && <p className="mt-3 text-sm uppercase tracking-[0.3em] text-neutral-600">{p.title}</p>}
        <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-neutral-600" style={{ fontFamily: "system-ui" }}>
          {[p.email, p.phone, p.location, p.website].filter(Boolean).map((x, i, a) => (
            <span key={i}>{x}{i < a.length - 1 ? " •" : ""}</span>
          ))}
        </div>
      </header>

      {p.summary && (
        <section className="mt-8 text-center">
          <p className="mx-auto max-w-xl text-[13px] italic leading-relaxed text-neutral-700">"{p.summary}"</p>
        </section>
      )}

      {data.experience.length > 0 && <ElegantSection title="Experiencia" accent={accent}>
        <div className="space-y-4">
          {data.experience.map((e) => (
            <div key={e.id} className="text-center">
              <h3 className="text-base">{e.role}</h3>
              <p className="text-[12px] text-neutral-600" style={{ fontFamily: "system-ui" }}>{e.company}{e.location ? ` · ${e.location}` : ""} · {formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</p>
              {e.description && <p className="mt-1 text-[12px] leading-relaxed text-neutral-700" style={{ fontFamily: "system-ui" }}>{e.description.replace(/\n/g, " · ")}</p>}
            </div>
          ))}
        </div>
      </ElegantSection>}

      {data.education.length > 0 && <ElegantSection title="Educación" accent={accent}>
        <div className="space-y-3 text-center">
          {data.education.map((ed) => (
            <div key={ed.id}>
              <h3 className="text-base">{ed.degree}</h3>
              <p className="text-[12px] text-neutral-600" style={{ fontFamily: "system-ui" }}>{ed.institution} · {formatDate(ed.startDate)} – {formatDate(ed.endDate)}</p>
            </div>
          ))}
        </div>
      </ElegantSection>}

      <div className="mt-8 grid grid-cols-2 gap-8" style={{ fontFamily: "system-ui" }}>
        {data.technologies.length > 0 && (
          <div className="text-center">
            <h2 className="mb-2 text-[11px] uppercase tracking-[0.3em]" style={{ color: accent, fontFamily: "'Playfair Display', Georgia, serif" }}>Tecnologías</h2>
            <p className="text-[12px] text-neutral-700">{data.technologies.map((t) => t.name).join(" · ")}</p>
          </div>
        )}
        {data.languages.length > 0 && (
          <div className="text-center">
            <h2 className="mb-2 text-[11px] uppercase tracking-[0.3em]" style={{ color: accent, fontFamily: "'Playfair Display', Georgia, serif" }}>Idiomas</h2>
            <p className="text-[12px] text-neutral-700">{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</p>
          </div>
        )}
      </div>

      {data.certifications.length > 0 && <ElegantSection title="Certificaciones" accent={accent}>
        <ul className="space-y-1 text-center text-[12px]" style={{ fontFamily: "system-ui" }}>
          {data.certifications.map((c) => <li key={c.id}>{c.name} — {c.issuer} ({formatDate(c.date)})</li>)}
        </ul>
      </ElegantSection>}
    </div>
  );
}
function ElegantSection({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="h-px w-8" style={{ backgroundColor: accent }} />
        <h2 className="text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}>{title}</h2>
        <div className="h-px w-8" style={{ backgroundColor: accent }} />
      </div>
      {children}
    </section>
  );
}

/* ----------------------- Creative (bold, asymmetric) ----------------------- */
export function CreativeTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-white text-neutral-900 relative overflow-hidden" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full" style={{ backgroundColor: accent, opacity: 0.15 }} />
      <div className="absolute top-40 -left-10 h-40 w-40 rounded-full" style={{ backgroundColor: accent, opacity: 0.08 }} />

      <header className="relative px-14 pt-14">
        <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: accent }}>// Currículum</span>
        <h1 className="mt-2 text-6xl font-black leading-none tracking-tight">{p.fullName || "Tu Nombre"}</h1>
        {p.title && (
          <p className="mt-3 inline-block rounded-full px-4 py-1 text-xs font-semibold text-white" style={{ backgroundColor: accent }}>{p.title}</p>
        )}
      </header>

      <div className="relative grid grid-cols-[1fr_240px] gap-8 px-14 py-10">
        <main className="space-y-6">
          {p.summary && (
            <div className="rounded-2xl border-2 border-neutral-900 p-5">
              <p className="text-[13px] leading-relaxed">{p.summary}</p>
            </div>
          )}
          {data.experience.length > 0 && (
            <section>
              <h2 className="mb-3 text-2xl font-black">Experiencia<span style={{ color: accent }}>.</span></h2>
              <div className="space-y-4">
                {data.experience.map((e, i) => (
                  <div key={e.id} className="flex gap-4">
                    <div className="shrink-0 text-3xl font-black text-neutral-200">{String(i + 1).padStart(2, "0")}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-bold">{e.role} <span className="font-normal text-neutral-500">@ {e.company}</span></h3>
                        <span className="text-[11px] text-neutral-500">{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</span>
                      </div>
                      {e.description && (
                        <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700">
                          {e.description.split("\n").filter(Boolean).map((l, k) => <li key={k}>{l}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.education.length > 0 && (
            <section>
              <h2 className="mb-2 text-2xl font-black">Educación<span style={{ color: accent }}>.</span></h2>
              <div className="space-y-2">
                {data.education.map((ed) => (
                  <div key={ed.id} className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-bold">{ed.degree}</h3>
                      <p className="text-[12px] text-neutral-600">{ed.institution}</p>
                    </div>
                    <span className="text-[11px] text-neutral-500">{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
        <aside className="space-y-5">
          <div>
            <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Contacto</h3>
            <ul className="space-y-1 text-[11px] text-neutral-700">
              {p.email && <li className="break-all">{p.email}</li>}
              {p.phone && <li>{p.phone}</li>}
              {p.location && <li>{p.location}</li>}
              {p.website && <li className="break-all">{p.website}</li>}
              {p.linkedin && <li className="break-all">{p.linkedin}</li>}
              {p.github && <li className="break-all">{p.github}</li>}
            </ul>
          </div>
          {data.technologies.length > 0 && (
            <div>
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Stack</h3>
              <div className="flex flex-wrap gap-1">
                {data.technologies.map((t) => (
                  <span key={t.id} className="rounded-md border border-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold">{t.name}</span>
                ))}
              </div>
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Habilidades</h3>
              <ul className="space-y-1 text-[11px]">{data.skills.map((s) => <li key={s.id}>{s.name} <span style={{ color: accent }}>{"●".repeat(s.level)}</span><span className="text-neutral-300">{"●".repeat(5 - s.level)}</span></li>)}</ul>
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Idiomas</h3>
              <ul className="space-y-1 text-[11px]">{data.languages.map((l) => <li key={l.id}><span className="font-bold">{l.name}</span> — {l.level}</li>)}</ul>
            </div>
          )}
          {data.certifications.length > 0 && (
            <div>
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Certificaciones</h3>
              <ul className="space-y-1 text-[11px]">{data.certifications.map((c) => <li key={c.id}>{c.name} — <span className="text-neutral-600">{c.issuer}</span></li>)}</ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ----------------------- ATS Friendly (plain, single column) ----------------------- */
export function ATSTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  return (
    <div className="bg-white text-black" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "Arial, Helvetica, sans-serif", padding: "48px 64px" }}>
      <h1 className="text-2xl font-bold">{p.fullName || "Your Name"}</h1>
      {p.title && <p className="text-sm">{p.title}</p>}
      <p className="mt-1 text-[11px]">
        {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join(" | ")}
      </p>

      {p.summary && <AtsSection title="PROFESSIONAL SUMMARY"><p className="text-[12px] leading-snug">{p.summary}</p></AtsSection>}

      {data.experience.length > 0 && (
        <AtsSection title="WORK EXPERIENCE">
          {data.experience.map((e) => (
            <div key={e.id} className="mb-3">
              <p className="text-[12px] font-bold">{e.role} — {e.company}{e.location ? `, ${e.location}` : ""}</p>
              <p className="text-[11px] italic">{formatDate(e.startDate)} – {e.current ? "Present" : formatDate(e.endDate)}</p>
              {e.description && (
                <ul className="mt-1 list-disc pl-5 text-[12px] leading-snug">
                  {e.description.split("\n").filter(Boolean).map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              )}
            </div>
          ))}
        </AtsSection>
      )}

      {data.education.length > 0 && (
        <AtsSection title="EDUCATION">
          {data.education.map((ed) => (
            <div key={ed.id} className="mb-2">
              <p className="text-[12px] font-bold">{ed.degree}{ed.field ? `, ${ed.field}` : ""}</p>
              <p className="text-[12px]">{ed.institution} — {formatDate(ed.startDate)} – {formatDate(ed.endDate)}</p>
            </div>
          ))}
        </AtsSection>
      )}

      {data.technologies.length > 0 && (
        <AtsSection title="TECHNICAL SKILLS">
          <p className="text-[12px]">{data.technologies.map((t) => t.name).join(", ")}</p>
        </AtsSection>
      )}
      {data.skills.length > 0 && (
        <AtsSection title="SKILLS">
          <p className="text-[12px]">{data.skills.map((s) => s.name).join(", ")}</p>
        </AtsSection>
      )}
      {data.certifications.length > 0 && (
        <AtsSection title="CERTIFICATIONS">
          <ul className="list-disc pl-5 text-[12px]">
            {data.certifications.map((c) => <li key={c.id}>{c.name} — {c.issuer} ({formatDate(c.date)})</li>)}
          </ul>
        </AtsSection>
      )}
      {data.languages.length > 0 && (
        <AtsSection title="LANGUAGES">
          <p className="text-[12px]">{data.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>
        </AtsSection>
      )}
    </div>
  );
}
function AtsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="border-b border-black pb-0.5 text-[12px] font-bold">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
