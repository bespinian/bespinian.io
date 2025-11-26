---
title: Cloud Foundry Route Services
author: Lena Fuhrimann
pubDate: 2016-10-03
tags: ["cloud-foundry", "route-services", "middleware", "rate-limiting"]
description:
  "Learn how to use Cloud Foundry Route Services to add authentication, rate
  limiting, or logging at the route level by intercepting requests before they
  reach your application."
image: ../../assets/blog/router.jpg
---

In Cloud Foundry, we use
[services](https://docs.cloudfoundry.org/devguide/services/) to provide
additional functionality as reserved resources to our apps. They get bound to
the app(s) directly and are accessible from these bound apps only. The image
below shows how they get provisioned through the service broker and are then
accessible to the client through the app. This is obviously a great setup for
services like databases, messaging brokers, app data loggers or other handy
additions for our apps to consume.

![Services](https://s12.postimg.org/onyin2gwd/services.png)

The service broker shown in this diagram is not used for user-provided services.

[Route services](https://docs.cloudfoundry.org/devguide/services/route-binding.html),
on the other hand, work on a different level. They are not bound to an app, but
instead directly to a route. This allows them to act as an "interceptor" and
either reject certain requests or modify them before they even reach the app.
This is ideal to provide external authentication, rate limiting or logging on a
route level. The image below shows the exact place of a route service in respect
to the client and our application.

![Route Services](https://s12.postimg.org/tlc386ivh/route_services.png)

Binding a service instance to a route will associate the `route_service_url`
with the route in the Cloud Foundry router. All requests for the route will be
proxied to the URL specified by `route_service_url`.

Once a route service completes its function, it is expected to forward the
request to the route the original request was sent to. The Cloud Foundry router
will include a header (`X-CF-Forwarded-Url`) that provides the address of the
route, as well as two headers (`X-CF-Proxy-Signature` and `X-CF-Proxy-Metadata`)
that are used by the route itself to validate the request sent by the route
service.

Verifying with the image above, the router sends the request through an extra
loop with the route service and only sends it to the app after it passes through
a second time (now with the respective headers).

## Your First Route Service

In this tutorial, we will use a
[user-provided service](https://docs.cloudfoundry.org/devguide/services/user-provided.html)
to serve as a rate limiter for one (or more) of our applications. User-provided
services can also be used as route services. During the creation of a
user-provided service, you can use the `-r` flag to set a URL to which the
requests will be forwarded. We will then create an app (the actual rate limiter)
which will be waiting for requests coming in at said URL.

You can use any
[Cloud Foundry provider](https://www.cloudfoundry.org/use/cloud-foundry-certified/)
for this tutorial. I am using the
[Swisscom Application Cloud](https://developer.swisscom.com) as an example.

This tutorial assumes that you have a running app on Cloud Foundry which you can
apply the rate limiter to. Any app that has a route will do. In case you don't
have one, you can simply `cf push` a dummy app like
[this one](https://github.com/swisscom/cf-default-app-staticfile).

### Push Rate Limiter

As a first step, let's create the actual rate limiter. Simply clone
[this repo](https://github.com/cloudfoundry-samples/ratelimit-service), which
contains a small Go rate-limiting app. Then push the app to your space with the
following command:

```shell
$ cf push rate-limiter -m 64M
```

You may have to specify an alternate hostname using the `--hostname` flag or use
a random one using the `--random-route` flag because the default one is taken.

### Create User-Provided Service

Next, we will create the route service as a user-provided service. This will
then forward all requests coming in at any bound routes to the URL specified as
`-r` (don't forget to adjust the hostname of the URL to the one you have chosen
for your "rate-limiter" app):

```shell
$ cf create-user-provided-service rate-limiter-service -r https://rate-limiter.scapp.io
```

You should always use `https` for this URL to make the link between the CF
router and your route service more secure.

### Bind Service to Route

As a last step, we bind the newly created service to the route bound to the app
we want to apply the rate limiter to (don't forget to replace the hostname with
your own):

```shell
$ cf bind-route-service scapp.io rate-limiter-service --hostname myapp
```

### Test Our Rate Limiter

To test our rate limiter, we decrease the limit to 1 request per second (the
default is 10). To do so, set the environment variable `RATE_LIMIT` to `1` and
restage the app:

```shell
$ cf set-env rate-limiter RATE_LIMIT 1
$ cf restage rate-limiter
```

The next step is to put some load onto the app. I'm using
[loadtest](https://www.npmjs.com/package/loadtest), but you can use any tool
like [ab](https://en.wikipedia.org/wiki/ApacheBench) or
[Goad](https://goad.io/#demo). Again, don't forget to replace the hostname with
the one you have chosen for your app.

```shell
$ loadtest --rps 1000 https://myapp.scapp.io
```

You can open the logs of your rate limiter in a separate window with
`cf logs rate-limiter` to directly tail the requests it gets.

The app should remain functional, even with the load of 1000 requests per
second. If you turn off the rate limiter by unbinding "rate-limiter-service"
from the route

```shell
$ cf unbind-route-service scapp.io rate-limiter-service --hostname myapp
```

and then run the test again, the app will most likely not be able to serve all
request in a timely manner because it's not protected by the rate limiter
anymore.

## What's next?

The Cloud Foundry [samples library](https://github.com/cloudfoundry-samples)
also contain a second route service you can deploy in the same way: The
[Logging Route Service](https://github.com/cloudfoundry-samples/logging-route-service).
Do you have any other ideas for route service use cases? Please let me know in
the comments!
