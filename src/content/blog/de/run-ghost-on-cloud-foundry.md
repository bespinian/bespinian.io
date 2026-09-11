---
title: Ghost auf Cloud Foundry betreiben
author: Lena Fuhrimann
pubDate: 2017-07-27
tags: ["ghost", "cloud-foundry", "blog", "nodejs", "cms"]
description:
  "Deploye Ghost, eine moderne Blogging-Plattform auf Node.js-Basis, auf Cloud
  Foundry – mit MariaDB und optionalem S3-Storage für Mediendateien."
image: ../../../assets/blog/ghost.jpg
---

Dieser Blog läuft auf [Ghost](https://github.com/TryGhost/Ghost). Das ist eine
ziemlich leichtgewichtige Blogging-Plattform auf Basis von
[Node.js](https://nodejs.org/). Schauen wir uns an, wie sie sich auf Cloud
Foundry betreiben lässt.

## Services erstellen

Um Ghost zu betreiben, brauchen wir zwei Services: eine Datenbank und einen
E-Mail-Server. Erstellen wir zuerst die Datenbank. Ich verwende hier die
[Swisscom Application Cloud](https://developer.swisscom.com/), du kannst aber
jeden Cloud-Foundry-Anbieter nutzen. Wir erstellen einen kleinen
MariaDB-Service, der wie MySQL funktioniert und daher von Ghost verwendet werden
kann. Führe zum Erstellen folgenden Befehl aus:

```bash
$ cf create-service mariadbent usage blog-db
```

Jetzt können wir unseren E-Mail-Service erstellen. Am einfachsten geht das mit
[Mailgun](https://www.mailgun.com/). Erstelle einfach kostenlos ein Konto auf
deren Seite und hinterlege die Credentials in einem User-Provided Service in
Cloud Foundry, um beide zu verbinden:

```bash
$ cf create-user-provided-service mailgun -p '{ "username": "<your-mailgun-smtp-login>", "password": "<your-mailgun-password>" }'
```

Ersetze die Werte in `<>` durch deine jeweiligen Credentials.

## Den Quellcode beschaffen

Den Quellcode von Ghost zu bekommen, ist mühelos. Besuche einfach die
[Releases](https://github.com/TryGhost/Ghost/releases)-Seite und lade die
neueste Version als ZIP-Archiv herunter. Entpacke es und wechsle im Terminal mit
`cd` in den entsprechenden Ordner.

## Entrypoint-Skript erstellen

Ghost muss über eine Konfigurationsdatei konfiguriert werden. Wir nennen unsere
`config.producton.json`, da sie für einen produktiven Blog geeignet sein soll.
Diese Datei sagt Ghost, wo es seine Datenbank findet, welchen E-Mail-Server es
nutzen soll und wie es den Blog generell betreiben soll.

In Cloud Foundry werden Services dynamisch konfiguriert, was in einer einfachen
JSON-Datei nicht möglich ist. Wir umgehen das mit einem Bash-Skript, das die
Umgebung ausliest und die Konfigurationsdatei zur Laufzeit erzeugt. Erstelle im
Root-Verzeichnis deiner App eine neue Datei namens `entrypoint-cf.sh` und füge
folgenden Inhalt ein:

```bash
#!/bin/bash

set -e -u

# App-URL
app_uri="$(echo "${VCAP_APPLICATION}" | jq -r '.application_uris[0] // ""')"
app_url="https://${app_uri}"

# Datenbank
db_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["mariadbent"][0].credentials // ""')"
if [ -z "${db_credentials}" ]; then
  echo "Error: Please bind a MariaDB service" >&2
  exit 1
fi
db_host="$(echo "${db_credentials}" | jq -r '.host // ""')"
db_username="$(echo "${db_credentials}" | jq -r '.username // ""')"
db_password="$(echo "${db_credentials}" | jq -r '.password // ""')"
db_database="$(echo "${db_credentials}" | jq -r '.database // ""')"

# E-Mail-Service
email_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["user-provided"][0].credentials // ""')"
if [ -z "${db_credentials}" ]; then
  echo "Error: Please bind an Email service" >&2
  exit 1
fi
email_username="$(echo "${email_credentials}" | jq -r '.username // ""')"
email_password="$(echo "${email_credentials}" | jq -r '.password // ""')"

# Konfigurationsdatei erstellen
jq -n "{
    url: \"${app_url}\",
    mail: {
        transport: \"SMTP\",
        options: {
            service: \"Mailgun\",
            auth: {
                user: \"${email_username}\",
                pass: \"${email_password}\"
            }
        }
    },
    database: {
        client: \"mysql\",
        connection: {
            host: \"${db_host}\",
            user: \"${db_username}\",
            password: \"${db_password}\",
            database: \"${db_database}\"
        }
    },
    server: {
        host: \"0.0.0.0\",
        port: ${PORT}
    }
}" > config.production.json

# DB initialisieren und migrieren
./node_modules/.bin/knex-migrator init
./node_modules/.bin/knex-migrator migrate

# Die App starten
npm start
```

Mache das Skript dann mit folgendem Befehl ausführbar:

```bash
$ chmod +x entrypoint-cf.sh
```

Dieses Skript holt sich alle nötigen Umgebungsvariablen und erzeugt mit `jq`
(das im Node.js-Buildpack vorinstalliert ist) einen JSON-String mit der
Konfiguration, der dann in eine Datei `config.production.json` geschrieben wird.
Danach führt das Skript (falls nötig) eine Datenbankmigration aus und startet
die App.

Jetzt müssen wir Cloud Foundry nur noch sagen, dass es zum Starten der App
dieses Skript ausführen soll, statt direkt `npm start` aufzurufen (der Standard
für Node.js-Apps). Das machen wir in der Datei `manifest.yml`, aus der Cloud
Foundry seine Anweisungen zum Betrieb einer App bezieht. Erstelle im
Root-Verzeichnis der App eine neue Datei namens `manifest.yml` mit folgendem
Inhalt:

```yaml
applications:
  - name: my-blog
    memory: 256MB
    buildpacks:
      - https://github.com/cloudfoundry/nodejs-buildpack.git
    command: ./entrypoint-cf.sh
    services:
      - blog-db
      - mailgun
    env:
      NODE_ENV: production
```

Das weist CF an, das richtige Buildpack zu verwenden und die App mit unserem
Entrypoint-Skript zu starten. Zudem setzt es die Umgebungsvariable `NODE_ENV`
auf `production`, was Node.js und Ghost auf bessere Performance optimiert.
Ausserdem sagt es Cloud Foundry, die beiden oben erstellten Services an unsere
Blog-App zu binden.

Die Konfiguration unserer App ist damit fertig. Jetzt musst du nur noch
folgenden Befehl ausführen, damit unser Blog in der Cloud läuft:

```bash
$ cf push
```

Willkommen in der fabelhaften Welt des Ghost-Bloggings!

## Disqus hinzufügen (optional)

Deinen Leserinnen und Lesern das Kommentieren deiner Blogbeiträge zu
ermöglichen, ist ein guter Weg, deinen Blog interaktiver zu machen.
[Disqus](https://disqus.com/) einzubinden, ist ein unkomplizierter Weg dorthin.

Besuche einfach deren Website, erstelle ein Konto und registriere deinen Blog
als neue Site. Öffne dann `content/themes/casper/post.hbs` und suche in der
Datei nach einem Kommentar zu Disqus. Dort gibt es einen Abschnitt, den du
auskommentieren und in dem du die Beispiel-URL durch die deines Blogs ersetzen
musst. Folge den Schritten, die im Kommentar beschrieben sind.

Danach führst du `cf push` aus – das war's. Dein Blog ist jetzt interaktiv.

## Object Storage hinzufügen (optional)

Irgendwann willst du Bilder und andere Assets hochladen, die aus deinem Blog
erreichbar sind (z.B. für Header-Bilder von Beiträgen). Wenn du das jetzt tust,
gehen die Bilder bei jedem Neustart der App verloren. Wir müssen diese Bilder
also in einem S3-Storage ablegen. Die folgenden Abschnitte zeigen am Beispiel
der Swisscom Application Cloud, wie das geht.

Folge dazu
[diesem Tutorial](/de/blog/manage-buckets-on-cloud-foundry-s3-services/), um
einen S3-Service samt Bucket zu erstellen, und nenne die Service-Instanz
«blog-storage».

Als Nächstes müssen wir die App an unseren neu erstellten Service binden. Füge
folgende Zeile im Abschnitt `services` unserer `manifest.yml` hinzu:

```yaml
- blog-storage
```

Jetzt müssen wir den
[ghost-storage-adapter-s3](https://github.com/colinmeinke/ghost-storage-adapter-s3)
installieren, damit Ghost weiss, wie es mit unserem S3-Service sprechen soll.
Führe dazu die Installationsbefehle vom obigen Link in dem Ordner aus, in dem du
das Ghost-Repo hast. Cloud Foundry wird versuchen, die Abhängigkeiten für Ghost
mit `yarn` zu installieren. Da die Installationsbefehle den S3-Storage-Adapter
mit `npm` installieren, müssen wir das ändern. Das erreichst du ganz einfach,
indem du die Datei `yarn.lock` entfernst:

```bash
$ rm yarn.lock
```

Als Nächstes müssen wir unser Skript `entrypoint-cf.sh` anpassen, damit es den
S3-Service einbezieht. Füge die folgenden Zeilen dort ein, wo die
Service-Variablen gelesen werden:

```bash
# Storage-Service
s3_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["dynstrg"][0].credentials // ""')"
if [ -z "${s3_credentials}" ]; then
  echo "Error: Please bind an S3 service" >&2
  exit 1
fi
s3_endpoint="$(echo "${s3_credentials}" | jq -r '.accessHost // ""')"
s3_namespace="$(echo "${s3_credentials}" | jq -r '.namespace // ""')"
s3_access_key_id="$(echo "${s3_credentials}" | jq -r '.accessKey // ""')"
s3_secret_access_key="$(echo "${s3_credentials}" | jq -r '.sharedSecret // ""')"
```

Füge dann den folgenden Teil zum JSON-Konfigurations-Template am Ende der Datei
hinzu:

```bash
    storage: {
      active: \"s3\",
      s3: {
        endpoint: \"${s3_endpoint}\",
        assetHost: \"https://${s3_namespace}.ds11s3ns.swisscom.com/${S3_BUCKET_NAME}\",
        accessKeyId: \"${s3_access_key_id}\",
        secretAccessKey: \"${s3_secret_access_key}\",
        bucket: \"${S3_BUCKET_NAME}\"
      }
    },
```

Damit weist du Ghost an, den S3-Storage-Adapter zu verwenden.

Jetzt musst du unsere App nur noch erneut pushen:

```bash
$ cf push
```

Und das war's! Alle Bilder, die du jetzt über die Ghost-Admin-Konsole hochlädst,
landen in deinem S3-Service.

## Syntax-Highlighting hinzufügen (optional)

Mit highlight.js bekommst du sauberes Syntax-Highlighting für die Code-Snippets
in deinen Blogbeiträgen (siehe Beispiel oben). Es unterstützt viele
Programmiersprachen und verschiedene Themes.

Um es in deinen Blog zu bringen, fügst du die folgenden Snippets einfach im
Bereich «Code injection» deiner Ghost-Einstellungen ein:

Blog-Header:

```html
<style>
  .hljs {
    color: #a9b7c6;
    background: #282b2e;
    display: block;
    overflow-x: auto;
    padding: 0.5em;
  }
  .hljs-number,
  .hljs-literal,
  .hljs-symbol,
  .hljs-bullet {
    color: #6897bb !important;
  }
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-deletion {
    color: #cc7832 !important;
  }
  .hljs-variable,
  .hljs-template-variable,
  .hljs-link {
    color: #629755 !important;
  }
  .hljs-comment,
  .hljs-quote {
    color: #808080 !important;
  }
  .hljs-meta {
    color: #bbb529 !important;
  }
  .hljs-string,
  .hljs-attribute,
  .hljs-addition {
    color: #6a8759 !important;
  }
  .hljs-section,
  .hljs-title,
  .hljs-type {
    color: #ffc66d !important;
  }
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #e8bf6a !important;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
</style>
```

Blog-Footer:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
<script>
  hljs.initHighlightingOnLoad();
</script>
```

Wenn du ein anderes Theme verwenden willst (das obige heisst `androidstudio`),
musst du das minifizierte CSS deines Themes in die `<style>`-Tags des Headers
kopieren und danach bei allen Farben `!important` ergänzen, damit sie nicht vom
Theme von Ghost überschrieben werden.

Damit wird highlight.js geladen und initialisiert. Klicke auf «Save», um deinen
Blog zu aktualisieren, und geniesse farbiges Syntax-Highlighting!
