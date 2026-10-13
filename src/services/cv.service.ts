import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import type { CVDocument } from "@/types/cv";

export async function saveCV(cv: Omit<CVDocument, "id" | "createdAt" | "updatedAt">) {
  if (!auth.currentUser) {
    throw new Error("Usuario no autenticado.");
  }

  const docRef = await addDoc(collection(db, "cvs"), {
    ...cv,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateCV() {
  // Próximamente
}

export async function deleteCV() {
  // Próximamente
}

export async function getUserCVs() {
  // Próximamente
}
