// Premium package config. Prepared for future Mercado Pago integration.
// Point of extension: swap the checkout stub for a real API call, and
// derive `isPremium` from backend / auth state instead of local context.

export interface PremiumPlan {
  id: string;
  name: string;
  price: string;
  currency: string;
  benefits: string[];
}

export interface ExtrapremiumPlan extends PremiumPlan {
  isPremium: boolean;
}

export const PREMIUM_PLAN: PremiumPlan = {
  id: "champions-cv-premium",
  name: "Champions CV Premium",
  price: "4.999",
  currency: "ARS",
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

interface CheckoutOptions {
  plan?: PremiumPlan | ExtrapremiumPlan;
  userId?: string;
  userEmail?: string;
}

/**
 * Stub para el checkout. Cuando integremos Mercado Pago se sustituye por
 * una llamada a `createServerFn` que genere una preferencia de pago
 * (`preferences.create`) y devuelva `init_point` para redirigir al usuario.
 */
export async function startPremiumCheckout({
  plan = PREMIUM_PLAN,
  userId,
  userEmail,
}: CheckoutOptions = {}): Promise<void> {
  // TODO: reemplazar con llamada real a backend / Mercado Pago SDK
  console.info("[premium] checkout requested for", {
    planId: plan.id,
    userId,
    userEmail,
  });
}