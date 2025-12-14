# Interrompe o script em caso de erro
$ErrorActionPreference = "Stop"

# Resolve o diretório raiz do projeto (um nível acima de /scripts)
$ROOT_DIR = Resolve-Path "$PSScriptRoot\.."
Set-Location $ROOT_DIR

$CLUSTER_NAME="temp-monitoring"

kubectl delete -f k8s/notification
kubectl delete -f k8s/sensor
kubectl delete -f k8s/api
kubectl delete -f k8s/postgres
kubectl delete -f k8s/rabbitmq

kind delete cluster --name $CLUSTER_NAME
Write-Host "✔ [OK] Kubernetes environment is down"
