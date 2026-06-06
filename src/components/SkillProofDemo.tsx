"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Layers3,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { jobs, experiences as seededExperiences } from "@/lib/demoData";
import { getApplicationPack, getCoverageCounts, getExperience, getJob, getLensFrame, getRequirement } from "@/lib/skillproof";
import type { ExperienceCard, ExperienceSource } from "@/types/skillproof";
import { Panel, SectionHeader, SourceChip, StatusBadge, Tag } from "@/components/ui";

const flowSteps = [
  "Start",
  "Paste experience",
  "Target job",
  "AI recommendation",
  "Generated claims"
];

const sourceOptions: ExperienceSource[] = ["Coursework", "Part-time", "Club"];

const jobPasteExample =
  "We are hiring a Marketing Intern to support customer research, campaign insight, simple coordination, and clear presentation of recommendations.";

export default function SkillProofDemo() {
  const [step, setStep] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);
  const [selectedSource, setSelectedSource] = useState<ExperienceSource>("Coursework");
  const [experienceText, setExperienceText] = useState(seededExperiences[0].messyWording);
  const [jobPostText, setJobPostText] = useState(jobPasteExample);
  const [selectedClaimId, setSelectedClaimId] = useState(getApplicationPack(jobs[0].id).claimProofChains[0].id);

  const job = getJob(selectedJobId);
  const pack = getApplicationPack(selectedJobId);
  const selectedChain = pack.claimProofChains.find((chain) => chain.id === selectedClaimId) ?? pack.claimProofChains[0];
  const selectedBullet = pack.proofBackedBullets.find((bullet) => bullet.id === selectedChain.generatedBulletId) ?? pack.proofBackedBullets[0];
  const selectedRequirement = getRequirement(selectedJobId, selectedChain.linkedRequirementId);
  const sourceExperience = useMemo(() => getExperienceForSource(selectedSource), [selectedSource]);
  const proofExperience = getExperience(selectedChain.sourceExperienceId);
  const coverageCounts = useMemo(() => getCoverageCounts(selectedJobId), [selectedJobId]);
  const lensFrame = getLensFrame(selectedJobId);

  function selectJob(jobId: string) {
    const nextPack = getApplicationPack(jobId);
    setSelectedJobId(jobId);
    setSelectedClaimId(nextPack.claimProofChains[0].id);
  }

  function selectSource(source: ExperienceSource) {
    const nextExperience = getExperienceForSource(source);
    setSelectedSource(source);
    setExperienceText(nextExperience.messyWording);
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <PrototypeNav step={step} setStep={setStep} />

      <section className="px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-[1480px]">
          <FlowProgress step={step} setStep={setStep} />

          {step === 0 ? <StartScreen setStep={setStep} /> : null}
          {step === 1 ? (
            <ExperienceScreen
              selectedSource={selectedSource}
              selectSource={selectSource}
              sourceExperience={sourceExperience}
              experienceText={experienceText}
              setExperienceText={setExperienceText}
              setStep={setStep}
            />
          ) : null}
          {step === 2 ? (
            <TargetJobScreen
              selectedJobId={selectedJobId}
              selectJob={selectJob}
              jobPostText={jobPostText}
              setJobPostText={setJobPostText}
              job={job}
              setStep={setStep}
            />
          ) : null}
          {step === 3 ? (
            <RecommendationScreen
              sourceExperience={sourceExperience}
              experienceText={experienceText}
              job={job}
              pack={pack}
              coverageCounts={coverageCounts}
              setStep={setStep}
            />
          ) : null}
          {step === 4 ? (
            <GeneratedClaimsScreen
              pack={pack}
              selectedClaimId={selectedClaimId}
              setSelectedClaimId={setSelectedClaimId}
              selectedBullet={selectedBullet}
              selectedRequirement={selectedRequirement}
              selectedChain={selectedChain}
              proofExperience={proofExperience}
              job={job}
            />
          ) : null}
        </div>
      </section>

      <SecondaryScreens
        pack={pack}
        selectedJobId={selectedJobId}
        selectedJobTitle={job.title}
        lensFrame={lensFrame}
        selectJob={selectJob}
      />
    </main>
  );
}

