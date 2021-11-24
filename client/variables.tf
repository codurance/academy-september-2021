variable "AWS_DEV_REGION" {
  type        = string
  description = "AWS region to deploy to"

  validation {
    condition     = can(regex("(us(-gov)?|ap|ca|cn|eu|sa)-(central|(north|south)?(east|west)?)-\\d", var.AWS_DEV_REGION))
    error_message = "AWS region provided is not valid."
  }
}

variable "PLAYGROUND_ACCOUNT_ID" {
  type        = string
  description = "AWS account ID to deploy to"

  validation {
    condition     = (can(regex("[[:digit:]]", var.PLAYGROUND_ACCOUNT_ID)) && length(var.PLAYGROUND_ACCOUNT_ID) == 12)
    error_message = "AWS account ID must contain 12 digits."
  }
}
