import { Button } from "@/components/ui/button";
import { useCV } from "@/context/cv-context";
import { useAuth } from "@/hooks/useAuth";
import { saveCV } from "@/services/cv.service";
import { defaultStyle, isPremiumTemplate } from "@/types/cv-types";
import { Crown, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


export function DownloadPDFButton() {
  const { data, template, currentCVId, setCurrentCVId, isPremium, openPremiumModal } = useCV();
  
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const requiresPremium = isPremiumTemplate(template) && !isPremium;

  async function handleDownload() {
    if (requiresPremium) {
      openPremiumModal();
      return;
    }
    setLoading(true);
    try {
      if (!currentCVId) {
        if (!user) {
          throw new Error("Usuario no autenticado.");
        }

        const id = await saveCV({
          userId: user.uid,

          title: data.personal.title
            ? `${data.personal.fullName} - ${data.personal.title}`
            : data.personal.fullName || "Nuevo CV",

          template,

          data,
        });

        setCurrentCVId(id);

        toast.success("CV guardado correctamente");
      }
      const [{ pdf }, { renderPDFDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./pdf-templates"),
      ]);
      const exportData = isPremium ? data : { ...data, style: defaultStyle };
      const doc = renderPDFDocument(template, exportData);
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = (data.personal.fullName || "cv").toLowerCase().replace(/\s+/g, "-");
      a.download = `${filename}-${template}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Error al generar el PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleDownload} disabled={loading} size="sm">
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : requiresPremium ? (
        <Crown className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {requiresPremium ? "Descargar (Premium)" : "Descargar PDF"}
    </Button>
  );
}
