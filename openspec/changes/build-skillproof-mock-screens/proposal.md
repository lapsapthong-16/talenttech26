## Why

SkillProof needs a polished hackathon demo that communicates the proof-backed application concept quickly while matching the selected editorial proof-system aesthetic. The current plan is intentionally V1 mock-only, so the proposal should define a hardcoded screen experience rather than backend, AI, database, or production workflow work.

## What Changes

- Scaffold a responsive Next.js App Router demo for SkillProof using TypeScript and Tailwind CSS.
- Build hardcoded mock screens for the core student journey: landing, experience input, job requirement extraction, claim proof chain, before/after resume view, Skill Proof Cards, requirement coverage, interrogation prompts, recruiter proof review, and optional Switch Lens.
- Apply the selected visual direction from the reference images: ivory editorial canvas, black serif wordmark/headlines, oxblood accents, thin dividers, evidence cards, restrained labels, and browser/app-shell polish.
- Use deterministic local data and React state only; all content, mappings, claims, and review outputs are seeded.
- Exclude backend services, API routes, databases, real AI calls, ATS scoring, readiness scoring, job marketplace, talent matching, university dashboards, and production recruiter pipelines.

## Capabilities

### New Capabilities

- `skillproof-mock-demo`: Hardcoded responsive SkillProof mock screens that demonstrate the proof-backed resume claim workflow and selected visual system.

### Modified Capabilities

- None.

## Impact

- Adds a new Next.js + React + TypeScript + Tailwind frontend in the project workspace.
- Adds local seeded data, static transformation helpers, shared types, and screen/components for the mock demo.
- Requires normal frontend build verification with `npm run build` and linting if configured.
- Does not introduce runtime backend dependencies, API integrations, authentication, persistence, or external data access.
