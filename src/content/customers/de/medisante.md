---
title: Aufbau einer skalierbaren Gesundheitsdatenplattform
company: Medisanté
logo: ../../../assets/customers/medisante.png
pubDate: 2021-09-12
results:
  - Skalierbare AWS-Datenpipeline für Medizingeräte entwickelt
  - Flexible Adapter-Architektur in Go implementiert
  - Infrastruktur-Provisionierung mit Terraform automatisiert
  - React-Management-App mit Go-API-Backend ausgeliefert
quote:
  "Das AWS- und Infrastructure-as-Code-Know-how von bespinian war entscheidend
  für die Schaffung einer soliden Grundlage für unseren Multi-Vendor-Geräte-
  Interoperabilitätshub in der Fernbetreuung."
authorName: Gilles Lunzenfichter
authorTitle: CEO
authorImage: ../../../assets/customers/medisante-gilles.jpeg
---

## Kunde

Die [Medisanté Group](https://www.medisante-group.com/) bietet innovative
digitale Gesundheitslösungen, die Medizingeräte mit Gesundheitsdienstleistern,
Versicherungen und Arztpraxen verbinden. Ihre Plattform ermöglicht die nahtlose
Erfassung, Verarbeitung und Verteilung wichtiger Gesundheitsdaten von
verschiedenen Medizingeräten und unterstützt so eine bessere Patientenversorgung
und Gesundheitsüberwachung.

## Hintergrund

Medisanté operiert in einem komplexen Gesundheitsökosystem, in dem
Medizingerätedaten effizient zwischen Patienten, Gesundheitsdienstleistern und
Versicherungen fliessen müssen. Ihre Plattform verarbeitet Daten von
verschiedenen Medizingeräten wie Körperwaagen, Blutzuckermessgeräten und
Blutdruckmessgeräten. Jeder Gerätetyp hat sein eigenes Datenformat und
Kommunikationsprotokoll, während jedes Kundensegment (Krankenhäuser,
Versicherungen, Arztpraxen) einzigartige Integrationsanforderungen und
Datennutzungsmuster hat.

Die Herausforderung bestand darin, eine flexible, skalierbare Architektur zu
entwickeln, die diese heterogene Landschaft bewältigen kann, während sie
gleichzeitig hohe Verfügbarkeit, Sicherheit und Einhaltung der Vorschriften für
Gesundheitsdaten gewährleistet.

## Projektziel

Das Hauptziel war es, eine moderne, Cloud-native Plattform auf AWS zu
entwickeln, die Folgendes kann:

- Eine Kernanwendungsarchitektur mit ansteckbaren Geräteadaptern unterstützen
- Datenerfassung von mehreren Medizingerätetypen mit unterschiedlichen
  Protokollen handhaben
- Flexible Integrationsmuster für verschiedene Kundentypen bereitstellen
- Automatisch skalieren, um variierende Datenvolumen zu bewältigen
- Sichere Handhabung sensibler Gesundheitsdaten gewährleisten
- Effizientes Management und Monitoring der gesamten Plattform ermöglichen
- Eine benutzerfreundliche Schnittstelle für die Plattformverwaltung
  bereitstellen

## bespinians Rolle

bespinian spielte eine zentrale Rolle bei der Konzeption und Implementierung der
kompletten Plattform-Infrastruktur und des Anwendungsstacks:

### Cloud-Native Architektur-Design

Wir haben eine skalierbare, ereignisgesteuerte Architektur auf AWS entworfen,
die Kernfunktionalität von gerätespezifischen und kundenspezifischen
Integrationen trennt. Dieser modulare Ansatz ermöglicht es Medisanté, neue
Gerätetypen und Kundenintegrationen hinzuzufügen, ohne die Kernplattform zu
beeinträchtigen. Die Architektur nutzt AWS Serverless-Services, um automatische
Skalierung und Kosteneffizienz zu gewährleisten.

### Geräteadapter-Implementierung

Wir haben spezialisierte Adapter für verschiedene Medizingerätetypen als AWS
Lambda-Funktionen in Go implementiert. Jeder Adapter behandelt die spezifischen
Kommunikationsprotokolle und Datenformate seiner Gerätekategorie (Körperwaagen,
Blutzuckermessgeräte, Blutdruckmessgeräte usw.). Diese Lambda-Funktionen
verarbeiten eingehende Gerätedaten, normalisieren sie in ein gemeinsames Format
und führen sie in die Kerndatenpipeline ein. Der Serverless-Ansatz stellt
sicher, dass jeder Adapter unabhängig basierend auf dem Datenvolumen skaliert.

### Kundenintegrations-Schicht

Ähnlich wie die Geräteadapter haben wir kundenspezifische Integrationsadapter
als Lambda-Funktionen in Go entwickelt. Diese Adapter transformieren die
normalisierten Gesundheitsdaten in die Formate und Protokolle, die von
verschiedenen Kundentypen benötigt werden, sei es Krankenhäuser, Versicherungen
oder Arztpraxen. Diese Flexibilität ermöglicht es Medisanté, neue Kunden schnell
aufzunehmen, ohne die Kernplattform zu ändern.

### Infrastructure as Code

Wir haben die gesamte Infrastruktur-Provisionierung mit Terraform automatisiert.
Dies umfasst die Einrichtung von Lambda-Funktionen, API Gateway Endpoints,
Datenspeicherlösungen, Netzwerkkomponenten und Monitoring-Infrastruktur. Der
Infrastructure-as-Code-Ansatz gewährleistet Reproduzierbarkeit,
Versionskontrolle und ermöglicht schnelle Bereitstellung über mehrere Umgebungen
hinweg (Entwicklung, Staging, Produktion).

### Management-Anwendung

Wir haben eine umfassende IoT-Management-Anwendung mit React entwickelt, die dem
Team von Medisanté vollständige Transparenz und Kontrolle über die Plattform
bietet. Das Frontend kommuniziert mit einem massgeschneiderten Go-API-Backend,
das die Plattformkonfiguration verwaltet, Datenflüsse überwacht und operative
Einblicke bietet. Die Anwendung ermöglicht effizientes Management von
Geräteadaptern, Kundenintegrationen und der allgemeinen Plattformgesundheit.

### Datenpipeline-Architektur

Wir haben eine robuste Datenpipeline auf AWS implementiert, die einen
zuverlässigen Datenfluss von Geräten durch die Kernplattform zu Kunden
gewährleistet. Die Pipeline handhabt Datenvalidierung, Transformation,
Speicherung und Routing, während sie Datenintegrität und Audit-Trails für
Compliance-Zwecke aufrechterhält.

## Verwendete Technologien

- **Infrastruktur**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Serverless Computing**: AWS Lambda
- **Backend-Entwicklung**: Go (Golang)
- **Frontend-Anwendung**: React
- **API-Management**: AWS API Gateway
- **Datenspeicherung**: AWS S3, DynamoDB
- **Monitoring**: Amazon CloudWatch
