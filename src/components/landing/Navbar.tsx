import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Menu,
  Sparkles,
  User,
  LogIn,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-400/30 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105">
            <FileText className="h-5 w-5" />
          </div>

          <div className="hidden sm:block">
            <h1 className="font-extrabold tracking-tight text-gray-900 dark:text-white">
              Champions CV
            </h1>
            <p className="mt-1 text-[11px] font-semibold text-orange-600 dark:text-orange-400">
              Tu CV profesional con IA
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-xl p-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <Avatar className="h-8 w-8 border border-orange-200 dark:border-orange-900">
                <AvatarImage
                  src={user.photoURL ?? ""}
                  alt={user.displayName ?? "Mi perfil"}
                />
                <AvatarFallback className="bg-orange-100 font-bold text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                  {user.displayName?.charAt(0).toUpperCase() ?? (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              <span className="hidden text-sm font-semibold text-gray-700 dark:text-gray-200 sm:inline">
                Mi perfil
              </span>
            </Link>
          ) : (
            <Button variant="ghost" className="hidden font-semibold text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400 sm:flex" asChild>
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

          {/* BOTÓN MÁGICO */}
          <Button
            asChild
            className="group relative overflow-hidden rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98]"
          >
            <Link to="/builder" className="flex items-center gap-2 px-4 py-2">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

              <Sparkles className="h-4 w-4 text-amber-200 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

              <span className="hidden sm:inline">Crear CV gratis</span>
              <span className="sm:hidden">Crear</span>
            </Link>
          </Button>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-gray-200 dark:border-zinc-800 dark:bg-zinc-900 md:hidden"
              >
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col justify-between dark:bg-zinc-950 dark:border-zinc-800">
              <div>
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2 text-xl font-bold dark:text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                      <FileText className="h-4 w-4" />
                    </div>
                    Champions CV
                  </SheetTitle>
                </SheetHeader>

                <nav className="mt-8 flex flex-col gap-5">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-base font-semibold text-gray-700 transition-colors hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 pb-6">
                {!user && (
                  <Button
                    variant="outline"
                    asChild
                    className="w-full justify-start gap-2 rounded-xl border-gray-200 dark:border-zinc-800 dark:bg-zinc-900 font-semibold dark:text-white dark:hover:bg-zinc-800"
                  >
                    <Link
                      to="/login"
                      search={{
                        redirectTo: "/builder",
                      }}
                    >
                      <LogIn className="h-4 w-4 text-orange-500" />
                      Iniciar sesión
                    </Link>
                  </Button>
                )}

                <Button
                  asChild
                  className="w-full rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 font-bold text-white shadow-md shadow-orange-500/20"
                >
                  <Link to="/builder" className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-200" />
                    Crear mi CV
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}