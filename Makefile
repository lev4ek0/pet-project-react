DOCKER_COMPOSE_FILE=docker-compose.yml

.DEFAULT_GOAL := up

up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

build:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up --build -d
