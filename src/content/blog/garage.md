---
title: Garage and Deuxfleurs
author: Johannes Karl
pubDate: 2026-07-30
tags:
  ["s3", "sovereignty", "devops", "rust" ]
description:
  "Introduction to Garage and the organization behind it."
image: ../../assets/blog/garage.jpg
---

# Garage

Garage is an S3-compatible, distributed object-storage solution that can be easily self-hosted on very limited hardware. The project was started by [Deuxfleurs](#deuxfleurs) to create a service that is free from the influence of corporations. A service, that allows one to host their personal data without relying on any cloud services but instead just on the hardware that people own.\
You can even run Garage on a Raspberry Pi, if that's what floats your boat.

Some of the core design goals are to

* provide a service that is both **simple** to understand and operate,
* be self-contained and light-weight (<small>it is a single binary, written in Rust 💙</small>) and
* **highly resilient** to network issues and other failures

That makes it a really good choice for self-hosting static websites, as a storage backend for tools such as [`rsync`](https://github.com/rsyncproject/rsync) or [`restic`](https://github.com/restic/restic) and [more](https://garagehq.deuxfleurs.fr/documentation/design/goals/#use-cases).
And while it is compatible with most S3 tooling and features, it does not attempt to support all of them to keep the scope manageable. Here a quick overview of the features it does/does not support:


| Feature                                                                                                                       | Supported |
|-------------------------------------------------------------------------------------------------------------------------------|-----------|
| Presigned URLs                                                                                                                | Yes       |
| [Server side encryption (SSE-C)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html) | Yes       |
| Bucket versioning                                                                                                             | _No_      |
| [Path-style requests](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html#path-style-access)            | Yes       |
| Virtual-hosted-style requests                                                                                                 | Yes       |

<small>Source: [https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/](https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/)</small>


### Geo-Distribution

One of the key aspects of Garage is the ease in which it can provide a geo-distributed object storage, which allows the storage and replication in multiple geographical locations. To offer more flexibility, the way Garage replicates the data ([replication factor](https://garagehq.deuxfleurs.fr/documentation/reference-manual/configuration/#replication_factor)) can be configured via a simple [`.toml`](https://garagehq.deuxfleurs.fr/documentation/reference-manual/configuration/) file. 

### Deploying & Operating

Since Garage is just a single binary, deploying it turns out to be really easy.
Be it through Kubernetes and the Helm charts provided by them or directly via `systemd`, it offers a lot of [different options](https://garagehq.deuxfleurs.fr/documentation/cookbook/real-world/).
They just recommend that a minimum of `3` nodes should be involved when deploying it.

For monitoring, the service exposes an Admin API that provides Prometheus-compatible metrics that can be scraped.

### Limitations

Obviously, there are some limitations to using Garage. As already mentioned, it does not aim to support every S3 feature. If that is a strict requirement, some of the alternatives might be more viable. There are also some [known issues](https://garagehq.deuxfleurs.fr/documentation/reference-manual/known-issues/) that should be kept in mind when evaluating it as an option.

## Deuxfleurs

Deuxfleurs is an experimental, non-profit hosting organization based in Rennes, France.
They largely rely on funding from organizations such as NLnet or projects by the European Union, but also individual donations.

Besides building the tools, they also offer some services like static hosting, email or Matrix-based instant messaging.\
According to them, they use less than 10 refurbished servers to offer these services for thousands of people, which is pretty cool if you ask me.

So if you benefit from their work, consider giving back via contributions or donations.
