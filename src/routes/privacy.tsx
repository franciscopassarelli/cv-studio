import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL, OWNER_NAME, SERVICE_NAME } from "@/config/legal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      sections={[
        {
          heading: "Quién es responsable de tus datos",
          body: `${OWNER_NAME}, a cargo de ${SERVICE_NAME}. Podés contactarnos en ${CONTACT_EMAIL}.`,
        },
        {
          heading: "Qué datos guardamos",
          body: [
            "Datos de tu cuenta: nombre, email y contraseña. La contraseña la gestiona Firebase Authentication y nosotros no la vemos. Si ingresás con Google, recibimos tu nombre, tu email y tu foto de perfil de Google.",
            "Contenido de tus CVs: lo que vos cargás, como teléfono, ubicación, redes, foto, experiencia y estudios. Mientras editás, guardamos un borrador en el almacenamiento de tu navegador.",
            "Datos de tu plan y compra: tu plan, la fecha de compra y de vencimiento, y el identificador y el monto del pago. Los datos de tu tarjeta los maneja Mercado Pago y nosotros no los recibimos.",
            "Un registro de cuándo aceptaste los términos y de qué versión.",
          ],
        },
        {
          heading: "Para qué los usamos",
          body: "Para darte el servicio, mantener tu sesión, procesar tus pagos, enviarte emails de cuenta (verificación de email y recuperación de contraseña) y proteger el servicio contra abusos. No vendemos tus datos ni los usamos para publicidad.",
        },
        {
          heading: "Con quién los compartimos",
          body: [
            "Usamos proveedores para operar el servicio: Google (Firebase: autenticación, base de datos y funciones), Mercado Pago (pagos) y Cloudflare (hosting del sitio).",
            "Algunos de estos proveedores pueden procesar datos en servidores ubicados fuera de Argentina. También podemos compartir datos si una autoridad competente nos lo exige legalmente.",
          ],
        },
        {
          heading: "Cuánto tiempo los conservamos",
          body: "Mientras tengas tu cuenta. Si la borrás, eliminamos tu perfil y tus CVs. Los registros de pagos se conservan el tiempo que exija la normativa contable y fiscal aplicable.",
        },
        {
          heading: "Tus derechos",
          body: [
            `Podés acceder a tus datos, corregirlos, actualizarlos y pedir su supresión. Tu nombre lo editás en Perfil, Información. Tu cuenta y tus CVs los borrás en Perfil, Información, Borrar cuenta. Para cualquier otro pedido, escribinos a ${CONTACT_EMAIL}.`,
            "El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley Nº 25.326. La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley Nº 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.",
          ],
        },
        {
          heading: "Seguridad",
          body: "Protegemos tus datos con las medidas de seguridad de Firebase: conexión cifrada y reglas que hacen que solo vos puedas ver tus CVs. Aun así, ningún sistema es 100% seguro, y por eso te recomendamos usar una contraseña única.",
        },
        {
          heading: "Almacenamiento del navegador",
          body: "Usamos el almacenamiento de tu navegador para mantener tu sesión iniciada y guardar el borrador de tu CV. No usamos cookies publicitarias.",
        },
        {
          heading: "Menores de edad",
          body: "El servicio es para mayores de 18 años. Si creés que un menor creó una cuenta sin autorización, escribinos y la eliminamos.",
        },
        {
          heading: "Cambios en esta política",
          body: "Podemos actualizar esta política. Si el cambio es importante, te avisamos en la app o por email.",
        },
        {
          heading: "Contacto",
          body: `${OWNER_NAME} — ${CONTACT_EMAIL}`,
        },
      ]}
    />
  );
}