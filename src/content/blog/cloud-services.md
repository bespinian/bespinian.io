---
title: Kurt's Cloud Journey
author: Philippe Hässig
date: 2023-11-03
tags: ["cloud", "infrastructure", "storage", "scaling", "serverless"]
excerpt:
  "Follow Kurt's journey as he learns about essential cloud services including
  object storage, managed databases, serverless runtimes, and message queues
  while running a theater ticket shop."
---

In this post, we would like to give you an overview of the key services every
cloud infrastructure provider offers.

<!--more-->

## Prologue

This story is about Kurt. Kurt is in charge of running the online ticket shop
for a local theater group. The shop lets you do the following:

- List upcoming events with some pictures as a teaser.
- Allow visitors to buy tickets.
- Get a ticket as a PDF file by email.

Because Kurt already knows one or two things about "the cloud", he's set up a
small virtual machine at his favorite hyperscale cloud provider and deployed the
app. Most of the time, the application is idling. It only serves a couple of
requests per day.

## Chapter 1: The Black Hole of Storage

While Kurt is getting a well-deserved rest on a Greek island, he receives a call
from the theater group's president. She tried to publish some new events in the
shop. After entering the second event, the shop started throwing weird errors
and is now unresponsive.

Reluctantly, Kurt fetches his laptop from his bag and starts to investigate. He
finds out that the server ran out of storage. After increasing the disk size via
the cloud provider's console, the shop runs smoothly again. He finds out that
somebody uploaded a lot of large pictures for an event. The larger disk should
hold for a while, but he knows that it is only a matter of time until it runs
out of space again.

At home, Kurt refactors the shop to use his cloud provider's **object storage**
service. He moves all the pictures and other static content there.

In an object storage (also well known under the name "S3" at AWS), we can store
all kinds of files (pictures, videos, documents, etc.) without ever having to
increase their size. Usually, this service is paid for exactly the amount of
storage it holds plus the incoming and outgoing traffic.

## Chapter 2: Data, data

Because the shop was so user-friendly, the theater group started to let other
groups use the system for their events too. After a while, several theater
groups in the region ran a couple of hundred shows per year through Kurt's shop.
Which is still running on that same small virtual machine.

While Kurt is on a hiking trip in the Swiss mountains, he gets a call from the
group's president. The shop is again unresponsive or throws weird errors. He
grabs his laptop (which he always brings on hiking trips for cases like these)
and starts to investigate. Apparently, the virtual machine has run out of space
again. The database has grown a lot and slowly filled the disk.

On the way home, Kurt starts to set up a **document database** using his cloud
provider's management interface. Luckily, he's already been using
[MongoDB](https://www.mongodb.com/) for the shop on the virtual machine, and
because the provider has a compatible product available, the migration was
pretty easy.

All cloud providers offer a set of different managed database services. What
they all have in common is that you don't need to care about anything around
that database system. It is usually fully managed by the provider, which means
they monitor it, update it, and care for the safety of your data.

They even do that complicated active-active replication configuration on a
global scale for you. If you need it. And if you have the budget.

Usually, they have compatible products for Postgres, MySQL/MariaDB, MongoDB and
even Microsoft SQL Server.

## Chapter 3: Scale without limits

While Kurt is on a diving trip in the Caribbean, the president of the theater
group calls him again. They ran a social media campaign for their new play. One
post went viral on TikTok, and now the shop is very slow or even unresponsive.
Kurt knew something like this was coming, so he took his laptop out of his dry
suit and started to investigate.

The virtual machine is totally unresponsive, and the provider's metrics show a
very high CPU load. He assigns a larger CPU type to the machine and restarts it.
The shop is now responsive again, but still a bit slow. Kurt lets it be for the
moment and starts to think about how this scenario can be avoided in the future.
Back in the hotel, he starts packing the application into a container and
configures the cloud provider's **serverless container runtime**. Now the
application automatically scales up when there's more demand. And even better,
it automatically scales down to zero during the night, when nobody wants to buy
theater tickets, which allows the theater group to save some money for other
things.

Serverless container runtimes and similar services let you use exactly as many
resources as your applications need. This allows you not only to scale
automatically, but it can also save you a lot of money if done right.

Another advantage is that you don't have to manage a server anymore. Most of the
time, you just throw some code at it, and the service knows what it needs to do.
It even restarts failed services for you, no matter where in the world you are.

## Chapter 4: Queuing

Before going on an ice fishing trip to Finland, Kurt wants to make sure he isn't
going to be disturbed again. (And yes, there's
[almost certainly high-speed internet](https://www.telia.fi/asiakastuki/kuuluvuuskartta)
on a Finnish lake.) So he takes a look at the shop's code and thinks of how it
can be improved even more. Using the cloud provider's analysis tools, he finds
out that the app always immediately scales up when it creates the PDF ticket for
an order. This also correlates with some complaints by customers that the
ordering process usually takes pretty long.

Kurt starts to draft a plan for refactoring the app. Instead of immediately
producing the PDF and email, the app now sends a message into the provider's
**message queue** system. The code that produces the PDF and sends the email now
runs as a serverless function, triggered by the message. This means that the PDF
production and email sending now run asynchronously in the background. The order
process feels much faster now, and the serverless container runs with a single
instance most of the time.

Using message queues, you can vastly improve the performance and resource usage
of an application. These messages can either be processed by your own
application, or you can define a serverless function that will be triggered by a
message. Obviously, this has a huge impact on the application's architecture and
needs to be planned carefully.

## Conclusion

This was a really high-level overview of some of the advantages a modern cloud
provider can offer. We learned about some of the major services all cloud
providers offer in one way or another: virtual machines, object storage, managed
databases, serverless runtimes and message queues.

Of course, they offer much, much more services, and they add new ones almost
daily.

The major advantages that all services have in common are availability,
scalability, adaptability, and security. These are all important points, which
usually take quite some effort when you run them yourself.

And a last word: Don't be like Kurt. Enjoy your time off without distractions.
