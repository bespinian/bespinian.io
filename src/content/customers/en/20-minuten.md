---
title: Modernizing 20 Minuten Application
company: 20 Minuten
logo: ../../../assets/customers/20-minuten.svg
pubDate: 2022-03-11
results:
  - Migrated 1M+ daily users without downtime
  - Modernized 20-year-old legacy infrastructure
  - Cost-optimized via intelligent caching
  - Migrated from Perl to Go and Next.js stack
quote:
  "The collaboration with bespinian has always been very good. Thanks to their
  expertise, bespinian made a significant contribution to the successful
  migration of the digital products from 20 Minuten to a new and modern
  infrastructure."
authorName: Manuel Sutter
authorTitle: Product Owner
authorImage: ../../../assets/customers/20minuten-manuel.jpeg
---

## Customer

[20 Minuten](https://www.20min.ch/) is the media brand with the widest reach in
Switzerland. Like the media house Tamedia and the advertising marketer Goldbach,
it belongs to the TX Group. 20 Minuten is characterized by its reach in all
language regions and the story mix of news, entertainment, and inspiration. The
20 Minuten team was and is an important partner for bespinian in the cooperation
regarding the migration of digital products to a new infrastructure, and other
projects in the context of OAuth2, cloudification, containerization and
modernization of software.

## Background

20 Minuten is Switzerland's largest commuter newspaper and one of the most
visited websites in Switzerland. It is a media portal with daily news,
entertainment and inspirational articles. In 2019, 20 Minuten had planned a
major migration of its applications away from the legacy infrastructure and
application code, some of which was almost 20 years old. This involved migrating
existing VMs to a modern Kubernetes-based container infrastructure on AWS. The
backend was to be migrated from Perl to Go and containerized. The frontend was
also rendered by Perl and was to be converted into a modern Next.js application.
20 Minuten has over one million users every day. This makes a migration without
downtime particularly challenging. In addition, it was important to keep the
operating costs within manageable limits despite this large load.

## Project Goal

The goal of the project was to modernize the setup of the application. The
legacy components and the previous code were to be replaced in order to make the
system more stable and cost-efficient. AWS was chosen as the infrastructure
provider and the application was to be redeployed in Go, Node.js and React
microservices on an EKS (Kubernetes) cluster.

## bespinian's Role

bespinian had a key role in the following topics regarding application migration
in terms of refactoring / re-architecting from the 6 migration strategies of
AWS.

### Infrastructure on AWS

bespinian has been instrumental in provisioning the infrastructure on AWS. We
played a key role in writing and applying the appropriate Terraform modules and
setting up the Kubernetes clusters on which the various microservices are
hosted. An important part of this was also the correct configuration of the
caching layer (Amazon CloudFront) to keep the costs manageable given the large
number of concurrent users of 20 Minuten. bespinian did a lot of the technical
implementation and automation, but also the communication between the
development and infrastructure teams.

### Kubernetes and container configuration

An exciting task was the configuration of the Kubernetes cluster (on Amazon
EKS). The architecture as well as the implementation of it still bears
bespinian's signature. The main focus of this task was making the necessary
architectural decisions and implementing the provisioning and configuration of
the cluster via Terraform. Subsequently, another key focus of the task was on
automating the deployments of the individual services via Helm and GitHub
Actions. bespinian played a key role in all of these areas. We also played a
major role in coordinating the individual teams and applications in the sense of
a DevOps migration.

### Application Development

The various microservices of the backend and the frontend were co-designed by
bespinian, both architecturally and in terms of software development. As
experienced Go developers, we were able to contribute to the design of the
application code itself, but also to its automation, deployment, and
communication between the services.

### Monitoring and Alerting

Monitoring the applications in terms of a DevOps transformation was very
important, especially in the initial phase after the migration. A large number
of users were migrated to the new applications and sometimes produced access
patterns which were difficult to predict. These access patterns first needed to
be analyzed and understood in order to provision the appropriate resources and
produce the appropriate fixes for performance issues and bugs. Prometheus and
Grafana played a major role in this process to get an overview of what is
happening and where which requests are being made.

### Caching

An important part of bespinian's contribution was the configuration of the
CloudFront caching layer. Due to the high number of requests, most of which are
read-only, we were able to save very large monthly contributions by clever use
of the cache. This allowed the containers to be used in relatively small numbers
of replicas. The optimal configuration of the cache with so many different
access patterns and clients (20 minute website, different mobile applications
and CMS) was a big challenge. bespinian was responsible for tackling this
challenge and providing a solution to the 20 Minuten team.

## Technologies Used

- **Infrastructure**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Container Platform**: Kubernetes
- **Monitoring**: Prometheus / Grafana
- **Deployment**: Helm
- **Backend**: Go
- **Frontend**: React (Next.js)
- **DB**: MongoDB
- **DB**: PostgreSQL
- **CI/CD**: GitHub Actions
