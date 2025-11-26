---
title: Modernisierung der 20 Minuten Applikation
company: 20 Minuten
logo: ../../../assets/customers/20-minuten.svg
date: 2022-03-11
results:
  - Migration von über 1 Million täglichen Benutzern ohne Ausfallzeit
  - Modernisierung der fast 20 Jahre alten Legacy-Infrastruktur
  - Kostenoptimierung durch intelligentes Caching
  - Migration von Perl zu Go und Next.js Stack
quote:
  "Die Zusammenarbeit mit bespinian war stets sehr gut. Dank ihrer Expertise
  leistete bespinian einen wesentlichen Beitrag zur erfolgreichen Migration der
  digitalen Produkte von 20 Minuten auf eine neue und moderne Infrastruktur."
authorName: Manuel Sutter
authorTitle: Product Owner
authorImage: ../../../assets/customers/20minuten-manuel.jpeg
---

## Kunde

[20 Minuten](https://www.20min.ch/) ist die reichweitenstärkste Medienmarke der
Schweiz. Wie das Medienhaus Tamedia und der Werbevermarkter Goldbach gehört sie
zur TX Group. 20 Minuten zeichnet sich durch seine Reichweite in allen
Sprachregionen und den Story-Mix aus News, Unterhaltung und Inspiration aus. Das
20 Minuten Team war und ist ein wichtiger Partner für bespinian bei der
Zusammenarbeit im Rahmen der Migration digitaler Produkte auf eine neue
Infrastruktur sowie bei weiteren Projekten im Kontext von OAuth2,
Cloudification, Containerisierung und Modernisierung von Software.

## Hintergrund

20 Minuten ist die grösste Pendlerzeitung der Schweiz und eine der
meistbesuchten Websites in der Schweiz. Es handelt sich um ein Medienportal mit
täglichen Nachrichten, Unterhaltungs- und Inspirationsartikeln. Im Jahr 2019
hatte 20 Minuten eine grosse Migration seiner Applikationen weg von der
Legacy-Infrastruktur und dem Applikationscode geplant, die teilweise fast 20
Jahre alt waren. Dabei ging es um die Migration bestehender VMs auf eine moderne
Kubernetes-basierte Container-Infrastruktur auf AWS. Das Backend sollte von Perl
zu Go migriert und containerisiert werden. Das Frontend wurde ebenfalls von Perl
gerendert und sollte in eine moderne Next.js-Applikation umgewandelt werden. 20
Minuten hat täglich über eine Million Benutzer. Dies macht eine Migration ohne
Ausfallzeit besonders herausfordernd. Zudem war es wichtig, die Betriebskosten
trotz dieser grossen Last in handhabbaren Grenzen zu halten.

## Projektziel

Das Ziel des Projekts war die Modernisierung des Setups der Applikation. Die
Legacy-Komponenten und der bisherige Code sollten ersetzt werden, um das System
stabiler und kosteneffizienter zu machen. AWS wurde als Infrastruktur-Anbieter
gewählt und die Applikation sollte in Go, Node.js und React Microservices auf
einem EKS (Kubernetes) Cluster neu deployed werden.

## bespinians Rolle

bespinian hatte eine Schlüsselrolle in den folgenden Themen bezüglich der
Applikationsmigration im Sinne von Refactoring / Re-Architecting aus den 6
Migrationsstrategien von AWS.

### Infrastruktur auf AWS

bespinian war massgeblich an der Bereitstellung der Infrastruktur auf AWS
beteiligt. Wir spielten eine Schlüsselrolle beim Schreiben und Anwenden der
entsprechenden Terraform-Module und beim Einrichten der Kubernetes-Cluster, auf
denen die verschiedenen Microservices gehostet werden. Ein wichtiger Teil davon
war auch die korrekte Konfiguration der Caching-Schicht (Amazon CloudFront), um
die Kosten angesichts der grossen Anzahl gleichzeitiger Benutzer von 20 Minuten
handhabbar zu halten. bespinian erledigte einen grossen Teil der technischen
Implementierung und Automatisierung, aber auch die Kommunikation zwischen den
Entwicklungs- und Infrastruktur-Teams.

### Kubernetes und Container-Konfiguration

Eine spannende Aufgabe war die Konfiguration des Kubernetes-Clusters (auf Amazon
EKS). Die Architektur sowie deren Implementierung tragen noch heute die
Handschrift von bespinian. Der Hauptfokus dieser Aufgabe lag auf den notwendigen
architektonischen Entscheidungen und der Implementierung der Bereitstellung und
Konfiguration des Clusters via Terraform. Anschliessend lag ein weiterer
Schwerpunkt der Aufgabe auf der Automatisierung der Deployments der einzelnen
Services via Helm und GitHub Actions. bespinian spielte in all diesen Bereichen
eine Schlüsselrolle. Wir spielten auch eine wichtige Rolle bei der Koordination
der einzelnen Teams und Applikationen im Sinne einer DevOps-Migration.

### Applikationsentwicklung

Die verschiedenen Microservices des Backends und des Frontends wurden von
bespinian mitgestaltet, sowohl architektonisch als auch in Bezug auf die
Softwareentwicklung. Als erfahrene Go-Entwickler konnten wir zum Design des
Applikationscodes selbst beitragen, aber auch zu dessen Automatisierung,
Deployment und Kommunikation zwischen den Services.

### Monitoring und Alerting

Das Monitoring der Applikationen im Sinne einer DevOps-Transformation war
besonders in der Anfangsphase nach der Migration sehr wichtig. Eine grosse
Anzahl von Benutzern wurde auf die neuen Applikationen migriert und produzierte
teilweise Zugriffsmuster, die schwer vorherzusagen waren. Diese Zugriffsmuster
mussten erst analysiert und verstanden werden, um die entsprechenden Ressourcen
bereitzustellen und die entsprechenden Fixes für Performance-Probleme und Bugs
zu produzieren. Prometheus und Grafana spielten dabei eine wichtige Rolle, um
einen Überblick darüber zu bekommen, was passiert und wo welche Anfragen
gestellt werden.

### Caching

Ein wichtiger Teil des Beitrags von bespinian war die Konfiguration der
CloudFront Caching-Schicht. Aufgrund der hohen Anzahl von Anfragen, die
grösstenteils Read-Only sind, konnten wir durch clevere Nutzung des Caches sehr
grosse monatliche Beiträge einsparen. Dies ermöglichte es, die Container in
relativ kleinen Zahlen von Replicas zu betreiben. Die optimale Konfiguration des
Caches mit so vielen unterschiedlichen Zugriffsmustern und Clients (20 Minuten
Website, verschiedene mobile Applikationen und CMS) war eine grosse
Herausforderung. bespinian war dafür verantwortlich, diese Herausforderung
anzugehen und dem 20 Minuten Team eine Lösung bereitzustellen.

## Verwendete Technologien

- **Infrastruktur**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Container-Plattform**: Kubernetes
- **Monitoring**: Prometheus / Grafana
- **Deployment**: Helm
- **Backend**: Go
- **Frontend**: React (Next.js)
- **DB**: MongoDB
- **DB**: PostgreSQL
- **CI/CD**: GitHub Actions
