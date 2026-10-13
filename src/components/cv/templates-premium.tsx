import { Fragment } from "react";
import { formatDate } from "@/types/cv-types";
import { A4_WIDTH, A4_HEIGHT } from "./templates";
import {
  type TplProps,
  type ContactKey,
  GHOST,
  Ghost,
  dateRange,
  NameText,
  Bullets,
  JoinedOrGhost,
  SAMPLE,
  CONTACT_ICON,
  contactItems,
  ContactValue,
  Photo,
} from "./template-helpers";

/* ================= Executive — dark header, serif body ================= */
export function ExecutiveTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const contact = contactItems(p, ph);

  return (
    <div
      className="bg-white text-neutral-900"
      style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "Georgia, serif" }}
    >
      <header className="flex items-center justify-between gap-6 bg-neutral-900 px-16 py-10 text-white">
        <div className="min-w-0 flex-1">
          <h1 data-cv-field="personal.fullName" className="text-4xl font-bold tracking-wide">
            <NameText value={p.fullName} ph={ph} />
          </h1>
          {(p.title || ph) && (
            <p
              data-cv-field="personal.title"
              className="mt-1 text-sm uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {p.title || <Ghost>{SAMPLE.title}</Ghost>}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-white/80">
            {contact.map(({ key, value, ghost }) => {
              const Icon = CONTACT_ICON[key];
              return (
                <span
                  key={key}
                  data-cv-field={`personal.${key}`}
                  className="flex items-center gap-1"
                >
                  <Icon className={`h-3 w-3 ${value ? "" : "opacity-40"}`} />
                  <ContactValue value={value} ghost={ghost} />
                </span>
              );
            })}
          </div>
        </div>
        <Photo src={p.photo} className="h-24 w-24 border-2" style={{ borderColor: accent }} />
      </header>

      <div className="px-16 py-8 space-y-6">
        {(p.summary || ph) && (
          <ExSection title="Resumen ejecutivo" accent={accent} field="personal.summary">
            <p className="text-[12px] leading-relaxed">
              {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
            </p>
          </ExSection>
        )}

        {show(data.experience) && (
          <ExSection title="Experiencia" accent={accent} field="experience">
            <div className="space-y-4">
              {data.experience.length > 0 ? (
                data.experience.map((e) => (
                  <div key={e.id} data-cv-field={`experience.${e.id}`}>
                    <div className="flex justify-between gap-4">
                      <h3 className="text-sm font-bold">
                        {e.role || <Ghost>Puesto</Ghost>} ·{" "}
                        <span className="font-normal">{e.company || <Ghost>Empresa</Ghost>}</span>
                      </h3>
                      <span className="shrink-0 text-[11px] text-neutral-500">
                        {dateRange(e.startDate, e.endDate, e.current)}
                      </span>
                    </div>
                    <Bullets
                      text={e.description}
                      ph={ph}
                      className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700"
                    />
                  </div>
                ))
              ) : (
                <div className={GHOST}>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-bold">
                      Tu puesto · <span className="font-normal">Empresa</span>
                    </h3>
                    <span className="text-[11px] text-neutral-500">2022 – Presente</span>
                  </div>
                  <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700">
                    {SAMPLE.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ExSection>
        )}

        {show(data.education) && (
          <ExSection title="Educación" accent={accent} field="education">
            {data.education.length > 0 ? (
              data.education.map((ed) => (
                <div
                  key={ed.id}
                  data-cv-field={`education.${ed.id}`}
                  className="flex justify-between gap-4 text-[12px]"
                >
                  <span>
                    <strong>{ed.degree || <Ghost>Título / Carrera</Ghost>}</strong> —{" "}
                    {ed.institution || <Ghost>Institución</Ghost>}
                  </span>
                  <span className="shrink-0 text-neutral-500 text-[11px]">
                    {dateRange(ed.startDate, ed.endDate)}
                  </span>
                </div>
              ))
            ) : (
              <div className={`flex justify-between text-[12px] ${GHOST}`}>
                <span>
                  <strong>Título / Carrera</strong> — Universidad o institución
                </span>
                <span className="text-neutral-500 text-[11px]">2018 – 2022</span>
              </div>
            )}
          </ExSection>
        )}

        <div className="grid grid-cols-2 gap-6">
          {show(data.technologies) && (
            <ExSection title="Tecnologías" accent={accent} field="technologies">
              <p className="text-[12px]">
                <JoinedOrGhost
                  values={data.technologies.map((t) => t.name)}
                  sample={SAMPLE.techs}
                  sep=" · "
                  ph={ph}
                  emptyLabel="Tecnología"
                />
              </p>
            </ExSection>
          )}
          {show(data.languages) && (
            <ExSection title="Idiomas" accent={accent} field="languages">
              <p className="text-[12px]">
                <JoinedOrGhost
                  values={data.languages.map((l) => (l.name ? `${l.name} (${l.level})` : ""))}
                  sample={SAMPLE.languages.map(([n, l]) => `${n} (${l})`)}
                  sep=" · "
                  ph={ph}
                  emptyLabel="Idioma"
                />
              </p>
            </ExSection>
          )}
        </div>

        {show(data.certifications) && (
          <ExSection title="Certificaciones" accent={accent} field="certifications">
            <ul className="text-[12px] space-y-0.5">
              {data.certifications.length > 0 ? (
                data.certifications.map((c) => (
                  <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                    {c.name || <Ghost>Certificación</Ghost>} — {c.issuer || <Ghost>Emisor</Ghost>}
                    {c.date && <span className="text-neutral-500"> ({formatDate(c.date)})</span>}
                  </li>
                ))
              ) : (
                <li className={GHOST}>
                  {SAMPLE.cert.name} — {SAMPLE.cert.issuer} ({SAMPLE.cert.year})
                </li>
              )}
            </ul>
          </ExSection>
        )}
      </div>
    </div>
  );
}
function ExSection({
  title,
  accent,
  children,
  field,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
  field?: string;
}) {
  return (
    <section data-cv-field={field}>
      <h2
        className="mb-2 text-[11px] font-bold uppercase tracking-widest"
        style={{ color: accent }}
      >
        {title}
      </h2>
      <div className="border-t border-neutral-300 pt-2">{children}</div>
    </section>
  );
}

/* ================= Techie — mono, terminal-esque ================= */
const TECHIE_LABEL: Record<ContactKey, string> = {
  email: "email",
  phone: "phone",
  location: "location",
  website: "web",
  github: "git",
  linkedin: "linkedin",
};

export function TechieTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const contact = contactItems(p, ph, [
    "email",
    "phone",
    "location",
    "website",
    "github",
    "linkedin",
  ]);
  const showExtras = show(data.skills) || show(data.languages) || show(data.certifications);

  return (
    <div
      className="bg-[#0b0f17] text-neutral-100"
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        fontFamily: "'JetBrains Mono', 'Menlo', monospace",
        padding: "48px 56px",
      }}
    >
      <div className="flex items-center gap-2 text-[11px] text-neutral-500">
        <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
        <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
        <span className="ml-2">
          ~/cv/{(p.fullName || "user").toLowerCase().replace(/\s+/g, "-")}.md
        </span>
      </div>
      <div className="mt-6">
        <span style={{ color: accent }}>$</span> <span className="text-neutral-400">whoami</span>
        <h1 data-cv-field="personal.fullName" className="text-3xl font-bold mt-1">
          <NameText value={p.fullName} ph={ph} />
        </h1>
        {(p.title || ph) && (
          <p data-cv-field="personal.title" className="text-sm" style={{ color: accent }}>
            # {p.title || <Ghost>{SAMPLE.title}</Ghost>}
          </p>
        )}
      </div>
      <div className="mt-4 text-[11px] text-neutral-400 space-y-0.5">
        {contact.map((c) => (
          <div key={c.key} data-cv-field={`personal.${c.key}`}>
            <span style={{ color: accent }}>{TECHIE_LABEL[c.key]}</span>:{" "}
            <ContactValue value={c.value} ghost={c.ghost} />
          </div>
        ))}
      </div>

      {(p.summary || ph) && (
        <TSection title="README.md" accent={accent} field="personal.summary">
          <p className="text-[12px] leading-relaxed text-neutral-300">
            {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
          </p>
        </TSection>
      )}

      {show(data.experience) && (
        <TSection title="experience/" accent={accent} field="experience">
          <div className="space-y-3">
            {data.experience.length > 0 ? (
              data.experience.map((e) => (
                <div key={e.id} data-cv-field={`experience.${e.id}`}>
                  <div className="text-[12px]">
                    <span style={{ color: accent }}>▸</span>{" "}
                    <strong>{e.role || <Ghost>Puesto</Ghost>}</strong> @{" "}
                    {e.company || <Ghost>Empresa</Ghost>}{" "}
                    <span className="text-neutral-500">
                      [{dateRange(e.startDate, e.endDate, e.current, "now")}]
                    </span>
                  </div>
                  <Bullets
                    text={e.description}
                    ph={ph}
                    prefix="- "
                    className="mt-1 pl-4 text-[11px] text-neutral-400 space-y-0.5"
                  />
                </div>
              ))
            ) : (
              <div className={GHOST}>
                <div className="text-[12px]">
                  <span style={{ color: accent }}>▸</span> <strong>Tu puesto</strong> @ Empresa{" "}
                  <span className="text-neutral-500">[2022 – now]</span>
                </div>
                <ul className="mt-1 pl-4 text-[11px] text-neutral-400 space-y-0.5">
                  {SAMPLE.bullets.map((b) => (
                    <li key={b}>- {b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TSection>
      )}

      {show(data.technologies) && (
        <TSection title="stack.json" accent={accent} field="technologies">
          <div className="flex flex-wrap gap-1.5">
            {data.technologies.length > 0
              ? data.technologies.map((t) => (
                  <span
                    key={t.id}
                    data-cv-field={`technologies.${t.id}`}
                    className="rounded border px-1.5 py-0.5 text-[10px]"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {t.name || <Ghost>tech</Ghost>}
                  </span>
                ))
              : SAMPLE.techs.map((t) => (
                  <span
                    key={t}
                    className={`rounded border px-1.5 py-0.5 text-[10px] ${GHOST}`}
                    style={{ borderColor: accent, color: accent }}
                  >
                    {t}
                  </span>
                ))}
          </div>
        </TSection>
      )}

      {show(data.education) && (
        <TSection title="education/" accent={accent} field="education">
          {data.education.length > 0 ? (
            data.education.map((ed) => (
              <div key={ed.id} data-cv-field={`education.${ed.id}`} className="text-[12px]">
                <span style={{ color: accent }}>▸</span>{" "}
                {ed.degree || <Ghost>Título / Carrera</Ghost>} —{" "}
                {ed.institution || <Ghost>Institución</Ghost>}{" "}
                <span className="text-neutral-500">[{dateRange(ed.startDate, ed.endDate)}]</span>
              </div>
            ))
          ) : (
            <div className={`text-[12px] ${GHOST}`}>
              <span style={{ color: accent }}>▸</span> Título / Carrera — Universidad{" "}
              <span className="text-neutral-500">[2018 – 2022]</span>
            </div>
          )}
        </TSection>
      )}

      {showExtras && (
        <TSection title="extras/" accent={accent}>
          <div className="grid grid-cols-2 gap-3 text-[11px] text-neutral-300">
            {show(data.skills) && (
              <div data-cv-field="skills">
                <span style={{ color: accent }}>skills</span>:{" "}
                <JoinedOrGhost
                  values={data.skills.map((s) => s.name)}
                  sample={SAMPLE.skills}
                  sep=", "
                  ph={ph}
                  emptyLabel="habilidad"
                />
              </div>
            )}
            {show(data.languages) && (
              <div data-cv-field="languages">
                <span style={{ color: accent }}>langs</span>:{" "}
                <JoinedOrGhost
                  values={data.languages.map((l) => (l.name ? `${l.name}(${l.level})` : ""))}
                  sample={SAMPLE.languages.map(([n, l]) => `${n}(${l})`)}
                  sep=", "
                  ph={ph}
                  emptyLabel="idioma"
                />
              </div>
            )}
            {show(data.certifications) && (
              <div data-cv-field="certifications" className="col-span-2">
                <span style={{ color: accent }}>certs</span>:{" "}
                <JoinedOrGhost
                  values={data.certifications.map((c) => (c.name ? `${c.name} · ${c.issuer}` : ""))}
                  sample={[`${SAMPLE.cert.name} · ${SAMPLE.cert.issuer}`]}
                  sep=" | "
                  ph={ph}
                  emptyLabel="certificación"
                />
              </div>
            )}
          </div>
        </TSection>
      )}
    </div>
  );
}
function TSection({
  title,
  accent,
  children,
  field,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
  field?: string;
}) {
  return (
    <section className="mt-5" data-cv-field={field}>
      <h2 className="mb-1.5 text-[11px]">
        <span className="text-neutral-500">#</span> <span style={{ color: accent }}>{title}</span>
      </h2>
      {children}
    </section>
  );
}

/* ================= Academic — sober, publishable ================= */
// Sin foto a propósito: el formato académico no la suele usar.
export function AcademicTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const contact = contactItems(p, ph, ["email", "phone", "location", "website"]);
  const areas = [...data.technologies.map((t) => t.name), ...data.skills.map((s) => s.name)];

  return (
    <div
      className="bg-white text-neutral-900"
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        fontFamily: "'Times New Roman', Times, serif",
        padding: "56px 72px",
      }}
    >
      <div className="text-center">
        <h1 data-cv-field="personal.fullName" className="text-3xl">
          <NameText value={p.fullName} ph={ph} />
        </h1>
        {(p.title || ph) && (
          <p data-cv-field="personal.title" className="mt-1 text-sm italic">
            {p.title || <Ghost>{SAMPLE.title}</Ghost>}
          </p>
        )}
        <p className="mt-2 text-[11px]">
          {contact.map((c, i) => (
            <Fragment key={c.key}>
              {i > 0 && " · "}
              <span data-cv-field={`personal.${c.key}`}>
                <ContactValue value={c.value} ghost={c.ghost} />
              </span>
            </Fragment>
          ))}
        </p>
      </div>
      <hr className="my-4 border-neutral-400" />

      {(p.summary || ph) && (
        <AcSection title="Perfil" field="personal.summary">
          <p className="text-[12px] leading-relaxed text-justify">
            {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
          </p>
        </AcSection>
      )}

      {show(data.experience) && (
        <AcSection title="Experiencia profesional" field="experience">
          {data.experience.length > 0 ? (
            data.experience.map((e) => (
              <div key={e.id} data-cv-field={`experience.${e.id}`} className="mb-3">
                <p className="text-[12px]">
                  <strong>{e.role || <Ghost>Puesto</Ghost>}</strong>,{" "}
                  {e.company || <Ghost>Empresa</Ghost>}
                  {e.location ? `, ${e.location}` : ""}{" "}
                  <span className="italic">
                    ({dateRange(e.startDate, e.endDate, e.current, "Actualidad")})
                  </span>
                </p>
                <Bullets
                  text={e.description}
                  ph={ph}
                  className="mt-1 list-disc pl-6 text-[12px] leading-relaxed text-justify"
                />
              </div>
            ))
          ) : (
            <div className={`mb-3 ${GHOST}`}>
              <p className="text-[12px]">
                <strong>Tu puesto</strong>, Empresa, Ciudad (2022 – Actualidad)
              </p>
              <ul className="mt-1 list-disc pl-6 text-[12px] leading-relaxed">
                {SAMPLE.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </AcSection>
      )}

      {show(data.education) && (
        <AcSection title="Formación académica" field="education">
          {data.education.length > 0 ? (
            data.education.map((ed) => (
              <p key={ed.id} data-cv-field={`education.${ed.id}`} className="text-[12px] mb-1">
                <strong>{ed.degree || <Ghost>Título / Carrera</Ghost>}</strong>
                {ed.field ? `, ${ed.field}` : ""} — {ed.institution || <Ghost>Institución</Ghost>}{" "}
                <span className="italic">({dateRange(ed.startDate, ed.endDate)})</span>
              </p>
            ))
          ) : (
            <p className={`text-[12px] mb-1 ${GHOST}`}>
              <strong>Título / Carrera</strong> — Universidad o institución (2018 – 2022)
            </p>
          )}
        </AcSection>
      )}

      {show(data.certifications) && (
        <AcSection title="Publicaciones y certificaciones" field="certifications">
          <ul className="list-disc pl-6 text-[12px]">
            {data.certifications.length > 0 ? (
              data.certifications.map((c) => (
                <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                  {c.name || <Ghost>Certificación</Ghost>}.{" "}
                  <em>{c.issuer || <Ghost>Emisor</Ghost>}</em>
                  {c.date && `, ${formatDate(c.date)}`}.
                </li>
              ))
            ) : (
              <li className={GHOST}>
                {SAMPLE.cert.name}. <em>{SAMPLE.cert.issuer}</em>, {SAMPLE.cert.year}.
              </li>
            )}
          </ul>
        </AcSection>
      )}

      {(areas.length > 0 || ph) && (
        <AcSection
          title="Áreas de especialización"
          field={
            data.technologies.length === 0 && data.skills.length > 0 ? "skills" : "technologies"
          }
        >
          <p className="text-[12px]">
            <JoinedOrGhost
              values={areas}
              sample={[...SAMPLE.techs, ...SAMPLE.skills.slice(0, 2)]}
              sep="; "
              ph={ph}
              emptyLabel="Área"
            />
            .
          </p>
        </AcSection>
      )}

      {show(data.languages) && (
        <AcSection title="Idiomas" field="languages">
          <p className="text-[12px]">
            <JoinedOrGhost
              values={data.languages.map((l) => (l.name ? `${l.name} (${l.level})` : ""))}
              sample={SAMPLE.languages.map(([n, l]) => `${n} (${l})`)}
              sep="; "
              ph={ph}
              emptyLabel="Idioma"
            />
            .
          </p>
        </AcSection>
      )}
    </div>
  );
}
function AcSection({
  title,
  children,
  field,
}: {
  title: string;
  children: React.ReactNode;
  field?: string;
}) {
  return (
    <section className="mt-4" data-cv-field={field}>
      <h2 className="mb-1 text-[12px] font-bold uppercase tracking-wider">{title}</h2>
      {children}
    </section>
  );
}

/* ================= Editorial — magazine layout ================= */
export function EditorialTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const contact = contactItems(p, ph);
  const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

  return (
    <div
      className="bg-white text-neutral-900"
      style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, ...serif }}
    >
      <div className="grid grid-cols-[1fr_2fr]" style={{ minHeight: A4_HEIGHT }}>
        <div className="p-10" style={{ backgroundColor: accent, color: "white" }}>
          <Photo src={p.photo} className="mb-6 h-24 w-24 border-2 border-white/70" />
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-80">Perfil</div>
          <h1 data-cv-field="personal.fullName" className="mt-3 text-4xl font-bold leading-tight">
            <NameText value={p.fullName} ph={ph} />
          </h1>
          {(p.title || ph) && (
            <p data-cv-field="personal.title" className="mt-2 text-sm italic opacity-90">
              {p.title || <Ghost>{SAMPLE.title}</Ghost>}
            </p>
          )}
          <div
            className="mt-6 space-y-1 text-[11px] opacity-90 break-all"
            style={{ fontFamily: "system-ui" }}
          >
            {contact.map((c) => (
              <div key={c.key} data-cv-field={`personal.${c.key}`}>
                <ContactValue value={c.value} ghost={c.ghost} />
              </div>
            ))}
          </div>

          {show(data.skills) && (
            <div data-cv-field="skills" className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">Habilidades</div>
              <ul className="mt-2 space-y-0.5 text-[11px]" style={{ fontFamily: "system-ui" }}>
                {data.skills.length > 0
                  ? data.skills.map((s) => (
                      <li key={s.id} data-cv-field={`skills.${s.id}`}>
                        · {s.name || <Ghost>Habilidad</Ghost>}
                      </li>
                    ))
                  : SAMPLE.skills.map((s) => (
                      <li key={s} className={GHOST}>
                        · {s}
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {show(data.languages) && (
            <div data-cv-field="languages" className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">Idiomas</div>
              <ul className="mt-2 space-y-0.5 text-[11px]" style={{ fontFamily: "system-ui" }}>
                {data.languages.length > 0
                  ? data.languages.map((l) => (
                      <li key={l.id} data-cv-field={`languages.${l.id}`}>
                        {l.name || <Ghost>Idioma</Ghost>} — {l.level}
                      </li>
                    ))
                  : SAMPLE.languages.map(([n, lv]) => (
                      <li key={n} className={GHOST}>
                        {n} — {lv}
                      </li>
                    ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-10 space-y-5" style={{ fontFamily: "system-ui" }}>
          {(p.summary || ph) && (
            <div data-cv-field="personal.summary">
              <div className="text-3xl leading-none" style={{ color: accent, ...serif }}>
                “
              </div>
              <p className="text-[13px] leading-relaxed italic -mt-2">
                {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
              </p>
            </div>
          )}

          {show(data.experience) && (
            <section data-cv-field="experience">
              <h2 className="text-2xl mb-2" style={serif}>
                Trayectoria
              </h2>
              <div className="space-y-4">
                {data.experience.length > 0 ? (
                  data.experience.map((e) => (
                    <article key={e.id} data-cv-field={`experience.${e.id}`}>
                      <div
                        className="text-[10px] uppercase tracking-widest"
                        style={{ color: accent }}
                      >
                        {dateRange(e.startDate, e.endDate, e.current)}
                      </div>
                      <h3 className="text-sm font-semibold mt-0.5">
                        {e.role || <Ghost>Puesto</Ghost>}{" "}
                        <span className="text-neutral-500 font-normal">
                          · {e.company || <Ghost>Empresa</Ghost>}
                        </span>
                      </h3>
                      {e.description ? (
                        <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">
                          {e.description.replace(/\n/g, " ")}
                        </p>
                      ) : (
                        ph && (
                          <p className={`mt-1 text-[12px] text-neutral-700 ${GHOST}`}>
                            {SAMPLE.bulletHint}
                          </p>
                        )
                      )}
                    </article>
                  ))
                ) : (
                  <article className={GHOST}>
                    <div
                      className="text-[10px] uppercase tracking-widest"
                      style={{ color: accent }}
                    >
                      2022 – Presente
                    </div>
                    <h3 className="text-sm font-semibold mt-0.5">
                      Tu puesto <span className="text-neutral-500 font-normal">· Empresa</span>
                    </h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">
                      {SAMPLE.bullets.join(" ")}
                    </p>
                  </article>
                )}
              </div>
            </section>
          )}

          {show(data.education) && (
            <section data-cv-field="education">
              <h2 className="text-2xl mb-1" style={serif}>
                Formación
              </h2>
              {data.education.length > 0 ? (
                data.education.map((ed) => (
                  <p key={ed.id} data-cv-field={`education.${ed.id}`} className="text-[12px]">
                    <strong>{ed.degree || <Ghost>Título / Carrera</Ghost>}</strong> —{" "}
                    {ed.institution || <Ghost>Institución</Ghost>}{" "}
                    <span className="text-neutral-500">
                      ({dateRange(ed.startDate, ed.endDate)})
                    </span>
                  </p>
                ))
              ) : (
                <p className={`text-[12px] ${GHOST}`}>
                  <strong>Título / Carrera</strong> — Universidad o institución (2018 – 2022)
                </p>
              )}
            </section>
          )}

          {show(data.technologies) && (
            <section data-cv-field="technologies">
              <h2 className="text-2xl mb-1" style={serif}>
                Stack
              </h2>
              <p className="text-[12px]">
                <JoinedOrGhost
                  values={data.technologies.map((t) => t.name)}
                  sample={SAMPLE.techs}
                  sep=" · "
                  ph={ph}
                  emptyLabel="Tecnología"
                />
              </p>
            </section>
          )}

          {show(data.certifications) && (
            <section data-cv-field="certifications">
              <h2 className="text-2xl mb-1" style={serif}>
                Certificaciones
              </h2>
              {data.certifications.length > 0 ? (
                data.certifications.map((c) => (
                  <p key={c.id} data-cv-field={`certifications.${c.id}`} className="text-[12px]">
                    <strong>{c.name || <Ghost>Certificación</Ghost>}</strong> —{" "}
                    {c.issuer || <Ghost>Emisor</Ghost>}
                    {c.date && <span className="text-neutral-500"> ({formatDate(c.date)})</span>}
                  </p>
                ))
              ) : (
                <p className={`text-[12px] ${GHOST}`}>
                  <strong>{SAMPLE.cert.name}</strong> — {SAMPLE.cert.issuer} ({SAMPLE.cert.year})
                </p>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= Gradient — vibrant modern ================= */
export function GradientTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const contact = contactItems(p, ph, ["email", "phone", "location", "website"]);

  return (
    <div
      className="bg-white text-neutral-900"
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <header
        className="px-14 py-12 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, #111827 100%)` }}
      >
        <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center justify-between gap-6">
          <div className="min-w-0">
            <h1
              data-cv-field="personal.fullName"
              className="text-5xl font-extrabold tracking-tight"
            >
              <NameText value={p.fullName} ph={ph} />
            </h1>
            {(p.title || ph) && (
              <p data-cv-field="personal.title" className="mt-2 text-base font-medium opacity-95">
                {p.title || <Ghost>{SAMPLE.title}</Ghost>}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-90">
              {contact.map((c, i) => (
                <Fragment key={c.key}>
                  {i > 0 && <span>·</span>}
                  <span data-cv-field={`personal.${c.key}`}>
                    <ContactValue value={c.value} ghost={c.ghost} />
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          <Photo src={p.photo} className="h-28 w-28 border-4 border-white/30" />
        </div>
      </header>

      <div className="p-10 grid grid-cols-3 gap-6">
        <main className="col-span-2 space-y-5">
          {(p.summary || ph) && (
            <div
              data-cv-field="personal.summary"
              className="rounded-xl p-4"
              style={{ background: `${accent}0d` }}
            >
              <p className="text-[12px] leading-relaxed">
                {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
              </p>
            </div>
          )}

          {show(data.experience) && (
            <section data-cv-field="experience">
              <h2
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Experiencia
              </h2>
              <div className="mt-2 space-y-3">
                {data.experience.length > 0 ? (
                  data.experience.map((e) => (
                    <div
                      key={e.id}
                      data-cv-field={`experience.${e.id}`}
                      className="rounded-lg border border-neutral-200 p-3"
                    >
                      <div className="flex justify-between gap-4">
                        <h3 className="text-sm font-bold">{e.role || <Ghost>Puesto</Ghost>}</h3>
                        <span className="shrink-0 text-[11px] text-neutral-500">
                          {dateRange(e.startDate, e.endDate, e.current)}
                        </span>
                      </div>
                      <p className="text-[12px] text-neutral-600">
                        {e.company || <Ghost>Empresa</Ghost>}
                        {e.location ? ` · ${e.location}` : ""}
                      </p>
                      <Bullets
                        text={e.description}
                        ph={ph}
                        className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700"
                      />
                    </div>
                  ))
                ) : (
                  <div className={`rounded-lg border border-neutral-200 p-3 ${GHOST}`}>
                    <div className="flex justify-between">
                      <h3 className="text-sm font-bold">Tu puesto</h3>
                      <span className="text-[11px] text-neutral-500">2022 – Presente</span>
                    </div>
                    <p className="text-[12px] text-neutral-600">Empresa · Ciudad</p>
                    <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700">
                      {SAMPLE.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {show(data.education) && (
            <section data-cv-field="education">
              <h2
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Educación
              </h2>
              <div className="mt-2 space-y-1">
                {data.education.length > 0 ? (
                  data.education.map((ed) => (
                    <div
                      key={ed.id}
                      data-cv-field={`education.${ed.id}`}
                      className="flex justify-between gap-4 text-[12px]"
                    >
                      <span>
                        <strong>{ed.degree || <Ghost>Título / Carrera</Ghost>}</strong> ·{" "}
                        {ed.institution || <Ghost>Institución</Ghost>}
                      </span>
                      <span className="shrink-0 text-neutral-500 text-[11px]">
                        {dateRange(ed.startDate, ed.endDate)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className={`flex justify-between text-[12px] ${GHOST}`}>
                    <span>
                      <strong>Título / Carrera</strong> · Universidad o institución
                    </span>
                    <span className="text-neutral-500 text-[11px]">2018 – 2022</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>

        <aside className="space-y-5">
          {show(data.technologies) && (
            <div data-cv-field="technologies">
              <h3
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Stack
              </h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {data.technologies.length > 0
                  ? data.technologies.map((t) => (
                      <span
                        key={t.id}
                        data-cv-field={`technologies.${t.id}`}
                        className="rounded-full px-2 py-0.5 text-[10px] text-white"
                        style={{ background: `linear-gradient(90deg, ${accent}, #111827)` }}
                      >
                        {t.name || <Ghost className="opacity-70">Tecnología</Ghost>}
                      </span>
                    ))
                  : SAMPLE.techs.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full px-2 py-0.5 text-[10px] text-white ${GHOST}`}
                        style={{ background: `linear-gradient(90deg, ${accent}, #111827)` }}
                      >
                        {t}
                      </span>
                    ))}
              </div>
            </div>
          )}

          {show(data.skills) && (
            <div data-cv-field="skills">
              <h3
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Habilidades
              </h3>
              <ul className="mt-2 space-y-1 text-[11px]">
                {data.skills.length > 0
                  ? data.skills.map((s) => (
                      <li key={s.id} data-cv-field={`skills.${s.id}`}>
                        <div className="flex justify-between">
                          <span>{s.name || <Ghost>Habilidad</Ghost>}</span>
                          <span className="text-neutral-400">{s.level}/5</span>
                        </div>
                        <div className="mt-1 h-1 rounded bg-neutral-200">
                          <div
                            className="h-1 rounded"
                            style={{ width: `${(s.level / 5) * 100}%`, background: accent }}
                          />
                        </div>
                      </li>
                    ))
                  : SAMPLE.skills.map((s, i) => (
                      <li key={s} className={GHOST}>
                        <div className="flex justify-between">
                          <span>{s}</span>
                          <span className="text-neutral-400">{4 - i}/5</span>
                        </div>
                        <div className="mt-1 h-1 rounded bg-neutral-200">
                          <div
                            className="h-1 rounded"
                            style={{ width: `${((4 - i) / 5) * 100}%`, background: accent }}
                          />
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {show(data.languages) && (
            <div data-cv-field="languages">
              <h3
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Idiomas
              </h3>
              <ul className="mt-2 space-y-0.5 text-[11px]">
                {data.languages.length > 0
                  ? data.languages.map((l) => (
                      <li
                        key={l.id}
                        data-cv-field={`languages.${l.id}`}
                        className="flex justify-between"
                      >
                        <span>{l.name || <Ghost>Idioma</Ghost>}</span>
                        <span className="text-neutral-500">{l.level}</span>
                      </li>
                    ))
                  : SAMPLE.languages.map(([n, lv]) => (
                      <li key={n} className={`flex justify-between ${GHOST}`}>
                        <span>{n}</span>
                        <span className="text-neutral-500">{lv}</span>
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {show(data.certifications) && (
            <div data-cv-field="certifications">
              <h3
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Certificaciones
              </h3>
              <ul className="mt-2 space-y-1 text-[11px]">
                {data.certifications.length > 0 ? (
                  data.certifications.map((c) => (
                    <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                      <strong>{c.name || <Ghost>Certificación</Ghost>}</strong>
                      <br />
                      <span className="text-neutral-500">{c.issuer || <Ghost>Emisor</Ghost>}</span>
                    </li>
                  ))
                ) : (
                  <li className={GHOST}>
                    <strong>{SAMPLE.cert.name}</strong>
                    <br />
                    <span className="text-neutral-500">{SAMPLE.cert.issuer}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ================= Compact — dense one-pager ================= */
// Sin foto a propósito: prioriza meter todo en una hoja.
export function CompactTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const contact = contactItems(p, ph, ["email", "phone", "location", "website"]);

  return (
    <div
      className="bg-white text-neutral-900"
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "36px 48px",
      }}
    >
      <header
        className="flex items-end justify-between gap-6 border-b-2 pb-2"
        style={{ borderColor: accent }}
      >
        <div>
          <h1 data-cv-field="personal.fullName" className="text-2xl font-bold leading-none">
            <NameText value={p.fullName} ph={ph} />
          </h1>
          {(p.title || ph) && (
            <p
              data-cv-field="personal.title"
              className="text-[12px] mt-1"
              style={{ color: accent }}
            >
              {p.title || <Ghost>{SAMPLE.title}</Ghost>}
            </p>
          )}
        </div>
        <div className="text-right text-[10px] text-neutral-600 space-y-0.5">
          {contact.map((c) => (
            <div key={c.key} data-cv-field={`personal.${c.key}`}>
              <ContactValue value={c.value} ghost={c.ghost} />
            </div>
          ))}
        </div>
      </header>

      {(p.summary || ph) && (
        <p
          data-cv-field="personal.summary"
          className="mt-3 text-[11px] leading-snug text-neutral-700"
        >
          {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
        </p>
      )}

      <div className="mt-3 grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-3">
          {show(data.experience) && (
            <section data-cv-field="experience">
              <h2
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Experiencia
              </h2>
              <div className="mt-1 space-y-2">
                {data.experience.length > 0 ? (
                  data.experience.map((e) => (
                    <div key={e.id} data-cv-field={`experience.${e.id}`}>
                      <div className="flex justify-between gap-3 text-[11px]">
                        <span>
                          <strong>{e.role || <Ghost>Puesto</Ghost>}</strong> ·{" "}
                          {e.company || <Ghost>Empresa</Ghost>}
                        </span>
                        <span className="shrink-0 text-neutral-500 text-[10px]">
                          {dateRange(e.startDate, e.endDate, e.current, "Hoy", "–")}
                        </span>
                      </div>
                      <Bullets
                        text={e.description}
                        ph={ph}
                        className="list-disc pl-4 text-[10.5px] leading-tight text-neutral-700"
                      />
                    </div>
                  ))
                ) : (
                  <div className={GHOST}>
                    <div className="flex justify-between text-[11px]">
                      <span>
                        <strong>Tu puesto</strong> · Empresa
                      </span>
                      <span className="text-neutral-500 text-[10px]">2022–Hoy</span>
                    </div>
                    <ul className="list-disc pl-4 text-[10.5px] leading-tight text-neutral-700">
                      {SAMPLE.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {show(data.education) && (
            <section data-cv-field="education">
              <h2
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Educación
              </h2>
              <div className="mt-1 space-y-0.5">
                {data.education.length > 0 ? (
                  data.education.map((ed) => (
                    <div
                      key={ed.id}
                      data-cv-field={`education.${ed.id}`}
                      className="flex justify-between gap-3 text-[11px]"
                    >
                      <span>
                        <strong>{ed.degree || <Ghost>Título / Carrera</Ghost>}</strong> ·{" "}
                        {ed.institution || <Ghost>Institución</Ghost>}
                      </span>
                      <span className="shrink-0 text-neutral-500 text-[10px]">
                        {dateRange(ed.startDate, ed.endDate, false, "Hoy", "–")}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className={`flex justify-between text-[11px] ${GHOST}`}>
                    <span>
                      <strong>Título / Carrera</strong> · Universidad
                    </span>
                    <span className="text-neutral-500 text-[10px]">2018–2022</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-3">
          {show(data.technologies) && (
            <div data-cv-field="technologies">
              <h3
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Stack
              </h3>
              <p className="text-[10.5px] mt-1 leading-snug">
                <JoinedOrGhost
                  values={data.technologies.map((t) => t.name)}
                  sample={SAMPLE.techs}
                  sep=" · "
                  ph={ph}
                  emptyLabel="Tecnología"
                />
              </p>
            </div>
          )}
          {show(data.skills) && (
            <div data-cv-field="skills">
              <h3
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Habilidades
              </h3>
              <p className="text-[10.5px] mt-1 leading-snug">
                <JoinedOrGhost
                  values={data.skills.map((s) => s.name)}
                  sample={SAMPLE.skills}
                  sep=" · "
                  ph={ph}
                  emptyLabel="Habilidad"
                />
              </p>
            </div>
          )}
          {show(data.languages) && (
            <div data-cv-field="languages">
              <h3
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Idiomas
              </h3>
              <p className="text-[10.5px] mt-1">
                <JoinedOrGhost
                  values={data.languages.map((l) => (l.name ? `${l.name} (${l.level})` : ""))}
                  sample={SAMPLE.languages.map(([n, l]) => `${n} (${l})`)}
                  sep=" · "
                  ph={ph}
                  emptyLabel="Idioma"
                />
              </p>
            </div>
          )}
          {show(data.certifications) && (
            <div data-cv-field="certifications">
              <h3
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Certificaciones
              </h3>
              <ul className="text-[10.5px] mt-1 space-y-0.5">
                {data.certifications.length > 0 ? (
                  data.certifications.map((c) => (
                    <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                      {c.name || <Ghost>Certificación</Ghost>} — {c.issuer || <Ghost>Emisor</Ghost>}
                    </li>
                  ))
                ) : (
                  <li className={GHOST}>
                    {SAMPLE.cert.name} — {SAMPLE.cert.issuer}
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
