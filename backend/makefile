up:
	docker compose up -d
build:
	docker compose build --no-cache
bash:
	docker compose exec app bash -c "/bin/bash"
clean:
	docker compose down -v

.PHONY: clean build up bash