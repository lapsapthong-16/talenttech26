## 1. Data and Types

- [ ] 1.1 Add or update TypeScript types for natural-language resume inputs, cleaned experience outputs, resume versions, role lenses, employer review resumes, coverage rows, and proof-chain details.
- [ ] 1.2 Extend seeded demo data with student raw experience examples for assignments, part-time work, club activity, and volunteer work.
- [ ] 1.3 Add seeded general resume content generated from cleaned student experiences.
- [ ] 1.4 Add seeded role-specific resume versions for Marketing Intern, Business Analyst Intern, and Management Trainee.
- [ ] 1.5 Add employer-side resume comparison data with multiple resume versions and per-requirement coverage mappings.
- [ ] 1.6 Add deterministic helper functions for selecting resume versions, lens-specific bullets, requirement coverage, and claim proof-chain details.

## 2. Route Structure

- [ ] 2.1 Add `/demo/student` route that renders the student resume builder flow.
- [ ] 2.2 Add `/demo/employer` route that renders the employer requirement coverage flow.
- [ ] 2.3 Replace `/demo` with a chooser page that presents Student: Build My Resume and Employer: Review Resume Fit entry points.
- [ ] 2.4 Update landing page calls to action and navigation so users can reach the chooser and the two dedicated demo routes.
- [ ] 2.5 Keep the legacy combined demo component available until the new routes build and render correctly.

## 3. Student Resume Builder Flow

- [ ] 3.1 Create `StudentResumeDemo` component with staged state for My Resume, rephrased experience, general resume, and Switch Lens.
- [ ] 3.2 Implement the My Resume opening stage with a natural-language input area and seeded example prompts.
- [ ] 3.3 Implement the rephrased experience stage showing raw wording, cleaned resume-ready wording, and proof hints.
- [ ] 3.4 Implement the general resume preview with profile summary, experience bullets, skills, education placeholder, and project or activity section.
- [ ] 3.5 Implement Switch Lens controls for Marketing Intern, Business Analyst Intern, and Management Trainee.
- [ ] 3.6 Update the resume preview when the selected lens changes and visibly distinguish changed bullets or phrases.
- [ ] 3.7 Show "same proof, different framing" context for lens-specific resume bullets.
- [ ] 3.8 Add CSS transitions for stage reveals, rewrite changes, and lens switching without text overlap.

## 4. Employer Requirement Coverage Flow

- [ ] 4.1 Create `EmployerCoverageDemo` component with staged state for job description, resume comparison, coverage, proof chain, and review summary.
- [ ] 4.2 Implement the job-description-first opening with seeded job text and extracted requirements.
- [ ] 4.3 Implement resume version selection using multiple seeded resume versions without ranking language.
- [ ] 4.4 Implement requirement coverage rows with Direct match, Possible match, Needs detail, and Not shown labels.
- [ ] 4.5 Update coverage explanations when the selected resume version changes.
- [ ] 4.6 Implement expandable requirement or bullet rows that reveal Claim -> Proof -> Requirement -> Defense details.
- [ ] 4.7 Implement recruiter proof review summary with supported skills, skills needing clarification, experience sources used, requirements covered by evidence, and interview questions.
- [ ] 4.8 Add CSS transitions for coverage updates, row expansion, and proof-chain reveal while preserving explicit labels.

## 5. Visual and Interaction Polish

- [ ] 5.1 Apply the semantic color system consistently across chooser, student flow, and employer flow.
- [ ] 5.2 Use coral for raw input or before states, cyan for proof, violet for primary actions and lens selection, lime for supported output, and amber for gaps or clarification.
- [ ] 5.3 Ensure desktop layouts use aligned gutters, stable controls, readable resume previews, and clear visual hierarchy.
- [ ] 5.4 Ensure mobile layouts stack cleanly, controls remain tappable, and resume, coverage, and proof-chain content remains readable.
- [ ] 5.5 Avoid cards-inside-cards and keep cards limited to repeated items, resume blocks, proof chains, and coverage rows.

## 6. Guardrails and Cleanup

- [ ] 6.1 Remove or retire the standalone Skill Proof Cards section as a must-have demo surface after proof details are represented inside student hints and employer proof chains.
- [ ] 6.2 Remove or reduce the legacy combined `SkillProofDemo` route usage after the split pages are verified.
- [ ] 6.3 Audit UI copy to remove ATS score, fit percentage, candidate ranking, talent matching, and hiring recommendation language.
- [ ] 6.4 Confirm the prototype still uses only static local data and deterministic client-side state.

## 7. Verification

- [ ] 7.1 Run `npm run lint` and fix reported issues.
- [ ] 7.2 Run `npm run build` and fix build or type errors.
- [ ] 7.3 Verify `/`, `/demo`, `/demo/student`, and `/demo/employer` render without runtime errors.
- [ ] 7.4 Manually check the student flow starts with My Resume and reaches role-specific Switch Lens resume versions.
- [ ] 7.5 Manually check the employer flow starts with a job description and updates coverage when resume versions change.
- [ ] 7.6 Manually check the prototype does not display scores, rankings, matching, or hiring recommendations.
