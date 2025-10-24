---
title: Migrating SwissID to Kubernetes
company: SwissSign
logo: ../../assets/customers/swisssign.svg
date: 2021-09-21
results:
  - Assessed production readiness of all deployments
  - Built Prometheus alerting to ops paging system
  - Trained ops team on Prometheus and Grafana
  - Enabled migration to independent Kubernetes
quote:
  "bespinian joined us during the last phase of the migration and was quickly
  able to advise and support us in closing the remaining gaps in our monitoring
  and alarming landscape."
authorName: Placi Flury
authorTitle: Head of DevOps
authorImage: ../../assets/customers/swisssign-placi.jpeg
---

## Customer

[SwissSign Group](https://www.swisssign-group.com/) is the premier Swiss Trust
Service Provider, whose offerings include certificates (SSL and email) and
managed Public Key Infrastructure products, as well as identity services under
the brand SwissID.

The company is headquartered in Glattbrugg, Zürich, and employs around 100
specialists.

## Background

SwissSign Group's SwissID solution provides a unified and trusted login for the
public sector and for private companies in Switzerland. The solution is used by
government departments and agencies, as well as insurances, health providers and
other entities, including Swiss Post and the Swiss Federal Railways. Private
customers, so-called identity owners, may also use SwissID to create legally
valid digital signatures or access their electronic patient records securely.

## Project Goal

SwissSign Group was in the process of migrating the entire SwissID application
landscape from an infrastructure integrated in one of their partners into an
independent data center. During this process, they also migrated most of their
applications to Kubernetes, with the goal of enabling more state-of-the-art
deployment workflows as well as being able to react more flexibly to varying
system load. At the same time, the high security standards had to be preserved
during the migration.

## bespinian's Role

During the migration, SwissSign identified three areas where they required
bespinian’s support

### Productive Maturity on Kubernetes

bespinian was tasked with reviewing the application deployments on Kubernetes
for production readiness. The purpose was to establish whether components were
able to react properly to changes in load and to support rolling deployments
would be able to fail over correctly would follow best practices specific to the
usage of containers and Kubernetes still exhibited gaps in the monitoring setup
In order to achieve this goal, bespinian first ran a number of automated checks
on the entire application landscape. Additionally, bespinian manually reviewed
specific components with respect to the setup of the containers and
applications, their CI pipelines, as well as to their deployment and operations
on Kubernetes.

### Monitoring

SwissSign Group wished to improve the monitoring of the SwissID components
running on Kubernetes before going live on the new infrastructure and requested
bespinian to investigate gaps and implement solutions. After reviewing the
existing components that were in place for monitoring and alerting, bespinian
worked independently with different stakeholders within the company to propose
and implement an alerting pipeline which sends alerts from Prometheus to the
operations team's paging and alerting tools. bespinian also recommended and
implemented a solution to scrape components not included in the existing
Prometheus setup and created initial dashboards and alerts together with the
SwissID operations team.

### Training

bespinian was tasked with ensuring that the SwissID operations team could
successfully manage the deployments on the new infrastructure after going live.
In order to achieve this, bespinian collaborated with the operations team,
introducing its members to Prometheus and Grafana, including Prometheus metric
types, the query language, alerting rules, and general best practices. bespinian
ensured that any changes to the system as well as all newly introduced processes
were documented.

## Technologies Used

- **Container Platform**: Kubernetes / Rancher
- **Git Hosting**: Prometheus / Grafana
- **CI/CD**: GitLab CI
