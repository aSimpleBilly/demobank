# Vault — Banking Demo App

A full-stack banking demo with login, deposit, and withdrawal — built with React + Node.js and ready to deploy on AWS EKS.

---

## Project structure

```
banking-app/
├── backend/
│   ├── server.js        # Express API
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # React app
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── Dockerfile
├── k8s/
│   ├── backend.yaml     # Deployment + ClusterIP Service
│   └── frontend.yaml    # Deployment + LoadBalancer Service
└── README.md
```

---

## Demo accounts

| Username | Password     | Starting balance |
|----------|-------------|-----------------|
| alice    | password123 | £5,000.00       |
| bob      | letmein     | £1,250.50       |
| demo     | demo        | £10,000.00      |

> ⚠️ Data is in-memory only — it resets on restart. For production, swap in a real database (e.g. PostgreSQL via RDS).

---

## Run locally

### 1. Start the backend
```bash
cd backend
npm install
npm start
# Runs on http://localhost:4000
```

### 2. Start the frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

---

## Build & push Docker images to ECR

```bash
# Authenticate with ECR
aws ecr get-login-password --region eu-west-1 | \
  docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com

# Build and push backend
docker build -t banking-backend ./backend
docker tag banking-backend:latest <ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com/banking-backend:latest
docker push <ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com/banking-backend:latest

# Build and push frontend
# Pass the backend service URL as a build arg (Kubernetes internal DNS)
docker build \
  --build-arg REACT_APP_API_URL=http://banking-backend-svc:4000 \
  -t banking-frontend ./frontend
docker tag banking-frontend:latest <ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com/banking-frontend:latest
docker push <ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com/banking-frontend:latest
```

---

## Deploy to EKS

### Prerequisites
- `kubectl` configured against your EKS cluster (`aws eks update-kubeconfig ...`)
- Images pushed to ECR (update the `image:` fields in the YAML files first)

### Apply manifests
```bash
# Update image URIs in k8s/*.yaml to your ECR URIs, then:
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml

# Check rollout
kubectl rollout status deployment/banking-backend
kubectl rollout status deployment/banking-frontend

# Get the public URL (may take ~60s for the ELB to provision)
kubectl get svc banking-frontend-svc
```

The `EXTERNAL-IP` from the last command is your app's public URL.

---

## API reference

| Method | Path           | Auth required | Body                 | Description        |
|--------|---------------|---------------|----------------------|--------------------|
| POST   | /api/login     | No            | `{username,password}`| Returns token      |
| POST   | /api/logout    | Yes           | —                    | Invalidates token  |
| GET    | /api/account   | Yes           | —                    | Balance + history  |
| POST   | /api/deposit   | Yes           | `{amount}`           | Add funds          |
| POST   | /api/withdraw  | Yes           | `{amount}`           | Remove funds       |
| GET    | /health        | No            | —                    | Liveness probe     |

Auth token is passed as the `Authorization` header.

---

## Production hardening checklist

- [ ] Replace in-memory store with PostgreSQL (AWS RDS)
- [ ] Replace simple token with JWT + refresh tokens
- [ ] Add HTTPS via ACM + AWS Load Balancer Controller
- [ ] Store secrets in AWS Secrets Manager / K8s Secrets
- [ ] Add rate limiting (e.g. express-rate-limit)
- [ ] Enable K8s HPA (Horizontal Pod Autoscaler)
- [ ] Set up CloudWatch / Datadog monitoring
