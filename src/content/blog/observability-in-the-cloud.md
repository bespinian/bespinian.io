---
title: Observability in the Cloud
author: Gabriel Koch
pubDate: 2022-04-22
tags:
  ["observability", "monitoring", "distributed-systems", "cloud", "telemetry"]
description:
  "Understand the difference between monitoring and observability, and learn how
  to implement true observability in distributed cloud systems to effectively
  troubleshoot unknown issues."
image: ../../assets/blog/cloud-observability.jpg
---

This blog post aims to explain how observability and monitoring should be
distinguished, what the problems with "traditional" monitoring are when we deal
with distributed cloud systems, and how observability can alleviate these
problems. Finally, it roughly outlines how observability should be approached.

## Observability vs. Monitoring

For detailed accounts of the difference between monitoring and observability, I
recommend Cindy Sridharan's book Distributed Systems Observability and Charity
Major's various blog posts on the topic (e.g.
[Observability is a Many-Splendored Definition](https://charity.wtf/2020/03/03/observability-is-a-many-splendored-thing/)).

Here, I summarize the main points of these accounts and draw some conclusions.

Monitoring is what most of us are used to. It encompasses the collection of
telemetry (metrics, logs and traces) and its visualization through dashboards
and alerting, with metrics being the primary data type used. Monitoring is
primarily the process of collecting telemetry and acting upon it. It deals with
the known-unknowns (e.g. we know that we may run out of memory or disk space,
and we can monitor it, but we do not precisely know when it will happen and
which processes cause it to happen).

Observability, on the other side, describes a property of a system. A system is
observable, if you can deduce its internal state (such as the value of its
internal variables and position in the call stack), from the outputs you can
observe. These outputs can be specific behaviors exhibited to users, and in
practice rely heavily on telemetry which we collect from the system's
environment (such as the machine it is running on) or which we deliberately emit
from the system. A system can be described as "more observable", when we can
more accurately describe its internal state, and "fully observable", when we can
always describe its internal state with 100% accuracy. Making a system
observable usually requires using monitoring tools and processes, but it enables
us to deal with a larger set of problems, namely, the unkown-unknowns, and to
effectively troubleshoot issues that we could not really imagine before they
arose.

## The Limits of Monitoring

So, now that we know the difference between monitoring and observability, how
did monitoring help us deal with problems in the past?

Once something goes wrong, we may use the alerts and dashboards to get an
overview over which application, machine, or component is affected.
Additionally, we head into the logs, to try and figure out where exactly things
went wrong. If the root cause is a known issue, we can usually apply a known
fix. But if the root cause is an unknown issue, we often have to dig through
extensive logs, manually correlate them, and finally, we may have to start up
the application with a debugger to try to reproduce the exact conditions. We
iteratively go back to the logs, to grab more pieces of evidence and approximate
the state of the system when the error occurred. Since we can use debuggers to
investigate the problems, and the possible problem space is usually somewhat
limited, we can rely on this telemetry, which is usually highly aggregated.

However, this aggregated telemetry does not carry enough information when
troubleshooting applications designed for the clouds or refactored from
monolithic applications into a microservice architecture.

In a microservice architecture, we have a lot more different runtimes handling
work and interacting via the network. Additionally, the following practices are
being adopted more widely, when we design applications for clouds:

- dynamic scaling and disposable application instances
- asynchronous processing, by using queues and streaming services
- blue/green, canary or rolling deployments
- feature flags
- shorter deployment cycles

These changes lead to a more complex application landscape, which makes
debugging increasingly difficult. Instead of running one service in a debugger
and recreating its state, we may need to start various services and try to
reproduce state in each of them. Our telemetry may also become less expressive,
and we may have to ask ourselves additional questions, such as:

- Has a deployment just happened?
- What versions are actually deployed?
- Which versions (if multiple are running) show anomalous behavior?
- Which feature flags were enabled for the requests/tasks that failed?

To ensure that we still get meaningful insights from our telemetry, we need to
annotate it with additional information such as build ID, hostname, IP address,
enabled feature flags and more. This data enrichment brings about new problems:
adding more dimensions to our telemetry data makes the storage and querying
systems much slower and/or more expensive. At the same time, we still have to
make a number of queries to correlate information from multiple source systems
(microservices) to slowly piece together enough context to guess what happened.

## Closing the Observability Gap in Distributed Cloud Systems

Unfortunately, this gap cannot be closed by the simple addition of a new tool or
library. Instead, there are two primary challenges that should be tackled by
site reliability engineers who aim to improve the observability of their
systems.

First, each individual service should be instrumented to keep track of its
context. Furthermore, each service should emit arbitrarily wide events
containing the relevant context when a request/task processing finishes
(successfully or with an exception). To achieve this, whenever a workload is
processed (e.g. a request enters a system), an event context object should be
initialized and prepopulated with all relevant data. As the workload is being
processed, this object should be enriched and whenever another service is
called, relevant context should be passed downstream. When the request finishes,
the whole context event should be passed to the central storage system. Many
logging libraries support such use cases, but they also need to be implemented
correctly in the frameworks used. Ensuring, that these events are properly
enriched is the responsibility of developers and site reliability engineers. The
goal should be that problems can usually be pinpointed by looking at a single
event, without having to painstakingly correlate dozens of events or reproduce
an issue through incremental trial and error.

As a second challenge, an event storage and querying system must be put in
place, which can process these wide events reasonably and which allows querying
and searching. Storing arbitrarily wide events and querying across all
dimensions is crucial to avoid limitations to the sort of questions you can ask.
However, it is not supported by many monitoring systems, especially since it is
usually very resource intensive. Some observability / monitoring tools, such as
Elasticsearch, already support such use cases. These systems may get expensive
and require fine-tuning and optimization in their own right to ensure that they
perform well while staying cost-effective.

## Summary

While the term monitoring primarily describes the process of collecting
telemetry and defining some automated responses, the term observability goes
further. It describes the property of a system, namely how well you can infer
the system's internal state from its outputs. Monitoring is primarily focused on
diagnosing problems that occur in similar ways as problems we saw before, while
true observability allows you to effectively diagnose any problem, even
completely novel ones.

The crucial actions which any site reliability engineer should take are

1. to start collecting all relevant context information while a workload is
   processed
1. to emit this information in an event at the end
1. to ensure that a system for collecting and effectively querying these events
   is in place.

Interested in observability? Check out our
[Cloud Native Empowerment](/en/services/cloud-native-empowerment?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=observability-in-the-cloud)
service and book your free workshop.
