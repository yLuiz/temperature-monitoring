#!/usr/bin/env bash

set -e

CLUSTER_NAME="temp-monitoring"

# Resolve project root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

# Delete Kubernetes resources
kubectl delete -f k8s/notification --ignore-not-found
kubectl delete -f k8s/sensor --ignore-not-found
kubectl delete -f k8s/api --ignore-not-found
kubectl delete -f k8s/postgres --ignore-not-found
kubectl delete -f k8s/rabbitmq --ignore-not-found
kubectl delete job api-db-bootstrap --ignore-not-found

# Delete Kind cluster
kind delete cluster --name "$CLUSTER_NAME"

echo "[OK] Kubernetes environment is down"
