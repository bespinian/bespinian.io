---
title: Secure Service Mesh for Swisscom Health
company: Swisscom
logo: ../../../assets/customers/swisscom.svg
pubDate: 2021-05-26
results:
  - End-to-end encryption across all microservices
  - Zero-trust architecture with Istio service mesh
  - Enhanced security through audit & hardening
  - Team achieved DevOps readiness for production
quote:
  "With bespinian, we quickly reached a modern infrastructure and pipeline based
  on best practices. This enabled us to focus our internal resources on the
  further development of our application and on the needs of our customers."
authorName: Federico Marmori
authorTitle: Head of Product Development
---

## Customer

[Swisscom Health](https://www.swisscom.ch/en/business/enterprise/offer/health.html)
offers a wide range of e-health ICT products and services. These include
information systems for medical practices, billing systems, PACS image archiving
systems and connector suites for the exchange of medical data.

## Background

Swisscom Health's application landscape is designed as a microservice
architecture. Due to the high sensitivity of the patient data processed, the
solution was subject to strict security requirements and regular compliance
certifications. Prominent requirements included end-to-end encryption of all
data, including data traffic between the individual microservices, as well as
strict separation of clients and strong mutual authentication between all
microservices. Data traffic entering or leaving the application also had to be
secured, which posed additional challenges for the platform.

## Project Goal

The main objective of the project was to introduce a technological solution that
would enable Swisscom Health to manage end-to-end encryption, strong service
identity, client separation and traffic routing efficiently and at scale. In
addition, the security setup of the various applications had to be reviewed,
results prioritized and remediated according to severity and urgency. Not all
workloads could be executed in containers on Kubernetes. Therefore, a separate
automation and monitoring stack also had to be implemented for these types of
workloads. Last but not least, the Swisscom Health team had to be empowered to
operate the newly implemented infrastructure while adopting a DevOps culture.

## bespinian's Role

bespinian played a critical role in achieving the project goals through
extensive contributions focused on providing a robust service mesh, implementing
a zero-trust architecture, security audits and hardening, and training and best
practices for Kubernetes and Istio.

### Deployment of the Service Mesh

We automated the configuration and deployment of the Istio service mesh using
Helm. This included customizing the configuration of Istio to the needs of
Swisscom Health as well as managing this configuration declaratively across
multiple environments. Special attention was given to services that are hosted
outside of Kubernetes and therefore needed to be integrated into the service
mesh in a dedicated way, either by placing an Istio proxy on the respective VM
or by integrating via Egress and Ingress-Mutual TLS connections. Another
important aspect was the release management of Istio and ensuring that the
service mesh control plane and sidecars could be updated without interrupting
the overall application.

### Zero-Trust Architecture

We were responsible for the implementation of a zero-trust architecture based on
the Istio service mesh. This included the introduction of mutual TLS between all
services in the mesh and thus the realization of end-to-end encryption and a
strong service identity. Based on the strong service identity, fine-grained
traffic policies were then designed and implemented to ensure that unrelated
services from different tenants could not communicate with each other. In
addition, such traffic policies ensure that lateral movements of a potential
attacker are made impossible, limiting the damage path to the affected service
and tenant in the event of a security incident. Another important part of the
Zero Trust setup was centralized secret management using HashiCorp Vault. This
ensures that sensitive data such as database passwords and API keys do not end
up in the control plane of Kubernetes, but are only handled in the memory of the
microservices that needed them.

### Security Audit and Hardening

Another task was to conduct an in-depth security audit to address potential
risks such as cluster setup vulnerabilities, namespace and client separation
gaps, and container image vulnerabilities. Each vulnerability discovered was
assessed for overall risk, converted into a hardening measure and prioritized in
the client's planning. The resulting hardening measures significantly improved
the overall security of Swisscom Health's workload architecture.

### Kubernetes Training and Best Practices

bespinian enabled Swisscom Health to deploy and operate a microservice
architecture in Kubernetes and Istio Service Mesh. This enabled the team to
achieve DevOps readiness and gain the confidence to run the migrated
applications in production.

### Infrastructure Provisioning as Code

An additional responsibility of ours was to enable the automated provisioning of
VM-based services and network components as code in Azure. This meant automating
the creation of the VMs and resources themselves and implementing automated and
declarative configuration management using Ansible and Ansible Tower. This
allowed Swisscom Health to move away from manually created configurations and
achieve fully reproducible provisioning of their VM-based workloads and network
components.

### Health Monitoring

In parallel to the automated provisioning of VM-based services, we automated the
setup of health monitoring for these VMs and services. This ensured continuous
visibility of the health and performance of the system as well as timely
notification to the team in case of outages or irregularities in metrics or
logs. This in turn enabled Swisscom Health to run the VM-based services with the
same efficiency and stability as the Kubernetes-based ones.

## Technologies Used

- **Infrastructure**: Azure
- **Infrastructure as Code**: Terraform
- **Container Platform**: Kubernetes (PKS)
- **Continuous Deployment**: Argo CD with Helm and Kustomize
- **Service Mesh**: Istio / Kiali
- **Monitoring**: Prometheus / Grafana
- **Infrastructure Configuration**: Ansible / Ansible Tower
