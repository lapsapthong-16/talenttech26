## 1. Project Scaffold

- [x] 1.1 Scaffold a Next.js App Router project with TypeScript and Tailwind CSS in the workspace.
- [x] 1.2 Configure base metadata, global CSS, Tailwind tokens, and font fallbacks for the SkillProof editorial proof-system aesthetic.
- [x] 1.3 Add shared TypeScript types for experiences, jobs, requirements, matches, resume bullets, proof cards, claim proof chains, and recruiter review profiles.

## 2. Static Demo Data

- [x] 2.1 Create seeded Malaysian student experiences for coursework, part-time work, and club/event coordination.
- [x] 2.2 Create seeded job examples for Marketing Intern, Business Analyst Intern, and Management Trainee with requirements and source phrases.
- [x] 2.3 Create hardcoded proof-backed bullets, Skill Proof Cards, proof chains, coverage labels, interrogation prompts, before/after resume content, Switch Lens copy, and recruiter review content.
- [x] 2.4 Implement deterministic helper functions that return role-specific mock outputs from local data only.

## 3. Visual System Components

- [x] 3.1 Build shared layout primitives for browser chrome, marketing nav, app shell, side rail, section headers, evidence panels, cards, tags, and status labels.
- [x] 3.2 Build proof-system primitives for Claim -> Proof -> Requirement -> Defense panels, evidence links, source chips, and match-state badges.
- [x] 3.3 Verify the visual system uses ivory canvas, black serif headings, oxblood accents, thin dividers, restrained green/amber states, and readable product text.

## 4. Landing Screen

- [x] 4.1 Implement the landing first viewport with SkillProof wordmark, proof-backed claim value proposition, CTA, and trust/feature signals.
- [x] 4.2 Implement the Claim -> Proof -> Requirement -> Defense hero preview matching the selected reference aesthetic.
- [x] 4.3 Ensure the landing screen communicates the product concept in under 10 seconds without chatbot, ATS, scoring, or marketplace framing.

## 5. Student Workspace Screens

- [x] 5.1 Implement experience input/cards with editable local state and seeded messy student wording.
- [x] 5.2 Implement job selection and static requirement extraction for the three sample roles.
- [x] 5.3 Implement the requirement coverage map with Direct match, Possible match, Needs detail, and Not shown labels.
- [x] 5.4 Implement the generated claim proof chain detail view with source experience, requirement, proof detail, clarification question, and defense question.
- [x] 5.5 Implement the before/after resume transformation view with proof links for each improved bullet.
- [x] 5.6 Implement experience interrogation prompts for vague or under-evidenced experiences.

## 6. Skill Proof Cards Screen

- [x] 6.1 Implement the Skill Proof Cards screen with left evidence categories, searchable/sortable-looking proof list, and selected proof detail panel.
- [x] 6.2 Populate each proof card with skill name, source experience, proof detail, generated resume bullet, likely interview question, tags, and match status.
- [x] 6.3 Implement selected-card local state so choosing a card updates the detail panel.
- [x] 6.4 Match the provided reference screen structure and editorial UI treatment while keeping all content hardcoded.

## 7. Supporting Screens

- [x] 7.1 Implement Recruiter Proof Review with bullet evidence links and careful signal summary categories.
- [x] 7.2 Implement optional Switch Lens control that reframes at least one source experience across Marketing Intern, Business Analyst Intern, and Management Trainee.
- [x] 7.3 Add mock controls or navigation anchors for the key demo path without broken links or unavailable production flows.

## 8. Responsive QA and Verification

- [x] 8.1 Verify desktop layouts use polished multi-column app surfaces with aligned gutters and no overlapping text.
- [x] 8.2 Verify mobile layouts stack cleanly, keep controls tappable, and preserve proof-chain readability.
- [x] 8.3 Run lint if configured and resolve reported issues.
- [x] 8.4 Run `npm run build` and resolve build errors.
- [x] 8.5 Run a local dev server and manually verify the key mock flow in browser.
