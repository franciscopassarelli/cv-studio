import { FirebaseError } from "firebase/app";

// Devuelve "" para los casos que no merecen mensaje (ej. cerrar la ventana de Google)
export function authErrorMessage(err: unknown): string {
  const code = err instanceof FirebaseError ? err.code : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con ese email. Iniciá sesión.";
    case "auth/invalid-email":
      return "El email no es válido.";
    case "auth/weak-password":
      return "La contraseña es muy débil. Usá al menos 8 caracteres.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email o contraseña incorrectos.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Esperá unos minutos y probá de nuevo.";
    case "auth/network-request-failed":
      return "No hay conexión. Revisá tu internet.";
    case "auth/account-exists-with-different-credential":
      return "Ese email ya está registrado con otro método. Iniciá sesión con tu contraseña.";
    case "auth/popup-blocked":
      return "Tu navegador bloqueó la ventana de Google. Permitila e intentá de nuevo.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "";
    default:
      return "Ocurrió un error. Probá de nuevo.";
      case "auth/requires-recent-login":
  return "Por seguridad, volvé a iniciar sesión e intentá de nuevo.";
  }
}