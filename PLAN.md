# SkillProof Prototype Plan

## Product Point

SkillProof is a proof-backed resume and hiring-review prototype for students, fresh graduates, and early-talent employers.

The product has two sides:

1. Students turn ordinary experience into a stronger resume.
2. Employers review how well a student's resume fulfills a job description, with proof and gaps made visible.

The core promise is:

```text
Raw student experience -> General resume -> Role-specific resume -> Requirement coverage -> Proof review
```

SkillProof is not a generic resume builder, ATS optimizer, job marketplace, talent ranking system, or hiring recommendation tool.

It is a claim-proof system. It helps users understand what a resume claim is based on, what job requirement it supports, and what still needs clarification.

## Prototype Principle

The prototype should be easy to explain in a pitch and easy to understand without developer context.

The demo should not open on dashboards, cards, or technical proof objects. It should start from familiar user mental models:

- students start from **My Resume**,
- employers start from **Job Description Review**.

V1 remains a static interactive mock:

- no backend,
- no API routes,
- no database,
- no real AI call,
- deterministic local data and simulated AI output,
- clickable enough to explain the product in a hackathon pitch.

Animations and transitions should be used to show progression inside each flow:

- input expanding into structured sections,
- resume text being rewritten,
- role lenses switching,
- requirements lighting up as covered or missing,
- proof chains expanding from a selected bullet.

Animation should explain the product sequence. It should not become decorative noise.

## Demo Structure

The prototype should have **two main demo pages**.

Recommended routes:

```text
/                    Landing page
/demo                Demo chooser / split entry
/demo/student        Student resume builder flow
/demo/employer       Employer requirement coverage flow
```

The landing page should pitch SkillProof and guide users into either:

- **Student: Build My Resume**
- **Employer: Review Resume Fit**

The two flows should feel related visually but have different jobs.

## Flow 1: Student Resume Builder

Route:

```text
/demo/student
```

### Purpose

Show how a student can start with natural-language experience and end with a general resume plus role-specific resume versions.

This flow replaces the earlier separate "messy experience cards" and "target job / switch lens" flows.

The student's mental model should be:

> I write what I have done, SkillProof helps me build a better resume, then I can reword that resume for different job descriptions.

### Core Story

```text
My Resume -> Natural experience input -> Rephrased experience -> General resume -> Switch Lens role resumes
```

### Screen / Stage 1: My Resume

Purpose:

- Start from a familiar resume workspace.
- Make the student feel like they are building their own resume, not filling a technical evidence database.

Content:

- Page title: "My Resume"
- Empty or partially filled resume preview.
- Natural-language experience input area.
- Prompt examples:
  - assignments,
  - group projects,
  - part-time jobs,
  - volunteer work,
  - club activity,
  - freelance work,
  - competitions,
  - internships,
  - coursework.

User action:

- Student writes experience in natural language.
- The input should accept casual wording, not resume-style wording.

Seeded raw examples:

- "Did group assignment about GrabFood."
- "Worked part-time at cafe."
- "Helped with club event."
- "Volunteered during orientation week."

Animation idea:

- As the student submits or selects a seeded input, the raw paragraph separates into detected experience blocks.
- Signals such as research, coordination, customer handling, communication, and presentation can appear as small chips.

### Screen / Stage 2: Rephrased Experience

Purpose:

- Show SkillProof's first value moment: turning raw experience into clearer resume-ready language.

Displayed output:

- Raw wording on one side.
- Rephrased experience on the other.
- Detected proof hints below:
  - survey responses,
  - customers handled,
  - vendor messages,
  - participant count,
  - presentation output,
  - tools or methods used.

Important:

- This stage should not yet claim role fit.
- It should only clean up and structure the student's experience.

Animation idea:

- Raw text fades into structured resume lines.
- Proof hints appear progressively so the user understands why the rewrite is stronger.

### Screen / Stage 3: General Resume

Purpose:

- Show the student a general-purpose resume built from their cleaned experiences.

Content:

- Resume preview with:
  - profile summary,
  - experience bullets,
  - skills inferred from experience,
  - education placeholder,
  - project / activity section.

Displayed output:

- General resume bullets that are stronger than the raw input but not yet tailored to a specific job.

Example transformation:

```text
"Did group assignment about GrabFood."
```

becomes:

```text
Conducted student research on food delivery behaviour and summarized findings into practical campaign recommendations.
```

Animation idea:

- Resume preview fills section by section.
- The app can briefly highlight which raw input created each resume bullet.

### Screen / Stage 4: Switch Lens

Purpose:

- Show how the same general resume can be reworded for different job descriptions.

Seeded roles:

- Marketing Intern.
- Business Analyst Intern.
- Management Trainee.

User action:

- Student selects a target role or job description.

Displayed output:

