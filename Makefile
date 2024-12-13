# Variables
DOCKER_COMPOSE = docker-compose
DB_CONTAINER = postgres
APP_CONTAINER = api

# Colors
GREEN = \033[0;32m
NC = \033[0m # No Color
INFO = @echo "${GREEN}=>${NC}"

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make up              - Start all containers"
	@echo "  make down            - Stop all containers"
	@echo "  make logs            - View logs from all containers"
	@echo "  make build           - Rebuild all containers"
	@echo "  make restart         - Restart all containers"
	@echo "  make ps              - List all running containers"
	@echo "  make db-connect      - Connect to PostgreSQL database"
	@echo "  make db-create       - Create database"
	@echo "  make db-drop         - Drop database"
	@echo "  make migration-gen   - Generate new migration"
	@echo "  make migration-run   - Run pending migrations"
	@echo "  make migration-revert- Revert last migration"

# Docker commands
.PHONY: up down logs build restart ps
up:
	$(INFO) "Starting containers..."
	@$(DOCKER_COMPOSE) up -d

down:
	$(INFO) "Stopping containers..."
	@$(DOCKER_COMPOSE) down

logs:
	@$(DOCKER_COMPOSE) logs -f

build:
	$(INFO) "Rebuilding containers..."
	@$(DOCKER_COMPOSE) build

restart:
	$(INFO) "Restarting containers..."
	@$(DOCKER_COMPOSE) restart

ps:
	@$(DOCKER_COMPOSE) ps

# Database commands
.PHONY: db-connect db-create db-drop
db-connect:
	$(INFO) "Connecting to database..."
	@$(DOCKER_COMPOSE) exec $(DB_CONTAINER) psql -U username -d audit

db-create:
	$(INFO) "Creating database..."
	@$(DOCKER_COMPOSE) exec $(DB_CONTAINER) createdb -U username audit

db-drop:
	$(INFO) "Dropping database..."
	@$(DOCKER_COMPOSE) exec $(DB_CONTAINER) dropdb -U username audit

# Migration commands
.PHONY: migration-gen migration-run migration-revert
migration-gen:
	$(INFO) "Generating migration..."
	@$(DOCKER_COMPOSE) exec $(APP_CONTAINER) npm run migration:generate

migration-run:
	$(INFO) "Running migrations..."
	@$(DOCKER_COMPOSE) exec $(APP_CONTAINER) npm run migration:run

migration-revert:
	$(INFO) "Reverting last migration..."
	@$(DOCKER_COMPOSE) exec $(APP_CONTAINER) npm run migration:revert 