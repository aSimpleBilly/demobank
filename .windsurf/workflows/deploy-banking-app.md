---
description: How to deploy the banking application using Harness CI/CD
---

# Banking Application Deployment Workflow

This workflow explains how to deploy the banking application using the simpleBanking pipeline in the billy_sandbox project.

## Prerequisites

- Access to the billy_sandbox project in Harness
- Docker images must be built and pushed to registry
- Kubernetes cluster must be available

## Pipeline Overview

The `simpleBanking` pipeline is a complete CI/CD pipeline that:

1. **Build Stage**: Builds and pushes Docker images for backend and frontend
2. **Deploy Backend Stage**: Deploys the backend service to Kubernetes
3. **Deploy Frontend Stage**: Deploys the frontend service to Kubernetes

## Running the Pipeline

### Option 1: From Windsurf (Recommended)

When working in the billy_sandbox project, you can run the pipeline using:

```bash
# Ask Cascade to run the pipeline
"run the simpleBanking pipeline in the billy_sandbox project"
```

### Option 2: From Harness UI

1. Navigate to: https://app.harness.io/ng/account/EeRjnXTnS4GrLG5VNNJZUw/all/orgs/sandbox/projects/Billy_Sandbox/pipelines/simpleBanking/pipeline-studio
2. Click "Run Pipeline"
3. Select the branch (default: main)
4. Click "Run Pipeline"

### Option 3: Using Harness CLI

```bash
harness pipeline run --project Billy_Sandbox --org sandbox --pipeline simpleBanking --branch main
```

## Pipeline Stages

### Stage 1: Build
- Builds backend Docker image (`banking-backend`)
- Builds frontend Docker image (`banking-frontend`)
- Pushes both images to Docker registry
- Tags images with `latest` and pipeline sequence ID

### Stage 2: Deploy Backend
- Deploys backend service using `banking_backend_service`
- Uses Kubernetes manifests from `k8s/backend.yaml`
- Deploys to `dev` environment in `banking` namespace
- Performs rolling deployment

### Stage 3: Deploy Frontend
- Deploys frontend service using `banking_frontend_service`
- Uses Kubernetes manifests from `k8s/frontend.yaml`
- Deploys to `dev` environment in `banking` namespace
- Performs rolling deployment

## Services and Environments

### Services
- **banking_backend_service**: Backend service definition
- **banking_frontend_service**: Frontend service definition

### Environments
- **dev**: Development environment (PreProduction)
- **production**: Production environment (available for future use)

## Monitoring Deployment

You can monitor the pipeline execution in:
- Harness UI: Pipeline execution page
- Windsurf: Ask for status updates
- Logs: Detailed step-by-step execution logs

## Troubleshooting

### Common Issues
1. **Build Failures**: Check Dockerfile syntax and dependencies
2. **Deployment Failures**: Verify Kubernetes cluster connectivity
3. **Image Pull Failures**: Check Docker registry credentials

### Getting Help
- Check pipeline execution logs in Harness
- Verify service and environment configurations
- Ensure all required connectors are properly configured

## Next Steps

Once deployed successfully:
1. Access the frontend application via the LoadBalancer service
2. Test the backend API endpoints
3. Monitor application health using Kubernetes probes
4. Consider setting up automated triggers for future deployments
