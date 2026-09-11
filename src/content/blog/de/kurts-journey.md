---
title: Kurts Cloud-Reise
author: Philippe Hässig
pubDate: 2023-11-03
tags: ["cloud", "infrastructure", "storage", "scaling", "serverless"]
description:
  "Begleite Kurt auf seiner Reise, auf der er beim Betrieb eines
  Theater-Ticketshops die wichtigsten Cloud-Services kennenlernt: Object
  Storage, Managed Databases, Serverless Runtimes und Message Queues."
image: ../../../assets/blog/cloud-journey.jpg
---

In diesem Beitrag geben wir dir einen Überblick über die wichtigsten Services,
die jeder Cloud-Infrastruktur-Anbieter anbietet.

## Prolog

Diese Geschichte handelt von Kurt. Kurt ist für den Betrieb des Online-Ticket-
shops einer lokalen Theatergruppe verantwortlich. Der Shop kann Folgendes:

- Kommende Veranstaltungen mit ein paar Bildern als Teaser auflisten.
- Besucherinnen und Besuchern erlauben, Tickets zu kaufen.
- Ein Ticket als PDF-Datei per E-Mail zustellen.

Da Kurt schon das eine oder andere über «die Cloud» weiss, hat er bei seinem
liebsten Hyperscale-Cloud-Anbieter eine kleine virtuelle Maschine aufgesetzt und
die App deployt. Die meiste Zeit ist die Applikation im Leerlauf. Sie bedient
nur ein paar Requests pro Tag.

## Kapitel 1: Das schwarze Loch des Speichers

Während Kurt sich auf einer griechischen Insel wohlverdiente Erholung gönnt,
erhält er einen Anruf von der Präsidentin der Theatergruppe. Sie hat versucht,
neue Veranstaltungen im Shop zu veröffentlichen. Nach der zweiten Veranstaltung
warf der Shop seltsame Fehler und reagiert jetzt nicht mehr.

Widerwillig holt Kurt seinen Laptop aus der Tasche und beginnt zu untersuchen.
Er stellt fest, dass dem Server der Speicherplatz ausgegangen ist. Nachdem er
die Disk-Grösse über die Konsole des Cloud-Anbieters erhöht hat, läuft der Shop
wieder rund. Er findet heraus, dass jemand für eine Veranstaltung viele grosse
Bilder hochgeladen hat. Die grössere Disk sollte eine Weile reichen, aber er
weiss: Es ist nur eine Frage der Zeit, bis der Platz wieder ausgeht.

Zu Hause refactort Kurt den Shop so, dass er den **Object-Storage**-Service
seines Cloud-Anbieters nutzt. Er verschiebt alle Bilder und anderen statischen
Inhalte dorthin.

In einem Object Storage (bei AWS auch bekannt unter dem Namen «S3») können wir
alle Arten von Dateien ablegen (Bilder, Videos, Dokumente usw.), ohne je eine
Grösse erhöhen zu müssen. Üblicherweise bezahlt man für diesen Service genau die
Menge an Speicher, die er hält, plus den ein- und ausgehenden Traffic.

## Kapitel 2: Daten, Daten

Weil der Shop so benutzerfreundlich war, liess die Theatergruppe auch andere
Gruppen das System für ihre Veranstaltungen nutzen. Nach einer Weile wickelten
mehrere Theatergruppen der Region ein paar hundert Vorstellungen pro Jahr über
Kurts Shop ab. Der immer noch auf derselben kleinen virtuellen Maschine läuft.

Während Kurt in den Schweizer Bergen wandert, erhält er einen Anruf von der
Präsidentin der Gruppe. Der Shop reagiert wieder nicht oder wirft seltsame
Fehler. Er schnappt sich seinen Laptop (den er für solche Fälle immer auf
Wanderungen mitnimmt) und beginnt zu untersuchen. Offenbar ist der virtuellen
Maschine erneut der Platz ausgegangen. Die Datenbank ist stark gewachsen und hat
die Disk langsam gefüllt.

