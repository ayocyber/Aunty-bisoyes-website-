import { site } from "./site";

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Opens a WhatsApp chat with the concierge, pre-filled with `text`.
 * Falls back to navigating the current tab if a popup blocker stops the new tab.
 */
export function openWhatsApp(text: string) {
  const url = whatsappUrl(text);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}

/** Formats labelled fields as a WhatsApp message, skipping empty values. */
export function formatMessage(heading: string, fields: [string, string | undefined | null][]) {
  const lines = fields.filter(([, v]) => v && v.trim()).map(([k, v]) => `*${k}:* ${v}`);
  return [`*${heading}*`, "", ...lines].join("\n");
}
