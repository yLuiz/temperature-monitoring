# Temperature Monitoring Platform

This project is a distributed temperature and humidity monitoring platform designed to demonstrate modern backend architecture, containerization, and orchestration concepts using Kubernetes.

The solution simulates sensor data collection, asynchronous processing, and alert generation in a scalable microservices environment.

---

## 🧩 Project Overview

The platform is composed of independent services that communicate asynchronously, following principles of loose coupling and scalability. Each service has a well-defined responsibility, allowing the system to grow and evolve without tight dependencies.

The main goal of this project is to showcase:
- Microservices architecture
- Asynchronous communication
- Containerized applications
- Kubernetes-based orchestration
- Clean and maintainable code organization

---

## 🏗️ Architecture

The system is structured around three core services:

### API Service
Acts as the central entry point of the platform. It is responsible for:
- Managing registered sensors
- Persisting sensor configuration and readings
- Rendering a monitoring dashboard
- Exposing endpoints for visualization and integration

### Sensor Service
Simulates physical sensors by periodically generating temperature and humidity data. These readings are sent asynchronously to the messaging layer for further processing.

### Notification Service
Consumes sensor readings and evaluates them against predefined thresholds. When limits are exceeded, alerts are generated and logged, demonstrating event-driven processing.

---

## 🔄 Communication Flow

The services communicate using an asynchronous messaging approach. Sensor data is published to a message broker, allowing consumers to process information independently and reliably without direct coupling between services.

This design improves resilience, scalability, and fault isolation.

---

## 🐳 Containerization & Orchestration

All services are containerized to ensure consistent environments across development and deployment. Kubernetes is used to orchestrate these containers, providing:

- Service discovery
- Scaling via replicas
- Self-healing through pod restarts
- Declarative infrastructure management

The project uses a local Kubernetes cluster for demonstration purposes, closely resembling real-world production setups.

---

## 📦 Data Persistence

A relational database is used to store sensor configurations and historical readings. This ensures data integrity and allows future expansion such as analytics, reporting, or auditing.

---

## 🔧 Automation & Developer Experience

The environment setup and lifecycle are automated to reduce manual effort and human error. This improves reproducibility and makes the project easy to run, test, and evaluate.

---

## 🎯 Purpose of This Project

This project was developed as a technical exercise to demonstrate proficiency in:

- Backend development with Node.js
- Event-driven architecture
- Docker-based containerization
- Kubernetes fundamentals
- System design and infrastructure thinking

It is intentionally designed to balance simplicity with real-world architectural patterns.

---

## 🏁 Conclusion

The Temperature Monitoring Platform serves as a concise yet complete example of how modern backend systems can be structured, deployed, and orchestrated using cloud-native principles. It reflects practical design decisions commonly applied in production-grade systems while remaining accessible and easy to understand.
