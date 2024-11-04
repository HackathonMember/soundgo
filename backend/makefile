up:
	docker compose up -d
build:
	docker compose build --no-cache
bash:
	docker compose exec app bash -c "/bin/bash"
clean:
	docker compose down -v

format:
	docker compose exec app bash -c "flake8 ." | true
	docker compose exec app bash -c "black ." | true
	docker compose exec app bash -c "isort ." | true

.PHONY: clean build up bash