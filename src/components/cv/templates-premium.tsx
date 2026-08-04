import type { CVData } from "@/types/cv-types";
import { formatDate } from "@/types/cv-types";
import { A4_WIDTH, A4_HEIGHT } from "./templates";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

/* ================= Executive — dark header, serif body ================= */
export function ExecutiveTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-white text-neutral-900" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "Georgia, serif" }}>
      <header className="bg-neutral-900 px-16 py-10 text-white">
        <h1 className="text-4xl font-bold tracking-wide">{p.fullName || "Tu Nombre"}</h1>
        {p.title && <p className="mt-1 text-sm uppercase tracking-[0.3em]" style={{ color: accent }}>{p.title}</p>}
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-white/80">
          {p.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>}
          {p.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{p.website}</span>}
          {p.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{p.linkedin}</span>}
          {p.github && <span className="flex items-center gap-1"><Github className="h-3 w-3" />{p.github}</span>}
        </div>
      </header>
      <div className="px-16 py-8 space-y-6">
        {p.summary && <ExSection title="Resumen ejecutivo" accent={accent}><p className="text-[12px] leading-relaxed">{p.summary}</p></ExSection>}
        {data.experience.length > 0 && (
          <ExSection title="Experiencia" accent={accent}>
            <div className="space-y-4">
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-bold">{e.role} · <span className="font-normal">{e.company}</span></h3>
                    <span className="text-[11px] text-neutral-500">{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</span>
                  </div>
                  {e.description && (
                    <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700">
                      {e.description.split("\n").filter(Boolean).map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ExSection>
        )}
        {data.education.length > 0 && (
          <ExSection title="Educación" accent={accent}>
            {data.education.map((ed) => (
              <div key={ed.id} className="flex justify-between text-[12px]">
                <span><strong>{ed.degree}</strong> — {ed.institution}</span>
                <span className="text-neutral-500 text-[11px]">{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</span>
              </div>
            ))}
          </ExSection>
        )}
        <div className="grid grid-cols-2 gap-6">
          {data.technologies.length > 0 && (
            <ExSection title="Tecnologías" accent={accent}>
              <p className="text-[12px]">{data.technologies.map((t) => t.name).join(" · ")}</p>
            </ExSection>
          )}
          {data.languages.length > 0 && (
            <ExSection title="Idiomas" accent={accent}>
              <p className="text-[12px]">{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</p>
            </ExSection>
          )}
        </div>
        {data.certifications.length > 0 && (
          <ExSection title="Certificaciones" accent={accent}>
            <ul className="text-[12px] space-y-0.5">
              {data.certifications.map((c) => <li key={c.id}>{c.name} — {c.issuer} <span className="text-neutral-500">({formatDate(c.date)})</span></li>)}
            </ul>
          </ExSection>
        )}
      </div>
    </div>
  );
}
function ExSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>{title}</h2>
      <div className="border-t border-neutral-300 pt-2">{children}</div>
    </section>
  );
}

/* ================= Techie — mono, terminal-esque ================= */
export function TechieTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-[#0b0f17] text-neutral-100" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "'JetBrains Mono', 'Menlo', monospace", padding: "48px 56px" }}>
      <div className="flex items-center gap-2 text-[11px] text-neutral-500">
        <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
        <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
        <span className="ml-2">~/cv/{(p.fullName || "user").toLowerCase().replace(/\s+/g, "-")}.md</span>
      </div>
      <div className="mt-6">
        <span style={{ color: accent }}>$</span> <span className="text-neutral-400">whoami</span>
        <h1 className="text-3xl font-bold mt-1">{p.fullName || "Tu Nombre"}</h1>
        {p.title && <p className="text-sm" style={{ color: accent }}># {p.title}</p>}
      </div>
      <div className="mt-4 text-[11px] text-neutral-400 space-y-0.5">
        {p.email && <div><span style={{ color: accent }}>email</span>: {p.email}</div>}
        {p.phone && <div><span style={{ color: accent }}>phone</span>: {p.phone}</div>}
        {p.location && <div><span style={{ color: accent }}>location</span>: {p.location}</div>}
        {p.website && <div><span style={{ color: accent }}>web</span>: {p.website}</div>}
        {p.github && <div><span style={{ color: accent }}>git</span>: {p.github}</div>}
        {p.linkedin && <div><span style={{ color: accent }}>linkedin</span>: {p.linkedin}</div>}
      </div>
      {p.summary && (
        <TSection title="README.md" accent={accent}>
          <p className="text-[12px] leading-relaxed text-neutral-300">{p.summary}</p>
        </TSection>
      )}
      {data.experience.length > 0 && (
        <TSection title="experience/" accent={accent}>
          <div className="space-y-3">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="text-[12px]"><span style={{ color: accent }}>▸</span> <strong>{e.role}</strong> @ {e.company} <span className="text-neutral-500">[{formatDate(e.startDate)} – {e.current ? "now" : formatDate(e.endDate)}]</span></div>
                {e.description && (
                  <ul className="mt-1 pl-4 text-[11px] text-neutral-400 space-y-0.5">
                    {e.description.split("\n").filter(Boolean).map((l, i) => <li key={i}>- {l}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </TSection>
      )}
      {data.technologies.length > 0 && (
        <TSection title="stack.json" accent={accent}>
          <div className="flex flex-wrap gap-1.5">
            {data.technologies.map((t) => (
              <span key={t.id} className="rounded border px-1.5 py-0.5 text-[10px]" style={{ borderColor: accent, color: accent }}>{t.name}</span>
            ))}
          </div>
        </TSection>
      )}
      {data.education.length > 0 && (
        <TSection title="education/" accent={accent}>
          {data.education.map((ed) => (
            <div key={ed.id} className="text-[12px]"><span style={{ color: accent }}>▸</span> {ed.degree} — {ed.institution} <span className="text-neutral-500">[{formatDate(ed.startDate)} – {formatDate(ed.endDate)}]</span></div>
          ))}
        </TSection>
      )}
      {(data.skills.length > 0 || data.languages.length > 0 || data.certifications.length > 0) && (
        <TSection title="extras/" accent={accent}>
          <div className="grid grid-cols-2 gap-3 text-[11px] text-neutral-300">
            {data.skills.length > 0 && <div><span style={{ color: accent }}>skills</span>: {data.skills.map((s) => s.name).join(", ")}</div>}
            {data.languages.length > 0 && <div><span style={{ color: accent }}>langs</span>: {data.languages.map((l) => `${l.name}(${l.level})`).join(", ")}</div>}
            {data.certifications.length > 0 && <div className="col-span-2"><span style={{ color: accent }}>certs</span>: {data.certifications.map((c) => `${c.name} · ${c.issuer}`).join(" | ")}</div>}
          </div>
        </TSection>
      )}
    </div>
  );
}
function TSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-1.5 text-[11px]"><span className="text-neutral-500">#</span> <span style={{ color: accent }}>{title}</span></h2>
      {children}
    </section>
  );
}

/* ================= Academic — sober, publishable ================= */
export function AcademicTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  return (
    <div className="bg-white text-neutral-900" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "'Times New Roman', Times, serif", padding: "56px 72px" }}>
      <div className="text-center">
        <h1 className="text-3xl">{p.fullName || "Tu Nombre"}</h1>
        {p.title && <p className="mt-1 text-sm italic">{p.title}</p>}
        <p className="mt-2 text-[11px]">
          {[p.email, p.phone, p.location, p.website].filter(Boolean).join(" · ")}
        </p>
      </div>
      <hr className="my-4 border-neutral-400" />
      {p.summary && <AcSection title="Perfil"><p className="text-[12px] leading-relaxed text-justify">{p.summary}</p></AcSection>}
      {data.experience.length > 0 && (
        <AcSection title="Experiencia profesional">
          {data.experience.map((e) => (
            <div key={e.id} className="mb-3">
              <p className="text-[12px]"><strong>{e.role}</strong>, {e.company}{e.location ? `, ${e.location}` : ""} <span className="italic">({formatDate(e.startDate)} – {e.current ? "Actualidad" : formatDate(e.endDate)})</span></p>
              {e.description && (
                <ul className="mt-1 list-disc pl-6 text-[12px] leading-relaxed text-justify">
                  {e.description.split("\n").filter(Boolean).map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              )}
            </div>
          ))}
        </AcSection>
      )}
      {data.education.length > 0 && (
        <AcSection title="Formación académica">
          {data.education.map((ed) => (
            <p key={ed.id} className="text-[12px] mb-1"><strong>{ed.degree}</strong>{ed.field ? `, ${ed.field}` : ""} — {ed.institution} <span className="italic">({formatDate(ed.startDate)} – {formatDate(ed.endDate)})</span></p>
          ))}
        </AcSection>
      )}
      {data.certifications.length > 0 && (
        <AcSection title="Publicaciones y certificaciones">
          <ul className="list-disc pl-6 text-[12px]">
            {data.certifications.map((c) => <li key={c.id}>{c.name}. <em>{c.issuer}</em>, {formatDate(c.date)}.</li>)}
          </ul>
        </AcSection>
      )}
      {(data.technologies.length > 0 || data.skills.length > 0) && (
        <AcSection title="Áreas de especialización">
          <p className="text-[12px]">{[...data.technologies.map((t) => t.name), ...data.skills.map((s) => s.name)].join("; ")}.</p>
        </AcSection>
      )}
      {data.languages.length > 0 && (
        <AcSection title="Idiomas">
          <p className="text-[12px]">{data.languages.map((l) => `${l.name} (${l.level})`).join("; ")}.</p>
        </AcSection>
      )}
    </div>
  );
}
function AcSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1 text-[12px] font-bold uppercase tracking-wider">{title}</h2>
      {children}
    </section>
  );
}

