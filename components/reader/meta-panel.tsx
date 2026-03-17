import { FileBadge2, PenLine, Star, Tag } from "lucide-react";
import { formatDate } from "@/lib/lpdx";
import type { LpdxPayload } from "@/types/lpdx";

export function MetaPanel({ payload, fileName }: { payload: LpdxPayload; fileName: string }) {
  const { document } = payload;

  return (
    <aside className="glass rounded-[2rem] p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/10 p-3">
          <FileBadge2 size={20} />
        </div>
        <div>
          <p className="text-sm text-[var(--muted)]">Current file</p>
          <p className="font-medium">{fileName}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 text-sm">
        <div>
          <p className="text-[var(--muted)]">Title</p>
          <p className="mt-1 font-medium text-white">{document.meta.title}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Description</p>
          <p className="mt-1 leading-6 text-[#d8e0f9]">{document.meta.description || "No description"}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-3">
            <div className="flex items-center gap-2 text-[var(--muted)]"><PenLine size={14} /> Author</div>
            <p className="mt-2 font-medium">{document.meta.author || "Unknown"}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <div className="flex items-center gap-2 text-[var(--muted)]"><Star size={14} /> Starred</div>
            <p className="mt-2 font-medium">{document.starred ? "Yes" : "No"}</p>
          </div>
        </div>

        <div>
          <p className="text-[var(--muted)]">Updated</p>
          <p className="mt-1 font-medium">{formatDate(document.meta.updatedAt)}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Exported</p>
          <p className="mt-1 font-medium">{formatDate(payload.exportedAt)}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Format</p>
          <p className="mt-1 font-medium">LPDX v{payload.version}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Source app</p>
          <p className="mt-1 font-medium">{payload.app || "Unknown app"}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Rights holder</p>
          <p className="mt-1 font-medium">{payload.rightsHolder || "Not specified"}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-[var(--muted)]"><Tag size={14} /> Tags</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {document.meta.tags.length ? (
              document.meta.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#d9e2ff]">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--muted)]">No tags</span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
