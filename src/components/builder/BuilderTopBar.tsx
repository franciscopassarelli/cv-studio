import { Link } from "@tanstack/react-router";
import { FileText, Eye, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadPDFButton } from "@/components/cv/DownloadPDFButton";
import { AccentColorPicker } from "./AccentColorPicker";
import { ResetCVDialog } from "./ResetCVDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CVPreview } from "@/components/cv/CVPreview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export function BuilderTopBar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/85 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2.5">
        
        {/* LOGO & BRAND */}
        <Link to="/" className="group flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-400/30 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105">
            <FileText className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-extrabold tracking-tight text-gray-900 leading-none">
              Champions CV
            </div>
            <div className="mt-0.5 hidden text-[11px] font-semibold text-orange-600 sm:block">
              Editor en tiempo real
            </div>
          </div>
        </Link>

        {/* CONTROLES & ACCIONES */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <AccentColorPicker />

          <ResetCVDialog />

          {/* PREVIEW EN DISPOSITIVOS MÓVILES */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-gray-200/80 text-gray-700 hover:text-orange-600 lg:hidden"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline font-semibold">Vista previa</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="flex flex-col h-[92vh] overflow-hidden p-0 rounded-t-3xl border-t-0 bg-white"
            >
              <SheetHeader className="border-b border-gray-100 bg-white px-5 py-3.5">
                <SheetTitle className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  Vista previa de tu CV
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Muestra el resultado final del currículum generado.
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto bg-gray-50/50 p-3">
                <CVPreview />
              </div>

              <div className="sticky bottom-0 flex justify-end border-t border-gray-100 bg-white p-3.5">
                <DownloadPDFButton />
              </div>
            </SheetContent>
          </Sheet>

          {/* BOTÓN DESCARGAR DESKTOP */}
          <div className="hidden sm:block">
            <DownloadPDFButton />
          </div>

          <div className="h-5 w-px bg-gray-200 mx-1 hidden sm:block" />

          {/* USUARIO / PERFIL */}
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-xl p-1 transition-colors duration-200 hover:bg-gray-100"
            >
              <Avatar className="h-8 w-8 border border-orange-200">
                <AvatarImage
                  src={user.photoURL ?? ""}
                  alt={user.displayName ?? "Mi perfil"}
                />
                <AvatarFallback className="bg-orange-100 font-bold text-orange-600">
                  {user.displayName?.charAt(0).toUpperCase() ?? (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              <span className="hidden text-xs font-bold text-gray-700 md:inline">
                Mi perfil
              </span>
            </Link>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden font-semibold text-gray-700 hover:text-orange-600 sm:flex"
            >
              <Link to="/login" search={{ redirectTo: "/builder" }}>
                Ingresar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}