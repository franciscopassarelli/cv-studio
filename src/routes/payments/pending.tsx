import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPending } from "@/components/checkout/CheckoutPending";

export const Route = createFileRoute("/payments/pending")({
  component: CheckoutPending,
});