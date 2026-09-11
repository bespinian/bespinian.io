---
title: Kostentransparenz in Kubernetes
author: Gabriel Koch
pubDate: 2021-04-09
tags:
  ["kubernetes", "cost-management", "chargeback", "monitoring", "prometheus"]
description:
  "Lerne, wie du mit Prometheus und weiteren Tools Kostentransparenz in
  Kubernetes-Clustern schaffst: Ressourcennutzung erfassen, Workloads zuordnen
  und Chargebacks ermöglichen."
image: ../../../assets/blog/cost-transparency.jpg
---

Die Cloud verspricht Transparenz über die Kosten unserer Applikationen und
technischen Services. Kubernetes wird aber – selbst wenn es von einem der
grossen Cloud-Anbieter verwaltet wird – meist als Blackbox verrechnet und von
Dutzenden oder Hunderten Applikationen in deiner Organisation genutzt.

Dieser Beitrag skizziert die nötigen Schritte, um Kostentransparenz für deine
Kubernetes-Cluster aus organisatorischer Sicht anzugehen, schlägt ein grobes
technisches Design für den Einstieg vor und behandelt einige der häufigeren
Herausforderungen und Fallstricke.

## Ziele

Kubernetes-Cluster sind meist Multi-Tenant-Systeme, die von vielen Teams in
deiner Organisation genutzt werden. Sie sind ein teures, aber äusserst
wertvolles Werkzeug für deine Teams.

Irgendwann willst du Transparenz darüber schaffen, welche Applikationen und
Workloads welche Kosten verursachen – um:

- deinem Team und den Tenants detaillierten Einblick zu geben, welche Ressourcen
  und Projekte die Kosten treiben
- Tenants einen Anreiz zu geben, weniger Ressourcen zu nutzen und Geld zu sparen
- die Kosten fair unter den Cluster-Tenants aufzuteilen
- Chargebacks auf die internen Kostenstellen deiner Organisation zu berechnen
- jemanden zu alarmieren, wenn die Kosten schnell und unerwartet steigen
- die Kosten deiner IT-Infrastruktur zu prognostizieren

Diese Ziele willst du erreichen, ohne die Vorteile aufzugeben, die Kubernetes
mit seinen flexiblen Skalierungs- und Deployment-Optionen bringt.

## Überblick

Da Kubernetes weder Kosteninformationen erfasst noch die Ressourcennutzung
unserer Workloads dauerhaft speichert, brauchen wir ein System, das jeden
Workload festhält und erfasst, welche Ressourcen er wie lange verbraucht (Preis
× Menge). Zusätzlich müssen Workloads einer Person, einem Team, einem Projekt
oder einer Kostenstelle in unserer Organisation zuordenbar sein, wenn wir
Chargebacks wirksam umsetzen oder Geschäftsentscheidungen unterstützen wollen.

Diese Informationen in einer geeigneten Datenbank abzulegen, erlaubt uns, die
gewünschten Reports, Dashboards, Alerts und Chargebacks in unserer Organisation
zu erstellen.

## Vorgeschlagene Toolchain

Es gibt einige Firmen, die Tools für mehr Transparenz anbieten.

Einen Grossteil der benötigten Tools hast du vielleicht schon in deinen
Kubernetes-Clustern. Tatsächlich nutzt eine leistungsfähige Toolchain für
dynamische Abfragen und Reports zur Kostentransparenz Prometheus als Kern – und
das wird mit Kubernetes-Clustern ohnehin oft fürs Monitoring deployt. Prometheus
ist eine Zeitreihendatenbank und erlaubt effizientes Aufnehmen, Speichern und
Abfragen von Zeitreihendaten wie Ressourcennutzungsdaten, die in festen
Intervallen – etwa einmal pro Minute – gescrapet werden.

Das Prometheus-Ökosystem enthält zudem die folgenden Tools, die unseren
Anwendungsfall gut bedienen und oft gleich mitinstalliert werden.

