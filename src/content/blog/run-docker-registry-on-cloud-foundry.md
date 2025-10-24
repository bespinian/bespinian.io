---
title: Run Docker Registry on Cloud Foundry
author: Lena Fuhrimann
date: 2017-08-24
tags: ["docker", "cloud-foundry", "registry", "containers", "s3"]
excerpt:
  "Deploy a private Docker Registry on Cloud Foundry using S3 for storage and
  Redis for caching to securely manage your container images."
---

If you work a lot with [Docker](https://www.docker.com/), you are probably used
to the concept of having a [Docker Registry](https://docs.docker.com/registry/),
which allows you to store your images in a safe place. There's a public registry
that you can use for free at [Docker Store](https://store.docker.com/). But what
if you don't want your images to be publicly available? What if you want to have
your images in a safe place that you control? The solution is to deploy a
private Docker registry. Doing so on Cloud Foundry is fairly easy.

## Create Registry Binary

First, we need to create the registry's binary to upload it to Cloud Foundry
using the [Binary Buildpack](https://github.com/cloudfoundry/binary-buildpack).
For that, you need to have
[Docker](https://docs.docker.com/engine/installation/) installed. Run a
`git clone` on the
[Docker Distribution repo on GitHub](https://github.com/docker/distribution):

```shell
$ git clone https://github.com/docker/distribution.git
```

It is advisable to check out the latest tag of the repo to build. This will
ensure that you have a supported version of Docker Distribution and therefore
the registry.

Then `cd` into it and compile it using Docker:

```shell
$ docker run --rm -v "${PWD}:/go/src/github.com/docker/distribution" -w /go/src/github.com/docker/distribution golang make binaries
```

After the compilation, create a new folder anywhere on your computer and copy
the file `bin/registry` into it. This is the binary file that contains the whole
registry application:

```shell
$ mkdir ~/registry && cp bin/registry ~/registry
```

This will be your working directory for this tutorial.

## Create S3 Service

By default, the registry stores the pushed Docker images on the local file
system. Since apps should be stateless according to the
[twelve-factor app manifest](https://12factor.net/processes), we will change
this behavior to use an S3 backend instead. Please follow
[this tutorial](/manage-buckets-on-cloud-foundry-s3-services/) on my blog to
create an S3 service with bucket and name the service "registry-storage".

## Create Redis Cache

This step is optional. If you omit it, though, you'll have to remove all the
Redis related stuff from the files described in the steps afterwards.

To improve the performance of our registry, we can add a
[Redis](https://redis.io/) cache. First create one in Cloud Foundry:

```shell
$ cf create-service redis small registry-cache
```

Again, this example is using the Swisscom Application Cloud. If you're using a
different CF provider, the command might be different.

## Create Manifest File

Now `cd` into your registry folder and create a `manifest.yml` file. Cloud
Foundry uses it to specify how your app should be pushed and started. Then paste
the following lines into it:

```yaml
applications:
  - name: registry
    host: my-hostname
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/binary-buildpack.git
    command: ./entrypoint-cf.sh
    services:
      - registry-storage
      - registry-cache
    env:
      REGISTRY_STORAGE_S3_BUCKET: my-bucket
      REGISTRY_HTTP_SECRET: xxx
```

Don't forget to change `my-bucket` to your own bucket name, and the `host` to
some hostname that isn't taken yet. Furthermore, you'll need to generate some
random string and use it as the `REGISTRY_HTTP_SECRET`.

## Create Entrypoint Script

As you can see above, the manifest states an entrypoint script to be run as the
command. This script generates the registry's `config.yml` out of our service
configuration (which is in the `VCAP_SERVICES` environment variable) and then
starts the app. Create the script under the name `entrypoint-cf.sh` and fill it
with the following content:

```bash
#!/bin/bash

set -e -u

if [ -z "${PORT}" ]; then
  echo "Error: No PORT found" >&2
  exit 1
fi
if [ -z "${VCAP_SERVICES}" ]; then
  echo "Error: No VCAP_SERVICES found" >&2
  exit 1
fi

s3_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["dynstrg"][0].credentials // ""')"
if [ -z "${s3_credentials}" ]; then
  echo "Error: Please bind an S3 service" >&2
  exit 1
fi

s3_regionendpoint="$(echo "${s3_credentials}" | jq -r '.accessHost // ""')"
s3_access_key="$(echo "${s3_credentials}" | jq -r '.accessKey // ""')"
s3_secret_key="$(echo "${s3_credentials}" | jq -r '.sharedSecret // ""')"

redis_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["redis"][0].credentials // ""')"
if [ -z "${redis_credentials}" ]; then
  echo "Error: Please bind a Redis service" >&2
  exit 1
fi

redis_host="$(echo "${redis_credentials}" | jq -r '.host // ""')"
redis_port="$(echo "${redis_credentials}" | jq -r '.port // ""')"
redis_password="$(echo "${redis_credentials}" | jq -r '.password // ""')"

# Fill in template and write it to config.yml
echo "
version: 0.1

storage:
  s3:
    regionendpoint: https://${s3_regionendpoint}
    region: nil
    accesskey: ${s3_access_key}
    secretkey: ${s3_secret_key}
  redirect:
    disable: true

http:
  addr: :${PORT}
  headers:
    X-Content-Type-Options: [nosniff]

redis:
  addr: ${redis_host}:${redis_port}
  password: ${redis_password}

health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
  tcp:
  - addr: ${redis_host}:${redis_port}
    timeout: 3s
    interval: 10s
    threshold: 3
" > config.yml

# Start the app
./registry serve config.yml
```

Then make the script executable by running the following command:

```shell
$ chmod +x entrypoint-cf.sh
```

## Push the Registry

Your registry is ready to be pushed. Simply run the following command:

```shell
$ cf push
```

Your registry is ready to go!

## Try It Out

Now you should be able to push a local docker image to your registry. Pull an
example one from the Docker Store:

```shell
$ docker pull nginx
```

Then rename it to be pushed to your registry:

```shell
$ docker tag nginx my-hostname.scapp.io/my-nginx
```

Don't forget to adjust the hostname "my-hostname" to the one you chose for your
registry app in Cloud Foundry.

Then push it to your private registry:

```shell
$ docker push my-hostname.scapp.io/my-nginx
```

Now you can pull it using

```shell
$ docker pull my-hostname.scapp.io/my-nginx
```
