import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CVData } from "@/types/cv-types";
import { formatDate } from "@/types/cv-types";

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#111" },
  h2: { fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 },
  small: { fontSize: 9, color: "#555" },
  row: { flexDirection: "row", justifyContent: "space-between" },
});

function bulletsFrom(t: string) {
  return t.split("\n").map((l) => l.trim()).filter(Boolean);
}
function Bullets({ text, color = "#111" }: { text: string; color?: string }) {
  return (
    <View style={{ marginTop: 3 }}>
      {bulletsFrom(text).map((l, i) => (
        <View key={i} style={{ flexDirection: "row", marginTop: 1 }}>
          <Text style={{ width: 8, color }}>•</Text>
          <Text style={{ flex: 1, lineHeight: 1.4, color }}>{l}</Text>
        </View>
      ))}
    </View>
  );
}

/* ------- Executive ------- */
export function ExecutivePDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <Document>
      <Page size="A4" style={[s.page, { fontFamily: "Times-Roman" }]}>
        <View style={{ backgroundColor: "#111", padding: 32 }}>
          <Text style={{ color: "white", fontSize: 22, fontFamily: "Times-Bold" }}>{p.fullName || "Tu Nombre"}</Text>
          {!!p.title && <Text style={{ color: accent, fontSize: 10, marginTop: 3, letterSpacing: 2, textTransform: "uppercase" }}>{p.title}</Text>}
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 9, marginTop: 8 }}>
            {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join("  ·  ")}
          </Text>
        </View>
        <View style={{ padding: 32 }}>
          {!!p.summary && <ExBlock title="Resumen ejecutivo" accent={accent}><Text style={{ lineHeight: 1.5 }}>{p.summary}</Text></ExBlock>}
          {data.experience.length > 0 && (
            <ExBlock title="Experiencia" accent={accent}>
              {data.experience.map((e) => (
                <View key={e.id} style={{ marginBottom: 6 }}>
                  <View style={s.row}>
                    <Text style={{ fontFamily: "Times-Bold" }}>{e.role} · <Text style={{ fontFamily: "Times-Roman" }}>{e.company}</Text></Text>
                    <Text style={s.small}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
                  </View>
                  {!!e.description && <Bullets text={e.description} />}
                </View>
              ))}
            </ExBlock>
          )}
          {data.education.length > 0 && (
            <ExBlock title="Educación" accent={accent}>
              {data.education.map((ed) => (
                <View key={ed.id} style={s.row}><Text><Text style={{ fontFamily: "Times-Bold" }}>{ed.degree}</Text> — {ed.institution}</Text><Text style={s.small}>{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text></View>
              ))}
            </ExBlock>
          )}
          {data.technologies.length > 0 && <ExBlock title="Tecnologías" accent={accent}><Text>{data.technologies.map((t) => t.name).join(" · ")}</Text></ExBlock>}
          {data.languages.length > 0 && <ExBlock title="Idiomas" accent={accent}><Text>{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</Text></ExBlock>}
          {data.certifications.length > 0 && <ExBlock title="Certificaciones" accent={accent}>{data.certifications.map((c) => <Text key={c.id}>• {c.name} — {c.issuer} ({formatDate(c.date)})</Text>)}</ExBlock>}
        </View>
      </Page>
    </Document>
  );
}
function ExBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: accent, fontSize: 10, fontFamily: "Times-Bold", textTransform: "uppercase", letterSpacing: 1 }}>{title}</Text>
      <View style={{ borderTopWidth: 1, borderTopColor: "#ccc", marginTop: 3, paddingTop: 4 }}>{children}</View>
    </View>
  );
}

