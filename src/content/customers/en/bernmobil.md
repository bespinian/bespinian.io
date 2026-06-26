---
title: Migration to OpenShift
company: BERNMOBIL
logo: ../../../assets/customers/bernmobil.svg
pubDate: 2024-02-12
results:
  - Transitioned operations from click-ops to GitOps
  - Designed Helm charts for the Shared Info Platform
  - Conducted knowledge transfer to the BERNMOBIL team
  - Established reproducible, scalable deployments
quote:
  "For the Shared Info Platform, bespinian developed a clean Helm chart
  structure that enables consistent configuration across different environments."
authorName: Arne Heimann
authorTitle: Head of IT Services Passenger Information
authorImage: ../../../assets/customers/bernmobil-arne.jpeg
---

## Customer

[BERNMOBIL](https://www.bernmobil.ch/) has been connecting people in and around
the city of Bern with its red trams and buses since 1871. With the "Shared Info
Platform", BERNMOBIL also operates a platform for exchanging real-time and event
information in public transport. Numerous transport companies throughout
Switzerland count among its customers.

## Background

BERNMOBIL operates an OpenShift cluster in its own data center and hosts a
variety of applications on it for internal and external use. Previously,
configuration changes were made manually via the OpenShift UI — an approach that
does not scale as complexity grows.

## Project Goal

The goal was to scale operations: moving away from click-ops toward an
automated, reproducible deployment process using Argo CD.

## bespinian's Role

### Supporting the Migration of the öV Plus Website

bespinian guided the BERNMOBIL team through the migration of the öV Plus website
onto the OpenShift platform. The focus was on knowledge transfer — through
active involvement in the project, the team learned best practices for
containerized deployments on OpenShift directly in practice.

### Designing the GitOps Departures Service

For the Shared Info Platform, bespinian developed a clean Helm chart structure
that enables consistent configuration across different environments. In
addition, bespinian introduced Argo CD as a GitOps tool, so that deployments are
now managed declaratively in Git and automatically synchronized to the cluster.

## Technologies Used

- **Container Platform**: OpenShift
- **Package Management**: Helm
- **GitOps**: Argo CD