- Role-specific resume version.
- Differences highlighted against the general resume.
- Same source experience, different framing.

Examples:

- Marketing lens emphasizes customer research, campaign insight, presentation.
- Business analyst lens emphasizes survey analysis, pattern finding, data interpretation.
- Management trainee lens emphasizes coordination, communication, structured problem solving.

Animation idea:

- A segmented control or tab switch morphs the resume wording.
- Changed phrases can be highlighted briefly.
- A "same proof, different framing" marker should appear to make the concept obvious.

### Student Flow Must Avoid

- Starting with "messy experience cards" as the first concept.
- Making the student understand proof databases before they understand the resume outcome.
- Showing employer review too early.
- Fake scoring.
- ATS optimization language as the main promise.

## Flow 2: Employer Requirement Coverage

Route:

```text
/demo/employer
```

### Purpose

Show how an employer can compare student resumes against a job description and inspect proof-backed claims without turning the product into ranking, ATS scoring, or hiring recommendations.

This flow combines the earlier requirement coverage, claim proof chain, and recruiter proof review ideas.

The employer's mental model should be:

> I have a job description. Which parts of this student's resume are actually supported, which requirements are covered, and what needs clarification?

### Core Story

```text
Job description -> Select student resume -> Requirement coverage -> Claim proof chain -> Recruiter proof review
```

### Screen / Stage 1: Job Description Review

Purpose:

- Start from the employer's familiar object: a job description.

Content:

- Seeded job description panel.
- Extracted requirements list.
- Role selector:
  - Marketing Intern,
  - Business Analyst Intern,
  - Management Trainee.

Displayed output:

- Plain-language requirements extracted from the job post.
- No scoring yet.

Animation idea:

- Job description text highlights requirement phrases.
- Extracted requirements slide into a checklist or coverage map.

### Screen / Stage 2: Resume Comparison

Purpose:

- Show that requirement coverage changes depending on the resume.

This demo should include multiple student resume versions or candidates so the feature is obvious.

Recommended seeded resumes:

- Resume A: strong marketing fit.
- Resume B: possible fit but missing details.
- Resume C: general resume with weaker role coverage.

User action:

- Employer switches between resumes.

Displayed output:

- Resume preview.
- Requirement coverage changes per selected resume.
- Visible differences between direct match, possible match, needs detail, and not shown.

Animation idea:

- Coverage bars/checks update when a different resume is selected.
- Requirement rows can animate between statuses.
- Keep labels explicit; do not rely only on color.

### Screen / Stage 3: Requirement Coverage

Purpose:

- Show how much the student's resume fulfills the job description in a careful, non-ranking way.

Status labels:

- Direct match.
- Possible match.
- Needs detail.
- Not shown.

Displayed output:

- Requirement-by-requirement coverage.
- Explanation for each status.
- Matching resume bullet, if available.
- Missing-proof prompt, if more detail is needed.

Must avoid:

- ATS score.
- Fit percentage.
- Candidate ranking.
- "Hire / reject" language.
- Automatic hiring recommendation.

Animation idea:

- Requirement rows expand on click.
- Status labels animate into place.
- Missing requirements can pulse subtly or reveal a clarification prompt.

### Screen / Stage 4: Claim Proof Chain

Purpose:

- Let the employer inspect why a resume bullet is considered supported.

Displayed output:

```text
Claim -> Proof -> Requirement -> Defense
```

For each selected bullet:

- Claim: the resume bullet.
- Proof: source detail from student experience.
- Requirement: job description requirement it supports.
- Defense: interview question the student should be able to answer.

Animation idea:

- Clicking a bullet expands the proof chain.
- The chain can animate left-to-right from claim to defense.
- The selected resume bullet and selected requirement should remain visually linked.

### Screen / Stage 5: Recruiter Proof Review

Purpose:

- Summarize the resume's evidence quality for employer review.

Content:

- Candidate proof summary.
- Strongest supported skills.
- Skills needing clarification.
- Experience sources used.
- Requirements covered by evidence.
- Questions to ask in interview.

Important:

- The review should help a recruiter ask better questions.
- It should not rank candidates or make a hiring decision.

Animation idea:

- Summary panels can appear after the coverage map is reviewed.
- Interview questions can reveal from the "Needs detail" rows.

### Employer Flow Must Avoid

- Presenting SkillProof as candidate matching.
- Ranking students.
- Using percentages as proof.
- Hiding the actual evidence behind a score.
- Making the employer flow feel like a generic ATS dashboard.

## Demo Data

Use one Malaysian final-year student or fresh graduate for the student flow, then reuse that data in the employer flow with multiple resume versions.

Student experience sources:

- Marketing/coursework group assignment.
- Part-time customer-facing work.
- Club/event coordination.
- Volunteer or orientation support.

