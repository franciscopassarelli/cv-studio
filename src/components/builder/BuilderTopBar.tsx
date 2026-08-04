import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadPDFButton } from "@/components/cv/DownloadPDFButton";
import { AccentColorPicker } from "./AccentColorPicker";
import { ResetCVDialog } from "./ResetCVDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CVPreview } from "@/components/cv/CVPreview";
import { Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export function BuilderTopBar() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold leading-none">
              Champions CV
            </div>

            <div className="hidden text-[10px] text-muted-foreground sm:block">
              Generador profesional de currículums
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-1 sm:gap-2">
          <AccentColorPicker />

          <ResetCVDialog />

          {/* Preview móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
              >
                <Eye className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Vista
                </span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="h-[90vh] overflow-auto p-0"
            >
              <SheetHeader className="border-b p-4">
                <SheetTitle>
                  Vista previa
                </SheetTitle>
              </SheetHeader>

              <div className="p-2">
                <CVPreview />
              </div>

              <div className="sticky bottom-0 flex justify-end border-t bg-background p-3">
                <DownloadPDFButton />
              </div>
            </SheetContent>
          </Sheet>

          {/* Descargar */}
          <div className="hidden sm:block">
            <DownloadPDFButton />
          </div>
          <Link to="/profile"
  className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
>
  <Avatar className="h-8 w-8">
    <AvatarImage
      src={user?.photoURL ?? ""}
      alt={user?.displayName ?? "Mi perfil"}
    />

    <AvatarFallback>
      {user?.displayName?.charAt(0).toUpperCase() ?? (
        <User className="h-4 w-4" />
      )}
    </AvatarFallback>
  </Avatar>

  <span className="hidden text-sm font-medium sm:inline">
    Mi perfil
  </span>
</Link>
        </div>
      </div>
    </header>
  );
}
