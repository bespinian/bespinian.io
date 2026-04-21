---
title: Building a Scalable Health Data Platform
company: Medisanté
logo: ../../../assets/customers/medisante.png
pubDate: 2021-09-12
results:
  - Built scalable AWS data pipeline for medical devices
  - Implemented flexible adapter architecture in Go
  - Automated infrastructure provisioning with Terraform
  - Delivered React management app with Go API backend
quote:
  "We implemented a robust data pipeline on AWS that ensures reliable data flow
  from devices through the core platform to customers."
authorName: Gilles Lunzenfichter
authorTitle: CEO
authorImage: ../../../assets/customers/medisante-gilles.jpeg
---

## Customer

[Medisanté Group](https://www.medisante-group.com/) provides innovative digital
health solutions that connect medical devices with healthcare providers,
insurance companies, and medical practices. Their platform enables seamless
collection, processing, and distribution of vital health data from various
medical devices, supporting better patient care and health monitoring.

## Background

Medisanté operates in a complex healthcare ecosystem where medical device data
needs to flow efficiently between patients, healthcare providers, and insurance
companies. Their platform processes data from diverse medical devices including
body scales, blood glucose monitors, and blood pressure measurement devices.
Each device type has its own data format and communication protocol, while each
customer segment (hospitals, insurance companies, doctor's offices) has unique
integration requirements and data consumption patterns.

The challenge was to build a flexible, scalable architecture that could handle
this heterogeneous landscape while maintaining high availability, security, and
compliance with healthcare data regulations.

## Project Goal

The primary objective was to build a modern, cloud-native platform on AWS that
could:

- Support a core application architecture with pluggable device adapters
- Handle data ingestion from multiple medical device types with different
  protocols
- Provide flexible integration patterns for diverse customer types
- Scale automatically to handle varying data volumes
- Ensure secure handling of sensitive health data
- Enable efficient management and monitoring of the entire platform
- Provide a user-friendly interface for platform administration

## bespinian's Role

bespinian played a central role in designing and implementing the complete
platform infrastructure and application stack:

### Cloud-Native Architecture Design

We designed a scalable, event-driven architecture on AWS that separates core
functionality from device-specific and customer-specific integrations. This
modular approach allows Medisanté to add new device types and customer
integrations without affecting the core platform. The architecture leverages AWS
serverless services to ensure automatic scaling and cost efficiency.

### Device Adapter Implementation

We implemented specialized adapters for different medical device types as AWS
Lambda functions written in Go. Each adapter handles the specific communication
protocols and data formats of its device category (body scales, blood glucose
monitors, blood pressure devices, etc.). These Lambda functions process incoming
device data, normalize it to a common format, and feed it into the core data
pipeline. The serverless approach ensures that each adapter scales independently
based on data volume.

### Customer Integration Layer

Similar to the device adapters, we built customer-specific integration adapters
as Lambda functions in Go. These adapters transform the normalized health data
into the formats and protocols required by different customer types, whether
hospitals, insurance companies, or doctor's offices. This flexibility enables
Medisanté to onboard new customers quickly without modifying the core platform.

### Infrastructure as Code

We automated the entire infrastructure provisioning using Terraform. This
includes the setup of Lambda functions, API Gateway endpoints, data storage
solutions, networking components, and monitoring infrastructure. The
infrastructure-as-code approach ensures reproducibility, version control, and
enables rapid deployment across multiple environments (development, staging,
production).

### Management Application

We developed a comprehensive IoT management application using React that
provides Medisanté's team with full visibility and control over the platform.
The frontend communicates with a custom Go API backend that manages platform
configuration, monitors data flows, and provides operational insights. The
application enables efficient management of device adapters, customer
integrations, and overall platform health.

### Data Pipeline Architecture

We implemented a robust data pipeline on AWS that ensures reliable data flow
from devices through the core platform to customers. The pipeline handles data
validation, transformation, storage, and routing while maintaining data
integrity and audit trails for compliance purposes.

## Technologies Used

- **Infrastructure**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Serverless Computing**: AWS Lambda
- **Backend Development**: Go (Golang)
- **Frontend Application**: React
- **API Management**: AWS API Gateway
- **Data Storage**: AWS S3, DynamoDB
- **Monitoring**: Amazon CloudWatch
