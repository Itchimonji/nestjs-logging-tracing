# Logging and Tracing Transaction in a NetJS Environment

An example how to log and trace transactions in a microservice environment build with nestjs applications

## Environment Variables

An example can be found in `enviroments/dev.env`

| Key                           | Value                                           | Example                     |
|:------------------------------|:------------------------------------------------|-----------------------------|
| DEBUG                         | true or false - Specification of logs           | true                        |
| NODE_ENV                      | development or production                       | development                 |
| HTTP_TIMEOUT                  | Time for HTTP timeouts                          | 10000                       |
| HTTP_MAX_REDIRECTS            | HTTP redirects                                  | 5                           |
| API_GLOBAL_PREFIX             | Global api prefix (Important for Ingress        | api                         |                                                                             |
| API_PORT                      | Port on which the container is running          | 8080                        |
| API_TITLE                     | Port on which the container is running          | backend-for-frontend        |
| API_PREFIX                    | Port on which the container is running          | BACKEND_FOR_FRONTEND_       |
| API_DB_URL                    | Port on which the container is running          | http://localhost:8081/api/  |
| DATABASE_API_GLOBAL_PREFIX    | Global api prefix (Important for Ingress        | api                         |                                                                             |
| DATABASE_API_PORT             | Port on which the container is running          | 8081                        |
| DATABASE_API_TITLE            | Port on which the container is running          | database-api                |
| DATABASE_API_PREFIX           | Port on which the container is running          | DATABASE_API_               |


# Installation, Running & Building

## Installation

```
$ npm i
```

## Running

Before the application is started for the first time, an `.env` file must be created in the root folder
and filled with key-value pairs. An example can be found in `environments/dev.env`.

```
$ nx serve api
$ nx serve api-database
$ nx serve frontend-app
```

## Building

To generate Docker images you need to run following commands.

```
docker build -t itchimonji/nestjs-logging-tracing-backend:v7.0.2-arm -f Dockerfile.api-database .
docker build -t itchimonji/nestjs-logging-tracing-frontend:v7.0.5-arm -f Dockerfile.frontend .
```

## Docker - Create a multi arch build

```
docker manifest create \
itchimonji/nestjs-logging-tracing-frontend:v7.0.5 \
--amend itchimonji/nestjs-logging-tracing-frontend:v7.0.5-arm \
--amend itchimonji/nestjs-logging-tracing-frontend:v7.0.5-amd

docker manifest push itchimonji/nestjs-logging-tracing-frontend:v7.0.5
```

# Create the Local Kubernetes Cluster

To run the local Kubernetes cluster you need to have installed [Terraform](https://www.terraform.io/), [kind](https://kind.sigs.k8s.io/) and [Docker](https://www.docker.com/). Docker must also run.

## Creation with pure kind

## Init

```
kind create cluster --config=kind.config.yaml  
```

## Destroy

```
kind delete cluster --name nestjs-logging
```

## Creation with Terraform

### Init

```
$ cd ./cluster
$ terraform init
```

### Start

```
$ cd ./cluster
$ terraform apply -auto-approve
```

### Destroy

```
$ cd ./cluster
$ terraform destroy --auto-approve
```

# Deploy Logging use case via Helm in the running Cluster

To deploy the charts you need to have installed [Helm](https://helm.sh/).

## Init

```
$ cd ./deployment
$ helm upgrade --install loki loki
```

## Destroy

```
helm uninstall loki
```

# Libraries / Dependencies

## Nx Workspace

The project environment is created with Nx Workspace

https://nx.dev/

## Winston Logging

Library: https://github.com/winstonjs/winston

## Jaeger Tracing

Client: https://www.npmjs.com/package/@dollarsign/nestjs-jaeger-tracing


