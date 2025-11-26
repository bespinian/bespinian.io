---
title: Cloudifizierung der Flughafen-Software AERO
company: Xovis
logo: ../../../assets/customers/xovis.svg
pubDate: 2024-01-10
results:
  - Erfolgreicher Launch der AERO SaaS-Plattform
  - Vollständig automatisierte Multi-Region-Bereitstellung
  - Zero-Downtime für Stateful Workloads
  - DevOps-Team für Produktionsbetrieb befähigt
quote:
  "bespinians Expertise und Hands-On-Fähigkeiten in allen Cloud-Native-Bereichen
  waren der Schlüssel dafür, unsere Teams zu befähigen, unser
  geschäftskritisches Ziel zu erreichen, unsere Flughafen-Software auf ein
  SaaS-Modell zu erweitern und AERO erfolgreich zu launchen."
authorName: Jörg Wagner
authorTitle: CTO
authorImage: ../../../assets/customers/xovis-joerg.jpeg
---

## Kunde

[Xovis](https://www.xovis.com/) ist ein internationaler Anbieter von
intelligenten People-Flow-Management-Lösungen für Flughäfen, Einzelhandel,
Transport und Smart Buildings. Das Unternehmen entwickelt die 3D-Sensoren für
die Montage auf Kundenstandorten sowie die Software, die es Kunden ermöglicht,
People-Flow-Daten zu analysieren und darauf zu reagieren. Der Hauptsitz von
Xovis befindet sich in Zollikofen, Schweiz, mit mehr als 130 Mitarbeitenden, die
für das Unternehmen in der ganzen Schweiz und den USA arbeiten.

## Hintergrund

Die Software für Xovis-Sensoren ermöglicht Flughäfen weltweit erfolgreich,
People-Flow-Herausforderungen zu lösen, wie die Minimierung von Warteschlangen,
die Optimierung von Öffnungszeiten und Anzahl von Lanes, Counters, Desks, Kiosks
und Self-Service-Gepäckabgaben. Da die Sensoren physisch auf Kundenstandorten
installiert sind, war das einfachste Setup in der Vergangenheit auch, die
Flughafen-Software vor Ort zu betreiben, wobei Xovis Second- und
Third-Level-Support für die Teams ihrer Kunden bereitstellte. Die Nachfrage nach
einem vollständig verwalteten Service wächst jedoch stetig unter Xovis'
Flughafen-Kunden. Darüber hinaus erzeugt die Verwaltung von Installationen vor
Ort einen erheblichen betrieblichen Overhead, den viele Kunden in Zukunft
vermeiden möchten. Um diesen Anforderungen und Herausforderungen zu begegnen,
entschied sich Xovis, AERO zu launchen, eine SaaS-Version ihrer
Flughafen-Software, mit Sensoren, die auf Kundenstandorten installiert sind, und
der Software, die zentral von einem DevOps-Team bei Xovis betrieben wird.

## Projektziel

Das Ziel des Projekts war die Durchführung des Übergangs der
Xovis-Flughafen-Software in ein SaaS-Modell, das auf viele Flughafen-Kunden
skalieren kann. Dies bedeutete, dass die erforderliche Azure-Infrastruktur für
den Betrieb des Produkts sowie das Produkt selbst auf vollständig automatisierte
Weise bereitgestellt und betrieben werden mussten. Darüber hinaus mussten alle
Komponenten der Software in der Lage sein, in einer Cloud-Plattform zu laufen
und automatisierte Zero-Downtime-Wartung sowie elastisches Load Balancing zu
unterstützen. Da das Ziel-SaaS-Produkt multi-tenanted ist, mussten alle
Sicherheitsmassnahmen für den Cloud-Betrieb gehärtet werden. Darüber hinaus
mussten die Entwicklungs- und Betriebsteams von Xovis befähigt werden, die
DevOps-Verantwortung für das SaaS-Produkt zu übernehmen.

## bespinians Rolle

bespinian spielte eine Schlüsselrolle in den folgenden Bereichen:

### Cloud-Native-Coaching

Vor der Cloudifizierung musste Xovis sicherstellen, dass alle Mitglieder ihrer
Engineering-Teams auf dem gleichen Wissensstand waren, der für den Aufbau, die
Automatisierung und Wartung von Applikationen auf Cloud-Native-Weise
erforderlich ist. bespinian arbeitete in einer Reihe interaktiver Workshops mit
den Engineering-Teams zusammen, um sicherzustellen, dass die Leitprinzipien der
Cloud-Native-Softwarearchitektur und des Betriebs sowie die technischen
Besonderheiten des Deployments von Applikationen auf Kubernetes allen
Teammitgliedern bekannt waren.

### Infrastruktur-Automatisierung

Automatisierung von Tag eins an war für Xovis von grösster Bedeutung, da das
SaaS-Produkt vielen Kunden-Flughäfen auf der ganzen Welt zur Verfügung gestellt
werden musste. Dies bedeutete, dass der identische Azure-Infrastruktur-Stack auf
Abruf in verschiedenen Azure-Regionen bereitgestellt werden musste, um die
Latenz von Kundenstandorten zu reduzieren. bespinian unterstützte Xovis beim
Design und der Implementierung geeigneter Terraform-Module und Azure
DevOps-Pipelines, um diesen Bereitstellungsprozess zu automatisieren.

### Kubernetes-Automatisierung

Andererseits musste in jeder gegebenen Region eine beliebige Anzahl von
Kundenstandorten automatisch als eine Sammlung von Kubernetes-Deployments
bereitgestellt werden. bespinian arbeitete mit dem Xovis-Team zusammen, um einen
GitOps-Prozess basierend auf Helm und Argo CD zu entwerfen und zu
implementieren, um die Bereitstellung von Kundenstandorten vollständig zu
automatisieren, bis zu dem Punkt, an dem ein Kunde in einem Hands-Off-Prozess
onboarded werden konnte, der vom Service-Delivery-Team ausgelöst wird.

### Applikations-Containerisierung

Während Xovis bereits Container für Entwicklungszwecke verwendete, bedeutete der
Übergang zu einem Cloud-Native-Ansatz, dass Container zu den primären Artefakten
des gesamten Entwicklungsprozesses werden mussten. bespinian arbeitete mit dem
Xovis-Team zusammen, um bestehende Build-Pipelines in Multistage-Image-Builds zu
transformieren, was zu maximal effizienten Runtime-Images für alle am
SaaS-Produkt beteiligten Komponenten führte.

### Zero-Downtime-Architektur

Da viele Komponenten der Xovis-Flughafen-Software Stateful-Algorithmen
ausführen, die auf Sensoreingaben über die Zeit basieren, stellte es eine
zusätzliche Herausforderung dar, diese Komponenten für Zero-Downtime-Upgrades
und -Wartung fähig zu machen, die nicht von Kubernetes adressiert wurde.
bespinian beriet das Xovis-Team beim Design eines Stateful-Load-Balancing- und
Failover-Schemas basierend auf dem HashiCorp Consul KV Store und Sessions, um
sicherzustellen, dass einzelne Replicas von Komponenten einen Konsens darüber
erreichen konnten, welche Sensoren zu verarbeiten sind, und im Falle von
Ausfällen während der Sensorverarbeitung sofort ersetzt werden konnten.

### Sicherheits-Hardening

Das Betreiben vieler Kunden auf derselben Infrastruktur stellte Xovis vor neue
Sicherheitsthemen, die im On-Premise-Setting nicht relevant waren. Strikte
Trennung von Kunden-Tenants im SaaS-Produkt und sichere Handhabung von Secrets
und anderen sensiblen Daten mussten adressiert werden. bespinian beriet und
unterstützte Xovis bei der Implementierung von Sicherheits-Hardening-Massnahmen
in Azure sowie bei der Integration von HashiCorp Vault mit allen Komponenten des
SaaS-Produkts, um eine sichere zentralisierte Verwaltung von Secrets zu
ermöglichen.

### Monitoring und Alerting

Beim Übergang zu einem SaaS-Modell musste Xovis sicherstellen, dass ihr
DevOps-Team jederzeit über die Gesundheit der cloudbasierten Infrastruktur und
Softwarekomponenten informiert bleibt. Darüber hinaus benötigte das Team die
Fähigkeit, schnell auf Vorfälle zu reagieren, bevor sie Flughafen-Kunden auf der
ganzen Welt beeinträchtigen. bespinian unterstützte und beriet Xovis bei der
Implementierung eines umfassenden Cloud-Native-Monitoring- und Alerting-Setups
basierend auf verschiedenen Azure-Logging- und Monitoring-Tools und -Funktionen.

## Verwendete Technologien

- **Infrastruktur**: Azure (AKS, Azure SQL, Event Hubs, Log Analytics etc.)
- **Infrastructure as Code**: Terraform
- **Container-Plattform**: Kubernetes
- **Deployment**: Argo CD / Helm
- **Secrets Management**: HashiCorp Vault
- **Connectivity**: HashiCorp Consul
- **Backend**: .NET / Java
- **CI/CD**: Azure DevOps
