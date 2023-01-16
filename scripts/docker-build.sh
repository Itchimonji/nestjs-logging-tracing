docker build -t itchimonji/nestjs-logging-tracing-frontend:v7 -f ./Dockerfile.frontend . &&
docker push itchimonji/nestjs-logging-tracing-frontend:v7 &&
docker build -t itchimonji/nestjs-logging-tracing-backend:v7 -f ./Dockerfile.api-database . &&
docker push itchimonji/nestjs-logging-tracing-backend:v7
