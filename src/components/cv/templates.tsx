import { Fragment } from "react";
import { formatDate } from "@/types/cv-types";
import { UserRound, Camera } from "lucide-react";
import {
  type TplProps,
  GHOST,
  Ghost,
  dateRange,
  NameText,
  Bullets,
  JoinedOrGhost,
  SAMPLE,
  CONTACT_ICON,
  ALL_CONTACT,
  contactItems,
  ContactValue,
  Photo,
} from "./template-helpers";

// A4 approx: 210 x 297 mm → 794 x 1123 px @ 96dpi
export const A4_WIDTH = 794;
export const A4_HEIGHT = 1123;

/* ----------------------- Minimalist ----------------------- */
export function MinimalistTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const ph = placeholders;
  const contact = contactItems(p, ph, ["email", "phone", "location", "website"]);
  const hasSkills = data.technologies.length > 0 || data.skills.length > 0;

  return (
    <div
      className="bg-white text-neutral-900 font-serif"
      style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, padding: "56px 64px" }}
    >
      <header className="border-b border-neutral-300 pb-6">
        <h1 data-cv-field="personal.fullName" className="text-4xl font-light tracking-tight">
          <NameText value={p.fullName} ph={ph} />
        </h1>
        {(p.title || ph) && (
          <p data-cv-field="personal.title" className="mt-1 text-sm text-neutral-600 italic">
            {p.title || <Ghost>{SAMPLE.title}</Ghost>}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-600">
          {contact.map((c, i) => (
            <Fragment key={c.key}>
              {i > 0 && <span>·</span>}
              <span data-cv-field={`personal.${c.key}`}>{c.value || <Ghost>{c.ghost}</Ghost>}</span>
            </Fragment>
          ))}
        </div>
      </header>

      {(p.summary || ph) && (
        <Section title="Perfil" field="personal.summary">
          <p className="text-[12px] leading-relaxed text-neutral-700">
            {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
          </p>
        </Section>
      )}

      {(data.experience.length > 0 || ph) && (
        <Section title="Experiencia" field="experience">
          <div className="space-y-4">
            {data.experience.length > 0 ? (
              data.experience.map((e) => (
                <div key={e.id} data-cv-field={`experience.${e.id}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium">{e.role || <Ghost>Puesto</Ghost>}</h3>
                      <p className="text-xs text-neutral-600">
                        {e.company || <Ghost>Empresa</Ghost>}
                        {e.location ? ` · ${e.location}` : ""}
                      </p>
                    </div>
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
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Tu puesto</h3>
                    <p className="text-xs text-neutral-600">Empresa · Ciudad</p>
                  </div>
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
        </Section>
      )}

      {(data.education.length > 0 || ph) && (
        <Section title="Educación" field="education">
          <div className="space-y-3">
            {data.education.length > 0 ? (
              data.education.map((ed) => (
                <div
                  key={ed.id}
                  data-cv-field={`education.${ed.id}`}
                  className="flex items-baseline justify-between gap-4"
                >
                  <div>
                    <h3 className="text-sm font-medium">
                      {ed.degree || <Ghost>Título / Carrera</Ghost>}
                    </h3>
                    <p className="text-xs text-neutral-600">
                      {ed.institution || <Ghost>Institución</Ghost>}
                      {ed.field ? ` · ${ed.field}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] text-neutral-500">
                    {dateRange(ed.startDate, ed.endDate)}
                  </span>
                </div>
              ))
            ) : (
              <div className={`flex items-baseline justify-between ${GHOST}`}>
                <div>
                  <h3 className="text-sm font-medium">Título / Carrera</h3>
                  <p className="text-xs text-neutral-600">Universidad o institución</p>
                </div>
                <span className="text-[11px] text-neutral-500">2018 – 2022</span>
              </div>
            )}
          </div>
        </Section>
      )}

      {(hasSkills || ph) && (
        <Section
          title="Habilidades"
          field={
            data.technologies.length === 0 && data.skills.length > 0 ? "skills" : "technologies"
          }
        >
          <p className="text-[12px] text-neutral-700">
            {hasSkills ? (
              [...data.technologies.map((t) => t.name), ...data.skills.map((s) => s.name)]
                .filter(Boolean)
                .join(" · ")
            ) : (
              <Ghost>{[...SAMPLE.techs, ...SAMPLE.skills.slice(0, 2)].join(" · ")}</Ghost>
            )}
          </p>
        </Section>
      )}

      {(data.languages.length > 0 || ph) && (
        <Section title="Idiomas" field="languages">
          <p className="text-[12px] text-neutral-700">
            {data.languages.length > 0 ? (
              data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")
            ) : (
              <Ghost>{SAMPLE.languages.map(([n, l]) => `${n} (${l})`).join(" · ")}</Ghost>
            )}
          </p>
        </Section>
      )}

      {(data.certifications.length > 0 || ph) && (
        <Section title="Certificaciones" field="certifications">
          {data.certifications.length > 0 ? (
            <ul className="space-y-1 text-[12px] text-neutral-700">
              {data.certifications.map((c) => (
                <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                  {c.name || <Ghost>Certificación</Ghost>} — {c.issuer || <Ghost>Emisor</Ghost>}
                  {c.date && <span className="text-neutral-500"> ({formatDate(c.date)})</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className={`text-[12px] text-neutral-700 ${GHOST}`}>
              Nombre de la certificación — Emisor (2024)
            </p>
          )}
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  field,
}: {
  title: string;
  children: React.ReactNode;
  field?: string;
}) {
  return (
    <section className="mt-6" data-cv-field={field}>
      <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ----------------------- Professional (classic two-col header) ----------------------- */
export function ProfessionalTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const contact = contactItems(p, ph, ALL_CONTACT);

  return (
    <div
      className="bg-white text-neutral-900"
      style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "Georgia, serif" }}
    >
      <header
        className="flex items-start justify-between gap-6 px-16 py-10"
        style={{ borderBottom: `4px solid ${accent}` }}
      >
        <div className="min-w-0 flex-1">
          <h1
            data-cv-field="personal.fullName"
            className="text-4xl font-bold uppercase tracking-wide"
          >
            <NameText value={p.fullName} ph={ph} />
          </h1>
          {(p.title || ph) && (
            <p data-cv-field="personal.title" className="mt-1 text-lg" style={{ color: accent }}>
              {p.title || <Ghost>{SAMPLE.title}</Ghost>}
            </p>
          )}
          <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-neutral-700">
            {contact.map(({ key, value, ghost }) => {
              const Icon = CONTACT_ICON[key];
              return (
                <span
                  key={key}
                  data-cv-field={`personal.${key}`}
                  className="flex items-center gap-1"
                >
                  <Icon className={`h-3 w-3 shrink-0 ${value ? "" : "opacity-40"}`} />
                  {value ? <span className="break-all">{value}</span> : <Ghost>{ghost}</Ghost>}
                </span>
              );
            })}
          </div>
        </div>
        {/* La foto solo aparece si el usuario la cargó */}
        {p.photo && (
          <div
            data-cv-field="personal.photo"
            className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2"
            style={{ borderColor: accent }}
          >
            <img src={p.photo} alt="" className="h-full w-full object-cover" />
          </div>
        )}
      </header>

      <div className="grid grid-cols-3 gap-8 px-16 py-8">
        <div className="col-span-2 space-y-6">
          {(p.summary || ph) && (
            <BlockP title="Perfil profesional" accent={accent} field="personal.summary">
              <p className="text-[12px] leading-relaxed">
                {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
              </p>
            </BlockP>
          )}

          {(data.experience.length > 0 || ph) && (
            <BlockP title="Experiencia laboral" accent={accent} field="experience">
              <div className="space-y-4">
                {data.experience.length > 0 ? (
                  data.experience.map((e) => (
                    <div key={e.id} data-cv-field={`experience.${e.id}`}>
                      <div className="flex justify-between gap-4">
                        <h3 className="font-bold text-sm">{e.role || <Ghost>Puesto</Ghost>}</h3>
                        <span className="shrink-0 text-[11px] text-neutral-600">
                          {dateRange(e.startDate, e.endDate, e.current)}
                        </span>
                      </div>
                      <p className="text-[12px] italic text-neutral-700">
                        {e.company || <Ghost>Empresa</Ghost>}
                        {e.location ? ` · ${e.location}` : ""}
                      </p>
                      <Bullets
                        text={e.description}
                        ph={ph}
                        className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-800"
                      />
                    </div>
                  ))
                ) : (
                  <div className={GHOST}>
                    <div className="flex justify-between">
                      <h3 className="font-bold text-sm">Tu puesto</h3>
                      <span className="text-[11px] text-neutral-600">2022 – Presente</span>
                    </div>
                    <p className="text-[12px] text-neutral-700">Empresa · Ciudad</p>
                    <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-800">
                      {SAMPLE.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </BlockP>
          )}

          {(data.education.length > 0 || ph) && (
            <BlockP title="Educación" accent={accent} field="education">
              <div className="space-y-3">
                {data.education.length > 0 ? (
                  data.education.map((ed) => (
                    <div key={ed.id} data-cv-field={`education.${ed.id}`}>
                      <div className="flex justify-between gap-4">
                        <h3 className="font-bold text-sm">
                          {ed.degree || <Ghost>Título / Carrera</Ghost>}
                        </h3>
                        <span className="shrink-0 text-[11px] text-neutral-600">
                          {dateRange(ed.startDate, ed.endDate)}
                        </span>
                      </div>
                      <p className="text-[12px] italic">
                        {ed.institution || <Ghost>Institución</Ghost>}
                      </p>
                      {ed.description && (
                        <p className="text-[12px] text-neutral-700">{ed.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={GHOST}>
                    <div className="flex justify-between">
                      <h3 className="font-bold text-sm">Título / Carrera</h3>
                      <span className="text-[11px] text-neutral-600">2018 – 2022</span>
                    </div>
                    <p className="text-[12px]">Universidad o institución</p>
                  </div>
                )}
              </div>
            </BlockP>
          )}
        </div>

        <aside className="space-y-6">
          {(data.technologies.length > 0 || ph) && (
            <BlockP title="Tecnologías" accent={accent} field="technologies">
              <ul className="text-[12px] space-y-0.5">
                {data.technologies.length > 0
                  ? data.technologies.map((t) => (
                      <li key={t.id} data-cv-field={`technologies.${t.id}`}>
                        · {t.name || <Ghost>Tecnología</Ghost>}
                      </li>
                    ))
                  : SAMPLE.techs.map((t) => (
                      <li key={t} className={GHOST}>
                        · {t}
                      </li>
                    ))}
              </ul>
            </BlockP>
          )}
          {(data.skills.length > 0 || ph) && (
            <BlockP title="Habilidades" accent={accent} field="skills">
              <ul className="text-[12px] space-y-0.5">
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
            </BlockP>
          )}
          {(data.languages.length > 0 || ph) && (
            <BlockP title="Idiomas" accent={accent} field="languages">
              <ul className="text-[12px] space-y-0.5">
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
            </BlockP>
          )}
          {(data.certifications.length > 0 || ph) && (
            <BlockP title="Certificaciones" accent={accent} field="certifications">
              <ul className="text-[12px] space-y-1">
                {data.certifications.length > 0 ? (
                  data.certifications.map((c) => (
                    <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                      <span className="font-semibold">
                        {c.name || <Ghost>Certificación</Ghost>}
                      </span>
                      <br />
                      <span className="text-neutral-600">{c.issuer || <Ghost>Emisor</Ghost>}</span>
                    </li>
                  ))
                ) : (
                  <li className={GHOST}>
                    <span className="font-semibold">Nombre de la certificación</span>
                    <br />
                    <span className="text-neutral-600">Emisor · 2024</span>
                  </li>
                )}
              </ul>
            </BlockP>
          )}
        </aside>
      </div>
    </div>
  );
}
function BlockP({
  title,
  children,
  accent,
  field,
}: {
  title: string;
  children: React.ReactNode;
  accent: string;
  field?: string;
}) {
  return (
    <section data-cv-field={field}>
      <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
        {title}
      </h2>
      <div className="border-t border-neutral-300 pt-2">{children}</div>
    </section>
  );
}

/* ----------------------- Modern (colored sidebar + cards) ----------------------- */
function ModernH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{children}</h2>
  );
}

export function ModernTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;

  const initials = (p.fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const contact = contactItems(p, ph, ALL_CONTACT);
  const showSkills = data.skills.length > 0 || ph;
  const showLanguages = data.languages.length > 0 || ph;

  return (
    <div
      className="bg-white text-neutral-900 grid grid-cols-[260px_1fr]"
      style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* ---------- Sidebar ---------- */}
      <aside style={{ backgroundColor: accent }} className="text-white p-8 space-y-6">
        <div data-cv-field="personal.photo" className="relative mx-auto h-24 w-24 rounded-full">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
            {p.photo ? (
              <img src={p.photo} alt="" className="h-full w-full object-cover" />
            ) : (
              initials || <UserRound className="h-10 w-10 opacity-60" />
            )}
          </div>
          {ph && !p.photo && (
            <span
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow"
              style={{ color: accent }}
            >
              <Camera className="h-3.5 w-3.5" />
            </span>
          )}
        </div>

        <div>
          <h2 className="text-[10px] uppercase tracking-widest opacity-70">Contacto</h2>
          <ul className="mt-2 space-y-1.5 text-[11px]">
            {contact.map(({ key, value, ghost }) => {
              const Icon = CONTACT_ICON[key];
              return (
                <li key={key} data-cv-field={`personal.${key}`} className="flex items-start gap-2">
                  <Icon className={`h-3 w-3 mt-0.5 shrink-0 ${value ? "" : "opacity-40"}`} />
                  {value ? <span className="break-all">{value}</span> : <Ghost>{ghost}</Ghost>}
                </li>
              );
            })}
          </ul>
        </div>

        {showSkills && (
          <div data-cv-field="skills">
            <h2 className="text-[10px] uppercase tracking-widest opacity-70">Habilidades</h2>
            <ul className="mt-2 space-y-2 text-[11px]">
              {data.skills.length > 0
                ? data.skills.map((s) => (
                    <li key={s.id} data-cv-field={`skills.${s.id}`}>
                      <div className="flex justify-between">
                        <span>{s.name || <Ghost>Habilidad</Ghost>}</span>
                      </div>
                      <div className="mt-1 h-1 w-full rounded bg-white/20">
                        <div
                          className="h-1 rounded bg-white"
                          style={{ width: `${(s.level / 5) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))
                : SAMPLE.skills.map((name, i) => (
                    <li key={name} className="opacity-40 select-none">
                      <span className="italic">{name}</span>
                      <div className="mt-1 h-1 w-full rounded bg-white/20">
                        <div
                          className="h-1 rounded bg-white"
                          style={{ width: `${[80, 65, 72][i]}%` }}
                        />
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        )}

        {showLanguages && (
          <div data-cv-field="languages">
            <h2 className="text-[10px] uppercase tracking-widest opacity-70">Idiomas</h2>
            <ul className="mt-2 space-y-1 text-[11px]">
              {data.languages.length > 0
                ? data.languages.map((l) => (
                    <li
                      key={l.id}
                      data-cv-field={`languages.${l.id}`}
                      className="flex justify-between"
                    >
                      <span>{l.name || <Ghost>Idioma</Ghost>}</span>
                      <span className="opacity-80">{l.level}</span>
                    </li>
                  ))
                : SAMPLE.languages.map(([name, level]) => (
                    <li key={name} className={`flex justify-between ${GHOST}`}>
                      <span>{name}</span>
                      <span>{level}</span>
                    </li>
                  ))}
            </ul>
          </div>
        )}
      </aside>

      {/* ---------- Contenido principal ---------- */}
      <main className="p-8 space-y-6">
        <header>
          <h1 data-cv-field="personal.fullName" className="text-3xl font-bold">
            <NameText value={p.fullName} ph={ph} />
          </h1>
          {(p.title || ph) && (
            <p
              data-cv-field="personal.title"
              className="text-sm font-medium"
              style={{ color: accent }}
            >
              {p.title || <Ghost>{SAMPLE.title}</Ghost>}
            </p>
          )}
        </header>

        {(p.summary || ph) && (
          <section data-cv-field="personal.summary">
            <ModernH2>Perfil</ModernH2>
            <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">
              {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
            </p>
          </section>
        )}

        {(data.experience.length > 0 || ph) && (
          <section data-cv-field="experience">
            <ModernH2>Experiencia</ModernH2>
            <div className="mt-2 space-y-4">
              {data.experience.length > 0 ? (
                data.experience.map((e) => (
                  <div
                    key={e.id}
                    data-cv-field={`experience.${e.id}`}
                    className="relative pl-4 border-l-2"
                    style={{ borderColor: accent }}
                  >
                    <div
                      className="absolute -left-[5px] top-1 h-2 w-2 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <div className="flex justify-between gap-4">
                      <h3 className="text-sm font-semibold">{e.role || <Ghost>Puesto</Ghost>}</h3>
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
                <div
                  className="relative pl-4 border-l-2 opacity-40 select-none"
                  style={{ borderColor: accent }}
                >
                  <div
                    className="absolute -left-[5px] top-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold italic">Tu puesto</h3>
                    <span className="text-[11px] text-neutral-500 italic">2022 – Presente</span>
                  </div>
                  <p className="text-[12px] text-neutral-600 italic">Empresa · Ciudad</p>
                  <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700 italic">
                    {SAMPLE.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {(data.education.length > 0 || ph) && (
          <section data-cv-field="education">
            <ModernH2>Educación</ModernH2>
            <div className="mt-2 space-y-2">
              {data.education.length > 0 ? (
                data.education.map((ed) => (
                  <div key={ed.id} data-cv-field={`education.${ed.id}`}>
                    <div className="flex justify-between gap-4">
                      <h3 className="text-sm font-semibold">
                        {ed.degree || <Ghost>Título / Carrera</Ghost>}
                      </h3>
                      <span className="shrink-0 text-[11px] text-neutral-500">
                        {dateRange(ed.startDate, ed.endDate)}
                      </span>
                    </div>
                    <p className="text-[12px] text-neutral-600">
                      {ed.institution || <Ghost>Institución</Ghost>}
                    </p>
                  </div>
                ))
              ) : (
                <div className={GHOST}>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold">Título / Carrera</h3>
                    <span className="text-[11px] text-neutral-500">2018 – 2022</span>
                  </div>
                  <p className="text-[12px] text-neutral-600">Universidad o institución</p>
                </div>
              )}
            </div>
          </section>
        )}

        {(data.technologies.length > 0 || ph) && (
          <section data-cv-field="technologies">
            <ModernH2>Tecnologías</ModernH2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {data.technologies.length > 0
                ? data.technologies.map((t) => (
                    <span
                      key={t.id}
                      data-cv-field={`technologies.${t.id}`}
                      className="rounded-full px-2.5 py-0.5 text-[11px]"
                      style={{ backgroundColor: `${accent}15`, color: accent }}
                    >
                      {t.name || <Ghost>Tecnología</Ghost>}
                    </span>
                  ))
                : SAMPLE.techs.map((name) => (
                    <span
                      key={name}
                      className={`rounded-full px-2.5 py-0.5 text-[11px] ${GHOST}`}
                      style={{ backgroundColor: `${accent}15`, color: accent }}
                    >
                      {name}
                    </span>
                  ))}
            </div>
          </section>
        )}

        {(data.certifications.length > 0 || ph) && (
          <section data-cv-field="certifications">
            <ModernH2>Certificaciones</ModernH2>
            {data.certifications.length > 0 ? (
              <ul className="mt-2 space-y-1 text-[12px]">
                {data.certifications.map((c) => (
                  <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                    <span className="font-semibold">{c.name || <Ghost>Certificación</Ghost>}</span>
                    {c.issuer ? (
                      <> — {c.issuer}</>
                    ) : (
                      <>
                        {" "}
                        — <Ghost>Emisor</Ghost>
                      </>
                    )}
                    {c.date && <span className="text-neutral-500"> ({formatDate(c.date)})</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`mt-2 text-[12px] ${GHOST}`}>
                <span className="font-semibold">Nombre de la certificación</span> — Emisor (2024)
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

/* ----------------------- Elegant (serif, gold accents) ----------------------- */
export function ElegantTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const sys = { fontFamily: "system-ui" };
  const contact = contactItems(p, ph, ["email", "phone", "location", "website"]);

  return (
    <div
      className="bg-[#fbf9f4] text-neutral-900"
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        fontFamily: "'Playfair Display', Georgia, serif",
        padding: "64px 72px",
      }}
    >
      <header className="text-center">
        <Photo
          src={p.photo}
          className="mx-auto mb-5 h-24 w-24 border-2"
          style={{ borderColor: accent }}
        />
        <h1 data-cv-field="personal.fullName" className="text-5xl font-normal tracking-wide">
          <NameText value={p.fullName} ph={ph} />
        </h1>
        <div className="mx-auto mt-2 h-px w-20" style={{ backgroundColor: accent }} />
        {(p.title || ph) && (
          <p
            data-cv-field="personal.title"
            className="mt-3 text-sm uppercase tracking-[0.3em] text-neutral-600"
          >
            {p.title || <Ghost>{SAMPLE.title}</Ghost>}
          </p>
        )}
        <div
          className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-neutral-600"
          style={sys}
        >
          {contact.map((c, i, a) => (
            <span key={c.key} data-cv-field={`personal.${c.key}`}>
              <ContactValue value={c.value} ghost={c.ghost} />
              {i < a.length - 1 ? " •" : ""}
            </span>
          ))}
        </div>
      </header>

      {(p.summary || ph) && (
        <section data-cv-field="personal.summary" className="mt-8 text-center">
          <p className="mx-auto max-w-xl text-[13px] italic leading-relaxed text-neutral-700">
            {p.summary ? `"${p.summary}"` : <Ghost>{SAMPLE.summary}</Ghost>}
          </p>
        </section>
      )}

      {show(data.experience) && (
        <ElegantSection title="Experiencia" accent={accent} field="experience">
          <div className="space-y-4">
            {data.experience.length > 0 ? (
              data.experience.map((e) => (
                <div key={e.id} data-cv-field={`experience.${e.id}`} className="text-center">
                  <h3 className="text-base">{e.role || <Ghost>Puesto</Ghost>}</h3>
                  <p className="text-[12px] text-neutral-600" style={sys}>
                    {e.company || <Ghost>Empresa</Ghost>}
                    {e.location ? ` · ${e.location}` : ""} ·{" "}
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </p>
                  {e.description ? (
                    <p className="mt-1 text-[12px] leading-relaxed text-neutral-700" style={sys}>
                      {e.description.replace(/\n/g, " · ")}
                    </p>
                  ) : (
                    ph && (
                      <p className={`mt-1 text-[12px] text-neutral-700 ${GHOST}`} style={sys}>
                        {SAMPLE.bulletHint}
                      </p>
                    )
                  )}
                </div>
              ))
            ) : (
              <div className={`text-center ${GHOST}`}>
                <h3 className="text-base">Tu puesto</h3>
                <p className="text-[12px] text-neutral-600" style={sys}>
                  Empresa · Ciudad · 2022 – Presente
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-neutral-700" style={sys}>
                  {SAMPLE.bullets.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </ElegantSection>
      )}

      {show(data.education) && (
        <ElegantSection title="Educación" accent={accent} field="education">
          <div className="space-y-3 text-center">
            {data.education.length > 0 ? (
              data.education.map((ed) => (
                <div key={ed.id} data-cv-field={`education.${ed.id}`}>
                  <h3 className="text-base">{ed.degree || <Ghost>Título / Carrera</Ghost>}</h3>
                  <p className="text-[12px] text-neutral-600" style={sys}>
                    {ed.institution || <Ghost>Institución</Ghost>} ·{" "}
                    {dateRange(ed.startDate, ed.endDate)}
                  </p>
                </div>
              ))
            ) : (
              <div className={GHOST}>
                <h3 className="text-base">Título / Carrera</h3>
                <p className="text-[12px] text-neutral-600" style={sys}>
                  Universidad o institución · 2018 – 2022
                </p>
              </div>
            )}
          </div>
        </ElegantSection>
      )}

      <div className="mt-8 grid grid-cols-2 gap-8" style={sys}>
        {show(data.technologies) && (
          <div data-cv-field="technologies" className="text-center">
            <h2
              className="mb-2 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: accent, fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Tecnologías
            </h2>
            <p className="text-[12px] text-neutral-700">
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
        {show(data.languages) && (
          <div data-cv-field="languages" className="text-center">
            <h2
              className="mb-2 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: accent, fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Idiomas
            </h2>
            <p className="text-[12px] text-neutral-700">
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
      </div>

      {show(data.certifications) && (
        <ElegantSection title="Certificaciones" accent={accent} field="certifications">
          <ul className="space-y-1 text-center text-[12px]" style={sys}>
            {data.certifications.length > 0 ? (
              data.certifications.map((c) => (
                <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                  {c.name || <Ghost>Certificación</Ghost>} — {c.issuer || <Ghost>Emisor</Ghost>}
                  {c.date && ` (${formatDate(c.date)})`}
                </li>
              ))
            ) : (
              <li className={GHOST}>
                {SAMPLE.cert.name} — {SAMPLE.cert.issuer} ({SAMPLE.cert.year})
              </li>
            )}
          </ul>
        </ElegantSection>
      )}
    </div>
  );
}
function ElegantSection({
  title,
  children,
  accent,
  field,
}: {
  title: string;
  children: React.ReactNode;
  accent: string;
  field?: string;
}) {
  return (
    <section className="mt-8" data-cv-field={field}>
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="h-px w-8" style={{ backgroundColor: accent }} />
        <h2 className="text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}>
          {title}
        </h2>
        <div className="h-px w-8" style={{ backgroundColor: accent }} />
      </div>
      {children}
    </section>
  );
}

/* ----------------------- Creative (bold, asymmetric) ----------------------- */
export function CreativeTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const accent = data.accent;
  const ph = placeholders;
  const show = (a: unknown[]) => a.length > 0 || ph;
  const contact = contactItems(p, ph);

  return (
    <div
      className="bg-white text-neutral-900 relative overflow-hidden"
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        className="absolute -top-20 -right-20 h-72 w-72 rounded-full"
        style={{ backgroundColor: accent, opacity: 0.15 }}
      />
      <div
        className="absolute top-40 -left-10 h-40 w-40 rounded-full"
        style={{ backgroundColor: accent, opacity: 0.08 }}
      />

      <header className="relative flex items-end justify-between gap-6 px-14 pt-14">
        <div className="min-w-0">
          <span
            className="text-[11px] font-mono uppercase tracking-widest"
            style={{ color: accent }}
          >
            // Currículum
          </span>
          <h1
            data-cv-field="personal.fullName"
            className="mt-2 text-6xl font-black leading-none tracking-tight"
          >
            <NameText value={p.fullName} ph={ph} />
          </h1>
          {(p.title || ph) && (
            <p
              data-cv-field="personal.title"
              className="mt-3 inline-block rounded-full px-4 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {p.title || <Ghost className="opacity-70">{SAMPLE.title}</Ghost>}
            </p>
          )}
        </div>
        <Photo src={p.photo} className="h-28 w-28 border-4 border-neutral-900" />
      </header>

      <div className="relative grid grid-cols-[1fr_240px] gap-8 px-14 py-10">
        <main className="space-y-6">
          {(p.summary || ph) && (
            <div
              data-cv-field="personal.summary"
              className="rounded-2xl border-2 border-neutral-900 p-5"
            >
              <p className="text-[13px] leading-relaxed">
                {p.summary || <Ghost>{SAMPLE.summary}</Ghost>}
              </p>
            </div>
          )}

          {show(data.experience) && (
            <section data-cv-field="experience">
              <h2 className="mb-3 text-2xl font-black">
                Experiencia<span style={{ color: accent }}>.</span>
              </h2>
              <div className="space-y-4">
                {data.experience.length > 0 ? (
                  data.experience.map((e, i) => (
                    <div key={e.id} data-cv-field={`experience.${e.id}`} className="flex gap-4">
                      <div className="shrink-0 text-3xl font-black text-neutral-200">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between gap-4">
                          <h3 className="text-sm font-bold">
                            {e.role || <Ghost>Puesto</Ghost>}{" "}
                            <span className="font-normal text-neutral-500">
                              @ {e.company || <Ghost>Empresa</Ghost>}
                            </span>
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
                    </div>
                  ))
                ) : (
                  <div className={`flex gap-4 ${GHOST}`}>
                    <div className="shrink-0 text-3xl font-black text-neutral-200 not-italic">
                      01
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-bold">
                          Tu puesto <span className="font-normal text-neutral-500">@ Empresa</span>
                        </h3>
                        <span className="text-[11px] text-neutral-500">2022 – Presente</span>
                      </div>
                      <ul className="mt-1 list-disc pl-4 text-[12px] leading-relaxed text-neutral-700">
                        {SAMPLE.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {show(data.education) && (
            <section data-cv-field="education">
              <h2 className="mb-2 text-2xl font-black">
                Educación<span style={{ color: accent }}>.</span>
              </h2>
              <div className="space-y-2">
                {data.education.length > 0 ? (
                  data.education.map((ed) => (
                    <div
                      key={ed.id}
                      data-cv-field={`education.${ed.id}`}
                      className="flex justify-between gap-4"
                    >
                      <div>
                        <h3 className="text-sm font-bold">
                          {ed.degree || <Ghost>Título / Carrera</Ghost>}
                        </h3>
                        <p className="text-[12px] text-neutral-600">
                          {ed.institution || <Ghost>Institución</Ghost>}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-neutral-500">
                        {dateRange(ed.startDate, ed.endDate)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className={`flex justify-between ${GHOST}`}>
                    <div>
                      <h3 className="text-sm font-bold">Título / Carrera</h3>
                      <p className="text-[12px] text-neutral-600">Universidad o institución</p>
                    </div>
                    <span className="text-[11px] text-neutral-500">2018 – 2022</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>

        <aside className="space-y-5">
          <div>
            <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Contacto</h3>
            <ul className="space-y-1 text-[11px] text-neutral-700">
              {contact.map((c) => (
                <li key={c.key} data-cv-field={`personal.${c.key}`} className="break-all">
                  <ContactValue value={c.value} ghost={c.ghost} />
                </li>
              ))}
            </ul>
          </div>

          {show(data.technologies) && (
            <div data-cv-field="technologies">
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Stack</h3>
              <div className="flex flex-wrap gap-1">
                {data.technologies.length > 0
                  ? data.technologies.map((t) => (
                      <span
                        key={t.id}
                        data-cv-field={`technologies.${t.id}`}
                        className="rounded-md border border-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold"
                      >
                        {t.name || <Ghost>Tecnología</Ghost>}
                      </span>
                    ))
                  : SAMPLE.techs.map((t) => (
                      <span
                        key={t}
                        className={`rounded-md border border-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold ${GHOST}`}
                      >
                        {t}
                      </span>
                    ))}
              </div>
            </div>
          )}

          {show(data.skills) && (
            <div data-cv-field="skills">
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Habilidades</h3>
              <ul className="space-y-1 text-[11px]">
                {data.skills.length > 0
                  ? data.skills.map((s) => (
                      <li key={s.id} data-cv-field={`skills.${s.id}`}>
                        {s.name || <Ghost>Habilidad</Ghost>}{" "}
                        <span style={{ color: accent }}>{"●".repeat(s.level)}</span>
                        <span className="text-neutral-300">{"●".repeat(5 - s.level)}</span>
                      </li>
                    ))
                  : SAMPLE.skills.map((s, i) => (
                      <li key={s} className={GHOST}>
                        {s} <span style={{ color: accent }}>{"●".repeat(4 - i)}</span>
                        <span className="text-neutral-300">{"●".repeat(1 + i)}</span>
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {show(data.languages) && (
            <div data-cv-field="languages">
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">Idiomas</h3>
              <ul className="space-y-1 text-[11px]">
                {data.languages.length > 0
                  ? data.languages.map((l) => (
                      <li key={l.id} data-cv-field={`languages.${l.id}`}>
                        <span className="font-bold">{l.name || <Ghost>Idioma</Ghost>}</span> —{" "}
                        {l.level}
                      </li>
                    ))
                  : SAMPLE.languages.map(([n, lv]) => (
                      <li key={n} className={GHOST}>
                        <span className="font-bold">{n}</span> — {lv}
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {show(data.certifications) && (
            <div data-cv-field="certifications">
              <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest">
                Certificaciones
              </h3>
              <ul className="space-y-1 text-[11px]">
                {data.certifications.length > 0 ? (
                  data.certifications.map((c) => (
                    <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                      {c.name || <Ghost>Certificación</Ghost>} —{" "}
                      <span className="text-neutral-600">{c.issuer || <Ghost>Emisor</Ghost>}</span>
                    </li>
                  ))
                ) : (
                  <li className={GHOST}>
                    {SAMPLE.cert.name} —{" "}
                    <span className="text-neutral-600">{SAMPLE.cert.issuer}</span>
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

/* ----------------------- ATS Friendly (plain, single column) ----------------------- */
// Sin foto a propósito: muchos sistemas de RRHH la ignoran o la penalizan.
export function ATSTemplate({ data, placeholders = true }: TplProps) {
  const p = data.personal;
  const ph = placeholders;
  const contact = contactItems(p, ph, ALL_CONTACT);

  return (
    <div
      className="bg-white text-black"
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "48px 64px",
      }}
    >
      <h1 data-cv-field="personal.fullName" className="text-2xl font-bold">
        <NameText value={p.fullName} ph={ph} fallback="Your Name" />
      </h1>
      {(p.title || ph) && (
        <p data-cv-field="personal.title" className="text-sm">
          {p.title || <Ghost>{SAMPLE.title}</Ghost>}
        </p>
      )}
      <p className="mt-1 text-[11px]">
        {contact.map((c, i) => (
          <Fragment key={c.key}>
            {i > 0 && " | "}
            <span data-cv-field={`personal.${c.key}`}>{c.value || <Ghost>{c.ghost}</Ghost>}</span>
          </Fragment>
        ))}
      </p>

      {(p.summary || ph) && (
        <AtsSection title="PROFESSIONAL SUMMARY" field="personal.summary">
          <p className="text-[12px] leading-snug">{p.summary || <Ghost>{SAMPLE.summary}</Ghost>}</p>
        </AtsSection>
      )}

      {(data.experience.length > 0 || ph) && (
        <AtsSection title="WORK EXPERIENCE" field="experience">
          {data.experience.length > 0 ? (
            data.experience.map((e) => (
              <div key={e.id} data-cv-field={`experience.${e.id}`} className="mb-3">
                <p className="text-[12px] font-bold">
                  {e.role || <Ghost>Puesto</Ghost>} — {e.company || <Ghost>Empresa</Ghost>}
                  {e.location ? `, ${e.location}` : ""}
                </p>
                <p className="text-[11px] italic">
                  {!e.startDate && !e.endDate && !e.current ? (
                    <Ghost>Inicio – Fin</Ghost>
                  ) : (
                    `${formatDate(e.startDate)} – ${e.current ? "Present" : formatDate(e.endDate)}`
                  )}
                </p>
                <Bullets
                  text={e.description}
                  ph={ph}
                  className="mt-1 list-disc pl-5 text-[12px] leading-snug"
                />
              </div>
            ))
          ) : (
            <div className={`mb-3 ${GHOST}`}>
              <p className="text-[12px] font-bold">Tu puesto — Empresa, Ciudad</p>
              <p className="text-[11px]">2022 – Present</p>
              <ul className="mt-1 list-disc pl-5 text-[12px] leading-snug">
                {SAMPLE.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </AtsSection>
      )}

      {(data.education.length > 0 || ph) && (
        <AtsSection title="EDUCATION" field="education">
          {data.education.length > 0 ? (
            data.education.map((ed) => (
              <div key={ed.id} data-cv-field={`education.${ed.id}`} className="mb-2">
                <p className="text-[12px] font-bold">
                  {ed.degree || <Ghost>Título / Carrera</Ghost>}
                  {ed.field ? `, ${ed.field}` : ""}
                </p>
                <p className="text-[12px]">
                  {ed.institution || <Ghost>Institución</Ghost>} —{" "}
                  {dateRange(ed.startDate, ed.endDate)}
                </p>
              </div>
            ))
          ) : (
            <div className={`mb-2 ${GHOST}`}>
              <p className="text-[12px] font-bold">Título / Carrera</p>
              <p className="text-[12px]">Universidad o institución — 2018 – 2022</p>
            </div>
          )}
        </AtsSection>
      )}

      {(data.technologies.length > 0 || ph) && (
        <AtsSection title="TECHNICAL SKILLS" field="technologies">
          <p className="text-[12px]">
            {data.technologies.length > 0 ? (
              data.technologies
                .map((t) => t.name)
                .filter(Boolean)
                .join(", ")
            ) : (
              <Ghost>{SAMPLE.techs.join(", ")}</Ghost>
            )}
          </p>
        </AtsSection>
      )}
      {(data.skills.length > 0 || ph) && (
        <AtsSection title="SKILLS" field="skills">
          <p className="text-[12px]">
            {data.skills.length > 0 ? (
              data.skills
                .map((s) => s.name)
                .filter(Boolean)
                .join(", ")
            ) : (
              <Ghost>{SAMPLE.skills.join(", ")}</Ghost>
            )}
          </p>
        </AtsSection>
      )}
      {(data.certifications.length > 0 || ph) && (
        <AtsSection title="CERTIFICATIONS" field="certifications">
          {data.certifications.length > 0 ? (
            <ul className="list-disc pl-5 text-[12px]">
              {data.certifications.map((c) => (
                <li key={c.id} data-cv-field={`certifications.${c.id}`}>
                  {c.name || <Ghost>Certificación</Ghost>} — {c.issuer || <Ghost>Emisor</Ghost>}
                  {c.date && ` (${formatDate(c.date)})`}
                </li>
              ))}
            </ul>
          ) : (
            <ul className={`list-disc pl-5 text-[12px] ${GHOST}`}>
              <li>Nombre de la certificación — Emisor (2024)</li>
            </ul>
          )}
        </AtsSection>
      )}
      {(data.languages.length > 0 || ph) && (
        <AtsSection title="LANGUAGES" field="languages">
          <p className="text-[12px]">
            {data.languages.length > 0 ? (
              data.languages.map((l) => `${l.name} (${l.level})`).join(", ")
            ) : (
              <Ghost>{SAMPLE.languages.map(([n, l]) => `${n} (${l})`).join(", ")}</Ghost>
            )}
          </p>
        </AtsSection>
      )}
    </div>
  );
}
function AtsSection({
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
      <h2 className="border-b border-black pb-0.5 text-[12px] font-bold">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