Auf dem Heimweg beginnt Kurt, über das Management-Interface seines
Cloud-Anbieters eine **Dokumentendatenbank** aufzusetzen. Zum Glück hat er für
den Shop auf der virtuellen Maschine bereits [MongoDB](https://www.mongodb.com/)
verwendet, und da der Anbieter ein kompatibles Produkt im Angebot hat, war die
Migration ziemlich einfach.

Alle Cloud-Anbieter bieten eine Reihe verschiedener Managed-Database-Services
an. Ihnen allen ist gemeinsam, dass du dich um nichts rund um dieses
Datenbanksystem kümmern musst. Es wird in der Regel vollständig vom Anbieter
verwaltet – er überwacht es, aktualisiert es und sorgt für die Sicherheit deiner
Daten.

Sie übernehmen sogar die komplizierte Active-Active-Replikationskonfiguration
auf globaler Ebene für dich. Wenn du sie brauchst. Und wenn du das Budget hast.

Üblicherweise haben sie kompatible Produkte für Postgres, MySQL/MariaDB, MongoDB
und sogar Microsoft SQL Server.

## Kapitel 3: Skalieren ohne Grenzen

Während Kurt in der Karibik tauchen geht, ruft ihn die Präsidentin der
Theatergruppe erneut an. Sie haben eine Social-Media-Kampagne für ihr neues
Stück gefahren. Ein Post ging auf TikTok viral, und jetzt ist der Shop sehr
langsam oder reagiert gar nicht mehr. Kurt hat so etwas kommen sehen, also holte
er seinen Laptop aus dem Trockenanzug und begann zu untersuchen.

Die virtuelle Maschine reagiert überhaupt nicht mehr, und die Metriken des
Anbieters zeigen eine sehr hohe CPU-Last. Er weist der Maschine einen grösseren
CPU-Typ zu und startet sie neu. Der Shop reagiert jetzt wieder, ist aber immer
noch etwas langsam. Kurt lässt es fürs Erste dabei bewenden und überlegt, wie
sich dieses Szenario künftig vermeiden lässt. Zurück im Hotel packt er die
Applikation in einen Container und konfiguriert die **Serverless Container
Runtime** des Cloud-Anbieters. Jetzt skaliert die Applikation automatisch hoch,
wenn die Nachfrage steigt. Und noch besser: Sie skaliert nachts automatisch auf
null herunter, wenn niemand Theatertickets kaufen will – so kann die
Theatergruppe etwas Geld für anderes sparen.

Mit Serverless Container Runtimes und ähnlichen Services nutzt du genau so viele
Ressourcen, wie deine Applikationen brauchen. Damit skalierst du nicht nur
automatisch, sondern sparst – richtig gemacht – auch eine Menge Geld.

Ein weiterer Vorteil: Du musst keinen Server mehr verwalten. Meistens wirfst du
einfach etwas Code hinein, und der Service weiss, was zu tun ist. Er startet
sogar ausgefallene Services für dich neu, egal wo auf der Welt du gerade bist.

## Kapitel 4: Warteschlangen

Bevor Kurt zum Eisfischen nach Finnland fährt, will er sicherstellen, dass er
nicht wieder gestört wird. (Und ja, auf einem finnischen See gibt es
[mit ziemlicher Sicherheit schnelles Internet](https://www.telia.fi/asiakastuki/kuuluvuuskartta).)
Also schaut er sich den Code des Shops an und überlegt, wie er ihn noch weiter
verbessern kann. Mit den Analysetools des Cloud-Anbieters findet er heraus, dass
die App immer sofort hochskaliert, wenn sie das PDF-Ticket für eine Bestellung
erzeugt. Das deckt sich auch mit Beschwerden von Kundinnen und Kunden, dass der
Bestellprozess meist ziemlich lange dauert.

Kurt entwirft einen Plan, um die App zu refactoren. Statt PDF und E-Mail sofort
zu erzeugen, schickt die App jetzt eine Nachricht in das
**Message-Queue**-System des Anbieters. Der Code, der das PDF erzeugt und die
E-Mail verschickt, läuft nun als Serverless Function, ausgelöst durch die
Nachricht. Das heisst, PDF-Erzeugung und E-Mail-Versand laufen jetzt asynchron
im Hintergrund. Der Bestellprozess fühlt sich viel schneller an, und der
Serverless Container läuft die meiste Zeit mit einer einzigen Instanz.

Mit Message Queues kannst du Performance und Ressourcennutzung einer Applikation
massiv verbessern. Diese Nachrichten können entweder von deiner eigenen
Applikation verarbeitet werden, oder du definierst eine Serverless Function, die
durch eine Nachricht ausgelöst wird. Das hat natürlich grossen Einfluss auf die
Architektur der Applikation und will sorgfältig geplant sein.

## Fazit

Das war ein sehr grober Überblick über einige Vorteile, die ein moderner
Cloud-Anbieter bieten kann. Wir haben einige der wichtigsten Services
kennengelernt, die alle Cloud-Anbieter in der einen oder anderen Form anbieten:
virtuelle Maschinen, Object Storage, Managed Databases, Serverless Runtimes und
Message Queues.

Natürlich bieten sie noch viel, viel mehr Services an – und fast täglich kommen
neue dazu.

Die grossen Vorteile, die alle Services gemeinsam haben, sind Verfügbarkeit,
Skalierbarkeit, Anpassungsfähigkeit und Sicherheit. Das sind alles wichtige
Punkte, die einiges an Aufwand bedeuten, wenn man sie selbst betreibt.

Und ein letztes Wort: Sei nicht wie Kurt. Geniess deine Freizeit ohne
Ablenkungen.

Willst du deine eigene Cloud-Reise antreten? Schau dir unseren Service
[Cloud Native Empowerment](/de/services/cloud-native-empowerment?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=kurts_journey)
an und buche deinen kostenlosen Workshop.
