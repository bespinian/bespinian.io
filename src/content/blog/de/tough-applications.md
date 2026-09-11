---
title: Robuste Applikationen bauen
author: Lena Fuhrimann
pubDate: 2025-12-03
tags: ["cloud", "kubernetes", "resiliency", "scaling"]
description:
  "Lerne, wie du starke Cloud-Applikationen baust – anhand von vier einfachen
  Konzepten: Toleranz, Standhaftigkeit, Resilienz und Anpassungsfähigkeit."
image: ../../../assets/blog/tough-applications.jpg
---

Wenn du Apps in der Cloud betreibst, geht irgendwann etwas kaputt. Es ist keine
Frage des _Ob_, sondern des _Wann_. Netzwerke fallen aus. Server stürzen ab.
Datenbanken funktionieren eine Weile nicht mehr. Die Apps, die überleben, sind
nicht die, die nie ausfallen. Es sind die, die gut mit Ausfällen umgehen.

In [einem seiner Videos](https://www.youtube.com/watch?v=SE9_1PYsaP0) spricht
der Unternehmer Alex Hormozi über mentale Stärke. Er definiert sie als «die
prozentuale Wahrscheinlichkeit, dass ein schlechtes Ereignis dein Verhalten in
Bezug auf deine Ziele verändert». Er unterteilt sie in vier Teile: **Toleranz**,
**Standhaftigkeit**, **Resilienz** und **Anpassungsfähigkeit**. Diese Konzepte
funktionieren auch beim Bauen von cloud-nativen Apps richtig gut.

## Toleranz

Toleranz ist die Länge deiner Zündschnur. Sie beschreibt, wie viel Ärger du
aushältst, bevor du dich anders zu verhalten beginnst. Wer eine hohe Toleranz
hat, lässt sich von kleinen Problemen nicht aus der Bahn werfen.

Bei Apps bedeutet Toleranz, _wie viel Stress dein System aushält, bevor es
kaputtzugehen beginnt_. Eine App mit guter Toleranz verkraftet Traffic-Spitzen,
langsame Datenbanken und andere Probleme, ohne gleich auseinanderzufallen.

So sieht das aus:

- Queues verwenden, um Requests zu puffern, statt bei steigendem Traffic sofort
  «nein» zu sagen
- Connection Pools einsetzen, die es verkraften, wenn die Datenbank langsamer
  wird
- Systeme haben, die plötzliche Aktivitätsschübe abfedern, ohne auszufallen
- Timeouts so setzen, dass Vorgänge genug Zeit haben, normal abzuschliessen

In Kubernetes setzt du Resource Requests und Limits, um festzulegen, wie viel
Toleranz deine App hat. Höhere Limits erlauben deiner App, plötzliche Spitzen zu
verkraften, ohne beim ersten Anzeichen von Ärger abzustürzen.

```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
```

Apps mit geringer Toleranz stürzen beim ersten Problem ab. Eine einzige langsame
Datenbankabfrage belegt alle Verbindungen. Eine kleine Traffic-Spitze bringt
alles zum Ausfall. Jede Kleinigkeit wird zum grossen Problem.

## Standhaftigkeit

Standhaftigkeit misst, wie stark du dich veränderst, sobald du an deine Grenze
stösst. Wer sehr standhaft ist, bleibt selbst dann ziemlich ruhig, wenn es übel
wird. Wer wenig standhaft ist, fällt komplett auseinander.

Bei Apps bedeutet Standhaftigkeit, _elegant zu scheitern statt komplett
zusammenzubrechen_. Wenn dein System tatsächlich an seine Grenze stösst – wie
schlimm geht es dabei kaputt?

Dazu gehören:

- Circuit Breaker, die gecachte oder Ersatz-Antworten ausliefern statt
  Fehlermeldungen
- Load Shedding, das weniger wichtige Requests verwirft und die wichtigen am
  Laufen hält
- Bulkheads, die Ausfälle isolieren, damit ein kaputter Teil nicht alles
  mitreisst
- Notfallpläne, die dir etwas Funktionalität liefern statt gar keine

Eine gute Readiness Probe ist ein Werkzeug für Standhaftigkeit. Wenn etwas
schiefläuft, nimmt deine App keine neuen Requests mehr an, statt Arbeit
anzunehmen, die sie nicht abschliessen kann.

```yaml
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
  failureThreshold: 3
```

Apps mit geringer Standhaftigkeit springen von «funktioniert» direkt zu
«komplett kaputt», ohne etwas dazwischen. Sie kennen keinen Mittelweg. Wenn die
Datenbank langsamer wird, werden sie nicht einfach langsamer – sie stürzen ab
und reissen anderes mit.

## Resilienz

Resilienz beschreibt, wie schnell du dich nach einem Rückschlag erholst. Wenn es
dich erwischt hat – wie rasch bist du wieder auf den Beinen?

Bei Apps bedeutet Resilienz, _schnell wieder in den Normalzustand zu kommen_.
Wie rasch wird dein System nach einem Ausfall wieder stabil und läuft mit voller
Leistung?

Das heisst:

- Kurze Startzeiten, damit neue Instanzen kaputte schnell ersetzen können
- Zustandsloses Design, damit jede Instanz sofort jeden Request bedienen kann
- Health Checks, die korrekt anzeigen, wann die App einsatzbereit ist
- Automatische Wiederherstellung über Kubernetes-Restarts und Autoscaling

Kubernetes-Deployments mit guten Liveness Probes und Restart Policies helfen bei
der Resilienz. Kaputte Pods werden automatisch ersetzt. Das System repariert
sich selbst, ohne dass jemand eingreifen muss.

```yaml
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 15
```

Apps mit geringer Resilienz brauchen ewig zur Erholung. Sie starten langsam,
müssen manuell repariert werden oder bleiben selbst dann in einem kaputten
Zustand hängen, wenn das Problem längst behoben ist.

## Anpassungsfähigkeit

Anpassungsfähigkeit ist der interessanteste Teil. Sie misst, wie du nach einem
Problem im Vergleich zu vorher dastehst. Kommst du stärker, schwächer oder
gleich zurück?

Bei Apps bedeutet Anpassungsfähigkeit, _aus Ausfällen zu lernen und besser zu
werden_. Geht dein System aus Problemen so hervor, dass es künftig besser auf
Ähnliches vorbereitet ist?

Dazu gehören:

- Autoscaling, das die Anzahl laufender Instanzen basierend auf Gelerntem über
  den Traffic anpasst
- Rate Limiting, das lernt, wie normaler Traffic aussieht, und Limits anpasst
- Chaos Engineering, bei dem du absichtlich Dinge kaputtmachst, um
  Schwachstellen zu finden
- Post-Incident-Reviews, die zu echten Verbesserungen am System führen

In Kubernetes hilft der Horizontal Pod Autoscaler mit Custom Metrics bei der
Anpassungsfähigkeit. Dein System lernt aus Traffic-Mustern und passt die Anzahl
laufender Instanzen an.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

Apps mit geringer Anpassungsfähigkeit machen immer wieder dieselben Fehler. Sie
lernen nicht aus Ausfällen. Jedes Problem ist eine Überraschung, selbst wenn
dasselbe schon einmal passiert ist. Nach jedem Problem kommen sie gleich – oder
schlechter – zurück.

## Fazit

Mentale Stärke bei Menschen ist nicht einfach an oder aus. Sie besteht aus vier
verschiedenen Teilen. Für Apps gilt dasselbe.

- **Toleranz**: Wie viel Stress hält deine App aus, bevor sie kaputtzugehen
  beginnt?
- **Standhaftigkeit**: Wenn sie kaputtgeht – scheitert sie elegant oder stürzt
  sie komplett ab?
- **Resilienz**: Wie schnell ist sie wieder im Normalzustand?
- **Anpassungsfähigkeit**: Kommt sie nach Problemen stärker zurück?

Du kannst in einigen Bereichen gut und in anderen schwach sein. Eine App
verkraftet vielleicht viel Stress, bevor sie kaputtgeht (hohe Toleranz), braucht
dann aber ewig zur Erholung (geringe Resilienz). Eine andere geht beim ersten
Anzeichen von Ärger kaputt (geringe Toleranz), erholt sich aber sofort (hohe
Resilienz).

Diese vier Teile zu verstehen, hilft dir zu finden, wo deine Apps schwach sind.
Dann kannst du dich darauf konzentrieren, sie stärker zu machen. Die Cloud ist
kein stabiler Ort. Robuste Apps zu bauen, ist keine Option, sondern Pflicht.

Willst du deine eigenen robusten Applikationen bauen? Schau dir unseren Service
[Cloud Native Empowerment](/de/services/cloud-native-empowerment?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=tough_applications)
an und buche deinen kostenlosen Workshop.
