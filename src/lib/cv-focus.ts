export const CV_FOCUS_EVENT = "cv:focus-field";

export interface CVFocusDetail {
  section: string;
  key?: string;
}

export function requestFieldFocus(path: string) {
  if (typeof window === "undefined") return;
  const [section, ...rest] = path.split(".");
  const key = rest.join(".") || undefined;
  window.dispatchEvent(
    new CustomEvent<CVFocusDetail>(CV_FOCUS_EVENT, { detail: { section, key } }),
  );
}
