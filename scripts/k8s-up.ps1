Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Interrompe o script em caso de erro
$ErrorActionPreference = "Stop"

# Salva diretório atual (./scripts)
Push-Location

# Resolve o diretório raiz do projeto (um nível acima de /scripts)
$ROOT_DIR = Resolve-Path "$PSScriptRoot\.."
Set-Location $ROOT_DIR

$CLUSTER_NAME="temp-monitoring"

Write-Host "[KIND INFO] CREATE - Creating cluster..."
kind create cluster --name $CLUSTER_NAME

Write-Host "[DOCKER INFO] BUILD - Building Docker images..."
docker build -t api-service:latest services/api
docker build -t sensor-service:latest services/sensor
docker build -t notification-service:latest services/notification

Write-Host "[DOCKER INFO] LOAD - Loading images into kind..."
kind load docker-image api-service:latest --name $CLUSTER_NAME
kind load docker-image sensor-service:latest --name $CLUSTER_NAME
kind load docker-image notification-service:latest --name $CLUSTER_NAME

Write-Host "[KUBERNETES INFO] APPLY - Applying Kubernetes manifests..."
kubectl apply -f k8s/rabbitmq
kubectl apply -f k8s/postgres
kubectl apply -f k8s/api
kubectl apply -f k8s/sensor
kubectl apply -f k8s/notification

Write-Host "[OK] Kubernetes environment is up"
Write-Host "Run: kubectl port-forward svc/api 3000:3000"

# Volta para ./scripts
Pop-Location