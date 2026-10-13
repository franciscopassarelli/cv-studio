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

export async function startPremiumCheckout({
  plan = PREMIUM_PLAN,
  userId,
  userEmail,
}: CheckoutOptions = {}): Promise<void> {
  console.info("[premium] checkout requested for", {
    planId: plan.id,
    userId,
    userEmail,
  });
}
