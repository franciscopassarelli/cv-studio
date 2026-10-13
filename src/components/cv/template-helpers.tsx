// src/components/cv/template-helpers.tsx
// Helpers compartidos por las plantillas de vista previa (templates.tsx y templates-premium.tsx).
// Contenido "fantasma" para campos vacíos: solo se ve en pantalla, el PDF sale de pdf-templates.tsx.

import type { CVData } from "@/types/cv-types";
import { formatDate } from "@/types/cv-types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, type LucideIcon } from "lucide-react";

export type TplProps = {
  data: CVData;
  /** false = render "limpio", sin contenido fantasma */
  placeholders?: boolean;
};

export const GHOST = "opacity-40 italic select-none";

export function Ghost({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`${GHOST} ${className}`}>{children}</span>;
}

/** "Ene 2022 – Presente", o "Inicio – Fin" en fantasma si no hay fechas */
export function dateRange(
  start: string,
  end: string,
  current?: boolean,
  presentLabel = "Presente",
  sep = " – ",
): React.ReactNode {
  if (!start && !end && !current) return <Ghost>{`Inicio${sep}Fin`}</Ghost>;
  return `${formatDate(start)}${sep}${current ? presentLabel : formatDate(end)}`;
}

/** Nombre: si está vacío muestra el fallback atenuado (sin itálica, para no deformar el título) */
export function NameText({
  value,
  ph,
  fallback = "Tu Nombre",
}: {
  value: string;
  ph: boolean;
  fallback?: string;
}) {
  if (value) return <>{value}</>;
  return ph ? <span className="opacity-40 select-none">{fallback}</span> : <>{fallback}</>;
}

/** Descripción en viñetas; si está vacía muestra una viñeta guía */
export function Bullets({
  text,
  ph,
  className,
  prefix = "",
}: {
  text: string;
  ph: boolean;
  className: string;
  prefix?: string;
}) {
  if (text) {
    return (
      <ul className={className}>
        {text
          .split("\n")
          .filter(Boolean)
          .map((l, i) => (
            <li key={i}>
              {prefix}
              {l}
            </li>
          ))}
      </ul>
    );
  }
  if (!ph) return null;
  return (
    <ul className={`${className} ${GHOST}`}>
      <li>
        {prefix}
        {SAMPLE.bulletHint}
      </li>
    </ul>
  );
}

/**
 * Lista de nombres unida con un separador.
 * - Lista vacía -> los valores de ejemplo en fantasma.
 * - Ítems agregados pero sin nombre todavía -> la etiqueta en fantasma.
 */
export function JoinedOrGhost({
  values,
  sample,
  sep,
  ph,
  emptyLabel,
}: {
  values: string[];
  sample: string[];
  sep: string;
  ph: boolean;
  emptyLabel: string;
}) {
  if (values.length === 0) return ph ? <Ghost>{sample.join(sep)}</Ghost> : null;
  const filled = values.filter(Boolean);
  if (filled.length === 0) return ph ? <Ghost>{emptyLabel}</Ghost> : null;
  return <>{filled.join(sep)}</>;
}

export const SAMPLE = {
  title: "Tu puesto · ej. Desarrollador Frontend",
  summary:
    "Contá en 2 o 3 líneas quién sos, qué hacés y qué estás buscando. Es lo primero que lee un reclutador, así que vale la pena dedicarle un rato.",
  bullets: [
    'Un logro concreto, idealmente con números (ej. "reduje tiempos un 30%")',
    "Hacé click acá para agregar tu primera experiencia",
  ],
  bulletHint: "Un logro por línea, empezando con un verbo",
  techs: ["React", "TypeScript", "Node.js"],
  skills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas"],
  languages: [
    ["Español", "Nativo"],
    ["Inglés", "B2"],
  ] as [string, string][],
  cert: { name: "Nombre de la certificación", issuer: "Emisor", year: "2024" },
};

export type ContactKey = "email" | "phone" | "location" | "website" | "linkedin" | "github";

export const CONTACT_ICON: Record<ContactKey, LucideIcon> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  website: Globe,
  linkedin: Linkedin,
  github: Github,
};

// Solo los datos básicos se muestran como fantasma; los opcionales aparecen si tienen dato
const CONTACT_GHOST: Partial<Record<ContactKey, string>> = {
  email: "tu@email.com",
  phone: "+54 11 1234-5678",
  location: "Ciudad, País",
};

export const ALL_CONTACT: ContactKey[] = [
  "email",
  "phone",
  "location",
  "website",
  "linkedin",
  "github",
];

export function contactItems(p: CVData["personal"], ph: boolean, keys: ContactKey[] = ALL_CONTACT) {
  return keys
    .map((key) => ({ key, value: p[key] as string, ghost: CONTACT_GHOST[key] }))
    .filter((c) => c.value || (ph && c.ghost));
}

/** Valor de contacto o su fantasma */
export function ContactValue({ value, ghost }: { value: string; ghost?: string }) {
  return value ? <>{value}</> : <Ghost>{ghost}</Ghost>;
}

/** Foto redonda: solo se renderiza si el usuario la cargó */
export function Photo({
  src,
  className = "h-24 w-24",
  style,
}: {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!src) return null;
  return (
    <div
      data-cv-field="personal.photo"
      className={`shrink-0 overflow-hidden rounded-full ${className}`}
      style={style}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}
