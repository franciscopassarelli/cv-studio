export type TemplateId =
  | "minimalist"
  | "professional"
  | "modern"
  | "ats"
  | "elegant"
  | "creative"
  | "executive"
  | "techie"
  | "academic"
  | "editorial"
  | "gradient"
  | "compact";

export type TemplateTier = "free" | "premium";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  tier: TemplateTier;
}

export const TEMPLATE_CATALOG: TemplateMeta[] = [
  // Free (4)
  { id: "minimalist", name: "Minimalista", description: "Serif · Elegante y limpio", tier: "free" },
  { id: "professional", name: "Profesional", description: "Clásico · Dos columnas", tier: "free" },
  { id: "modern", name: "Moderna", description: "Sidebar de color", tier: "free" },
  { id: "ats", name: "ATS Friendly", description: "Optimizado para ATS", tier: "free" },
  // Premium (8)
  { id: "elegant", name: "Elegante", description: "Editorial · Centrado", tier: "premium" },
  { id: "creative", name: "Creativa", description: "Bold · Asimétrica", tier: "premium" },
  { id: "executive", name: "Ejecutiva", description: "Header oscuro · Serio", tier: "premium" },
  { id: "techie", name: "Techie", description: "Monoespaciada · Dev", tier: "premium" },
  { id: "academic", name: "Académica", description: "Sobria · Publicable", tier: "premium" },
  { id: "editorial", name: "Editorial", description: "Revista · Tipográfica", tier: "premium" },
  { id: "gradient", name: "Gradient", description: "Vibrante · Con gradiente", tier: "premium" },
  { id: "compact", name: "Compacta", description: "Densa · Una página", tier: "premium" },
];

export function isPremiumTemplate(id: TemplateId): boolean {
  return TEMPLATE_CATALOG.find((t) => t.id === id)?.tier === "premium";
}

export interface Personal {
  photo: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface TechItem {
  id: string;
  name: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CVData {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  technologies: TechItem[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  accent: string;
}

export const emptyCV: CVData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    photo: "",
  },
  experience: [],
  education: [],
  technologies: [],
  skills: [],
  certifications: [],
  languages: [],
  accent: "#2563eb",
};

export const sampleCV: CVData = {
  personal: {
    fullName: "Ana Martínez",
    title: "Full-Stack Developer",
    email: "ana.martinez@email.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    website: "anamartinez.dev",
    linkedin: "linkedin.com/in/anamartinez",
    github: "github.com/anamartinez",
    summary:
      "Desarrolladora full-stack con 6+ años de experiencia diseñando y construyendo aplicaciones web modernas con React, Node.js y bases de datos escalables. Apasionada por el diseño de producto, la performance y la experiencia de usuario.",
    photo: "",
  },
  experience: [
    {
      id: "e1",
      company: "Nova Labs",
      role: "Senior Full-Stack Engineer",
      location: "Madrid",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description:
        "Lidero el desarrollo del producto principal (React, TypeScript, Node.js).\nDiseñé la migración a arquitectura de microservicios reduciendo latencia un 40%.\nMentor de 4 desarrolladores junior.",
    },
    {
      id: "e2",
      company: "Beta Studio",
      role: "Full-Stack Developer",
      location: "Barcelona",
      startDate: "2020-03",
      endDate: "2022-12",
      current: false,
      description:
        "Desarrollo de plataforma SaaS multi-tenant con Next.js y PostgreSQL.\nImplementación de sistema de pagos con Stripe.\nAutomatización de CI/CD con GitHub Actions.",
    },
  ],
  education: [
    {
      id: "ed1",
      institution: "Universidad Politécnica de Madrid",
      degree: "Grado en Ingeniería Informática",
      field: "Software Engineering",
      startDate: "2015-09",
      endDate: "2019-06",
      description: "Especialización en desarrollo web y sistemas distribuidos.",
    },
  ],
  technologies: [
    { id: "t1", name: "React" },
    { id: "t2", name: "TypeScript" },
    { id: "t3", name: "Node.js" },
    { id: "t4", name: "PostgreSQL" },
    { id: "t5", name: "AWS" },
    { id: "t6", name: "Docker" },
    { id: "t7", name: "GraphQL" },
    { id: "t8", name: "Next.js" },
  ],
  skills: [
    { id: "s1", name: "Arquitectura de software", level: 5 },
    { id: "s2", name: "Liderazgo técnico", level: 4 },
    { id: "s3", name: "Diseño de producto", level: 4 },
    { id: "s4", name: "Comunicación", level: 5 },
  ],
  certifications: [
    { id: "c1", name: "AWS Solutions Architect Associate", issuer: "Amazon", date: "2023-05" },
  ],
  languages: [
    { id: "l1", name: "Español", level: "Nativo" },
    { id: "l2", name: "Inglés", level: "C1" },
    { id: "l3", name: "Francés", level: "B1" },
  ],
  accent: "#2563eb",
};

export function formatDate(d: string): string {
  if (!d) return "";
  const [y, m] = d.split("-");
  if (!y) return d;
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const mi = parseInt(m ?? "0", 10) - 1;
  if (m && mi >= 0 && mi < 12) return `${months[mi]} ${y}`;
  return y;
}
