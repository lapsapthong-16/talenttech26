## Context

SkillProof is planned as a hackathon-ready, web-first demo for Malaysian students and fresh grads. The product thesis is narrow: turn vague student experience into proof-backed resume claims by showing the source experience, matched employer requirement, proof detail, clarification question, and interview defense prompt behind each generated bullet.

The current workspace has planning and OpenSpec files only. Implementation should scaffold a new Next.js App Router frontend and keep the experience as a deterministic mock. The selected visual direction is the Theme 1 editorial proof-system style from the reference images: ivory canvas, black serif identity, oxblood accent, thin dividers, structured evidence panels, restrained status tags, and polished browser/app-shell layouts.

## Goals / Non-Goals

**Goals:**

- Implement a polished responsive SkillProof demo with hardcoded mock screens and seeded content.
- Preserve the selected editorial proof-system aesthetic across landing and app screens.
- Make the core proof workflow visible: experience input, role selection, requirement extraction, claim generation, proof chain, coverage labels, Skill Proof Cards, before/after resume view, interrogation prompts, recruiter proof review, and optional Switch Lens.
- Use static local data and deterministic helper functions so controls feel interactive without external systems.
- Keep the demo implementation readable and easy to adjust for pitch iteration.

**Non-Goals:**

- No backend, API routes, database, authentication, file uploads, AI calls, model prompts, or external integrations.
- No ATS optimization, readiness score, candidate ranking, hiring recommendation, talent matching, job marketplace, university dashboard, or full employer dashboard.
- No production persistence. Any edits are local UI state only and reset on refresh.
- No generic chatbot interface as the primary experience.

## Decisions

### Use a single-page responsive mock app

Build the main experience in `src/app/page.tsx` with embedded screen sections and componentized surfaces under `src/components/`.

- Rationale: The plan asks for key flows to be clickable but not fully implemented. A single page supports a smooth pitch narrative while still showing multiple product screens.
- Alternative considered: Multi-route app. Rejected because route plumbing adds complexity without improving the V1 demo.

### Use hardcoded data with deterministic state transitions

Store seeded experiences, sample jobs, requirements, proof cards, bullets, coverage, and recruiter review content in `src/lib/demoData.ts`. Add pure helper functions in `src/lib/skillproof.ts` to filter or derive selected-job outputs.

- Rationale: This gives the demo believable interactions while honoring the mock-only constraint.
- Alternative considered: Simulated API layer. Rejected because it implies backend architecture and increases moving parts.

### Encode the visual system in Tailwind and shared components

Use Tailwind CSS with CSS variables or theme tokens for ivory, black, oxblood, graphite, muted green, and soft amber. Build shared components for app shell, evidence cards, status labels, proof-chain panels, and section headers.

- Rationale: The reference images depend on consistent type hierarchy, thin borders, restrained color, and repeated proof objects. Shared components keep that consistency.
- Alternative considered: One-off CSS per section. Rejected because it risks visual drift across the mock screens.

### Prioritize serif identity with utilitarian product structure

Use a high-contrast serif for the SkillProof wordmark and major headings, paired with a clean sans-serif for product UI text. If custom font loading is not available, use reliable local fallback stacks.

- Rationale: The selected direction is memorable because the brand feels editorial while the app surfaces feel structured and trustworthy.
- Alternative considered: Full sans-serif SaaS styling. Rejected because it weakens the chosen Theme 1 identity.

### Treat app screens as mock surfaces, not production workflows

Clickable controls should update selected job, selected proof card, selected claim, or selected lens. Buttons that imply unavailable production actions can be present as mock controls but must not navigate to broken flows.

- Rationale: The demo needs to feel real in a pitch without promising complete product capability.
- Alternative considered: Disable most controls. Rejected because the plan requires key flows to be clickable.

## Risks / Trade-offs

- **Generated UI text may become too dense on mobile** -> Use responsive layouts that stack panels, reduce columns, and keep fixed-format elements constrained.
- **The aesthetic may become too landing-page-like and not enough product-like** -> Anchor the implementation around evidence panels, proof chains, and app shell screens rather than decorative storytelling.
- **Hardcoded logic may look fake if outputs do not respond to selection** -> Ensure job role and selected proof state changes update visible requirements, bullets, labels, and proof details.
- **The demo could accidentally imply scoring or hiring recommendations** -> Use careful labels only: Direct match, Possible match, Needs detail, Not shown, Strongest supported skills, Skills needing clarification.
- **Browser/app-shell chrome could consume too much space on smaller screens** -> Preserve the aesthetic on desktop and simplify chrome on mobile while keeping content legible.
