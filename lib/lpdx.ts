import type { LpdxPayload, LightDoc } from "@/types/lpdx";

export function parseLpdx(raw: string): LpdxPayload {
  const parsed = JSON.parse(raw) as Partial<LpdxPayload>;

  if (parsed.format !== "lpdx" || !parsed.document || !parsed.document.meta || !Array.isArray(parsed.document.blocks)) {
    throw new Error("Invalid LPDX file. This file does not match the Light Progressive Document Exchange format.");
  }

  return {
    format: "lpdx",
    version: typeof parsed.version === "number" ? parsed.version : 1,
    app: parsed.app,
    rightsHolder: parsed.rightsHolder,
    exportedAt: parsed.exportedAt,
    document: sanitizeDocument(parsed.document),
  };
}

function sanitizeDocument(document: LightDoc): LightDoc {
  return {
    id: document.id || cryptoFallback(),
    starred: Boolean(document.starred),
    meta: {
      title: document.meta?.title?.trim() || "Untitled LightDoc",
      description: document.meta?.description?.trim() || "",
      author: document.meta?.author?.trim() || "Unknown author",
      updatedAt: document.meta?.updatedAt || new Date().toISOString(),
      theme: document.meta?.theme || "midnight",
      tags: Array.isArray(document.meta?.tags) ? document.meta.tags.filter(Boolean) : [],
    },
    blocks: Array.isArray(document.blocks)
      ? document.blocks.map((block, index) => ({
          id: block.id || `${index + 1}`,
          type: block.type || "paragraph",
          content: typeof block.content === "string" ? block.content : "",
          checked: typeof block.checked === "boolean" ? block.checked : undefined,
        }))
      : [],
  };
}

function cryptoFallback() {
  return `doc-${Math.random().toString(36).slice(2, 10)}`;
}

export function countWords(document: LightDoc) {
  const text = document.blocks.map((block) => block.content).join(" ").trim();
  return text ? text.split(/\s+/).length : 0;
}

export function estimateReadingMinutes(words: number) {
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(input?: string) {
  if (!input) return "Unknown date";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
