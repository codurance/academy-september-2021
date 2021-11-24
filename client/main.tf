module "website_with_cname" {
  source = "cloudposse/s3-website/aws"
  # Cloud Posse recommends pinning every module to a specific version
  # version = "x.x.x"
  namespace      = "skillset"
  stage          = "staging"
  name           = "skillset-staging-app"
  hostname       = "skillset.staging.codurance.io"
  parent_zone_id = "Z2P3IWUGUFUUGE"
}

terraform {
  required_version = ">= 1.0.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.60"
    }
  }

  backend "s3" {
    bucket         = "terraform-remote-state-codurance-us-east-1"
    key            = "academy-skillset-serverless/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
#    dynamodb_table = "academy-walking-skeleton-sept-2021-tf-state-lock"
  }
}

provider "aws" {
  region              = var.AWS_DEV_REGION
  allowed_account_ids = [var.PLAYGROUND_ACCOUNT_ID]

  default_tags {
    tags = {
      Project = "Academy September 2021"
    }
  }
}