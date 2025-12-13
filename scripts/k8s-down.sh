#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

CLUSTER_NAME="temp-monitoring"

echo "[KUBERNETES INFO] CLEAN - Cleaning Kubernetes resources..."

kubectl delete -f k8s/notification || true
kubectl delete -f k8s/sensor || true
kubectl delete -f k8s/api || true
kubectl delete -f k8s/postgres || true
kubectl delete -f k8s/rabbitmq || true

echo "[KUBERNETES INFO] DELETE - Deleting kind cluster..."
kind delete cluster --name $CLUSTER_NAME || true

echo "[OK] Environment cleaned"
