## Context

The current app is a static Next.js prototype with a landing page and a combined `/demo` route. The combined demo already contains many of the right product concepts, including student experience input, role selection, requirement coverage, proof chains, switch lens, proof cards, and recruiter review. The issue is presentation: too many concepts appear as one long flow, so the user story is difficult to understand.

The updated plan reframes the prototype around two clear user mental models:

- Students start with "My Resume" and natural-language experience input.
- Employers start with a job description and inspect requirement coverage across resume versions.

This remains a hackathon prototype with static data and deterministic helpers. The implementation should reuse current data and UI patterns where useful, but the route structure and demo narrative need to change.

## Goals / Non-Goals

**Goals:**

- Split the prototype into `/demo/student` and `/demo/employer`.
- Make `/demo` a chooser page with two entry points.
- Update the landing page to direct users into the two separate demo flows.
- Build a student flow that progresses from natural-language input to rephrased experience, general resume, and role-specific Switch Lens resumes.
- Build an employer flow that progresses from job description to resume comparison, requirement coverage, proof-chain inspection, and recruiter proof review.
- Use animation and transition states to clarify progression inside each flow.
- Preserve static local data and deterministic client-side behavior.
- Preserve guardrails against ATS scoring, fit percentages, ranking, matching, and hiring recommendations.

**Non-Goals:**

- No real AI parsing, generation, or prompt workflow.
- No backend, database, authentication, file upload, or API route.
- No production resume editor.
- No employer account dashboard.
- No candidate marketplace or talent matching.
- No numeric scoring or hiring decision output.

## Decisions

### Decision 1: Use route-level separation for the two demos

Implement separate pages for `/demo/student` and `/demo/employer`, with `/demo` as a chooser.

Rationale:

- The two users have different goals and starting mental models.
- Separate routes make the pitch cleaner and reduce information overload.
- The browser URL communicates what is being demonstrated.

Alternative considered:

- Keep one `/demo` page with tabs. This is faster but risks preserving the current combined-demo confusion and makes deep-linking to each pitch harder.

### Decision 2: Replace "messy experience cards" as the student opening with "My Resume"

The student flow should open on a resume workspace and natural-language input area. Structured experience blocks can still appear after the user submits or selects seeded input.

Rationale:

- "My Resume" is a familiar student concept.
- Evidence cards are a product data model, not the right first user-facing object.
- The proof system becomes easier to understand after the resume outcome is visible.

Alternative considered:

- Keep experience cards but rename them. This would still foreground the internal model before the user understands the outcome.

### Decision 3: Treat Switch Lens as part of the student resume flow

Switch Lens should update a resume preview for different roles rather than sit as a secondary proof feature.

Rationale:

- Students understand "show me my resume for this job" faster than "reframe this evidence card."
- The same underlying experience can still be marked as shared proof.

Alternative considered:

- Keep Switch Lens as a separate module after proof cards. This makes it feel optional and less central than the plan requires.

### Decision 4: Make employer coverage compare resume versions, not rank candidates

The employer flow should include multiple seeded resume versions so coverage changes are obvious. The UI must avoid ranking language and numeric scores.

Rationale:

- Comparing resume versions demonstrates the feature without implying candidate ranking.
- Requirement-by-requirement labels are more trustworthy than an aggregate fit score.

Alternative considered:

- Show one resume only. This is simpler but does not clearly demonstrate how the coverage feature responds to different resumes.

### Decision 5: Use CSS transitions first for animation

Use Tailwind/CSS transitions and state changes before introducing an animation dependency.

Rationale:

- V1 is static and hackathon-scoped.
- CSS transitions are enough for step reveals, status changes, phrase highlights, and expandable proof chains.
- Avoiding new dependencies reduces risk.

Alternative considered:

- Add Framer Motion or GSAP. This may help later, but it is not necessary for the required prototype behavior.

## Risks / Trade-offs

- [Risk] Splitting the combined demo may duplicate data and UI code. -> Mitigation: define shared resume, requirement, and proof-chain types/helpers before building route-specific components.
- [Risk] Animations may distract from the story. -> Mitigation: use animations only for stage transitions, coverage updates, lens switches, and proof-chain expansion.
- [Risk] Employer resume comparison may be mistaken for candidate ranking. -> Mitigation: label the examples as resume versions or review examples, avoid ordering language, and avoid aggregate scores.
- [Risk] Removing standalone Skill Proof Cards could hide the proof concept. -> Mitigation: keep proof details inside employer proof-chain expansion and student source/proof hints.
- [Risk] The legacy `SkillProofDemo` component may remain too large during migration. -> Mitigation: create new `StudentResumeDemo` and `EmployerCoverageDemo` components, then reduce or remove the legacy combined component after routes are migrated.

## Migration Plan

1. Add or update static data for natural-language student inputs, cleaned experiences, general resume, role-specific resume versions, employer resume variants, and coverage mappings.
2. Add `/demo/student` and `/demo/employer` routes.
3. Replace `/demo` with a two-entry chooser.
4. Implement `StudentResumeDemo` using the new "My Resume" staged flow.
5. Implement `EmployerCoverageDemo` using the job-description-first coverage flow.
6. Update the landing page CTAs to route to the chooser and/or the two specific demos.
7. Keep the current combined demo code until the new routes build and render correctly.
8. Remove or retire the legacy combined demo after parity is confirmed.

Rollback strategy:

- Keep the existing combined demo component until the split routes are verified.
- If the new flow has issues, point `/demo` back to the legacy component while preserving the new data and components for iteration.

## Open Questions

- Should `/demo` default to the chooser only, or include a short pitch plus the two entry choices?
- Should the employer examples be labeled as "resume versions" from one student or "candidate resumes" from multiple students? The safer V1 choice is resume versions, because it reduces ranking implications.
- Should role-specific resume differences be highlighted at phrase level or bullet level? Bullet-level is simpler for V1; phrase-level can be added if time allows.
