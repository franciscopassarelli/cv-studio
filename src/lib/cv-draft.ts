import type { CVData, TemplateId } from "@/types/cv-types";

export interface CVDraft {
  data: CVData;
  template: TemplateId;
  currentCVId: string | null;
  savedAt: number;
}

// Una clave por usuario, para que dos cuentas en el mismo navegador no se mezclen
const key = (uid: string) => `cv-draft:${uid}`;

export function readDraft(uid: string): CVDraft | null {
  try {
    const raw = localStorage.getItem(key(uid));
    return raw ? (JSON.parse(raw) as CVDraft) : null;
  } catch {
    return null;
  }
}

export function writeDraft(uid: string, draft: CVDraft) {
  try {
    localStorage.setItem(key(uid), JSON.stringify(draft));
  } catch {
    // cuota llena o storage bloqueado: el borrador simplemente no se guarda
  }
}

export function clearDraft(uid: string) {
  try {
    localStorage.removeItem(key(uid));
  } catch {
    /* noop */
  }
}