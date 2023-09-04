# Makefile for running the Caching Docker image

# This is the default target, which will be built when you invoke make

build:
	@echo "Building Redis Docker image..."
	@docker build . -t todo-cache -f Dockerfile


run:
	@echo "Running Redis Docker image..."
	@docker run -d -p 6379:6379 todo-cache:latest


examine:
	@echo "Examine database..."
	@docker exec -it $$(docker ps -a -q --filter ancestor=todo-cache:latest --format="{{.ID}}") bash


stop: 
	@echo "Stopping database..."
	@docker stop $$(docker ps -a -q --filter ancestor=todo-cache:latest --format="{{.ID}}")

clean:
	@echo "Cleaning database..."
	@docker rm $$(docker ps -a -q --filter ancestor=todo-cache:latest --format="{{.ID}}")
	@docker rmi todo-cache:latest

.PHONY: all build run stop clean

