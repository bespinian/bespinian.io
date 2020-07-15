module "homepage" {
  source = "github.com/mastertinner/terraform-spa"
  providers = {
    aws.us_east = aws.us_east
  }

  service_name        = "homepage"
  domain              = local.domain
  asset_path_patterns = ["js/*", "css/*", "fonts/*", "img/*"]
  environment         = local.environment
}
