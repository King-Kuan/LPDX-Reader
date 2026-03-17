import Image from "next/image";
import { APP_NAME, RIGHTS_HOLDER } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="glass rounded-[2rem] px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
          <Image src="/icon.svg" alt="LightDoc Reader icon" width={44} height={44} priority />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight md:text-2xl">{APP_NAME}</h1>
            <span className="badge">.lpdx viewer</span>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)] md:text-base">
            Open Light Progressive Document Exchange files with a clean reading experience.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
        <span className="badge">
          <ShieldCheck size={14} /> Rights holder: {RIGHTS_HOLDER}
        </span>
        <span className="badge">Android responsive</span>
        <span className="badge">Static-host ready</span>
      </div>
    </header>
  );
}
