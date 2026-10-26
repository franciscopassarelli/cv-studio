import { CONTACT_EMAIL } from "@/config/legal";
import { Link } from "@tanstack/react-router";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

// Pegá tus URLs reales. Mientras estén vacías, no se muestra el ícono.
const SOCIAL = {
  github: "", // ej: "https://github.com/tu-usuario"
  linkedin: "", // ej: "https://www.linkedin.com/in/tu-perfil"
};

const linkClass = "transition-colors duration-200 hover:text-orange-400";
const socialClass =
  "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Luz ambiental en la parte superior */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-orange-500/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-400/30 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white shadow-lg shadow-orange-500/20">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold tracking-tight">Champions CV</h3>
                <p className="text-xs font-medium text-orange-400/80">Currículums profesionales</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-400">
              Creá currículums prolijos y profesionales, con plantillas pensadas para destacar tu
              perfil ante quienes los leen.
            </p>
          </div>

          {/* Columna Producto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">Producto</h4>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              
              <li>
                <a href="#features" className={linkClass}>
                  Características
                </a>
              </li>
              <li>
                <a href="#templates" className={linkClass}>
                  Plantillas
                </a>
              </li>
              <li>
                <a href="#pricing" className={linkClass}>
                  Planes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Navegación */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">Navegación</h4>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/" className={linkClass}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/builder" className={linkClass}>
                  Crear CV
                </Link>
              </li>
              <li>
                <Link to="/guias" className={linkClass}>
                  Guías
                </Link>
              </li>
                 
                 <li>
  <Link to="/sobre-nosotros" className={linkClass}>
    Sobre nosotros
  </Link>
</li>
              
              
              <li>
                <a href="#faq" className={linkClass}>
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Contacto & Redes */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">Contacto</h4>

            <div className="mt-5 space-y-5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-gray-400 transition-colors duration-200 hover:text-orange-400"
              >
                <Mail className="h-4 w-4 text-orange-400" />
                <span>{CONTACT_EMAIL}</span>
              </a>

              {(SOCIAL.github || SOCIAL.linkedin) && (
                <div className="flex gap-3">
                  {SOCIAL.github && (
                    <a
                      href={SOCIAL.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className={socialClass}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}

                  {SOCIAL.linkedin && (
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className={socialClass}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-400 md:flex-row">
          <p>© {new Date().getFullYear()} Champions CV. Todos los derechos reservados.</p>

          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors duration-200 hover:text-gray-200">
              Política de privacidad
            </Link>
            <Link to="/terms" className="transition-colors duration-200 hover:text-gray-200">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}