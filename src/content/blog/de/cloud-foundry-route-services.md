---
title: Cloud Foundry Route Services
author: Lena Fuhrimann
pubDate: 2016-10-03
tags: ["cloud-foundry", "route-services", "middleware", "rate-limiting"]
description:
  "Lerne, wie du mit Cloud Foundry Route Services Authentifizierung, Rate
  Limiting oder Logging auf Routen-Ebene ergänzt, indem du Requests abfängst,
  bevor sie deine Applikation erreichen."
image: ../../../assets/blog/router.jpg
---

In Cloud Foundry nutzen wir
[Services](https://docs.cloudfoundry.org/devguide/services/), um unseren Apps
zusätzliche Funktionalität als reservierte Ressourcen bereitzustellen. Sie
werden direkt an die App bzw. die Apps gebunden und sind nur aus diesen
gebundenen Apps erreichbar. Das Bild unten zeigt, wie sie über den Service
Broker bereitgestellt werden und dann für den Client über die App erreichbar
sind. Das ist natürlich ein hervorragendes Setup für Services wie Datenbanken,
Messaging Broker, App-Data-Logger oder andere praktische Ergänzungen, die unsere
Apps konsumieren.

![Services](https://s12.postimg.org/onyin2gwd/services.png)

Der in diesem Diagramm gezeigte Service Broker kommt bei User-Provided Services
nicht zum Einsatz.

[Route Services](https://docs.cloudfoundry.org/devguide/services/route-binding.html)
funktionieren dagegen auf einer anderen Ebene. Sie werden nicht an eine App
gebunden, sondern direkt an eine Route. Dadurch können sie als «Interceptor»
agieren und bestimmte Requests entweder ablehnen oder verändern, bevor sie die
App überhaupt erreichen. Das ist ideal, um externe Authentifizierung, Rate
Limiting oder Logging auf Routen-Ebene bereitzustellen. Das Bild unten zeigt den
genauen Platz eines Route Service in Bezug auf den Client und unsere
Applikation.

![Route Services](https://s12.postimg.org/tlc386ivh/route_services.png)

Beim Binden einer Service-Instanz an eine Route wird die `route_service_url` im
Cloud-Foundry-Router mit der Route verknüpft. Alle Requests für die Route werden
an die unter `route_service_url` angegebene URL weitergeleitet.

Sobald ein Route Service seine Funktion erfüllt hat, wird erwartet, dass er den
Request an die Route weiterleitet, an die der ursprüngliche Request gerichtet
war. Der Cloud-Foundry-Router fügt einen Header (`X-CF-Forwarded-Url`) mit der
Adresse der Route hinzu sowie zwei Header (`X-CF-Proxy-Signature` und
`X-CF-Proxy-Metadata`), mit denen die Route selbst den vom Route Service
gesendeten Request validiert.

Wie im Bild oben ersichtlich, schickt der Router den Request über eine
zusätzliche Schleife durch den Route Service und leitet ihn erst an die App
weiter, wenn er ein zweites Mal durchläuft (jetzt mit den entsprechenden
Headern).

## Dein erster Route Service

In diesem Tutorial verwenden wir einen
[User-Provided Service](https://docs.cloudfoundry.org/devguide/services/user-provided.html)
als Rate Limiter für eine (oder mehrere) unserer Applikationen. User-Provided
Services lassen sich auch als Route Services einsetzen. Beim Erstellen eines
User-Provided Service kannst du mit dem Flag `-r` eine URL setzen, an welche die
Requests weitergeleitet werden. Danach erstellen wir eine App (den eigentlichen
Rate Limiter), die auf Requests an dieser URL wartet.

Du kannst für dieses Tutorial jeden
[Cloud-Foundry-Anbieter](https://www.cloudfoundry.org/use/cloud-foundry-certified/)
verwenden. Ich nutze als Beispiel die
[Swisscom Application Cloud](https://developer.swisscom.com).

Dieses Tutorial setzt voraus, dass du eine laufende App auf Cloud Foundry hast,
auf die du den Rate Limiter anwenden kannst. Jede App mit einer Route tut es.
Falls du keine hast, kannst du einfach eine Dummy-App wie
[diese](https://github.com/swisscom/cf-default-app-staticfile) mit `cf push`
deployen.

### Rate Limiter pushen

Als Erstes erstellen wir den eigentlichen Rate Limiter. Klone einfach
[dieses Repo](https://github.com/cloudfoundry-samples/ratelimit-service), das
eine kleine Go-App zum Rate Limiting enthält. Pushe die App dann mit folgendem
Befehl in deinen Space:

```shell
$ cf push rate-limiter -m 64M
```

Möglicherweise musst du mit dem Flag `--hostname` einen anderen Hostnamen
angeben oder mit `--random-route` einen zufälligen verwenden, weil der Standard
bereits vergeben ist.

### User-Provided Service erstellen

Als Nächstes erstellen wir den Route Service als User-Provided Service. Dieser
leitet dann alle Requests, die an gebundenen Routen eintreffen, an die mit `-r`
angegebene URL weiter (vergiss nicht, den Hostnamen der URL an den anzupassen,
den du für deine «rate-limiter»-App gewählt hast):

```shell
$ cf create-user-provided-service rate-limiter-service -r https://rate-limiter.scapp.io
```

Du solltest für diese URL immer `https` verwenden, um die Verbindung zwischen
dem CF-Router und deinem Route Service sicherer zu machen.

### Service an Route binden

Als letzten Schritt binden wir den neu erstellten Service an die Route jener
App, auf die wir den Rate Limiter anwenden wollen (vergiss nicht, den Hostnamen
durch deinen eigenen zu ersetzen):

```shell
$ cf bind-route-service scapp.io rate-limiter-service --hostname myapp
```

### Unseren Rate Limiter testen

Um unseren Rate Limiter zu testen, senken wir das Limit auf 1 Request pro
Sekunde (Standard ist 10). Setze dazu die Umgebungsvariable `RATE_LIMIT` auf `1`
und führe ein Restage der App durch:

```shell
$ cf set-env rate-limiter RATE_LIMIT 1
$ cf restage rate-limiter
```

Im nächsten Schritt bringen wir Last auf die App. Ich verwende
[loadtest](https://www.npmjs.com/package/loadtest), du kannst aber jedes andere
Tool wie [ab](https://de.wikipedia.org/wiki/ApacheBench) oder
[Goad](https://goad.io/#demo) nutzen. Vergiss auch hier nicht, den Hostnamen
durch den zu ersetzen, den du für deine App gewählt hast.

```shell
$ loadtest --rps 1000 https://myapp.scapp.io
```

Du kannst die Logs deines Rate Limiters in einem separaten Fenster mit
`cf logs rate-limiter` öffnen, um die eingehenden Requests direkt
mitzuverfolgen.

Die App sollte auch unter der Last von 1000 Requests pro Sekunde funktionsfähig
bleiben. Wenn du den Rate Limiter abschaltest, indem du «rate-limiter-service»
von der Route löst,

```shell
$ cf unbind-route-service scapp.io rate-limiter-service --hostname myapp
```

und den Test danach erneut ausführst, wird die App die Requests höchstwahr-
scheinlich nicht mehr zeitnah bedienen können, weil sie nicht mehr vom Rate
Limiter geschützt ist.

## Wie geht es weiter?

Die [Samples-Bibliothek](https://github.com/cloudfoundry-samples) von Cloud
Foundry enthält noch einen zweiten Route Service, den du auf dieselbe Weise
deployen kannst: den
[Logging Route Service](https://github.com/cloudfoundry-samples/logging-route-service).
Hast du weitere Ideen für Anwendungsfälle von Route Services? Lass es mich in
den Kommentaren wissen!
