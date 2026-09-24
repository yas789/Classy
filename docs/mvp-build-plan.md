# MVP Build Plan

This plan exists to keep the first implementation narrow. The first milestone is a complete clickable workflow with mock data, not a broad feature set.

## Milestone 1: Documentation and Project Shape

- Define product brief.
- Define target repository structure.
- Define frontend and backend boundaries.
- Define mock chemistry assessment data shape.

Expected output:

- README
- Product brief
- Repo generation prompt
- MVP build plan

## Milestone 2: Frontend Shell

- Create Vite React TypeScript app.
- Add Tailwind CSS.
- Add base layout and navigation.
- Add routes for Login, Home, Classes, Assessments, Assessment workspace, Marking workspace, and Settings.

Expected output:

- App loads locally.
- User can navigate between placeholder pages.

## Milestone 3: Mock Assessment Flow

- Add one mock class.
- Add one mock chemistry assessment.
- Add a small set of mock students.
- Add one question with mark scheme.
- Add interpreted answers and proposed marks.

Expected output:

- User can click from Home to Class to Assessment to Q1.

## Milestone 4: Marking Workspace

- Add `By Question / By Student` segmented control.
- Add previous/next navigation.
- Add staged workflow: Interpretation, Segmentation, Marking.
- Lock Marking until Interpretation is confirmed.
- Show confidence indicators.
- Show numbered interpretation references.
- Show proposed marks and explanation.
- Add teacher Confirm and Override actions.

Expected output:

- User can complete: `Home -> Class -> Assessment -> Q1 -> Interpretation -> Confirm -> Marking -> Next student`.

## Milestone 5: Mock Backend

- Create FastAPI app.
- Add health endpoint.
- Add mock endpoints for classes, assessments, segmentation, interpretation, marking, and confirmation.
- Add minimal CORS support for local frontend development.

Expected output:

- Frontend can call FastAPI locally or continue using local mock data behind the same interface.
- `GET /health` returns successfully.

## Milestone 6: Developer Experience

- Add `.env.example`.
- Add `.gitignore`.
- Add frontend lint/format commands.
- Add backend format/lint commands.
- Document local setup in README.

Expected output:

- A solo developer can clone, install, and run the project locally.

## Stop Conditions

Do not proceed to Supabase or real AI until:

- The marking workspace can be clicked through end to end.
- The staged review model feels understandable.
- Marking explanations clearly reference interpreted answer evidence.
- Teacher confirmation and override actions are visible and intuitive.

## Later Work

- Supabase database schema.
- Supabase Auth.
- Supabase Storage uploads.
- Real document processing.
- Real multimodal model calls.
- Audit logs.
- Export formats.
