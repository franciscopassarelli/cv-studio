// Premium package config. Prepared for future Mercado Pago integration.
// Point of extension: swap the checkout stub for a real API call, and
// derive `isPremium` from backend / auth state instead of local context.

export interface ExtrapremiumPlan {
  id: string;
  name: string;
  price: string;
  currency: string;
  benefits: string[];
  isPremium: boolean;
}



export interface PremiumPlan {
  id: string;
  name: string;
  price: string;
  currency: string;
  benefits: string[];
}



export const PREMIUM_PLAN: PremiumPlan = {
  id: "champions-cv-premium",
  name: "Champions CV Premium",
  price: "9.99",
  currency: "USD",
  benefits: [
    "Acceso a las 8 plantillas Premium exclusivas",
    "Descargas ilimitadas en PDF de alta calidad",
    "Personalización avanzada de color y tipografía",
    "Nuevas plantillas Premium cada mes",
    "Soporte prioritario",
    "Sin marca de agua",
  ],
};

export const EXTRAPREMIUM_PLAN: ExtrapremiumPlan = {
  ...PREMIUM_PLAN,
  isPremium: true,
};


/**
 * Stub para el checkout. Cuando integremos Mercado Pago se sustituye por
 * una llamada a `createServerFn` que genere una preferencia de pago
 * (`preferences.create`) y devuelva `init_point` para redirigir al usuario.
 */
export async function startPremiumCheckout(plan: PremiumPlan | ExtrapremiumPlan = PREMIUM_PLAN): Promise<void> {
  // TODO: reemplazar con llamada real a Mercado Pago
  console.info("[premium] checkout requested for", plan.id);
}