/* ------- Techie ------- */
export function TechiePDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  const c = "#e5e7eb";
  return (
    <Document>
      <Page size="A4" style={[s.page, { backgroundColor: "#0b0f17", color: c, fontFamily: "Courier", padding: 40 }]}>
        <Text style={{ fontSize: 9, color: "#6b7280" }}>~/cv/{(p.fullName || "user").toLowerCase().replace(/\s+/g, "-")}.md</Text>
        <Text style={{ fontSize: 9, color: "#6b7280", marginTop: 8 }}><Text style={{ color: accent }}>$</Text> whoami</Text>
        <Text style={{ fontSize: 20, fontFamily: "Courier-Bold", color: c, marginTop: 2 }}>{p.fullName || "Tu Nombre"}</Text>
        {!!p.title && <Text style={{ fontSize: 10, color: accent }}># {p.title}</Text>}
        <View style={{ marginTop: 8 }}>
          {[["email", p.email], ["phone", p.phone], ["location", p.location], ["web", p.website], ["git", p.github], ["linkedin", p.linkedin]].filter(([, v]) => v).map(([k, v], i) => (
            <Text key={i} style={{ fontSize: 9, color: "#9ca3af" }}><Text style={{ color: accent }}>{k}</Text>: {v}</Text>
          ))}
        </View>
        {!!p.summary && <TechBlock title="README.md" accent={accent}><Text style={{ lineHeight: 1.5, color: "#d1d5db" }}>{p.summary}</Text></TechBlock>}
        {data.experience.length > 0 && (
          <TechBlock title="experience/" accent={accent}>
            {data.experience.map((e) => (
              <View key={e.id} style={{ marginBottom: 4 }}>
                <Text style={{ color: c }}><Text style={{ color: accent }}>▸ </Text><Text style={{ fontFamily: "Courier-Bold" }}>{e.role}</Text> @ {e.company} <Text style={{ color: "#6b7280" }}>[{formatDate(e.startDate)} – {e.current ? "now" : formatDate(e.endDate)}]</Text></Text>
                {!!e.description && <Bullets text={e.description} color="#9ca3af" />}
              </View>
            ))}
          </TechBlock>
        )}
        {data.technologies.length > 0 && (
          <TechBlock title="stack.json" accent={accent}>
            <Text style={{ color: accent, fontSize: 9 }}>[ {data.technologies.map((t) => `"${t.name}"`).join(", ")} ]</Text>
          </TechBlock>
        )}
        {data.education.length > 0 && (
          <TechBlock title="education/" accent={accent}>
            {data.education.map((ed) => (
              <Text key={ed.id} style={{ color: c }}><Text style={{ color: accent }}>▸ </Text>{ed.degree} — {ed.institution} <Text style={{ color: "#6b7280" }}>[{formatDate(ed.startDate)} – {formatDate(ed.endDate)}]</Text></Text>
            ))}
          </TechBlock>
        )}
        {(data.skills.length > 0 || data.languages.length > 0 || data.certifications.length > 0) && (
          <TechBlock title="extras/" accent={accent}>
            {data.skills.length > 0 && <Text style={{ color: "#d1d5db" }}><Text style={{ color: accent }}>skills</Text>: {data.skills.map((x) => x.name).join(", ")}</Text>}
            {data.languages.length > 0 && <Text style={{ color: "#d1d5db" }}><Text style={{ color: accent }}>langs</Text>: {data.languages.map((l) => `${l.name}(${l.level})`).join(", ")}</Text>}
            {data.certifications.length > 0 && <Text style={{ color: "#d1d5db" }}><Text style={{ color: accent }}>certs</Text>: {data.certifications.map((c2) => `${c2.name} · ${c2.issuer}`).join(" | ")}</Text>}
          </TechBlock>
        )}
      </Page>
    </Document>
  );
}
function TechBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ fontSize: 10, color: "#6b7280" }}># <Text style={{ color: accent }}>{title}</Text></Text>
      <View style={{ marginTop: 3 }}>{children}</View>
    </View>
  );
}

