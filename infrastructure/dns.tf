resource "aws_route53_zone" "main" {
  name = local.domain

  tags = {
    service-name = "global"
    environment  = local.environment
  }
}

resource "aws_route53_record" "email" {
  zone_id = aws_route53_zone.main.zone_id
  name    = local.domain
  type    = "MX"
  ttl     = 3600

  records = [
    "1 ASPMX.L.GOOGLE.COM.",
    "5 ALT1.ASPMX.L.GOOGLE.COM.",
    "5 ALT2.ASPMX.L.GOOGLE.COM.",
    "10 ALT3.ASPMX.L.GOOGLE.COM.",
    "10 ALT4.ASPMX.L.GOOGLE.COM.",
  ]
}

