import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";

if (!admin.apps.length) {
  admin.initializeApp();
}

const RECENT_LOGIN_SECONDS = 5 * 60;

export const deleteAccount = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido." });
    return;
  }

  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) {
      res.status(401).json({ error: "Falta el token de autenticación." });
      return;
    }

    let decoded: admin.auth.DecodedIdToken;
    try {
      decoded = await admin.auth().verifyIdToken(token);
    } catch {
      res.status(401).json({ error: "Token inválido." });
      return;
    }

    // Acción irreversible: el usuario tiene que haberse autenticado hace poco
    if (Math.floor(Date.now() / 1000) - decoded.auth_time > RECENT_LOGIN_SECONDS) {
      res.status(401).json({ error: "Volvé a iniciar sesión para borrar tu cuenta." });
      return;
    }

    const uid = decoded.uid;
    const db = admin.firestore();

    // Primero los datos y al final la cuenta de acceso: si algo falla a la mitad,
    // el usuario todavía puede entrar y reintentar
    const cvs = await db.collection("cvs").where("userId", "==", uid).get();
    for (let i = 0; i < cvs.docs.length; i += 400) {
      const batch = db.batch();
      cvs.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }

    await db.collection("users").doc(uid).delete();
    await admin.auth().deleteUser(uid);

    logger.info("Cuenta eliminada", { uid });
    res.status(200).json({ success: true });
  } catch (error) {
    logger.error("Error al borrar la cuenta", error);
    res.status(500).json({ error: "No se pudo borrar la cuenta." });
  }
});