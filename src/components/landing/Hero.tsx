import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="
      relative
      min-h-screen
      overflow-hidden
      flex
      items-center
      justify-center
      bg-background
    ">

      {/* Fondo animado */}
      <div className="absolute inset-0">

        <div
          className="
            absolute
            top-20
            left-1/2
            -translate-x-1/2
            w-[600px]
            h-[600px]
           bg-orange-400/20
           rounded-full
           blur-[120px]
           animate-gradient
          "
        />


        <div
          className="
            absolute
            bottom-0
            right-20
            w-[400px]
            h-[400px]
            bg-purple-400/10
            rounded-full
            blur-[120px]
          "
        />

      </div>


      {/* Contenido */}
      <div className="
  relative
  z-10
  text-center
  max-w-4xl
  px-6
  animate-fade-up
">


        {/* Badge */}
        <div
          className="
            opacity-0
            animate-fade-up
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-black/10
            bg-white/70
            backdrop-blur
            px-4
            py-2
            text-sm
            text-gray-700
            mb-8
            shadow-sm
          "
        >
          <FileText size={16}/>
          Currículums profesionales con IA
        </div>



        <h1
          className="
            text-6xl
            md:text-8xl
            font-bold
            tracking-tight
            text-gray-900
            opacity-0
            animate-fade-up
          "
        >

          Destacá tu carrera con{" "}

          <span
            className="
              bg-gradient-to-r
              from-orange-500
              to-orange-700
              bg-clip-text
              text-transparent
            "
          >
            Champions CV
          </span>

        </h1>



        <p
          className="
            mt-6
            text-xl
            text-gray-600
            max-w-2xl
            mx-auto
          "
        >
          Crea currículums profesionales, modernos y optimizados
          para conseguir mejores oportunidades laborales.
        </p>



        <div className="
          mt-10
          flex
          justify-center
          gap-4
        ">

          <Button
            size="lg"
            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-8
              shadow-lg
              shadow-orange-500/20
            "
          >
            <Link to="/builder">
              Crear mi CV
            </Link> 
            <ArrowRight className="ml-2"/>
          </Button>


          <Button
            size="lg"
            variant="outline"
            className="
              border-gray-300
              bg-white/50
              backdrop-blur
            "
           asChild
  >
    <a href="#templates">
      Ver plantillas
    </a>
          </Button>

        </div>


      </div>



      {/* CV flotante */}
      <div
className="
absolute
bottom-[-100px]
right-10
hidden
lg:block
animate-float
"
>

        <div
          className="
            w-[320px]
            h-[420px]
            rounded-xl
            bg-white
            shadow-2xl
            border
            border-gray-200
            p-6
          "
        >

          <div
            className="
              h-5
              w-32
              bg-gray-200
              rounded
              mb-6
            "
          />

          <div
            className="
              h-3
              w-full
              bg-gray-100
              rounded
              mb-3
            "
          />

          <div
            className="
              h-3
              w-3/4
              bg-gray-100
              rounded
              mb-8
            "
          />


          <div className="space-y-3">

            <div className="h-2 bg-gray-100 rounded"/>
            <div className="h-2 bg-gray-100 rounded"/>
            <div className="h-2 bg-gray-100 rounded"/>

          </div>


          <div
            className="
              mt-10
              h-20
              rounded-lg
              bg-orange-50
              border
              border-orange-100
            "
          />

        </div>

      </div>


    </section>
  );
}