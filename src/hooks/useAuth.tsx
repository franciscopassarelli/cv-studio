import { TERMS_VERSION } from "@/config/legal";
import { clearDraft } from "@/lib/cv-draft";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAdditionalUserInfo,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  emailVerified: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  refreshUser: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  hasPassword: boolean;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (password?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureUserProfile(user: User) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;

  try {
    await setDoc(ref, {
      name: user.displayName ?? "Sin nombre",
      email: user.email,
      plan: "free",
      premium: {
        active: false,
        paymentId: null,
        purchasedAt: null,
        expiresAt: null,
      },
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    // Si otra llamada lo creó primero, las reglas rechazan este segundo create: es esperable
    if ((err as { code?: string }).code !== "permission-denied") throw err;
  }
}

// A dónde vuelve el usuario después de tocar el link del email
const actionSettings = () => ({ url: `${window.location.origin}/profile` });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) await ensureUserProfile(firebaseUser);
      } catch (error) {
        console.error("Error inicializando usuario:", error);
      }

      setUser(firebaseUser);
      setEmailVerified(firebaseUser?.emailVerified ?? false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(name: string, email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(credential.user, { displayName: name });

    // El listener de auth pudo crear el perfil antes con "Sin nombre": se asegura el nombre real
    await ensureUserProfile(credential.user);
    await updateDoc(doc(db, "users", credential.user.uid), {
  name,
  termsAcceptedAt: serverTimestamp(),
  termsVersion: TERMS_VERSION,
});

    // Si el envío falla, la cuenta ya existe: desde la pantalla de verificación se puede reenviar
    try {
      await sendEmailVerification(credential.user, actionSettings());
    } catch (err) {
      console.error("No se pudo enviar el email de verificación:", err);
    }
  }

  async function signInWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider);

    await ensureUserProfile(credential.user);

    // Cuenta nueva: queda registrado que vio los términos (el aviso está bajo el botón de Google)
if (getAdditionalUserInfo(credential)?.isNewUser) {
  try {
    await updateDoc(doc(db, "users", credential.user.uid), {
      termsAcceptedAt: serverTimestamp(),
      termsVersion: TERMS_VERSION,
    });
  } catch (err) {
    console.error("No se pudo registrar la aceptación de términos:", err);
  }
}

    setUser(credential.user);
    setEmailVerified(credential.user.emailVerified);
    setLoading(false);
  }

  async function logout() {
    await signOut(auth);
  }

  async function updateUserName(name: string) {
  if (!auth.currentUser) throw new Error("No hay usuario logueado.");

  await updateProfile(auth.currentUser, { displayName: name });
  await updateDoc(doc(db, "users", auth.currentUser.uid), { name });
}

  async function resendVerification() {
    if (!auth.currentUser) throw new Error("No hay usuario logueado.");
    await sendEmailVerification(auth.currentUser, actionSettings());
  }

  // Firebase no avisa solo cuando el usuario verifica: hay que volver a leer la cuenta
  async function refreshUser() {
    const current = auth.currentUser;
    if (!current) return false;

    await current.reload();
    if (current.emailVerified) {
      await current.getIdToken(true); // el token nuevo ya trae email_verified: true
    }
    setEmailVerified(current.emailVerified);
    return current.emailVerified;
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  const hasPassword = !!user?.providerData.some((p) => p.providerId === "password");

// Las acciones sensibles piden volver a autenticar
async function reauthenticate(password?: string) {
  const current = auth.currentUser;
  if (!current) throw new Error("No hay usuario logueado.");

  if (hasPassword) {
    if (!current.email || !password) throw new Error("Ingresá tu contraseña.");
    await reauthenticateWithCredential(
      current,
      EmailAuthProvider.credential(current.email, password),
    );
  } else {
    await reauthenticateWithPopup(current, googleProvider);
  }
}

async function changePassword(currentPassword: string, newPassword: string) {
  await reauthenticate(currentPassword);
  await updatePassword(auth.currentUser!, newPassword);
}

async function deleteAccount(password?: string) {
  await reauthenticate(password);
  const current = auth.currentUser!;

  // Token nuevo: el servidor exige que el login sea reciente
  const token = await current.getIdToken(true);
  const res = await fetch(`${import.meta.env.VITE_FUNCTIONS_BASE_URL}/deleteAccount`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "No se pudo borrar la cuenta.");
  }

  clearDraft(current.uid);
  await signOut(auth);
}

  return (
    <AuthContext.Provider
      value={{
  user,
  loading,
  emailVerified,
  signIn,
  signUp,
  signInWithGoogle,
  logout,
  updateUserName,
  resendVerification,
  refreshUser,
  resetPassword,
  hasPassword,
  changePassword,
  deleteAccount,
}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}