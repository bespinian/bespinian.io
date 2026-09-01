---
title: Coaching eines SaaS-Plattform-Teams zu Kubernetes und GitOps
company: M&S Software Engineering
logo: ../../../assets/customers/m-s.svg
pubDate: 2026-08-10
results:
  - Klare Architekturentscheidungen für AKS und Azure
  - GitOps als Deployment-Standard etabliert
  - Umfassende Observability mit dem LGTM-Stack
  - Engineering-Teams zum eigenständigen Betrieb befähigt
quote: "TODO: freigegebenes Kundenzitat vor der Veröffentlichung einholen."
authorName: TODO
authorTitle: TODO
draft: true
---

## Kunde

Die [M&S Software Engineering AG](https://www.m-s.ch/) ist ein Schweizer
Softwareunternehmen, gegründet 1990 und im Besitz der Mitarbeitenden. Rund 180
Personen arbeiten in Bern Wankdorf und Schlieren. M&S baut die führenden
Schweizer Lösungen für Sozialversicherungen: AKIS für die erste Säule und
MSPension für die zweite Säule. Mehr als die Hälfte aller Schweizer
Ausgleichskassen nutzt AKIS. Mit MSPension arbeiten rund 250
Vorsorgeeinrichtungen mit etwa 600'000 Versicherten.

## Ausgangslage

Software für Sozialversicherungen verarbeitet sehr sensible Personendaten. Sie
muss über Jahrzehnte laufen, korrekt rechnen und die Schweizer Vorgaben
erfüllen. Gleichzeitig wollen die Kunden von M&S ihre Lösungen immer öfter als
Service beziehen, statt sie selbst zu betreiben.

Deshalb bringt M&S seine Produkte in die Cloud: auf Microsoft Azure, mit Azure
Kubernetes Service (AKS) als Plattform und Terraform für die Infrastruktur. Die
Teams von M&S kennen ihre Domäne genau und bauen seit Jahren robuste Software.
Für den Weg in die Cloud wollten sie einen erfahrenen Sparringpartner -
jemanden, der hilft, die wichtigen Entscheidungen früh richtig zu treffen und
nicht erst in der Produktion.

## Projektziel

M&S soll eine Cloud-Plattform bekommen, welche die eigenen Teams verstehen und
selbst weiterentwickeln können. Dazu gehören ein durchdachtes Kubernetes-Setup
auf Azure, Infrastruktur und Deployments als Code, ein Deployment-Prozess nach
GitOps-Prinzipien und Observability, die zeigt, was die Systeme tun. Wichtig ist
auch: Das Wissen dahinter bleibt bei M&S. bespinian coacht und befähigt - wir
bauen keine Blackbox, die danach niemand mehr versteht.

## bespinians Rolle

### Kubernetes- und Azure-Architektur

Wir gehen mit den Engineers von M&S die grossen Fragen einer AKS-Plattform
durch: Anzahl und Grösse der Cluster, Trennung von Umgebungen und Mandanten,
Networking und Ingress, Workload Identity und das Zusammenspiel mit den übrigen
Azure-Services. Zu jeder Entscheidung besprechen wir die Vor- und Nachteile. So
kann das Team sie später mit dem ganzen Kontext im Kopf anpassen.

### Infrastructure as Code mit Terraform

Alle Azure-Ressourcen sind in Terraform beschrieben. Wir beraten zu
Modulstruktur und State-Management und dazu, wie Umgebungen reproduzierbar und
untereinander gleich bleiben. Der Code soll verständlich sein und mit wenigen,
klaren Mustern arbeiten - nicht möglichst abstrakt.

### GitOps und Deployment-Workflows

Wir führen mit den Teams GitOps als Standard für Deployments ein: Git
beschreibt, wie die Plattform aussehen soll. Eine Automatik gleicht den Cluster
laufend damit ab, statt dass jemand von Hand eingreift. Applikationscode und
Deployment-Konfiguration bleiben getrennt. So sind alle Änderungen
nachvollziehbar, überprüfbar und rückgängig zu machen - in einer regulierten
Branche ein grosser Vorteil.

### Observability mit dem LGTM-Stack

Für Monitoring nutzt M&S den Open-Source-LGTM-Stack: Loki für Logs, Grafana für
die Visualisierung, Tempo für Traces und Mimir mit Prometheus für Metriken. Wir
helfen beim Aufbau - was gemessen wird, wie Metriken und Labels benannt sind,
wie Speicherdauer und Kosten im Rahmen bleiben und wie Dashboards und Alerts
entstehen, auf die das Team wirklich reagiert.

### DevOps-Praktiken und Arbeitsweise

Cloud-native Technik zahlt sich erst aus, wenn die Arbeitsweise dazu passt. In
den Workshops geht es deshalb auch um die Organisation: wer für Entwicklung und
Betrieb zuständig ist, wie Pikett und Incident Handling mit Kubernetes laufen
und wie die Arbeit an der Plattform für ein Team machbar bleibt, das
gleichzeitig eine Produkt-Roadmap liefern muss.

### Workshops und laufende Q&A

Die Zusammenarbeit besteht aus interaktiven Workshops und regelmässigen
Q&A-Sessions. Ein Workshop nimmt sich ein Thema vor und endet mit konkreten
Entscheidungen. In den Q&A-Sessions bringen die Engineers von M&S ein, woran sie
gerade arbeiten: ein Terraform-Modul, das jemand reviewen soll, eine Frage zu
Kubernetes, eine zweite Meinung zu einer Idee. So läuft der Wissenstransfer über
die ganze Zeit und nicht nur am Anfang.

## Verwendete Technologien

- **Infrastruktur**: Microsoft Azure
- **Container-Plattform**: Azure Kubernetes Service (AKS) / Kubernetes
- **Infrastructure as Code**: Terraform
- **Deployment**: GitOps
- **Monitoring**: Grafana / Mimir / Prometheus
- **Logging**: Loki
- **Tracing**: Tempo