function getExperienceForSource(source: ExperienceSource): ExperienceCard {
  return seededExperiences.find((experience) => experience.sourceType === source) ?? seededExperiences[0];
}

function PrototypeNav({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/92 px-4 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-4 py-4">
        <a className="font-serif text-3xl font-semibold" href="/">
          SkillProof
        </a>
        <nav className="flex flex-wrap gap-2">
          {flowSteps.map((label, index) => (
            <button
              key={label}
              onClick={() => setStep(index)}
              className={`rounded-[5px] border px-3 py-2 text-xs font-medium ${
                step === index ? "border-ink bg-ink text-white" : "border-hairline bg-white/70 text-graphite hover:border-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function FlowProgress({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  return (
    <div className="mb-5 grid gap-2 sm:grid-cols-5">
      {flowSteps.map((label, index) => (
        <button
          key={label}
          onClick={() => setStep(index)}
          className={`rounded-[6px] border p-3 text-left ${
            step === index ? "border-violet bg-violet-soft" : index < step ? "border-sage-ink/20 bg-sage" : "border-hairline bg-white/62"
          }`}
        >
          <p className="font-mono text-xs text-graphite">0{index + 1}</p>
          <p className="mt-1 text-sm font-medium">{label}</p>
        </button>
      ))}
    </div>
  );
}

function StartScreen({ setStep }: { setStep: (step: number) => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
      <Panel className="flex min-h-[620px] flex-col justify-between p-6 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">Primary prototype flow</p>
          <h1 className="mt-5 max-w-4xl font-serif text-[58px] leading-[0.92] md:text-[92px]">
            Turn messy student experience into proof-backed resume claims.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite">
            SkillProof starts with what a student actually writes, compares it with employer requirements, then recommends claims the student can defend.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center justify-between rounded-[6px] bg-oxblood px-6 py-5 font-serif text-xl text-white hover:bg-oxblood-dark sm:min-w-[300px]"
          >
            Start with pasted experience <ArrowRight className="h-5 w-5" />
          </button>
          <a className="inline-flex items-center justify-center rounded-[6px] border border-hairline bg-white px-6 py-5 text-sm font-medium hover:border-oxblood" href="#secondary">
            View secondary screens
          </a>
        </div>
      </Panel>

      <div className="grid gap-4">
        <PrimaryFlowCard icon={<ClipboardList />} title="1. Student pastes something messy" copy="The prototype begins with weak wording, not a dashboard." />
        <PrimaryFlowCard icon={<FileSearch />} title="2. SkillProof reads the target role" copy="The job requirement comes before the rewrite." />
        <PrimaryFlowCard icon={<Sparkles />} title="3. Simulated AI recommends claims" copy="The demo shows matches, gaps, questions, and role-specific bullets." />
        <PrimaryFlowCard icon={<ShieldCheck />} title="4. Every claim has a defense" copy="The output is Claim -> Proof -> Requirement -> Defense." />
      </div>
    </div>
  );
}

function PrimaryFlowCard({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return (
    <Panel className="p-6">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[7px] bg-cyan-soft text-cyan">{icon}</div>
        <div>
          <h2 className="font-serif text-3xl leading-tight">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-graphite">{copy}</p>
        </div>
      </div>
    </Panel>
  );
}

function ExperienceScreen({
  selectedSource,
  selectSource,
  sourceExperience,
  experienceText,
  setExperienceText,
  setStep
}: {
  selectedSource: ExperienceSource;
  selectSource: (source: ExperienceSource) => void;
  sourceExperience: ExperienceCard;
  experienceText: string;
  setExperienceText: (value: string) => void;
  setStep: (step: number) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <Panel className="p-6 md:p-8">
        <SectionHeader
          eyebrow="Paste experience"
          title="Start with what the student actually writes"
          copy="This screen makes the prototype understandable: the user enters rough student experience before any proof system appears."
        />
        <div className="mb-5 flex flex-wrap gap-2">
          {sourceOptions.map((source) => (
            <button
              key={source}
              onClick={() => selectSource(source)}
              className={`rounded-[5px] border px-4 py-2 text-sm ${
                selectedSource === source ? "border-cyan bg-cyan text-white" : "border-hairline bg-white hover:border-cyan"
              }`}
            >
              {source}
            </button>
          ))}
        </div>
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan" htmlFor="experience-paste">
          Messy student wording
        </label>
        <textarea
          id="experience-paste"
          value={experienceText}
          onChange={(event) => setExperienceText(event.target.value)}
          className="mt-3 min-h-[190px] w-full resize-none rounded-[7px] border border-cyan/20 bg-white/90 p-5 text-xl leading-8 outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/10"
        />
        <button
          onClick={() => setStep(2)}
          className="mt-6 inline-flex items-center gap-2 rounded-[6px] bg-ink px-5 py-4 text-sm font-medium text-white hover:bg-oxblood"
        >
          Continue to target job <ArrowRight className="h-4 w-4" />
        </button>
      </Panel>

      <Panel className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">Simulated detection</p>
        <h2 className="mt-3 font-serif text-4xl leading-none">{sourceExperience.title}</h2>
        <p className="mt-2 text-sm text-graphite">
          {sourceExperience.institution} · {sourceExperience.date}
        </p>
        <SignalList title="Signals SkillProof can see" items={sourceExperience.extractedSignals} />
        <SignalList title="Proof hints to ask about" items={sourceExperience.evidenceNotes} />
      </Panel>
    </div>
  );
}

function TargetJobScreen({
  selectedJobId,
  selectJob,
  jobPostText,
  setJobPostText,
  job,
  setStep
}: {
  selectedJobId: string;
  selectJob: (jobId: string) => void;
  jobPostText: string;
  setJobPostText: (value: string) => void;
  job: ReturnType<typeof getJob>;
  setStep: (step: number) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <Panel className="p-6 md:p-8">
        <SectionHeader
          eyebrow="Target job"
          title="Choose or paste the role before rewriting"
          copy="SkillProof should feel requirement-led. The student sees employer language before generated resume bullets."
        />
        <div className="grid gap-3">
          {jobs.map((item) => (
            <button
              key={item.id}
              onClick={() => selectJob(item.id)}
              className={`rounded-[7px] border p-4 text-left ${
                selectedJobId === item.id ? "border-violet bg-violet-soft shadow-panel" : "border-hairline bg-white/72 hover:border-violet"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span>
                  <span className="block font-serif text-2xl">{item.title}</span>
                  <span className="text-sm text-graphite">
                    {item.company} · {item.location}
                  </span>
                </span>
                {selectedJobId === item.id ? <CheckCircle2 className="h-5 w-5 text-violet" /> : null}
              </span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="p-6 md:p-8">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan" htmlFor="job-paste">
          Optional pasted job post
        </label>
        <textarea
          id="job-paste"
          value={jobPostText}
          onChange={(event) => setJobPostText(event.target.value)}
          className="mt-3 min-h-[150px] w-full resize-none rounded-[7px] border border-cyan/20 bg-white/90 p-4 text-sm leading-6 outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/10"
        />
        <div className="mt-6 rounded-[7px] border border-cyan/20 bg-cyan-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">Extracted requirements for {job.title}</p>
          <div className="mt-4 space-y-3">
            {job.requirements.map((requirement) => (
              <div key={requirement.id} className="rounded-[6px] border border-white/80 bg-white/72 p-3">
                <p className="font-medium">{requirement.label}</p>
                <p className="mt-1 text-xs leading-5 text-graphite">{requirement.sourcePhrase}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setStep(3)}
          className="mt-6 inline-flex items-center gap-2 rounded-[6px] bg-ink px-5 py-4 text-sm font-medium text-white hover:bg-oxblood"
        >
          Run simulated AI recommendation <Sparkles className="h-4 w-4" />
        </button>
      </Panel>
    </div>
  );
}

function RecommendationScreen({
  sourceExperience,
  experienceText,
  job,
  pack,
  coverageCounts,
  setStep
}: {
  sourceExperience: ExperienceCard;
  experienceText: string;
  job: ReturnType<typeof getJob>;
  pack: ReturnType<typeof getApplicationPack>;
  coverageCounts: ReturnType<typeof getCoverageCounts>;
  setStep: (step: number) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
      <Panel className="p-6 md:p-8">
        <SectionHeader
          eyebrow="AI recommendation"
          title="Show analysis before the output"
          copy="This is where the prototype explains what the AI would recommend, without pretending to be a full backend system."
        />
        <div className="rounded-[7px] border border-coral/20 bg-coral-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">Input understood</p>
          <p className="mt-3 font-serif text-3xl leading-tight">{experienceText}</p>
          <p className="mt-4 text-sm leading-6 text-graphite">Mapped from: {sourceExperience.title}</p>
        </div>
        <SignalList title="Experience signals" items={sourceExperience.extractedSignals} />
        <SignalList title="Proof gaps to clarify" items={pack.interrogationPrompts[0]?.prompts ?? []} />
      </Panel>

      <Panel className="p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">Requirement match</p>
            <h2 className="mt-2 font-serif text-4xl leading-none">{job.title}</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            {Object.entries(coverageCounts).map(([status, count]) => (
              <div key={status} className="rounded-[5px] border border-hairline bg-white/70 p-2">
                <p className="font-serif text-2xl">{count}</p>
                <p>{status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {pack.requirementCoverage.map((match) => {
            const requirement = getRequirement(job.id, match.requirementId);
            return (
              <div key={match.requirementId} className="rounded-[7px] border border-hairline bg-white/72 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{requirement.label}</p>
                  <StatusBadge status={match.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-graphite">{match.explanation}</p>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setStep(4)}
          className="mt-6 inline-flex items-center gap-2 rounded-[6px] bg-ink px-5 py-4 text-sm font-medium text-white hover:bg-oxblood"
        >
          Generate proof-backed claims <ArrowRight className="h-4 w-4" />
        </button>
      </Panel>
    </div>
  );
}

function GeneratedClaimsScreen({
  pack,
  selectedClaimId,
  setSelectedClaimId,
  selectedBullet,
  selectedRequirement,
  selectedChain,
  proofExperience,
  job
}: {
  pack: ReturnType<typeof getApplicationPack>;
  selectedClaimId: string;
  setSelectedClaimId: (claimId: string) => void;
  selectedBullet: ReturnType<typeof getApplicationPack>["proofBackedBullets"][number];
  selectedRequirement: ReturnType<typeof getRequirement>;
  selectedChain: ReturnType<typeof getApplicationPack>["claimProofChains"][number];
  proofExperience: ExperienceCard;
  job: ReturnType<typeof getJob>;
}) {
  return (
    <div className="space-y-6">
      <Panel className="p-6 md:p-8">
        <SectionHeader
          eyebrow="Generated claims"
          title="The hero output is the proof chain"
          copy={`Role-specific output for ${job.title}. The user sees the improved bullet and why it is defensible.`}
        />
        <div className="mb-5 flex flex-wrap gap-2">
          {pack.claimProofChains.map((chain, index) => (
            <button
              key={chain.id}
              onClick={() => setSelectedClaimId(chain.id)}
              className={`rounded-[5px] border px-3 py-2 text-sm ${
                selectedClaimId === chain.id ? "border-violet bg-violet text-white" : "border-hairline bg-white hover:border-violet"
              }`}
            >
              Claim {index + 1}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ProofStep number="1" title="Claim" body={selectedBullet.text} footer="Generated resume bullet" tone="coral" />
          <ProofStep number="2" title="Proof" body={selectedChain.proofDetail} footer={`${proofExperience.title} · ${proofExperience.sourceType}`} tone="cyan" />
          <ProofStep number="3" title="Requirement" body={selectedRequirement.label} footer={selectedRequirement.sourcePhrase} tone="violet" />
          <ProofStep number="4" title="Defense" body={selectedChain.defenseQuestion} footer={`Clarify first: ${selectedChain.clarificationQuestion}`} tone="amber" />
        </div>
      </Panel>

      <Panel className="p-6 md:p-8">
        <SectionHeader
          eyebrow="Before / after"
          title="Make the transformation impossible to miss"
          copy="This should be the simplest pitch artifact: weak student wording becomes role-specific claims with proof links."
        />
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[7px] border border-coral/20 bg-coral-soft p-5">
            <p className="font-serif text-3xl">Before</p>
            <div className="mt-4 space-y-3">
              {pack.beforeAfter.weak.map((item) => (
                <div key={item} className="rounded-[6px] border border-white/80 bg-white/64 p-4 text-sm text-graphite">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[7px] border border-lime/35 bg-lime-soft p-5">
            <p className="font-serif text-3xl">After</p>
            <div className="mt-4 space-y-3">
              {pack.beforeAfter.improved.map((item) => (
                <div key={item.id} className="rounded-[6px] border border-white/80 bg-white/78 p-4">
                  <p className="text-sm font-medium leading-6">{item.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.sourceExperienceIds.map((id) => (
                      <SourceChip key={id}>{getExperience(id).title}</SourceChip>
                    ))}
                    {item.linkedRequirementIds.map((id) => (
                      <SourceChip key={id}>{getRequirement(job.id, id).label}</SourceChip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ProofStep({ number, title, body, footer, tone }: { number: string; title: string; body: string; footer: string; tone: "coral" | "cyan" | "violet" | "amber" }) {
  const styles = {
    coral: "border-coral/25 bg-coral-soft text-coral",
    cyan: "border-cyan/25 bg-cyan-soft text-cyan",
    violet: "border-violet/25 bg-violet-soft text-violet",
    amber: "border-amber-300 bg-amber text-amber-ink"
  };

  return (
    <article className={`rounded-[7px] border p-5 ${styles[tone]}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-white text-sm font-semibold text-ink">{number}</span>
      <p className="mt-5 font-serif text-3xl">{title}</p>
      <p className="mt-4 text-sm font-medium leading-6 text-ink">{body}</p>
      <p className="mt-5 border-t border-white/80 pt-4 text-xs leading-5 text-graphite">{footer}</p>
    </article>
  );
}

function SecondaryScreens({
  pack,
  selectedJobId,
  selectedJobTitle,
  lensFrame,
  selectJob
}: {
  pack: ReturnType<typeof getApplicationPack>;
  selectedJobId: string;
  selectedJobTitle: string;
  lensFrame: ReturnType<typeof getLensFrame>;
  selectJob: (jobId: string) => void;
}) {
  const firstProof = pack.skillProofCards[0];
  const firstBullet = pack.proofBackedBullets.find((bullet) => bullet.id === firstProof.generatedBulletId);
  const review = pack.recruiterReview;

  return (
    <section id="secondary" className="border-t border-hairline px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          eyebrow="Secondary screens"
          title="Proof surfaces after the core flow"
          copy="These views still matter, but they should support the guided demo instead of being the opening experience."
        />
        <div className="grid gap-6 xl:grid-cols-3">
          <Panel className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-cyan" />
              <h3 className="font-serif text-3xl">Skill Proof Card</h3>
            </div>
            <StatusBadge status={firstProof.status} />
            <p className="mt-4 font-medium">{firstProof.skillLabel}</p>
            <p className="mt-2 text-sm leading-6 text-graphite">{firstProof.proofDetail}</p>
            <p className="mt-4 border-t border-hairline pt-4 text-sm leading-6">{firstBullet?.text}</p>
            <p className="mt-4 text-sm text-graphite">Interview: {firstProof.interviewQuestion}</p>
          </Panel>

          <Panel className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-violet" />
              <h3 className="font-serif text-3xl">Switch Lens</h3>
            </div>
            <div className="mb-5 flex flex-wrap gap-2">
              {jobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => selectJob(job.id)}
                  className={`rounded-[5px] border px-3 py-2 text-sm ${
                    selectedJobId === job.id ? "border-violet bg-violet text-white" : "border-hairline bg-white hover:border-violet"
                  }`}
                >
                  {job.title}
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet">{lensFrame.roleLabel}</p>
            <p className="mt-3 font-serif text-2xl leading-snug">{lensFrame.reframedClaim}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {lensFrame.emphasis.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Search className="h-5 w-5 text-oxblood" />
              <h3 className="font-serif text-3xl">Recruiter Review</h3>
            </div>
            <p className="text-sm leading-6 text-graphite">{review.candidateSummary}</p>
            <SignalList title="Strongest supported skills" items={review.signalSummary.strongestSupportedSkills} />
            <SignalList title="Needs clarification" items={review.signalSummary.skillsNeedingClarification} />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-graphite">
              No score, ranking, or hiring recommendation for {selectedJobTitle}
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function SignalList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6 border-t border-hairline pt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}
