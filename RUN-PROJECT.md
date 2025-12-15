# Temperature Monitoring – Kubernetes Setup

Este projeto utiliza uma arquitetura de microserviços com Node.js, RabbitMQ, PostgreSQL e Kubernetes (via Kind) para simular um sistema de monitoramento de temperatura e umidade.

Toda a infraestrutura e serviços são inicializados automaticamente através de um script de bootstrap.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Docker (Docker Desktop recomendado)
- kubectl
- Kind
- Node.js (apenas para desenvolvimento local, não obrigatório para o deploy)
- PowerShell (Windows) ou terminal equivalente

Verifique as versões:

docker --version  
kubectl version --client  
kind version  

---

## 🧱 Arquitetura (Resumo)

- API Principal (Express.js, TypeORM, DustJS)
- Sensor Service (simulação de sensores)
- Notification Service (alertas)
- RabbitMQ (mensageria)
- PostgreSQL (persistência)
- Kubernetes (Kind)
- Job Kubernetes para migrations e seeds

---

## 🚀 Como subir o projeto no Kubernetes

### 1️⃣ Clonar o repositório

git clone <url-do-repositorio>  
cd temperature-monitoring  

---

### 2️⃣ Executar o script de bootstrap

./scripts/k8s-up.ps1

Esse script:

1. Cria o cluster Kind  
2. Builda imagens Docker  
3. Carrega imagens no cluster  
4. Sobe RabbitMQ e PostgreSQL  
5. Aguarda o PostgreSQL ficar pronto  
6. Executa migrations e seeds via Job  
7. Sobe API, Sensor e Notification Services  

---

### 3️⃣ Verificar pods

kubectl get pods

---

### 4️⃣ Logs (opcional)

kubectl logs deploy/api  
kubectl logs job/api-db-bootstrap  

---

### 5️⃣ Acessar a aplicação

kubectl port-forward svc/api 3000:3000 (mantenha o terminal aberto).

http://localhost:3000

---

## 🔄 Reexecutar migrations e seeds

kubectl delete job api-db-bootstrap  
kubectl apply -f k8s/api/job-bootstrap.yaml  
kubectl wait --for=condition=complete job/api-db-bootstrap  

---

## 🛑 Encerrar ambiente

./scripts/k8s-down.ps1

kind delete cluster --name temp-monitoring  

---

## ✅ Pronto

Ambiente funcional para testes.
