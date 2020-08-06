provider "aws" {
  version = "~> 3.0"
  region  = "eu-central-1"
}

provider "aws" {
  alias  = "us_east"
  region = "us-east-1"
}
