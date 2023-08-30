module "homepage" {
  source = "github.com/cloudlena/terraform-aws-spa?ref=v2.0.2"
  providers = {
    aws.us_east = aws.us_east
  }

  service_name         = "homepage"
  domain               = local.domain
  alternate_subdomains = ["www"]
  environment          = local.environment
}
