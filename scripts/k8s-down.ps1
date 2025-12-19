# Interrompe o script em caso de erro
$ErrorActionPreference = "Stop"

# Salva diretório atual (./scripts)
Push-Location

# Resolve o diretório raiz do projeto (um nível acima de /scripts)
$ROOT_DIR = Resolve-Path "$PSScriptRoot\.."
Set-Location $ROOT_DIR

$CLUSTER_NAME="temp-monitoring"

kubectl delete -f k8s/notification --ignore-not-found
kubectl delete -f k8s/sensor --ignore-not-found
kubectl delete -f k8s/api --ignore-not-found
kubectl delete -f k8s/postgres --ignore-not-found
kubectl delete -f k8s/rabbitmq --ignore-not-found
kubectl delete job api-db-bootstrap --ignore-not-found

# Delete Kind cluster
kind delete cluster --name $CLUSTER_NAME

Write-Host "[OK] Kubernetes environment is down"

# Volta para ./scripts
Pop-Location