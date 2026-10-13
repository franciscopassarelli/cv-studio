import { useEffect, useRef, useState } from "react";
import { useCV } from "@/context/cv-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Briefcase,
  GraduationCap,
  Cpu,
  Sparkles,
  Award,
  Languages,
  Plus,
  Trash2,
  Camera,
} from "lucide-react";
import { resizeImageToDataURL } from "@/lib/image";
import { nanoid } from "nanoid";
import type {
  Experience,
  Education,
  TechItem,
  Skill,
  Certification,
  Language,
} from "@/types/cv-types";
import { CV_FOCUS_EVENT, type CVFocusDetail } from "@/lib/cv-focus";

type ListKey =
  "experience" | "education" | "technologies" | "skills" | "certifications" | "languages";

const LIST_KEYS: ListKey[] = [
  "experience",
  "education",
  "technologies",
  "skills",
  "certifications",
  "languages",
];

// Ítems vacíos en un solo lugar (los usan los botones "Añadir" y el click desde la preview)
const EMPTY_ITEM: Record<ListKey, () => { id: string }> = {
  experience: () =>
    ({
      id: nanoid(6),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }) as Experience,
  education: () =>
    ({
      id: nanoid(6),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    }) as Education,
  technologies: () => ({ id: nanoid(6), name: "" }) as TechItem,
  skills: () => ({ id: nanoid(6), name: "", level: 3 }) as Skill,
  certifications: () => ({ id: nanoid(6), name: "", issuer: "", date: "" }) as Certification,
  languages: () => ({ id: nanoid(6), name: "", level: "B2" }) as Language,
};

const FLASH_CLASSES = ["ring-2", "ring-orange-500/70", "transition-shadow"];

function flash(el: HTMLElement) {
  el.classList.add(...FLASH_CLASSES);
  window.setTimeout(() => el.classList.remove(...FLASH_CLASSES), 1200);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">{children}</div>;
}

