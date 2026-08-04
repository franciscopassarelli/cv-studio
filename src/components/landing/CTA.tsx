import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-background">

      <div className="mx-auto max-w-7xl px-6">

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-orange-500
            to-orange-700
            px-8
            py-16
            text-center
            text-white
            shadow-2xl
            shadow-orange-500/20
          "
        >

          {/* Decoraciones */}

          <div
            className="
              absolute
              -left-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-white/10
              blur-sm
            "
          />


          <div
            className="
              absolute
              -bottom-32
              -right-32
              h-80
              w-80
              rounded-full
              bg-white/10
              blur-sm
            "
          />


          <div className="relative">


            {/* Icono */}

            <div
              className="
                mx-auto
                mb-6
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-white/20
                backdrop-blur
              "
            >
              <Sparkles className="h-8 w-8"/>
            </div>



            <h2
              className="
                mx-auto
                max-w-3xl
                text-4xl
                font-bold
                tracking-tight
                md:text-5xl
              "
            >
              ¿Listo para conseguir más entrevistas?
            </h2>



            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                text-white/90
              "
            >
              Crea un currículum moderno, profesional y optimizado
              para ATS en pocos minutos. Empieza gratis y destaca
              entre los demás candidatos.
            </p>



            <div
              className="
                mt-10
                flex
                flex-col
                items-center
                justify-center
                gap-4
                sm:flex-row
              "
            >


              <Button
                asChild
                size="lg"
                className="
                  bg-white
                  text-orange-600
                  hover:bg-gray-100
                  px-8
                  shadow-lg
                "
              >
                <Link to="/builder">

                  Crear mi CV Gratis

                  <ArrowRight
                    className="
                      ml-2
                      h-4
                      w-4
                    "
                  />

                </Link>

              </Button>



              <Button
                asChild
                size="lg"
                variant="outline"
                className="
                  border-white/50
                  bg-transparent
                  text-white
                  hover:bg-white
                  hover:text-orange-600
                "
              >

                <Link to="/">
                  Ver Plan Premium
                </Link>

              </Button>


            </div>



            <p
              className="
                mt-6
                text-sm
                text-white/80
              "
            >
              ✓ Sin tarjeta de crédito · ✓ Descarga en PDF · ✓ Compatible con ATS
            </p>


          </div>

        </div>

      </div>

    </section>
  );
}