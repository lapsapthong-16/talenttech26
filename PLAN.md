# SkillProof Next.js Demo Plan

## Summary

Build a polished Next.js + React + TypeScript + Tailwind demo for **SkillProof**, a proof-backed application tool for students.

SkillProof turns vague academic, part-time, and club experience into defensible resume claims by showing the proof and employer requirement behind every bullet.

Core thesis:

> Students do not always lack experience. They often lack the language and proof structure to show how their experience maps to what employers actually ask for.

Startup wedge:

> Do not compete as a generic AI resume builder. Own the narrower claim-proof workflow: every resume claim should have a source, a matched requirement, and a defense question.

Selected hackathon modules:
- **Living Portfolio**: store student experiences as reusable Experience Cards.
- **Adaptive Readiness Profile**: show role coverage using careful labels, not fake scores.
- **Custom module: Employer-Language Translator**: parse job requirements and translate student experience into employer-facing resume language.
- **Supporting module: Career Path Navigator**: lightly supported through Switch Lens, showing how the same experience can be reframed for different roles.

V1 is an **interactive mock**, not real AI:
- No backend.
- No API routes.
- No database.
- Static deterministic logic and seeded examples.
- Key flows clickable; the whole product does not need to be fully implemented.

## Key Product Flow

The demo centers on a Malaysian fresh-grad/student scenario.

Main user journey:
1. Student lands on SkillProof and sees the concept: “Turn vague student experience into proof-backed resume claims.”
2. Student enters or edits experiences from:
   - Coursework/group assignments.
   - Part-time work.
   - Clubs/events.
3. Student chooses or pastes a job post.
   - Include seeded roles such as Marketing Intern, Business Analyst Intern, and Management Trainee.
4. SkillProof extracts employer requirements from the selected job post using static rules.
5. SkillProof drafts role-specific resume claims.
6. Student opens each claim and sees the full proof chain:
   - source experience,
   - employer requirement matched,
   - proof detail,
   - clarification question,
   - interview defense prompt.
7. The app maps student experiences to job requirements with careful labels:
   - Direct match.
   - Possible match.
   - Needs detail.
   - Not shown.
8. The hero output is **Claim -> Proof -> Requirement -> Defense**:
   - the generated resume bullet,
   - the source experience that supports it,
   - the job requirement it maps to,
   - the question the student must be ready to answer.
9. The secondary output is **Before/After Resume View**:
   - weak original wording,
   - improved role-specific resume bullets,
   - the proof behind each claim.
10. Student sees **Experience Interrogation** prompts:
   - short follow-up questions that ask for missing proof before the app generates stronger claims.
11. Student sees **Skill Proof Cards**:
   - skill name,
   - source experience,
   - proof detail,
   - generated resume bullet,
   - likely interview question.
12. Student can use **Switch Lens** as a supporting feature:
   - see the same experience reframed for different roles such as Marketing Intern, Business Analyst Intern, and Management Trainee.
13. The generated outputs include:
   - proof-backed resume bullets,
   - Skill Proof Cards,
   - Claim Defense Questions,
   - Requirement Coverage Map.
14. Recruiter Proof Review inspects the generated candidate profile.
   - Recruiter sees each resume bullet linked back to source experience and job requirement.
   - Recruiter sees a careful signal summary of strongest supported skills, skills needing clarification, and experience sources used.
   - No ranked candidate matching, pipeline, ATS score, or hiring recommendation in V1.

## Implementation Changes

Scaffold a Next.js app from this plan.

Use:
- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- React client components for the interactive demo.
- Static local data and `useState` for demo state.

Recommended structure:
- `src/app/page.tsx`: landing page plus embedded demo sections.
- `src/components/`: hero, module stack, demo workspace, experience cards, job post panel, mapping board, claim proof chain, before/after resume view, skill proof cards, recruiter proof review, optional switch lens control.
- `src/lib/demoData.ts`: seeded student experiences, sample jobs, requirements, and output examples.
- `src/lib/skillproof.ts`: static mapping/generation functions.
- `src/types/skillproof.ts`: shared TypeScript types.

