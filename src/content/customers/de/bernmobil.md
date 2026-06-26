---
title: Migration auf OpenShift
company: BERNMOBIL
logo: ../../../assets/customers/bernmobil.svg
pubDate: 2024-02-12
results:
  - Betrieb von Click-Ops auf GitOps umgestellt
  - Helm Charts für Shared Info Platform konzipiert
  - Wissenstransfer an BERNMOBIL-Team durchgeführt
  - Reproduzierbare, skalierbare Deployments etabliert
quote:
  "Für die Shared Info Platform erarbeitete bespinian eine saubere
  Helm-Chart-Struktur, die eine konsistente Konfiguration über verschiedene
  Umgebungen hinweg ermöglicht."
authorName: Arne Heimann
authorTitle: Leiter IT-Services Kundeninformation
authorImage: ../../../assets/customers/bernmobil-arne.jpeg
---

## Kunde

[BERNMOBIL](https://www.bernmobil.ch/) verbindet seit 1871 die Menschen in und
um die Stadt Bern mit ihren roten Trams und Bussen. Mit der "Shared Info
Platform" betreibt BERNMOBIL zusätzlich eine Plattform für den Austausch von
Echtzeit- und Ereignisinformationen im öffentlichen Verkehr. Zahlreiche
Verkehrsunternehmen in der Schweiz zählen zu ihren Kunden.

## Hintergrund

BERNMOBIL betreibt einen OpenShift Cluster im eigenen Rechenzentrum und stellt
darauf diverse Applikationen für den internen und externen Gebrauch zur
Verfügung. Bisher wurden Konfigurationsänderungen manuell über das OpenShift UI
vorgenommen – ein Ansatz, der mit wachsender Komplexität nicht skaliert.

## Projektziel

Das Ziel war die Skalierung des Betriebs: Weg von Click-Ops, hin zu einem
automatisierten, reproduzierbaren Deployment-Prozess mit Argo CD.

## bespinians Rolle

### Unterstützung Migration öV Plus Website

bespinian begleitete das BERNMOBIL-Team bei der Migration der öV Plus Website
auf die OpenShift-Plattform. Dabei stand der Wissenstransfer im Vordergrund –
durch aktive Mitarbeit im Projekt lernte das Team die Best Practices für
containerisierte Deployments auf OpenShift direkt in der Praxis kennen.

### Konzeption GitOps Abfahrten-Service

Für die Shared Info Platform erarbeitete bespinian eine saubere
Helm-Chart-Struktur, die eine konsistente Konfiguration über verschiedene
Umgebungen hinweg ermöglicht. Zusätzlich führte bespinian Argo CD als
GitOps-Tool ein, sodass Deployments nun deklarativ in Git verwaltet und
automatisch auf den Cluster synchronisiert werden.

## Verwendete Technologien

- **Container-Plattform**: OpenShift
- **Package Management**: Helm
- **GitOps**: Argo CD
