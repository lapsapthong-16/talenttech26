import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  MessageCircleQuestion,
  ShieldCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Panel, Tag } from "@/components/ui";

const landingSignals: Array<[string, string, LucideIcon]> = [
  ["Proof-first", "Every claim starts with evidence.", ShieldCheck],
  ["Requirement-led", "Mapped to what employers actually ask for.", GraduationCap],
  ["Interview-ready", "Students see the questions they must defend.", CheckCircle2]
];

const proofSteps: Array<[string, string, string, string]> = [
  ["1", "Claim", "Role-specific resume bullet", "Coordinated event logistics and vendor communication for a student club activity."],
  ["2", "Proof", "Source experience", "Club event coordination, participant check-in notes, vendor message thread."],
  ["3", "Requirement", "Employer language", "Strong communication and coordination skills."],
  ["4", "Defense", "Interview prompt", "What did you personally coordinate, and what changed because of your work?"]
];

const demoModules: Array<[LucideIcon, string, string]> = [
  [ClipboardList, "Messy inputs", "Edit student wording from coursework, cafe work, and club events."],
  [FileText, "Role translation", "Select Marketing Intern, Business Analyst Intern, or Management Trainee."],
  [MessageCircleQuestion, "Proof gaps", "See clarification prompts before stronger claims are implied."]
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <section className="px-4 py-5 md:px-8">
        <div className="mx-auto max-w-[1480px]">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-5">
            <a className="font-serif text-3xl font-semibold" href="/">
              SkillProof
            </a>
            <nav className="hidden items-center gap-9 text-sm md:flex">
              <a className="hover:text-oxblood" href="#system">
                System
              </a>
              <a className="hover:text-oxblood" href="#student-flow">
                Student flow
              </a>
              <a className="hover:text-oxblood" href="#recruiter-view">
                Recruiter view
              </a>
            </nav>
            <a
              className="shrink-0 rounded-[5px] bg-oxblood px-4 py-3 text-sm font-medium text-white hover:bg-oxblood-dark sm:px-5"
              href="/demo"
            >
              Open demo
            </a>
          </header>

          <div className="grid gap-10 py-12 lg:min-h-[calc(100vh-92px)] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-16">
            <div className="min-w-0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">Student career proof system</p>
              <h1 className="max-w-[340px] font-serif text-[54px] leading-[0.9] tracking-normal sm:max-w-none sm:text-[72px] md:text-[116px]">
                SkillProof
              </h1>
              <p className="mt-7 max-w-[340px] font-serif text-[28px] leading-tight sm:max-w-xl sm:text-4xl md:text-5xl">
                Turn student experience into <span className="text-oxblood">proof-backed</span> resume claims
              </p>
              <div className="my-8 h-px w-20 bg-oxblood" />
              <p className="max-w-[340px] text-base leading-7 text-graphite sm:max-w-lg sm:text-lg sm:leading-8">
                SkillProof helps fresh grads translate coursework, part-time work, and campus activity into defensible claims that show source evidence, matched requirements, and interview defense prompts.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex w-full max-w-sm items-center justify-between rounded-[5px] bg-oxblood px-6 py-5 font-serif text-xl text-white hover:bg-oxblood-dark sm:w-auto sm:min-w-[260px]"
                  href="/demo"
                >
                  Open the demo <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-[5px] border border-hairline bg-white/70 px-6 py-5 text-sm font-medium hover:border-oxblood"
                  href="#system"
                >
                  See the system
                </a>
              </div>
            </div>

            <div id="system" className="min-w-0">
              <div className="mb-7 flex items-end justify-between border-b border-oxblood pb-3">
                <p className="font-serif text-xl">Claim &gt; Proof &gt; Requirement &gt; Defense</p>
                <p className="hidden text-sm text-graphite sm:block">The demo starts after this concept</p>
              </div>
              <div className="grid gap-5 md:grid-cols-4">
                {proofSteps.map(([number, title, subtitle, body]) => (
                  <Panel key={title} className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-oxblood text-sm font-semibold text-white">
                        {number}
                      </span>
                      <div>
                        <p className="font-serif text-2xl">{title}</p>
                        <p className="text-xs text-graphite">{subtitle}</p>
                      </div>
                    </div>
                    <p className="mt-7 text-sm font-medium leading-6">{body}</p>
                  </Panel>
                ))}
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {landingSignals.map(([title, copy, Icon]) => (
                  <div key={String(title)} className="flex gap-3">
                    <Icon className="mt-1 h-6 w-6 text-oxblood" />
                    <div>
                      <p className="font-serif text-lg">{title}</p>
                      <p className="text-sm leading-5 text-graphite">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section id="student-flow" className="border-t border-hairline py-12">
            <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">What the demo covers</p>
                <h2 className="mt-3 font-serif text-4xl leading-none md:text-5xl">A focused mock, not a generic resume builder</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {demoModules.map(([Icon, title, copy]) => (
                  <Panel key={String(title)} className="p-5">
                    <Icon className="h-6 w-6 text-oxblood" />
                    <p className="mt-5 font-serif text-2xl">{title}</p>
                    <p className="mt-3 text-sm leading-6 text-graphite">{copy}</p>
                  </Panel>
                ))}
              </div>
            </div>
          </section>

          <section id="recruiter-view" className="grid gap-6 border-t border-hairline py-12 lg:grid-cols-[1fr_1fr]">
            <Panel className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">Recruiter proof review</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-5xl">Evidence behind every generated bullet</h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-graphite">
                The recruiter surface reviews supported skills, skills needing clarification, experience sources used, and requirements covered by evidence. It avoids scores, rankings, and hiring recommendations.
              </p>
            </Panel>
            <Panel className="p-6">
              <p className="font-serif text-2xl">V1 boundaries</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["No ATS score", "No talent matching", "No fake readiness percentage", "No marketplace", "Static mock data"].map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
              <a
                className="mt-8 inline-flex items-center gap-2 rounded-[5px] bg-ink px-5 py-4 text-sm font-medium text-white hover:bg-oxblood"
                href="/demo"
              >
                Enter the interactive demo <ArrowRight className="h-4 w-4" />
              </a>
            </Panel>
          </section>
        </div>
      </section>
    </main>
  );
}
