---
title: Migration von Wetter-Apps in geo-redundante Cloud
company: MeteoSwiss
logo: ../../../assets/customers/swiss-confederation.svg
pubDate: 2025-01-12
results:
  - Migration von über 300 Apps in geo-redundante Cloud
  - Modernisierung kritischer Systeme zu AWS Serverless
  - Hybrid Cloud mit AWS, CSCS und On-Prem
  - Event-driven mit DevOps & GitOps implementiert
quote:
  "Mit der Hilfe von bespinian modernisieren wir erfolgreich unsere
  spezialisierten Applikationen und integrieren sie nahtlos in eine
  geo-redundante Cloud-Infrastruktur."
authorName: Andrin Rüedi
authorTitle: Program Head
authorImage: ../../../assets/customers/meteoswiss-andrin.jpeg
featured: true
---

## Kunde

Im Auftrag der Schweizer Regierung erfüllt
[MeteoSwiss](https://www.meteoschweiz.admin.ch/) die im Bundesgesetz über
Meteorologie und Klimatologie festgelegten Aufgaben. Die Experten von MeteoSwiss
betreiben die nationalen boden- und radarbasierten Messnetze, sammeln, verwalten
und analysieren Wetter- und Klimadaten. Sie stellen Vorhersagen, Warnungen und
Beratungsdienste bereit und engagieren sich in Forschung und Entwicklung
massgeschneiderter Produkte und Dienstleistungen.

## Hintergrund

Als nationaler Wetterdienst betreibt MeteoSwiss mehr als 300 spezialisierte
Applikationen, Skripte und Services, die von verschiedenen Teams mit agilen
Methoden entwickelt und gewartet werden. Diese bilden eine komplexe und
heterogene Landschaft miteinander verbundener Softwarekomponenten und Services.
Einige dieser Applikationen sind für kritische Sicherheitsaufgaben
verantwortlich (z.B. die Berechnung von Flugwetterdaten), während andere grosse
Datenmengen verarbeiten (z.B. Wetterdaten von Messstationen). Die Kombination
dieser Verantwortlichkeiten stellt strenge Anforderungen an hohe Verfügbarkeit
und Resilienz.

## Projektziel

In diesem Kooperationsprojekt ist das Ziel, diese komplexe Sammlung kritischer
Daten, spezialisierter Applikationen und Automatisierungslösungen zu
modernisieren, geo-redundant zu machen und in die Cloud zu migrieren (primär AWS
und das Swiss National Supercomputing Centre, [CSCS](https://www.cscs.ch/)).
Einige Komponenten, die bereits containerisiert sind, können einfach auf
serverlosen Plattformen deployed werden. Andere, die auf traditioneller
VM-basierter Infrastruktur laufen, benötigen erhebliche Modernisierung, bevor
sie auf AWS betriebsbereit sind.

## bespinians Rolle

bespinian spielte eine Schlüsselrolle in den folgenden Bereichen:

### Architektur-Workshops mit Kunden

Die Cloud-Native-Experten von bespinian führen proaktiv Architektur-Workshops
mit verschiedenen spezialisierten Teams durch, um die Zielarchitektur auf AWS zu
definieren. Zusammen mit den Teams werden geeignete AWS-Technologien
identifiziert und Pläne entwickelt, um sie mit der bestehenden
Netzwerkinfrastruktur zu verbinden. Dieser Prozess verschafft den Teams klare
Ziele und einen schrittweisen Plan, um diese zu erreichen. Die Konzeption und
Implementierung folgen DevOps- und GitOps-Prinzipien.

### Migration bestehender Applikationen zu AWS

Nach den Architektur-Workshops und der Definition der Zielarchitektur
unterstützt bespinian die Teams bei der Durchführung der Migration.
AWS-Ressourcen werden als Terraform-Module definiert und automatisch mit
Terraform Cloud bereitgestellt. Applikationscode (hauptsächlich Java und Python)
wird modernisiert und Integration und Deployment werden via GitOps (mit Jenkins
und GitLab) automatisiert. Diese enge Zusammenarbeit ermöglicht eine zeitnahe
Modernisierung und baut gleichzeitig Wissen und Expertise in den Teams des
Kunden auf. Die Applikationen sind sehr vielfältig und reichen von einfachen
Skripten über Webanwendungen, Machine-Learning-Pipelines bis hin zu
IoT-Plattformen. Die meisten Applikationen werden mit AWS Serverless Services
(Lambda, Batch, Step Functions) in einer event-driven Architektur mit
hochverfügbaren AWS-Produkten implementiert (z.B. DynamoDB, SageMaker,
CloudFront, S3, CloudWatch, Aurora, etc.).

### Bereitstellung zentraler Komponenten und Prozesse

Während der ersten Migrationen stellt bespinian zentrale Bausteine und Prozesse
bereit, um zukünftige Migrationen zu optimieren und Best Practices zu
etablieren. Wiederverwendbare Terraform-Module werden entwickelt, um
AWS-Ressourcen (z.B. Lambda-Funktionen und S3-Buckets) nach Best Practices
bereitzustellen. Richtlinien werden für cloudbasierte Softwareentwicklung
erstellt und decken Themen wie Logging, Monitoring und Tracing ab. Diese
Massnahmen stellen die langfristige Wartbarkeit der migrierten Applikationen
sicher. Ein GitOps-Workflow wurde definiert, um Applikationen via Git zu
deployen und zu betreiben. Dieser Workflow wurde für erste Applikationen
implementiert und wird als Standard für alle nachfolgenden Migrationen
verwendet.

### Containerisierung von Legacy-Applikationen

Bestimmte Applikationen eignen sich nicht für eine direkte Migration zu AWS oder
sind kosteneffizienter beim CSCS zu betreiben. In diesen Fällen unterstützt
bespinian die Teams des Kunden bei der Containerisierung dieser Applikationen
und beim Einrichten von Kubernetes-Ressourcen. Dockerfiles und
Kubernetes-Ressourcendefinitionen werden erstellt, die dann automatisch auf der
internen OpenShift-Plattform von MeteoSwiss oder beim CSCS deployed und
verwaltet werden.

### Netzwerk-Setup und Architektur

Die Netzwerkarchitektur von MeteoSwiss ist hochkomplex. Die drei Hauptstandorte,
die verbunden werden müssen, umfassen die lokale Infrastruktur in Kloten und
anderen Standorten, das CSCS in Lugano und AWS-Rechenzentren. In AWS werden
primär die Regionen Zürich (eu-central-2) und Frankfurt (eu-central-1)
verwendet. Dies führt zu einem Hybrid-Cloud-Setup, das in der Lage ist, grosse
Datenmengen effizient und bidirektional zu verarbeiten. bespinian spielt eine
Schlüsselrolle bei der Konzeption und Implementierung dieser Infrastruktur,
zusammen mit unserem strategischen Partner [Nuvibit](https://nuvibit.com/), der
die zugrunde liegende AWS-Plattform und Netzwerkschicht basierend auf
[NTC](https://nuvibit.com/de/nuvibit-terraform-collection/) konzipiert und
implementiert.

## Verwendete Technologien

- **Infrastruktur**: Amazon Web Services (AWS)
- **HPC-Infrastruktur**: Swiss National Supercomputing Centre (CSCS)
- **Infrastructure as Code**: Terraform / Nuvibit Terraform Collection (NTC)
- **Container-Plattform**: OpenShift / Kubernetes
- **Monitoring**: Prometheus / Grafana
- **Deployment**: Helm
- **Programmierung**: Java / Python
- **CI/CD**: GitLab CI