/* ------- Academic ------- */
export function AcademicPDF({ data }: { data: CVData }) {
  const p = data.personal;
  return (
    <Document>
      <Page size="A4" style={[s.page, { fontFamily: "Times-Roman", padding: 48 }]}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>{p.fullName || "Tu Nombre"}</Text>
          {!!p.title && <Text style={{ fontSize: 10, fontStyle: "italic", marginTop: 2 }}>{p.title}</Text>}
          <Text style={{ fontSize: 9, marginTop: 4 }}>{[p.email, p.phone, p.location, p.website].filter(Boolean).join(" · ")}</Text>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: "#666", marginTop: 12 }} />
        {!!p.summary && <AcBlock title="Perfil"><Text style={{ lineHeight: 1.5, textAlign: "justify" }}>{p.summary}</Text></AcBlock>}
        {data.experience.length > 0 && (
          <AcBlock title="Experiencia profesional">
            {data.experience.map((e) => (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <Text><Text style={{ fontFamily: "Times-Bold" }}>{e.role}</Text>, {e.company}{e.location ? `, ${e.location}` : ""} <Text style={{ fontStyle: "italic" }}>({formatDate(e.startDate)} – {e.current ? "Actualidad" : formatDate(e.endDate)})</Text></Text>
                {!!e.description && <Bullets text={e.description} />}
              </View>
            ))}
          </AcBlock>
        )}
        {data.education.length > 0 && (
          <AcBlock title="Formación académica">
            {data.education.map((ed) => (
              <Text key={ed.id}><Text style={{ fontFamily: "Times-Bold" }}>{ed.degree}</Text>{ed.field ? `, ${ed.field}` : ""} — {ed.institution} <Text style={{ fontStyle: "italic" }}>({formatDate(ed.startDate)} – {formatDate(ed.endDate)})</Text></Text>
            ))}
          </AcBlock>
        )}
        {data.certifications.length > 0 && (
          <AcBlock title="Publicaciones y certificaciones">
            {data.certifications.map((c) => <Text key={c.id}>• {c.name}. {c.issuer}, {formatDate(c.date)}.</Text>)}
          </AcBlock>
        )}
        {(data.technologies.length > 0 || data.skills.length > 0) && (
          <AcBlock title="Áreas de especialización">
            <Text>{[...data.technologies.map((t) => t.name), ...data.skills.map((x) => x.name)].join("; ")}.</Text>
          </AcBlock>
        )}
        {data.languages.length > 0 && <AcBlock title="Idiomas"><Text>{data.languages.map((l) => `${l.name} (${l.level})`).join("; ")}.</Text></AcBlock>}
      </Page>
    </Document>
  );
}
function AcBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: "Times-Bold", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{title}</Text>
      <View style={{ marginTop: 3 }}>{children}</View>
    </View>
  );
}

