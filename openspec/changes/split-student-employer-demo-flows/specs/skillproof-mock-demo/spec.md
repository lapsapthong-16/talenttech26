## ADDED Requirements

### Requirement: Split demo entry routes
The system SHALL provide separate demo routes for student and employer prototype flows, with a chooser route that makes both entry points visible.

#### Scenario: Demo chooser shows two flows
- **WHEN** a visitor opens `/demo`
- **THEN** the page displays distinct entry points for the student resume builder flow and the employer requirement coverage flow

#### Scenario: Student route renders student flow
- **WHEN** a visitor opens `/demo/student`
- **THEN** the page displays the student-side My Resume flow without opening on employer coverage, proof cards, or recruiter review

#### Scenario: Employer route renders employer flow
- **WHEN** a visitor opens `/demo/employer`
- **THEN** the page displays the employer-side job description and requirement coverage flow without opening on student resume editing

### Requirement: Animated guided progression
The system SHALL use transitions or animations to clarify the sequence of each demo flow without requiring backend services or external animation data.

#### Scenario: Student progression is visually staged
- **WHEN** the student advances through input, rephrasing, general resume, and Switch Lens stages
- **THEN** the interface reveals the next stage with a visible transition that preserves readability and does not overlap content

#### Scenario: Employer progression is visually staged
- **WHEN** the employer switches resumes, expands requirements, or opens a proof chain
- **THEN** coverage states and proof details update with visible transitions while keeping explicit text labels available

## MODIFIED Requirements

### Requirement: Editorial proof-system landing screen
The system SHALL present a responsive landing screen for SkillProof that communicates the proof-backed resume claim concept, uses the current semantic color system, and guides visitors into the two demo flows.

#### Scenario: Landing communicates concept
- **WHEN** a visitor opens the app
- **THEN** the first viewport displays the SkillProof brand, the value proposition about turning student experience into proof-backed resume claims, and a visible product story that connects student resume building with employer proof review

#### Scenario: Landing routes to separate demos
- **WHEN** the landing screen is rendered
- **THEN** it offers clear navigation to the student resume builder flow and employer requirement coverage flow

#### Scenario: Landing follows selected aesthetic
- **WHEN** the landing screen is rendered
- **THEN** it uses the current public-facing semantic palette with coral for raw input, cyan for proof, violet for role selection and primary actions, lime for supported output, and amber for gaps or clarification

### Requirement: Student mock workspace
The system SHALL include a student resume builder flow that starts from a My Resume workspace and natural-language experience input before showing structured proof objects.

#### Scenario: My Resume is the student starting point
- **WHEN** the student flow is displayed
- **THEN** the first stage shows a My Resume workspace with a natural-language input area for assignments, group projects, part-time jobs, volunteer work, club activity, freelance work, competitions, internships, or coursework

#### Scenario: Raw experience becomes rephrased experience
- **WHEN** a student enters or selects seeded natural-language experience
- **THEN** the flow displays the raw wording, rephrased resume-ready experience, and proof hints derived from static seeded data

#### Scenario: General resume is generated from cleaned experience
- **WHEN** rephrased experiences are available
- **THEN** the flow displays a general resume preview with stronger bullets that are not yet tailored to a specific job description

### Requirement: Before and after resume transformation
The system SHALL show resume transformation from natural-language student input into a general resume and role-specific resume versions.

#### Scenario: Raw-to-general transformation is obvious
- **WHEN** the student resume flow reaches the general resume stage
- **THEN** it shows how casual student wording becomes clearer resume bullets and indicates which source input produced each bullet

#### Scenario: General-to-role transformation is obvious
- **WHEN** the student selects a role lens
- **THEN** the resume preview updates to show role-specific wording while making the changed bullets or phrases visibly distinguishable from the general resume

### Requirement: Requirement coverage map
The system SHALL show how selected resume versions map to a job description using careful non-score labels.

#### Scenario: Coverage labels are careful
- **WHEN** requirement coverage is displayed
- **THEN** each requirement uses one of Direct match, Possible match, Needs detail, or Not shown rather than numeric scores or fit percentages

#### Scenario: Coverage updates by selected resume
- **WHEN** the selected resume version changes
- **THEN** the requirement coverage map updates to show the selected resume's requirement coverage and matching explanations

#### Scenario: Coverage starts from job description
- **WHEN** the employer flow is displayed
- **THEN** the first employer stage shows a seeded job description and extracted requirements before showing coverage results

### Requirement: Claim proof chain
The system SHALL show generated resume claims linked to their supporting proof chain inside the employer requirement coverage flow.

#### Scenario: Claim chain is inspectable
- **WHEN** an employer opens a supported or possible resume claim
- **THEN** the screen shows the resume bullet, source experience, matched employer requirement, proof detail, clarification question, and interview defense question

#### Scenario: Claims avoid unsupported certainty
- **WHEN** generated claim outputs are shown
- **THEN** they do not claim verification, prediction, hiring recommendation, ATS optimization, readiness scoring, candidate ranking, or talent matching

### Requirement: Recruiter proof review
The system SHALL include an employer-facing proof review summary that inspects evidence and gaps behind the selected resume without ranking the candidate.

#### Scenario: Recruiter sees evidence links
- **WHEN** the recruiter proof review is displayed
- **THEN** it shows generated resume bullets linked back to source experiences and matched job requirements for the selected resume

#### Scenario: Recruiter summary avoids hiring recommendation
- **WHEN** signal summary is displayed
- **THEN** it uses careful categories such as strongest supported skills, skills needing clarification, experience sources used, requirements covered by evidence, and interview questions without ranking or recommending the candidate

### Requirement: Optional Switch Lens
The system SHALL include Switch Lens as a primary student resume interaction that reframes the general resume for seeded target roles.

#### Scenario: Lens reframes same resume
- **WHEN** a student changes the lens between Marketing Intern, Business Analyst Intern, and Management Trainee
- **THEN** the resume preview updates with role-specific language while preserving the same underlying student experience sources

#### Scenario: Lens explains same proof different framing
- **WHEN** a lens-specific resume bullet is displayed
- **THEN** the interface indicates that the role-specific wording is based on the same source experience rather than new unsupported claims

### Requirement: Responsive polished mock screens
The system SHALL render the landing, chooser, student demo, and employer demo professionally on desktop and mobile widths.

#### Scenario: Desktop layout is polished
- **WHEN** the demo is viewed on a desktop viewport
- **THEN** the landing, chooser, student flow, and employer flow use readable hierarchy, aligned gutters, stable controls, and route-appropriate layouts

#### Scenario: Mobile layout remains usable
- **WHEN** the demo is viewed on a mobile viewport
- **THEN** panels stack without overlapping text, controls remain tappable, and resume previews, coverage rows, and proof-chain content remain readable

## REMOVED Requirements

### Requirement: Skill Proof Cards screen
**Reason**: The two-flow prototype no longer needs a standalone Skill Proof Cards screen as a must-have surface. Proof details are still required inside the student proof hints and employer claim proof chain.

**Migration**: Move any useful Skill Proof Cards content into the employer proof-chain expansion or student source/proof hints. Do not keep a separate proof-card route or primary section unless it supports the two main flows without adding story clutter.
