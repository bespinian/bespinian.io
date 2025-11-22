---
title: Kubernetes Cost Transparency
author: Gabriel Koch
date: 2021-04-09
tags:
  ["kubernetes", "cost-management", "chargeback", "monitoring", "prometheus"]
excerpt:
  "Learn how to implement cost transparency in Kubernetes clusters using
  Prometheus and other tools to track resource usage, attribute workloads, and
  enable chargebacks."
image: ../../assets/blog/cost-transparency.jpg
---

The cloud promises transparency into the cost of our applications and technical
services. However, Kubernetes, even when managed by one of the big cloud service
providers, usually gets charged as a black box, and is often used by dozens or
hundreds of applications in your organization.

This post outlines the necessary steps to approach cost transparency for your
Kubernetes clusters from an organizational perspective, proposes a high level
technical design to start with, and addresses some of the more common challenges
and pitfalls.

## Goals

Kubernetes clusters are usually multi-tenant systems, used by many teams within
your organization. They are an expensive, but extremely valuable tool for your
teams.

Eventually, you'll want to bring transparency into which applications and
workloads cause what cost in order to:

- give your team and tenants detailed insight into which resources and projects
  drive cost
- incentivize tenants to use fewer resources to save money
- split cost fairly among the cluster tenants
- calculate chargebacks into your organization's internal cost centers
- alert someone when costs are rising quickly and unexpectedly
- forecast the cost of your IT infrastructure

You want to achieve these goals, while retaining the benefits Kubernetes brings
with its flexible scaling and deployment options.

## Overview

Since Kubernetes does not track any information about cost or even persistently
store the resource usage of our workloads, we need a system that records each
workload and which resources it consumes for how long (Price x Quantity).
Additionally, we want to ensure workloads are attributable to a person, team,
project or cost center in our organization, if we want to effectively do
chargebacks or support business decisions.

Storing this information in a suitable database allows us to create the desired
reports, dashboards, alerts, and chargebacks into our organization.

## Proposed Tool Chain

There are some companies providing tools to enable transparency.

You may have much of the required tools already available in your Kubernetes
clusters. In fact, a powerful tool chain enabling dynamic cost transparency
queries and reports uses Prometheus at the core, which is often deployed with
Kubernetes clusters for monitoring purposes already. Prometheus is a time-series
database and allows efficient ingestion, storing and querying of time series
data, such as resource usage data, which is scraped on a fixed interval like
once a minute.

The Prometheus ecosystem also contains the following tools which serve our use
case well and are often installed with it.

- The Prometheus Node Exporter measures CPU and memory usage of pods and
  containers, as well as other metrics on nodes in a Kubernetes cluster.
- Kube-State-Metrics prepares other Kubernetes information for ingestion by
  Prometheus.
- The Prometheus Alertmanager allows us to alert based on specific thresholds
  and send emails, trigger a pager or generate a ticket.
- Grafana enables us to create dashboards to visualize resource usage over time
  and interactive cost exploration.

### Kubecost

Kubecost is an open-source cost monitoring tool for Kubernetes that is also
based on Prometheus and its ecosystem and can already give you insight per
namespace.

It runs on your cluster, offers basic reports and dashboards, and makes some
recommendations to rightsize specific workloads.

## Introducing A Cost Management Solution In Your Organization

While the proposed tool chain fulfills the technical needs to gain insight, I
want to discuss the path for introducing a cost management solution in your
organization.

### Starting To Extract The Data

As mentioned before, Kubernetes does not persist any of the data required for
cost aggregation. The first step is therefore to put the infrastructure for
tracking and storing this data in place. Your historical data will now start
building and allow you insight on a weekly, monthly and eventually yearly basis.

### Create First Reports

Once resource usage data is available for a short time period, a week is a good
start, you'll be able to create first reports and start identifying some bigger
resource consumers, which you may approach to ensure their consumption is
expedient for your business.

### Workload Attribution

At this point, you may notice that many of the workloads do not clearly belong
to a specific team, organizational unit, project or cost center. You'll have to
find this information in your organization and then **tag** these resources,
e.g., using Kubernetes annotations, to automatically attribute costs to the
right cost center in the future.

Additionally, you should define a process or framework for future resources to
be tagged with that information from the start.

### Communicate To Teams

Before you start the chargebacks in your organization, you should try to build
awareness of what costs are approaching, and provide transparent information on
what these costs are composed of. As such, it's useful to pass on not only your
defined prices (cost per CPU / gigabyte of memory), but also detailed
information about which of their Kubernetes objects used what resources at which
time. This helps teams understand the cost and may already incentivize them to
rethink their infrastructure usage and start optimizing their workloads.

A great way to create this transparency is to create interactive dashboards
using Grafana.

### Chargebacks

