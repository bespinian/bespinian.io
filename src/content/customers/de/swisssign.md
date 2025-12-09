---
title: Migration von SwissID zu Kubernetes
company: SwissSign
logo: ../../../assets/customers/swisssign.svg
pubDate: 2021-09-21
results:
  - Produktionsbereitschaft aller Deployments bewertet
  - Prometheus Alerting zum Ops-Paging-System aufgebaut
  - Ops-Team in Prometheus und Grafana geschult
  - Migration zu unabhängigem Kubernetes ermöglicht
quote:
  "bespinian schloss sich uns während der letzten Phase der Migration an und
  konnte uns schnell dabei beraten und unterstützen, die verbleibenden Lücken in
  unserer Monitoring- und Alarming-Landschaft zu schliessen."
authorName: Placi Flury
authorTitle: Head of DevOps
authorImage: ../../../assets/customers/swisssign-placi.jpeg
featured: true
---

## Kunde

[SwissSign Group](https://www.swisssign-group.com/) ist der führende Schweizer
Trust Service Provider, dessen Angebote Zertifikate (SSL und E-Mail) und Managed
Public Key Infrastructure-Produkte sowie Identity-Services unter der Marke
SwissID umfassen.

Das Unternehmen hat seinen Hauptsitz in Glattbrugg, Zürich, und beschäftigt rund
100 Spezialisten.

## Hintergrund

Die SwissID-Lösung der SwissSign Group bietet einen einheitlichen und
vertrauenswürdigen Login für den öffentlichen Sektor und für private Unternehmen
in der Schweiz. Die Lösung wird von Regierungsstellen und Behörden sowie von
Versicherungen, Gesundheitsdienstleistern und anderen Einrichtungen,
einschliesslich der Schweizerischen Post und der Schweizerischen Bundesbahnen,
verwendet. Privatkunden, sogenannte Identity-Inhaber, können SwissID auch
verwenden, um rechtsgültige digitale Signaturen zu erstellen oder sicher auf
ihre elektronischen Patientenakten zuzugreifen.

## Projektziel

SwissSign Group war dabei, die gesamte SwissID-Applikationslandschaft von einer
bei einem ihrer Partner integrierten Infrastruktur in ein unabhängiges
Rechenzentrum zu migrieren. Während dieses Prozesses migrierten sie auch die
meisten ihrer Applikationen zu Kubernetes, mit dem Ziel, modernere
Deployment-Workflows zu ermöglichen sowie flexibler auf variierende Systemlast
reagieren zu können. Gleichzeitig mussten die hohen Sicherheitsstandards während
der Migration bewahrt werden.

## bespinians Rolle

Während der Migration identifizierte SwissSign drei Bereiche, in denen sie
bespinians Unterstützung benötigten

### Produktionsreife auf Kubernetes

bespinian wurde beauftragt, die Applikations-Deployments auf Kubernetes auf
Produktionsbereitschaft zu überprüfen. Der Zweck war festzustellen, ob
Komponenten in der Lage waren, angemessen auf Laständerungen zu reagieren und
Rolling Deployments zu unterstützen, korrekt ausfallen würden, Best Practices
spezifisch für die Verwendung von Containern und Kubernetes folgen würden und
noch Lücken im Monitoring-Setup aufwiesen. Um dieses Ziel zu erreichen, führte
bespinian zunächst eine Reihe automatisierter Checks auf der gesamten
Applikationslandschaft durch. Zusätzlich überprüfte bespinian manuell
spezifische Komponenten hinsichtlich des Setups der Container und Applikationen,
ihrer CI-Pipelines sowie ihres Deployments und Betriebs auf Kubernetes.

### Monitoring

SwissSign Group wünschte sich eine Verbesserung des Monitorings der
SwissID-Komponenten, die auf Kubernetes laufen, bevor die neue Infrastruktur in
Betrieb genommen wird, und bat bespinian, Lücken zu untersuchen und Lösungen zu
implementieren. Nach der Überprüfung der bestehenden Komponenten, die für
Monitoring und Alerting vorhanden waren, arbeitete bespinian unabhängig mit
verschiedenen Stakeholdern innerhalb des Unternehmens zusammen, um eine
Alerting-Pipeline vorzuschlagen und zu implementieren, die Alerts von Prometheus
an die Paging- und Alerting-Tools des Operations-Teams sendet. bespinian empfahl
und implementierte auch eine Lösung zum Scrapen von Komponenten, die nicht im
bestehenden Prometheus-Setup enthalten waren, und erstellte zusammen mit dem
SwissID Operations-Team erste Dashboards und Alerts.

### Training

bespinian wurde beauftragt sicherzustellen, dass das SwissID Operations-Team die
Deployments auf der neuen Infrastruktur nach der Inbetriebnahme erfolgreich
verwalten kann. Um dies zu erreichen, arbeitete bespinian mit dem
Operations-Team zusammen und führte seine Mitglieder in Prometheus und Grafana
ein, einschliesslich Prometheus-Metriktypen, die Query Language, Alerting Rules
und allgemeine Best Practices. bespinian stellte sicher, dass alle Änderungen am
System sowie alle neu eingeführten Prozesse dokumentiert wurden.

## Verwendete Technologien

- **Container-Plattform**: Kubernetes / Rancher
- **Git Hosting**: Prometheus / Grafana
- **CI/CD**: GitLab CI
