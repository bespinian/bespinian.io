---
title: Automatisierte Kubernetes-Infrastruktur auf Azure
company: Zeilenwerk
logo: ../../../assets/customers/zeilenwerk.svg
pubDate: 2025-11-18
results:
  - Infrastruktur von kostspieligem, komplexem Setup vereinfacht
  - Provisionierung mit OpenTofu und Helm automatisiert
  - Betriebsaufwand und Kosten reduziert
  - Hands-off-Deployment über Anwendungen hinweg ermöglicht
quote:
  "bespinian hat uns geholfen, eine Vision für ein modernes, standardisiertes
  und deklaratives Infrastruktur-Setup mit starkem Fokus auf Kubernetes und
  Open-Source-Software zu gestalten und zu realisieren"
authorName: Cyril Nusko
authorTitle: Software Architect
authorImage: ../../../assets/customers/zeilenwerk-cyril.jpg
---

## Kunde

[Zeilenwerk](https://www.zeilenwerk.ch/) entwickelt massgeschneiderte Software
und berät Organisationen aus dem privaten und öffentlichen Sektor bei der
nachhaltigen und menschenzentrierten Digitalisierung ihrer Prozesse.

## Hintergrund

Das bestehende Infrastruktur-Setup von Zeilenwerk war über mehrere Dienstleister
und Technologien verteilt. Als immer mehr und grössere Anwendungen realisiert
wurden, wurde es mühsam und kostspielig, diese Infrastruktur zu warten. Die
manuellen Prozesse und komplexen Konfigurationen erforderten erhebliche Zeit und
Ressourcen und lenkten den Fokus von ihrem Kerngeschäft der Softwareentwicklung
ab. Es wurde zunehmend klar, dass der aktuelle Ansatz langfristig nicht
nachhaltig war.

## Projektziel

Das Hauptziel war es, die Infrastruktur von Zeilenwerk zu modernisieren und zu
standardisieren, um Kosten und operative Komplexität zu reduzieren. Ein Ziel war
es, ein deklaratives, automatisiertes Setup mit Open-Source-Software zu
etablieren, das es dem Team ermöglichen würde, mehrere Anwendungen effizient
bereitzustellen und zu verwalten. Ein weiteres Ziel war die Standardisierung der
Werkzeuge mit einem klaren Fokus auf das Kubernetes-Ökosystem, um die
Komplexität zu reduzieren und die Unabhängigkeit von Dienstleistern zu erhöhen.
Zusammen würde dies es Zeilenwerk ermöglichen, ihre Ressourcen auf die
Wertschöpfung für ihre Kunden zu konzentrieren.

## bespinians Rolle

bespinian spielte eine Schlüsselrolle bei der Transformation der Infrastruktur
von Zeilenwerk durch folgende Beiträge:

### Infrastruktur-Automatisierung mit OpenTofu

Wir automatisierten die Provisionierung der Azure Kubernetes Service
(AKS)-Infrastruktur mit OpenTofu (einem Open-Source-Terraform-Fork). Dies
umfasste die Definition aller Cloud-Ressourcen als Code, was reproduzierbare und
konsistente Deployments über Umgebungen hinweg ermöglicht. Der
Infrastructure-as-Code-Ansatz eliminierte manuelle Konfigurationsfehler und
reduzierte die Zeit für die Bereitstellung neuer Umgebungen erheblich.

### Anwendungs-Deployment mit Helm

Wir implementierten Helm-basierte Deployment-Workflows für die Anwendungen von
Zeilenwerk und erstellten wiederverwendbare Charts sowie etablierte Best
Practices für das Anwendungs-Lifecycle-Management. Dies bot einen
standardisierten, deklarativen Ansatz für die Bereitstellung von Anwendungen auf
Kubernetes und erleichterte die Verwaltung von Konfigurationen über verschiedene
Umgebungen und Anwendungen hinweg.

### Architektur-Vereinfachung

Wir arbeiteten eng mit Zeilenwerk zusammen, um ihre Gesamtarchitektur zu
vereinfachen und Möglichkeiten zur Reduzierung der Komplexität bei
gleichzeitiger Aufrechterhaltung der Funktionalität zu identifizieren. Dies
umfasste die Konsolidierung redundanter Komponenten und die Etablierung einer
klaren Trennung der Verantwortlichkeiten zwischen Infrastruktur- und
Anwendungsschichten.

### Wissenstransfer und Best Practices

Während des gesamten Projekts stellten wir sicher, dass das Team von Zeilenwerk
das Wissen und die Zuversicht erlangte, die neue Infrastruktur unabhängig zu
betreiben. Dies umfasste Schulungen zu Kubernetes, OpenTofu und Helm Best
Practices sowie die Erstellung von Dokumentation und operativen Richtlinien für
die laufende Wartung.

## Verwendete Technologien

- **Infrastruktur**: Azure
- **Infrastructure as Code**: OpenTofu
- **Container-Plattform**: Kubernetes (AKS)
- **Deployment**: Helm
- **Monitoring**: Grafana
