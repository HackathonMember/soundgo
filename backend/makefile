all: build up
build:
	docker compose build --no-cache
up:
	docker compose up -d
down:
	docker compose down -v
mysql:
	docker compose exec mysql mysql -u user -p
bash:
	docker compose exec app bash -c "/bin/bash"
format:
	docker compose exec app bash -c "flake8 ." | true
	docker compose exec app bash -c "black ." | true
	docker compose exec app bash -c "isort ." | true
migrate:
	docker compose exec app bash -c "flask db migrate" | true
	docker compose exec app bash -c "flask db upgrade" | true

.PHONY: all up down build mysql migrate bash format