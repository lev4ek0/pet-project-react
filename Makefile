docker-compose := $(shell docker compose version >/dev/null 2>&1 && echo docker compose || echo docker-compose)

DOCKER_COMPOSE_FILE=docker-compose.yml

.DEFAULT_GOAL := up

up:
	$(docker-compose) -f $(DOCKER_COMPOSE_FILE) up -d

build:
	$(docker-compose) -f $(DOCKER_COMPOSE_FILE) up --build -d

pretty:
	cd pet-project; npx prettier . --write
