all: build

build:
	@echo "Building database..."
	@docker build . -t todo-db -f Dockerfile

run: 
	@echo "Running database..."
	@docker run -d --env-file .env -p 7432:5432 todo-db:latest

examine:
	@echo "Examine database..."
	@docker exec -it $$(docker ps -a -q --filter ancestor=todo-db:latest --format="{{.ID}}") bash

stop:
	@echo "Stopping database..."
	@docker stop $$(docker ps -a -q --filter ancestor=todo-db:latest --format="{{.ID}}")

clean:
	@echo "Cleaning database..."
	@docker rm $$(docker ps -a -q --filter ancestor=todo-db:latest --format="{{.ID}}")
	@docker rmi todo-db:latest

.PHONY: all build run stop clean
