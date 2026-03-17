import { Header } from "@/components/layout/header";
import { ReaderShell } from "@/components/reader/reader-shell";

export default function HomePage() {
  return (
    <main className="shell">
      <div className="grid gap-4">
        <Header />
        <ReaderShell />
      </div>
    </main>
  );
}
