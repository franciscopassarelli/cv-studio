import { defineSecret } from "firebase-functions/params";
import { MercadoPagoConfig } from "mercadopago";

// Se configura con: firebase functions:secrets:set MP_ACCESS_TOKEN
export const MP_ACCESS_TOKEN = defineSecret("MP_ACCESS_TOKEN");

// Único lugar donde se define lo que se cobra
export const PREMIUM_ITEM = {
  id: "champions-cv-premium",
  title: "Champions CV - Plan Premium (1 año)",
  price: 4999,
  currency: "ARS",
} as const;

/** Llamar solo dentro de un handler (el secret se lee en runtime). */
export function getMpClient() {
  return new MercadoPagoConfig({accessToken: MP_ACCESS_TOKEN.value()});
}