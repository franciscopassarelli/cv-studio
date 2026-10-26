import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL, OWNER_NAME, SERVICE_NAME } from "@/config/legal";
import { PREMIUM_CURRENCY, PREMIUM_PRICE } from "@/config/plan-features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({ component: TermsPage });

const price = `${PREMIUM_PRICE} ${PREMIUM_CURRENCY}`;

function TermsPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      sections={[
        {
          heading: "Aceptación",
          body: `Al crear una cuenta o usar ${SERVICE_NAME} aceptás estos términos y la Política de privacidad. Si no estás de acuerdo, no uses el servicio.`,
        },
        {
          heading: "El servicio",
          body: `${SERVICE_NAME}, a cargo de ${OWNER_NAME}, es una herramienta online para crear, editar y descargar currículums en PDF a partir de plantillas.`,
        },
        {
          heading: "Tu cuenta",
          body: [
            "Tenés que ser mayor de 18 años, o contar con la autorización de tu madre, padre o representante legal.",
            "La información que cargás tiene que ser tuya y verdadera. Sos responsable de mantener tu contraseña en secreto y de todo lo que se haga desde tu cuenta. Una cuenta es de una sola persona.",
            "Podemos pedirte que verifiques tu email para realizar ciertas acciones, como pagar.",
          ],
        },
        {
          heading: "Planes Free y Premium",
          body: [
            "El plan Free es gratuito y tiene las funciones y plantillas que se muestran en la sección Planes del sitio.",
            `El plan Premium es un pago único de ${price} que da acceso por 12 meses desde la compra. No se renueva automáticamente: al vencer volvés al plan Free y, si querés seguir con Premium, tenés que comprarlo de nuevo.`,
            "Cuando tu Premium vence, tus CVs guardados se conservan, pero no vas a poder editarlos ni descargarlos con plantillas Premium hasta que renueves.",
            "Las funciones de cada plan son las que figuran en el sitio al momento de la compra. Podemos cambiar los planes y los precios para compras futuras. Un cambio no afecta a un plan que ya pagaste.",
          ],
        },
        {
          heading: "Pagos",
          body: [
            "Los pagos se procesan a través de Mercado Pago. No vemos ni guardamos los datos de tu tarjeta.",
            "El precio final es el que ves antes de pagar. Tu plan Premium se activa cuando Mercado Pago confirma que el pago fue aprobado. Si el pago queda pendiente o es rechazado, no se activa.",
          ],
        },
        {
          heading: "Arrepentimiento y devoluciones",
          body: [
            `Si comprás Premium, podés arrepentirte y pedir la devolución del importe dentro de los 10 días corridos desde la compra, sin necesidad de dar explicaciones (art. 34 de la Ley 24.240 de Defensa del Consumidor).`,
            `Para hacerlo, escribinos a ${CONTACT_EMAIL} desde el email de tu cuenta. Te devolvemos el mismo importe por el mismo medio de pago, y tu cuenta vuelve al plan Free.`,
            "Pasado ese plazo no hacemos devoluciones, salvo que haya habido un error de cobro de nuestra parte, como un cobro duplicado.",
          ],
        },
        {
          heading: "Tu contenido",
          body: [
            "Los datos y textos de tus CVs son tuyos. Nos das permiso únicamente para guardarlos y procesarlos con el fin de darte el servicio, por ejemplo para mostrarlos, guardarlos y generar tus PDFs.",
            "No cargues datos personales de otras personas sin su permiso, ni contenido ilegal, ofensivo o que infrinja derechos de terceros.",
          ],
        },
        {
          heading: "Uso aceptable",
          body: "No podés intentar vulnerar la seguridad del servicio, acceder a cuentas ajenas, usar bots u otros medios automáticos para usarlo masivamente, ni copiar, revender o redistribuir el servicio o sus plantillas.",
        },
        {
          heading: "Propiedad intelectual",
          body: `Las plantillas, el diseño y el software de ${SERVICE_NAME} son nuestros o de sus licenciantes. Los PDFs que generás con tu información los podés usar libremente para tus fines personales y laborales.`,
        },
        {
          heading: "Disponibilidad del servicio",
          body: "Hacemos lo posible por mantener el servicio funcionando, pero no garantizamos que esté siempre disponible ni libre de errores. Puede haber interrupciones por mantenimiento o por causas ajenas a nosotros. Te recomendamos descargar y conservar copia de tus CVs.",
        },
        {
          heading: "Limitación de responsabilidad",
          body: "Dentro de lo que permite la ley, y sin afectar los derechos que te corresponden como consumidor, no garantizamos que un CV creado con el servicio te consiga una entrevista o un trabajo, ni nos responsabilizamos por el contenido que vos cargues. Revisá siempre tu CV antes de enviarlo.",
        },
        {
          heading: "Suspensión y baja de la cuenta",
          body: [
            "Podemos suspender o cerrar una cuenta que incumpla estos términos.",
            "Vos podés borrar tu cuenta cuando quieras desde Perfil, Información, Borrar cuenta. Se eliminan tu perfil y tus CVs, y no se pueden recuperar. Si tenés Premium vigente, lo perdés, salvo que estés dentro del plazo de arrepentimiento.",
          ],
        },
        {
          heading: "Cambios en estos términos",
          body: "Podemos actualizar estos términos. Si el cambio es importante, te avisamos en la app o por email. Si seguís usando el servicio después del aviso, entendemos que aceptás la nueva versión. Si no estás de acuerdo, podés borrar tu cuenta.",
        },
        {
          heading: "Ley aplicable y reclamos",
          body: "Estos términos se rigen por las leyes de la República Argentina. Si sos consumidor, podés iniciar tus reclamos ante los tribunales de tu domicilio y ante las autoridades de defensa del consumidor.",
        },
        {
          heading: "Contacto",
          body: `${OWNER_NAME} — ${CONTACT_EMAIL}`,
        },
      ]}
    />
  );
}