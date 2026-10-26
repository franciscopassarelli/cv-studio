import { CONTACT_EMAIL, OWNER_NAME, SERVICE_NAME } from "@/config/legal";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: `Sobre ${SERVICE_NAME} | Quién está detrás del sitio` },
      {
        name: "description",
        content:
          "Champions CV es una herramienta para armar currículums, desarrollada desde Argentina. Conocé cómo nació, cómo funciona y cómo contactarnos.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          ← Volver al inicio
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900">
          Sobre {SERVICE_NAME}
        </h1>

        <div className="mt-10 space-y-10 leading-relaxed text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Qué es</h2>
            <p className="mt-3">
              {SERVICE_NAME} es una herramienta online para armar tu currículum. Elegís una de 12
              plantillas, completás tus datos con una vista previa en tiempo real y descargás tu CV
              en PDF. Cuatro de las plantillas son gratuitas. El plan Premium suma las otras ocho,
              tipografía y tamaño a tu medida, y la posibilidad de reabrir y editar tus CVs
              guardados. Es un pago único por 12 meses, sin renovación automática.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Quién está detrás</h2>
            <p className="mt-3">
              {SERVICE_NAME} lo desarrollo yo, {OWNER_NAME}, programador JavaScript, desde
              Argentina.
            </p>
            <p className="mt-3">
              Cuando armé mi primer CV usé una de esas aplicaciones conocidas, y después me hice un
              portfolio. En ese camino aprendí que hacer un CV exige prolijidad y tiempo: no se
              trata de completar casilleros, sino de decidir qué querés que vea de verdad quien lo
              revisa. Y aprendí, por mi propio error, que a veces conviene ser simple y directo, sin
              relleno ni exceso de diseño.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Cómo lo pienso</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Simple y directo.</strong> Plantillas limpias, pensadas para que lo
                importante se vea primero.
              </li>
              <li>
                <strong>Con ejemplos reales.</strong> Un CV vale más cuando muestra lo que hiciste,
                sin inflarte.
              </li>
              <li>
                <strong>Sin promesas vacías.</strong> Ninguna plantilla te consigue un trabajo ni
                garantiza pasar un filtro automático. Lo que sí podemos darte es una herramienta
                clara para presentarte bien.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Tus datos y tus pagos</h2>
            <p className="mt-3">
              Los pagos se procesan con Mercado Pago y no vemos los datos de tu tarjeta. Podés leer
              cómo cuidamos tu información en la{" "}
              <Link to="/privacy" className="font-medium text-orange-500 hover:text-orange-600">
                Política de privacidad
              </Link>{" "}
              y las condiciones del servicio en los{" "}
              <Link to="/terms" className="font-medium text-orange-500 hover:text-orange-600">
                Términos y condiciones
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Contacto</h2>
            <p className="mt-3">
              Para consultas, sugerencias o pedidos sobre tu cuenta, escribinos a{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-orange-500 hover:text-orange-600"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
          <p className="font-semibold text-gray-900">¿Listo para armar tu CV?</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/builder"
              className="inline-block rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Crear mi CV gratis
            </Link>
            <Link
              to="/guias"
              className="inline-block rounded-lg border border-orange-300 px-6 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-100"
            >
              Leer las guías
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}