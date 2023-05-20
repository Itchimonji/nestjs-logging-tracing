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

# Create the Local Kubernetes Cluster

## Creation with pure kind

To run the local Kubernetes cluster you need to have installed [kind](https://kind.sigs.k8s.io/) and [Docker](https://www.docker.com/). Docker must also run.


### Init

```
kind create cluster --config=kind/kind.config.yaml  
```

### Destroy

```
kind delete cluster --name nestjs-logging
```

## Creation with Terraform

To run the local Kubernetes cluster you need to have installed [Terraform](https://www.terraform.io/), [kind](https://kind.sigs.k8s.io/) and [Docker](https://www.docker.com/). Docker must also run.


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

## Loki

### Init

```
cd ./deployment
helm upgrade --install loki loki -f ./loki/values.yaml
```

### Destroy

```
helm uninstall loki
```

## ELK

### Init

```
$ cd ./deployment
helm upgrade --install elk elk -f ./elk/values.yaml
```

### Destroy

```
helm uninstall elk
```

## OpenSearch

### Init

```
cd ./deployment
helm upgrade --install opensearch opensearch -f ./opensearch/values.yaml
```

### Destroy

```
helm uninstall opensearch
```

## OpenSearch with Sidecar

### Init

```
cd ./deployment
helm upgrade --install opensearch-sidecar opensearch-sidecar -f ./opensearch-sidecar/values.yaml
```

### Destroy

```
helm uninstall opensearch-sidecar
```

# Libraries / Dependencies

## Nx Workspace

The project environment is created with Nx Workspace

https://nx.dev/

## Winston Logging

Library: https://github.com/winstonjs/winston

## Jaeger Tracing

Client: https://www.npmjs.com/package/@dollarsign/nestjs-jaeger-tracing


