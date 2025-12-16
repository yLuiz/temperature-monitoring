CLUSTER_NAME=temp-monitoring

API_IMAGE=api-service:latest
SENSOR_IMAGE=sensor-service:latest
NOTIFICATION_IMAGE=notification-service:latest

.PHONY: k8s-up k8s-build k8s-load k8s-deploy k8s-down k8s-port

k8s-up: k8s-build k8s-load k8s-deploy
	@echo "Kubernetes environment is up"

k8s-build:
	@echo "Building Docker images..."
	docker build -t $(API_IMAGE) services/api
	docker build -t $(SENSOR_IMAGE) services/sensor
	docker build -t $(NOTIFICATION_IMAGE) services/notification

k8s-load:
	@echo "Loading images into kind..."
	kind load docker-image $(API_IMAGE) --name $(CLUSTER_NAME)
	kind load docker-image $(SENSOR_IMAGE) --name $(CLUSTER_NAME)
	kind load docker-image $(NOTIFICATION_IMAGE) --name $(CLUSTER_NAME)

k8s-deploy:
	@echo "Applying Kubernetes manifests..."
	kubectl apply -f k8s/rabbitmq
	kubectl apply -f k8s/postgres
	kubectl apply -f k8s/api
	kubectl apply -f k8s/sensor
	kubectl apply -f k8s/notification

k8s-port:
	@echo "Port-forward API on http://localhost:3000"
	kubectl port-forward svc/api 3000:3000

k8s-down:
	@echo "Cleaning Kubernetes environment..."
	kubectl delete -f k8s/notification || true
	kubectl delete -f k8s/sensor || true
	kubectl delete -f k8s/api || true
	kubectl delete -f k8s/postgres || true
	kubectl delete -f k8s/rabbitmq || true
	kind delete cluster --name $(CLUSTER_NAME) || true
