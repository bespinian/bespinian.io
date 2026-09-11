---
title: Einen CI/CD-Server auf Cloud Foundry betreiben
author: Lena Fuhrimann
pubDate: 2016-02-16
tags: ["ci-cd", "cloud-foundry", "strider", "automation", "deployment"]
description:
  "Deploye Strider, einen Open-Source-CI/CD-Server, auf Cloud Foundry, um deine
  Applikationen bei jedem Git-Push automatisch zu testen, zu bauen und zu
  deployen."
image: ../../../assets/blog/pipes.jpg
---

Apps auf Cloud Foundry zu pushen, ist dank des Befehls `cf push` denkbar
einfach. Trotzdem ist es mühsam, den Code nach jeder Änderung zu pushen, nur um
zu sehen, ob er in der Cloud noch läuft. Genau hier ist ein CI/CD-Server
nützlich. Er testet, baut und deployt deinen Code jedes Mal, wenn du mit
`git push` in ein Git-Repo pushst.

[Strider](https://github.com/strider-cd/strider) ist ein
Open-Source-CI/CD-Server auf Basis von [Node.js](https://nodejs.org) und
[MongoDB](https://mongodb.org). Er lässt sich gut mit Git und dessen gehosteten
Lösungen integrieren (z.B. [GitHub](https://github.com),
[Bitbucket](https://bitbucket.org) oder [GitLab](https://gitlab.com)) und bringt
eine Reihe von Plugins mit, die fast alle Bedürfnisse abdecken. Die Idee:
Strider «beobachtet» deine Git-Repos und durchläuft bei Änderungen die folgenden
Phasen:

1. Eine Umgebung aufsetzen, um deinen Code zu testen
2. Deine Tests ausführen
3. Deinen Code bauen/kompilieren, wenn die Tests erfolgreich sind
4. Deinen Code deployen, wenn Build/Kompilierung erfolgreich sind

Das eignet sich hervorragend für den Einsatz mit Cloud Foundry, weil es einen
modernen, cloud-tauglichen Continuous-Integration- und Deployment-Prozess
sicherstellt. Beim Pushen von neuem Code kannst du dir immer sicher sein, dass
er getestet und (auf dem richtigen Branch) in die entsprechende Umgebung deployt
wird. Und das Beste: Alles läuft auf Cloud Foundry. Du deployst also von Cloud
Foundry nach Cloud Foundry.

Falls du Cloud Foundry noch nicht nutzt, kannst du dich unter
[https://developer.swisscom.com](https://developer.swisscom.com) registrieren.

## Strider in der Cloud zum Laufen bringen

Wir müssen allerdings ein paar Anpassungen am Code von Strider vornehmen, damit
er auf Cloud Foundry läuft. Forke und klone also das
[Strider-Repo](https://github.com/strider-cd/strider), öffne es in deinem
liebsten Texteditor und folge diesen einfachen Schritten:

### 1. cfenv installieren

Installiere das npm-Paket `cfenv` mit

```shell
$ npm install cfenv --save
```

Mit diesem Paket greifst du bequem auf die Cloud-Foundry-Services zu, die du an
deine Applikation bindest.

### 2. Mit CF-Services verbinden

Öffne `bin/strider` und füge folgenden Code am Anfang der Datei ein:

```javascript
const cfEnv = require("cfenv");
const appEnv = cfEnv.getAppEnv();

process.env.SERVER_NAME = appEnv.url;

if (process.env.VCAP_SERVICES) {
  process.env.DB_URI = appEnv.getService("strider-db").credentials.uri;
  process.env.SMTP_HOST = appEnv.getService("mailgun").credentials.hostname;
  process.env.SMTP_USER = appEnv.getService("mailgun").credentials.username;
  process.env.SMTP_PASS = appEnv.getService("mailgun").credentials.password;
}
```

Damit verbindet sich Strider mit einem Cloud-Foundry-Service namens
`strider-db`. In unserem Fall muss das eine MongoDB sein, mit der Strider
arbeiten kann. Ausserdem verbindet er sich mit einem Cloud-Foundry-Service
namens `mailgun`, den wir später erstellen und über den wir aus Strider E-Mails
verschicken können.

### MongoDB erstellen

Erstelle mit folgendem Befehl einen MongoDB-Service in Cloud Foundry

```shell
$ cf create-service mongodb small strider-db
```

(kann je nach Cloud-Foundry-Anbieter abweichen) – und zwar in dem Space, in den
du deine Strider-Instanz deployen willst.

### E-Mail-Server erstellen

Jetzt ist es Zeit, einen E-Mail-Server zu erstellen, damit Strider Einladungen
oder Benachrichtigungen per E-Mail versenden kann. Besuche die
[Mailgun-Website](https://www.mailgun.com) und erstelle ein Konto. Damit
erhältst du eine Sandbox-Domain und einige Credentials:

![Mailgun-Credentials](/images/mailgun.png)

Diese Credentials müssen wir jetzt über einen User-Provided Service in Cloud
Foundry hinterlegen. Das geht mit folgendem Befehl:

```shell
$ cf create-user-provided-service mailgun -p '{ "hostname": "smtp.mailgun.org", "username": "<your-mailgun-smtp-login>", "password": "<your-mailgun-password>" }'
```

Damit entsteht in unserem Space ein Service, der deine Mailgun-Credentials über
Umgebungsvariablen an jede daran gebundene App weitergibt.

### manifest.yml hinzufügen

Deine App ist jetzt bereit, lokal zu laufen (mit `npm start`). Um sie in die
Cloud zu pushen, erstellst du im Root-Verzeichnis von Strider eine Datei
`manifest.yml` mit folgendem Inhalt:

```yaml
applications:
  - name: strider
    host: strider
    memory: 2048MB
    instances: 1
    buildpacks:
      - https://github.com/cloudfoundry/buildpack-nodejs.git
    services:
      - strider-db
      - mailgun
    env:
      NODE_ENV: production
```

Das liefert Cloud Foundry die Setup-Anweisungen, um deine Applikation korrekt zu
betreiben. Es erstellt eine App mit 2048 MB Memory, es können also Kosten
anfallen (je nach Anbieter).

### cf push

Das war's. Du bist jetzt bereit, deine Strider-Instanz in Cloud Foundry zu
betreiben. Führe einfach `cf push` aus, um sie in die Cloud zu deployen.

Möglicherweise ist die Route, die du verwenden willst, bereits von einer anderen
App belegt. Ändere in diesem Fall einfach die Eigenschaft `host` in
`manifest.yml` auf etwas noch Freies.

## Deinen Admin-User anlegen

Jetzt, wo unsere App in der Cloud läuft, bleibt nur noch ein Problem: Wir kommen
nicht rein … Bei Strider erstellt man den ersten Admin-User normalerweise über
die CLI. Leider ist es für uns aber nicht einfach, auf dieses
Kommandozeilen-Interface im App-Container zuzugreifen. Deshalb tragen wir
unseren Admin-User direkt in die Datenbank ein – mit dem Swisscom-Plugin
[Service Connector](http://docs.developer.swisscom.com/service-connector/index.html).
Öffne den Link und folge der Anleitung zur Installation.

Um dich mit deiner MongoDB zu verbinden und den Admin-User einzutragen, müssen
wir zuerst Credentials für die manuelle Verbindung zur Datenbank erstellen. Gib
dazu ein:

```shell
$ cf create-service-key strider-db mykey
```

Rufe die Credentials dann so ab:

```shell
$ cf service-key strider-db mykey
```

Damit können wir uns jetzt mit der MongoDB verbinden und unsere User eintragen.
Führe dazu aus:

```shell
$ cf service-connector 13000 <your-mongodb-host>:<your-mongodb-port>
```

um die Verbindung zu öffnen. Öffne dann ein neues Konsolenfenster und verbinde
deine MongoDB-Shell (die musst du
[installiert](https://docs.mongodb.org/manual/installation) haben) mit folgendem
Befehl mit der geöffneten Verbindung:

```shell
$ mongo localhost:13000/<your-mongodb-database> --username <your-mongodb-username> --password <your-mongodb-password>`
```

Jetzt haben wir eine authentifizierte und autorisierte Verbindung in unsere DB.
Gib in der MongoDB-Shell ein:

```shell
> db.users.insert({ "account_level" : 1, "hash" : "$2a$10$llY8X.g9GPW/tygE0UQfZ.yN.YSccIIuAyxO41Si4odoVEhLBlxcy", "salt" : "$2a$10$llY8X.g9GPW/tygE0UQfZ.", "email" : "<your-email-address>", "jobs" : [ ], "projects" : [ ], "accounts" : [ ] })
```

Danach kannst du die beiden Terminalfenster schliessen.

Super – du kannst dich jetzt mit diesen Credentials bei Strider anmelden und
über das GUI damit arbeiten. Das Passwort hinter dem angegebenen Hash und Salt
lautet `passw0rd`. **Du solltest es unmittelbar nach dem ersten Login ändern.**

## CI/CD für Node.js-Apps

Über das GUI kannst du jetzt deinen GitHub- oder Bitbucket-Account hinzufügen
und ein erstes Repo anlegen. Am einfachsten ist eine Node.js-App, Strider hat
aber auch Plugins für Ruby, Python und .NET. Möglicherweise kann er auch andere
Apps (z.B. Java oder Go) bauen und ausführen, das habe ich aber noch nicht
ausprobiert. Node.js-Apps fügst du im GUI zu Strider hinzu und gibst einen
Branch an (z.B. `master`), auf dem er auf Änderungen lauschen soll. Danach fügst
du die drei Plugins «Node.js», «Environment» und «Custom Scripts» hinzu. Das
Node.js-Plugin nutzen wir, um unsere bevorzugte Node.js-Version zu installieren
und die Tests unserer App auszuführen (mit `npm test`). In den Einstellungen des
Custom-Scripts-Plugins definieren wir unser Skript für das Deployment auf Cloud
Foundry.

### Deployment-Skript ausführen

Füge folgendes Skript in der Phase «Deployment» des Plugins hinzu:

```bash
# Cloud Foundry CLI installieren
curl -L "https://cli.run.pivotal.io/stable?release=linux64-binary&source=github" | tar -zx

# CF-Login und -Authentifizierung
cf api "${CF_API}"
cf auth "${CF_USERNAME}" "${CF_PASSWORD}"
cf target -o "${CF_ORG}" -s "${CF_SPACE}"

# App pushen
cf push
```

Dieses Skript pusht unsere App einfach mit den Credentials, die wir ihm über das
Plugin «Environment» mitgeben, und der neuesten Cloud Foundry CLI. Für ein
fortgeschritteneres Deployment-Skript kannst du mein
[Blue-Green-Deployment-Skript](https://gist.github.com/cloudlena/3eb3c0e2e5e3558d56d1)
auf GitHub ansehen.

### Umgebungsvariablen hinzufügen

Um diese Variablen bereitzustellen, trägst du sie in den Einstellungen des
Plugins «Environment» ein. Wir brauchen die folgenden:

- `CF_API` – Der API-Endpunkt deiner Cloud-Foundry-Installation (z.B.
  `https://api.lyra-836.appcloud.swisscom.com` für die Swisscom App Cloud)
- `CF_USERNAME` – Dein Cloud-Foundry-Benutzername
- `CF_PASSWORD` – Dein Cloud-Foundry-Passwort
- `CF_ORG` – Die Cloud-Foundry-Organisation, in die du deine App deployen willst
- `CF_SPACE` – Der Cloud-Foundry-Space, in den du deployen willst

## Git Push

Jetzt, wo deine App für CI/CD eingerichtet ist, ist es Zeit, ein paar Änderungen
mit `git push` zu pushen und Strider bei der Arbeit zuzusehen.
