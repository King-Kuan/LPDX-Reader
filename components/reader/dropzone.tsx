"use client";

import { FileArchive, Upload } from "lucide-react";

interface DropzoneProps {
  isDragging: boolean;
  onBrowse: () => void;
}

export function Dropzone({ isDragging, onBrowse }: DropzoneProps) {
  return (
    <section className={`dropzone rounded-[2rem] p-5 md:p-7 ${isDragging ? "scale-[1.01]" : ""} transition`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="badge">
            <FileArchive size={14} /> Supported file: .lpdx
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Drop a LightDoc file here, or open one from your device.
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
            The reader processes your document in the browser, shows metadata, and renders every block in a mobile-friendly layout.
          </p>
        </div>

        <button
          type="button"
          onClick={onBrowse}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-slate-900 shadow-xl transition hover:-translate-y-0.5"
        >
          <Upload size={18} /> Open .lpdx file
        </button>
      </div>
    </section>
  );
}
