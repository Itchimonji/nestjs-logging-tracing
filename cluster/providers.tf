provider "helm" {
  kubernetes {
    config_path = pathexpand(var.cluster_config_path)
  }
}
