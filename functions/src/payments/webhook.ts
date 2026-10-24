import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { Payment } from "mercadopago";
import { MP_ACCESS_TOKEN, PREMIUM_ITEM, getMpClient } from "../config/mercadopago";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const webhook = onRequest(
  {secrets: [MP_ACCESS_TOKEN]},
  async (req, res) => {
    try {
      const body = req.body ?? {};
      const isPayment =
        body.type === "payment" ||
        body.action === "payment.created" ||
        body.action === "payment.updated";

      if (!isPayment) {
        res.status(200).send("Ignorado");
        return;
      }

      const paymentId = body.data?.id || body.id;
      if (!paymentId) {
        res.status(200).send("Sin paymentId");
        return;
      }

      // Consultamos el pago real a Mercado Pago: no confiamos en el body
      const paymentInfo = await new Payment(getMpClient()).get({id: paymentId});
      logger.info(`Pago ${paymentId}: ${paymentInfo.status}`);

      if (paymentInfo.status !== "approved") {
        res.status(200).send("OK");
        return;
      }

      const userId = paymentInfo.external_reference ?? paymentInfo.metadata?.user_id;
      if (!userId) {
        logger.warn("Pago aprobado sin userId", {paymentId});
        res.status(200).send("OK");
        return;
      }

      // El monto tiene que corresponder al plan
      const amount = paymentInfo.transaction_amount ?? 0;
      if (amount < PREMIUM_ITEM.price || paymentInfo.currency_id !== PREMIUM_ITEM.currency) {
        logger.warn("Monto inesperado", {paymentId, amount, currency: paymentInfo.currency_id});
        res.status(200).send("OK");
        return;
      }

            const db = admin.firestore();
      const userRef = db.collection("users").doc(userId);
      const paymentRef = db.collection("processedPayments").doc(String(paymentId));

      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      // Cada pago activa Premium una sola vez en la vida, aunque el webhook se repita
      const activated = await db.runTransaction(async (tx) => {
        if ((await tx.get(paymentRef)).exists) return false;

        tx.set(paymentRef, {
          userId,
          amount,
          processedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        tx.set(
          userRef,
          {
            plan: "premium",
            premium: {
              active: true,
              paymentId: String(paymentId),
              purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
              expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
              status: paymentInfo.status,
              amount,
            },
          },
          {merge: true},
        );
        return true;
      });

      if (!activated) {
        logger.info("Pago ya procesado", {paymentId});
        res.status(200).send("OK");
        return;
      }

      logger.info(`Usuario ${userId} actualizado a Premium hasta ${expiresAt.toISOString()}`);
      res.status(200).send("OK");
    } catch (error) {
      // 500 hace que Mercado Pago reintente la notificación más tarde
      logger.error("Error al procesar el webhook", error);
      res.status(500).send("Error interno");
    }
  },
);