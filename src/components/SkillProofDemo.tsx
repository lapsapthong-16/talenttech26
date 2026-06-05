"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  ClipboardList,
  Database,
  FileText,
  Filter,
  GraduationCap,
  LineChart,
  Lock,
  MessageCircleQuestion,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { applicationPacks, experiences as seededExperiences, jobs, switchLensFrames } from "@/lib/demoData";
import { getApplicationPack, getCoverageCounts, getExperience, getJob, getLensFrame, getRequirement } from "@/lib/skillproof";
import type { ExperienceCard, SkillProofCard } from "@/types/skillproof";
import { BrowserFrame, Panel, SectionHeader, SourceChip, StatusBadge, Tag } from "@/components/ui";

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
      <section id="workspace" className="px-4 py-6 md:px-8 md:py-10">
        <BrowserFrame url="skillproof.my/demo/workspace">
          <AppTopNav />
          <div className="grid min-h-[760px] grid-cols-1 lg:grid-cols-[238px_minmax(0,1fr)]">
            <SideRail />
            <div className="space-y-10 px-5 py-8 md:px-8">
              <Workspace
                draftExperiences={draftExperiences}
                updateExperience={updateExperience}
                selectedJobId={selectedJobId}
                selectJob={selectJob}
                job={job}
                pack={pack}
                coverageCounts={coverageCounts}
              />
              <ClaimProofChain
                pack={pack}
                selectedClaimId={selectedClaimId}
                setSelectedClaimId={setSelectedClaimId}
                selectedBullet={selectedBullet}
                selectedExperience={selectedExperience}
                selectedRequirement={selectedRequirement}
                selectedChain={selectedChain}
              />
              <BeforeAfter pack={pack} selectedJobTitle={job.title} />
            </div>
          </div>
        </BrowserFrame>
      </section>

      <section id="proofs" className="px-4 pb-10 md:px-8 md:pb-16">
        <BrowserFrame url="skillproof.my/demo/proofs">
          <AppTopNav active="Proofs" />
          <SkillProofCards
            cards={pack.skillProofCards}
            selectedProof={selectedProof}
            setSelectedProofId={setSelectedProofId}
            selectedJobId={selectedJobId}
          />
        </BrowserFrame>
      </section>

      <section id="resume" className="px-4 pb-10 md:px-8 md:pb-16">
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

