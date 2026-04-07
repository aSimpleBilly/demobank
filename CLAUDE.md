# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vault** — a full-stack banking demo app (login, deposit, withdrawal) built with React + Node.js/Express, deployed to AWS EKS via Kubernetes. All data is in-memory (resets on restart). Currency is GBP.

## Commands

### Backend (Express API on port 4000)
```bash
cd backend && npm install && npm start       # production
cd backend && npm run dev                     # development (nodemon)
```

### Frontend (React on port 3000, proxies API to localhost:4000)
```bash
cd frontend && npm install && npm start       # development
cd frontend && npm run build                  # production build
cd frontend && npm test                       # jest tests (react-scripts)
```

### Docker
```bash
# Build & push both images to ECR:
./build-and-push.sh <AWS_ACCOUNT_ID> <REGION>

# Frontend build requires REACT_APP_API_URL build arg (defaults to http://banking-backend-svc:4000)
docker build --build-arg REACT_APP_API_URL=http://banking-backend-svc:4000 -t banking-frontend ./frontend
```

### Kubernetes
```bash
kubectl apply -f k8s/backend.yaml    # Deployment (2 replicas) + ClusterIP Service on port 4000
kubectl apply -f k8s/frontend.yaml   # Deployment (2 replicas) + LoadBalancer Service on port 80
```

## Architecture

- **backend/server.js** — Single-file Express API. In-memory user store and session map. Auth via opaque token in `Authorization` header. Endpoints: `/api/login`, `/api/logout`, `/api/account`, `/api/deposit`, `/api/withdraw`, `/health`.
- **frontend/src/App.jsx** — Single-file React SPA with three components: `Login`, `Dashboard`, `TxRow`. Uses `sessionStorage` for auth persistence. API base URL from `REACT_APP_API_URL` env var (falls back to `http://localhost:4000`).
- **frontend/Dockerfile** — Multi-stage: builds React with node, serves with nginx (SPA fallback configured inline).
- **k8s/** — Backend exposed internally via ClusterIP (`banking-backend-svc:4000`); frontend exposed externally via NLB LoadBalancer on port 80. Images currently point to Harness registry (`pkg.harness.io`).

## Key Details

- No database — users/balances/sessions live in `backend/server.js` memory objects. Restart = data loss.
- No router in the frontend — single-page app with conditional rendering (auth state drives Login vs Dashboard).
- Frontend `package.json` has `"proxy": "http://localhost:4000"` for local dev API proxying.
- Demo accounts: `alice/password123`, `bob/letmein`, `demo/demo`.

## Additional Documentation

- [Harness Pipeline Setup](docs/ai/HARNESS_PIPELINE.md) — CI/CD pipeline configuration, variables, and troubleshooting
- [Infrastructure Strategy](docs/ai/INFRASTRUCTURE_STRATEGY.md) — deployment models, EKS architecture, and scaling plans
