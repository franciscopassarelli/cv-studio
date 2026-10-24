import { defaultStyle, type CVData, type TemplateId } from "@/types/cv-types";

export async function downloadCVPdf(template: TemplateId, data: CVData, isPremium: boolean) {
  const [{ pdf }, { renderPDFDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/cv/pdf-templates"),
  ]);

  // El gate premium también va acá: un free siempre exporta con el estilo por defecto
  const exportData = isPremium ? data : { ...data, style: defaultStyle };
  const blob = await pdf(renderPDFDocument(template, exportData)).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const filename = (data.personal.fullName || "cv").toLowerCase().replace(/\s+/g, "-");
  a.download = `${filename}-${template}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}