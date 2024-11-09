all: build up
build:
	docker compose build --no-cache
up:
	docker compose up -d
	sleep 30; make migrate && make bash

down:
	docker compose down -v

re: down up

mysql:
	docker compose exec mysql mysql -u user -p
bash:
	docker compose exec app bash -c "/bin/bash"
format:
	docker compose exec app bash -c "black ."
	docker compose exec app bash -c "isort ."
	docker compose exec app bash -c "flake8 ."
migrate:
	docker compose exec app bash -c "flask db migrate" | true
	docker compose exec app bash -c "flask db upgrade" | true

login:
	curl -X 'POST'  'http://localhost:8080/user/signup' -H 'accept: */*' -H 'Content-Type: application/json' -d '{ "username": "string", "password": "string" }'
	curl -X 'POST' 'http://localhost:8080/user/login' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{ "username": "string", "password": "string" }' -v 
.PHONY: all up down build mysql migrate bash format
