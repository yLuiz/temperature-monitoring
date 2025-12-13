# 🚀 Deploy do Projeto (Local Kubernetes com kind)

Este guia descreve como subir toda a aplicação do zero, utilizando Docker e Kubernetes (kind), sem depender do Kubernetes do Docker Desktop.

## 📦 Pré-requisitos

- Docker instalado e em execução
- kubectl instalado
- kind instalado

Verifique as versões:

```bash
docker --version
kubectl version --client
kind version
```

## 🧱 Criar o cluster Kubernetes

Crie um cluster local utilizando kind:

```bash
kind create cluster --name temp-monitoring
```

Verifique se o cluster está pronto:

```bash
kubectl get nodes
```

## 🐳 Build das imagens Docker

Na raiz do projeto, execute o build das imagens:

```bash
docker build -t api-service:latest services/api
docker build -t sensor-service:latest services/sensor
docker build -t notification-service:latest services/notification
```

Confirme que as imagens foram criadas:

```bash
docker images
```

## 📥 Carregar as imagens no cluster kind

Como o kind não acessa automaticamente as imagens locais, é necessário carregá-las manualmente:

```bash
kind load docker-image api-service:latest --name temp-monitoring
kind load docker-image sensor-service:latest --name temp-monitoring
kind load docker-image notification-service:latest --name temp-monitoring
```

## ☸️ Aplicar os manifests Kubernetes

Aplique os manifests Kubernetes na ordem abaixo:

```bash
kubectl apply -f k8s/rabbitmq
kubectl apply -f k8s/postgres
kubectl apply -f k8s/api
kubectl apply -f k8s/sensor
kubectl apply -f k8s/notification
```

Verifique o status dos recursos:

```bash
kubectl get pods
kubectl get svc
```

## 🌐 Acessar a aplicação

Encaminhe a porta do Service da API utilizando port-forward:

```bash
kubectl port-forward svc/api 3000:3000
```

Acesse a aplicação no navegador:

```
http://localhost:3000/dashboard
```

## 🧪 Verificação rápida (opcional)

Visualizar logs da API:

```bash
kubectl logs deploy/api
```

Visualizar logs do Sensor Service:

```bash
kubectl logs deploy/sensor
```

Visualizar logs do Notification Service:

```bash
kubectl logs deploy/notification
```

Visualizar logs do RabbitMQ:

```bash
kubectl logs deploy/rabbitmq
```

## 🧹 Limpeza do ambiente (opcional)

Remover os recursos Kubernetes:

```bash
kubectl delete -f k8s/notification
kubectl delete -f k8s/sensor
kubectl delete -f k8s/api
kubectl delete -f k8s/postgres
kubectl delete -f k8s/rabbitmq
```

Remover o cluster kind:

```bash
kind delete cluster --name temp-monitoring
```

## ✅ Observações importantes

Este setup é voltado para ambiente local.  
Em ambientes produtivos, recomenda-se:

- Utilização de StatefulSet para o banco de dados
- Uso de Secrets para credenciais sensíveis
- Exposição da API via Ingress com TLS
- Persistência de dados utilizando PersistentVolume e PVC
