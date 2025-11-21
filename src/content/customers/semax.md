---
title: Cloudifying Airport Software AERO
company: Xovis
logo: ../../assets/customers/xovis.svg
date: 2024-01-10
results:
  - Zabbix integration with already existing monitoring stack
  - Deployment using OpenShit native features
  - Introduction to Zabbix monitoring in a form of a workshop
quote: ""
authorName: ""
authorTitle: ""
authorImage: ../../assets/customers/xovis-joerg.jpeg
---

## Customer

[Semax AG](https://semax.ch/) was founded in 2011 and is based in Cham, Switzerland. The company operates as a specialized system integrator for intelligent metering systems in the Swiss energy sector.

As a system integrator, Semax provides comprehensive services spanning the entire smart metering ecosystem—from meter parameterization and communication infrastructure to head-end system integration and digitalization of metering processes. The company offers Software-as-a-Service or on-site installations, emphasizing compliance with Swiss legal requirements and data security standards.

## Background

Semax approached our team seeking expertise in deploying Zabbix on their existing OpenShift cluster managed by VSHN. While Zabbix offers deployment options that align well with cloud-native architectures, the customer lacked the in-house expertise to implement such a solution effectively within their managed OpenShift environment.

With that, our team faced 2 challanges: finding a reliable and cost-effective deployment approach, and establishing a maintenance model that their operations team could sustain in the  long-term. 

Our experts had to understand both Zabbix's capabilities and OpenShift's operational patterns to deliver additional monitoring tool without creating unnecessary complexity or ongoing dependencies.

## Dual Monitoring stack

Cloud native environment has its heros. It is hard to argue about Grafana role in popularizing Kubernetes by providing simple and relible monitoring solution - Prometheus. Today, many use it and consider an industry standard.

Zabbix plays role of a newcomer in Cloud native town. With its well established position in classic datacenters, Zabbix mantainers decided to expand into Kubernetes space as well. in February 2022, Version 6.0 brought Kubernetes support, which has been significantly improved few years later in version 7.0. 

It comes as no surprise that Semax's OpenShift cluster was already equipped with Prometheus for metrics collection,. Deploying Zabbix in its default configuration would require Zabbix Agent 2 as an additional metrics collector, effectively creating two parallel monitoring stacks performing identical tasks across the same infrastructure.

Fully duplicated monitoring stack posed significant operational challenges: increase complexity, resource consumption, and the potential for configuration drift to name a few.

### When Perfect Isn't the Goal

Decisions are not always easy and obvious. Unlike main narrative of literature classics - there's no good and evil, but everything in between. 

Zabbix offers multiple options to collect data. Tightly integrated Zabbix Agent 2 offers great user experience, but it's not the only way to achieve this. 

Zabbix can collect metrix thru basic HTTP pulling as well and with Prometheus already in place, that's not such bad option. But, it's harder and less intuitive to configure in Zabbix UI.

Our double stack problem couldn't get solved without going on comporomise. Either we increase complexity on the infrastructure side, or on the Zabbix side. 

## bespinian's Role

We began our cooperation by learning about existing infrastructure and morales behind Zabbix initiative. Broader perspective and understanding of client's need allowed our team to allign with the customer and step into his shoes. The project was not only about installing yet another peace of software - but solving a particular bussines need.

Over spread of 10 days we have discussed, planned and executed Zabbix installation. First, by assessing already installed tools. OpenShift's build-in option to manage Helm releases worked perfectly for our use-case. Simple with room for future improvements, like migration to full GitOps setup.

In shared circle including customer, cluster administrators and our team - dual monitoring stack problem has been solved by reusing existing Prometheus installation. It was a joined decision taking into account interest of every involved party. To address cubersome configuration of metrics pulled over HTTP - our Zabbix expert proposed 2 days workshop. During that workshop, the customer could test the final product and learn how to take the most out of it.

## Project's summary

Each customer is different in terms of culture, expectations and technical stack. For Zabbix intallation at Semax, we emphesized communication and clarity, we understand that best practices work only as a guidence, and that sometimes, you just have to go on compromises and get the job done. 

We hope that it was not our last initiative with Semax and we hope that theirs Zabbix dashboard will always stay green!

## Technologies Used

- **Infrastructure**: Red Hat OpenShift
- **Deployment**: Helm / OpenShift Platform
- **Monitoring**: Zabbix
