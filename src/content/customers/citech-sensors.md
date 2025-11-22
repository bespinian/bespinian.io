---
title: Banknote Data Management Platform
company: CI Tech Sensors
logo: ../../assets/customers/citechsensors.svg
date: 2024-01-10
results:
  - Centralized platform for banknote data
  - Immutable storage for full reproducibility
  - Minimal redundancy via validation
  - Team enabled in Kubernetes and DevOps practices
quote:
  "bespinian provides a convincing mix of hands-on engineering, coaching, and
  consulting. This makes them the ideal partner and companion on our journey to
  the world of containers, microservices, and DevOps."
authorName: Lukas Burger
authorTitle: Head of Software Engineering
authorImage: ../../assets/customers/citech-lukas.jpeg
---

## Customer

[CI Tech Sensors](https://www.citechsensors.com/) is a development,
manufacturing and service provider for banknote sensors, which are used in ATMs,
automatic deposit machines as well as cash counting and sorting machines. CI
Tech Sensors is a joint subsidiary of Diebold-Nixdorf and Giesecke+Devirent. The
company has approximately 100 employees working at their location in Burgdorf,
Switzerland.

## Background

Large amounts of banknote data are required when developing banknote sensors and
recognition software. Among this data, images play a central role in configuring
and adapting banknote recognition algorithms and in the subsequent verification
of these algorithms with respect to the required recognition rates. Beyond image
data, other types of metadata are also required. This includes banknote serial
and emission numbers, quality and usage information, as well as technical
parameters regarding the device with which a certain banknote data item was
recorded.

## Project Goal

The goal of this project was to design and establish a central platform for all
banknote data, to transfer all banknote data into the central platform and to
make the data available for all tools and processes within CI Tech Sensors.
Newly recorded banknote data was to be checked for validity before being stored
with minimal redundancy. Each banknote record was to be made uniquely
addressable. Furthermore, all banknote data was to be stored in an immutable way
to guarantee strict reproducibility of all process steps involved in developing
and validating banknote sensors.

## bespinian's Role

bespinian played a key role in the following areas:

### Microservice Architecture

In a series of regular architecture workshops, CI Tech Sensors and bespinian
designed a microservice architecture for managing all banknote data. Using a
step-by-step approach for introducing clearly scoped microservices, the central
banknote management platform was introduced with minimal impact on the daily
business of CI Tech Sensors. In doing so, bespinian took on conceptual
responsibilities in developing the architecture as well as a hands-on role in
its implementation.

### Kubernetes Infrastructure

All of CI Tech Sensors’ microservices for banknote data management are deployed
on a Kubernetes-based infrastructure. bespinian was in the lead for the
configuration of all Kubernetes environments and for configuring the automated
deployment of each service. Using a mixture of training, code-review and
pair-engineering, bespinian enabled the CI Tech Sensors team to build up the
necessary Kubernetes know-how and continue the operation and extension of the
platform.

### Monitoring and Alerting

The microservices for management of banknote data inherently play a critical
role in CI Tech Sensors’ core business. Accordingly, these services needed to be
closely monitored from an operational point of view. Furthermore, business
metrics like, for example, the quantity of invalid banknote data also play a
central role. Together with the CI Tech Sensors team, bespinian developed a
monitoring and alerting architecture based on Prometheus and Grafana and took
the lead in implementing the monitoring and alerting infrastructure and
dashboards. While doing so, bespinian enabled the CI Tech Sensors team in the
relevant technologies in order to ensure that monitoring and alerting could
evolve together with the platform.

### Transitioning to DevOps

With the introduction of Kubernetes-based infrastructure and a highly-available
microservice architecture, the CI Tech Sensors team undertook a natural step
towards a DevOps-way of working. bespinian guided CI Tech Sensors through this
transition by coaching, and supporting the teams involved, as well as by
establishing the necessary tooling and processes.

## Technologies Used

- **Backend**: Python / Flask
- **DB**: PostgreSQL
- **Cache**: Redis
- **DB**: MongoDB
- **Container Platform**: Kubernetes
- **Prometheus**: Prometheus / Grafana / Alertmanager
- **Logs**: Elasticsearch / Kibana

## Customer Testimonial

> "bespinian provides a convincing mix of hands-on engineering, coaching, and
> consulting. This makes them the ideal partner and companion on our journey to
> the world of containers, microservices, and DevOps."
>
> **Lukas Burger**, Head of Software Engineering
