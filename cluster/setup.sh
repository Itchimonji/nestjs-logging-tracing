#!/usr/bin/env sh

set -e

terraform init
terraform apply -auto-approve
