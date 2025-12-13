# 📘 Kubernetes & kind – Comandos Essenciais

Este documento lista os comandos mais utilizados do Kubernetes (`kubectl`) e do `kind`, com explicações objetivas sobre o que cada um faz. Ideal como referência rápida e material de estudo.

---

## ⭐ Comandos mais usados (quick start)

### Verificar se o cluster está acessível
```bash
kubectl cluster-info
```

### Listar Pods
```bash
kubectl get pods
```

### Ver logs de um serviço
```bash
kubectl logs deploy/api
```

### Aplicar manifests Kubernetes
```bash
kubectl apply -f k8s/api
```

### Reiniciar um Deployment
```bash
kubectl rollout restart deployment api
```

### Encaminhar porta para acesso local
```bash
kubectl port-forward svc/api 3000:3000
```

### Criar cluster local com kind
```bash
kind create cluster --name temp-monitoring
```

### Carregar imagem Docker no kind
```bash
kind load docker-image api-service:latest --name temp-monitoring
```

---

## 📌 Comandos do kind

### `kind create cluster --name <nome>`
Cria um cluster Kubernetes local utilizando containers Docker.

### `kind delete cluster --name <nome>`
Remove completamente o cluster kind.

### `kind get clusters`
Lista todos os clusters kind existentes na máquina.

### `kind load docker-image <imagem> --name <cluster>`
Carrega uma imagem Docker local para dentro do cluster kind.

---

## 📌 Comandos de contexto e cluster (kubectl)

### `kubectl version --client`
Mostra a versão do cliente kubectl instalada.

### `kubectl config get-contexts`
Lista todos os contextos Kubernetes disponíveis.

### `kubectl config use-context <context>`
Seleciona o cluster/contexto ativo.

### `kubectl cluster-info`
Exibe informações do cluster atual e endpoints do API Server.

### `kubectl get nodes`
Lista os nós do cluster.

---

## 📌 Comandos de Pods

### `kubectl get pods`
Lista os Pods do namespace atual.

### `kubectl get pods -w`
Lista Pods e acompanha mudanças em tempo real.

### `kubectl describe pod <pod>`
Exibe detalhes completos de um Pod, incluindo eventos e erros.

### `kubectl delete pod <pod>`
Remove um Pod específico (geralmente recriado pelo Deployment).

### `kubectl logs <pod>`
Exibe os logs de um Pod.

---

## 📌 Comandos de Deployments

### `kubectl get deployments`
Lista todos os Deployments.

### `kubectl describe deployment <deployment>`
Mostra detalhes do Deployment.

### `kubectl scale deployment <deployment> --replicas=N`
Altera a quantidade de réplicas de um Deployment.

### `kubectl rollout restart deployment <deployment>`
Reinicia os Pods de um Deployment.

### `kubectl rollout status deployment <deployment>`
Exibe o status de um rollout.

---

## 📌 Comandos de Services e acesso

### `kubectl get svc`
Lista os Services do cluster.

### `kubectl describe svc <service>`
Mostra detalhes de um Service.

### `kubectl port-forward svc/<service> <local>:<cluster>`
Encaminha uma porta local para um Service do cluster.

---

## 📌 Aplicação e remoção de manifests

### `kubectl apply -f <arquivo|pasta>`
Cria ou atualiza recursos Kubernetes.

### `kubectl delete -f <arquivo|pasta>`
Remove recursos Kubernetes.

### `kubectl get all`
Lista os principais recursos do namespace.

---

## 📌 Diagnóstico e troubleshooting

### `kubectl get events`
Lista eventos recentes do cluster.

### `kubectl describe pod <pod>`
Primeiro comando para investigar Pods com erro.

### `kubectl exec -it <pod> -- sh`
Acessa o container de um Pod via shell.

---

## 🧠 Observação final

Saber usar bem `kubectl apply`, `kubectl describe` e `kubectl logs` já coloca o desenvolvedor acima da média em Kubernetes, especialmente em cenários de troubleshooting.

---

## 🏁 Conclusão

Este guia serve como referência rápida para operações diárias, estudos e entrevistas técnicas envolvendo Kubernetes e kind.
