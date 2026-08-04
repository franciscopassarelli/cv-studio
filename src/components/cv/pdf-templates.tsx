import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CVData, TemplateId } from "@/types/cv-types";
import { formatDate } from "@/types/cv-types";
import {
  ExecutivePDF, TechiePDF, AcademicPDF, EditorialPDF, GradientPDF, CompactPDF,
} from "./pdf-templates-premium";

const base = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#111" },
  h1: { fontSize: 22, fontFamily: "Helvetica-Bold" },
  h2: { fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 },
  small: { fontSize: 9, color: "#555" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  section: { marginTop: 12 },
  bullet: { flexDirection: "row", marginTop: 2 },
});

function bulletsFrom(text: string) {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function Bullets({ text }: { text: string }) {
  return (
    <View style={{ marginTop: 3 }}>
      {bulletsFrom(text).map((l, i) => (
        <View key={i} style={base.bullet}>
          <Text style={{ width: 8 }}>•</Text>
          <Text style={{ flex: 1, lineHeight: 1.4 }}>{l}</Text>
        </View>
      ))}
    </View>
  );
}

/* ------- Minimalist ------- */
function MinimalistPDF({ data }: { data: CVData }) {
  const p = data.personal;
  return (
    <Document>
      <Page size="A4" style={[base.page, { padding: 48 }]}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 14 }}>
          <Text style={base.h1}>{p.fullName || "Tu Nombre"}</Text>
          {!!p.title && <Text style={{ fontSize: 11, color: "#555", fontStyle: "italic", marginTop: 2 }}>{p.title}</Text>}
          <Text style={[base.small, { marginTop: 8 }]}>
            {[p.email, p.phone, p.location, p.website].filter(Boolean).join(" · ")}
          </Text>
        </View>
        {!!p.summary && <SectionBlock title="Perfil"><Text style={{ lineHeight: 1.5 }}>{p.summary}</Text></SectionBlock>}
        {data.experience.length > 0 && (
          <SectionBlock title="Experiencia">
            {data.experience.map((e) => (
              <View key={e.id} style={{ marginBottom: 8 }}>
                <View style={base.row}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{e.role}</Text>
                  <Text style={base.small}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
                </View>
                <Text style={base.small}>{e.company}{e.location ? ` · ${e.location}` : ""}</Text>
                {!!e.description && <Bullets text={e.description} />}
              </View>
            ))}
          </SectionBlock>
        )}
        {data.education.length > 0 && (
          <SectionBlock title="Educación">
            {data.education.map((ed) => (
              <View key={ed.id} style={[base.row, { marginBottom: 4 }]}>
                <View>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{ed.degree}</Text>
                  <Text style={base.small}>{ed.institution}{ed.field ? ` · ${ed.field}` : ""}</Text>
                </View>
                <Text style={base.small}>{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text>
              </View>
            ))}
          </SectionBlock>
        )}
        {(data.technologies.length > 0 || data.skills.length > 0) && (
          <SectionBlock title="Habilidades">
            <Text>{[...data.technologies.map((t) => t.name), ...data.skills.map((s) => s.name)].join(" · ")}</Text>
          </SectionBlock>
        )}
        {data.languages.length > 0 && (
          <SectionBlock title="Idiomas">
            <Text>{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</Text>
          </SectionBlock>
        )}
        {data.certifications.length > 0 && (
          <SectionBlock title="Certificaciones">
            {data.certifications.map((c) => (
              <Text key={c.id}>• {c.name} — {c.issuer} ({formatDate(c.date)})</Text>
            ))}
          </SectionBlock>
        )}
      </Page>
    </Document>
  );
}
function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={base.section}>
      <Text style={[base.h2, { color: "#666", marginBottom: 4 }]}>{title}</Text>
      {children}
    </View>
  );
}

