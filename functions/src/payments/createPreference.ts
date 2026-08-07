import { onRequest } from "firebase-functions/v2/https";
import { MercadoPagoConfig, Preference } from "mercadopago";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

export const createPreference = onRequest(async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    const { userId, email } = req.body;

    if (!userId) {
      res.status(400).json({ error: "Falta el userId." });
      return;
    }

    if (!email) {
      res.status(400).json({ error: "Falta el email." });
      return;
    }

    const userRef = admin.firestore().collection("users").doc(userId);
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      const user = userSnap.data();

      if (user?.plan === "premium" && user?.premium?.active === true) {
        res.status(409).json({
          error: "El usuario ya posee una suscripción Premium.",
        });
        return;
      }
    }

    const preference = new Preference(client);

    logger.info("Access Token:", process.env.MP_ACCESS_TOKEN ? "OK" : "NO EXISTE");
    logger.info("User:", { userId, email });
    logger.info("Creando preferencia...");

    // URL pública del frontend (túnel de cloudflared mientras probás, o tu dominio final después)
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";

    const result = await preference.create({
      body: {
        payer: {
          email,
        },

        items: [
          {
            id: "champions-cv-premium",
            title: "Champions CV - Plan Premium",
            quantity: 1,
            unit_price: 5000,
            currency_id: "ARS",
          },
        ],

        back_urls: {
          success: `${FRONTEND_URL}/payments/success`,
          pending: `${FRONTEND_URL}/payments/pending`,
          failure: `${FRONTEND_URL}/payments/failure`,
        },

        auto_return: "approved",

        external_reference: userId,

        metadata: {
          user_id: userId,
        },

        binary_mode: true,

        notification_url: process.env.MP_WEBHOOK_URL,
      },
    });

    logger.info("Preferencia creada", {
      preferenceId: result.id,
      userId,
    });
    logger.info(JSON.stringify(result, null, 2));

    res.status(200).json({
      success: true,
      preferenceId: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    logger.error("Error al crear la preferencia", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : JSON.stringify(error),
    });
  }
});