- Der Prometheus Node Exporter misst CPU- und Memory-Nutzung von Pods und
  Containern sowie weitere Metriken auf den Nodes eines Kubernetes-Clusters.
- Kube-State-Metrics bereitet weitere Kubernetes-Informationen für die Aufnahme
  durch Prometheus auf.
- Der Prometheus Alertmanager erlaubt uns, auf Basis bestimmter Schwellenwerte
  zu alarmieren, E-Mails zu senden, einen Pager auszulösen oder ein Ticket zu
  erzeugen.
- Grafana ermöglicht uns Dashboards, um die Ressourcennutzung über die Zeit zu
  visualisieren und Kosten interaktiv zu erkunden.

### Kubecost

Kubecost ist ein quelloffenes Tool zum Kosten-Monitoring für Kubernetes, das
ebenfalls auf Prometheus und dessen Ökosystem basiert und dir bereits Einblick
pro Namespace geben kann.

Es läuft auf deinem Cluster, bietet grundlegende Reports und Dashboards und gibt
Empfehlungen, um bestimmte Workloads richtig zu dimensionieren.

## Eine Cost-Management-Lösung in deiner Organisation einführen

Die vorgeschlagene Toolchain erfüllt zwar die technischen Anforderungen, um
Einblick zu gewinnen – ich möchte hier aber den Weg zur Einführung einer
Cost-Management-Lösung in deiner Organisation besprechen.

### Mit der Datenerhebung beginnen

Wie erwähnt persistiert Kubernetes keine der für die Kostenaggregation nötigen
Daten. Der erste Schritt ist deshalb, die Infrastruktur zum Erfassen und
Speichern dieser Daten aufzubauen. Deine historischen Daten wachsen von nun an
und ermöglichen dir Einblicke auf Wochen-, Monats- und schliesslich Jahresbasis.

### Erste Reports erstellen

Sobald Ressourcennutzungsdaten für einen kurzen Zeitraum vorliegen – eine Woche
ist ein guter Start –, kannst du erste Reports erstellen und grössere
Ressourcenverbraucher identifizieren. Auf diese kannst du zugehen, um
sicherzustellen, dass ihr Verbrauch für dein Geschäft zweckmässig ist.

### Workloads zuordnen

An diesem Punkt merkst du vielleicht, dass sich viele Workloads nicht eindeutig
einem Team, einer Organisationseinheit, einem Projekt oder einer Kostenstelle
zuordnen lassen. Du musst diese Informationen in deiner Organisation
zusammentragen und diese Ressourcen dann **taggen**, z.B. über
Kubernetes-Annotations, um Kosten künftig automatisch der richtigen Kostenstelle
zuzuweisen.

Zusätzlich solltest du einen Prozess oder Rahmen definieren, damit künftige
Ressourcen von Anfang an mit diesen Informationen getaggt werden.

### Mit den Teams kommunizieren

Bevor du in deiner Organisation mit Chargebacks startest, solltest du ein
Bewusstsein dafür schaffen, welche Kosten auf die Teams zukommen, und
transparent informieren, woraus sich diese Kosten zusammensetzen. Es ist deshalb
sinnvoll, nicht nur deine definierten Preise weiterzugeben (Kosten pro CPU /
Gigabyte Memory), sondern auch detaillierte Informationen darüber, welches ihrer
Kubernetes-Objekte wann welche Ressourcen genutzt hat. Das hilft Teams, die
Kosten zu verstehen, und gibt ihnen womöglich schon den Anstoss, ihre
Infrastrukturnutzung zu überdenken und ihre Workloads zu optimieren.

Ein guter Weg, diese Transparenz zu schaffen, sind interaktive Dashboards mit
Grafana.

### Chargebacks

Irgendwann willst du vielleicht automatisch über die internen
Verrechnungsprozesse deiner Organisation weiterbelasten. Dank der Zuordnung der
Workloads lassen sich nun einheitlich strukturierte Abrechnungsreports auf
Monats- oder Jahresbasis oder eine API erstellen und in deine internen
Verrechnungsprozesse einspeisen.