/* ------- Professional ------- */
function ProfessionalPDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <Document>
      <Page size="A4" style={[base.page, { fontFamily: "Times-Roman" }]}>
        <View style={{ padding: 40, borderBottomWidth: 3, borderBottomColor: accent }}>
          <Text style={{ fontSize: 22, fontFamily: "Times-Bold", textTransform: "uppercase" }}>{p.fullName || "Tu Nombre"}</Text>
          {!!p.title && <Text style={{ fontSize: 12, color: accent, marginTop: 2 }}>{p.title}</Text>}
          <Text style={{ fontSize: 9, color: "#444", marginTop: 8 }}>
            {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join("  |  ")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", padding: 32, gap: 24 }}>
          <View style={{ flex: 2 }}>
            {!!p.summary && <ProBlock title="Perfil profesional" accent={accent}><Text style={{ lineHeight: 1.5 }}>{p.summary}</Text></ProBlock>}
            {data.experience.length > 0 && (
              <ProBlock title="Experiencia laboral" accent={accent}>
                {data.experience.map((e) => (
                  <View key={e.id} style={{ marginBottom: 8 }}>
                    <View style={base.row}>
                      <Text style={{ fontFamily: "Times-Bold" }}>{e.role}</Text>
                      <Text style={base.small}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
                    </View>
                    <Text style={{ fontStyle: "italic", fontSize: 10 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</Text>
                    {!!e.description && <Bullets text={e.description} />}
                  </View>
                ))}
              </ProBlock>
            )}
            {data.education.length > 0 && (
              <ProBlock title="Educación" accent={accent}>
                {data.education.map((ed) => (
                  <View key={ed.id} style={{ marginBottom: 6 }}>
                    <View style={base.row}>
                      <Text style={{ fontFamily: "Times-Bold" }}>{ed.degree}</Text>
                      <Text style={base.small}>{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text>
                    </View>
                    <Text style={{ fontStyle: "italic" }}>{ed.institution}</Text>
                  </View>
                ))}
              </ProBlock>
            )}
          </View>
          <View style={{ flex: 1 }}>
            {data.technologies.length > 0 && <ProBlock title="Tecnologías" accent={accent}>{data.technologies.map((t) => <Text key={t.id}>· {t.name}</Text>)}</ProBlock>}
            {data.skills.length > 0 && <ProBlock title="Habilidades" accent={accent}>{data.skills.map((s) => <Text key={s.id}>· {s.name}</Text>)}</ProBlock>}
            {data.languages.length > 0 && <ProBlock title="Idiomas" accent={accent}>{data.languages.map((l) => <Text key={l.id}>{l.name} — {l.level}</Text>)}</ProBlock>}
            {data.certifications.length > 0 && <ProBlock title="Certificaciones" accent={accent}>{data.certifications.map((c) => <View key={c.id} style={{ marginBottom: 3 }}><Text style={{ fontFamily: "Times-Bold" }}>{c.name}</Text><Text style={base.small}>{c.issuer}</Text></View>)}</ProBlock>}
          </View>
        </View>
      </Page>
    </Document>
  );
}
function ProBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 10, color: accent, fontFamily: "Times-Bold", textTransform: "uppercase", letterSpacing: 1 }}>{title}</Text>
      <View style={{ borderTopWidth: 1, borderTopColor: "#ccc", marginTop: 3, paddingTop: 4 }}>{children}</View>
    </View>
  );
}

