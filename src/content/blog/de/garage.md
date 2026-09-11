---
title: "Garage: Self-Hosted Object Storage"
author: Johannes Karl
pubDate: 2026-07-30
tags: ["s3", "sovereignty", "devops", "rust"]
description:
  "Eine Einführung in einen einfachen, selbst gehosteten, S3-kompatiblen Storage
  und die Organisation dahinter."
image: ../../../assets/blog/garage.jpg
---

# Garage

Garage ist eine S3-kompatible, verteilte Object-Storage-Lösung, die sich
problemlos auf sehr limitierter Hardware selbst hosten lässt. Das Projekt wurde
von [Deuxfleurs](#deuxfleurs) gestartet, um einen Service zu schaffen, der frei
vom Einfluss von Konzernen ist. Einen Service, mit dem man seine persönlichen
Daten hosten kann, ohne auf Cloud-Services angewiesen zu sein, sondern nur auf
Hardware, die einem selbst gehört.\
Du kannst Garage sogar auf einem Raspberry Pi laufen lassen, wenn dir das
gefällt.

Einige der zentralen Design-Ziele sind:

- einen Service bereitzustellen, der **einfach** zu verstehen und zu betreiben
  ist,
- in sich geschlossen und leichtgewichtig zu sein (<small>es ist ein einzelnes
  Binary, geschrieben in Rust 💙</small>) und
- **hochgradig resilient** gegenüber Netzwerkproblemen und anderen Ausfällen zu
  sein

Das macht es zu einer richtig guten Wahl für das Self-Hosting statischer
Websites, als Storage-Backend für Tools wie
[`rsync`](https://github.com/rsyncproject/rsync) oder
[`restic`](https://github.com/restic/restic) und
[mehr](https://garagehq.deuxfleurs.fr/documentation/design/goals/#use-cases).
Und obwohl es zu den meisten S3-Tools und -Features kompatibel ist, versucht es
nicht, alle davon zu unterstützen, um den Umfang überschaubar zu halten. Hier
ein kurzer Überblick über die Features, die unterstützt werden – und die nicht:

| Feature                                                                                                                       | Unterstützt |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Presigned URLs                                                                                                                | Ja          |
| [Server-side Encryption (SSE-C)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html) | Ja          |
| Bucket Versioning                                                                                                             | _Nein_      |
| [Path-Style Requests](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html#path-style-access)            | Ja          |
| Virtual-Hosted-Style Requests                                                                                                 | Ja          |

<small>Quelle:
[https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/](https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/)</small>

### Geo-Distribution

Einer der Schlüsselaspekte von Garage ist, wie einfach sich damit ein
geografisch verteilter Object Storage betreiben lässt, der Speicherung und
Replikation an mehreren geografischen Standorten erlaubt. Für mehr Flexibilität
lässt sich die Art, wie Garage die Daten repliziert
([Replication Factor](https://garagehq.deuxfleurs.fr/documentation/reference-manual/configuration/#replication_factor)),
über eine einfache
[`.toml`](https://garagehq.deuxfleurs.fr/documentation/reference-manual/configuration/)-Datei
konfigurieren.

### Deployment und Betrieb

Da Garage nur ein einzelnes Binary ist, gestaltet sich das Deployment wirklich
einfach. Ob über Kubernetes und die bereitgestellten Helm Charts oder direkt
über `systemd` – es gibt viele
[verschiedene Optionen](https://garagehq.deuxfleurs.fr/documentation/cookbook/real-world/).
Empfohlen wird lediglich, beim Deployment mindestens `3` Nodes einzusetzen.

Fürs Monitoring stellt der Service eine Admin-API bereit, die
Prometheus-kompatible Metriken zum Scrapen liefert.

### Einschränkungen

Natürlich gibt es beim Einsatz von Garage auch Einschränkungen. Wie bereits
erwähnt, ist es nicht das Ziel, jedes S3-Feature zu unterstützen. Wenn das eine
harte Anforderung ist, sind einige der Alternativen vielleicht die bessere Wahl.
Es gibt zudem einige
[bekannte Probleme](https://garagehq.deuxfleurs.fr/documentation/reference-manual/known-issues/),
die man bei der Evaluation im Hinterkopf behalten sollte.

## Deuxfleurs

Deuxfleurs ist eine experimentelle Non-Profit-Hosting-Organisation mit Sitz in
Rennes, Frankreich. Sie finanzieren sich grösstenteils über Fördermittel von
Organisationen wie NLnet oder über Projekte der Europäischen Union, aber auch
über Einzelspenden.

Neben dem Bauen der Tools bieten sie auch Services wie Static Hosting, E-Mail
oder Matrix-basiertes Instant Messaging an.\
Nach eigenen Angaben nutzen sie weniger als 10 wiederaufbereitete Server, um
diese Services für Tausende von Menschen bereitzustellen – ziemlich cool, wenn
du mich fragst.

Wenn du also von ihrer Arbeit profitierst, überlege dir, mit Beiträgen oder
Spenden etwas zurückzugeben.
