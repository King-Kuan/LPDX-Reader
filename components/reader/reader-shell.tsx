"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, BookOpenText, FileText, Gauge, Sparkles } from "lucide-react";
import { parseLpdx, countWords, estimateReadingMinutes } from "@/lib/lpdx";
import { getRecents, saveRecent } from "@/lib/storage";
import type { LpdxPayload, RecentFileEntry } from "@/types/lpdx";
import { Dropzone } from "@/components/reader/dropzone";
import { MetaPanel } from "@/components/reader/meta-panel";
import { BlocksView } from "@/components/reader/blocks-view";
import { RecentFiles } from "@/components/reader/recent-files";
import { StatCard } from "@/components/ui/stat-card";

export function ReaderShell() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [payload, setPayload] = useState<LpdxPayload | null>(null);
  const [fileName, setFileName] = useState("No file opened");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [recents, setRecents] = useState<RecentFileEntry[]>([]);

  useEffect(() => {
    setRecents(getRecents());
  }, []);

  const stats = useMemo(() => {
    if (!payload) return null;
    const words = countWords(payload.document);
    return {
      words,
      blocks: payload.document.blocks.length,
      minutes: estimateReadingMinutes(words),
      tags: payload.document.meta.tags.length,
    };
  }, [payload]);

  async function openFile(file: File) {
    try {
      setError(null);
      const text = await file.text();
      const parsed = parseLpdx(text);
      setPayload(parsed);
      setFileName(file.name);

      const words = countWords(parsed.document);
      const entry: RecentFileEntry = {
        id: parsed.document.id,
        name: file.name,
        openedAt: new Date().toISOString(),
        title: parsed.document.meta.title,
        author: parsed.document.meta.author,
        updatedAt: parsed.document.meta.updatedAt,
        words,
      };

      saveRecent(entry);
      setRecents(getRecents());
    } catch (err) {
      setPayload(null);
      setFileName(file.name);
      setError(err instanceof Error ? err.message : "Unable to open this file.");
    }
  }

  return (
    <div
      className="grid gap-4"
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file) void openFile(file);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".lpdx,application/json"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void openFile(file);
          event.currentTarget.value = "";
        }}
      />

      <Dropzone isDragging={dragging} onBrowse={() => inputRef.current?.click()} />

      {error ? (
        <div className="glass rounded-[1.6rem] border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5" size={18} />
            <div>
              <p className="font-medium">Could not open file</p>
              <p className="mt-1 text-red-100/85">{error}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.95fr]">
        <div className="grid gap-4">
          {payload && stats ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Words" value={stats.words} hint="Counted from all blocks" />
                <StatCard label="Reading time" value={`${stats.minutes} min`} hint="Based on average pace" />
                <StatCard label="Blocks" value={stats.blocks} hint="Structured document sections" />
                <StatCard label="Tags" value={stats.tags} hint="Metadata labels" />
              </div>
              <BlocksView blocks={payload.document.blocks} />
            </>
          ) : (
            <section className="glass rounded-[2rem] p-5 md:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white/5 p-4">
                  <BookOpenText size={22} />
                  <h3 className="mt-4 text-lg font-semibold">Ready to read</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    Open any `.lpdx` file and LightDoc Reader will show it in a clean reader view that works well on phones, tablets, and desktops.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white/5 p-4">
                  <Gauge size={22} />
                  <h3 className="mt-4 text-lg font-semibold">Fast and local</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    Documents are parsed in your browser for a quick reading flow. No backend is required for the basic experience.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white/5 p-4">
                  <FileText size={22} />
                  <h3 className="mt-4 text-lg font-semibold">Format aware</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    The app checks that the file matches the Light Progressive Document Exchange structure before rendering it.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white/5 p-4">
                  <Sparkles size={22} />
                  <h3 className="mt-4 text-lg font-semibold">Made for Android screens</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    The layout collapses smoothly for narrow displays, making it ready for future Android packaging and mobile web use.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="grid gap-4">
          {payload ? <MetaPanel payload={payload} fileName={fileName} /> : null}
          <RecentFiles recents={recents} />
        </div>
      </div>
    </div>
  );
}
