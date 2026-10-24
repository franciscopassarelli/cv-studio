import { useAuth } from "@/hooks/useAuth";
import { clearDraft, readDraft, writeDraft } from "@/lib/cv-draft";
import { db } from "@/lib/firebase";
import { emptyCV, sampleCV, type CVData, type TemplateId } from "@/types/cv-types";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CVContext } from "./cv-context";

export function CVProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<CVData>(emptyCV);
  const [template, setTemplate] = useState<TemplateId>("modern");
  const [isPremium, setIsPremium] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);

  // Hay un CV armado que todavía no se descargó (no está en "Mis CVs")
  const hasUnsavedCV = currentCVId === null && data !== emptyCV && data !== sampleCV;

  // Al iniciar sesión (una sola vez por usuario): si hay borrador se retoma en silencio,
  // si no, se abre el welcome. Así no se vuelve a abrir cada vez que cambia `data`.
  const startupChecked = useRef<string | null>(null);
  useEffect(() => {
    if (!user || startupChecked.current === user.uid) return;
    startupChecked.current = user.uid;
    if (currentCVId || data !== emptyCV) return;

    const draft = readDraft(user.uid);
    if (draft) {
      const d = draft.data;
      // se mezcla con emptyCV por si el borrador es de una versión vieja con menos campos
      setData({ ...emptyCV, ...d, personal: { ...emptyCV.personal, ...d.personal } });
      setTemplate(draft.template);
      setCurrentCVId(draft.currentCVId);
    } else {
      setWelcomeModalOpen(true);
    }
  }, [user, currentCVId, data]);

  // Autoguardado: emptyCV y sampleCV intactos no se guardan, solo lo que el usuario tocó
  useEffect(() => {
    if (!user) return;
    if (data === emptyCV || data === sampleCV) return;

    const t = setTimeout(() => {
      writeDraft(user.uid, { data, template, currentCVId, savedAt: Date.now() });
    }, 800);
    return () => clearTimeout(t);
  }, [user, data, template, currentCVId]);

  // Plan premium: sale solo de Firestore, y respeta el vencimiento
  useEffect(() => {
    if (!user) {
      setIsPremium(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snap) => {
      const userData = snap.data();
      const exp = userData?.premium?.expiresAt?.toMillis?.() ?? null;
      setIsPremium(
        userData?.plan === "premium" &&
          userData?.premium?.active === true &&
          (exp === null || exp > Date.now()),
      );
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
          if (user) clearDraft(user.uid);
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
        hasUnsavedCV,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}