import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import type { CVDocument } from "@/types/cv";

export function useCVs() {
  const { user } = useAuth();
  const [cvs, setCvs] = useState<CVDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCvs([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Las reglas solo dejan listar documentos propios, por eso el filtro por userId.
    // Se ordena en el cliente para no depender de un índice compuesto.
    const q = query(collection(db, "cvs"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => {
          const raw = d.data();
          return {
            ...raw, // incluye `data` y `userId`, que antes se perdían
            id: d.id,
            createdAt: raw.createdAt?.toDate?.(),
            updatedAt: raw.updatedAt?.toDate?.(),
          } as CVDocument;
        });

        list.sort((a, b) => (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0));
        setCvs(list);
        setLoading(false);
      },
      (err) => {
        console.error("Error cargando CVs:", err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return { cvs, loading };
}