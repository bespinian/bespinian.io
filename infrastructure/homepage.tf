module "homepage" {
  source = "github.com/mastertinner/terraform-spa"

  service_name        = "homepage"
  domain              = local.domain
  asset_path_patterns = ["js/*", "css/*", "fonts/*", "img/*"]
  environment         = local.environment
}
