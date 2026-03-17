export type BlockType = "title" | "heading" | "paragraph" | "quote" | "checklist";

export interface DocumentBlock {
  id: string;
  type: BlockType;
  content: string;
  checked?: boolean;
}

export interface DocumentMeta {
  title: string;
  description: string;
  author: string;
  updatedAt: string;
  theme: "midnight" | "royal" | "emerald" | string;
  tags: string[];
}

export interface LightDoc {
  id: string;
  meta: DocumentMeta;
  blocks: DocumentBlock[];
  starred: boolean;
}

export interface LpdxPayload {
  format: "lpdx";
  version: number;
  app?: string;
  rightsHolder?: string;
  exportedAt?: string;
  document: LightDoc;
}

export interface RecentFileEntry {
  id: string;
  name: string;
  openedAt: string;
  title: string;
  author: string;
  updatedAt: string;
  words: number;
}
