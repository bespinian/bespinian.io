---
title:
  "OpenBao: Wann die Open-Source-Alternative zu Vault die richtige Wahl ist"
author: Paulina Grochal
pubDate: 2026-02-06
tags:
  [
    "openbao",
    "secrets-management",
    "hashicorp-vault",
    "cloud-security",
    "open-source",
  ]
description:
  "Ein kurzer Vergleich von OpenBao und HashiCorp Vault: Wir schauen uns
  Lizenzunterschiede, Governance-Modelle und Feature-Sets an, damit du die
  richtige Secrets-Management-Plattform wählen kannst."
image: ../../../assets/blog/bao.jpg
---

# OpenBao: Wann die Open-Source-Alternative zu Vault die richtige Wahl ist

2023 änderte HashiCorp die Lizenz von Vault von der Mozilla Public License (MPL)
zur Business Source License (BSL) 1.1. Kurz darauf forkte die Community die
letzte MPL-Version von Vault und schuf OpenBao – ein Open-Source-Projekt unter
MPL-2.0-Lizenz. Schauen wir uns die tatsächlichen Unterschiede und Features an.

## Was ist OpenBao?

OpenBao ist eine relativ neue Open-Source-Plattform für Secrets Management, die
vor dem Lizenzwechsel von HashiCorp Vault (Version 1.14.0) geforkt wurde. Sie
bleibt API-kompatibel zu Vault, steht aber unter MPL-2.0-Lizenz und der
Governance der Linux Foundation.

Zu den Kernfunktionen gehören:

- Sichere Ablage von Secrets (API Keys, Passwörter, Zertifikate)
- Dynamische Generierung von Credentials für Datenbanken und Cloud-Plattformen
- Encryption as a Service
- Leasing und Erneuerung
- Widerruf (Revocation)
- Policy-basierte Zugriffskontrolle
- Audit Logging

## Der Lizenzunterschied

**OpenBao ([MPL 2.0](https://github.com/openbao/openbao/blob/main/LICENSE))**
erlaubt uneingeschränkte Nutzung, Modifikation und Weitergabe für jeden Zweck,
inklusive kommerzieller Anwendungen und konkurrierender Services.

**Vault ([BSL 1.1](https://www.hashicorp.com/en/bsl))** erlaubt Nutzung und
Modifikation, verbietet aber, die Software als Service anzubieten, der mit
HashiCorps kommerziellen Angeboten konkurriert. Jede Version wird vier Jahre
nach Release in MPL 2.0 überführt.

**Praktische Auswirkung:** Die interne Nutzung von Vault ist vom neuen
Lizenzmodell nicht betroffen. Organisationen, die SaaS-Plattformen bauen oder
Secrets Management für Kunden anbieten, können mit der BSL jedoch auf
Einschränkungen oder Freigabehürden stossen.

## Governance-Modelle

**OpenBao** wird unter dem Dach der Linux Foundation und der
[OpenSSF](https://openssf.org/blog/2025/06/17/openbao-joins-the-openssf-to-advance-secure-secrets-management-in-open-source/)
als community-getriebenes Open-Source-Projekt mit transparenter
Entscheidungsfindung entwickelt und betrieben. Jede Organisation und jede
Einzelperson kann gleichberechtigt beitragen.

**Vault** bleibt unter der Corporate Governance von HashiCorp.
Community-Beiträge werden zwar angenommen, Roadmap und strategische
Entscheidungen trifft aber HashiCorp auf Basis der Bedürfnisse von
Enterprise-Kunden und Geschäftszielen. Einige Features sind ausschliesslich der
kostenpflichtigen Version vorbehalten.

## Feature-Vergleich

Zwar teilen sich OpenBao und Vault durch den ursprünglichen Fork denselben
Kern-Funktionsumfang, es gibt aber dennoch einige wesentliche Unterschiede.

### Vorteile von OpenBao

OpenBao enthält Features, die früher Vault Enterprise vorbehalten waren:

- **[Namespaces](https://openbao.org/blog/namespaces-announcement/)** –
  Multi-Tenancy und Workload-Isolation sind jetzt in der Open-Source-Version
  verfügbar
- **Horizontale Read-Skalierbarkeit** – HA-Standby-Nodes können Leseoperationen
  lokal bedienen, Schreibzugriffe werden an den aktiven Leader weitergeleitet
  (entspricht den Performance Standby Nodes von Vault Enterprise) _[Hinzugefügt
  in OpenBao 2.5.0, Stand 04.02.2026]_

### Features exklusiv in Vault Enterprise

Die folgenden Features sind weiterhin nur in Vault Enterprise verfügbar:

- **Disaster-Recovery-Replikation** – Automatisiertes Failover und
  DR-Funktionalität über Rechenzentren hinweg
- **Performance-Replikation** – Read Replicas für geografische Verteilung und
  bessere Skalierbarkeit
- **Automatisierte Snapshots** – Eingebaute Backup-Automatisierung (in OpenBao
  per CLI skriptbar, aber nicht out of the box verfügbar)
- **[Sentinel Policies](https://developer.hashicorp.com/sentinel/docs/vault)** –
  Fortgeschrittenes Policy-as-Code-Framework für komplexe
  Autorisierungsszenarien und Compliance-Anforderungen

**Hinweis:** Die Roadmap von OpenBao ist community-getrieben, und weitere
Enterprise-äquivalente Features können auf Basis von Community-Prioritäten und
-Beiträgen umgesetzt werden. An der Implementierung fehlender Features wird
bereits gearbeitet.

## Die Entscheidung treffen

Beide Plattformen bieten robuste Secrets-Management-Funktionen. Deine Wahl
solltest du anhand der folgenden Faktoren bewerten:

- Lizenzanforderungen
- Governance-Präferenzen
- Feature-Bedarf
- Support-Bedarf

## Fazit

Welchen Weg du auch wählst: Beide Plattformen bieten produktionsreifes Secrets
Management. Entscheidend ist, die Lösung zu wählen, die zu deinen technischen
Anforderungen, den Werten deiner Organisation und deiner langfristigen Strategie
passt.

Wenn du Unterstützung auf deinem Weg zum Secrets Management brauchst,
[melde dich](https://bespinian.io/de/openbao/?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=openbao_as_vault_aternative)
bei unserem Team.
