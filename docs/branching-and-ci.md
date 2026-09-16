# Branching and CI

Classy uses a simple branch model while the product is early-stage.

## Branches

```text
main
dev
feature/*
```

## Branch Roles

`main` is the deployment branch. It should stay stable and demoable. Deployment automation will be added later, but anything merged into `main` should be considered release-ready.

`dev` is the development integration branch. Feature branches should normally merge into `dev` first.

`feature/*` branches are short-lived branches for focused work.

Examples:

```text
feature/auth-and-shell
feature/mock-marking-workflow
feature/backend-mock-api
```

## Standard Flow

```text
feature/* -> dev -> main
```

Use this flow for normal work:

1. Create a feature branch from `dev`.
2. Open a pull request from the feature branch into `dev`.
3. Merge into `dev` only after CI passes.
4. Open a pull request from `dev` into `main` when the current development state is ready for release.
5. Merge into `main` only after CI passes again.

## CI Checks

The GitHub Actions workflow is defined in:

```text
.github/workflows/ci.yml
```

It runs on:

- Pull requests into `dev`
- Pull requests into `main`
- Pushes to `dev`
- Pushes to `main`

Current checks:

- Frontend dependency install with `npm ci`
- Frontend lint with `npm run lint`
- Frontend production build with `npm run build`
- Backend dependency install from `requirements.txt`
- Backend Python compile check with `python -m compileall app`
- Backend API health smoke test against `GET /health`

## Recommended GitHub Branch Rules

Configure these rules in GitHub after the repository is pushed.

For `main`:

- Require a pull request before merging.
- Require status checks to pass before merging.
- Require the `Frontend` and `Backend` CI jobs.
- Require branches to be up to date before merging.
- Do not allow force pushes.
- Do not allow branch deletion.

For `dev`:

- Require a pull request before merging if more than one person is contributing.
- Require status checks to pass before merging.
- Require the `Frontend` and `Backend` CI jobs.
- Do not allow force pushes.

## Deployment Policy

Deployment is intentionally not automated yet.

Later, deployment should trigger from `main` only. `dev` should be used for integration and validation, not production deployment.

Future deployment workflow:

```text
dev -> pull request -> main -> deploy
```

## Local Equivalent Checks

Run these before opening a pull request:

```bash
cd frontend
npm ci
npm run lint
npm run build
```

```bash
cd backend
python -m pip install -r requirements.txt
python -m compileall app
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Then check:

```text
http://127.0.0.1:8000/health
```
