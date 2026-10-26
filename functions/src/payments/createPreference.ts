import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { Preference } from "mercadopago";
import { MP_ACCESS_TOKEN, PREMIUM_ITEM, getMpClient } from "../config/mercadopago";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const createPreference = onRequest(
  {secrets: [MP_ACCESS_TOKEN]},
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({error: "Método no permitido."});
      return;
    }

    try {
      // El usuario sale del token de Firebase, no del body
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

      if (!token) {
        res.status(401).json({error: "Falta el token de autenticación."});
        return;
      }

     let uid: string;
let email: string | undefined;
try {
  const decoded = await admin.auth().verifyIdToken(token);
  uid = decoded.uid;
  email = decoded.email;

  if (decoded.email_verified !== true) {
    res.status(403).json({error: "Verificá tu email antes de pagar."});
    return;
  }
} catch {
  res.status(401).json({error: "Token inválido."});
  return;
}

      const userSnap = await admin.firestore().collection("users").doc(uid).get();
      const user = userSnap.data();

      const expiresAtMs: number | null = user?.premium?.expiresAt?.toMillis?.() ?? null;
      const vigente =
  user?.plan === "premium" &&
  user?.premium?.active === true &&
  (expiresAtMs === null || expiresAtMs > Date.now());

if (vigente) {
  res.status(409).json({error: "Ya tenés el plan Premium activo."});
  return;
}

      const frontendUrl = process.env.FRONTEND_URL;
      const webhookUrl = process.env.MP_WEBHOOK_URL;

      if (!frontendUrl || !webhookUrl) {
        logger.error("Faltan FRONTEND_URL o MP_WEBHOOK_URL en la configuración");
        res.status(500).json({error: "Pagos no disponibles en este momento."});
        return;
      }

      const result = await new Preference(getMpClient()).create({
        body: {
          payer: email ? {email} : undefined,
          items: [
            {
              id: PREMIUM_ITEM.id,
              title: PREMIUM_ITEM.title,
              quantity: 1,
              unit_price: PREMIUM_ITEM.price,
              currency_id: PREMIUM_ITEM.currency,
            },
          ],
          back_urls: {
            success: `${frontendUrl}/payments/success`,
            pending: `${frontendUrl}/payments/pending`,
            failure: `${frontendUrl}/payments/failure`,
          },
          auto_return: "approved",
          external_reference: uid,
          metadata: {user_id: uid},
          binary_mode: true,
          notification_url: webhookUrl,
        },
      });

      logger.info("Preferencia creada", {preferenceId: result.id, uid});

      res.status(200).json({preferenceId: result.id, init_point: result.init_point});
    } catch (error) {
      logger.error("Error al crear la preferencia", error);
      res.status(500).json({error: "No se pudo iniciar el pago."});
    }
  },
);