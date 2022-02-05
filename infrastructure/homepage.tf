module "homepage" {
  source = "github.com/cloudlena/terraform-spa?ref=v1.0.3"
  providers = {
    aws.us_east = aws.us_east
  }

  service_name        = "homepage"
  domain              = local.domain
  asset_path_patterns = ["js/*", "css/*", "fonts/*", "img/*"]
  environment         = local.environment
}
