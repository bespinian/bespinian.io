module "homepage" {
  source = "github.com/mastertinner/terraform-spa"

  service_name = "homepage"
  domain       = local.domain
  environment  = local.environment
}
