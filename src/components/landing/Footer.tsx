import { Link } from "@tanstack/react-router";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

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
                <h3 className="text-xl font-extrabold tracking-tight">
                  Champions CV
                </h3>
                <p className="text-xs font-medium text-orange-400/80">
                  Currículums profesionales
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-400">
              Creá currículums modernos, optimizados para ATS y preparados para
              destacar tu talento ante los reclutadores.
            </p>
          </div>

          {/* Columna Producto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">
              Producto
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="#features"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Características
                </a>
              </li>
              <li>
                <a
                  href="#templates"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Plantillas
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Planes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Navegación */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">
              Navegación
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/builder"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Crear CV
                </Link>
              </li>
              <li>
                <a
                  href="#faq"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Contacto & Redes */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">
              Contacto
            </h4>

            <div className="mt-5 space-y-5">
              <a
                href="mailto:contacto@championscv.com"
                className="flex items-center gap-2.5 text-sm text-gray-400 transition-colors duration-200 hover:text-orange-400"
              >
                <Mail className="h-4 w-4 text-orange-400" />
                <span>contacto@championscv.com</span>
              </a>

              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
                >
                  <Github className="h-5 w-5" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} Champions CV. Todos los derechos
            reservados.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition-colors duration-200 hover:text-gray-200"
            >
              Políticas de Privacidad
            </a>
            <a
              href="#"
              className="transition-colors duration-200 hover:text-gray-200"
            >
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}