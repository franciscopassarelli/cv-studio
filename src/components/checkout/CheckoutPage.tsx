import { CheckoutHeader } from "./CheckoutHeader";
import { PaymentMethods } from "./PaymentMethods";
import { PlanSummary } from "./PlanSummary";

export function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <CheckoutHeader />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <PaymentMethods />

          <PlanSummary />
        </div>
      </div>
    </main>
  );
}