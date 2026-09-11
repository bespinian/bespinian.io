---
title: Observability in der Cloud
author: Gabriel Koch
pubDate: 2022-04-22
tags:
  ["observability", "monitoring", "distributed-systems", "cloud", "telemetry"]
description:
  "Verstehe den Unterschied zwischen Monitoring und Observability und lerne, wie
  du echte Observability in verteilten Cloud-Systemen umsetzt, um unbekannte
  Probleme wirksam zu analysieren."
image: ../../../assets/blog/cloud-observability.jpg
---

Dieser Blogbeitrag will erklären, wie Observability und Monitoring voneinander
abzugrenzen sind, welche Probleme «traditionelles» Monitoring bei verteilten
Cloud-Systemen hat und wie Observability diese Probleme entschärfen kann. Zum
Schluss skizziert er grob, wie man Observability angehen sollte.

## Observability vs. Monitoring

Für ausführliche Darstellungen des Unterschieds zwischen Monitoring und
Observability empfehle ich Cindy Sridharans Buch «Distributed Systems
Observability» und Charity Majors' diverse Blogbeiträge zum Thema (z.B.
[Observability is a Many-Splendored Definition](https://charity.wtf/2020/03/03/observability-is-a-many-splendored-thing/)).

Hier fasse ich die Hauptpunkte daraus zusammen und ziehe einige Schlüsse.

Monitoring ist das, was die meisten von uns gewohnt sind. Es umfasst das Sammeln
von Telemetrie (Metriken, Logs und Traces) und deren Visualisierung über
Dashboards und Alerting, wobei Metriken der primär verwendete Datentyp sind.
Monitoring ist in erster Linie der Prozess, Telemetrie zu sammeln und darauf zu
reagieren. Es behandelt die Known Unknowns (wir wissen z.B., dass uns Speicher
oder Plattenplatz ausgehen kann, und wir können das überwachen – aber wir wissen
nicht genau, wann es passiert und welche Prozesse es verursachen).

Observability hingegen beschreibt eine Eigenschaft eines Systems. Ein System ist
beobachtbar, wenn du aus den beobachtbaren Ausgaben auf seinen inneren Zustand
schliessen kannst (etwa auf die Werte seiner internen Variablen und die Position
im Call Stack). Diese Ausgaben können konkrete Verhaltensweisen gegenüber
Nutzenden sein und stützen sich in der Praxis stark auf Telemetrie, die wir aus
der Umgebung des Systems sammeln (etwa der Maschine, auf der es läuft) oder die
wir bewusst aus dem System heraus emittieren. Ein System lässt sich als
«beobachtbarer» beschreiben, wenn wir seinen inneren Zustand genauer beschreiben
können, und als «vollständig beobachtbar», wenn wir seinen inneren Zustand immer
mit 100 % Genauigkeit beschreiben können. Ein System beobachtbar zu machen,
erfordert in der Regel Monitoring-Tools und -Prozesse, versetzt uns aber in die
Lage, eine grössere Menge an Problemen zu bewältigen – nämlich die Unknown
Unknowns – und Probleme wirksam zu analysieren, die wir uns vor ihrem Auftreten
gar nicht vorstellen konnten.

## Die Grenzen des Monitorings

Jetzt, wo wir den Unterschied zwischen Monitoring und Observability kennen: Wie
hat uns Monitoring in der Vergangenheit bei Problemen geholfen?

Wenn etwas schiefgeht, nutzen wir Alerts und Dashboards, um einen Überblick zu
bekommen, welche Applikation, Maschine oder Komponente betroffen ist. Zusätzlich
steigen wir in die Logs ein, um herauszufinden, wo genau es schiefging. Ist die
Ursache ein bekanntes Problem, können wir meist einen bekannten Fix anwenden.
Ist die Ursache aber ein unbekanntes Problem, müssen wir uns oft durch
umfangreiche Logs graben, sie manuell korrelieren und am Ende womöglich die
Applikation mit einem Debugger starten, um die exakten Bedingungen zu
reproduzieren. Wir kehren iterativ zu den Logs zurück, sammeln weitere Indizien
und nähern uns dem Zustand des Systems zum Fehlerzeitpunkt an. Da wir Debugger
einsetzen können, um die Probleme zu untersuchen, und der mögliche Problemraum
meist einigermassen begrenzt ist, können wir uns auf diese Telemetrie verlassen,
die in der Regel stark aggregiert ist.

Diese aggregierte Telemetrie trägt allerdings nicht genug Information, wenn man
Applikationen analysiert, die für die Cloud entworfen oder von monolithischen
Applikationen in eine Microservice-Architektur refactort wurden.

In einer Microservice-Architektur haben wir viel mehr unterschiedliche Runtimes,
die Arbeit erledigen und über das Netzwerk interagieren. Zusätzlich werden beim
Entwurf von Applikationen für die Cloud die folgenden Praktiken immer
verbreiteter:

- dynamisches Skalieren und kurzlebige Applikationsinstanzen
- asynchrone Verarbeitung über Queues und Streaming-Services
- Blue/Green-, Canary- oder Rolling-Deployments
- Feature Flags
- kürzere Deployment-Zyklen

Diese Veränderungen führen zu einer komplexeren Applikationslandschaft, was das
Debugging zunehmend erschwert. Statt einen Service im Debugger laufen zu lassen
und seinen Zustand nachzubilden, müssen wir womöglich verschiedene Services
starten und in jedem davon den Zustand reproduzieren. Auch unsere Telemetrie
wird unter Umständen weniger aussagekräftig, und wir müssen uns zusätzliche
Fragen stellen, etwa:

- Hat gerade ein Deployment stattgefunden?
- Welche Versionen sind tatsächlich deployt?
- Welche Versionen (falls mehrere laufen) zeigen auffälliges Verhalten?
- Welche Feature Flags waren für die fehlgeschlagenen Requests/Tasks aktiviert?

Damit wir aus unserer Telemetrie weiterhin aussagekräftige Erkenntnisse ziehen,
müssen wir sie mit zusätzlichen Informationen annotieren – etwa Build-ID,
Hostname, IP-Adresse, aktivierte Feature Flags und mehr. Diese Datenanreicherung
bringt neue Probleme mit sich: Mehr Dimensionen in den Telemetriedaten machen
die Speicher- und Abfragesysteme deutlich langsamer und/oder teurer.
Gleichzeitig müssen wir immer noch etliche Abfragen machen, um Informationen aus
mehreren Quellsystemen (Microservices) zu korrelieren und so nach und nach genug
Kontext zusammenzutragen, um zu erraten, was passiert ist.

## Die Observability-Lücke in verteilten Cloud-Systemen schliessen

Leider lässt sich diese Lücke nicht schliessen, indem man einfach ein neues Tool
oder eine neue Bibliothek hinzufügt. Stattdessen gibt es zwei zentrale
Herausforderungen, die Site Reliability Engineers angehen sollten, wenn sie die
Observability ihrer Systeme verbessern wollen.

Erstens sollte jeder einzelne Service so instrumentiert sein, dass er seinen
Kontext mitführt. Zudem sollte jeder Service beliebig breite Events mit dem
relevanten Kontext emittieren, wenn die Verarbeitung eines Requests bzw. Tasks
abschliesst (erfolgreich oder mit einer Exception). Dazu sollte bei jeder
Verarbeitung eines Workloads (z.B. wenn ein Request in ein System eintritt) ein
Event-Kontext-Objekt initialisiert und mit allen relevanten Daten vorbefüllt
werden. Während der Workload verarbeitet wird, sollte dieses Objekt angereichert
und bei jedem Aufruf eines anderen Service der relevante Kontext weitergereicht
werden. Wenn der Request abschliesst, sollte das gesamte Kontext-Event an das
zentrale Speichersystem übergeben werden. Viele Logging-Bibliotheken
unterstützen solche Anwendungsfälle, sie müssen aber in den verwendeten
Frameworks auch korrekt implementiert werden. Sicherzustellen, dass diese Events
sauber angereichert sind, liegt in der Verantwortung von Entwicklerinnen,
Entwicklern und Site Reliability Engineers. Ziel sollte sein, dass sich Probleme
in der Regel anhand eines einzigen Events eingrenzen lassen, ohne mühsam
Dutzende Events korrelieren oder ein Problem durch schrittweises Ausprobieren
reproduzieren zu müssen.

Die zweite Herausforderung ist, ein System zur Speicherung und Abfrage von
Events einzuführen, das diese breiten Events sinnvoll verarbeiten kann und
Abfragen sowie Suchen erlaubt. Beliebig breite Events zu speichern und über alle
Dimensionen hinweg abzufragen, ist entscheidend, um die Art der Fragen, die du
stellen kannst, nicht einzuschränken. Viele Monitoring-Systeme unterstützen das
allerdings nicht, zumal es meist sehr ressourcenintensiv ist. Einige
Observability- bzw. Monitoring-Tools wie Elasticsearch unterstützen solche
Anwendungsfälle bereits. Diese Systeme können teuer werden und brauchen
ihrerseits Feintuning und Optimierung, damit sie gut performen und gleichzeitig
kosteneffizient bleiben.

## Fazit

Während der Begriff Monitoring in erster Linie den Prozess beschreibt,
Telemetrie zu sammeln und einige automatisierte Reaktionen zu definieren, geht
der Begriff Observability weiter. Er beschreibt eine Eigenschaft eines Systems –
nämlich, wie gut du aus seinen Ausgaben auf den inneren Zustand schliessen
kannst. Monitoring zielt vor allem darauf ab, Probleme zu diagnostizieren, die
ähnlich auftreten wie bereits bekannte, während dir echte Observability erlaubt,
jedes Problem wirksam zu diagnostizieren – auch völlig neue.

Die entscheidenden Schritte, die jeder Site Reliability Engineer gehen sollte,
sind:

1. während der Verarbeitung eines Workloads alle relevanten Kontextinformationen
   zu sammeln
1. diese Informationen am Ende in einem Event zu emittieren
1. sicherzustellen, dass ein System zum Sammeln und wirksamen Abfragen dieser
   Events vorhanden ist.

Interessiert an Observability? Schau dir unseren Service
[Cloud Native Empowerment](/de/services/cloud-native-empowerment?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=observability_in_the_cloud)
an und buche deinen kostenlosen Workshop.
