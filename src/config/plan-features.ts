// Fuente única de lo que incluye cada plan.
// Regla: una línea entra acá solo si el código la cumple de verdad.

export const FREE_FEATURES = [
  "4 plantillas gratuitas",
  "Descarga en formato PDF",
  "Editor en tiempo real",
  "Personalización básica",
];

export const PREMIUM_FEATURES = [
  "Las 8 plantillas Premium",
  "Tipografía y tamaño a tu medida",
];

// Sumalas a las listas de arriba recién cuando estén aplicadas en el código:
//   Free:    "Hasta 3 CVs guardados"
//   Premium: "CVs ilimitados"
//   Ambos:   lo que decidas sobre el límite de descargas

// Tiene que coincidir con lo que cobra createPreference (functions/src/payments)
export const PREMIUM_PRICE = "$4.999";
export const PREMIUM_PERIOD: string | undefined = "/mes"; // poné undefined si es pago único
export const PREMIUM_CURRENCY = "ARS";