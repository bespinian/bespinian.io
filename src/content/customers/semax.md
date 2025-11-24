---
title: Deploying Zabbix Monitoring on OpenShift
company: Semax
logo: ../../assets/customers/semax.svg
date: 2025-11-21
results:
  - Deployed Zabbix on existing OpenShift cluster
  - Configured monitoring for Kubernetes workloads and external databases
  - Optimized operational costs by reusing existing Prometheus infrastructure
  - Enabled operations team for independent Zabbix management
quote: ""
authorName: ""
authorTitle: ""
authorImage: ""
---

## Customer

[Semax AG](https://semax.ch/) was founded in 2011 and is based in Cham,
Switzerland. The company operates as a specialized system integrator for
intelligent metering systems in the Swiss energy sector. As a system integrator,
Semax provides comprehensive services spanning the entire smart metering
ecosystem, from meter parameterization and communication infrastructure to
head-end system integration and digitalization of metering processes. The
company offers Software-as-a-Service or on-site installations, emphasizing
compliance with Swiss legal requirements and data security standards.

## Background

Semax operates an OpenShift cluster managed by VSHN, which included Prometheus for metrics collection as part of the standard cloud-native monitoring stack. While this setup worked well for cloud-native workloads, the company needed to deploy Zabbix as an additional monitoring solution for specific requirements: monitoring external databases and providing a traditional monitoring interface familiar to their operations team.

The company faced several key challenges:

**Limited In-House Expertise**: Semax lacked the internal knowledge to effectively implement Zabbix in a cloud-native environment and integrate it with their existing OpenShift infrastructure.

**Infrastructure Efficiency**: A standard Zabbix deployment using the Kubernetes API integration would create a parallel monitoring system, collecting the same metrics twice and significantly increasing operational complexity and resource consumption.

**Sustainable Operations**: The solution needed to be maintainable by Semax's operations team without requiring deep Zabbix expertise for day-to-day management.

## Project Goal

The goal of the project was to deploy Zabbix monitoring on Semax's existing
OpenShift cluster while integrating it intelligently with the already
established Prometheus-based monitoring infrastructure. Specific objectives
included configuring Zabbix server on the OpenShift cluster, enabling the team
to monitor their OpenShift workloads and external databases, and ensuring the
operations team could independently manage and operate the Zabbix deployment. A
key requirement was to avoid unnecessary infrastructure duplication and keep
operational costs optimized by reusing existing monitoring components where
possible.

## bespinian's Role

bespinian played a key role in the following areas:

### Planning and Architecture

We began by thoroughly assessing Semax's existing infrastructure and
understanding the business drivers behind the Zabbix initiative. This broader
perspective allowed us to align with the customer's actual needs rather than
simply installing another piece of software. We evaluated the already installed
tools and determined that OpenShift's built-in Helm release management
capabilities would work well for this use case, providing a simple solution with
room for future improvements such as migration to a full GitOps setup.

### Intelligent Infrastructure Reuse

Rather than using Zabbix's Kubernetes API integration—which would have created a second, parallel metrics collection system—we configured Zabbix to leverage the existing Prometheus infrastructure. We set up Zabbix to query Prometheus directly using PromQL, allowing us to select only the specific metrics needed in Zabbix. This architectural decision balanced monitoring capability with infrastructure simplicity, avoiding unnecessary resource consumption and configuration drift.

### Zabbix Deployment and Configuration

We deployed Zabbix server on the OpenShift cluster using Helm, integrating it
with OpenShift's native platform features. We configured monitoring items
specifically for Semax's Kubernetes workloads and external databases, ensuring
that the monitoring setup addressed their actual operational requirements. The
configuration was designed to be maintainable by the customer's team while
following monitoring best practices.

### Knowledge Transfer Workshop

To address the more complex configuration required when collecting metrics via
HTTP rather than through dedicated agents, we conducted a comprehensive two-day
workshop with the Semax operations team. The workshop covered practical Zabbix
usage, including how to create and customize widgets, configure discovery rules
for automated monitoring of dynamic infrastructure, and apply basic monitoring
practices. This hands-on training ensured the team could effectively use Zabbix
and extend the monitoring configuration as their needs evolved.

## Technologies Used

- **Infrastructure**: Red Hat OpenShift
- **Deployment**: Helm / OpenShift Platform
- **Monitoring**: Zabbix / Prometheus / Node Exporter
