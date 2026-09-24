# Initial Repo Generation Prompt

Use this prompt when scaffolding the first implementation pass. The instruction is intentionally constrained: build the complete mock workflow first, avoid real AI, and avoid over-engineering.

```text
Build the initial GitHub repository for an MVP called Classy, an AI-assisted exam marking platform for teachers.

The core workflow is:

Create class -> create assessment -> upload question paper + mark scheme -> upload/scan student papers -> AI interpretation -> AI segmentation -> AI marking -> teacher review/confirmation -> results/export.

Teachers can review assessments either By Question, meaning the same question across all students, or By Student, meaning the entire paper for one student.

The marking workflow has 3 stages:

1. Interpretation: digitise the student's handwritten answer and create numbered references to important sections.
2. Segmentation: identify the relevant handwritten answer/question regions.
3. Marking: use those references and the mark scheme to explain exactly why marks were awarded.

Marking stays locked until the previous stages are confirmed.

Stack:

- Frontend: Vite + React + TypeScript
- Styling: Tailwind CSS
- Backend: FastAPI + Python
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth
- File storage: Supabase Storage
- AI processing: mocked/stub responses for now

Repository structure:

classy/
  frontend/
  backend/
  supabase/
  docs/
  README.md
  .gitignore
  .env.example

Frontend structure:

src/
  components/
  layouts/
  pages/
  features/
    auth/
    classes/
    assessments/
    marking/
  lib/
  types/

Backend structure:

app/
  main.py
  api/
  models/
  schemas/
  services/
    segmentation.py
    interpretation.py
    marking.py
  db/

Create initial pages/routes for:

- Login
- Home
- Classes
- Assessments
- Assessmentsessment workspace
- Marking workspace
- Settings

For the marking workspace, uAssessmAssessmentssmocked chemistry exam data and implement the UI state for:

Interpretation -> Segmentation -> Marking

Marking should remain disabled until Interpretation is confirmed.

Also implement:

- By Question / By Student segmented control
- Previous/next navigation
- Confidence indicators
- Numbered interpretation references
- Proposed marks
- Teacher Confirm / Override actions

Create basic FastAPI endpoints:

GET    /health
GET    /classes
POST   /classes
GET    /assessments
POST   /assessments
GET    /assessments/{id}
POST   /answers/{id}/segment
POST   /answers/{id}/interpret
POST   /answers/{id}/mark
PATCH  /answers/{id}/confirm

Do not over-engineer the project. No microservices, Kubernetes, GraphQL, or unnecessary abstractions.

Prioritise a clean architecture that a solo developer can understand and extend.

Add:

- README with local setup instructions
- .env.example
- sensible .gitignore
- frontend/backend development commands
- basic linting/formatting
- sample mock data

First goal: get the complete frontend workflow running with mock data and FastAPI responding locally. Do not implement real AI yet.
```

## Immediate Follow-Up Prompt

Use this as the second prompt if the coding agent tries to scaffold too much at once.

```text
Do not build the whole application in one pass.

Start with the first vertical slice only:

Home -> Class -> Assessment -> Q1 -> Interpretation -> Confirm -> Marking -> Next student

Use hardcoded/mock chemistry data.

Implement only enough layout, routing, state, and mock API behaviour to make that path clickable and understandable.

Do not connect Supabase yet.
Do not implement real authentication yet.
Do not implement real AI yet.
Do not add extra dashboards, analytics, admin panels, payment logic, or role systems.

The key product behaviour to prove is:

- Teacher can open one class.
- Teacher can open one assessment.
- Teacher can review Question 1 by student.
- Teacher sees interpretation, segmentation, and marking stages.
- Marking is locked until interpretation is confirmed.
- Teacher can confirm or override.
- Teacher can move to the next student.

Keep the code simple and obvious. Prefer mock data and clear state transitions over premature abstractions.
```
