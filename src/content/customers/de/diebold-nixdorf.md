---
title: Banknoten-Datenmanagement-Plattform
company: Diebold Nixdorf
logo: ../../../assets/customers/diebold-nixdorf.svg
pubDate: 2024-01-10
results:
  - Zentrale Plattform für Banknotendaten
  - Unveränderlicher Speicher für vollständige Reproduzierbarkeit
  - Minimale Redundanz durch Validierung
  - Team befähigt in Kubernetes und DevOps-Praktiken
quote:
  "bespinian liefert eine überzeugende Mischung aus Hands-On Engineering,
  Coaching und Consulting. Dies macht sie zum idealen Partner und Begleiter auf
  unserer Reise in die Welt der Container, Microservices und DevOps."
authorName: Lukas Burger
authorTitle: Head of Software Engineering
authorImage: ../../../assets/customers/dieboldnixdorf-lukas.jpeg
---

## Kunde

[Diebold Nixdorf](https://www.dieboldnixdorf.com/) ist ein globaler Anbieter von
Technologie und Dienstleistungen für die Banken- und Retail-Branche – von
Geldautomaten und Self-Service-Terminals bis hin zur Software und den Services,
die diese betreiben. Der Standort in Burgdorf, Schweiz, mit rund 100
Mitarbeitenden entwickelt, produziert und wartet Banknotensensoren, die in
Geldautomaten, automatischen Einzahlungsautomaten sowie Geldzähl- und
Sortiermaschinen eingesetzt werden. Der Standort wurde zuvor als CI Tech Sensors
geführt, ein Joint Venture von Diebold Nixdorf und Giesecke+Devrient, und ist
inzwischen vollständig in Diebold Nixdorf integriert.

## Hintergrund

Bei der Entwicklung von Banknotensensoren und Erkennungssoftware werden grosse
Mengen an Banknotendaten benötigt. Unter diesen Daten spielen Bilder eine
zentrale Rolle bei der Konfiguration und Anpassung von
Banknoten-Erkennungsalgorithmen und bei der anschliessenden Verifizierung dieser
Algorithmen hinsichtlich der erforderlichen Erkennungsraten. Neben Bilddaten
sind auch andere Arten von Metadaten erforderlich. Dazu gehören Serien- und
Emissionsnummern von Banknoten, Qualitäts- und Nutzungsinformationen sowie
technische Parameter bezüglich des Geräts, mit dem ein bestimmter
Banknotendatensatz aufgezeichnet wurde.

## Projektziel

Das Ziel dieses Projekts war es, eine zentrale Plattform für alle Banknotendaten
zu entwerfen und einzurichten, alle Banknotendaten in die zentrale Plattform zu
übertragen und die Daten für alle Tools und Prozesse innerhalb von CI Tech
Sensors verfügbar zu machen. Neu aufgezeichnete Banknotendaten sollten vor der
Speicherung mit minimaler Redundanz auf Gültigkeit überprüft werden. Jeder
Banknotendatensatz sollte eindeutig adressierbar gemacht werden. Darüber hinaus
sollten alle Banknotendaten auf unveränderliche Weise gespeichert werden, um
strikte Reproduzierbarkeit aller Prozessschritte bei der Entwicklung und
Validierung von Banknotensensoren zu garantieren.

## bespinians Rolle

bespinian spielte eine Schlüsselrolle in den folgenden Bereichen:

### Microservice-Architektur

In einer Reihe von regelmässigen Architektur-Workshops konzipierten CI Tech
Sensors und bespinian eine Microservice-Architektur für die Verwaltung aller
Banknotendaten. Mit einem schrittweisen Ansatz zur Einführung klar abgegrenzter
Microservices wurde die zentrale Banknotenverwaltungsplattform mit minimalen
Auswirkungen auf das Tagesgeschäft von CI Tech Sensors eingeführt. Dabei
übernahm bespinian konzeptionelle Verantwortlichkeiten bei der Entwicklung der
Architektur sowie eine Hands-On-Rolle bei deren Implementierung.

### Kubernetes-Infrastruktur

Alle Microservices von CI Tech Sensors für die Banknotendatenverwaltung werden
auf einer Kubernetes-basierten Infrastruktur deployed. bespinian war
federführend bei der Konfiguration aller Kubernetes-Umgebungen und bei der
Konfiguration des automatisierten Deployments jedes Services. Durch eine
Mischung aus Training, Code-Review und Pair-Engineering ermöglichte bespinian
dem CI Tech Sensors Team, das notwendige Kubernetes-Know-how aufzubauen und den
Betrieb und die Erweiterung der Plattform fortzusetzen.

### Monitoring und Alerting

Die Microservices zur Verwaltung von Banknotendaten spielen naturgemäss eine
kritische Rolle im Kerngeschäft von CI Tech Sensors. Entsprechend mussten diese
Services aus betrieblicher Sicht eng überwacht werden. Darüber hinaus spielen
auch Business-Metriken wie beispielsweise die Menge ungültiger Banknotendaten
eine zentrale Rolle. Zusammen mit dem CI Tech Sensors Team entwickelte bespinian
eine Monitoring- und Alerting-Architektur basierend auf Prometheus und Grafana
und war federführend bei der Implementierung der Monitoring- und
Alerting-Infrastruktur und Dashboards. Dabei befähigte bespinian das CI Tech
Sensors Team in den relevanten Technologien, um sicherzustellen, dass Monitoring
und Alerting gemeinsam mit der Plattform weiterentwickelt werden können.

### Übergang zu DevOps

Mit der Einführung der Kubernetes-basierten Infrastruktur und einer
hochverfügbaren Microservice-Architektur vollzog das CI Tech Sensors Team einen
natürlichen Schritt hin zu einer DevOps-Arbeitsweise. bespinian begleitete CI
Tech Sensors durch diesen Übergang durch Coaching und Unterstützung der
beteiligten Teams sowie durch die Etablierung der notwendigen Tools und
Prozesse.

## Verwendete Technologien

- **Backend**: Python / Flask
- **DB**: PostgreSQL
- **Cache**: Redis
- **DB**: MongoDB
- **Container-Plattform**: Kubernetes
- **Prometheus**: Prometheus / Grafana / Alertmanager
- **Logs**: Elasticsearch / Kibana

## Kundenstimme

> "bespinian liefert eine überzeugende Mischung aus Hands-On Engineering,
> Coaching und Consulting. Dies macht sie zum idealen Partner und Begleiter auf
> unserer Reise in die Welt der Container, Microservices und DevOps."
>
> **Lukas Burger**, Head of Software Engineering
