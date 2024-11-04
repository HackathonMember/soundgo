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

.PHONY: all up down build mysql bash format