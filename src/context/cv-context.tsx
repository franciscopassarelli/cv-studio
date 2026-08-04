import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { sampleCV, type CVData, type TemplateId } from "@/types/cv-types";
import { useAuth } from "@/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CVContextValue {
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
}

const CVContext = createContext<CVContextValue | null>(null);

export function CVProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<CVData>(sampleCV);
  const [template, setTemplate] = useState<TemplateId>("modern");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsPremium(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (snap) => {
      const userData = snap.data();
      const premiumActive =
        userData?.plan === "premium" && userData?.premium?.active === true;

      setIsPremium(Boolean(premiumActive));
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <CVContext.Provider
      value={{
        data,
        setData,
        template,
        setTemplate,
        reset: () => {
          setData(sampleCV);
          setTemplate("modern");
          setCurrentCVId(null);
        },
        isPremium,
        premiumModalOpen,
        openPremiumModal: () => setPremiumModalOpen(true),
        closePremiumModal: () => setPremiumModalOpen(false),
        currentCVId,
        setCurrentCVId,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error("useCV must be used within CVProvider");
  return ctx;
}