### Forecasting und Budgetierung

Viele Organisationen wollen die Kosten von Projekten oder Applikationen in die
Zukunft prognostizieren – mit den vorhandenen Daten ist das nun möglich. Da
Skalierung und Ad-hoc-Deployments aber erwünschte Features sind, die
Entwicklerinnen und Entwickler auch nutzen sollen, ist die Prognosegenauigkeit
oft begrenzt.

Budgets pro Applikation einzuführen – klar kommuniziert an die verantwortlichen
Teams – kann dir helfen, deine Prognosegenauigkeit zu verfolgen und mögliche
Kostenüberschreitungen früh sichtbar zu machen oder gar zu verhindern.

### Kontinuierliche Optimierung

Kubernetes-Cluster und die darauf laufenden Workloads verändern sich ständig. Du
solltest Zeit investieren, um laufend zu prüfen, ob deine Prozesse und dein
Verrechnungsmodell noch zur Realität passen und ob dein Verrechnungsmodell
ausgenutzt wird.

Die Ressourceneffizienz von Kubernetes-Workloads organisationsweit zu
optimieren, ist kompliziert und erfordert viel Know-how, da viele naheliegende
Massnahmen potenziell negative Nebenwirkungen auf Performance oder gar
Verfügbarkeit der Applikationen haben. Den Austausch zu dieser Optimierung in
deiner Organisation zu fördern, kann Teams helfen, Ressourcen effizienter zu
nutzen und diese Nebenwirkungen zu vermeiden.

## Häufige Herausforderungen und Probleme

### Reservierte, genutzte und Burst-Kapazität

Rund um CPU und Memory gibt es weiterhin Herausforderungen. In gemeinsam
genutzten Clustern willst du sicherstellen, dass die bereitgestellte Kapazität
eng an der benötigten liegt. Erlaubt die Infrastrukturschicht deines
Kubernetes-Clusters schnelles Skalieren, gelingt das leichter – auch wenn sich
die benötigte Kapazität ändert.

Die meisten Cloud-Anbieter offerieren Reserved Instances, die deutlich günstiger
sind als nach Pay-as-you-go verrechnete Instanzen. Reserved Instances sind bei
3-jähriger Reservation oft 50 % bis 70 % günstiger. Du solltest sicherstellen,
dass du eine Grundkapazität über Reserved Instances bereitstellst.

Reserved Instances zu nutzen, ist daher sehr empfehlenswert, bringt aber mehr
Komplexität in die Kostenstruktur deiner Kubernetes-Cluster.