/* ================= Editorial — magazine layout ================= */
export function EditorialTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-white text-neutral-900" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div className="grid grid-cols-[1fr_2fr]">
        <div className="p-10" style={{ backgroundColor: accent, color: "white" }}>
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-80">Perfil</div>
          <h1 className="mt-3 text-4xl font-bold leading-tight">{p.fullName || "Tu Nombre"}</h1>
          {p.title && <p className="mt-2 text-sm italic opacity-90">{p.title}</p>}
          <div className="mt-6 space-y-1 text-[11px] opacity-90" style={{ fontFamily: "system-ui" }}>
            {p.email && <div>{p.email}</div>}
            {p.phone && <div>{p.phone}</div>}
            {p.location && <div>{p.location}</div>}
            {p.website && <div>{p.website}</div>}
            {p.linkedin && <div>{p.linkedin}</div>}
            {p.github && <div>{p.github}</div>}
          </div>
          {data.skills.length > 0 && (
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">Habilidades</div>
              <ul className="mt-2 space-y-0.5 text-[11px]" style={{ fontFamily: "system-ui" }}>
                {data.skills.map((s) => <li key={s.id}>· {s.name}</li>)}
              </ul>
            </div>
          )}
          {data.languages.length > 0 && (
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">Idiomas</div>
              <ul className="mt-2 space-y-0.5 text-[11px]" style={{ fontFamily: "system-ui" }}>
                {data.languages.map((l) => <li key={l.id}>{l.name} — {l.level}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div className="p-10 space-y-5" style={{ fontFamily: "system-ui" }}>
          {p.summary && (
            <div>
              <div className="text-3xl leading-none" style={{ color: accent, fontFamily: "'Playfair Display', Georgia, serif" }}>“</div>
              <p className="text-[13px] leading-relaxed italic -mt-2">{p.summary}</p>
            </div>
          )}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Trayectoria</h2>
              <div className="space-y-4">
                {data.experience.map((e) => (
                  <article key={e.id}>
                    <div className="text-[10px] uppercase tracking-widest" style={{ color: accent }}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</div>
                    <h3 className="text-sm font-semibold mt-0.5">{e.role} <span className="text-neutral-500 font-normal">· {e.company}</span></h3>
                    {e.description && (
                      <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">{e.description.replace(/\n/g, " ")}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-2xl mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Formación</h2>
              {data.education.map((ed) => (
                <p key={ed.id} className="text-[12px]"><strong>{ed.degree}</strong> — {ed.institution} <span className="text-neutral-500">({formatDate(ed.startDate)} – {formatDate(ed.endDate)})</span></p>
              ))}
            </section>
          )}
          {data.technologies.length > 0 && (
            <section>
              <h2 className="text-2xl mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Stack</h2>
              <p className="text-[12px]">{data.technologies.map((t) => t.name).join(" · ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= Gradient — vibrant modern ================= */
export function GradientTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-white text-neutral-900" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header className="px-14 py-12 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent} 0%, #111827 100%)` }}>
        <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <h1 className="text-5xl font-extrabold tracking-tight">{p.fullName || "Tu Nombre"}</h1>
          {p.title && <p className="mt-2 text-base font-medium opacity-95">{p.title}</p>}
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-90">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>·</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>·</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>·</span>}
            {p.website && <span>{p.website}</span>}
          </div>
        </div>
      </header>
      <div className="p-10 grid grid-cols-3 gap-6">
        <main className="col-span-2 space-y-5">
          {p.summary && (
            <div className="rounded-xl p-4" style={{ background: `${accent}0d` }}>
              <p className="text-[12px] leading-relaxed">{p.summary}</p>
            </div>
          )}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>Experiencia</h2>
              <div className="mt-2 space-y-3">
                {data.experience.map((e) => (
                  <div key={e.id} className="rounded-lg border border-neutral-200 p-3">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-bold">{e.role}</h3>
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
              <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>Educación</h2>
              <div className="mt-2 space-y-1">
                {data.education.map((ed) => (
                  <div key={ed.id} className="flex justify-between text-[12px]">
                    <span><strong>{ed.degree}</strong> · {ed.institution}</span>
                    <span className="text-neutral-500 text-[11px]">{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
        <aside className="space-y-5">
          {data.technologies.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>Stack</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {data.technologies.map((t) => (
                  <span key={t.id} className="rounded-full px-2 py-0.5 text-[10px] text-white" style={{ background: `linear-gradient(90deg, ${accent}, #111827)` }}>{t.name}</span>
                ))}
              </div>
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>Habilidades</h3>
              <ul className="mt-2 space-y-1 text-[11px]">
                {data.skills.map((s) => (
                  <li key={s.id}>
                    <div className="flex justify-between"><span>{s.name}</span><span className="text-neutral-400">{s.level}/5</span></div>
                    <div className="mt-1 h-1 rounded bg-neutral-200"><div className="h-1 rounded" style={{ width: `${(s.level / 5) * 100}%`, background: accent }} /></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>Idiomas</h3>
              <ul className="mt-2 space-y-0.5 text-[11px]">
                {data.languages.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name}</span><span className="text-neutral-500">{l.level}</span></li>)}
              </ul>
            </div>
          )}
          {data.certifications.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>Certificaciones</h3>
              <ul className="mt-2 space-y-1 text-[11px]">
                {data.certifications.map((c) => <li key={c.id}><strong>{c.name}</strong><br /><span className="text-neutral-500">{c.issuer}</span></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ================= Compact — dense one-pager ================= */
export function CompactTemplate({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <div className="bg-white text-neutral-900" style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "'Inter', system-ui, sans-serif", padding: "36px 48px" }}>
      <header className="flex items-end justify-between border-b-2 pb-2" style={{ borderColor: accent }}>
        <div>
          <h1 className="text-2xl font-bold leading-none">{p.fullName || "Tu Nombre"}</h1>
          {p.title && <p className="text-[12px] mt-1" style={{ color: accent }}>{p.title}</p>}
        </div>
        <div className="text-right text-[10px] text-neutral-600 space-y-0.5">
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
          {p.website && <div>{p.website}</div>}
        </div>
      </header>
      {p.summary && <p className="mt-3 text-[11px] leading-snug text-neutral-700">{p.summary}</p>}
      <div className="mt-3 grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-3">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>Experiencia</h2>
              <div className="mt-1 space-y-2">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex justify-between text-[11px]">
                      <span><strong>{e.role}</strong> · {e.company}</span>
                      <span className="text-neutral-500 text-[10px]">{formatDate(e.startDate)}–{e.current ? "Hoy" : formatDate(e.endDate)}</span>
                    </div>
                    {e.description && (
                      <ul className="list-disc pl-4 text-[10.5px] leading-tight text-neutral-700">
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
              <h2 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>Educación</h2>
              <div className="mt-1 space-y-0.5">
                {data.education.map((ed) => (
                  <div key={ed.id} className="flex justify-between text-[11px]">
                    <span><strong>{ed.degree}</strong> · {ed.institution}</span>
                    <span className="text-neutral-500 text-[10px]">{formatDate(ed.startDate)}–{formatDate(ed.endDate)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="space-y-3">
          {data.technologies.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>Stack</h3>
              <p className="text-[10.5px] mt-1 leading-snug">{data.technologies.map((t) => t.name).join(" · ")}</p>
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>Habilidades</h3>
              <p className="text-[10.5px] mt-1 leading-snug">{data.skills.map((s) => s.name).join(" · ")}</p>
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>Idiomas</h3>
              <p className="text-[10.5px] mt-1">{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</p>
            </div>
          )}
          {data.certifications.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>Certificaciones</h3>
              <ul className="text-[10.5px] mt-1 space-y-0.5">
                {data.certifications.map((c) => <li key={c.id}>{c.name} — {c.issuer}</li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
