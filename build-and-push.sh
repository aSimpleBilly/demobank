#!/bin/bash

# Build and push Docker images to ECR
# Usage: ./build-and-push.sh <AWS_ACCOUNT_ID> <REGION>

set -e

ACCOUNT_ID=${1:-"123456789012"}
REGION=${2:-"eu-west-1"}

ECR_REGISTRY="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

echo "Building and pushing to ECR registry: $ECR_REGISTRY"

# Authenticate with ECR
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

# Build and push backend
echo "Building backend..."
docker build -t banking-backend ./backend
docker tag banking-backend:latest $ECR_REGISTRY/banking-backend:latest
docker push $ECR_REGISTRY/banking-backend:latest

# Build and push frontend
echo "Building frontend..."
docker build \
  --build-arg REACT_APP_API_URL=http://banking-backend-svc:4000 \
  -t banking-frontend ./frontend
docker tag banking-frontend:latest $ECR_REGISTRY/banking-frontend:latest
docker push $ECR_REGISTRY/banking-frontend:latest

echo "✅ Images built and pushed successfully!"
echo ""
echo "Update your k8s/*.yaml files with:"
echo "  image: $ECR_REGISTRY/banking-backend:latest"
echo "  image: $ECR_REGISTRY/banking-frontend:latest"
