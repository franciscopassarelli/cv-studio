import type { CVStyle } from "@/types/cv-types";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

type Style = Record<string, unknown>;

const FAMILIES = {
  sans: { regular: "Helvetica", bold: "Helvetica-Bold" },
  serif: { regular: "Times-Roman", bold: "Times-Bold" },
  mono: { regular: "Courier", bold: "Courier-Bold" },
} as const;

// Las mismas medidas que escala `zoom` en la vista previa (así ambas coinciden)
const SCALED =
  /^(fontSize|letterSpacing|width|height|minWidth|maxWidth|minHeight|maxHeight|gap|rowGap|columnGap|top|left|right|bottom|borderRadius|border\w*Width|padding\w*|margin\w*)$/;

function flatten(style: unknown): Style {
  if (!style) return {};
  if (Array.isArray(style)) return style.reduce<Style>((acc, s) => ({ ...acc, ...flatten(s) }), {});
  return style as Style;
}

function transformStyle(raw: unknown, cfg: CVStyle): Style {
  const out: Style = {};
  for (const [k, v] of Object.entries(flatten(raw))) {
    out[k] = typeof v === "number" && SCALED.test(k) ? v * cfg.fontScale : v;
  }
  const fam = FAMILIES[cfg.fontFamily as keyof typeof FAMILIES];
  if (fam && typeof out.fontFamily === "string") {
    out.fontFamily = out.fontFamily.endsWith("Bold") ? fam.bold : fam.regular;
  }
  return out;
}

function walk(node: ReactNode, cfg: CVStyle): ReactNode {
  if (Array.isArray(node)) return Children.map(node, (c) => walk(c, cfg)) as ReactNode;
  if (!isValidElement(node)) return node;

  const el = node as ReactElement<{ style?: unknown; children?: ReactNode }>;
  const { type, props } = el;

  // Componente de función: lo ejecutamos para llegar a los primitivos de react-pdf
  if (typeof type === "function") {
    return walk((type as (p: unknown) => ReactNode)(props), cfg);
  }

  const patch: { style?: Style } = {};
  if (props.style) patch.style = transformStyle(props.style, cfg);
  return cloneElement(el, patch, Children.map(props.children, (c) => walk(c, cfg)));
}

export function applyPdfStyle<T extends ReactElement>(doc: T, cfg: CVStyle): T {
  if (cfg.fontScale === 1 && cfg.fontFamily === "default") return doc;
  return walk(doc, cfg) as T;
}