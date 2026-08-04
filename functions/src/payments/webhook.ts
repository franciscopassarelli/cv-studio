import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { MercadoPagoConfig, Payment } from "mercadopago";
import * as logger from "firebase-functions/logger";

if (!admin.apps.length) {
  admin.initializeApp();
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

export const webhook = onRequest(async (req, res) => {
  try {
    const body = req.body;

    logger.info("Webhook recibido:", JSON.stringify(body));

    if (
      body.type === "payment" ||
      body.action === "payment.created" ||
      body.action === "payment.updated"
    ) {
      const paymentId = body.data?.id || body.id;

      if (!paymentId) {
  res.status(200).send("Sin paymentId");
  return;
}
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: paymentId });

      logger.info(`Estado del pago ${paymentId}: ${paymentInfo.status}`);

      if (paymentInfo.status === "approved") {
        const userId =
          paymentInfo.external_reference ??
          paymentInfo.metadata?.user_id;

        if (!userId) {
  logger.warn("No se encontró el userId del pago.");
  res.status(200).send("OK");
  return;
}

        const doc = await admin
          .firestore()
          .collection("users")
          .doc(userId)
          .get();

        const data = doc.data();

      if (data?.premium?.paymentId === String(paymentId)) {
  logger.info("Pago ya procesado.");
  res.status(200).send("OK");
  return;
}

        await admin
          .firestore()
          .collection("users")
          .doc(userId)
          .set(
            {
              plan: "premium",
              premium: {
                active: true,
                paymentId: String(paymentId),
                purchasedAt:
                  admin.firestore.FieldValue.serverTimestamp(),
                expiresAt: null,
                status: paymentInfo.status,
                amount: paymentInfo.transaction_amount,
              },
            },
            { merge: true }
          );

        logger.info(
          `Usuario ${userId} actualizado a Premium exitosamente.`
        );
      }
    }

    res.status(200).send("Webhook procesado correctamente");
  } catch (error) {
    logger.error("Error al procesar el webhook:", error);
    res.status(500).send("Error interno");
  }
});