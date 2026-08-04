import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Menu,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";


export const links = [
  {
    name: "Características",
    href: "#features",
  },
  {
    name: "Plantillas",
    href: "#templates",
  },
  {
    name: "Precios",
    href: "#pricing",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];


export function Navbar() {
  const { user } = useAuth();

  return (
    <header
      className="
      sticky 
      top-0 
      z-50
      border-b
      bg-background/70
      backdrop-blur-xl
      "
    >

      <div
        className="
        mx-auto
        flex
        h-16
        max-w-7xl
        items-center
        justify-between
        px-6
        "
      >


        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-primary
            text-primary-foreground
            shadow-lg
            shadow-primary/20
            "
          >
            <FileText className="h-5 w-5"/>
          </div>


          <div className="hidden sm:block">

            <h1 className="font-bold leading-none">
              Champions CV
            </h1>

            <p className="mt-1 text-xs text-muted-foreground">
              Tu CV profesional con IA
            </p>

          </div>


        </Link>



        {/* DESKTOP MENU */}

        <nav className="
          hidden
          md:flex
          items-center
          gap-8
        ">

          {links.map((link)=>(
            <a
              key={link.href}
              href={link.href}
              className="
              text-sm
              text-muted-foreground
              transition
              hover:text-foreground
              "
            >
              {link.name}
            </a>
          ))}

        </nav>




        {/* ACTIONS */}

        <div className="
          flex
          items-center
          gap-2
        ">


         {user ? (
  <Link
    to="/profile"
    className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
  >
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={user.photoURL ?? ""}
        alt={user.displayName ?? "Mi perfil"}
      />

      <AvatarFallback>
        {user.displayName?.charAt(0).toUpperCase() ?? (
          <User className="h-4 w-4" />
        )}
      </AvatarFallback>
    </Avatar>

    <span className="hidden text-sm font-medium sm:inline">
      Mi perfil
    </span>
  </Link>
) : (
  <Button
    variant="ghost"
    className="hidden sm:flex"
    asChild
  >
    <Link
      to="/login"
      search={{
        redirectTo: "/builder",
      }}
    >
      Iniciar sesión
    </Link>
  </Button>
)}


          <Button
            asChild
            className="
            bg-orange-500
            hover:bg-orange-600
            gap-2
            "
          >

            <Link to="/builder">

              <Sparkles className="h-4 w-4"/>

              <span className="hidden sm:inline">
                Crear CV gratis
              </span>

              <span className="sm:hidden">
                Crear
              </span>

            </Link>

          </Button>



          {/* MOBILE */}

          <Sheet>

            <SheetTrigger asChild>

              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
              >
                <Menu/>
              </Button>

            </SheetTrigger>


            <SheetContent>

              <nav className="mt-10 flex flex-col gap-6">

                {
                  links.map((link)=>(
                    <a
                      key={link.href}
                      href={link.href}
                      className="
                      text-lg
                      font-medium
                      "
                    >
                      {link.name}
                    </a>
                  ))
                }


                <Button asChild>

                  <Link to="/">
                    Crear mi CV
                  </Link>

                </Button>


              </nav>


            </SheetContent>

          </Sheet>


        </div>


      </div>


    </header>
  );
}