> #### Provisionierung ist eine Best-Effort-Operation
>
> Neue Infrastruktur bei deinem Cloud- oder On-Premise-Anbieter zu
> provisionieren, ist für die meisten Cloud-Ressourcen eine
> Best-Effort-Operation. In seltenen Fällen konnten virtuelle Maschinen
> bestimmter Typen in gewissen Regionen nicht bereitgestellt werden:
>
> - [AWS London users suffer "insufficient capacity" problems with T2 Micro Instances (2017)](https://www.computerweekly.com/news/450415571/AWS-London-users-suffer-insufficient-capacity-problems-with-T2-Micro-Instances)
> - [European users reporting they're hitting Azure capacity constraints (2020 / COVID)](https://www.zdnet.com/article/european-users-reporting-theyre-hitting-azure-capacity-constraints/)

Ich empfehle, reservierte und Burst-Kapazität für deine Ressourcen zu definieren
und unterschiedlich zu verrechnen. Reservierte Kapazität sollte einer Ressource
immer sofort zur Verfügung stehen, auch wenn die konkrete Ressource (z.B. ein
Namespace) sie nicht vollständig nutzt, während Burst-Kapazität etwas länger zur
Bereitstellung braucht und in seltenen Fällen gar nicht bereitgestellt wird. Der
Hauptvorteil: Wenn die reservierte Kapazität der Workloads relativ stabil ist,
kannst du bei deinem Cloud-Anbieter zuversichtlich Reserved Instances
provisionieren – das bedeutet aber auch, dass sich reservierte Kapazität nicht
reduzieren lässt. Wird sie für einen Workload nicht mehr gebraucht, müsste sie
verschoben werden.

Reservierte und Burst-Kapazität pro Namespace zu definieren, ist Best Practice:
Das lässt sich leicht nachverfolgen, und die Burst-Kapazität als Obergrenze kann
über
[Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
von Kubernetes automatisch durchgesetzt werden.

Reservierte Kapazität sollte unabhängig von der tatsächlichen Nutzung verrechnet
werden, aber zu einem tieferen Preis – passend zu deiner Möglichkeit, Reserved
Instances zu nutzen. Burst-Kapazität sollte nach Pay-as-you-go verrechnet
werden: Du berechnest die genutzte Kapazität oberhalb der reservierten Menge und
verrechnest diese Differenz zu einem Pay-as-you-go-Tarif.

Ich schlage dieses Modell vor, weil es den Einsatz von Reserved Instances
unterstützt, Preise gegenüber den Tenants des Kubernetes-Clusters transparent
kommunizierbar macht und Anreize zum Vorausplanen schafft – und dabei viel
Flexibilität beim Skalieren und der Pay-as-you-go-Verrechnung für bestimmte
Anwendungsfälle erhält. Es ist allerdings komplexer als ein reines
Pay-as-you-go-Preismodell und erfordert daher bessere Kommunikation mit den
Teams.

### Ressourcen jenseits von Compute

CPU und Memory sind bei Kubernetes-Clustern meist die Hauptkostentreiber und
sollten zuerst im Fokus stehen. Irgendwann willst du deine Verrechnung aber auf
Disks – besonders SSDs –, Netzwerk-IO, Load Balancer und andere Ressourcen
ausweiten, die in deiner Organisation Kosten verursachen. Das verhindert, dass
das Verrechnungsmodell ausgenutzt wird, und erhöht die Transparenz über die
wahren Kosten deiner Applikationen.

Ein Grossteil dieser Informationen lässt sich ebenfalls aus Kubernetes ziehen
und in deine Lösung integrieren.

### Workloads zuordnen

Sobald du die Workloads auf deinem Cluster aus Sicht von Ressourcennutzung und
Kosten analysierst, fällt dir vielleicht auf, dass sich ein erheblicher Teil
deiner Workloads nicht offensichtlich einer Organisationseinheit oder
Kostenstelle zuordnen lässt.

Das erschwert es, Workloads auf bestehende Cost-Management-Konstrukte
abzubilden. In zahlreichen Fällen sind Workloads auf Kubernetes, die zur selben
Applikation gehören oder vom selben Team betreut werden, aber aus technischen
oder organisatorischen Gründen bereits im selben Namespace gruppiert. Namespaces
sind deshalb ein hervorragender Ausgangspunkt.

Namespaces zu nutzen, um Workloads mit deinen Cost-Management-Konstrukten zu
verknüpfen, hat mehrere weitere Vorteile:

- Alle relevanten Kubernetes-Objekte gehören zu einem Namespace.
- Kubernetes-Objekte gehören zu **nur einem** Namespace.
- Namespaces sind nicht kurzlebig – sie bestehen meist Monate oder Jahre.
- Du hast viel weniger Namespaces als Pods oder andere ressourcenverbrauchende
  Objekte.
- Der Namespace eines Objekts ist in fast allen Kontexten verfügbar, was die
  Aggregation vereinfacht.
- Auf Namespaces lassen sich Quotas setzen.

Es empfiehlt sich, einen Prozess für das Erstellen von Namespaces zu definieren,
bei dem die Zuordnung der Ressourcen sichergestellt ist – so wird künftig eine
automatische Zuordnung möglich.

> #### Annotations verwenden
>
> Ein weiterer Ansatz, Workloads deinen Organisationseinheiten zuzuordnen, setzt
> auf
> Kubernetes-[Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/),
> die sich an alle Kubernetes-Objekte hängen lassen. Das bietet mehr
> Flexibilität, erfordert aber mehr Aufwand bei der Datenaggregation.
>
> Du kannst auch auf Namespaces setzen und Annotations an diese hängen, um die
> relevanten Daten innerhalb von Kubernetes beisammenzuhalten. Zudem ist es ein
> guter Weg, reservierte Kapazität über Annotations auf Namespaces zu
> definieren, um alles am selben Ort zu verwalten.

#### Geteilte Namespaces

Du triffst vielleicht auf Namespaces mit Ressourcen, die verschiedenen
Kostenstellen oder Organisationseinheiten zuzuordnen wären. Davon ist generell
abzuraten, und wo möglich sollte es geändert werden.

Es gibt aber gute Gründe für geteilte Namespaces. Einige Teams betreiben
womöglich gemeinsam Infrastruktur für ihren Entwicklungsprozess, etwa
Build-Server oder Artefakt-Repositories. So können sie die Verwaltung dieser
Komponenten bündeln. Manche dieser Komponenten verbrauchen unabhängig von der
Last viele Ressourcen, und sie zu teilen, senkt die Kosten für die gesamte
Organisation. Es gibt zwar viele Wege, die Kosten aufzuteilen (neue
Kostenstellen, eine Aufteilung über Annotations auf dem Namespace) –
empfehlenswert ist aber, einfach einer der Kostenstellen zu verrechnen, solange
diese geteilten Namespaces nicht zu einem grossen Kostentreiber in deinem
Cluster werden.

In manchen Fällen weisen geteilte Namespaces auch auf eine starre
Kostenstellenstruktur oder auf langsame, komplizierte Prozesse rund um diese
oder um das Erstellen von Namespaces hin – was dazu führt, dass Namespaces
geteilt oder gar wiederverwendet statt abgebaut werden. Diese Abläufe zu
vereinfachen, könnte den Drang verringern, geteilte Namespaces anzulegen oder
wiederzuverwenden.

Zusätzlich wirst du Namespaces haben, die Ressourcen für Kubernetes selbst oder
für zusätzliches Tooling enthalten, etwa Logging- und Monitoring-Infrastruktur.
Es ist sinnvoll, diese Kosten in die Wartungskosten des Clusters einzurechnen,
die du entweder einer separaten Kostenstelle verrechnest oder als Zuschlag auf
die Preise deiner Ressourcen aufschlägst.

## Die häufigsten Optimierungschancen

### Nicht-Produktionsumgebungen

Entwicklungs- und Testumgebungen verursachen oft einen erheblichen Teil deiner
Kosten – besonders, wenn sie so genutzt werden wie früher mit klassischen
virtuellen Maschinen oder Bare-Metal-Hardware, wo für jede dieser Umgebungen oft
dauerhaft dedizierte Instanzen liefen. Die Gründe für dauerhaft laufende
Nicht-Produktionsumgebungen waren meist, dass das Bereitstellen einer solchen
Umgebung traditionell Tage oder Wochen dauerte und dass das Teilen von
Compute-Ressourcen schwierig und unpraktisch war.

Kubernetes zwingt deine System- und Software-Engineers, Applikationen so zu
paketieren, dass sie schnell bereitgestellt werden können – und die Verwaltung
von Compute-Ressourcen ist eines der Kernfeatures von Kubernetes. Entsprechend
kannst du sie ermutigen, Nicht-Produktionsumgebungen nur bei Bedarf hochzufahren
und wo möglich Auto-Shutdowns umzusetzen. Muss eine Nicht-Produktionsumgebung
dauerhaft laufen, ist es oft sinnvoll, ihre Memory- und CPU-Zuteilung zu
reduzieren oder mit weniger Instanzen als üblich zu fahren und nur bei Bedarf
für Lasttests und Deployment-Tests hochzuskalieren.

### Deine Workloads richtig dimensionieren

Requests und Limits in Kubernetes sind ein Weg, einem Pod oder Container eine
garantierte Ressourcenmenge und eine obere Burst-Grenze zuzuweisen. Diese Werte
werden oft willkürlich gesetzt und basieren nicht auf Erfahrung oder empirischen
Daten aus Lasttests. Du triffst zum Beispiel auf Pods, die eine ganze CPU in
ihren Requests zugewiesen haben, obwohl sie selten auch nur auf 10 % davon
kommen. Diese Workloads richtig zu dimensionieren, kann viele Ressourcen
freisetzen und damit die Kosten deutlich senken.

Die vorgeschlagenen Tools erlauben dir, die von Workloads tatsächlich genutzten
Ressourcen mit der ihnen zugewiesenen Menge zu vergleichen und diese Information
an die Entwicklungsteams weiterzugeben.

Prometheus erlaubt dir, die Ressourcennutzung nach Perzentilen zu ermitteln –
ein guter Anhaltspunkt für die Dimensionierung deiner Pods und Container. Hast
du zum Beispiel einen Pod, dessen 99. Perzentil der CPU-Nutzung bei 18 % liegt
(er nutzt also 99 % der Zeit weniger als 18 % eines CPU-Kerns), willst du die
Requests für diesen Pod vielleicht auf rund 180 Millicores setzen. Welches
Verhältnis oder Perzentil dafür am besten passt, hängt vom konkreten Workload
ab. Lasttests sind empfehlenswert, um die besten Werte für Requests und Limits
zu finden und zu prüfen, ob die Applikationen nach einer Änderung dieser
Einstellungen gut laufen.

> #### Vorsicht bei Memory-Limits
>
> Anders als CPU ist Memory eine nicht komprimierbare Ressource. Das heisst,
> Kubernetes kann einem Prozess Memory nur entziehen, indem es ihn ganz killt –
> anders als bei überlasteter CPU.
>
> Deshalb solltest du Requests und Limits für Memory anders setzen als für CPU.
> Wenn dein Prozess im 99. Perzentil 500 MB Memory nutzt, musst du die
> Memory-Requests auf einen höheren Wert als 500 MB setzen (z.B. 750 MB), damit
> er nicht regelmässig gekillt wird.

### Automatisches Skalieren fördern

Falls deine Teams für ihre Workloads noch kein automatisches Skalieren umsetzen,
kannst du sie ermutigen, den
[Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)
zu nutzen, um nur bei Bedarf hoch- und runterzuskalieren.

## Fazit

Kubernetes bringt zwar keine eingebauten Cost-Management-Tools mit, wir können
aber mit einfachen Open-Source-Tools und einigen Kubernetes-nativen Features
Transparenz darüber gewinnen, was die Kosten in unseren Clustern treibt.

Die ersten Schritte auf deinem Weg zu mehr Kostentransparenz sind
sicherzustellen, dass Nutzungsdaten kontinuierlich erfasst werden und Workloads
einer klar definierten Einheit in deiner Cost-Management-Struktur zuordenbar
sind – etwa einem Team, Projekt oder einer Kostenstelle.

Darauf aufbauend kannst du die Hauptkostentreiber identifizieren, Reports
erstellen und erste Workloads optimieren.

Um Teams im grösseren Stil zum Kostensenken zu motivieren, mach diese
Informationen über Dashboards und detaillierte Reports leicht zugänglich,
definiere ein Preismodell für bessere Vergleichbarkeit und führe schliesslich
Chargebacks ein.

Interessiert an Kostentransparenz in Kubernetes? Schau dir unseren Service
[Cloud Native Empowerment](/de/services/cloud-native-empowerment?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=kubernetes_cost_transparency)
an und buche deinen kostenlosen Workshop.
