import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

export interface CV {
  id: string;
  title: string;
  template: string;
  updatedAt: Date | null;
}

export function useCVs() {
  const { user } = useAuth();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCvs([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "cvs"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        title: d.data().title,
        template: d.data().template,
        updatedAt: d.data().updatedAt?.toDate() ?? null,
      }));
      setCvs(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return { cvs, loading };
}
