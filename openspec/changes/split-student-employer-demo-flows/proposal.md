## Why

The current prototype explains too many product concepts in one combined demo, which makes the story feel like information overload instead of a clear user journey. The plan now requires two focused demo flows so students start from a familiar "My Resume" workspace and employers start from a familiar job-description review workflow.

## What Changes

- Split the demo experience into a chooser route and two dedicated demo pages:
  - `/demo/student` for the student resume builder flow.
  - `/demo/employer` for the employer requirement coverage flow.
- Change the student-side opening from "messy experience cards" to a "My Resume" workspace with natural-language experience input.
- Add student-side progression from raw experience to rephrased experience, general resume, and Switch Lens role-specific resume versions.
- Change the employer-side demo into a job-description-first workflow that compares multiple resume versions against requirements.
- Keep proof-chain inspection and recruiter proof review inside the employer flow instead of presenting them as disconnected demo sections.
- Use animations and transitions to reveal flow stages, rewritten phrases, lens changes, coverage changes, and proof-chain expansion.
- Preserve existing guardrails: no backend, no real AI, no ATS score, no candidate ranking, no fit percentage, no talent matching, and no hiring recommendation.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skillproof-mock-demo`: Update the existing mock demo requirements from a combined proof-dashboard style demo to a two-page student/employer prototype with separate route-level flows, student "My Resume" input, employer requirement coverage comparison, and animated guided interactions.

## Impact

- Affected routes:
  - `src/app/page.tsx`
  - `src/app/demo/page.tsx`
  - `src/app/demo/student/page.tsx`
  - `src/app/demo/employer/page.tsx`
- Affected components:
  - Existing `src/components/SkillProofDemo.tsx` will be split, replaced, or reduced to legacy compatibility.
  - New student and employer demo components are expected.
  - Shared UI primitives may need small additions for step controls, resume previews, coverage rows, and proof-chain expansion.
- Affected data/helpers:
  - `src/lib/demoData.ts` needs seeded natural-language student inputs, general resume output, role-specific resume versions, multiple employer-review resume variants, and requirement coverage mappings.
  - `src/lib/skillproof.ts` may need deterministic lookup helpers for resume lenses, coverage by selected resume, and proof-chain details.
  - `src/types/skillproof.ts` may need types for resume versions, student input stages, employer comparison rows, and route-specific demo state.
- No new runtime dependencies are required for V1 unless CSS-only transitions are insufficient for the planned animations.
