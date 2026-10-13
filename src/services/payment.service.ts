export const createPaymentPreference = async (userId: string, email: string) => {
  const response = await fetch(
    "https://us-central1-exploramas-5d967.cloudfunctions.net/createPreference",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email }),
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("createPreference falló:", response.status, data);
    throw new Error(data?.error ?? "Error creando preferencia");
  }

  if (!data?.init_point) {
    throw new Error("Mercado Pago no devolvió un init_point.");
  }

  window.location.href = data.init_point;
};
