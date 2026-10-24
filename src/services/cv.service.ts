import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import type { CVDocument } from "@/types/cv";

function requireUser() {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado.");
  return user;
}

export async function saveCV(cv: Omit<CVDocument, "id" | "createdAt" | "updatedAt">) {
  requireUser();

  const docRef = await addDoc(collection(db, "cvs"), {
    ...cv,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateCV(
  id: string,
  patch: Partial<Pick<CVDocument, "title" | "template" | "data">>,
) {
  requireUser();

  // Firestore rechaza `undefined`: esta copia lo elimina
  const clean = patch.data ? { ...patch, data: JSON.parse(JSON.stringify(patch.data)) } : patch;

  await updateDoc(doc(db, "cvs", id), { ...clean, updatedAt: serverTimestamp() });
}

export async function deleteCV(id: string) {
  requireUser();
  await deleteDoc(doc(db, "cvs", id));
}

export async function getUserCVs(): Promise<CVDocument[]> {
  const user = requireUser();

  // Filtrar por userId es obligatorio: las reglas solo dejan listar documentos propios.
  // Se ordena en el cliente para no tener que crear un índice compuesto.
  const snap = await getDocs(query(collection(db, "cvs"), where("userId", "==", user.uid)));

  return snap.docs
    .map((d) => {
      const raw = d.data();
      return {
        ...raw,
        id: d.id,
        createdAt: raw.createdAt?.toDate?.(),
        updatedAt: raw.updatedAt?.toDate?.(),
      } as CVDocument;
    })
    .sort((a, b) => (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0));
}