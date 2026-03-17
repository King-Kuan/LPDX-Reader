import type { DocumentBlock } from "@/types/lpdx";

function renderBlock(block: DocumentBlock) {
  switch (block.type) {
    case "title":
      return <h1>{block.content}</h1>;
    case "heading":
      return <h2>{block.content}</h2>;
    case "quote":
      return <blockquote>{block.content}</blockquote>;
    case "checklist":
      return (
        <div className="flex items-start gap-3 rounded-[1.25rem] bg-white/5 px-4 py-3">
          <span
            className={`mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border text-xs font-bold ${
              block.checked ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-200" : "border-white/15 bg-white/5 text-white/80"
            }`}
          >
            {block.checked ? "✓" : "•"}
          </span>
          <p>{block.content}</p>
        </div>
      );
    case "paragraph":
    default:
      return <p>{block.content}</p>;
  }
}

export function BlocksView({ blocks }: { blocks: DocumentBlock[] }) {
  return (
    <section className="glass rounded-[2rem] p-5 md:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--muted)]">Reading view</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">Document content</h2>
        </div>
        <span className="badge">{blocks.length} blocks</span>
      </div>

      <article className="reader-prose">
        {blocks.map((block) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </article>
    </section>
  );
}
