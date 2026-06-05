export type ExperienceSource = "Coursework" | "Part-time" | "Club";

export type MatchStatus = "Direct match" | "Possible match" | "Needs detail" | "Not shown";

export type RequirementCategory =
  | "Research"
  | "Analysis"
  | "Communication"
  | "Coordination"
  | "Customer"
  | "Problem solving";

export type ExperienceCard = {
  id: string;
  sourceType: ExperienceSource;
  title: string;
  institution: string;
  date: string;
  messyWording: string;
  rawDescription: string;
  extractedSignals: string[];
  evidenceNotes: string[];
  tags: string[];
};

export type Requirement = {
  id: string;
  label: string;
  category: RequirementCategory;
  sourcePhrase: string;
};

export type JobPost = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: Requirement[];
};

export type RequirementMatch = {
  requirementId: string;
  matchedExperienceIds: string[];
  status: MatchStatus;
  explanation: string;
};

export type ResumeBullet = {
  id: string;
  text: string;
  sourceExperienceIds: string[];
  linkedRequirementIds: string[];
};

export type SkillProofCard = {
  id: string;
  skillLabel: string;
  sourceExperienceId: string;
  proofDetail: string;
  generatedBulletId: string;
  interviewQuestion: string;
  tags: string[];
  status: MatchStatus;
};

export type ClaimProofChain = {
  id: string;
  generatedBulletId: string;
  sourceExperienceId: string;
  linkedRequirementId: string;
  proofDetail: string;
  clarificationQuestion: string;
  defenseQuestion: string;
};

export type BeforeAfterResume = {
  weak: string[];
  improved: ResumeBullet[];
};

export type RecruiterReviewProfile = {
  candidateSummary: string;
  bulletEvidenceLinks: Array<{
    bulletId: string;
    sourceExperienceId: string;
    requirementId: string;
    reviewerNote: string;
  }>;
  signalSummary: {
    strongestSupportedSkills: string[];
    skillsNeedingClarification: string[];
    experienceSourcesUsed: string[];
    requirementsCoveredByEvidence: string[];
  };
};

export type LensFrame = {
  lensJobId: string;
  roleLabel: string;
  sourceExperienceId: string;
  reframedClaim: string;
  emphasis: string[];
};

export type ApplicationPack = {
  jobId: string;
  proofBackedBullets: ResumeBullet[];
  skillProofCards: SkillProofCard[];
  claimProofChains: ClaimProofChain[];
  requirementCoverage: RequirementMatch[];
  interrogationPrompts: Array<{
    experienceId: string;
    prompts: string[];
  }>;
  beforeAfter: BeforeAfterResume;
  recruiterReview: RecruiterReviewProfile;
};
