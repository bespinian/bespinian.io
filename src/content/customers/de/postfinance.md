---
title: Aufbau einer sicheren AWS-Plattform
company: PostFinance
logo: ../../../assets/customers/postfinance.svg
date: 2025-08-07
results:
  - Sichere, FINMA-konforme AWS-Plattform aufgebaut
  - Automatisierte Infrastruktur-Bereitstellung mit Terraform
  - Least Privilege IAM-Sicherheit implementiert
  - Teams auf AWS-native Architektur befähigt
quote:
  "Dank bespinians fundierter Expertise und unserer engen Zusammenarbeit konnten
  wir schnell eine sichere und skalierbare AWS-Grundlage aufbauen. Gleichzeitig
  wurde unser Team nachhaltig befähigt, AWS-Services selbstständig und effizient
  zu nutzen."
authorName: Roger Bigler
authorTitle: Lead Deployment, Platform & Security
authorImage: ../../../assets/customers/postfinance-roger.jpeg
---

## Kunde

[PostFinance](https://www.postfinance.ch/) ist eine führende Bank in der Schweiz
mit hohen Standards für Sicherheit, Stabilität und regulatorische Konformität
gemäss FINMA-Anforderungen. Als integraler Bestandteil der Schweizer
Finanzlandschaft bietet PostFinance eine breite Palette von
Finanzdienstleistungen für Privat- und Geschäftskunden an. Um den steigenden
Anforderungen gerecht zu werden und die Digitalisierung weiter voranzutreiben,
entschied sich PostFinance, ihre bestehende, lokal betriebene IT-Infrastruktur
mit einer modernen AWS-basierten Cloud-Plattform zu erweitern.

## Hintergrund

Als Bank steht PostFinance vor der Herausforderung, eine sichere und
hochverfügbare IT-Infrastruktur bereitzustellen, die den strengen
regulatorischen Anforderungen der FINMA entspricht. Obwohl die bestehende
On-Premise-Infrastruktur, die mit Cloud-Native-Technologien aufgebaut wurde,
diese Anforderungen erfüllt, stösst sie in Bezug auf Skalierbarkeit und
Flexibilität für SaaS-Dienste an ihre Grenzen. Die Einführung einer
AWS-Cloud-Plattform soll nicht nur eine dynamischere Ressourcennutzung
ermöglichen, sondern auch Zugang zu neuen Services im Cloud-Ökosystem bieten.

Ein weiterer wichtiger Aspekt des Projekts ist die Unterstützung der
Applikations- und Business-Teams bei der Migration auf die neue Plattform. Dies
umfasst die Integration bestehender Lösungen wie Identity- und
Access-Management-Systeme sowie die Einhaltung strenger Sicherheitsrichtlinien,
wie dem Prinzip des Least Privilege. Das Ziel war es, die Plattform so zu bauen,
dass sie alle regulatorischen und betrieblichen Banking-Anforderungen erfüllt
und gleichzeitig eine zukunftsfähige Grundlage für die digitale Transformation
von PostFinance schafft.

## Projektziel

Das Ziel des Projekts ist der Aufbau einer skalierbaren, sicheren und konformen
AWS-Cloud-Plattform, die folgende Anforderungen erfüllt:

- Vollständige Automatisierung der Infrastruktur-Bereitstellung mit
  Infrastructure as Code
- Klare Kostenkontrolle und Kostentransparenz für einzelne PostFinance
  Geschäftsbereiche und Applikationen
- Umfassendes Monitoring, Auditing und Tracing auf Plattform- und
  Applikationsebene via Amazon CloudWatch sowie Integration mit bestehenden
  Monitoring-Lösungen
- Unterstützung von Applikations- und Business-Teams bei der Migration auf die
  neue Plattform
- Sicherstellung der IAM-Konformität durch Einhaltung des Least Privilege
  Prinzips

## bespinians Rolle

bespinian spielt eine Schlüsselrolle in den folgenden Bereichen:

### Infrastruktur-Automatisierung

Wir implementierten Terraform-Module mit PostFinance-Engineers, um die
Infrastruktur-Bereitstellung zu automatisieren. Dies gewährleistet konsistente,
reproduzierbare und fehlerfreie Deployments.

### Identity and Access Management (IAM)

Wir implementierten ein IAM-Konzept unter Anwendung des Least Privilege
Prinzips, integrierten bestehende Systeme und stellten strikte Zugriffskontrolle
sicher, die den Sicherheitsanforderungen der FINMA entspricht.

### Monitoring und Auditing

Wir implementierten umfassendes Monitoring mit Amazon CloudWatch für Plattform
und Applikationen. Bestehende PostFinance Monitoring-Lösungen wurden für einen
einheitlichen Systemüberblick integriert.

### Governance und Sicherheit

Wir etablierten robuste Sicherheits- und Governance-Strukturen, implementierten
Service Control Policies (SCPs) für organisationsweite
AWS-Ressourcen-Richtlinien. Wir deployten AWS-Sicherheitsservices, die für
FINMA-Konformität erforderlich sind, und richteten einen zentralen Key
Management Service (KMS) für sichere Verschlüsselungsschlüssel-Verwaltung ein.

### AWS-spezifisches Coaching und Team-Support

Wir coachten PostFinances Applikations- und Business-Teams zu AWS-nativer
Architektur, Sicherheitsrichtlinien und Plattformnutzung während ihrer gesamten
Cloud-Journey.

## Verwendete Technologien

- **Infrastruktur**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Container-Plattform**: Kubernetes