/* ------- Modern ------- */
function ModernPDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  const initials = (p.fullName || "?").split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <Document>
      <Page size="A4" style={[base.page, { flexDirection: "row" }]}>
        <View style={{ width: 180, backgroundColor: accent, color: "white", padding: 24 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
            <Text style={{ color: "white", fontFamily: "Helvetica-Bold", fontSize: 18 }}>{initials}</Text>
          </View>
          <SideBlock title="Contacto">
            {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).map((v, i) => (
              <Text key={i} style={{ color: "white", fontSize: 8, marginTop: 2 }}>{v}</Text>
            ))}
          </SideBlock>
          {data.skills.length > 0 && (
            <SideBlock title="Habilidades">
              {data.skills.map((s) => (
                <View key={s.id} style={{ marginTop: 4 }}>
                  <Text style={{ color: "white", fontSize: 9 }}>{s.name}</Text>
                  <View style={{ height: 3, backgroundColor: "rgba(255,255,255,0.25)", marginTop: 2 }}>
                    <View style={{ height: 3, width: `${(s.level / 5) * 100}%`, backgroundColor: "white" }} />
                  </View>
                </View>
              ))}
            </SideBlock>
          )}
          {data.languages.length > 0 && (
            <SideBlock title="Idiomas">
              {data.languages.map((l) => (
                <View key={l.id} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                  <Text style={{ color: "white", fontSize: 9 }}>{l.name}</Text>
                  <Text style={{ color: "white", fontSize: 9, opacity: 0.8 }}>{l.level}</Text>
                </View>
              ))}
            </SideBlock>
          )}
        </View>
        <View style={{ flex: 1, padding: 28 }}>
          <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold" }}>{p.fullName || "Tu Nombre"}</Text>
          {!!p.title && <Text style={{ color: accent, fontFamily: "Helvetica-Bold", fontSize: 11, marginTop: 2 }}>{p.title}</Text>}
          {!!p.summary && (
            <View style={{ marginTop: 12 }}>
              <Text style={[base.h2, { color: "#666" }]}>Perfil</Text>
              <Text style={{ marginTop: 4, lineHeight: 1.5 }}>{p.summary}</Text>
            </View>
          )}
          {data.experience.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={[base.h2, { color: "#666" }]}>Experiencia</Text>
              {data.experience.map((e) => (
                <View key={e.id} style={{ marginTop: 6, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: accent }}>
                  <View style={base.row}>
                    <Text style={{ fontFamily: "Helvetica-Bold" }}>{e.role}</Text>
                    <Text style={base.small}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
                  </View>
                  <Text style={base.small}>{e.company}{e.location ? ` · ${e.location}` : ""}</Text>
                  {!!e.description && <Bullets text={e.description} />}
                </View>
              ))}
            </View>
          )}
          {data.education.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={[base.h2, { color: "#666" }]}>Educación</Text>
              {data.education.map((ed) => (
                <View key={ed.id} style={{ marginTop: 4 }}>
                  <View style={base.row}>
                    <Text style={{ fontFamily: "Helvetica-Bold" }}>{ed.degree}</Text>
                    <Text style={base.small}>{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text>
                  </View>
                  <Text style={base.small}>{ed.institution}</Text>
                </View>
              ))}
            </View>
          )}
          {data.technologies.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={[base.h2, { color: "#666" }]}>Tecnologías</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
                {data.technologies.map((t) => (
                  <Text key={t.id} style={{ fontSize: 9, color: accent, backgroundColor: `${accent}22`, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginRight: 4, marginBottom: 4 }}>{t.name}</Text>
                ))}
              </View>
            </View>
          )}
          {data.certifications.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={[base.h2, { color: "#666" }]}>Certificaciones</Text>
              {data.certifications.map((c) => (
                <Text key={c.id} style={{ marginTop: 2 }}><Text style={{ fontFamily: "Helvetica-Bold" }}>{c.name}</Text> — {c.issuer} ({formatDate(c.date)})</Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
function SideBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 14 }}>
      <Text style={{ color: "white", opacity: 0.75, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 }}>{title}</Text>
      <View style={{ marginTop: 4 }}>{children}</View>
    </View>
  );
}

/* ------- Elegant ------- */
function ElegantPDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <Document>
      <Page size="A4" style={[base.page, { padding: 48, backgroundColor: "#fbf9f4", fontFamily: "Times-Roman" }]}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 26, fontFamily: "Times-Roman" }}>{p.fullName || "Tu Nombre"}</Text>
          <View style={{ height: 1, width: 60, backgroundColor: accent, marginTop: 6 }} />
          {!!p.title && <Text style={{ fontSize: 10, letterSpacing: 3, color: "#666", marginTop: 8, textTransform: "uppercase" }}>{p.title}</Text>}
          <Text style={{ fontSize: 9, color: "#666", marginTop: 6, fontFamily: "Helvetica" }}>
            {[p.email, p.phone, p.location, p.website].filter(Boolean).join(" • ")}
          </Text>
        </View>
        {!!p.summary && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontStyle: "italic", fontSize: 11, textAlign: "center", lineHeight: 1.5, maxWidth: 400 }}>"{p.summary}"</Text>
          </View>
        )}
        {data.experience.length > 0 && <ElegantBlock title="Experiencia" accent={accent}>
          {data.experience.map((e) => (
            <View key={e.id} style={{ alignItems: "center", marginBottom: 8 }}>
              <Text style={{ fontSize: 12 }}>{e.role}</Text>
              <Text style={{ fontSize: 9, color: "#666", fontFamily: "Helvetica" }}>{e.company}{e.location ? ` · ${e.location}` : ""} · {formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
              {!!e.description && <Text style={{ fontSize: 10, marginTop: 3, textAlign: "center", fontFamily: "Helvetica", lineHeight: 1.4 }}>{e.description.replace(/\n/g, " · ")}</Text>}
            </View>
          ))}
        </ElegantBlock>}
        {data.education.length > 0 && <ElegantBlock title="Educación" accent={accent}>
          {data.education.map((ed) => (
            <View key={ed.id} style={{ alignItems: "center", marginBottom: 4 }}>
              <Text style={{ fontSize: 12 }}>{ed.degree}</Text>
              <Text style={{ fontSize: 9, color: "#666", fontFamily: "Helvetica" }}>{ed.institution} · {formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text>
            </View>
          ))}
        </ElegantBlock>}
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          {data.technologies.length > 0 && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 9, letterSpacing: 3, color: accent, textTransform: "uppercase" }}>Tecnologías</Text>
              <Text style={{ fontSize: 10, marginTop: 4, fontFamily: "Helvetica", textAlign: "center" }}>{data.technologies.map((t) => t.name).join(" · ")}</Text>
            </View>
          )}
          {data.languages.length > 0 && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 9, letterSpacing: 3, color: accent, textTransform: "uppercase" }}>Idiomas</Text>
              <Text style={{ fontSize: 10, marginTop: 4, fontFamily: "Helvetica", textAlign: "center" }}>{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</Text>
            </View>
          )}
        </View>
        {data.certifications.length > 0 && <ElegantBlock title="Certificaciones" accent={accent}>
          {data.certifications.map((c) => (
            <Text key={c.id} style={{ fontSize: 10, fontFamily: "Helvetica", textAlign: "center", marginBottom: 2 }}>{c.name} — {c.issuer} ({formatDate(c.date)})</Text>
          ))}
        </ElegantBlock>}
      </Page>
    </Document>
  );
}
function ElegantBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        <View style={{ height: 1, width: 30, backgroundColor: accent }} />
        <Text style={{ fontSize: 9, letterSpacing: 3, color: accent, marginHorizontal: 8, textTransform: "uppercase" }}>{title}</Text>
        <View style={{ height: 1, width: 30, backgroundColor: accent }} />
      </View>
      {children}
    </View>
  );
}