/* ------- Editorial ------- */
export function EditorialPDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={{ flexDirection: "row", minHeight: "100%" }}>
          <View style={{ width: 190, backgroundColor: accent, color: "white", padding: 24 }}>
            <Text style={{ color: "white", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", opacity: 0.85 }}>Perfil</Text>
            <Text style={{ color: "white", fontSize: 22, fontFamily: "Times-Bold", marginTop: 8 }}>{p.fullName || "Tu Nombre"}</Text>
            {!!p.title && <Text style={{ color: "white", fontSize: 10, fontStyle: "italic", marginTop: 4, opacity: 0.9 }}>{p.title}</Text>}
            <View style={{ marginTop: 16 }}>
              {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).map((v, i) => (
                <Text key={i} style={{ color: "white", fontSize: 8, marginTop: 2, opacity: 0.9 }}>{v}</Text>
              ))}
            </View>
            {data.skills.length > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text style={{ color: "white", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85 }}>Habilidades</Text>
                {data.skills.map((sk) => <Text key={sk.id} style={{ color: "white", fontSize: 9, marginTop: 2 }}>· {sk.name}</Text>)}
              </View>
            )}
            {data.languages.length > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text style={{ color: "white", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85 }}>Idiomas</Text>
                {data.languages.map((l) => <Text key={l.id} style={{ color: "white", fontSize: 9, marginTop: 2 }}>{l.name} — {l.level}</Text>)}
              </View>
            )}
          </View>
          <View style={{ flex: 1, padding: 28 }}>
            {!!p.summary && (
              <View>
                <Text style={{ fontSize: 24, color: accent, fontFamily: "Times-Bold" }}>“</Text>
                <Text style={{ fontStyle: "italic", fontSize: 11, lineHeight: 1.5, marginTop: -6 }}>{p.summary}</Text>
              </View>
            )}
            {data.experience.length > 0 && (
              <View style={{ marginTop: 14 }}>
                <Text style={{ fontSize: 16, fontFamily: "Times-Bold" }}>Trayectoria</Text>
                {data.experience.map((e) => (
                  <View key={e.id} style={{ marginTop: 6 }}>
                    <Text style={{ fontSize: 8, color: accent, letterSpacing: 2, textTransform: "uppercase" }}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
                    <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11, marginTop: 1 }}>{e.role} <Text style={{ fontFamily: "Helvetica", color: "#666" }}>· {e.company}</Text></Text>
                    {!!e.description && <Text style={{ fontSize: 10, marginTop: 2, lineHeight: 1.4, color: "#444" }}>{e.description.replace(/\n/g, " ")}</Text>}
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View style={{ marginTop: 14 }}>
                <Text style={{ fontSize: 16, fontFamily: "Times-Bold" }}>Formación</Text>
                {data.education.map((ed) => (
                  <Text key={ed.id} style={{ fontSize: 10, marginTop: 2 }}><Text style={{ fontFamily: "Helvetica-Bold" }}>{ed.degree}</Text> — {ed.institution} <Text style={{ color: "#666" }}>({formatDate(ed.startDate)} – {formatDate(ed.endDate)})</Text></Text>
                ))}
              </View>
            )}
            {data.technologies.length > 0 && (
              <View style={{ marginTop: 14 }}>
                <Text style={{ fontSize: 16, fontFamily: "Times-Bold" }}>Stack</Text>
                <Text style={{ fontSize: 10, marginTop: 2 }}>{data.technologies.map((t) => t.name).join(" · ")}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

/* ------- Gradient ------- */
export function GradientPDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={{ backgroundColor: accent, padding: 36 }}>
          <Text style={{ color: "white", fontSize: 26, fontFamily: "Helvetica-Bold" }}>{p.fullName || "Tu Nombre"}</Text>
          {!!p.title && <Text style={{ color: "white", fontSize: 12, marginTop: 3, opacity: 0.95 }}>{p.title}</Text>}
          <Text style={{ color: "white", fontSize: 9, marginTop: 8, opacity: 0.9 }}>{[p.email, p.phone, p.location, p.website].filter(Boolean).join(" · ")}</Text>
        </View>
        <View style={{ flexDirection: "row", padding: 28, gap: 18 }}>
          <View style={{ flex: 2 }}>
            {!!p.summary && (
              <View style={{ backgroundColor: `${accent}15`, padding: 10, borderRadius: 6 }}>
                <Text style={{ lineHeight: 1.5, fontSize: 10 }}>{p.summary}</Text>
              </View>
            )}
            {data.experience.length > 0 && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: accent, fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Experiencia</Text>
                {data.experience.map((e) => (
                  <View key={e.id} style={{ marginTop: 6, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 6, padding: 8 }}>
                    <View style={s.row}>
                      <Text style={{ fontFamily: "Helvetica-Bold" }}>{e.role}</Text>
                      <Text style={s.small}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
                    </View>
                    <Text style={s.small}>{e.company}{e.location ? ` · ${e.location}` : ""}</Text>
                    {!!e.description && <Bullets text={e.description} />}
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: accent, fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Educación</Text>
                {data.education.map((ed) => (
                  <View key={ed.id} style={[s.row, { marginTop: 3 }]}><Text><Text style={{ fontFamily: "Helvetica-Bold" }}>{ed.degree}</Text> · {ed.institution}</Text><Text style={s.small}>{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text></View>
                ))}
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            {data.technologies.length > 0 && (
              <View>
                <Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Stack</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 3 }}>
                  {data.technologies.map((t) => (
                    <Text key={t.id} style={{ fontSize: 8, color: "white", backgroundColor: accent, paddingHorizontal: 5, paddingVertical: 1, borderRadius: 8, marginRight: 3, marginBottom: 3 }}>{t.name}</Text>
                  ))}
                </View>
              </View>
            )}
            {data.skills.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Habilidades</Text>
                {data.skills.map((sk) => (
                  <View key={sk.id} style={{ marginTop: 3 }}>
                    <Text style={{ fontSize: 9 }}>{sk.name}</Text>
                    <View style={{ height: 3, backgroundColor: "#e5e7eb", marginTop: 2 }}>
                      <View style={{ height: 3, width: `${(sk.level / 5) * 100}%`, backgroundColor: accent }} />
                    </View>
                  </View>
                ))}
              </View>
            )}
            {data.languages.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Idiomas</Text>
                {data.languages.map((l) => <Text key={l.id} style={{ fontSize: 9, marginTop: 1 }}>{l.name} — {l.level}</Text>)}
              </View>
            )}
            {data.certifications.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Certificaciones</Text>
                {data.certifications.map((c) => <Text key={c.id} style={{ fontSize: 9, marginTop: 2 }}><Text style={{ fontFamily: "Helvetica-Bold" }}>{c.name}</Text> — {c.issuer}</Text>)}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

/* ------- Compact ------- */
export function CompactPDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <Document>
      <Page size="A4" style={[s.page, { padding: 32, fontSize: 9 }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottomWidth: 2, borderBottomColor: accent, paddingBottom: 4 }}>
          <View>
            <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold" }}>{p.fullName || "Tu Nombre"}</Text>
            {!!p.title && <Text style={{ fontSize: 10, color: accent, marginTop: 2 }}>{p.title}</Text>}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            {[p.email, p.phone, p.location, p.website].filter(Boolean).map((v, i) => <Text key={i} style={{ fontSize: 8, color: "#555" }}>{v}</Text>)}
          </View>
        </View>
        {!!p.summary && <Text style={{ marginTop: 6, lineHeight: 1.4 }}>{p.summary}</Text>}
        <View style={{ flexDirection: "row", marginTop: 8, gap: 14 }}>
          <View style={{ flex: 2 }}>
            {data.experience.length > 0 && (
              <View>
                <Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Experiencia</Text>
                {data.experience.map((e) => (
                  <View key={e.id} style={{ marginTop: 4 }}>
                    <View style={s.row}>
                      <Text><Text style={{ fontFamily: "Helvetica-Bold" }}>{e.role}</Text> · {e.company}</Text>
                      <Text style={{ fontSize: 8, color: "#555" }}>{formatDate(e.startDate)}–{e.current ? "Hoy" : formatDate(e.endDate)}</Text>
                    </View>
                    {!!e.description && <Bullets text={e.description} />}
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Educación</Text>
                {data.education.map((ed) => (
                  <View key={ed.id} style={[s.row, { marginTop: 2 }]}><Text><Text style={{ fontFamily: "Helvetica-Bold" }}>{ed.degree}</Text> · {ed.institution}</Text><Text style={{ fontSize: 8, color: "#555" }}>{formatDate(ed.startDate)}–{formatDate(ed.endDate)}</Text></View>
                ))}
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            {data.technologies.length > 0 && <View><Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Stack</Text><Text style={{ marginTop: 2 }}>{data.technologies.map((t) => t.name).join(" · ")}</Text></View>}
            {data.skills.length > 0 && <View style={{ marginTop: 6 }}><Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Habilidades</Text><Text style={{ marginTop: 2 }}>{data.skills.map((x) => x.name).join(" · ")}</Text></View>}
            {data.languages.length > 0 && <View style={{ marginTop: 6 }}><Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Idiomas</Text><Text style={{ marginTop: 2 }}>{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</Text></View>}
            {data.certifications.length > 0 && <View style={{ marginTop: 6 }}><Text style={{ color: accent, fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 }}>Certificaciones</Text>{data.certifications.map((c) => <Text key={c.id} style={{ marginTop: 1 }}>{c.name} — {c.issuer}</Text>)}</View>}
          </View>
        </View>
      </Page>
    </Document>
  );
}