Eventually, you may want to automatically charge back with your organization's
internal billing processes. Based on the workload attribution, it is now
possible to create consistently structured billing reports on a monthly or
yearly basis or an API and feed it into your internal billing processes.

### Forecasting / Budgeting

Many organizations desire to forecast the cost of projects, or applications into
the future, which is now possible, based on the data you have. However, since
scaling and ad-hoc deployments are a desired feature, which you want developers
to make use of, forecast accuracy is often limited.

Introducing budgets per application, which have to be clearly communicated to
the responsible teams, may help you track your forecast accuracy and highlight
and even prevent potential cost overruns early.

### Continuous Optimization

Kubernetes clusters and the workloads running on them are constantly changing.
You should invest some time to continuously review whether your processes and
billing model still match reality and whether your billing model is being
exploited.

Optimizing Kubernetes workloads' resource efficiency across your organization is
complicated and requires a significant amount of know-how, since many obvious
actions have potentially negative side effects on performance or even
availability of the applications. Fostering an exchange around this optimization
within your organization can help teams use resources more efficiently, while
avoiding these side effects.

## Common Challenges and Issues

### Reserved, Used, And Burst Capacity

There are some challenges around CPU and memory still. In shared clusters, you
may want to ensure the provisioned capacity matches the required capacity
closely. If the infrastructure layer of your Kubernetes cluster allows quick
scaling, this may be more easily achievable even while the required capacity
changes.

Most cloud providers offer reserved instances, which are significantly cheaper
than pay-as-you-go billed instances. Reserved instances are often 50% to 70%
cheaper with a 3-year reservation. You need to make sure you provision a
baseline capacity using reserved instances.

Using reserved instances is therefore highly recommended, but introduces more
complexity into the cost structure of your Kubernetes clusters.

