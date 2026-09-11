---
title: Einen Krypto-Trading-Bot auf Cloud Foundry betreiben
author: Lena Fuhrimann
pubDate: 2017-12-11
tags: ["cryptocurrency", "trading", "cloud-foundry", "automation", "zenbot"]
description:
  "Deploye Zenbot, einen Open-Source-Trading-Bot für Kryptowährungen, auf Cloud
  Foundry, um deine Krypto-Handelsstrategien auf Plattformen wie GDAX zu
  automatisieren."
image: ../../../assets/blog/crypto.jpg
---

Alle reden über [Bitcoin](https://de.wikipedia.org/wiki/Bitcoin) und seine
Schwesterwährungen. Der Hype ist so gross, dass selbst Kleinanlegerinnen und
-anleger ohne Ahnung von Finanzkonstrukten – so wie ich – auf den Investment-
und Trading-Zug aufspringen wollen. Deshalb habe ich kürzlich beschlossen, mir
ein eigenes Konto bei [GDAX](https://www.gdax.com/) zu erstellen und mein Glück
zu versuchen.

Traden hat anfangs Spass gemacht, aber ich habe ziemlich schnell gemerkt, dass
ich nicht der Typ Mensch bin, der alle fünf Minuten auf sein Dashboard schauen
will. Ausserdem habe ich keine klare Strategie, wann ich in was investieren und
wann ich wieder aussteigen soll. Preis-Charts richtig lesen zu können, erfordert
viel Übung und Wissen. Es gibt aber Muster, die sich erkennen lassen. Da das
reine Analysearbeit ist, dachte ich mir, dass das der perfekte Job für einen
Computer wäre. Also habe ich mich online umgesehen und mit
[Zenbot](https://github.com/carlos8f/zenbot) meine Antwort gefunden. Es ist ein
quelloffener, cloud-tauglicher Trading-Bot für Kryptowährungen. Deployen wir ihn
auf Cloud Foundry.

**Wichtig**: Die vorgestellte Software und die Konzepte sind noch sehr jung.
Bitte nutze sie mit grosser Vorsicht und investiere nicht gleich zu Beginn hohe
Beträge.

## Repo klonen

Zuerst müssen wir das Repo von [GitHub](https://github.com/carlos8f/zenbot)
klonen. Es empfiehlt sich, den neuesten Tag auszuchecken, damit du nicht dein
ganzes Geld einem möglicherweise instabilen `master`-Branch anvertraust.

## Services erstellen

Zenbot hat zwei Abhängigkeiten, die es zum Funktionieren braucht. Die erste ist
[MongoDB](https://www.mongodb.com/). In den meisten Cloud-Foundry-Installationen
bekommst du die mit einem einfachen Befehl wie diesem:

```shell
$ cf create-service mongodb small zenbot-db
```

Die nächste Abhängigkeit ist ein GDAX-API-Client. Jede der grossen
Trading-Plattformen tut es, aber ich nutze der Einfachheit halber GDAX.
[Hier](https://github.com/carlos8f/zenbot#description) findest du eine Liste der
unterstützten Plattformen. Um GDAX zu nutzen, besuche deren
[Website](https://www.gdax.com/) und erstelle ein Konto. Der Prozess ist etwas
mühsam, weil du einen Lichtbildausweis hochladen und ein paar weitere
Verifizierungsschritte durchlaufen musst. Aber glaub mir, am Ende lohnt es sich.
Nach der Anmeldung wählst du oben links das Produkt, das du handeln willst (z.B.
BTC/EUR), und überweist etwas Geld auf dein Konto (entweder per Kreditkarte, ab
einem Bankkonto oder von einem bestehenden
[Coinbase](https://www.coinbase.com)-Konto).

Danach gehst du in die API-Einstellungen und erstellst ein neues Set von
API-Keys mit der Berechtigung «Trade». Notiere dir die Credentials und erstelle
dafür einen User-Provided Service (beachte: Damit können alle mit den
entsprechenden Berechtigungen in Cloud Foundry deine API-Credentials sehen):

```shell
$ cf create-user-provided-service zenbot-gdax -p '{"key":"YOUR-API-KEY","b64secret":"YOUR-API-SECRET","passphrase":"YOUR-API-PASSPHRASE"}'
```

Falls du eine andere Trading-Plattform nutzt, erstellst du einen ähnlichen
User-Provided Service mit deren API-Credentials.

## Den Bot konfigurieren

Jetzt, wo die Services eingerichtet sind, müssen wir Zenbot sagen, dass es sie
verwenden soll. Kopiere `conf-sample.js` nach `conf.js` und füge die folgenden
Zeilen hinzu, damit die entsprechenden Konfigurationswerte automatisch aus der
Umgebungsvariable `VCAP_SERVICES` gelesen werden, die Cloud Foundry
bereitstellt:

```javascript
// Diesen Teil nach der bestehenden MongoDB-Konfiguration einfügen

if (process.env.VCAP_SERVICES) {
  const creds = JSON.parse(process.env.VCAP_SERVICES).mongodb[0].credentials;
  c.mongo.host = creds.host;
  c.mongo.port = creds.port;
  c.mongo.db = creds.database;
  c.mongo.username = creds.username;
  c.mongo.password = creds.password;
}
```

```javascript
// Diesen Teil nach der bestehenden GDAX-Konfiguration einfügen

if (process.env.VCAP_SERVICES) {
  const creds = JSON.parse(process.env.VCAP_SERVICES)["user-provided"][0]
    .credentials;
  c.gdax.key = creds.key;
  c.gdax.b64secret = creds.b64secret;
  c.gdax.passphrase = creds.passphrase;
}
```

Damit wird die Konfiguration automatisch aus der Umgebung gelesen, sofern die
Variable `VCAP_SERVICES` vorhanden ist.

Ausserdem machen wir es möglich, das gehandelte Produkt und die verwendete
Strategie über Umgebungsvariablen zu konfigurieren. Ändere dazu die folgenden
Zeilen:

```javascript
// default selector. only used if omitting [selector] argument from a command.
c.selector = "gdax.BTC-USD";
// name of default trade strategy
c.strategy = "trend_ema";
```

zu diesen:

```javascript
// default selector. only used if omitting [selector] argument from a command.
c.selector = process.env.ZENBOT_SELECTOR || "gdax.BTC-USD";
// name of default trade strategy
c.strategy = process.env.ZENBOT_STRATEGY || "trend_ema";
```

So können wir den Selector (also das Produkt) und die Trading-Strategie, die der
Bot verwenden soll, über Umgebungsvariablen setzen. Eine Liste der möglichen
Werte erhältst du mit den folgenden Befehlen im Root-Verzeichnis des Repos:

```shell
$ ./zenbot.sh list-selectors
$ ./zenbot.sh list-strategies
```

## Manifest erstellen

Der letzte Schritt vor dem Pushen deines Bots ist, eine Datei `manifest.yml` zu
erstellen, um das Setup deines Deployments zu automatisieren. Sie sollte so
aussehen:

```yaml
applications:
  - name: zenbot
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/nodejs-buildpack.git
    no-route: true
    health-check-type: process
    services:
      - zenbot-db
      - zenbot-gdax
    env:
      ZENBOT_SELECTOR: "gdax.BTC-EUR"
```

Ersetze den Selector durch das Produkt, das du handeln willst, und füge eine
weitere Zeile hinzu, falls du nicht die Standard-Trading-Strategie verwenden
willst.

## Pushen

Jetzt musst du nur noch `cf push` ausführen, um deinen Bot zu deployen. Nach
einem erfolgreichen Deployment kannst du mit folgendem Befehl einen Live-Log-
Stream abgreifen und genau sehen, was dein Bot handelt:

```shell
$ cf logs zenbot --recent
```

Unter
[Reading the Console Output](https://github.com/carlos8f/zenbot#reading-the-console-output)
findest du eine Anleitung, wie diese Logs zu interpretieren sind. Im Kern gilt:
Wenn die letzte Zahl grün ist, solltest du mit dem Bot zufrieden sein – und wenn
die zweitletzte Zahl grün ist, solltest du generell zufrieden sein ;-)
