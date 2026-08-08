---
title: Konzept für eine mandantenfähige Kubernetes Plattform
company: BISON Group
logo: ../../../assets/customers/bison.png
pubDate: 2026-08-31
results:
  - |
    Ganzheitliches Konzept für eine skalierbare
    Multi-Tenant-Kubernetes-Plattform auf GKE erarbeitet
  - |
    Verbindliche technische Zielarchitektur inkl. Automatisierungs- und
    Betriebsprozessen definiert
  - |
    Organisatorische Rahmenbedingungen für den künftigen Plattformbetrieb
    geschaffen
quote: "TODO"
authorName: TODO
authorTitle: Technischer Projektleiter Infrastruktur
authorImage: ../../../assets/customers/bison.png
---

## Kunde

Die [BISON Group](https://www.bison-group.com/) ist eine führende Schweizer
Anbieterin von ERP-, Retail- und Cloud-Lösungen für Unternehmen aus Handel,
Produktion und Landwirtschaft. Bison mit Hauptsitz in Sursee (CH) gehört zur
fenaco Genossenschaft und betreibt geschäftskritische Software für zahlreiche
Kunden – zunehmend als Cloud-Services.

## Hintergrund

Über die Zeit entstanden bei Bison mehrere Single-Tenant-Kubernetes-Cluster in
GCP, Azure und On-Prem, oft mit geringer Auslastung. Die Fragmentierung erhöhte
Komplexität und Betriebsaufwand, während Automatisierung und Self-Service
fehlten. Standardisierte Observability und Kosten-Transparenz waren
unzureichend, obwohl parallel die Nachfrage stark wuchs, weitere
Kubernetes-basierte Services in der Cloud produktiv zu setzen. Bison entschied
deshalb, ein umfassendes Konzept für eine moderne
Multi-Tenant-Kubernetes-Plattform zu erarbeiten.

## Projektziel

Ziel des Projekts war die Entwicklung eines ganzheitlichen, strategischen
Konzepts für den Aufbau einer skalierbaren und zukunftssicheren
Kubernetes-Multi-Tenant-Plattform auf Basis von GKE. Das Konzept definiert die
technische Zielarchitektur, die Automatisierungs- und Betriebsprozesse sowie
organisatorische Rahmenbedingungen für den zukünftigen Plattformbetrieb. Es
dient als verbindliche Grundlage für die anschliessende Umsetzungsphase, deren
erster Meilenstein der Plattformzugang für den Webshop einer Schweizer
Agrargenossenschaft sein wird.

## bespinians Rolle

bespinian arbeitete eng mit dem langjährigen Partner
[Peak Scale](https://peakscale.ch/) zusammen und setzte als Projektteam die
Konzeptvorhaben mit folgenden Schwerpunkten um:

### Strategische Zielarchitektur und Multi-Tenancy

Das Projektteam entwickelte gemeinsam die Zielarchitektur der
Multi-Tenant-Plattform. Dazu gehörte die Definition von Infrastruktur- und
Workload-Clustern. Das im Konzept beschriebene Architekturmodell sieht eine
zentrale Argo-CD-Instanz vor. Diese Instanz verwaltet vom Infrastruktur-Cluster
aus alle Argo-CD-Instanzen auf den Workload-Clustern. Die Mandantentrennung auf
den Workload-Clusters wird mit Capsule umgesetzt. Applikationen der Mandanten
werden mit Crossplane und Argo CD bereitgestellt. Zusätzlich bildet Crossplane
die Basis für zukünftige Self-Service-Angebote der Multi-Tenant-Plattform.

### Automatisierung und GitOps

Im Rahmen der Konzeptarbeit definierte das Projektteam das GitOps-Betriebsmodell
der künftigen Plattform. Ein zentraler Bestandteil ist der kaskadierte Einsatz
von Argo CD: Eine übergeordnete Argo-CD-Instanz auf dem Infrastruktur-Cluster
steuert die Konfiguration von Argo-CD-Instanzen auf den Workload-Clustern. Diese
wiederum verwalten die Mandanten und ihre Applikationen. Dieser mehrstufige
Ansatz ermöglicht eine saubere Trennung zwischen Plattform- und
Applikationsebene und stellt sicher, dass Änderungen kontrolliert,
nachvollziehbar und vollständig automatisiert ausgerollt werden können.

### Observability und Connectivity

Das Projektteam definierte im Konzept einen konsistenten Ansatz für Monitoring,
Logging und Tracing. Auf Basis von Grafana Cloud wurde ein Observability-Design
ausgearbeitet, das sowohl eine klare Strukturierung nach Teams und Mandanten
ermöglicht. Zudem erarbeitete das Projektteam eine Konnektivitätsarchitektur,
die Cilium als CNI- und Gateway-API-Implementierung einsetzt und sich nahtlos in
das bestehende Netzwerkdesign auf Basis von F5 XC Cloud integriert. Diese
Architektur ermöglicht eine klare Trennung der Verantwortung zwischen dem
Plattform- und den Entwickler:innen-Teams.

### Identity, Security und Secrets

Ein weiterer Schwerpunkt der Konzeptarbeit lag auf den Themen Authentifizierung,
Autorisierung und Secrets-Verwaltung. Das Projektteam konzipierte ein
rollenbasiertes Zugriffsmodell auf Basis von Entra ID, das im Konzept
beschrieben und über Terraform und GitOps automatisierbar gestaltet ist. Darüber
hinaus enthält das Konzept den Vorschlag, OpenBao als zentralen Secret-Store zu
verwenden und diesen über den External Secrets Operator in die Plattform zu
integrieren.

### Bestellprozess und FinOps

Das Projektteam beschrieb im Konzept, wie ServiceNow als Ausgangspunkt für
Bereitstellungsprozesse genutzt werden und mit Crossplane kombiniert werden
kann. Zudem definierte das Team die künftige Integration von Billing- und
FinOps-Mechanismen auf Basis von IBM Cloudability, um eine transparente
Ressourcennutzung und Kostenweiterverrechnung sicherzustellen.

### Betrieb und Organisation

Neben den technischen Aspekten widmete sich das Projektteam der
organisatorischen Verankerung der Plattform. Das Projektteam erarbeitete ein
Betriebs- und Organisationsmodell, das verschiedene Ansätze für Betrieb und
Weiterentwicklung aufzeigt. Das Konzept beschreibt eine agile Vorgehensweise in
Product Increments mit klaren Verantwortlichkeiten und Entscheidungswegen. Es
legt damit die organisatorische Grundlage für eine nachhaltige Umsetzung und
Weiterentwicklung der künftigen Plattform und ihrer Services.

## Verwendete Technologien

- Google Kubernetes Engine
- Capsule
- Crossplane
- Argo CD
- Terraform
- Grafana Cloud
- Cilium
- Entra ID
- OpenBao
- External Secrets Operator
- Artifactory
