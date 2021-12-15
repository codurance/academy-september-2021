module "website_with_cname" {
  source = "cloudposse/s3-website/aws"
  namespace      = "skillset"
  stage          = "staging"
  name           = "skillset-staging-app"
  hostname       = var.AWS_STAGING_DOMAIN
  parent_zone_id = "Z2P3IWUGUFUUGE"
}

#a random temporary comment

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