provider "aws" {
  version = "~> 2.0"
  region  = "eu-central-1"
}

provider "aws" {
  alias  = "us_east"
  region = "us-east-1"
}
