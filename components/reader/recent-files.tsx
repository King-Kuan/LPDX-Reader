import { Clock3 } from "lucide-react";
import { formatDate } from "@/lib/lpdx";
import type { RecentFileEntry } from "@/types/lpdx";

export function RecentFiles({ recents }: { recents: RecentFileEntry[] }) {
  return (
    <section className="glass rounded-[2rem] p-5">
      <div className="flex items-center gap-2">
        <Clock3 size={18} />
        <h2 className="text-lg font-semibold tracking-tight">Recent files</h2>
      </div>

      <div className="mt-4 grid gap-3">
        {recents.length ? (
          recents.map((entry) => (
            <article key={entry.id} className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{entry.title}</p>
                  <p className="truncate text-sm text-[var(--muted)]">{entry.name}</p>
                </div>
                <span className="badge">{entry.words} words</span>
              </div>
              <div className="mt-3 text-sm text-[var(--muted)]">
                <p>Author: {entry.author}</p>
                <p>Updated: {formatDate(entry.updatedAt)}</p>
                <p>Opened: {formatDate(entry.openedAt)}</p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-sm text-[var(--muted)]">No recently opened .lpdx files yet.</p>
        )}
      </div>
    </section>
  );
}
