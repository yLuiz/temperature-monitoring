# Plataforma de Monitoramento de Temperatura

Este projeto é uma plataforma distribuída de monitoramento de temperatura e umidade, desenvolvida para demonstrar conceitos modernos de arquitetura backend, containerização e orquestração utilizando **Node.js, RabbitMQ, PostgreSQL e Kubernetes (via Kind)**.

A solução simula a coleta de dados de sensores, o processamento assíncrono dessas informações e a geração de alertas em um ambiente de microserviços escalável e desacoplado.

---

## 🧩 Visão Geral do Projeto


A plataforma é composta por serviços independentes que se comunicam de forma assíncrona, seguindo princípios de **baixo acoplamento, escalabilidade e resiliência**. Cada serviço possui uma responsabilidade bem definida, permitindo que o sistema evolua sem dependências rígidas entre componentes.

O principal objetivo deste projeto é demonstrar, na prática:

- Arquitetura de microserviços
- Comunicação assíncrona baseada em eventos
- Aplicações containerizadas com Docker
- Orquestração com Kubernetes
- Organização de código limpa e sustentável
- Experiência de setup automatizada para desenvolvedores

---

## 🏗️ Arquitetura da Solução

O sistema é estruturado em três serviços principais:

### 🔹 API Service
É o ponto central da aplicação e é responsável por:
- Gerenciar sensores cadastrados
- Persistir configurações e leituras de sensores
- Expor endpoints para visualização e integração
- Renderizar um dashboard simples de monitoramento

### 🔹 Sensor Service
Simula sensores físicos, gerando periodicamente dados de:
- Temperatura
- Umidade

Esses dados são enviados de forma assíncrona para o RabbitMQ, sem comunicação direta com a API.

### 🔹 Notification Service
Consome as leituras dos sensores e:
- Avalia os dados com base em limites configurados
- Gera alertas quando os valores extrapolam os thresholds
- Registra eventos de alerta, demonstrando processamento orientado a eventos

---

## 🔄 Comunicação entre Serviços

A comunicação entre os serviços ocorre por meio de **mensageria assíncrona com RabbitMQ**.

Esse modelo:
- Evita acoplamento direto entre serviços
- Aumenta a tolerância a falhas
- Facilita escalabilidade horizontal
- Permite processamento independente dos eventos

---

## 🐳 Containerização e Kubernetes

Todos os serviços são containerizados com Docker e orquestrados com **Kubernetes utilizando Kind (Kubernetes in Docker)**.

O Kubernetes fornece:
- Descoberta de serviços
- Escalabilidade por meio de réplicas
- Auto-recuperação de pods
- Gerenciamento declarativo da infraestrutura

O uso do Kind permite que o desenvolvedor execute o projeto localmente em um ambiente muito próximo de produção.

---

## 📦 Persistência de Dados

A aplicação utiliza **PostgreSQL** para armazenar:
- Configurações dos sensores
- Histórico de leituras de temperatura e umidade

As **migrations e seeds** são executadas automaticamente através de um **Job do Kubernetes**, garantindo que o ambiente esteja sempre pronto após o bootstrap.

---

## 🔧 Automação e Experiência do Desenvolvedor

Todo o processo de setup foi pensado para ser **simples, automatizado e reproduzível**.

Com apenas um script, o desenvolvedor consegue:
- Criar o cluster Kubernetes
- Buildar e carregar imagens Docker
- Subir RabbitMQ e PostgreSQL
- Executar migrations e seeds
- Iniciar todos os serviços da aplicação

Isso reduz erros manuais e facilita testes, estudos e avaliações técnicas.

---

## 🚀 Rodando o projeto.
Para preparar o ambiente e rodar o projeto, acesse o arquivo Markdown **RUN-PROJECT.md**

## 💻 Acesso a aplicação
Após fazer todo o procedimento de deploy e rodar o comando:
```
kubectl port-forward svc/api 3000:3000
```

Acesse em sua máquina:
http://localhost:3000/dashboard

## 📝 Swagger (Documentação)
Para visualizar os endpoints disponíveis, acesse:
http://localhost:3000/api/docs


## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como um **exercício técnico** para demonstrar domínio em:

- Desenvolvimento backend com Node.js
- Arquitetura orientada a eventos
- Mensageria com RabbitMQ
- Containerização com Docker
- Fundamentos de Kubernetes
- Design de sistemas distribuídos

A solução busca equilibrar simplicidade com padrões utilizados em ambientes reais de produção.