Core types:
- `ExperienceCard`: source type, title, raw description, extracted signals, evidence notes.
- `JobPost`: title, company, description, requirements.
- `Requirement`: label, category, source phrase.
- `RequirementMatch`: requirement, matched experience ids, status label, explanation.
- `ResumeBullet`: bullet text, source experience ids, linked requirement ids.
- `SkillProofCard`: skill label, source experience id, proof detail, generated bullet id, interview question.
- `ClaimProofChain`: generated bullet id, source experience id, linked requirement id, proof detail, clarification question, defense question.
- `ApplicationPack`: proof-backed bullets, skill proof cards, claim defense questions, requirement coverage map.
- `RecruiterReviewProfile`: candidate summary, bullet evidence links, requirement coverage, signal summary.

UI direction:
- Editorial Career OS tone.
- Premium, serious, readable, not playful or generic.
- Use strong typography, restrained colors, structured panels, and clear before/after transformation.
- Avoid fake precision like “87% ready.”
- Avoid generic chatbot UI as the main experience.
- Make SkillProof feel like a proof system, not an AI writing assistant.
- Do not market or design SkillProof as an ATS optimizer, resume template builder, generic AI career coach, job marketplace, or talent matching platform.

## Demo Content

Seed one main student:
- Malaysian final-year student/fresh grad.
- Experiences include:
  - Marketing/coursework group assignment.
  - Part-time customer-facing work.
  - Club/event coordination.

Seed job examples:
- Marketing Intern.
- Business Analyst Intern.
- Management Trainee.

The demo should visibly transform weak student wording like:
- “Did group assignment about GrabFood.”
- “Helped with club event.”
- “Worked part-time at cafe.”

Into role-specific outputs like:
- “Conducted student survey research to identify food delivery behavior patterns and presented marketing recommendations.”
- “Coordinated event logistics and vendor communication for a student club activity.”
- “Handled customer requests in a fast-paced service environment while maintaining transaction accuracy.”

The main demo should make the proof chain visible:
- Resume claim.
- Source experience.
- Employer requirement.
- Clarification question.
- Interview defense question.

The demo can also show the same experience through **Switch Lens**:
- Marketing Intern lens: customer research, campaign insight, presentation.
- Business Analyst Intern lens: survey analysis, pattern finding, data interpretation.
- Management Trainee lens: coordination, communication, structured problem solving.

Experience Interrogation prompts should ask for details such as:
- What did you personally do?
- How many people, data points, customers, or participants were involved?
- What tool, method, or process did you use?
- What recommendation, output, or result came from the work?

Recruiter signal summary should avoid scores and use careful categories:
- Strongest supported skills.
- Skills needing clarification.
- Experience sources used.
- Requirements covered by evidence.

## MVP Priority

Must-have:
- Messy experience input.
- Job requirement extraction.
- Claim -> Proof -> Requirement -> Defense view.
- Before/After Resume View.
- Skill Proof Cards.
- Experience Interrogation prompts.
- Requirement Coverage Map.
- Recruiter Proof Review.

Nice-to-have:
- Switch Lens.
- Suggested skills section.
- Full landing page storytelling.

Cut for V1:
- Full employer dashboard.
- University view.
- Readiness scores.
- ATS score.
- Job marketplace.
- Talent matching.
- Broad application pack.

## Test Plan

Manual acceptance checks:
- Landing page clearly explains SkillProof in under 10 seconds.
- Student can edit/select experiences and choose a sample job post.
- Mapping board updates based on selected job.
- Claim proof chain links each generated bullet to source experience, employer requirement, clarification question, and defense question.
- Before/after resume view makes the transformation obvious.
- Experience Interrogation prompts appear for vague experience cards.
- Skill Proof Cards link skills to source experience, resume bullet, and interview question.
- Resume output is role-specific and linked to student experience.
- Recruiter Proof Review shows evidence behind generated bullets and a careful signal summary.
- Switch Lens changes how at least one experience is reframed across roles if included.
- UI works on desktop and mobile widths.
- No UI claims verification, prediction, or hiring recommendation.
- No broken navigation for the key demo path.

Build checks:
- `npm run lint` if configured.
- `npm run build`.
- Run local dev server and verify the main flow in browser.

## Assumptions

- The demo is for hackathon pitching, not production use.
- Static logic is acceptable for V1; no AI integration boundary is planned yet.
- Recruiter Proof Review is an evidence review surface, not Smart Talent Matching.
- Universities are not a V1 user surface; do not add a university dashboard unless the concept is later expanded.
- The product should be web-first and responsive.
- The app should prioritize the proof-backed resume transformation over complete platform navigation.
