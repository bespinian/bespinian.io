---
title: Python Application Modernization
company: AFV Beltrame Group
logo: ../../../assets/customers/beltrame.svg
pubDate: 2026-01-22
results:
  - Over 800 unit tests to reduce risk of code changes
  - Migration to latest Python version with dependency management
  - Significant reduction of incidents after deployments
  - Proactive monitoring with Prometheus, Grafana, and Loki
quote:
  "With bespinian, we secured and stabilised our legacy MES system, ensuring
  operational continuity and clearer governance. Their work not only
  strengthened release and monitoring processes but also enhanced our
  understanding of the production processes supported by the application. A
  reliable and results-oriented partner."
authorName: Martina Catozzo
authorTitle: Group IT Coordination
authorImage: ../../../assets/customers/beltrame-martina.jpeg
---

## Customer

[AFV Beltrame Group](https://gruppobeltrame.com/en/), operating through
[Stahl Gerlafingen AG](https://gruppobeltrame.com/en/stahl-gerlafingen-ag/) in
Switzerland, specializes in manufacturing long steel products—primarily
reinforcing steel for concrete and structural steel profiles. With a workforce
of approximately 2,900 employees, the Group maintains an annual production
capacity of around 3 million tonnes, serving both domestic and broader European
markets.

The Group distinguishes itself through an industrial model centered on ferrous
scrap recycling and advanced steelmaking processes, establishing its position as
Switzerland's largest producer of recycled steel. Its products serve critical
applications across civil construction, infrastructure development, mechanical
engineering, automotive manufacturing, energy sectors, oil &amp; gas industries,
and diverse industrial applications.

## Initial Situation

About 15 years ago, there was a need to collect data from multiple industrial
control systems in a central location and combine it with additional operational
data, such as production orders from ERP systems. For this purpose, a
Python-based web application was developed to manage devices and peripheral
systems and make data available to users. Later, the software was extended to
support the production process. In 2023, bespinian was engaged to modernize the
application, provide operational support, and implement robust monitoring.

## Project Goals

The goal was to place the software on a sustainable and maintainable foundation
and ensure reliable operations. Key activities included migrating to the latest
Python version, introducing dependency management, implementing an automated
deployment process, and setting up monitoring. Additionally, unit tests were to
be written to improve reliability.

## bespinian's Role

### Operational Support

bespinian supports the IT department in operating the application and acts as a
troubleshooter when issues arise. Several change requests have also been
implemented.

### Application Modernization

After introducing Git for version control, we wrote over 800 unit tests to
reduce the risk of code changes. These tests are now automatically executed in a
GitLab pipeline before each deployment. This has drastically reduced the number
of incidents after a deployment. After that, we were able to migrate Python to
the latest supported version and split individual Python files, some with over
6,000 lines of code, into manageable modules.

### Monitoring

For proactive monitoring of the application and its environment, we use the open
source products Prometheus, Grafana, and Loki. Instead of reacting to user
reports, IT and we can now respond proactively and investigate problems using
clear dashboards and centralized logging. Additionally, we wrote an OPC XML
exporter for Prometheus that allows us to monitor PLCs (machine controllers).

## Technologies

- **Version Control**: GitLab
- **Back End**: Python
- **Monitoring**: Prometheus & Grafana
- **Logging**: Loki
- **Database**: Microsoft SQL Server
- **Integration System**: ERP
- **Industrial Communication**:OPC XML
