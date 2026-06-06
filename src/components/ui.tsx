import type { ReactNode } from "react";
import { getMatchStatusClass } from "@/lib/skillproof";
import type { MatchStatus } from "@/types/skillproof";

export function BrowserFrame({
  children,
  url = "skillproof.my/demo/proofs"
}: {
  children: ReactNode;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-hairline bg-canvas shadow-panel">
      <div className="flex items-center gap-3 border-b border-hairline bg-[#151515] px-5 py-3 text-white">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto w-full max-w-md rounded-[8px] bg-white/10 px-4 py-1 text-center text-xs text-white/80">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: MatchStatus }) {
  return (
    <span className={`inline-flex rounded-[5px] border px-2.5 py-1 text-xs font-medium ${getMatchStatusClass(status)}`}>
      {status}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-[5px] border border-violet/15 bg-violet-soft px-2 py-1 text-xs font-medium text-violet">{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mb-7 border-b border-hairline pb-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-none text-ink md:text-5xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite md:text-base">{copy}</p>
    </div>
  );
}

export function Panel({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`rounded-[8px] border border-hairline bg-white/76 shadow-[0_1px_0_rgba(255,255,255,0.82)_inset] ${className}`}>{children}</div>;
}

export function SourceChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[5px] border border-cyan/20 bg-cyan-soft px-2.5 py-1 text-xs font-medium text-cyan">
      {children}
    </span>
  );
}
