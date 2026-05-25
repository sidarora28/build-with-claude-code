import { CostCounter } from '@/components/CostCounter';
import { SummarySection } from '@/components/SummarySection';
import { ActionItemsSection } from '@/components/ActionItemsSection';
import { AskSection } from '@/components/AskSection';
import { LiveStreamSection } from '@/components/LiveStreamSection';
import { SourcesSection } from '@/components/SourcesSection';
import { ConnectionsSidebar } from '@/components/ConnectionsSidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">Daily Brain</h1>
            <p className="text-xs text-zinc-500">Your local second brain — built with Claude Code</p>
          </div>
          <CostCounter />
        </div>
      </header>

      {/* Main grid */}
      <main className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          {/* Main column */}
          <div className="space-y-6">
            <SummarySection />
            <ActionItemsSection />
            <AskSection />
            <LiveStreamSection />
            <SourcesSection />
          </div>

          {/* Right rail */}
          <aside>
            <ConnectionsSidebar />
          </aside>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-8 text-xs text-zinc-400">
        Running locally on your laptop. Files live in <code>course/data/meetings/</code>. Nothing leaves your machine except your prompts to Claude.
      </footer>
    </div>
  );
}
