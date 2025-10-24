---
title: Manage Buckets on Cloud Foundry S3 Services
author: Lena Fuhrimann
date: 2017-03-17
tags: ["cloud-foundry", "s3", "storage", "buckets"]
excerpt:
  "Learn how to create and manage S3 buckets on Cloud Foundry using s3cmd or the
  open-source S3 Manager application."
---

[S3](https://aws.amazon.com/s3/) is a great concept to store static files and
larger [BLOBs](https://en.wikipedia.org/wiki/Binary_large_object). Let's look
into how we can use it in Cloud Foundry.

S3 was originally created by [Amazon Web Services](https://aws.amazon.com/), but
by now there are many 3rd party services that are compatible with the S3 API.
Some Cloud Foundry providers have S3 compatible services available in their
marketplace. If they don't, you can create your own by creating a
[user-provided service](https://docs.cloudfoundry.org/devguide/services/user-provided.html)
and adding the respective S3 credentials (e.g., from AWS).

This tutorial uses the
[Swisscom Application Cloud S3 Dynamic Storage](https://docs.developer.swisscom.com/service-offerings/dynamic.html),
but you can also use any other S3 provider.

To create an S3 service, run the following command

```shell
$ cf create-service dynstrg usage my-storage
```

where `my-storage` is the name of your service instance.

Then we create a service key so that we can access our service:

```shell
$ cf create-service-key my-storage my-key
```

Now you can retrieve the credentials to your S3 service at any time using the
command

```shell
$ cf service-key my-storage my-key
```

The credentials from this key will be used in the next steps.

## Create S3 Bucket

Now that we have our S3 service, we need to create a bucket to hold our data. I
suggest using the [s3cmd](https://github.com/s3tools/s3cmd) CLI tool for that.
You can either download it from the
[releases](https://github.com/s3tools/s3cmd/releases) page or by using
[Homebrew](http://brew.sh/) if you're on macOS. As soon as you have it
installed, configure it using the following command:

```shell
$ s3cmd --configure
```

You will be prompted for your credentials. Most of them you can find by
retrieving your service key from above or by using the defaults.

If you are using the Swisscom Dynamic Storage, set the region to `nil` and note
that `Secret Key` is your `sharedSecret` and that `S3 Endpoint` is your
`accessHost`. For
`DNS-style bucket+hostname:port template for accessing a bucket`, you can use
`%(bucket)s.<your-accessHost>` with your respective `accessHost`.

Now you should be able to run

```shell
$ s3cmd ls
```

which should return empty if you don't have any buckets or list your existing
ones. Now, we can finally create our bucket called "my-bucket" with the
following command:

```shell
$ s3cmd mb s3://my-bucket
```

## S3 Manager

Alternatively, you can use an open-source app I've been developing called
[S3 Manager](https://github.com/cloudlena/s3manager). You can easily run it
locally or deploy it to Cloud Foundry and then set the respective environment
variables to manage your S3 buckets and files.