Primary raw-to-clean transformations:

```text
"Did group assignment about GrabFood."
-> "Conducted student research on food delivery behaviour and summarized findings into practical campaign recommendations."
```

```text
"Helped with club event."
-> "Coordinated vendor communication and registration flow for an 80-participant business society orientation event."
```

```text
"Worked part-time at cafe."
-> "Handled customer requests during weekend rush periods while maintaining payment accuracy and clear shift handovers."
```

Employer demo resumes:

- General resume: broad wording, lower role-specific coverage.
- Marketing resume: emphasizes customer research, campaign insight, communication.
- Analyst resume: emphasizes survey analysis, patterns, structured recommendations.
- Management resume: emphasizes coordination, stakeholder communication, execution.

## Visual / Interaction Direction

The prototype should feel public-facing and understandable to younger users.

Use the current semantic color system consistently:

- Coral: raw input, weak wording, before state.
- Cyan: proof, evidence, source detail.
- Violet: role selection, lens switching, primary action.
- Lime: supported output, direct coverage, after state.
- Amber: gaps, questions, clarification needed.

Interaction patterns:

- Two large route choices on `/demo`.
- Tabs or segmented controls inside each flow.
- Animated stepper for flow progression.
- Side-by-side before/after for student rephrasing.
- Resume preview that updates as the user changes lens.
- Coverage map that updates as employer switches resumes.
- Expandable proof chain for selected bullet.

Do not overuse cards. Use cards for repeated items, resume blocks, proof chains, and coverage rows only.

## Implementation Direction

Use:

- Next.js App Router.
- React client components.
- TypeScript.
- Tailwind CSS.
- Static local data.
- `useState` for interactive prototype state.
- CSS transitions first; add animation libraries only if needed.

Recommended structure:

```text
src/app/page.tsx
  Landing page and product story.

src/app/demo/page.tsx
  Demo chooser with two entry points.

src/app/demo/student/page.tsx
  Student resume builder flow.

src/app/demo/employer/page.tsx
  Employer requirement coverage flow.

src/components/StudentResumeDemo.tsx
  Student-side interactive flow.

src/components/EmployerCoverageDemo.tsx
  Employer-side interactive flow.

src/components/SkillProofDemo.tsx
  Temporary legacy combined demo, to be split or removed after migration.

src/components/ui.tsx
  Shared UI primitives.

src/lib/demoData.ts
  Seeded experiences, jobs, resumes, requirements, generated outputs.

src/lib/skillproof.ts
  Deterministic lookup and simulated analysis helpers.

src/types/skillproof.ts
  Shared product types.
```

## MVP Priority

### Must Have: Student Flow

- `/demo/student` route.
- My Resume opening state.
- Natural-language experience input.
- Seeded raw experience examples.
- Rephrased experience output.
- General resume preview.
- Switch Lens role-specific resume versions.
- Visible difference between general resume and role-specific resume.

### Must Have: Employer Flow

- `/demo/employer` route.
- Job description panel.
- Extracted requirement list.
- Multiple resume versions to compare.
- Requirement coverage statuses.
- Coverage explanation per requirement.
- Claim -> Proof -> Requirement -> Defense inspection.
- Recruiter proof review summary.

### Must Have: Shared

- `/demo` chooser page.
- Consistent visual language between both demos.
- Clear back/next or step navigation.
- No fake ATS score, ranking, matching, or hiring recommendation.
- Static deterministic data only.

### Nice To Have

- Smooth step transitions.
- Animated resume phrase changes.
- Animated coverage map updates.
- Export-looking resume preview.
- Interview question reveal.
- Better Malaysian student scenario data.

### Cut For V1

- Real AI parsing.
- Backend APIs.
- Database.
- Authentication.
- University dashboard.
- Employer account dashboard.
- Job marketplace.
- Talent matching.
- ATS score.
- Readiness percentage.
- Hiring recommendation.

## Manual Acceptance Checks

- A non-technical user can understand the product from the first screen.
- `/demo` clearly offers two flows: Student and Employer.
- Student flow starts with "My Resume", not proof cards or a dashboard.
- Student can write or select natural-language experience.
- Student sees experience rephrased before seeing role-specific resumes.
- Student can switch between role lenses and see resume wording change.
- Employer flow starts with a job description.
- Employer can switch between multiple resumes.
- Requirement coverage changes when the selected resume changes.
- Coverage uses explicit labels: Direct match, Possible match, Needs detail, Not shown.
- A selected resume bullet can expand into Claim -> Proof -> Requirement -> Defense.
- Recruiter review summarizes evidence and gaps without making a hiring recommendation.
- Prototype avoids ATS scores, rankings, fit percentages, marketplace behavior, and candidate matching.
- `npm run lint` passes.
- `npm run build` passes.
