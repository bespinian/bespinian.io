---
title: Blue Green Deployment on Cloud Foundry
author: Lena Fuhrimann
pubDate: 2016-12-12
tags: ["cloud-foundry", "deployment", "devops", "automation"]
description:
  "Learn how to implement blue-green deployment on Cloud Foundry to achieve
  zero-downtime updates and safely roll back changes using a simple shell
  script."
image: ../../assets/blog/blue-green.jpg
---

Imagine you have one of your apps in production and want to `cf push` an update
to it. If you do so, your app will experience a short downtime because CF needs
to stop your old application and then power up the new one. During this short
period of time, your users will be receiving `404`s when trying to access your
application. Now, what if the new version of your app has an error in it and
doesn't even start on Cloud Foundry? Your users will face an even longer
downtime until you have found and fixed the bug.

To prevent these inconveniences for your users, Cloud Foundry allows you to do a
so called "Blue-Green Deployment". I won't go into the depths of this concept
because you can read all about it in the
[Cloud Foundry documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/blue-green.html).
Generally, it allows you to have two instances of your application running
simultaneously, while one is the old version and one is already the new version.
Your users are then being load balanced between the two apps and, as soon as the
new version is running correctly, the old one is shut down.

Cloud Foundry doesn't provide this functionality out of the box. That's why I
wrote a simple shell script to do this blue-green deployment for you.

```bash
#!/usr/bin/env bash

# Your ENV variables (Should be set externally, e.g. export CF_USERNAME="myUsername123")
# CF_API=
# CF_SHARED_DOMAIN=
# CF_USERNAME=
# CF_PASSWORD=
# CF_ORG=
# CF_SPACE=

max_health_checks=20
expected_response="200"
temp_suffix="-temp"

# Read from manifest.yml
app_name=$(grep " name:" manifest.yml | sed 's/.*://;s/ //g')
domain=$(grep " domain: " manifest.yml | sed 's/.*://;s/ //g')
hostname=$(grep " host: " manifest.yml | sed 's/.*://;s/ //g')

# Set default values
: "${domain:="${CF_SHARED_DOMAIN}"}"
: "${hostname:="${app_name}"}"

# Set up temporary app
temp_app_name="${app_name}${temp_suffix}"
temp_domain="${CF_SHARED_DOMAIN}"
temp_hostname="${app_name}${temp_suffix}"

# CF Login
cf api "${CF_API}"
cf login "${CF_USERNAME}" "${CF_PASSWORD}"
cf target -o "${CF_ORG}" -s "${CF_SPACE}"

# Push Green
cf push "${temp_app_name}" --no-route

# Map temporary route to Green
cf map-route "${temp_app_name}" "${temp_domain}" -n "${temp_hostname}"

# Wait for Green to be ready to serve
iterations=0
while [[ "${iterations}" -lt "${max_health_checks}" ]]
do
  response=$(curl -sIL -w "%{http_code}" -o /dev/null "${temp_hostname}.${temp_domain}")
  if [[ "${response}" == "${expected_response}" ]]; then
    printf "\n%s" "Got expected ${response} response"
    break
  else
    iterations=$(( iterations + 1 ))
    sleep 3 && printf "\n%s" "Waiting for ${expected_response} response... Got ${response} (${iterations}/${max_health_checks})"
  fi
done

if [[ "${iterations}" == "${max_health_checks}" ]]; then
  printf "\n%s\n\n" "Couldn't get ${expected_response} response. Reverting..."

  # Delete temporary route
  cf delete-route "${temp_domain}" -n "${temp_hostname}" -f

  # Stop temporary app
  cf stop "${temp_app_name}"

  exit 1
fi

# Load balance route between Blue and Green
cf map-route "${temp_app_name}" "${domain}" -n "${hostname}"

# Remove Blue from load balancing
cf unmap-route "${app_name}" "${domain}" -n "${hostname}"

# Delete temporary route
cf delete-route -f "${temp_domain}" -n "${temp_hostname}"

# Delete old app
cf delete -f -r "${app_name}"

# Rename Green to old app name
cf rename "${temp_app_name}" "${app_name}"
```

The script tries to guess some variables from your `manifest.yml` file, but
you'll still need to set some environment variables for a successful deployment:

- `CF_API`: The API endpoint of the CF instance you intend to use (e.g.,
  `https://api.lyra-836.appcloud.swisscom.com`)
- `CF_SHARED_DOMAIN`: The shared domain you want to use for temporary routes
  used to smoke test your app
- `CF_USERNAME`: Your Cloud Foundry username
- `CF_PASSWORD`: Your Cloud Foundry password
- `CF_ORG`: The Cloud Foundry org you wish to deploy to
- `CF_SPACE`: The Cloud Foundry space you intend to deploy to

As soon as you've set all of these variables, you can simply execute the script,
and it will do a verbose blue-green deployment for you. The script will deploy
the new version of your app and check for it to get healthy. You can change the
`expected_response` parameter to something else, like `401` if your app doesn't
return a `200` status code without authentication.

## Caveats

- The script currently doesn't work if your app does not use a route.
- The script currently doesn't work if your app uses more than one routes.

## Further reading

There are two plugins for the Cloud Foundry CLI that also automate certain steps
of blue-green deployment:

- [Autopilot](https://github.com/contraband/autopilot)
- [BlueGreenDeploy](https://github.com/bluemixgaragelondon/cf-blue-green-deploy)

My script is there to show you what happens behind the curtains and to be used
by CI/CD systems or if you need more fine-grained control over what is happening
during the deployment. Personally, I really like the BlueGreenDeploy plugin.
It's easy to use and does the job.