function PhotoField({ photo, onChange }: { photo?: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("El archivo tiene que ser una imagen.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La imagen pesa más de 10 MB.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      onChange(await resizeImageToDataURL(file));
    } catch {
      setError("No se pudo procesar la imagen. Probá con otra.");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = ""; // permite volver a elegir el mismo archivo
    }
  };

  return (
    <div data-form-field="personal.photo" className="mb-4 flex items-center gap-4 rounded-lg">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-border bg-muted/40 transition-colors hover:border-orange-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        aria-label={photo ? "Cambiar foto de perfil" : "Subir foto de perfil"}
      >
        {photo ? (
          <img src={photo} alt="Foto de perfil" className="h-full w-full object-cover" />
        ) : (
          <Camera className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <div className="space-y-1">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
          >
            {loading ? "Procesando..." : photo ? "Cambiar foto" : "Subir foto"}
          </Button>
          {photo && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => onChange("")}
            >
              <Trash2 className="h-3.5 w-3.5" /> Quitar
            </Button>
          )}
        </div>
        <p className={`text-[11px] ${error ? "text-destructive" : "text-muted-foreground"}`}>
          {error ?? "JPG o PNG. Se recorta en cuadrado automáticamente."}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

interface CVFormProps {
  disabled?: boolean;
}

export function CVForm({ disabled = false }: CVFormProps) {
  const { data, setData } = useCV();

  // Accordion controlado: así la preview puede abrir una sección cerrada
  const [openSections, setOpenSections] = useState<string[]>(["personal", "experience"]);

  // Refs con el último estado, para leerlos dentro del listener sin re-suscribirse
  const dataRef = useRef(data);
  dataRef.current = data;
  const openRef = useRef(openSections);
  openRef.current = openSections;

  const updatePersonal = (k: keyof typeof data.personal, v: string) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [k]: v } }));

  /** Agrega un ítem vacío a la lista y devuelve su id */
  const addEmpty = (key: ListKey) => {
    const item = EMPTY_ITEM[key]();
    setData((d) => ({ ...d, [key]: [...(d[key] as unknown[]), item] }) as typeof d);
    return item.id;
  };

  const updateItem = <K extends ListKey>(
    key: K,
    id: string,
    patch: Partial<(typeof data)[K][number]>,
  ) =>
    setData(
      (d) =>
        ({
          ...d,
          [key]: (d[key] as { id: string }[]).map((it) =>
            it.id === id ? { ...it, ...patch } : it,
          ),
        }) as typeof d,
    );

  const removeItem = (key: ListKey, id: string) =>
    setData(
      (d) =>
        ({
          ...d,
          [key]: (d[key] as { id: string }[]).filter((it) => it.id !== id),
        }) as typeof d,
    );

  // Click en la vista previa -> abrir sección, scroll y foco al campo
  useEffect(() => {
    if (disabled) return;

    const onFocusRequest = (e: Event) => {
      const { section } = (e as CustomEvent<CVFocusDetail>).detail;
      let { key } = (e as CustomEvent<CVFocusDetail>).detail;

      // Click en una sección de lista vacía -> creamos el primer ítem
      if (!key && LIST_KEYS.includes(section as ListKey)) {
        const list = dataRef.current[section as ListKey] as unknown[];
        if (list.length === 0) key = addEmpty(section as ListKey);
      }

      const wasOpen = openRef.current.includes(section);
      if (!wasOpen) setOpenSections((prev) => [...prev, section]);

      // Esperamos la animación del accordion (y el render del ítem nuevo)
      window.setTimeout(
        () => {
          const selector = key
            ? `[data-form-field="${section}.${key}"]`
            : `[data-form-section="${section}"]`;
          const target = document.querySelector<HTMLElement>(selector);
          if (!target) return;

          target.scrollIntoView({ behavior: "smooth", block: "center" });

          // Foto: abrimos el selector de archivos directamente. El click en la
          // preview cuenta como gesto del usuario, así que el navegador lo permite.
          if (section === "personal" && key === "photo") {
            target.querySelector<HTMLInputElement>('input[type="file"]')?.click();
            flash(target);
            return;
          }

          const input = target.matches("input, textarea")
            ? target
            : target.querySelector<HTMLElement>("input, textarea");
          input?.focus({ preventScroll: true });

          flash(key ? target : (input ?? target));
        },
        wasOpen ? 50 : 260,
      );
    };

    window.addEventListener(CV_FOCUS_EVENT, onFocusRequest);
    return () => window.removeEventListener(CV_FOCUS_EVENT, onFocusRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return (
    <>
      {disabled && (
        <div className="mb-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
          <h3 className="font-semibold text-orange-400">Modo vista previa</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Iniciá sesión para editar, guardar y descargar tu currículum.
          </p>
        </div>
      )}

      <div className={disabled ? "pointer-events-none opacity-60" : ""}>
        <Accordion
          type="multiple"
          value={openSections}
          onValueChange={setOpenSections}
          className="space-y-3"
        >
          {/* Personal */}
          <AccordionItem value="personal" data-form-section="personal" className="border-none">
            <SectionCard>
              <AccordionTrigger className="py-1 hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4" /> Datos personales
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <PhotoField
                  photo={data.personal.photo}
                  onChange={(v) => updatePersonal("photo", v)}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Nombre completo">
                    <Input
                      data-form-field="personal.fullName"
                      value={data.personal.fullName}
                      onChange={(e) => updatePersonal("fullName", e.target.value)}
                    />
                  </Field>
                  <Field label="Titular / Puesto">
                    <Input
                      data-form-field="personal.title"
                      value={data.personal.title}
                      onChange={(e) => updatePersonal("title", e.target.value)}
                    />
                  </Field>
                  <Field label="Email">
                    <Input
                      data-form-field="personal.email"
                      type="email"
                      value={data.personal.email}
                      onChange={(e) => updatePersonal("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Teléfono">
                    <Input
                      data-form-field="personal.phone"
                      value={data.personal.phone}
                      onChange={(e) => updatePersonal("phone", e.target.value)}
                    />
                  </Field>
                  <Field label="Ubicación">
                    <Input
                      data-form-field="personal.location"
                      value={data.personal.location}
                      onChange={(e) => updatePersonal("location", e.target.value)}
                    />
                  </Field>
                  <Field label="Sitio web">
                    <Input
                      data-form-field="personal.website"
                      value={data.personal.website}
                      onChange={(e) => updatePersonal("website", e.target.value)}
                    />
                  </Field>
                  <Field label="LinkedIn">
                    <Input
                      data-form-field="personal.linkedin"
                      value={data.personal.linkedin}
                      onChange={(e) => updatePersonal("linkedin", e.target.value)}
                    />
                  </Field>
                  <Field label="GitHub">
                    <Input
                      data-form-field="personal.github"
                      value={data.personal.github}
                      onChange={(e) => updatePersonal("github", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="mt-3">
                  <Field label="Perfil profesional">
                    <Textarea
                      data-form-field="personal.summary"
                      rows={4}
                      value={data.personal.summary}
                      onChange={(e) => updatePersonal("summary", e.target.value)}
                      placeholder="Describe brevemente tu experiencia, fortalezas y objetivos..."
                    />
                  </Field>
                </div>
              </AccordionContent>
            </SectionCard>
          </AccordionItem>

          {/* Experience */}
          <AccordionItem value="experience" data-form-section="experience" className="border-none">
            <SectionCard>
              <AccordionTrigger className="py-1 hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="h-4 w-4" /> Experiencia laboral
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    data-form-field={`experience.${exp.id}`}
                    className="rounded-lg border border-border/60 p-3 space-y-3"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Empresa">
                        <Input
                          value={exp.company}
                          onChange={(e) =>
                            updateItem("experience", exp.id, { company: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Puesto">
                        <Input
                          value={exp.role}
                          onChange={(e) =>
                            updateItem("experience", exp.id, { role: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Ubicación">
                        <Input
                          value={exp.location}
                          onChange={(e) =>
                            updateItem("experience", exp.id, { location: e.target.value })
                          }
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="Inicio">
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateItem("experience", exp.id, { startDate: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Fin">
                          <Input
                            type="month"
                            disabled={exp.current}
                            value={exp.endDate}
                            onChange={(e) =>
                              updateItem("experience", exp.id, { endDate: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-xs">
                      <Checkbox
                        checked={exp.current}
                        onCheckedChange={(v) =>
                          updateItem("experience", exp.id, {
                            current: Boolean(v),
                            endDate: v ? "" : exp.endDate,
                          })
                        }
                      />
                      Actualmente trabajo aquí
                    </label>
                    <Field label="Descripción">
                      <Textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) =>
                          updateItem("experience", exp.id, { description: e.target.value })
                        }
                        placeholder="Una línea por logro / responsabilidad"
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => removeItem("experience", exp.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Eliminar
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addEmpty("experience")}
                >
                  <Plus className="h-4 w-4" /> Añadir experiencia
                </Button>
              </AccordionContent>
            </SectionCard>
          </AccordionItem>

          {/* Education */}
          <AccordionItem value="education" data-form-section="education" className="border-none">
            <SectionCard>
              <AccordionTrigger className="py-1 hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="h-4 w-4" /> Educación
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                {data.education.map((ed) => (
                  <div
                    key={ed.id}
                    data-form-field={`education.${ed.id}`}
                    className="rounded-lg border border-border/60 p-3 space-y-3"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Institución">
                        <Input
                          value={ed.institution}
                          onChange={(e) =>
                            updateItem("education", ed.id, { institution: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Título">
                        <Input
                          value={ed.degree}
                          onChange={(e) =>
                            updateItem("education", ed.id, { degree: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Campo de estudio">
                        <Input
                          value={ed.field}
                          onChange={(e) =>
                            updateItem("education", ed.id, { field: e.target.value })
                          }
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="Inicio">
                          <Input
                            type="month"
                            value={ed.startDate}
                            onChange={(e) =>
                              updateItem("education", ed.id, { startDate: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Fin">
                          <Input
                            type="month"
                            value={ed.endDate}
                            onChange={(e) =>
                              updateItem("education", ed.id, { endDate: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                    </div>
                    <Field label="Descripción">
                      <Textarea
                        rows={2}
                        value={ed.description}
                        onChange={(e) =>
                          updateItem("education", ed.id, { description: e.target.value })
                        }
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => removeItem("education", ed.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Eliminar
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addEmpty("education")}
                >
                  <Plus className="h-4 w-4" /> Añadir educación
                </Button>
              </AccordionContent>
            </SectionCard>
          </AccordionItem>

          {/* Technologies */}
          <AccordionItem
            value="technologies"
            data-form-section="technologies"
            className="border-none"
          >
            <SectionCard>
              <AccordionTrigger className="py-1 hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Cpu className="h-4 w-4" /> Tecnologías
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {data.technologies.map((t) => (
                    <div
                      key={t.id}
                      data-form-field={`technologies.${t.id}`}
                      className="flex items-center gap-1 rounded-full border border-border bg-muted/40 pl-3 pr-1 py-1"
                    >
                      <input
                        className="w-24 bg-transparent text-xs outline-none"
                        value={t.name}
                        onChange={(e) => updateItem("technologies", t.id, { name: e.target.value })}
                      />
                      <button
                        type="button"
                        className="rounded-full p-1 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem("technologies", t.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addEmpty("technologies")}
                >
                  <Plus className="h-4 w-4" /> Añadir tecnología
                </Button>
              </AccordionContent>
            </SectionCard>
          </AccordionItem>

          {/* Skills */}
          <AccordionItem value="skills" data-form-section="skills" className="border-none">
            <SectionCard>
              <AccordionTrigger className="py-1 hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4" /> Habilidades
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                {data.skills.map((s) => (
                  <div
                    key={s.id}
                    data-form-field={`skills.${s.id}`}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md"
                  >
                    <Input
                      value={s.name}
                      onChange={(e) => updateItem("skills", s.id, { name: e.target.value })}
                    />
                    <Select
                      value={String(s.level)}
                      onValueChange={(v) => updateItem("skills", s.id, { level: Number(v) })}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            Nivel {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem("skills", s.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addEmpty("skills")}
                >
                  <Plus className="h-4 w-4" /> Añadir habilidad
                </Button>
              </AccordionContent>
            </SectionCard>
          </AccordionItem>

          {/* Certifications */}
          <AccordionItem
            value="certifications"
            data-form-section="certifications"
            className="border-none"
          >
            <SectionCard>
              <AccordionTrigger className="py-1 hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Award className="h-4 w-4" /> Certificaciones
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                {data.certifications.map((c) => (
                  <div
                    key={c.id}
                    data-form-field={`certifications.${c.id}`}
                    className="grid grid-cols-1 gap-2 rounded-lg border border-border/60 p-3 sm:grid-cols-[1fr_1fr_auto_auto]"
                  >
                    <Input
                      placeholder="Nombre"
                      value={c.name}
                      onChange={(e) => updateItem("certifications", c.id, { name: e.target.value })}
                    />
                    <Input
                      placeholder="Emisor"
                      value={c.issuer}
                      onChange={(e) =>
                        updateItem("certifications", c.id, { issuer: e.target.value })
                      }
                    />
                    <Input
                      type="month"
                      value={c.date}
                      onChange={(e) => updateItem("certifications", c.id, { date: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem("certifications", c.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addEmpty("certifications")}
                >
                  <Plus className="h-4 w-4" /> Añadir certificación
                </Button>
              </AccordionContent>
            </SectionCard>
          </AccordionItem>

          {/* Languages */}
          <AccordionItem value="languages" data-form-section="languages" className="border-none">
            <SectionCard>
              <AccordionTrigger className="py-1 hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Languages className="h-4 w-4" /> Idiomas
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                {data.languages.map((l) => (
                  <div
                    key={l.id}
                    data-form-field={`languages.${l.id}`}
                    className="grid grid-cols-[1fr_auto_auto] gap-2 rounded-md"
                  >
                    <Input
                      placeholder="Idioma"
                      value={l.name}
                      onChange={(e) => updateItem("languages", l.id, { name: e.target.value })}
                    />
                    <Select
                      value={l.level}
                      onValueChange={(v) => updateItem("languages", l.id, { level: v })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Nativo", "C2", "C1", "B2", "B1", "A2", "A1"].map((lv) => (
                          <SelectItem key={lv} value={lv}>
                            {lv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem("languages", l.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addEmpty("languages")}
                >
                  <Plus className="h-4 w-4" /> Añadir idioma
                </Button>
              </AccordionContent>
            </SectionCard>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
