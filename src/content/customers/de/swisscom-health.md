---
title: Sicheres Service Mesh für Swisscom Health
company: Swisscom
logo: ../../../assets/customers/swisscom.svg
pubDate: 2021-05-26
results:
  - Ende-zu-Ende-Verschlüsselung über alle Microservices
  - Zero-Trust-Architektur mit Istio Service Mesh
  - Erhöhte Sicherheit durch Audit & Hardening
  - Team erreichte DevOps-Bereitschaft für Produktion
quote:
  "Mit bespinian erreichten wir schnell eine moderne Infrastruktur und Pipeline
  basierend auf Best Practices. Dies ermöglichte es uns, unsere internen
  Ressourcen auf die Weiterentwicklung unserer Applikation und die Bedürfnisse
  unserer Kunden zu fokussieren."
authorName: Federico Marmori
authorTitle: Head of Product Development
authorImage: ../../../assets/customers/swisscom-federico.jpeg
featured: true
---

## Kunde

[Swisscom Health](https://www.swisscom.ch/en/business/enterprise/offer/health.html)
bietet eine breite Palette von E-Health-ICT-Produkten und -Dienstleistungen an.
Dazu gehören Informationssysteme für Arztpraxen, Abrechnungssysteme,
PACS-Bildarchivierungssysteme und Connector-Suites für den Austausch
medizinischer Daten.

## Hintergrund

Die Applikationslandschaft von Swisscom Health ist als Microservice-Architektur
konzipiert. Aufgrund der hohen Sensibilität der verarbeiteten Patientendaten
unterlag die Lösung strengen Sicherheitsanforderungen und regelmässigen
Compliance-Zertifizierungen. Zu den wichtigsten Anforderungen gehörten die
Ende-zu-Ende-Verschlüsselung aller Daten, einschliesslich des Datenverkehrs
zwischen den einzelnen Microservices, sowie strikte Trennung der Mandanten und
starke gegenseitige Authentifizierung zwischen allen Microservices. Der
Datenverkehr, der die Applikation betritt oder verlässt, musste ebenfalls
gesichert werden, was zusätzliche Herausforderungen für die Plattform
darstellte.

## Projektziel

Das Hauptziel des Projekts war die Einführung einer technologischen Lösung, die
es Swisscom Health ermöglichen würde, Ende-zu-Ende-Verschlüsselung, starke
Service-Identität, Mandantentrennung und Traffic-Routing effizient und
skalierbar zu verwalten. Zusätzlich musste das Sicherheits-Setup der
verschiedenen Applikationen überprüft, die Ergebnisse priorisiert und je nach
Schweregrad und Dringlichkeit behoben werden. Nicht alle Workloads konnten in
Containern auf Kubernetes ausgeführt werden. Daher musste auch ein separater
Automatisierungs- und Monitoring-Stack für diese Art von Workloads implementiert
werden. Nicht zuletzt musste das Swisscom Health Team befähigt werden, die neu
implementierte Infrastruktur zu betreiben und dabei eine DevOps-Kultur zu
übernehmen.

## bespinians Rolle

bespinian spielte eine kritische Rolle beim Erreichen der Projektziele durch
umfangreiche Beiträge, die sich auf die Bereitstellung eines robusten Service
Mesh, die Implementierung einer Zero-Trust-Architektur, Sicherheitsaudits und
Hardening sowie Training und Best Practices für Kubernetes und Istio
konzentrierten.

### Deployment des Service Mesh

Wir automatisierten die Konfiguration und das Deployment des Istio Service Mesh
mit Helm. Dies umfasste die Anpassung der Konfiguration von Istio an die
Bedürfnisse von Swisscom Health sowie die deklarative Verwaltung dieser
Konfiguration über mehrere Umgebungen hinweg. Besondere Aufmerksamkeit wurde
Services gewidmet, die ausserhalb von Kubernetes gehostet werden und daher auf
dedizierte Weise in das Service Mesh integriert werden mussten, entweder durch
Platzierung eines Istio-Proxys auf der jeweiligen VM oder durch Integration via
Egress- und Ingress-Mutual-TLS-Verbindungen. Ein weiterer wichtiger Aspekt war
das Release Management von Istio und die Sicherstellung, dass die Service Mesh
Control Plane und Sidecars aktualisiert werden konnten, ohne die
Gesamtapplikation zu unterbrechen.

### Zero-Trust-Architektur

Wir waren verantwortlich für die Implementierung einer Zero-Trust-Architektur
basierend auf dem Istio Service Mesh. Dies umfasste die Einführung von Mutual
TLS zwischen allen Services im Mesh und damit die Realisierung von
Ende-zu-Ende-Verschlüsselung und einer starken Service-Identität. Basierend auf
der starken Service-Identität wurden dann feinkörnige Traffic-Policies
konzipiert und implementiert, um sicherzustellen, dass unverbundene Services
verschiedener Mandanten nicht miteinander kommunizieren können. Darüber hinaus
stellen solche Traffic-Policies sicher, dass laterale Bewegungen eines
potenziellen Angreifers unmöglich gemacht werden und der Schadenspfad im Falle
eines Sicherheitsvorfalls auf den betroffenen Service und Mandanten begrenzt
wird. Ein weiterer wichtiger Teil des Zero-Trust-Setups war das zentrale Secret
Management mit HashiCorp Vault. Dies stellt sicher, dass sensible Daten wie
Datenbankpasswörter und API-Keys nicht in der Control Plane von Kubernetes
landen, sondern nur im Speicher der Microservices gehandhabt werden, die sie
benötigen.

### Sicherheitsaudit und Hardening

Eine weitere Aufgabe war die Durchführung eines eingehenden Sicherheitsaudits,
um potenzielle Risiken wie Schwachstellen im Cluster-Setup, Lücken bei der
Namespace- und Mandantentrennung sowie Schwachstellen bei Container-Images zu
adressieren. Jede entdeckte Schwachstelle wurde hinsichtlich des Gesamtrisikos
bewertet, in eine Hardening-Massnahme umgewandelt und in der Planung des Kunden
priorisiert. Die resultierenden Hardening-Massnahmen verbesserten die
Gesamtsicherheit der Workload-Architektur von Swisscom Health erheblich.

### Kubernetes-Training und Best Practices

bespinian befähigte Swisscom Health, eine Microservice-Architektur in Kubernetes
und Istio Service Mesh zu deployen und zu betreiben. Dies ermöglichte dem Team,
DevOps-Bereitschaft zu erreichen und das Vertrauen zu gewinnen, die migrierten
Applikationen in Produktion zu betreiben.

### Infrastruktur-Bereitstellung as Code

Eine zusätzliche Verantwortung war die Ermöglichung der automatisierten
Bereitstellung von VM-basierten Services und Netzwerkkomponenten as Code in
Azure. Dies bedeutete die Automatisierung der Erstellung der VMs und Ressourcen
selbst sowie die Implementierung eines automatisierten und deklarativen
Konfigurationsmanagements mit Ansible und Ansible Tower. Dies ermöglichte
Swisscom Health, sich von manuell erstellten Konfigurationen zu lösen und eine
vollständig reproduzierbare Bereitstellung ihrer VM-basierten Workloads und
Netzwerkkomponenten zu erreichen.

### Gesundheits-Monitoring

Parallel zur automatisierten Bereitstellung von VM-basierten Services
automatisierten wir das Setup des Gesundheits-Monitorings für diese VMs und
Services. Dies stellte kontinuierliche Sichtbarkeit der Gesundheit und
Performance des Systems sowie rechtzeitige Benachrichtigung des Teams im Falle
von Ausfällen oder Unregelmässigkeiten in Metriken oder Logs sicher. Dies
wiederum ermöglichte es Swisscom Health, die VM-basierten Services mit der
gleichen Effizienz und Stabilität wie die Kubernetes-basierten zu betreiben.

## Verwendete Technologien

- **Infrastruktur**: Azure
- **Infrastructure as Code**: Terraform
- **Container-Plattform**: Kubernetes (PKS)
- **Continuous Deployment**: Argo CD mit Helm und Kustomize
- **Service Mesh**: Istio / Kiali
- **Monitoring**: Prometheus / Grafana
- **Infrastruktur-Konfiguration**: Ansible / Ansible Tower
