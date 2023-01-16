terraform {
  required_providers {
    kind = {
      source  = "kyma-incubator/kind"
      version = "0.0.11"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.12.1"
    }

    helm = {
      source  = "hashicorp/helm"
      version = "2.6.0"
    }

    null = {
      source  = "hashicorp/null"
      version = "3.1.1"
    }
  }

  required_version = ">= 1.0.0"
}
