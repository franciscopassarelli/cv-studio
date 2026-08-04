import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp,updateDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureUserProfile(user: User) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
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
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          await ensureUserProfile(firebaseUser);
        }

        setUser(firebaseUser);
      } catch (error) {
        console.error("Error inicializando usuario:", error);
        setUser(firebaseUser);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(
    name: string,
    email: string,
    password: string
  ) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(credential.user, {
      displayName: name,
    });

    await ensureUserProfile({
      ...credential.user,
      displayName: name,
    });
  }

  async function signInWithGoogle() {
    const credential = await signInWithPopup(
      auth,
      googleProvider
    );

    await ensureUserProfile(credential.user);

    setUser(credential.user);
    setLoading(false);
  }

  async function logout() {
    await signOut(auth);
  }

  async function updateUserName(name: string) {
    if (!auth.currentUser) {
      throw new Error("No hay usuario logueado.");
    }

    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    await updateDoc(
      doc(db, "users", auth.currentUser.uid),
      { name }
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        updateUserName,
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