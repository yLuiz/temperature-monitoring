#!/usr/bin/env bash

# Interrompe o script em caso de erro
set -e

CLUSTER_NAME="temp-monitoring"

# Resolve o diretório raiz do projeto (um nível acima de /scripts)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo "[KIND INFO] CREATE - Creating cluster..."
kind create cluster --name "$CLUSTER_NAME"

echo ""
echo "[DOCKER INFO] BUILD - Building Docker images..."
docker build -t api-service:latest services/api
docker build --target builder -t api-service-migration:latest services/api
docker build -t sensor-service:latest services/sensor
docker build -t notification-service:latest services/notification

echo ""
echo "[DOCKER INFO] LOAD - Loading images into kind..."
kind load docker-image api-service:latest --name "$CLUSTER_NAME"
kind load docker-image api-service-migration:latest --name "$CLUSTER_NAME"
kind load docker-image sensor-service:latest --name "$CLUSTER_NAME"
kind load docker-image notification-service:latest --name "$CLUSTER_NAME"

echo ""
echo "[KUBERNETES INFO] APPLY - Applying infrastructure manifests..."
kubectl apply -f k8s/rabbitmq
kubectl apply -f k8s/postgres

echo ""
echo "[KUBERNETES INFO] WAIT - Waiting for Postgres to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres --timeout=120s

echo ""
echo "[KUBERNETES INFO] APPLY - API base (config + service)..."
kubectl apply -f k8s/api/configmap.yaml
kubectl apply -f k8s/api/service.yaml

echo ""
echo "[KUBERNETES INFO] APPLY - Running DB bootstrap job (migrations + seeds)..."
kubectl delete job api-db-bootstrap --ignore-not-found
kubectl apply -f k8s/api/job-bootstrap.yaml

echo ""
kubectl logs -f job/api-db-bootstrap

echo ""
echo "[KUBERNETES INFO] WAIT - Waiting for DB bootstrap job to finish..."
kubectl wait --for=condition=complete job/api-db-bootstrap --timeout=180s

echo ""
echo "[KUBERNETES INFO] LOGS - DB bootstrap job logs:"
kubectl logs job/api-db-bootstrap

echo ""
echo "[KUBERNETES INFO] APPLY - Deploying application services..."
kubectl apply -f k8s/api
kubectl apply -f k8s/sensor
kubectl apply -f k8s/notification

echo ""
echo "[OK] Kubernetes environment is up"
echo "Run: kubectl port-forward svc/api 3000:3000"
