---
title: Configure Front End Apps With Environment Variables on Cloud Foundry
author: Lena Fuhrimann
date: 2016-11-20
tags: ["cloud-foundry", "frontend", "configuration", "nginx", "staticfile"]
excerpt:
  "Discover how to configure static front-end applications on Cloud Foundry
  using environment variables by exposing configuration through an HTTP endpoint
  with nginx."
---

The [12 factor manifest](https://12factor.net/) tells us in point III that apps
should retrieve their config from environment variables to **strictly separate
config from code**. "Config" meaning everything that is likely to vary between
deployments (staging, production, developer environments, etc.). Cloud Foundry
allows us to do that easily using either the `manifest.yml` file or the
`cf set-env` command. However, this only works for apps which have a dynamic
back end. What if we want to configure a front end app that we have pushed to
Cloud Foundry using the
[Staticfile Buildpack](https://github.com/cloudfoundry/staticfile-buildpack)?
These apps are, by definition, static, so they cannot read out any environment
variables. Therefore, if we use this buildpack to deploy an
[Angular](https://angular.io/) or [React](https://facebook.github.io/react/)
app, we cannot use these variables.

Luckily, our [nginx](https://www.nginx.com/) (the technology which the
staticfile buildpack uses) server can do so. This gave us the idea to expose the
configuration through an HTTP endpoint. The `nginx.conf` file is parsed by Ruby
before it's being used by the buildpack to set up your nginx. So, you can use
the environment variables to configure a JSON endpoint to expose the
configuration to your front end app.

## How To

To get our custom configuration endpoint, we'll need to add the following block
to a custom `nginx.conf` file residing in the root folder of our app:

```nginx
<% if ENV["APP_CONFIG"] %>
location /app-config {
  default_type application/json;
  return 200 '<%= ENV["APP_CONFIG"] %>';
}
<% end %>
```

This will add an endpoint `/app-config` which exposes your configuration as JSON
if the environment variable `APP_CONFIG` exists. If it doesn't exist, the
endpoint won't be exposed at all.

If you don't have a custom `nginx.conf` yet, you can use this sample one, which
already includes the above code:

```nginx
worker_processes 1;
daemon off;

error_log <%= ENV["APP_ROOT"] %>/nginx/logs/error.log;
events { worker_connections 1024; }

http {
  charset utf-8;
  log_format cloudfoundry '$http_x_forwarded_for - $http_referer - [$time_local] "$request" $status $body_bytes_sent';
  access_log <%= ENV["APP_ROOT"] %>/nginx/logs/access.log cloudfoundry;
  default_type application/octet-stream;
  include mime.types;
  sendfile on;

  gzip on;
  gzip_disable "msie6";
  gzip_comp_level 6;
  gzip_min_length 1100;
  gzip_buffers 16 8k;
  gzip_proxied any;
  gunzip on;
  gzip_static always;
  gzip_types text/plain text/css text/js text/xml text/javascript application/javascript application/x-javascript application/json application/xml application/xml+rss;
  gzip_vary on;

  tcp_nopush on;
  keepalive_timeout 30;
  port_in_redirect off; # Ensure that redirects don't include the internal container PORT - <%= ENV["PORT"] %>
  server_tokens off;

  server {
    listen <%= ENV["PORT"] %>;
    server_name localhost;

    location / {
      root <%= ENV["APP_ROOT"] %>/public;

      index index.html index.htm Default.htm;

      <% if ENV["FORCE_HTTPS"] %>
        if ($http_x_forwarded_proto != "https") {
          return 301 https://$host$request_uri;
        }
      <% end %>

      <% if ENV["APP_CONFIG"] %>
      location /app-config {
        default_type application/json;
        return 200 '<%= ENV["APP_CONFIG"] %>';
      }
      <% end %>
    }

  }
}
```

This config will work with the staticfile buildpack, but disables some optional
configurations of it. To add these back, you'll have to adjust the above code
accordingly.

Now push your app with `cf push` and set the `APP_CONFIG` environment variable
to some JSON string with the following command:

```shell
$ cf push <app-name>
$ cf set-env <app-name> APP_CONFIG '{"apiUrl":"https://jsonplaceholder.typicode.com"}'
```

Now restage your app, as suggested, with:

```shell
$ cf restage <app-name>
```

If you visit the `/app-config` endpoint of your app, it should return the
specified JSON. Your front end app can now retrieve its config dynamically from
that endpoint. You might have a fallback for all of these config items for local
development if you use something like the
[webpack-dev-serer](https://webpack.github.io/docs/webpack-dev-server.html). Of
course, you can also configure your dev server to expose the same endpoint and
create a development config for that.

## Use Cases

You can use this method to configure different environments your app might be
running in. E.g., you might use a different API server for your integration
environment than for your production environment.

Alternatively, you could use it to toggle feature flags dynamically to do
[A/B testing](https://en.wikipedia.org/wiki/A/B_testing) or a
[canary release](https://martinfowler.com/bliki/CanaryRelease.html).

I'm sure there are many more use cases, but the main thing is, that this method
allows you to have the single build job and then deploy that build to many
environments.

Many thanks to [Mathis Kretz](https://github.com/mkretz) for the inspiration for
this post!
