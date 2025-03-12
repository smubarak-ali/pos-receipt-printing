

docker run --name yasir_db -e POSTGRES_PASSWORD=yasir -e POSTGRES_USER=yasir -e POSTGRES_DB=yasir_db -e POSTGRES_HOST_AUTH_METHOD=md5 -p=5433:5432 -d postgres:17.4-alpine