function AppTopNav({ active = "Dashboard" }: { active?: string }) {
  const items = ["Dashboard", "Proofs", "Resume", "Applications", "Roadmap"];
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 border-b border-hairline bg-canvas px-5 py-5 md:px-8">
      <div className="font-serif text-3xl font-semibold">SkillProof</div>
      <nav className="flex flex-wrap gap-6 text-sm">
        {items.map((item) => (
          <a
            href={item === "Proofs" ? "#proofs" : item === "Resume" ? "#resume" : "#workspace"}
            className={item === active ? "border-b-2 border-oxblood pb-2 text-oxblood" : "pb-2 text-ink"}
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5" />
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">AM</span>
      </div>
    </div>
  );
}

function SideRail() {
  const categories: Array<[string, string, LucideIcon]> = [
    ["All proof", "24", ClipboardList],
    ["Projects", "8", BriefcaseBusiness],
    ["Internships", "5", Lock],
    ["Coursework", "4", FileText],
    ["Competitions", "3", GraduationCap],
    ["Volunteering", "2", Users]
  ];

  return (
    <aside className="border-b border-hairline p-4 lg:border-b-0 lg:border-r">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-graphite">Evidence</p>
      <div className="space-y-1">
        {categories.map(([label, count, Icon], index) => (
          <a
            href="#proofs"
            key={String(label)}
            className={`flex items-center justify-between rounded-[6px] px-3 py-2 text-sm ${
              index === 0 ? "bg-oxblood text-white" : "hover:bg-white/70"
            }`}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" /> {label}
            </span>
            <span>{count}</span>
          </a>
        ))}
      </div>
      <div className="mt-7 border-t border-hairline pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-graphite">Tags</p>
        <div className="flex flex-wrap gap-2">
          {["Data Analysis", "Communication", "Leadership", "Customer", "Presentation"].map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <Panel className="mt-10 p-4">
        <p className="font-semibold">Resume sync</p>
        <p className="mt-3 text-sm leading-6 text-graphite">12 proofs are used in your current resume draft.</p>
        <a href="#resume" className="mt-5 block rounded-[5px] border border-hairline bg-white px-4 py-3 text-center text-sm">
          Review in Resume
        </a>
      </Panel>
    </aside>
  );
}

function Workspace({
  draftExperiences,
  updateExperience,
  selectedJobId,
  selectJob,
  job,
  pack,
  coverageCounts
}: {
  draftExperiences: ExperienceCard[];
  updateExperience: (id: string, value: string) => void;
  selectedJobId: string;
  selectJob: (id: string) => void;
  job: ReturnType<typeof getJob>;
  pack: ReturnType<typeof getApplicationPack>;
  coverageCounts: ReturnType<typeof getCoverageCounts>;
}) {
  return (
    <div>
      <SectionHeader
        eyebrow="Student Workspace"
        title="From messy experience to role-specific claims"
        copy="Edit the seeded student wording, choose a sample role, and inspect how the hardcoded proof system maps evidence to employer requirements."
      />
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl">Experience Cards</h3>
            <button className="inline-flex items-center gap-2 rounded-[5px] border border-hairline bg-white px-3 py-2 text-sm">
              <Plus className="h-4 w-4" /> New card
            </button>
          </div>
          {draftExperiences.map((experience) => (
            <Panel key={experience.id} className="p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl">{experience.title}</p>
                  <p className="text-sm text-graphite">
                    {experience.sourceType} · {experience.institution} · {experience.date}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <textarea
                value={experience.messyWording}
                onChange={(event) => updateExperience(experience.id, event.target.value)}
                className="min-h-[76px] w-full resize-none rounded-[6px] border border-hairline bg-canvas p-3 text-sm outline-none focus:border-oxblood"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oxblood">Signals</p>
                  <p className="mt-2 text-sm leading-6 text-graphite">{experience.extractedSignals.join(" · ")}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oxblood">Evidence notes</p>
                  <p className="mt-2 text-sm leading-6 text-graphite">{experience.evidenceNotes.join(" · ")}</p>
                </div>
              </div>
            </Panel>
          ))}
        </div>

        <div className="space-y-5">
          <Panel className="p-5">
            <h3 className="font-serif text-2xl">Job Requirement Extraction</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              {jobs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => selectJob(item.id)}
                  className={`rounded-[6px] border p-3 text-left text-sm ${
                    selectedJobId === item.id ? "border-oxblood bg-white" : "border-hairline bg-canvas"
                  }`}
                >
                  <span className="font-semibold">{item.title}</span>
                  <span className="mt-1 block text-xs text-graphite">{item.company}</span>
                </button>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-graphite">{job.description}</p>
            <div className="mt-5 space-y-3">
              {job.requirements.map((requirement) => (
                <div key={requirement.id} className="rounded-[6px] border border-hairline bg-white/60 p-3">
                  <p className="text-sm font-medium">{requirement.label}</p>
                  <p className="mt-1 text-xs text-graphite">{requirement.sourcePhrase}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-2xl">Requirement Coverage Map</h3>
              <LineChart className="h-5 w-5 text-oxblood" />
            </div>
            <div className="mb-5 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              {Object.entries(coverageCounts).map(([status, count]) => (
                <div key={status} className="rounded-[6px] border border-hairline bg-canvas p-2">
                  <p className="font-semibold">{count}</p>
                  <p className="text-graphite">{status}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {pack.requirementCoverage.map((match) => {
                const requirement = getRequirement(job.id, match.requirementId);
                return (
                  <div key={match.requirementId} className="rounded-[6px] border border-hairline bg-white/60 p-3">
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
      </div>
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
    <div>
      <SectionHeader
        eyebrow="Proof Chain"
        title="Claim -> Proof -> Requirement -> Defense"
        copy="Every generated bullet exposes the source experience, employer requirement, proof detail, clarification question, and defense prompt."
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {pack.claimProofChains.map((chain, index) => (
          <button
            key={chain.id}
            onClick={() => setSelectedClaimId(chain.id)}
            className={`rounded-[5px] border px-3 py-2 text-sm ${
              selectedClaimId === chain.id ? "border-oxblood bg-oxblood text-white" : "border-hairline bg-white"
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
    </div>
  );
}

function ProofStep({ number, title, body, footer }: { number: string; title: string; body: string; footer: string }) {
  return (
    <Panel className="p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-oxblood text-sm font-semibold text-white">
          {number}
        </span>
        <div>
          <p className="font-serif text-2xl">{title}</p>
          <p className="mt-3 text-sm font-medium leading-6">{body}</p>
          <p className="mt-5 border-t border-hairline pt-4 text-xs leading-5 text-graphite">{footer}</p>
        </div>
      </div>
    </Panel>
  );
}

function BeforeAfter({ pack, selectedJobTitle }: { pack: ReturnType<typeof getApplicationPack>; selectedJobTitle: string }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Resume"
        title="Before / After Resume View"
        copy={`A role-specific transformation for ${selectedJobTitle}, with proof links kept visible beside each improved claim.`}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <p className="font-serif text-2xl">Before</p>
          <div className="mt-5 space-y-3">
            {pack.beforeAfter.weak.map((item) => (
              <div key={item} className="rounded-[6px] border border-hairline bg-canvas p-4 text-sm text-graphite">
                {item}
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <p className="font-serif text-2xl">After</p>
          <div className="mt-5 space-y-3">
            {pack.beforeAfter.improved.map((item) => (
              <div key={item.id} className="rounded-[6px] border border-hairline bg-white/70 p-4">
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
        </Panel>
      </div>
    </div>
  );
}

function SkillProofCards({
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
    <div className="grid min-h-[760px] grid-cols-1 lg:grid-cols-[238px_minmax(0,1fr)]">
      <SideRail />
      <div className="grid gap-5 px-5 py-8 md:px-8 xl:grid-cols-[1fr_0.68fr]">
        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
            <div>
              <h2 className="font-serif text-5xl leading-none">Skill Proof Cards</h2>
              <p className="mt-3 text-sm text-graphite">Browse and manage the proof behind your resume claims.</p>
            </div>
            <div className="flex gap-3">
              <div className="flex min-w-[240px] items-center gap-2 rounded-[6px] border border-hairline bg-white px-3 py-2 text-sm text-graphite">
                <Search className="h-4 w-4" /> Search proofs...
              </div>
              <button className="rounded-[6px] border border-hairline bg-white p-2">
                <Filter className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-[6px] bg-oxblood px-4 py-2 text-sm text-white">
                <Plus className="h-4 w-4" /> New proof
              </button>
            </div>
          </div>
          <div className="mb-4 flex justify-between text-sm text-graphite">
            <span>24 proofs</span>
            <span>Sort by: Recently updated</span>
          </div>
          <div className="space-y-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedProofId(card.id)}
                className={`w-full rounded-[8px] border bg-white/58 p-4 text-left ${
                  selectedProof.id === card.id ? "border-oxblood" : "border-hairline"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] border border-hairline bg-canvas text-oxblood">
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
                  <div className="hidden text-right md:block">
                    <StatusBadge status={card.status} />
                    <p className="mt-3 text-xs text-graphite">Updated recently</p>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
        <Panel className="self-start p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-3xl">{selectedProof.skillLabel}</h3>
              <div className="mt-4">
                <StatusBadge status={selectedProof.status} />
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-[6px] border border-hairline bg-white px-4 py-2 text-sm">
              <Pencil className="h-4 w-4" /> Edit proof
            </button>
          </div>
          <DetailBlock icon={<FileText />} label="Source Experience">
            <p className="font-medium">{source.title}</p>
            <p className="text-graphite">{source.date} · {source.sourceType}</p>
          </DetailBlock>
          <DetailBlock icon={<ClipboardList />} label="Proof Detail">
            <p>{selectedProof.proofDetail}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedProof.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </DetailBlock>
          <DetailBlock icon={<Sparkles />} label="Generated Resume Bullet">
            <p>{generatedBullet?.text}</p>
          </DetailBlock>
          <DetailBlock icon={<MessageCircleQuestion />} label="Likely Interview Question">
            <p>{selectedProof.interviewQuestion}</p>
          </DetailBlock>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4 text-sm text-graphite">
            <span>Proof ID: PR-{selectedProof.id.toUpperCase()}</span>
            <a href="#recruiter" className="text-oxblood">View proof activity</a>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function DetailBlock({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
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
        eyebrow="Evidence Gaps"
        title="Experience Interrogation and Switch Lens"
        copy="The demo asks for missing proof before stronger claims are implied, then reframes one source experience across different role lenses."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Panel className="p-6">
          <h3 className="font-serif text-3xl">Interrogation Prompts</h3>
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
          <h3 className="font-serif text-3xl">Switch Lens</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => selectJob(job.id)}
                className={`rounded-[5px] border px-3 py-2 text-sm ${
                  selectedJobId === job.id ? "border-oxblood bg-oxblood text-white" : "border-hairline bg-white"
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
        eyebrow="Recruiter View"
        title="Recruiter Proof Review"
        copy="A careful evidence review surface. It links claims to source proof and requirements without ranking, scoring, or making hiring recommendations."
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
          <h3 className="font-serif text-3xl">Signal Summary</h3>
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
