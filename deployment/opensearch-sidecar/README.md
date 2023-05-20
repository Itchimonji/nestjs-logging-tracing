# Opensearch Stack with Sidecar Pattern

## Opensearch

https://artifacthub.io/packages/helm/opensearch-project-helm-charts/opensearch


## Opensearch Dashboards

https://artifacthub.io/packages/helm/opensearch-project-helm-charts/opensearch-dashboards

# Installation

```
helm upgrade --install opensearch-sidecar opensearch-sidecar -f ./opensearch/values.yaml         
```

# Uninstallation

```
helm uninstall opensearch
```
