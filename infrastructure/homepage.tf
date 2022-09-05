module "homepage" {
  source = "github.com/cloudlena/terraform-spa?ref=v1.0.6"
  providers = {
    aws.us_east = aws.us_east
  }

  service_name = "homepage"
  domain       = local.domain
  environment  = local.environment
}
