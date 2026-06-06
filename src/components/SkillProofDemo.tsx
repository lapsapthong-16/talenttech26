"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Bell,
  CheckCircle2,
  ClipboardList,
  Database,
  FileText,
  Filter,
  LineChart,
  MessageCircleQuestion,
  Pencil,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { applicationPacks, experiences as seededExperiences, jobs, switchLensFrames } from "@/lib/demoData";
import { getApplicationPack, getCoverageCounts, getExperience, getJob, getLensFrame, getRequirement } from "@/lib/skillproof";
import type { ExperienceCard, SkillProofCard } from "@/types/skillproof";
import { Panel, SectionHeader, SourceChip, StatusBadge, Tag } from "@/components/ui";

const storySteps: Array<[string, string, string]> = [
  ["01", "Start with weak evidence", "The student writes what they actually remember, not polished resume language."],
  ["02", "Pick the target role", "SkillProof reads the employer's requirements before it rewrites anything."],
  ["03", "Build a claim chain", "Every resume bullet keeps its source proof, matched requirement, and defense question attached."],
  ["04", "Review without scoring", "Recruiters see evidence links and gaps, not fake readiness percentages."]
];

const quickLinks = [
  ["Story", "#story"],
  ["Workspace", "#workspace"],
  ["Claim chain", "#claim-chain"],
  ["Proof library", "#proof-library"],
  ["Recruiter", "#recruiter"]
];

export default function SkillProofDemo() {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);
  const [selectedProofId, setSelectedProofId] = useState(applicationPacks[jobs[0].id].skillProofCards[0].id);
  const [selectedClaimId, setSelectedClaimId] = useState(applicationPacks[jobs[0].id].claimProofChains[0].id);
  const [draftExperiences, setDraftExperiences] = useState<ExperienceCard[]>(seededExperiences);

  const job = getJob(selectedJobId);
  const pack = getApplicationPack(selectedJobId);
  const selectedProof = pack.skillProofCards.find((card) => card.id === selectedProofId) ?? pack.skillProofCards[0];
  const selectedChain = pack.claimProofChains.find((chain) => chain.id === selectedClaimId) ?? pack.claimProofChains[0];
  const selectedBullet = pack.proofBackedBullets.find((bullet) => bullet.id === selectedChain.generatedBulletId) ?? pack.proofBackedBullets[0];
  const selectedRequirement = getRequirement(selectedJobId, selectedChain.linkedRequirementId);
  const selectedExperience = getExperience(selectedChain.sourceExperienceId);
  const lensFrame = getLensFrame(selectedJobId);
  const coverageCounts = useMemo(() => getCoverageCounts(selectedJobId), [selectedJobId]);

  function selectJob(jobId: string) {
    const nextPack = getApplicationPack(jobId);
    setSelectedJobId(jobId);
    setSelectedProofId(nextPack.skillProofCards[0].id);
    setSelectedClaimId(nextPack.claimProofChains[0].id);
  }

  function updateExperience(id: string, value: string) {
    setDraftExperiences((current) =>
      current.map((experience) => (experience.id === id ? { ...experience, messyWording: value } : experience))
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <AppTopNav />
      <section className="px-4 pb-10 pt-6 md:px-8 md:pb-12">
        <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[8px] border border-hairline bg-white/46 shadow-panel">
          <StoryHero
            job={job}
            pack={pack}
            selectedBullet={selectedBullet}
            selectedExperience={selectedExperience}
            selectedRequirement={selectedRequirement}
          />
          <StoryRail />
        </div>
      </section>

      <section id="workspace" className="px-4 pb-10 md:px-8">
        <div className="mx-auto grid max-w-[1480px] gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)]">
          <StudentInputPanel draftExperiences={draftExperiences} updateExperience={updateExperience} />
          <RolePanel job={job} selectedJobId={selectedJobId} selectJob={selectJob} coverageCounts={coverageCounts} pack={pack} />
        </div>
      </section>

      <section id="claim-chain" className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-[1480px]">
          <ClaimProofChain
            pack={pack}
            selectedClaimId={selectedClaimId}
            setSelectedClaimId={setSelectedClaimId}
            selectedBullet={selectedBullet}
            selectedExperience={selectedExperience}
            selectedRequirement={selectedRequirement}
            selectedChain={selectedChain}
          />
        </div>
      </section>

      <section id="resume" className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-[1480px]">
          <BeforeAfter pack={pack} selectedJobTitle={job.title} />
        </div>
      </section>

      <section id="proof-library" className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-[1480px]">
          <ProofLibrary
            cards={pack.skillProofCards}
            selectedProof={selectedProof}
            setSelectedProofId={setSelectedProofId}
            selectedJobId={selectedJobId}
          />
        </div>
      </section>

      <section id="interrogation" className="px-4 pb-10 md:px-8">
        <InterrogationAndLens
          pack={pack}
          lensFrame={lensFrame}
          selectedJobId={selectedJobId}
          selectJob={selectJob}
          draftExperiences={draftExperiences}
        />
      </section>

      <section id="recruiter" className="px-4 pb-16 md:px-8 md:pb-24">
        <RecruiterReview selectedJobId={selectedJobId} pack={pack} />
      </section>
    </main>
  );
}

function AppTopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/92 px-4 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-5 py-5">
        <a className="font-serif text-3xl font-semibold" href="/">
          SkillProof
        </a>
        <nav className="flex flex-wrap gap-4 text-sm md:gap-6">
          {quickLinks.map(([label, href]) => (
            <a key={label} href={href} className="rounded-[5px] px-1 py-2 text-graphite transition hover:text-oxblood">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-graphite" />
          <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-ink text-xs font-semibold text-white">AM</span>
        </div>
      </div>
    </header>
  );
}

function StoryHero({
  job,
  pack,
  selectedBullet,
  selectedExperience,
  selectedRequirement
}: {
  job: ReturnType<typeof getJob>;
  pack: ReturnType<typeof getApplicationPack>;
  selectedBullet: ReturnType<typeof getApplicationPack>["proofBackedBullets"][number];
  selectedExperience: ExperienceCard;
  selectedRequirement: ReturnType<typeof getRequirement>;
}) {
  return (
    <section id="story" className="grid gap-8 px-5 py-8 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-12">
      <div className="flex min-h-[560px] flex-col justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">Guided product story</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[52px] leading-[0.92] md:text-[86px]">
            Stop asking students to sound employable from memory.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-graphite">
            SkillProof starts with ordinary student experience, checks it against a target role, and only generates claims that can be traced back to proof.
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Metric label="Target role" value={job.title} />
          <Metric label="Proof cards" value={String(pack.skillProofCards.length)} />
          <Metric label="First source" value={selectedExperience.sourceType} />
        </div>
      </div>

      <div className="grid content-start gap-4">
        <div className="rounded-[8px] border border-hairline bg-white/70 p-5 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">The transformation</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="rounded-[6px] border border-hairline bg-canvas p-4">
              <p className="text-xs font-semibold text-graphite">Student starts with</p>
              <p className="mt-4 font-serif text-3xl leading-tight">{selectedExperience.messyWording}</p>
              <p className="mt-5 text-sm leading-6 text-graphite">
                This is honest, but too vague for a recruiter and too weak for an interview.
              </p>
            </div>
            <div className="rounded-[6px] border border-oxblood bg-white p-4">
              <p className="text-xs font-semibold text-oxblood">SkillProof turns it into</p>
              <p className="mt-4 text-lg font-semibold leading-7">{selectedBullet.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <SourceChip>{selectedExperience.title}</SourceChip>
                <SourceChip>{selectedRequirement.label}</SourceChip>
              </div>
            </div>
          </div>
        </div>

        <Panel className="p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <Explanation icon={ClipboardList} title="No blind rewrite" copy="The app keeps the weak original visible." />
            <Explanation icon={LineChart} title="No vague matching" copy="Each claim maps to one employer requirement." />
            <Explanation icon={MessageCircleQuestion} title="No fake certainty" copy="Missing proof becomes a question, not a score." />
          </div>
        </Panel>
      </div>
    </section>
  );
}

function StoryRail() {
  return (
    <section className="border-t border-hairline bg-white/45 px-5 py-5 md:px-8">
      <div className="grid gap-3 lg:grid-cols-4">
        {storySteps.map(([number, title, copy]) => (
          <div key={number} className="rounded-[6px] border border-hairline bg-canvas p-4">
            <p className="font-mono text-xs text-oxblood">{number}</p>
            <p className="mt-3 font-serif text-xl">{title}</p>
            <p className="mt-2 text-sm leading-6 text-graphite">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-hairline pt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite">{label}</p>
      <p className="mt-2 font-serif text-2xl leading-tight">{value}</p>
    </div>
  );
}

function Explanation({ icon: Icon, title, copy }: { icon: LucideIcon; title: string; copy: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-oxblood" />
      <div>
        <p className="font-serif text-xl">{title}</p>
        <p className="mt-1 text-sm leading-6 text-graphite">{copy}</p>
      </div>
    </div>
  );
}

function StudentInputPanel({
  draftExperiences,
  updateExperience
}: {
  draftExperiences: ExperienceCard[];
  updateExperience: (id: string, value: string) => void;
}) {
  return (
    <Panel className="p-5 md:p-6">
      <SectionHeader
        eyebrow="Step 1"
        title="Capture what the student actually has"
        copy="The interface should feel like an evidence intake, not a resume generator. Students can start messy and still know what proof matters."
      />
      <div className="space-y-4">
        {draftExperiences.map((experience) => (
          <article key={experience.id} className="rounded-[7px] border border-hairline bg-canvas p-4">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-2xl leading-tight">{experience.title}</p>
                <p className="mt-1 text-sm text-graphite">
                  {experience.sourceType} · {experience.institution} · {experience.date}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-oxblood" htmlFor={`${experience.id}-wording`}>
              Student wording
            </label>
            <textarea
              id={`${experience.id}-wording`}
              value={experience.messyWording}
              onChange={(event) => updateExperience(experience.id, event.target.value)}
              className="mt-2 min-h-[78px] w-full resize-none rounded-[6px] border border-hairline bg-white/80 p-3 text-sm outline-none transition focus:border-oxblood focus:ring-2 focus:ring-oxblood/10"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <EvidenceList title="Signals found" items={experience.extractedSignals} />
              <EvidenceList title="Proof sources" items={experience.evidenceNotes} />
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function EvidenceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite">{title}</p>
      <p className="mt-2 text-sm leading-6 text-graphite">{items.join(" · ")}</p>
    </div>
  );
}

function RolePanel({
  job,
  selectedJobId,
  selectJob,
  coverageCounts,
  pack
}: {
  job: ReturnType<typeof getJob>;
  selectedJobId: string;
  selectJob: (id: string) => void;
  coverageCounts: ReturnType<typeof getCoverageCounts>;
  pack: ReturnType<typeof getApplicationPack>;
}) {
  return (
    <div className="space-y-6">
      <Panel className="p-5 md:p-6">
        <SectionHeader
          eyebrow="Step 2"
          title="Translate against a real role"
          copy="The role comes before the rewrite, so the student sees why one experience becomes research, coordination, or customer proof."
        />
        <div className="grid gap-3">
          {jobs.map((item) => (
            <button
              key={item.id}
              onClick={() => selectJob(item.id)}
              className={`rounded-[6px] border p-4 text-left transition hover:-translate-y-0.5 ${
                selectedJobId === item.id ? "border-oxblood bg-white shadow-panel" : "border-hairline bg-canvas hover:bg-white/80"
              }`}
            >
              <span className="flex items-center justify-between gap-4">
                <span>
                  <span className="block font-serif text-2xl leading-tight">{item.title}</span>
                  <span className="mt-1 block text-sm text-graphite">
                    {item.company} · {item.location}
                  </span>
                </span>
                {selectedJobId === item.id ? <CheckCircle2 className="h-5 w-5 text-oxblood" /> : null}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-graphite">{job.description}</p>
      </Panel>

      <Panel className="p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">Requirement coverage</p>
            <h3 className="mt-2 font-serif text-3xl leading-none">What is proven, possible, or missing</h3>
          </div>
          <LineChart className="h-6 w-6 text-oxblood" />
        </div>
        <div className="mb-5 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {Object.entries(coverageCounts).map(([status, count]) => (
            <div key={status} className="rounded-[6px] border border-hairline bg-canvas p-3">
              <p className="font-serif text-2xl">{count}</p>
              <p className="text-graphite">{status}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {pack.requirementCoverage.map((match) => {
            const requirement = getRequirement(job.id, match.requirementId);
            return (
              <div key={match.requirementId} className="rounded-[6px] border border-hairline bg-white/70 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium">{requirement.label}</p>
                  <StatusBadge status={match.status} />
                </div>
                <p className="mt-2 text-xs leading-5 text-graphite">{match.explanation}</p>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function ClaimProofChain({
  pack,
  selectedClaimId,
  setSelectedClaimId,
  selectedBullet,
  selectedExperience,
  selectedRequirement,
  selectedChain
}: {
  pack: ReturnType<typeof getApplicationPack>;
  selectedClaimId: string;
  setSelectedClaimId: (id: string) => void;
  selectedBullet: ReturnType<typeof getApplicationPack>["proofBackedBullets"][number];
  selectedExperience: ExperienceCard;
  selectedRequirement: ReturnType<typeof getRequirement>;
  selectedChain: ReturnType<typeof getApplicationPack>["claimProofChains"][number];
}) {
  return (
    <Panel className="p-5 md:p-6">
      <SectionHeader
        eyebrow="Step 3"
        title="Show the claim chain before showing the dashboard"
        copy="This is the core product idea: every generated sentence has a visible path back to source evidence and a question the student must be ready to answer."
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {pack.claimProofChains.map((chain, index) => (
          <button
            key={chain.id}
            onClick={() => setSelectedClaimId(chain.id)}
            className={`rounded-[5px] border px-3 py-2 text-sm transition ${
              selectedClaimId === chain.id ? "border-oxblood bg-oxblood text-white" : "border-hairline bg-white hover:border-oxblood"
            }`}
          >
            Claim {index + 1}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ProofStep number="1" title="Claim" body={selectedBullet.text} footer="Generated resume bullet" />
        <ProofStep
          number="2"
          title="Proof"
          body={selectedChain.proofDetail}
          footer={`${selectedExperience.title} · ${selectedExperience.sourceType}`}
        />
        <ProofStep number="3" title="Requirement" body={selectedRequirement.label} footer={selectedRequirement.sourcePhrase} />
        <ProofStep
          number="4"
          title="Defense"
          body={selectedChain.defenseQuestion}
          footer={`Clarify first: ${selectedChain.clarificationQuestion}`}
        />
      </div>
    </Panel>
  );
}

function ProofStep({ number, title, body, footer }: { number: string; title: string; body: string; footer: string }) {
  return (
    <article className="rounded-[7px] border border-hairline bg-canvas p-5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-oxblood text-sm font-semibold text-white">{number}</span>
      <p className="mt-5 font-serif text-3xl">{title}</p>
      <p className="mt-4 text-sm font-medium leading-6">{body}</p>
      <p className="mt-5 border-t border-hairline pt-4 text-xs leading-5 text-graphite">{footer}</p>
    </article>
  );
}

function BeforeAfter({ pack, selectedJobTitle }: { pack: ReturnType<typeof getApplicationPack>; selectedJobTitle: string }) {
  return (
    <Panel className="p-5 md:p-6">
      <SectionHeader
        eyebrow="Step 4"
        title="Make the output feel earned"
        copy={`A role-specific resume view for ${selectedJobTitle}. The improved bullets are stronger because their proof links stay visible.`}
      />
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[7px] border border-hairline bg-canvas p-5">
          <p className="font-serif text-3xl">Before</p>
          <div className="mt-5 space-y-3">
            {pack.beforeAfter.weak.map((item) => (
              <div key={item} className="rounded-[6px] border border-hairline bg-white/60 p-4 text-sm text-graphite">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[7px] border border-oxblood bg-white p-5">
          <p className="font-serif text-3xl">After</p>
          <div className="mt-5 space-y-3">
            {pack.beforeAfter.improved.map((item) => (
              <div key={item.id} className="rounded-[6px] border border-hairline bg-canvas p-4">
                <p className="text-sm font-medium leading-6">{item.text}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.sourceExperienceIds.map((id) => (
                    <SourceChip key={id}>{getExperience(id).title}</SourceChip>
                  ))}
                  {item.linkedRequirementIds.map((id) => (
                    <SourceChip key={id}>{id}</SourceChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function ProofLibrary({
  cards,
  selectedProof,
  setSelectedProofId,
  selectedJobId
}: {
  cards: SkillProofCard[];
  selectedProof: SkillProofCard;
  setSelectedProofId: (id: string) => void;
  selectedJobId: string;
}) {
  const generatedBullet = getApplicationPack(selectedJobId).proofBackedBullets.find((bullet) => bullet.id === selectedProof.generatedBulletId);
  const source = getExperience(selectedProof.sourceExperienceId);

  return (
    <Panel className="p-5 md:p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">Proof library</p>
          <h2 className="mt-2 font-serif text-4xl leading-none md:text-5xl">The dashboard only appears after the story is clear</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite">
            Browse the evidence objects that support claims. This is operational detail, so it should support the story rather than open the demo.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex min-w-[220px] items-center gap-2 rounded-[6px] border border-hairline bg-white px-3 py-2 text-sm text-graphite">
            <Search className="h-4 w-4" /> Search proofs
          </div>
          <button className="rounded-[6px] border border-hairline bg-white p-2" aria-label="Filter proofs">
            <Filter className="h-5 w-5" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-[6px] bg-oxblood px-4 py-2 text-sm text-white">
            <Plus className="h-4 w-4" /> New proof
          </button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedProofId(card.id)}
              className={`w-full rounded-[8px] border p-4 text-left transition hover:-translate-y-0.5 ${
                selectedProof.id === card.id ? "border-oxblood bg-white shadow-panel" : "border-hairline bg-canvas hover:bg-white/80"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] border border-hairline bg-white text-oxblood">
                  <Database className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-xl">{card.skillLabel}</p>
                  <p className="text-sm text-graphite">{getExperience(card.sourceExperienceId).title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
                <StatusBadge status={card.status} />
              </div>
            </button>
          ))}
        </div>
        <div className="rounded-[8px] border border-hairline bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-4xl leading-none">{selectedProof.skillLabel}</h3>
              <div className="mt-4">
                <StatusBadge status={selectedProof.status} />
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-[6px] border border-hairline bg-white px-4 py-2 text-sm">
              <Pencil className="h-4 w-4" /> Edit
            </button>
          </div>
          <DetailBlock icon={<FileText />} label="Source experience">
            <p className="font-medium">{source.title}</p>
            <p className="text-graphite">
              {source.date} · {source.sourceType}
            </p>
          </DetailBlock>
          <DetailBlock icon={<ClipboardList />} label="Proof detail">
            <p>{selectedProof.proofDetail}</p>
          </DetailBlock>
          <DetailBlock icon={<Sparkles />} label="Generated resume bullet">
            <p>{generatedBullet?.text}</p>
          </DetailBlock>
          <DetailBlock icon={<MessageCircleQuestion />} label="Likely interview question">
            <p>{selectedProof.interviewQuestion}</p>
          </DetailBlock>
        </div>
      </div>
    </Panel>
  );
}

function DetailBlock({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="mt-6 border-t border-hairline pt-5">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-oxblood">
        <span className="h-4 w-4">{icon}</span> {label}
      </p>
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}

function InterrogationAndLens({
  pack,
  lensFrame,
  selectedJobId,
  selectJob,
  draftExperiences
}: {
  pack: ReturnType<typeof getApplicationPack>;
  lensFrame: ReturnType<typeof getLensFrame>;
  selectedJobId: string;
  selectJob: (id: string) => void;
  draftExperiences: ExperienceCard[];
}) {
  return (
    <div className="mx-auto max-w-[1480px]">
      <SectionHeader
        eyebrow="Evidence gaps"
        title="When proof is missing, ask for it"
        copy="The app should not imply stronger claims than the student can defend. It asks targeted questions and shows how one source changes under different role lenses."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Panel className="p-6">
          <h3 className="font-serif text-3xl">Clarification prompts</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {pack.interrogationPrompts.map((group) => {
              const source = draftExperiences.find((experience) => experience.id === group.experienceId) ?? getExperience(group.experienceId);
              return (
                <div key={group.experienceId} className="rounded-[6px] border border-hairline bg-white/65 p-4">
                  <p className="font-serif text-xl">{source.title}</p>
                  <p className="mt-1 text-sm text-graphite">Current wording: {source.messyWording}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6">
                    {group.prompts.map((prompt) => (
                      <li key={prompt} className="flex gap-2">
                        <MessageCircleQuestion className="mt-1 h-4 w-4 shrink-0 text-oxblood" /> {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel className="p-6">
          <h3 className="font-serif text-3xl">Switch lens</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => selectJob(job.id)}
                className={`rounded-[5px] border px-3 py-2 text-sm transition ${
                  selectedJobId === job.id ? "border-oxblood bg-oxblood text-white" : "border-hairline bg-white hover:border-oxblood"
                }`}
              >
                {job.title}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-[6px] border border-hairline bg-canvas p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oxblood">{lensFrame.roleLabel}</p>
            <p className="mt-4 font-serif text-2xl leading-snug">{lensFrame.reframedClaim}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {lensFrame.emphasis.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            <p className="mt-5 text-sm text-graphite">Same source: {getExperience(lensFrame.sourceExperienceId).title}</p>
          </div>
          <div className="mt-5 text-sm text-graphite">
            {switchLensFrames.length} role lenses are hardcoded for the same underlying student evidence.
          </div>
        </Panel>
      </div>
    </div>
  );
}

function RecruiterReview({ selectedJobId, pack }: { selectedJobId: string; pack: ReturnType<typeof getApplicationPack> }) {
  const review = pack.recruiterReview;
  return (
    <div className="mx-auto max-w-[1480px]">
      <SectionHeader
        eyebrow="Step 5"
        title="Recruiter review stays evidence-based"
        copy="This view explains what can be verified, what still needs clarification, and which requirements are covered. It avoids rankings, hiring recommendations, and fake readiness scores."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Panel className="p-6">
          <h3 className="font-serif text-3xl">{getJob(selectedJobId).title} profile review</h3>
          <p className="mt-4 text-sm leading-6 text-graphite">{review.candidateSummary}</p>
          <div className="mt-6 space-y-4">
            {review.bulletEvidenceLinks.map((link) => {
              const bullet = pack.proofBackedBullets.find((item) => item.id === link.bulletId);
              const source = getExperience(link.sourceExperienceId);
              const requirement = getRequirement(selectedJobId, link.requirementId);
              return (
                <div key={link.bulletId} className="rounded-[6px] border border-hairline bg-white/70 p-4">
                  <p className="text-sm font-medium leading-6">{bullet?.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <SourceChip>{source.title}</SourceChip>
                    <SourceChip>{requirement.label}</SourceChip>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-graphite">{link.reviewerNote}</p>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel className="p-6">
          <h3 className="font-serif text-3xl">Signal summary</h3>
          <SignalGroup title="Strongest supported skills" items={review.signalSummary.strongestSupportedSkills} />
          <SignalGroup title="Skills needing clarification" items={review.signalSummary.skillsNeedingClarification} />
          <SignalGroup title="Experience sources used" items={review.signalSummary.experienceSourcesUsed} />
          <SignalGroup title="Requirements covered by evidence" items={review.signalSummary.requirementsCoveredByEvidence} />
        </Panel>
      </div>
    </div>
  );
}

function SignalGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6 border-t border-hairline pt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oxblood">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}
