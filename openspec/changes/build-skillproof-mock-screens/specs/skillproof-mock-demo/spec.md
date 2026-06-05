## ADDED Requirements

### Requirement: Editorial proof-system landing screen
The system SHALL present a responsive landing screen for SkillProof that communicates the proof-backed resume claim concept and matches the selected editorial visual theme.

#### Scenario: Landing communicates concept
- **WHEN** a visitor opens the demo
- **THEN** the first viewport displays the SkillProof brand, the value proposition about turning student experience into proof-backed resume claims, and a visible Claim -> Proof -> Requirement -> Defense system preview

#### Scenario: Landing follows selected aesthetic
- **WHEN** the landing screen is rendered
- **THEN** it uses an ivory editorial canvas, black serif identity, oxblood accents, thin dividers, restrained panels, and serious proof-system UI styling

### Requirement: Hardcoded mock data only
The system SHALL use static local data and deterministic client-side state for all demo content and interactions.

#### Scenario: No backend dependency
- **WHEN** the demo is built and run
- **THEN** it does not require API routes, backend services, databases, authentication, file uploads, AI calls, model prompts, or external data access

#### Scenario: Seeded data drives output
- **WHEN** a user selects a sample job or proof item
- **THEN** requirements, bullets, proof details, coverage labels, and review content update from seeded local data

### Requirement: Student mock workspace
The system SHALL include mock screens or sections for the student workflow from messy experience to role-specific proof-backed outputs.

#### Scenario: Experience and job selection are visible
- **WHEN** the student workspace is displayed
- **THEN** the user can see or edit seeded messy experience cards and select from Marketing Intern, Business Analyst Intern, and Management Trainee job examples

#### Scenario: Requirement extraction is visible
- **WHEN** a job example is selected
- **THEN** the workspace displays employer requirements extracted from that job using static labels and source phrases

### Requirement: Claim proof chain
The system SHALL show generated resume claims linked to their supporting proof chain.

#### Scenario: Claim chain is inspectable
- **WHEN** a user opens a generated claim
- **THEN** the screen shows the resume bullet, source experience, matched employer requirement, proof detail, clarification question, and interview defense question

#### Scenario: Claims avoid unsupported certainty
- **WHEN** generated claim outputs are shown
- **THEN** they do not claim verification, prediction, hiring recommendation, ATS optimization, or readiness scoring

### Requirement: Before and after resume transformation
The system SHALL show a before/after resume view that contrasts weak student wording with role-specific proof-backed bullets.

#### Scenario: Transformation is obvious
- **WHEN** the before/after screen is displayed
- **THEN** it shows weak original wording beside improved resume bullets and visible proof links for each improved bullet

### Requirement: Skill Proof Cards screen
The system SHALL include a Skill Proof Cards mock screen matching the provided reference layout and content model.

#### Scenario: Cards list proof-backed skills
- **WHEN** the Skill Proof Cards screen is displayed
- **THEN** it shows cards with skill name, source experience, proof detail, generated resume bullet, likely interview question, tags, and match status labels

#### Scenario: Selected card shows detail
- **WHEN** a user selects a Skill Proof Card
- **THEN** a detail panel displays source experience, proof detail, generated resume bullet, likely interview question, proof id or activity affordance, and related evidence chips

### Requirement: Requirement coverage map
The system SHALL show how student experiences map to job requirements using careful non-score labels.

#### Scenario: Coverage labels are careful
- **WHEN** requirement coverage is displayed
- **THEN** each requirement uses one of Direct match, Possible match, Needs detail, or Not shown rather than numeric scores

#### Scenario: Coverage updates by role
- **WHEN** the selected job changes
- **THEN** the requirement coverage map updates to show role-specific requirements and matching explanations

### Requirement: Experience interrogation prompts
The system SHALL show follow-up prompts that ask for missing evidence before stronger claims are implied.

#### Scenario: Vague experience produces prompts
- **WHEN** an experience lacks proof detail
- **THEN** the screen displays prompts asking what the student personally did, the scale involved, tools or methods used, and the output or result

### Requirement: Recruiter proof review
The system SHALL include a recruiter-facing proof review mock screen that inspects evidence behind the generated profile without ranking the candidate.

#### Scenario: Recruiter sees evidence links
- **WHEN** the recruiter review screen is displayed
- **THEN** it shows generated resume bullets linked back to source experiences and matched job requirements

#### Scenario: Recruiter summary avoids hiring recommendation
- **WHEN** signal summary is displayed
- **THEN** it uses careful categories such as strongest supported skills, skills needing clarification, experience sources used, and requirements covered by evidence without ranking or recommending the candidate

### Requirement: Optional Switch Lens
The system SHALL include a supporting Switch Lens mock interaction if it can be implemented without reducing quality of the must-have screens.

#### Scenario: Lens reframes same experience
- **WHEN** a user changes the lens between Marketing Intern, Business Analyst Intern, and Management Trainee
- **THEN** at least one experience is reframed with role-specific language while preserving the same underlying source experience

### Requirement: Responsive polished mock screens
The system SHALL render the mock screens professionally on desktop and mobile widths.

#### Scenario: Desktop layout is polished
- **WHEN** the demo is viewed on a desktop viewport
- **THEN** app-shell screens use multi-column layouts, readable hierarchy, aligned gutters, and reference-style visual polish

#### Scenario: Mobile layout remains usable
- **WHEN** the demo is viewed on a mobile viewport
- **THEN** panels stack without overlapping text, controls remain tappable, and key proof-chain content remains readable
