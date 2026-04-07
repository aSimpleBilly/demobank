# Harness CI/CD Pipeline Setup

This document explains how to set up and run the Harness CI/CD pipeline for the banking application.

## 🚀 Pipeline Overview

The **Banking_App_CI_CD** pipeline automates:
1. **Build Stage**: Builds Docker images for backend and frontend, pushes to ECR
2. **Deploy Stage**: Deploys the application to EKS using Kubernetes manifests

## 📋 Prerequisites

Before running the pipeline, you need to configure these Harness connectors:

### 1. Docker Registry Connector (ECR)
- **Type**: Docker Registry
- **Name**: Your ECR connector name
- **URL**: `https://<aws_account_id>.dkr.ecr.<region>.amazonaws.com`
- **Authentication**: AWS IAM (access key/secret or role)

### 2. Kubernetes Connector
- **Type**: Kubernetes Cluster
- **Name**: Your EKS connector name
- **Cluster Details**: EKS cluster endpoint
- **Authentication**: AWS IAM or Service Account

### 3. Git Connector
- **Type**: GitHub/GitLab/Bitbucket
- **Name**: Your Git connector name
- **Repository**: The banking app repository
- **Branch**: `main`

## 🔧 Pipeline Variables

Configure these pipeline variables before running:

| Variable | Description | Example Value | Required |
|----------|-------------|---------------|----------|
| `AWS_ACCOUNT_ID` | AWS Account ID for ECR | `123456789012` | ✅ |
| `ECR_REGION` | AWS Region for ECR | `eu-west-1` | ✅ |
| `DOCKER_CONNECTOR` | Docker registry connector name | `my_ecr_connector` | ✅ |
| `K8S_CONNECTOR` | Kubernetes connector name | `my_eks_connector` | ✅ |
| `GIT_CONNECTOR` | Git repository connector name | `my_git_connector` | ✅ |
| `REPO_NAME` | Git repository name | `demobank` | ✅ |
| `ENVIRONMENT_REF` | Harness environment reference | `production` | ✅ |

## 🏃‍♂️ Running the Pipeline

### 1. Manual Execution
1. Navigate to the pipeline: [Banking_App_CI_CD](https://app.harness.io/ng/account/EeRjnXTnS4GrLG5VNNJZUw/all/orgs/default/projects/default_project/pipelines/banking_app_cicd/pipeline-studio)
2. Click **Run Pipeline**
3. Configure the required variables
4. Click **Run Pipeline**

### 2. Automated Triggers (Optional)
You can set up triggers to automatically run the pipeline:
- **Git Push Trigger**: Run on commits to `main` branch
- **Schedule Trigger**: Run on a schedule (e.g., daily)

## 📊 Pipeline Stages

### Stage 1: Build and Push Images
- **Setup AWS CLI**: Installs and configures AWS CLI
- **Login to ECR**: Authenticates with Amazon ECR
- **Build Backend**: Creates Docker image for Node.js backend
- **Build Frontend**: Creates Docker image for React frontend

### Stage 2: Deploy to EKS
- **Rollout Deployment**: Applies Kubernetes manifests with rolling updates
- **Verify Deployment**: Ensures deployment is successful

## 🔍 Monitoring and Troubleshooting

### View Execution Logs
1. Go to the pipeline execution page
2. Click on each step to view detailed logs
3. Check for errors in the **Execution** tab

### Common Issues

#### Build Failures
- Check Dockerfile syntax
- Verify package.json files exist
- Ensure build context is correct

#### ECR Push Failures
- Verify AWS credentials
- Check ECR repository permissions
- Ensure ECR repository exists

#### Deployment Failures
- Verify Kubernetes cluster connectivity
- Check namespace exists (`banking`)
- Validate YAML syntax in k8s/ files

## 🛠️ Customization

### Adding Environment-Specific Configs
You can create multiple environments (staging, production) and:
1. Create separate environment entities in Harness
2. Update `ENVIRONMENT_REF` variable
3. Use different Kubernetes namespaces

### Adding Tests
Add test steps in the build stage:
```yaml
- step:
    type: Run
    name: Run Backend Tests
    identifier: backend_tests
    spec:
      shell: Sh
      command: |
        cd backend
        npm test
```

### Adding Security Scans
Integrate security scanning tools:
- Snyk for vulnerability scanning
- OWASP ZAP for security testing
- Trivy for container image scanning

## 📚 Additional Resources

- [Harness Documentation](https://docs.harness.io/)
- [Kubernetes Deployment Guide](https://docs.harness.io/category/cd-deployments)
- [ECR Integration](https://docs.harness.io/category/artifacts)

## 🆘 Support

If you encounter issues:
1. Check the pipeline execution logs
2. Verify connector configurations
3. Ensure all required variables are set
4. Review the Kubernetes manifests in `k8s/` directory
