import { createContext, useContext } from "react";
import type { CVData, TemplateId } from "@/types/cv-types";

export interface CVContextValue {
  data: CVData;
  setData: React.Dispatch<React.SetStateAction<CVData>>;
  template: TemplateId;
  setTemplate: (t: TemplateId) => void;
  reset: () => void;
  isPremium: boolean;
  premiumModalOpen: boolean;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
  currentCVId: string | null;
  setCurrentCVId: (id: string | null) => void;
  welcomeModalOpen: boolean;
  openWelcomeModal: () => void;
  closeWelcomeModal: () => void;
  loadSampleData: () => void;
  clearData: () => void;
}

export const CVContext = createContext<CVContextValue | null>(null);

export function useCV() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error("useCV must be used within CVProvider");
  return ctx;
}
