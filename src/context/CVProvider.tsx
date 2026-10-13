import { useState, useEffect, type ReactNode } from "react";
import { sampleCV, emptyCV, type CVData, type TemplateId } from "@/types/cv-types";
import { useAuth } from "@/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CVContext } from "./cv-context";

export function CVProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<CVData>(emptyCV);
  const [template, setTemplate] = useState<TemplateId>("modern");
  const [isPremium, setIsPremium] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);

  // Modal de bienvenida: usuario logueado, sin CV abierto y con el CV vacío
  useEffect(() => {
    if (user && !currentCVId && data === emptyCV) {
      setWelcomeModalOpen(true);
    }
  }, [user, currentCVId, data]);

  // Plan premium: sale solo de Firestore (lo activa el pago)
  useEffect(() => {
    if (!user) {
      setIsPremium(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snap) => {
      const userData = snap.data();
      setIsPremium(userData?.plan === "premium" && userData?.premium?.active === true);
    });

    return () => unsubscribe();
  }, [user]);

  const loadSampleData = () => {
    setData(sampleCV);
    setWelcomeModalOpen(false);
  };

  const clearData = () => {
    setData(emptyCV);
    setWelcomeModalOpen(false);
  };

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
        welcomeModalOpen,
        openWelcomeModal: () => setWelcomeModalOpen(true),
        closeWelcomeModal: () => setWelcomeModalOpen(false),
        loadSampleData,
        clearData,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}
