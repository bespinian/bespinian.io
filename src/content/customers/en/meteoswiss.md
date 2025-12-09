---
title: Migrating Weather Apps to Geo-Redundant Cloud
company: MeteoSwiss
logo: ../../../assets/customers/swiss-confederation.svg
pubDate: 2025-01-12
results:
  - Migrated 300+ apps to geo-redundant cloud
  - Modernized critical systems to AWS serverless
  - Hybrid cloud with AWS, CSCS, and on-prem
  - Implemented event-driven with DevOps & GitOps
quote:
  "With the help of bespinian, we are successfully modernizing our specialized
  applications and seamlessly integrating them into a geo-redundant cloud
  infrastructure."
authorName: Andrin Rüedi
authorTitle: Program Head
authorImage: ../../../assets/customers/meteoswiss-andrin.jpeg
featured: true
---

## Customer

On behalf of the Swiss government,
[MeteoSwiss](https://www.meteoschweiz.admin.ch/) is fulfilling the tasks
outlined in the Federal Act on Meteorology and Climatology. The experts at
MeteoSwiss operate the national ground- and radar-based measurement networks,
collect, manage, and analyze weather and climate data. They provide forecasts,
warnings, and advisory services while engaging in research and development of
tailored products and services.

## Background

As the national weather service, MeteoSwiss operates more than 300 specialized
applications, scripts, and services developed and maintained by various teams
using agile methodologies. These create a complex and heterogeneous landscape of
interconnected software components and services. Some of these applications are
responsible for critical safety tasks (e.g., the calculation of aviation weather
data), while others handle large volumes of data (e.g., weather data from
measurement stations). The combination of these responsibilities imposes
stringent requirements for high availability and resilience.

## Project Goal

In this collaborative project, the aim is to modernize this complex collection
of critical data, specialized applications, and automation solutions, make it
geo-redundant, and migrate it to the cloud (primarily AWS and the Swiss National
Supercomputing Centre, [CSCS](https://www.cscs.ch/)). Some components, which are
already containerized, can be easily deployed on serverless platforms. Others,
running on traditional VM-based infrastructure, need significant modernization
before being operational on AWS.

## bespinian's Role

bespinian played a key role in the following areas:

### Architectural Workshops with Customer

Teams bespinian's cloud-native experts proactively conduct architectural
workshops with various specialized teams to define the target architecture on
AWS. Together with the teams, suitable AWS technologies are identified, and
plans are devised to connect them to the existing network infrastructure. This
process provides the teams with clear goals and a step-by-step plan to achieve
them. The conception and implementation follow DevOps and GitOps principles.

### Migration of Existing Applications to AWS

Following the architectural workshops and the definition of the target
architecture, bespinian supports the teams in executing the migration. AWS
resources are defined as Terraform modules and provisioned automatically using
Terraform Cloud. Application code (mostly Java and Python) is modernized, and
integration and deployment are automated via GitOps (using Jenkins and GitLab).
This close collaboration facilitates timely modernization while also building
knowledge and expertise within the client’s teams. The applications are highly
diverse, ranging from simple scripts to web applications, machine learning
pipelines, and IoT platforms. Most applications are implemented using AWS
serverless services (Lambda, Batch, Step Functions) in an event-driven
architecture with highly available AWS products (e.g., DynamoDB, SageMaker,
CloudFront, S3, CloudWatch, Aurora, etc.).

### Provisioning of Central Components and Processes

During the initial migrations, bespinian provides central building blocks and
processes to optimize future migrations and establish best practices. Reusable
Terraform modules are developed to provision AWS resources (e.g., Lambda
functions and S3 buckets) according to best practices. Guidelines are created
for cloud-based software development, covering topics such as logging,
monitoring, and tracing. These measures ensure the long-term maintainability of
the migrated applications. A GitOps workflow was defined to deploy and operate
applications via Git. This workflow was implemented for initial applications and
will be used as a standard for all subsequent migrations.

### Containerization of Legacy Applications

Certain applications are not suitable for direct migration to AWS or are more
cost-effective to operate at CSCS. In these cases, bespinian supports the
client’s teams in containerizing these applications and setting up Kubernetes
resources. Dockerfiles and Kubernetes resource definitions are created, which
are then automatically deployed and managed on MeteoSwiss’ internal OpenShift
platform or at CSCS.

### Network Setup and Architecture

MeteoSwiss’ network architecture is highly complex. The three main locations to
be connected include the on-site infrastructure in Kloten and other locations,
the CSCS in Lugano, and AWS data centers. In AWS, the Zurich (eu-central-2) and
Frankfurt (eu-central-1) regions are primarily used. This results in a hybrid
cloud setup capable of processing large data volumes efficiently and
bidirectionally. bespinian plays a key role in designing and implementing this
infrastructure, together with our strategic partner
[Nuvibit](https://nuvibit.com/), who is designing and implementing the
underlying AWS platform and networking layer based on
[NTC](https://nuvibit.com/de/nuvibit-terraform-collection/).

## Technologies Used

- **Infrastructure**: Amazon Web Services (AWS)
- **HPC Infrastructure**: Swiss National Supercomputing Centre (CSCS)
- **Infrastructure as Code**: Terraform / Nuvibit Terraform Collection (NTC)
- **Container Platform**: OpenShift / Kubernetes
- **Monitoring**: Prometheus / Grafana
- **Deployment**: Helm
- **Programming**: Java / Python
- **CI/CD**: GitLab CI
