import { createFileRoute } from "@tanstack/react-router";
import { CheckoutFailure } from "@/components/checkout/CheckoutFailure";

export const Route = createFileRoute("/payments/failure")({
  component: CheckoutFailure,
});
