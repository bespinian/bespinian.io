---
title: Coaching a SaaS Platform Team on Kubernetes and GitOps
company: M&S Software Engineering
logo: ../../../assets/customers/m-s.svg
pubDate: 2026-08-10
results:
  - Clear architecture decisions for AKS and Azure
  - GitOps established as the deployment standard
  - Full-stack observability with the LGTM stack
  - Engineering teams enabled to operate independently
quote: "TODO: obtain approved customer quote before publishing."
authorName: TODO
authorTitle: TODO
draft: true
---

## Customer

[M&S Software Engineering AG](https://www.m-s.ch/) is a Swiss software company
founded in 1990 and owned by its employees. With around 180 people at its
locations in Bern Wankdorf and Schlieren, M&S builds the leading Swiss software
solutions for social insurance: AKIS for the first pillar and MSPension for
occupational benefits in the second pillar. More than half of all Swiss
compensation offices rely on AKIS, and roughly 250 pension institutions covering
about 600,000 insured persons work with MSPension.

## Initial Situation

Software for social insurance carries responsibilities that few other domains
do. It handles highly sensitive personal data, it has to stay available and
correct over decades, and it is bound by Swiss regulatory requirements. At the
same time, M&S customers increasingly expect their solutions to be delivered as
a service rather than operated on their own premises.

To meet this demand, M&S is moving its products towards a cloud-based operating
model on Microsoft Azure, with Azure Kubernetes Service (AKS) as the runtime
platform and Terraform as the basis for infrastructure automation. The
engineering teams bring deep domain knowledge and a long track record of
building robust software, and they wanted an experienced sparring partner to
help them make the right platform decisions early — rather than discovering them
the expensive way, in production.

## Project Goal

The goal of the collaboration is to give the M&S engineering teams a cloud
platform and a way of working that they can own and evolve themselves.
Concretely this means: a Kubernetes setup on Azure that is well understood
rather than merely functional, infrastructure and deployments described in code,
a deployment process based on GitOps principles, and observability that lets the
teams see what their systems are doing. Just as important, the knowledge behind
these decisions needs to stay at M&S. bespinian's role is explicitly one of
coaching and enablement, not of building a black box someone else has to
maintain.

## bespinian's Role

bespinian supports M&S in the following areas:

### Kubernetes and Azure Architecture

Together with the M&S engineers, we work through the architectural decisions
that shape an AKS-based platform: cluster topology and sizing, separation of
environments and tenants, networking and ingress, workload identity, and how the
Kubernetes setup fits into the surrounding Azure services. Each decision is
discussed with its trade-offs, so the team can revisit and adjust it later with
full context.

### Infrastructure as Code with Terraform

All Azure resources are described declaratively in Terraform. We advise on
module structure, state management, and how to keep environments reproducible
and in parity with each other. The aim is a codebase that a team of this size
can maintain comfortably over years — favoring clarity and a small number of
well-understood patterns over maximum abstraction.

### GitOps and Deployment Workflows

A recurring topic of the collaboration is how software gets from a Git
repository into a running cluster. We work with the M&S teams on adopting GitOps
as the deployment standard: Git as the single source of truth for the desired
state of the platform, automated reconciliation instead of manual interventions,
and a clear separation between application code and deployment configuration.
This gives M&S traceable, reviewable, and reversible changes — a property that
matters a great deal in a regulated domain.

### Observability with the LGTM Stack

For monitoring and observability, M&S uses the open source LGTM stack — Loki for
logs, Grafana for visualization, Tempo for traces, and Mimir with Prometheus for
metrics. bespinian supports the teams in designing this setup: what to
instrument, how to structure metrics and labels, how to keep retention and cost
under control, and how to build dashboards and alerts that people actually act
on. The result is a monitoring landscape that is vendor-neutral and consistent
across all environments.

### DevOps Practices and Ways of Working

Cloud-native technology only pays off when the way of working matches it. In our
workshops we address the organizational side as well: how development and
operations responsibilities are distributed, how on-call and incident handling
work in a Kubernetes world, and how to keep platform work sustainable for a team
that also has a product roadmap to deliver.

### Workshops and Continuous Q&A

The collaboration is deliberately structured as a series of interactive
workshops complemented by regular Q&A sessions. The workshops cover a specific
topic in depth and end with concrete decisions. The Q&A sessions give the M&S
engineers a low-threshold way to bring up whatever they are currently working on
— a review of a Terraform module, a question about a Kubernetes behavior, a
second opinion on a design idea. This format keeps the knowledge transfer
continuous instead of front-loaded, and lets M&S draw on outside expertise
exactly when it is needed.

## Technologies Used

- **Infrastructure**: Microsoft Azure
- **Container Platform**: Azure Kubernetes Service (AKS) / Kubernetes
- **Infrastructure as Code**: Terraform
- **Deployment**: GitOps
- **Monitoring**: Grafana / Mimir / Prometheus
- **Logging**: Loki
- **Tracing**: Tempo
