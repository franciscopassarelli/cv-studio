import { createFileRoute } from "@tanstack/react-router";
import { CheckoutSuccess } from "@/components/checkout/CheckoutSuccess";

export const Route = createFileRoute("/payments/success")({
  component: CheckoutSuccess,
});
