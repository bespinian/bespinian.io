---
title: Automated Kubernetes Infrastructure on Azure
company: Zeilenwerk
logo: ../../../assets/customers/zeilenwerk.svg
pubDate: 2025-11-18
results:
  - Simplified infrastructure from costly, complex setup
  - Automated provisioning with OpenTofu and Helm
  - Reduced operational overhead and costs
  - Enabled hands-off deployment across applications
quote:
  "bespinian helped us shape and realize a vision for a modern, standardized and
  declarative infrastructure setup with a strong focus on Kubernetes and Open
  Source software"
authorName: Cyril Nusko
authorTitle: Software Architect
authorImage: ../../../assets/customers/zeilenwerk-cyril.jpg
---

## Customer

[Zeilenwerk](https://www.zeilenwerk.ch/) develops custom software and advises
organizations from the private and public sector on the sustainable and human
centered digitalization of their processes.

## Background

Zeilenwerk's existing infrastructure setup was scattered across multiple service
providers and technologies. As more and bigger applications were realized, it
became tedious and costly to maintain this infrastructure. The manual processes
and complex configurations required significant time and resources, taking focus
away from their core business of software development. It became increasingly
clear that the current approach was not sustainable in the long term.

## Project Goal

The main objective was to modernize and standardize Zeilenwerk's infrastructure
to reduce costs and operational complexity. One goal was to establish a
declarative, automated setup using open-source software that would enable the
team to deploy and manage multiple applications efficiently. Another was the
standardization of tooling with a clear focus on the Kubernetes ecosystem to
reduce complexity and increase the independence from service providers.
Together, this would allow Zeilenwerk to focus their resources on delivering
value to their customers.

## bespinian's Role

bespinian played a key role in transforming Zeilenwerk's infrastructure through
the following contributions:

### Infrastructure Automation with OpenTofu

We automated the provisioning of the Azure Kubernetes Service (AKS)
infrastructure using OpenTofu (an open-source Terraform fork). This included
defining all cloud resources as code, enabling reproducible and consistent
deployments across environments. The infrastructure as code approach eliminated
manual configuration errors and significantly reduced the time required to
provision new environments.

### Application Deployment with Helm

We implemented Helm-based deployment workflows for Zeilenwerk's applications,
creating reusable charts and establishing best practices for application
lifecycle management. This provided a standardized, declarative approach to
deploying applications on Kubernetes, making it easy to manage configurations
across different environments and applications.

### Architecture Simplification

We worked closely with Zeilenwerk to simplify their overall architecture,
identifying opportunities to reduce complexity while maintaining functionality.
This included consolidating redundant components and establishing clear
separation of concerns between infrastructure and application layers.

### Knowledge Transfer and Best Practices

Throughout the project, we ensured that Zeilenwerk's team gained the knowledge
and confidence to operate the new infrastructure independently. This included
training on Kubernetes, OpenTofu, and Helm best practices, as well as
establishing documentation and operational guidelines for ongoing maintenance.

## Technologies Used

- **Infrastructure**: Azure
- **Infrastructure as Code**: OpenTofu
- **Container Platform**: Kubernetes (AKS)
- **Deployment**: Helm
- **Monitoring**: Grafana
