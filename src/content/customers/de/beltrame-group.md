---
title: Python Modernisierung
company: AFV Beltrame Group
logo: ../../../assets/customers/beltrame.svg
pubDate: 2026-01-22
results:
  - Über 800 Unittests zur Risikoreduktion bei Code-Änderungen
  - Migration auf die neueste Python-Version mit Dependency Management
  - Signifikante Reduzierung der Incidents nach Deployments
  - Proaktives Monitoring mit Prometheus, Grafana und Loki
quote:
  "Mit bespinian haben wir unser Legacy-MES-System abgesichert und stabilisiert,
  wodurch die betriebliche Kontinuität und eine klarere Governance gewährleistet
  wurden. Ihre Arbeit hat nicht nur die Release- und Monitoring-Prozesse
  gestärkt, sondern auch unser Verständnis der von der Applikation unterstützten
  Produktionsprozesse verbessert. Ein zuverlässiger und ergebnisorientierter
  Partner."
authorName: Martina Catozzo
authorTitle: Group IT Coordination
authorImage: ../../../assets/customers/beltrame-martina.jpeg
---

## Kunde

Die [AFV Beltrame Group](https://gruppobeltrame.com/en/), die in der Schweiz
über die
[Stahl Gerlafingen AG](https://gruppobeltrame.com/en/stahl-gerlafingen-ag/)
tätig ist, ist auf die Herstellung von Langstahlprodukten spezialisiert – in
erster Linie Bewehrungsstahl für Beton und Baustahl-Profile. Mit einer
Belegschaft von rund 2'900 Mitarbeitenden verfügt die Gruppe über eine jährliche
Produktionskapazität von rund 3 Millionen Tonnen und beliefert sowohl den
heimischen als auch den breiteren europäischen Markt.

Die Gruppe zeichnet sich durch ein Industriemodell aus, das auf dem Recycling
von Stahlschrott und fortschrittlichen Stahlherstellungsverfahren basiert, und
etabliert sich damit als grösster Produzent von Recycling-Stahl in der Schweiz.
Ihre Produkte werden in kritischen Anwendungen im Hochbau, in der
Infrastrukturentwicklung, im Maschinenbau, in der Automobilherstellung, im
Energiesektor, in der Öl- und Gasindustrie sowie in diversen industriellen
Anwendungen eingesetzt.

## Ausgangslage

Vor rund 15 Jahren entstand der Bedarf, Daten aus mehreren industriellen
Steuerungssystemen an einer zentralen Stelle zu sammeln und mit zusätzlichen
Betriebsdaten, wie Produktionsaufträgen aus ERP-Systemen, zu kombinieren. Zu
diesem Zweck wurde eine Python-basierte Webapplikation entwickelt, um Geräte und
Umsysteme zu verwalten und die Daten den Benutzenden zugänglich zu machen.
Später wurde die Software erweitert, um den Produktionsprozess zu unterstützen.
Im Jahr 2023 wurde bespinian beauftragt, die Applikation zu modernisieren,
betriebliche Unterstützung zu leisten und ein robustes Monitoring zu
implementieren.

## Projektziele

Das Ziel war es, die Software auf eine nachhaltige und wartbare Basis zu stellen
und einen zuverlässigen Betrieb zu gewährleisten. Zu den wichtigsten Aktivitäten
gehörten die Migration auf die neueste Python-Version, die Einführung eines
Dependency Managements, die Implementierung eines automatisierten
Deployment-Prozesses und die Einrichtung eines Monitorings. Darüber hinaus
sollten Unittests geschrieben werden, um die Zuverlässigkeit zu verbessern.

## Rolle von bespinian

### Betriebsunterstützung

bespinian unterstützt die IT-Abteilung beim Betrieb der Applikation und agiert
als Troubleshooter, wenn Probleme auftreten. Zudem wurden mehrere Change
Requests implementiert.

### Modernisierung der Applikation

Nach der Einführung von Git zur Versionsverwaltung haben wir über 800 Unittests
geschrieben, um das Risiko bei Code-Änderungen zu reduzieren. Diese Tests werden
nun vor jedem Deployment automatisch in einer GitLab Pipeline ausgeführt. Dies
hat die Anzahl der Incidents nach einem Deployment drastisch reduziert. Danach
konnten wir Python auf die neueste unterstützte Version migrieren und einzelne
Python-Dateien, teilweise mit über 6'000 Zeilen Code, in übersichtliche Module
aufteilen.

### Monitoring

Für die proaktive Überwachung der Applikation und ihrer Umgebung setzen wir die
Open-Source-Produkte Prometheus, Grafana und Loki ein. Anstatt auf Meldungen der
Benutzenden zu reagieren, können die IT und wir nun proaktiv agieren und
Probleme mittels übersichtlicher Dashboards und zentralem Logging untersuchen.
Zusätzlich haben wir für Prometheus einen OPC XML Exporter geschrieben, mit dem
wir PLCs (Maschinensteuerungen) überwachen können.

## Technologien

- **Versionsverwaltung**: GitLab
- **Back End**: Python
- **Monitoring**: Prometheus & Grafana
- **Logging**: Loki
- **Datenbank**: Microsoft SQL Server
- **Integrationssystem**: ERP
- **Industrielle Kommunikation**: OPC XML
