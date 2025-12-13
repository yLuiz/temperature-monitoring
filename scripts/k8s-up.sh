#!/bin/bash
set -e

# Move para a raiz do projeto
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

CLUSTER_NAME="temp-monitoring"

API_IMAGE="api-service:latest"
SENSOR_IMAGE="sensor-service:latest"
NOTIFICATION_IMAGE="notification-service:latest"

echo "🚀 Starting Kubernetes environment..."

echo "🐳 Building Docker images..."
docker build -t $API_IMAGE services/api
docker build -t $SENSOR_IMAGE services/sensor
docker build -t $NOTIFICATION_IMAGE services/notification

echo "📥 Loading images into kind cluster..."
kind load docker-image $API_IMAGE --name $CLUSTER_NAME
kind load docker-image $SENSOR_IMAGE --name $CLUSTER_NAME
kind load docker-image $NOTIFICATION_IMAGE --name $CLUSTER_NAME

echo "☸️ Applying Kubernetes manifests..."
kubectl apply -f k8s/rabbitmq
kubectl apply -f k8s/postgres
kubectl apply -f k8s/api
kubectl apply -f k8s/sensor
kubectl apply -f k8s/notification

echo "✔ [OK] Kubernetes environment is up"
echo "🌐 To access the API run:"
echo "kubectl port-forward svc/api 3000:3000"