> #### Provisioning Is A Best Effort Operation
>
> Provisioning new infrastructure on your cloud or on-premise provider is
> usually a best-effort operation for most cloud resources, and there have been
> some rare occasions where virtual machines of specific types could not be
> provisioned in certain regions:
>
> - [AWS London users suffer "insufficient capacity" problems with T2 Micro Instances (2017)](https://www.computerweekly.com/news/450415571/AWS-London-users-suffer-insufficient-capacity-problems-with-T2-Micro-Instances)
> - [European users reporting they're hitting Azure capacity constraints (2020 / COVID)](https://www.zdnet.com/article/european-users-reporting-theyre-hitting-azure-capacity-constraints/)

I recommend defining reserved and burst capacity for your resources and billing
them differently. Reserved capacity should always be immediately available to a
resource, even if the specific resource (e.g., a namespace) is not using all of
it, while burst capacity may take a little longer to provision and in rare cases
not be provisioned at all. The main advantage being, that assuming reserved
capacity of the workloads is relatively stable, you can confidently provision
reserved instances on your cloud provider, but that implies that reserved
capacity cannot be reduced. If it's no longer required for one workload, it
would have to be shifted.

Defining reserved and burst capacity per namespace is best practice, since it's
easy to track and the burst capacity as the upper limit can be automatically
enforced using Kubernetes
[resource quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/).

Reserved capacity should be billed, regardless of whether it's been used or not,
but at a lower price, reflecting your possibility to use reserved instances.
Burst capacity should be billed using a pay-as-you-go model, where you compute
the capacity used that exceeded the reserved amount and bill that difference
using a pay-as-you-go rate.

I suggest this model, as it supports using reserved instances, allows
communicating prices transparently to the tenants of the Kubernetes cluster and
incentivize them planning ahead, while retaining much of the flexibility in
scaling and pay-as-you-go billing for certain use cases. However, it is more
complex than a single pay-as-you-go pricing model and therefore requires better
communication to teams.

### Non-Compute Resources

CPU and memory are usually the main cost drivers for Kubernetes clusters and
should be your focus at first. However, eventually, you may want to extend your
billing to disks, especially SSDs, network IO, load balancers and other
resources which incur cost within your organization. This prevents exploitation
of the billing model and increases transparency into the true cost of your
applications.

Much of this information can be extracted from Kubernetes as well and integrated
into your solution.

### Attributing Workloads

Once you start analyzing the workloads on your cluster from the resource usage
and cost perspective, you may notice that a significant amount of your workloads
cannot be obviously attributed to an organizational unit or cost center.

This makes it challenging, if you're trying to match workloads to preexisting
cost management constructs. However, in numerous instances workloads running on
Kubernetes belong to the same application or are managed by the same team are
grouped together in the same namespace for technical or organizational reasons
already. Namespaces are therefore a great starting point.

Using namespaces to link workloads to your cost management constructs has
several more advantages:

- All relevant Kubernetes objects belong to a namespace.
- Kubernetes objects belong to **only one** namespace.
- Namespaces are not ephemeral — They usually live months or years.
- You'll have much fewer namespaces than pods or other resource consuming
  objects.
- The namespace of an object is available in almost all contexts, simplifying
  aggregation.
- You can set quotas on namespaces.

Defining a process for creating namespaces, where attribution of the resources
can be ensured is recommended, to enable automatic attribution in the future.

> #### Using Annotations
>
> Another approach to attribute workloads to your organizational units, relies
> on Kubernetes
> [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/)
> which can be attached to all Kubernetes objects. This allows more flexibility,
> but requires more investment into aggregating data.
>
> You can also rely on namespaces and attach annotations on them to keep the
> relevant data together within Kubernetes. Additionally, defining reserved
> capacity using annotations on namespaces is a good way to manage everything in
> the same place.

#### Shared Namespaces

You may encounter namespaces that contain resources that should be attributed to
different cost centers or organizational units. This is generally discouraged
and where possible should be changed.

However, there are good reasons for shared namespaces. A few teams may run
infrastructure together supporting their development process, such as build
servers or artifact management repositories. This practice allows them to
synergize the management of these components. Some of these components use many
resources regardless of load, and sharing them reduces the cost on the whole
organization. While there are many options to split the cost (new cost centers,
defining a split using annotations on the namespace), just billing to one of the
cost centers is recommended, unless these shared namespaces turn out to be a
major cost driver in your cluster.

In some cases, shared namespace may also highlight a rigid cost center structure
or slow and complicated processes around it or the creation of namespaces,
causing namespaces to be shared or even reused instead of decommissioned.
Simplifying these tasks could reduce the desire to create shared namespaces or
reuse them.

Additionally, you'll have namespaces that contain resources necessary for
Kubernetes or additional tooling, such as logging and monitoring infrastructure.
It makes sense to calculate this cost into the maintenance cost of the cluster,
which you either bill to a separate cost center or add as a surcharge to the
pricing of your resources.

## Most Common Optimization Opportunities

### Non-Production Environments

Development and testing environments are often responsible for a significant
amount of your cost, especially when they are used the same way as with
traditional virtual machines or bare-metal hardware, where you often had
dedicated instances running for each of those environments at all times. The
reasons for having long-running non-production environments were, usually, that
provisioning such an environment would traditionally take days or weeks and that
sharing compute resources was difficult and impractical.

Kubernetes forces your system and software engineers to package applications in
a way that they can be provisioned quickly, and managing compute resources is
one of Kubernetes' core features. Accordingly, you can encourage them, to spin
up non-production environments only when needed and implement auto-shutdowns
where possible. In cases where a non-production environment needs to be running
continuously, it often makes sense to reduce its memory and CPU allocation or
run with fewer instances than usual, scaling up for load-testing and deployment
tests only when needed.

### Rightsizing Your Workloads

Kubernetes requests and limits are a way of giving a pod or container a
guaranteed number of resources and an upper burst limit. These values are often
arbitrarily set and not based on experience or empirical evidence from load
tests. For example, you may encounter pods with a whole CPU assigned in their
requests when they rarely even burst to 10% of that. Rightsizing these workloads
may free up many resources and therefore reduce cost significantly.

The proposed tools allow you to compare the resources effectively used by
workloads to what amount is dedicated to them, and pass this information on to
the development teams.

Prometheus allows you to find resource usage by percentiles, which are a good
indication for sizing your pods and containers. For example, if you have a pod
where the 99th percentile for CPU usage is 18% (it uses less than 18% of a CPU
core 99% of the time), you may want to set requests for that pod at around 180
millicores. The best ratio or percentile to use for that indication depends on
the specific workload. Load tests are recommended to find out the best values
for requests and limits and for validating that applications work well when
these settings have changed.

> #### Careful With Memory Limits
>
> As opposed to CPU, memory is an incompressible resource. This means that
> Kubernetes cannot take away memory from a process other than killing it
> completely, which is not the case when the CPU is congested.
>
> This means, that you should set requests and limits differently for memory
> than for CPU. For example, if your process uses 500 MB memory at the 99th
> percentile, you must set memory requests to a value higher than 500 MB (e.g.,
> 750 MB), to avoid having it killed regularly.

### Encourage Automatic Scaling

If your teams do not already implement automatic scaling for their workloads,
you can encourage them to use the
[Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)
to scale in and out only when needed.

## Summary

While Kubernetes does not have built-in cost management tools, we can use simple
open-source tools and some Kubernetes native features to gain transparency of
what drives cost in our clusters.

The first steps in your journey to increase cost transparency is ensuring usage
data is continuously recorded and workloads are attributable to some
well-defined entity in your cost management structure such as a team, project or
cost center.

Based on this, you will be able to identify the main drivers of cost, create
reports and start optimizing some workloads.

To incentivize teams to reduce their cost on a larger scale, make this
information available easily through dashboards and detailed reports, define a
pricing model to increase comparability and eventually introduce chargebacks.