/* ------- Creative ------- */
function CreativePDF({ data }: { data: CVData }) {
  const p = data.personal;
  const accent = data.accent;
  return (
    <Document>
      <Page size="A4" style={[base.page]}>
        <View style={{ padding: 36 }}>
          <Text style={{ fontSize: 9, color: accent, fontFamily: "Courier-Bold", letterSpacing: 2 }}>// CURRICULUM</Text>
          <Text style={{ fontSize: 36, fontFamily: "Helvetica-Bold", marginTop: 4 }}>{p.fullName || "Tu Nombre"}</Text>
          {!!p.title && (
            <View style={{ backgroundColor: accent, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, marginTop: 6 }}>
              <Text style={{ color: "white", fontFamily: "Helvetica-Bold", fontSize: 9 }}>{p.title}</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 36, paddingBottom: 32, gap: 20 }}>
          <View style={{ flex: 2 }}>
            {!!p.summary && (
              <View style={{ borderWidth: 1.5, borderColor: "#111", borderRadius: 10, padding: 12 }}>
                <Text style={{ lineHeight: 1.5 }}>{p.summary}</Text>
              </View>
            )}
            {data.experience.length > 0 && (
              <View style={{ marginTop: 14 }}>
                <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold" }}>Experiencia<Text style={{ color: accent }}>.</Text></Text>
                {data.experience.map((e, i) => (
                  <View key={e.id} style={{ flexDirection: "row", marginTop: 6, gap: 8 }}>
                    <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: "#e5e5e5" }}>{String(i + 1).padStart(2, "0")}</Text>
                    <View style={{ flex: 1 }}>
                      <View style={base.row}>
                        <Text style={{ fontFamily: "Helvetica-Bold" }}>{e.role} <Text style={{ fontFamily: "Helvetica", color: "#666" }}>@ {e.company}</Text></Text>
                        <Text style={base.small}>{formatDate(e.startDate)} – {e.current ? "Presente" : formatDate(e.endDate)}</Text>
                      </View>
                      {!!e.description && <Bullets text={e.description} />}
                    </View>
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View style={{ marginTop: 14 }}>
                <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold" }}>Educación<Text style={{ color: accent }}>.</Text></Text>
                {data.education.map((ed) => (
                  <View key={ed.id} style={[base.row, { marginTop: 4 }]}>
                    <View>
                      <Text style={{ fontFamily: "Helvetica-Bold" }}>{ed.degree}</Text>
                      <Text style={base.small}>{ed.institution}</Text>
                    </View>
                    <Text style={base.small}>{formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <CreativeBlock title="Contacto">
              {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).map((v, i) => (
                <Text key={i} style={{ fontSize: 9, marginTop: 1 }}>{v}</Text>
              ))}
            </CreativeBlock>
            {data.technologies.length > 0 && (
              <CreativeBlock title="Stack">
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 2 }}>
                  {data.technologies.map((t) => (
                    <Text key={t.id} style={{ fontSize: 8, borderWidth: 1, borderColor: "#111", paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3, marginRight: 3, marginBottom: 3, fontFamily: "Helvetica-Bold" }}>{t.name}</Text>
                  ))}
                </View>
              </CreativeBlock>
            )}
            {data.skills.length > 0 && (
              <CreativeBlock title="Habilidades">
                {data.skills.map((s) => (
                  <Text key={s.id} style={{ fontSize: 9, marginTop: 2 }}>{s.name} <Text style={{ color: accent }}>{"●".repeat(s.level)}</Text><Text style={{ color: "#ddd" }}>{"●".repeat(5 - s.level)}</Text></Text>
                ))}
              </CreativeBlock>
            )}
            {data.languages.length > 0 && (
              <CreativeBlock title="Idiomas">
                {data.languages.map((l) => (
                  <Text key={l.id} style={{ fontSize: 9, marginTop: 1 }}><Text style={{ fontFamily: "Helvetica-Bold" }}>{l.name}</Text> — {l.level}</Text>
                ))}
              </CreativeBlock>
            )}
            {data.certifications.length > 0 && (
              <CreativeBlock title="Certificaciones">
                {data.certifications.map((c) => (
                  <Text key={c.id} style={{ fontSize: 9, marginTop: 1 }}>{c.name} — <Text style={{ color: "#666" }}>{c.issuer}</Text></Text>
                ))}
              </CreativeBlock>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
function CreativeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 2 }}>{title}</Text>
      <View style={{ marginTop: 3 }}>{children}</View>
    </View>
  );
}

/* ------- ATS ------- */
function ATSPDF({ data }: { data: CVData }) {
  const p = data.personal;
  return (
    <Document>
      <Page size="A4" style={[base.page, { padding: 40, fontFamily: "Helvetica" }]}>
        <Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold" }}>{p.fullName || "Your Name"}</Text>
        {!!p.title && <Text>{p.title}</Text>}
        <Text style={{ fontSize: 9, marginTop: 3 }}>
          {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join(" | ")}
        </Text>
        {!!p.summary && <AtsBlock title="PROFESSIONAL SUMMARY"><Text style={{ lineHeight: 1.4 }}>{p.summary}</Text></AtsBlock>}
        {data.experience.length > 0 && (
          <AtsBlock title="WORK EXPERIENCE">
            {data.experience.map((e) => (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>{e.role} — {e.company}{e.location ? `, ${e.location}` : ""}</Text>
                <Text style={{ fontStyle: "italic", fontSize: 9 }}>{formatDate(e.startDate)} – {e.current ? "Present" : formatDate(e.endDate)}</Text>
                {!!e.description && <Bullets text={e.description} />}
              </View>
            ))}
          </AtsBlock>
        )}
        {data.education.length > 0 && (
          <AtsBlock title="EDUCATION">
            {data.education.map((ed) => (
              <View key={ed.id} style={{ marginBottom: 4 }}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}</Text>
                <Text>{ed.institution} — {formatDate(ed.startDate)} – {formatDate(ed.endDate)}</Text>
              </View>
            ))}
          </AtsBlock>
        )}
        {data.technologies.length > 0 && <AtsBlock title="TECHNICAL SKILLS"><Text>{data.technologies.map((t) => t.name).join(", ")}</Text></AtsBlock>}
        {data.skills.length > 0 && <AtsBlock title="SKILLS"><Text>{data.skills.map((s) => s.name).join(", ")}</Text></AtsBlock>}
        {data.certifications.length > 0 && (
          <AtsBlock title="CERTIFICATIONS">
            {data.certifications.map((c) => <Text key={c.id}>• {c.name} — {c.issuer} ({formatDate(c.date)})</Text>)}
          </AtsBlock>
        )}
        {data.languages.length > 0 && <AtsBlock title="LANGUAGES"><Text>{data.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</Text></AtsBlock>}
      </Page>
    </Document>
  );
}
function AtsBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10, borderBottomWidth: 1, borderBottomColor: "#000", paddingBottom: 1 }}>{title}</Text>
      <View style={{ marginTop: 4 }}>{children}</View>
    </View>
  );
}

export function renderPDFDocument(template: TemplateId, data: CVData) {
  switch (template) {
    case "minimalist": return <MinimalistPDF data={data} />;
    case "professional": return <ProfessionalPDF data={data} />;
    case "modern": return <ModernPDF data={data} />;
    case "elegant": return <ElegantPDF data={data} />;
    case "creative": return <CreativePDF data={data} />;
    case "ats": return <ATSPDF data={data} />;
    case "executive": return <ExecutivePDF data={data} />;
    case "techie": return <TechiePDF data={data} />;
    case "academic": return <AcademicPDF data={data} />;
    case "editorial": return <EditorialPDF data={data} />;
    case "gradient": return <GradientPDF data={data} />;
    case "compact": return <CompactPDF data={data} />;
  }
}
