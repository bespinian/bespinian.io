---
title: Building a Secure AWS Platform
company: PostFinance
logo: ../../../assets/customers/postfinance.svg
pubDate: 2025-08-07
results:
  - Built secure, FINMA-compliant AWS platform
  - Automated infrastructure provisioning with Terraform
  - Implemented least privilege IAM security
  - Enabled teams on AWS-native architecture
quote:
  "Thanks to bespinian's solid expertise and our close collaboration, we were
  able to quickly build a secure and scalable AWS foundation. At the same time,
  our team was sustainably enabled to use AWS services independently and
  efficiently."
authorName: Roger Bigler
authorTitle: Lead Deployment, Platform & Security
authorImage: ../../../assets/customers/postfinance-roger.jpeg
---

## Customer

[PostFinance](https://www.postfinance.ch/) is a leading bank in Switzerland with
high standards for security, stability, and regulatory compliance according to
FINMA requirements. As an integral part of the Swiss financial landscape,
PostFinance offers a wide range of financial services for both private and
business customers. In order to meet increasing demands and to further drive
digitization, PostFinance decided to extend its existing, locally operated IT
infrastructure with a modern AWS-based cloud platform.

## Background

As a bank, PostFinance faces the challenge of providing a secure and highly
available IT infrastructure that complies with the strict regulatory
requirements of FINMA. Although the existing on-premise infrastructure, built
with cloud-native technologies, meets these requirements, it reaches its limits
in terms of scalability and flexibility for SaaS services. The introduction of
an AWS cloud platform is intended not only to enable more dynamic resource
usage, but also to provide access to new services within the cloud ecosystem.

Another important aspect of the project is supporting the application and
business teams in migrating to the new platform. This includes the integration
of existing solutions such as identity and access management systems, as well as
adherence to strict security policies, such as the principle of least privilege.
The goal was to build the platform in a way that it meets all regulatory and
operational banking requirements while creating a future-ready foundation for
the digital transformation of PostFinance.

## Project Goal

The goal of the project is to build a scalable, secure, and compliant AWS cloud
platform that meets the following requirements:

- Full automation of infrastructure provisioning using Infrastructure as Code
- Clear cost control and cost transparency for individual PostFinance business
  areas and applications
- Comprehensive monitoring, auditing, and tracing at the platform and
  application level via Amazon CloudWatch, as well as integration with existing
  monitoring solutions
- Support for application and business teams in migrating to the new platform
- Ensuring IAM compliance by adhering to the principle of least privilege

## bespinian's Role

bespinian plays a key role in the following areas:

### Infrastructure Automation

We implemented Terraform modules with PostFinance engineers to automate
infrastructure provisioning. This ensures consistent, reproducible, error-free
deployments.

### Identity and Access Management (IAM)

We implemented an IAM concept applying the principle of least privilege,
integrating existing systems and ensuring strict access control that meets
FINMA's security requirements.

### Monitoring and Auditing

We implemented comprehensive monitoring with Amazon CloudWatch for both platform
and applications. Existing PostFinance monitoring solutions were integrated for
a unified system overview.

### Governance and Security

We established robust security and governance structures, implementing Service
Control Policies (SCPs) for organization-wide AWS resource guidelines. We
deployed AWS security services required for FINMA compliance and set up
centralized Key Management Service (KMS) for secure encryption key management.

### AWS-Specific Coaching and Team Support

We coached PostFinance's application and business teams on AWS-native
architecture, security policies, and platform usage throughout their cloud
journey.

## Technologies Used

- **Infrastructure**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Container Platform**: Kubernetes
