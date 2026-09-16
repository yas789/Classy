# Classy

AI-assisted exam marking for teachers.

Classy is an MVP for helping teachers move from scanned handwritten exam papers to reviewed, explainable marks. The first product goal is not to replace teachers. It is to reduce repetitive marking work while keeping teachers in control of every confirmed result.

## MVP Goal

Build a clear, clickable workflow for:

```text
Home -> Class -> Assessment -> Q1 -> Interpretation -> Confirm -> Marking -> Next student
```

The first version should use mock data and stubbed AI responses. Supabase and real multimodal AI can be connected after the end-to-end teacher review flow feels right.

## Core Workflow

```text
Create class
  -> create assessment
  -> upload question paper + mark scheme
  -> upload or scan student papers
  -> AI segmentation
  -> AI interpretation
  -> AI marking
  -> teacher review and confirmation
  -> results/export
```

Teachers should be able to review assessments in two modes:

- `By Question`: review the same question across all students.
- `By Student`: review one student's full paper.

## Marking Stages

The marking workflow is intentionally staged so teachers can inspect the AI's work before marks are proposed.

1. `Segmentation`: identify the relevant handwritten answer/question regions on the student paper.
2. `Interpretation`: digitise the handwritten answer and create numbered references to important answer sections.
3. `Marking`: use the numbered references and mark scheme to explain exactly why marks were awarded.

Marking must remain locked until segmentation and interpretation have been confirmed.

## Intended Stack

- Frontend: Vite, React, TypeScript
- Styling: Tailwind CSS
- Backend: FastAPI, Python
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth
- File storage: Supabase Storage
- AI: mocked/stubbed responses initially, later multimodal model APIs

## Target Repository Structure

```text
classy/
  frontend/
  backend/
  supabase/
  docs/
  README.md
  .gitignore
  .env.example
```

## Frontend Structure

```text
frontend/
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
```

Initial pages/routes:

- Login
- Home
- Classes
- Assessments
- Assessment workspace
- Marking workspace
- Settings

The marking workspace should include:

- `Segmentation -> Interpretation -> Marking` stage UI
- `By Question / By Student` segmented control
- Previous/next navigation
- Confidence indicators
- Numbered interpretation references
- Proposed marks
- Teacher `Confirm` and `Override` actions
- Disabled marking state until interpretation is confirmed

## Backend Structure

```text
backend/
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
```

Initial API endpoints:

```text
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
```

## Mock Data Scope

Use mocked chemistry exam data for the initial marking workflow. The mock should be realistic enough to evaluate the product flow:

- Class name and student list
- Assessment title and paper metadata
- Question paper excerpt
- Mark scheme excerpt
- Student handwritten answer placeholders
- Segmentation results with regions and confidence
- Interpretation text with numbered references
- Marking explanation tied to references
- Proposed mark and confidence
- Teacher confirmation/override state

## Product Principles

- Keep the architecture understandable for a solo developer.
- Prefer a complete vertical slice over broad unfinished features.
- Keep AI output explainable and reviewable.
- Make teacher confirmation explicit.
- Do not implement real AI until the review workflow is validated.
- Do not add microservices, Kubernetes, GraphQL, or unnecessary abstractions.

## Development Phases

### Phase 1: Clickable Mock MVP

- Create the frontend app shell.
- Add the initial pages and navigation.
- Implement the marking workspace with mock chemistry data.
- Implement the staged workflow and locking rules.
- Add a minimal FastAPI backend with mocked endpoints.
- Document local development commands.

Success criteria:

- A teacher can click from Home to a class, open an assessment, review Q1, confirm interpretation, view marking, and move to the next student.
- FastAPI responds locally with health and mock assessment/answer data.

### Phase 2: Persistence and Supabase

- Add Supabase project configuration.
- Connect authentication.
- Persist classes, assessments, answers, and confirmations.
- Add file upload/storage for papers and mark schemes.

### Phase 3: Real AI Processing

- Replace segmentation stubs with real model calls.
- Replace interpretation stubs with real handwriting interpretation.
- Replace marking stubs with explainable mark proposals.
- Add audit trails for AI outputs and teacher decisions.

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

Optional frontend environment variables:

```text
VITE_API_BASE_URL=http://localhost:8000
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs at `http://localhost:8000` by default.

Optional backend environment variables:

```text
CORS_ORIGINS=http://localhost:5173
```

### Auth Setup

Auth is currently a local placeholder so the frontend shell can run without Supabase configuration. Enter any email and password on the login screen to create a mock local session.

Supabase Auth is intentionally deferred until the shell and core workflow are stable.

Initial auth success path:

```text
Open frontend
  -> unauthenticated user sees Login
  -> sign in with Supabase email/password
  -> app redirects to Home
  -> navigate Classes, Assessments, Settings
  -> log out
  -> app returns to Login
```

Initial backend checks:

```text
GET /health
GET /auth/me with Authorization: Bearer <token>
```

## Current Status

Initial auth and shell boilerplate exists. The marking workflow has not been implemented yet.

## Branching and CI

Development uses `dev` as the integration branch and `main` as the future deployment branch. CI runs frontend and backend checks for pull requests and pushes to both branches.

See `docs/branching-and-ci.md` for branch rules and workflow details.
