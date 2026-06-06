# SkillProof Prototype Plan

## Product Point

SkillProof is a proof-backed application tool for students and fresh graduates.

It turns vague student experience into defensible resume claims by connecting every generated bullet to:
- a source experience,
- a matched employer requirement,
- a proof detail,
- a clarification question,
- an interview defense question.

The prototype should make the core flow obvious before showing dashboards or secondary proof views.

## Prototype Principle

This is not a full product build.

The prototype must demonstrate the different demo flows clearly:
1. A student starts with messy experience.
2. The student chooses or pastes a target job.
3. SkillProof analyzes the experience against employer language.
4. SkillProof recommends proof-backed resume claims.
5. The student sees what is supported, what needs detail, and how to defend the claim.

V1 remains a static interactive mock:
- no backend,
- no API routes,
- no database,
- no real AI call,
- deterministic local data and simulated AI output,
- clickable enough to explain the product in a pitch.

## Primary Screens

These screens are the most important. They should appear first and form the main prototype path.

### 1. Overall Start Screen

Purpose:
- Explain SkillProof in one screen.
- Show the basic promise: messy student experience -> proof-backed resume claims.
- Make the next action obvious.

Content:
- Product name: SkillProof.
- One-line promise: "Turn messy student experience into proof-backed resume claims."
- Short explanation: students often have evidence, but not the structure or language to map it to job requirements.
- Primary action: start the guided demo.

Must avoid:
- Opening directly on dashboards.
- Showing recruiter review before the student flow is understood.
- Overloading the user with all modules at once.

### 2. Paste Experience Screen

Purpose:
- Show the student input moment.
- Make it obvious that the product starts from messy real wording.

User action:
- Paste or edit weak experience wording.
- Optionally choose source type: coursework, part-time work, club/event.

Seeded examples:
- "Did group assignment about GrabFood."
- "Worked part-time at cafe."
- "Helped with club event."

Displayed output:
- Detected signals such as research, customer handling, coordination, communication.
- Proof hints such as survey responses, POS handling, vendor messages, participant count.

### 3. Target Job Screen

Purpose:
- Show that SkillProof rewrites against employer requirements, not generic resume advice.

User action:
- Choose a seeded role or paste a job post.

Seeded roles:
- Marketing Intern.
- Business Analyst Intern.
- Management Trainee.

Displayed output:
- Job requirements extracted from the selected role.
- Requirement language shown plainly.
- If paste is included, it can be a mock textarea with deterministic "AI extracted" output.

### 4. AI Recommendation Screen

Purpose:
- Show the simulated AI analysis and recommendation step.

Displayed output:
- Experience signals found.
- Employer requirements found.
- Match status using careful labels:
  - Direct match.
  - Possible match.
  - Needs detail.
  - Not shown.
- Missing-proof questions before stronger claims are generated.

Must avoid:
- Fake readiness percentages.
- ATS scores.
- Hiring predictions.
- Ranking or matching candidates.

### 5. Generated Claims Screen

Purpose:
- Show the core product outcome.

Displayed output:
- Before/after resume transformation.
- Generated proof-backed resume bullets.
- For each selected bullet:
  - Claim.
  - Proof.
  - Requirement.
  - Defense.
- Clarification question.
- Interview defense question.

This is the hero product moment.

## Secondary Screens

These screens support the prototype but should appear after the primary flow or in a secondary section.

### Skill Proof Cards

Purpose:
- Store reusable proof objects for the student.

Content:
- Skill label.
- Source experience.
- Proof detail.
- Generated bullet.
- Likely interview question.

### Requirement Coverage Map

Purpose:
- Show role coverage carefully without scores.

Content:
- Direct match.
- Possible match.
- Needs detail.
- Not shown.
- Explanation for each requirement.

### Experience Interrogation Prompts

Purpose:
- Ask for missing proof before overclaiming.

Prompt examples:
- What did you personally do?
- How many people, data points, customers, or participants were involved?
- What tool, method, or process did you use?
- What recommendation, output, or result came from the work?

### Switch Lens

Purpose:
- Show how the same experience can be reframed for different roles.

Lenses:
- Marketing Intern: customer research, campaign insight, presentation.
- Business Analyst Intern: survey analysis, pattern finding, data interpretation.
- Management Trainee: coordination, communication, structured problem solving.

### Recruiter Proof Review

Purpose:
- Show how a recruiter can inspect evidence behind claims.

Content:
- Candidate summary.
- Resume bullets linked to source experience and requirement.
- Strongest supported skills.
- Skills needing clarification.
- Experience sources used.
- Requirements covered by evidence.

Must avoid:
- Candidate ranking.
- Hiring recommendation.
- ATS score.
- Pipeline or marketplace behavior.

## Demo Data

Use one Malaysian final-year student or fresh graduate.

Experience sources:
- Marketing/coursework group assignment.
- Part-time customer-facing work.
- Club/event coordination.

The main transformation should visibly convert weak wording into role-specific claims:
- "Did group assignment about GrabFood." -> "Conducted student survey research on food delivery behaviour and translated 120 responses into campaign recommendations."
- "Helped with club event." -> "Coordinated vendor communication and registration flow for an 80-participant business society orientation event."
- "Worked part-time at cafe." -> "Handled customer requests during weekend rush periods while maintaining payment accuracy and clear shift handovers."

## Implementation Direction

Use:
- Next.js App Router.
- React client components.
- TypeScript.
- Tailwind CSS.
- Static local data.
- `useState` for the guided prototype state.

Recommended structure:
- `src/app/page.tsx`: simple landing/product overview.
- `src/app/demo/page.tsx`: interactive guided prototype.
- `src/components/SkillProofDemo.tsx`: primary and secondary demo flows.
- `src/lib/demoData.ts`: seeded experiences, jobs, requirements, generated outputs.
- `src/lib/skillproof.ts`: deterministic lookup and simulated analysis helpers.
- `src/types/skillproof.ts`: shared types.

## MVP Priority

Primary must-have:
- Overall start screen.
- Paste/edit experience screen.
- Choose/paste job screen.
- Simulated AI recommendation screen.
- Generated claims screen with Claim -> Proof -> Requirement -> Defense.

Secondary must-have:
- Skill Proof Cards.
- Requirement Coverage Map.
- Experience Interrogation prompts.
- Recruiter Proof Review.

Nice-to-have:
- Switch Lens.
- Suggested skills.
- Full landing page storytelling.

Cut for V1:
- Full employer dashboard.
- University view.
- Readiness scores.
- ATS score.
- Job marketplace.
- Talent matching.
- Broad application pack.

## Manual Acceptance Checks

- A developer can understand the core product flow from the first screen.
- The prototype starts with user input, not a dashboard.
- Student can edit messy experience wording.
- Student can choose a seeded job role.
- A paste-job affordance is visible even if deterministic.
- The recommendation screen shows simulated analysis and careful match labels.
- The generated claims screen makes the before/after transformation obvious.
- Claim -> Proof -> Requirement -> Defense is visible for the selected claim.
- Secondary proof views are present but do not dominate the opening.
- No UI claims verification, prediction, ATS scoring, ranking, or hiring recommendation.
- `npm run lint` passes.
- `npm run build` passes.
