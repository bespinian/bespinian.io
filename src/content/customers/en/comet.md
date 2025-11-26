---
title: Creating IIoT Health Monitor BLOX
company: Comet X-Ray
logo: ../../../assets/customers/comet.svg
pubDate: 2024-11-06
results:
  - Built IIoT health monitoring for Xray fleet
  - Enabled shift to preventive maintenance
  - Implemented cost-efficient serverless on AWS
  - Delivered real-time monitoring & alerts
quote:
  "bespinian's expertise in cloud-native empowered our journey from breakdowns
  to breakthroughs in X-ray modules. The very agile implementation of the BLOX
  health monitoring was key to enable our customers to move from reactive to
  preventive maintenance."
authorName: Pascal Corbat
authorTitle: Product Manager
authorImage: ../../../assets/customers/comet-pascal.jpeg
---

## Customer

[Comet X-Ray](https://xray.comet.tech/) is a Swiss company based in Flamatt
employing more than 1700 people around the globe. They are a leading tech
company driving innovation in the X-ray and radio frequency business. The
division Comet X-ray develops and produces X-ray modules that enable
non-destructive testing of materials and industry components. The inspected
parts come from the aerospace, automotive, battery, semiconductors, and other
markets.

## Background

The X-ray modules, Comet has deployed with their customers worldwide, require
regular maintenance. Knowing what exactly is going on within these devices and
how they are being used is crucial for efficiently working with them. With
targeted data visualization and preventive alerts, one can recognize patterns,
drifts, gaps and detect incorrect usage and prevent outages. That is why Comet
wanted to innovate in this space and create such an IIoT (Industrial Internet of
Things) tool called BLOX for them and their customers.

## Project Goal

The goal of BLOX is to give Comet and their customers the big picture. Bringing
in the transparency and overview of displaying the metrics and data of each
device in a way that is easy to understand and shows how the device has been
used. Users can then investigate potential issues of the device by diving into
different charts of a variety of metrics. They also receive warnings and alerts
when the system detects unusual patterns and unexpected system states. bespinian
and Comet are building BLOX in a tight collaboration and are very happy with how
the tool already brings great value.

## bespinian's Role

bespinian played a key role in the following areas:

### Infrastructure Setup

bespinian set up the infrastructure of BLOX by provisioning multiple separate
environments into AWS using Terraform. Said infrastructure needed to be
resilient, easy to maintain and cost-efficient. By choosing highly managed
serverless technologies like AWS Lambda, Amazon DynamoDB or Amazon S3 for
different parts of the application, much of the infrastructure setup and
maintenance work could have been delegated to the cloud provider. Using
infrastructure as code allows us to easily maintain multiple environments and
make sure that we have parity among them.

### Backend Development

The backend of BLOX is the heart of the application and where all the business
logic lies. It is written in Python because that's a well-known language to
Comet, a first-class citizen on AWS Lambda, and provides us with the flexibility
of performing small iterative changes. This is important because the business
logic of how the logs and metrics from devices is interpreted is rather involved
and complex at times. However, by using neatly structured and tested code, this
complexity is well documented and automated in the BLOX backend code.

### Frontend Development

For the frontend rendered in users' web browsers, we decided to go for Svelte
and SvelteKit. Both are rather new but powerful technologies, which allow us to
build a secure and performant browser application which is easy to use and
easily accessible. For the hosting of this application, a combination of S3 and
CloudFront was chosen. By doing so, BLOX is served in a very cost-efficient way
and accessible to Comet and their customers around the globe.

### Monitoring and Alerting

Since the whole infrastructure is hosted on a large-scale cloud provider, it is
a simple approach to use the monitoring, alerting, and logging tools they
provide. In this case, we decided to go for Amazon CloudWatch, which collects
the logs of the BLOX backend and triggers alerts if something goes wrong. By
using these provided tools, we can make sure, the monitoring and alerting
infrastructure itself is always available and provides a comprehensive feature
set.

## Technologies Used

- **Infrastructure**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Runtime**: AWS Lambda
- **Monitoring**: Amazon CloudWatch
- **Backend**: Python / Flask
- **Frontend**: Svelte / TypeScript
- **DB**: DynamoDB
