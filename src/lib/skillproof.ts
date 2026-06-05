import { applicationPacks, experiences, jobs, switchLensFrames } from "@/lib/demoData";
import type { ApplicationPack, ExperienceCard, JobPost, LensFrame, MatchStatus, Requirement } from "@/types/skillproof";

export function getJob(jobId: string): JobPost {
  return jobs.find((job) => job.id === jobId) ?? jobs[0];
}

export function getApplicationPack(jobId: string): ApplicationPack {
  return applicationPacks[jobId] ?? applicationPacks[jobs[0].id];
}

export function getExperience(experienceId: string): ExperienceCard {
  return experiences.find((experience) => experience.id === experienceId) ?? experiences[0];
}

export function getRequirement(jobId: string, requirementId: string): Requirement {
  const job = getJob(jobId);
  return job.requirements.find((requirement) => requirement.id === requirementId) ?? job.requirements[0];
}

export function getMatchStatusClass(status: MatchStatus): string {
  if (status === "Direct match") return "border-green-300 bg-sage text-sage-ink";
  if (status === "Possible match") return "border-amber-300 bg-amber text-amber-ink";
  if (status === "Needs detail") return "border-yellow-300 bg-yellow-50 text-yellow-800";
  return "border-stone-300 bg-stone-100 text-stone-600";
}

export function getLensFrame(jobId: string): LensFrame {
  return switchLensFrames.find((lens) => lens.lensJobId === jobId) ?? switchLensFrames[0];
}

export function getCoverageCounts(jobId: string) {
  const pack = getApplicationPack(jobId);
  return pack.requirementCoverage.reduce<Record<MatchStatus, number>>(
    (counts, match) => {
      counts[match.status] += 1;
      return counts;
    },
    {
      "Direct match": 0,
      "Possible match": 0,
      "Needs detail": 0,
      "Not shown": 0
    }
  );
}
