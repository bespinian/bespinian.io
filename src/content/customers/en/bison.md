---
title: Concept for a Multi-Tenant Kubernetes Platform
company: BISON Group
logo: ../../../assets/customers/bison.png
pubDate: 2026-08-31
results:
  - |
    Developed a holistic concept for a scalable multi-tenant Kubernetes
    platform on GKE
  - |
    Defined a binding technical target architecture including automation and operating processes
  - |
    Established the organizational framework for future platform operations
quote: "TODO"
authorName: TODO
authorTitle: Technical Project Lead Infrastructure
authorImage: ../../../assets/customers/bison.png
---

## Customer

[BISON Group](https://www.bison-group.com/) is a leading Swiss provider of ERP,
retail, and cloud solutions for companies in trade, manufacturing, and
agriculture. Headquartered in Sursee (Switzerland), Bison belongs to the fenaco
cooperative and operates business-critical software for numerous customers –
increasingly as cloud services.

## Background

Over time, Bison had accumulated several single-tenant Kubernetes clusters
across GCP, Azure, and on-premises, often with low utilization. This
fragmentation increased complexity and operational overhead, while automation
and self-service were lacking. Standardized observability and cost transparency
were insufficient, even as demand grew strongly for putting further
Kubernetes-based services into production in the cloud. Bison therefore decided
to develop a comprehensive concept for a modern multi-tenant Kubernetes
platform.

## Project Goal

The goal of the project was to develop a holistic, strategic concept for
building a scalable and future-proof Kubernetes multi-tenant platform based on
GKE. The concept defines the technical target architecture, the automation and
operating processes, as well as the organizational framework for future platform
operations. It serves as the binding foundation for the subsequent
implementation phase, whose first milestone will be platform access for the
webshop of a Swiss agricultural cooperative.

## bespinian's Role

bespinian worked closely with long-standing partner
[Peak Scale](https://peakscale.ch/) and, as the project team, implemented the
concept with the following focus areas:

### Strategic Target Architecture and Multi-Tenancy

The project team jointly developed the target architecture for the multi-tenant
platform. This included defining the infrastructure and workload clusters. The
architecture model described in the concept provides for a central Argo CD
instance. This instance manages all Argo CD instances on the workload clusters
from the infrastructure cluster. Tenant separation on the workload clusters is
implemented with Capsule. Tenant applications are deployed with Crossplane and
Argo CD. Crossplane also forms the basis for future self-service offerings on
the multi-tenant platform.

### Automation and GitOps

As part of the conceptual work, the project team defined the GitOps operating
model for the future platform. A central component is the cascaded use of Argo
CD: a higher-level Argo CD instance on the infrastructure cluster controls the
configuration of Argo CD instances on the workload clusters. These, in turn,
manage the tenants and their applications. This multi-stage approach enables a
clean separation between the platform and application layers and ensures that
changes can be rolled out in a controlled, traceable, and fully automated
manner.

### Observability and Connectivity

The project team defined a consistent approach to monitoring, logging, and
tracing in the concept. Based on Grafana Cloud, an observability design was
developed that enables clear structuring by teams and tenants. The project team
also developed a connectivity architecture that uses Cilium as the CNI and
Gateway API implementation and integrates seamlessly into the existing network
design based on F5 XC Cloud. This architecture enables a clear separation of
responsibilities between the platform team and the developer teams.

### Identity, Security, and Secrets

Another focus of the conceptual work was authentication, authorization, and
secrets management. The project team designed a role-based access model based on
Entra ID, described in the concept and designed to be automatable via Terraform
and GitOps. The concept also proposes using OpenBao as the central secret store
and integrating it into the platform via the External Secrets Operator.

### Ordering Process and FinOps

The project team described in the concept how ServiceNow can be used as the
starting point for provisioning processes and combined with Crossplane. The team
also defined the future integration of billing and FinOps mechanisms based on
IBM Cloudability to ensure transparent resource usage and cost allocation.

### Operations and Organization

In addition to the technical aspects, the project team focused on establishing
the platform organizationally. The project team developed an operating and
organizational model that outlines various approaches to operations and further
development. The concept describes an agile approach in product increments with
clear responsibilities and decision-making paths. This lays the organizational
foundation for the sustainable implementation and further development of the
future platform and its services.

## Technologies Used

- Google Kubernetes Engine
- Capsule
- Crossplane
- Argo CD
- Terraform
- Grafana Cloud
- Cilium
- Entra ID
- OpenBao
- External Secrets Operator
- Artifactory
