// Fuente única de lo que incluye cada plan.
// Regla: una línea entra acá solo si el código la cumple de verdad.

export const FREE_FEATURES = [
  "4 plantillas gratuitas, incluida la ATS",
  "Descarga en formato PDF",
  "Editor con vista previa en tiempo real",
  "Borrador guardado automáticamente en tu navegador",
  "Personalización básica",
];

export const PREMIUM_FEATURES = [
  "Las 8 plantillas Premium",
  "Tipografía y tamaño a tu medida",
  "Reabrí y editá tus CVs guardados",
  "Pago único por 12 meses, sin renovación automática",
];

// Tiene que coincidir con PREMIUM_ITEM.price en functions/src/config/mercadopago.ts
export const PREMIUM_PRICE = "$10.000";
export const PREMIUM_PERIOD: string | undefined = "/año"; // undefined = pago único
export const PREMIUM_CURRENCY = "ARS";