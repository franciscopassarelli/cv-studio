import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";




if (!admin.apps.length) {
  admin.initializeApp();
}



const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-flash-latest";

const nanoid = () => Math.random().toString(36).slice(2, 8);

const CV_JSON_SCHEMA = `{
  "personal": {
    "fullName": string, "title": string, "email": string, "phone": string,
    "location": string, "website": string, "linkedin": string, "github": string, "summary": string
  },
  "experience": [{ "company": string, "role": string, "location": string,
    "startDate": "YYYY-MM", "endDate": "YYYY-MM o vacío", "current": boolean, "description": string }],
  "education": [{ "institution": string, "degree": string, "field": string,
    "startDate": "YYYY-MM", "endDate": "YYYY-MM", "description": string }],
  "technologies": [{ "name": string }],
  "skills": [{ "name": string, "level": number (1-5) }],
  "certifications": [{ "name": string, "issuer": string, "date": "YYYY-MM" }],
  "languages": [{ "name": string, "level": string }]
}`;

export const importCV = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido." });
    return;
  }

  try {
    // Autenticación: requerimos que el usuario esté logueado
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      res.status(401).json({ error: "Falta el token de autenticación." });
      return;
    }

    let uid: string;
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      uid = decoded.uid;
    } catch {
      res.status(401).json({ error: "Token inválido." });
      return;
    }

    const { fileBase64 } = req.body;

    if (!fileBase64) {
      res.status(400).json({ error: "Falta el archivo PDF." });
      return;
    }

    if (!GEMINI_API_KEY) {
      logger.error("GEMINI_API_KEY no configurada");
      res.status(500).json({ error: "Servicio de importación no disponible." });
      return;
    }

    const buffer = Buffer.from(fileBase64, "base64");

    if (buffer.length > 5 * 1024 * 1024) {
      res.status(400).json({ error: "El archivo supera los 5MB permitidos." });
      return;
    }
const { PDFParse } = await import("pdf-parse");
 const parser = new PDFParse({ data: buffer });
const parsedPdf = await parser.getText();
await parser.destroy();

const rawText = parsedPdf.text.slice(0, 15000);

if (!rawText.trim()) {
  res.status(422).json({ error: "No se pudo extraer texto del PDF." });
  return;
}
    if (!rawText.trim()) {
      res.status(422).json({ error: "No se pudo extraer texto del PDF." });
      return;
    }

    logger.info("Texto extraído del CV", { uid, length: rawText.length });

    const prompt = `Sos un asistente que extrae información de currículums.
A partir del siguiente texto extraído de un PDF, devolvé ÚNICAMENTE un JSON válido (sin markdown, sin backticks, sin explicaciones) con esta forma exacta:

${CV_JSON_SCHEMA}

Reglas:
- Si un dato no aparece en el texto, dejalo como "" (o [] en arrays).
- Las fechas deben tener formato "YYYY-MM". Si solo hay año, usá "YYYY-01".
- "current" es true solo si el texto indica que es el trabajo actual (ej: "Presente", "Actualidad").
- "level" en skills es un número del 1 al 5 según relevancia; si no hay forma de saberlo, usá 3.
- No inventes datos que no estén en el texto.

Texto del CV:
"""
${rawText}
"""`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      logger.error("Error de Gemini", errText);
      res.status(502).json({ error: "Error al procesar el CV con IA." });
      return;
    }

    const geminiData = await geminiResponse.json();
    const textOutput = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textOutput) {
      logger.error("Respuesta vacía de Gemini", geminiData);
      res.status(502).json({ error: "La IA no devolvió resultados." });
      return;
    }

    let extracted: any;
    try {
      extracted = JSON.parse(textOutput);
    } catch {
      logger.error("JSON inválido de Gemini", textOutput);
      res.status(502).json({ error: "No se pudo interpretar la respuesta de la IA." });
      return;
    }

    const cvData = {
      personal: {
        fullName: extracted?.personal?.fullName ?? "",
        title: extracted?.personal?.title ?? "",
        email: extracted?.personal?.email ?? "",
        phone: extracted?.personal?.phone ?? "",
        location: extracted?.personal?.location ?? "",
        website: extracted?.personal?.website ?? "",
        linkedin: extracted?.personal?.linkedin ?? "",
        github: extracted?.personal?.github ?? "",
        summary: extracted?.personal?.summary ?? "",
      },
      experience: (extracted?.experience ?? []).map((e: any) => ({
        id: nanoid(),
        company: e?.company ?? "",
        role: e?.role ?? "",
        location: e?.location ?? "",
        startDate: e?.startDate ?? "",
        endDate: e?.endDate ?? "",
        current: Boolean(e?.current),
        description: e?.description ?? "",
      })),
      education: (extracted?.education ?? []).map((e: any) => ({
        id: nanoid(),
        institution: e?.institution ?? "",
        degree: e?.degree ?? "",
        field: e?.field ?? "",
        startDate: e?.startDate ?? "",
        endDate: e?.endDate ?? "",
        description: e?.description ?? "",
      })),
      technologies: (extracted?.technologies ?? []).map((t: any) => ({
        id: nanoid(),
        name: t?.name ?? "",
      })),
      skills: (extracted?.skills ?? []).map((s: any) => ({
        id: nanoid(),
        name: s?.name ?? "",
        level: typeof s?.level === "number" ? s.level : 3,
      })),
      certifications: (extracted?.certifications ?? []).map((c: any) => ({
        id: nanoid(),
        name: c?.name ?? "",
        issuer: c?.issuer ?? "",
        date: c?.date ?? "",
      })),
      languages: (extracted?.languages ?? []).map((l: any) => ({
        id: nanoid(),
        name: l?.name ?? "",
        level: l?.level ?? "",
      })),
      accent: "#2563eb",
    };

    logger.info("CV importado correctamente", { uid });

    res.status(200).json({ success: true, data: cvData });
  } catch (error) {
    logger.error("Error al importar CV", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : JSON.stringify(error),
    });
  }
});