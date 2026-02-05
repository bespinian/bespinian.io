# OpenBao: When to Choose the Open Source Vault Alternative

In 2023, HashiCorp changed Vault's license from Mozilla Public License (MPL) to Business Source License (BSL) 1.1. Shortly after, the community forked Vault's last MPL version, creating OpenBao — Open Source project under Apache 2.0 licensing. Let's explore the actual differences and features.

## What is OpenBao?

OpenBao is a relatively new open source secrets management platform forked from HashiCorp Vault (version 1.14.0) before the license change. It maintains API compatibility with Vault while operating under Apache 2.0 licensing and Linux Foundation governance.

Core features include:

* Secure storage for secrets (API keys, passwords, certificates)
* Dynamic credential generation for databases and cloud platforms
* Encryption as a service
* Leasing and renewal
* Revocation
* Policy-based access control
* Audit logging

## The License Difference 

**OpenBao ([Apache 2.0](https://github.com/openbao/openbao/blob/main/LICENSE))** allows unrestricted use, modification, and redistribution for any purpose, including commercial applications and competing services.

**Vault ([BSL 1.1](https://www.hashicorp.com/en/bsl))** permits use and modification but prohibits offering the software as a service that competes with HashiCorp's commercial offerings. Each version converts to MPL 2.0 four years after release.

**Practical impact:** Internal Vault usage is unaffected by the new license model. However, organizations building SaaS platforms or offering secrets management to customers may face restrictions or approval challenges with BSL.

## Governance Models

**OpenBao** is developed and operated under the Linux Foundation and [OpenSSF](https://openssf.org/blog/2025/06/17/openbao-joins-the-openssf-to-advance-secure-secrets-management-in-open-source/) as a community-driven open source project with transparent decision-making. Any organization or individual can contribute equally.

**Vault** remains under HashiCorp's corporate governance. While community contributions are accepted, roadmap and strategic decisions are made by HashiCorp based on enterprise customer needs and business objectives. Some features are limited to the paid version only.

## Feature Comparison

While OpenBao and Vault share the same core feature set from the original fork, there are still some key differences to list.

### OpenBao Advantages

OpenBao includes features that were previously exclusive to Vault Enterprise:

* **[Namespaces](https://openbao.org/blog/namespaces-announcement/)** - Multi-tenancy and workload isolation, is now available in the open source version

### Vault Enterprise Exclusive Features

The following features remain available only in Vault Enterprise:

* **Disaster Recovery Replication** - Automated failover and cross-datacenter DR capabilities
* **Performance Replication** - Read replicas for geographic distribution and improved scalability
* **Performance Standby Nodes** - Enhanced cluster scalability and throughput
* **Automated Snapshots** - Built-in backup automation (can be scripted with CLI in OpenBao, but not available out-of-the-box)
* **[Sentinel Policies](https://developer.hashicorp.com/sentinel/docs/vault)** - Advanced policy-as-code framework for complex authorization scenarios and compliance requirements

**Note:** OpenBao's roadmap is community-driven, and additional enterprise-equivalent features may be implemented based on community priorities and contributions. There is already some work on missing features implementation

## Making the Decision

Both platforms offer robust secrets management capabilities. Your choice should be evaluated based on the following factors:

* licensing requirements
* governance preferences
* feature needs
* support needs

## Summary

Whichever path you choose, both platforms provide production-ready secrets management. The key is selecting the solution that aligns with your technical requirements, organizational values, and long-term strategy.

If you need guidance for your secrets management journey, get in touch with our team to learn more.