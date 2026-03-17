import { RECENTS_STORAGE_KEY } from "@/lib/constants";
import type { RecentFileEntry } from "@/types/lpdx";

export function getRecents(): RecentFileEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(RECENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentFileEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecent(entry: RecentFileEntry) {
  if (typeof window === "undefined") return;

  const current = getRecents().filter((item) => item.id !== entry.id);
  const next = [entry, ...current].slice(0, 8);
  window.localStorage.setItem(RECENTS_STORAGE_KEY, JSON.stringify(next));
}
