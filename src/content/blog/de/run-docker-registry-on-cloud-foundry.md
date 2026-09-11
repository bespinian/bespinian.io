---
title: Docker Registry auf Cloud Foundry betreiben
author: Lena Fuhrimann
pubDate: 2017-08-24
tags: ["docker", "cloud-foundry", "registry", "containers", "s3"]
description:
  "Deploye eine private Docker Registry auf Cloud Foundry – mit S3 als Storage
  und Redis als Cache –, um deine Container-Images sicher zu verwalten."
image: ../../../assets/blog/containers.jpg
---

Wenn du viel mit [Docker](https://www.docker.com/) arbeitest, kennst du
wahrscheinlich das Konzept einer
[Docker Registry](https://docs.docker.com/registry/), in der du deine Images an
einem sicheren Ort ablegen kannst. Es gibt eine öffentliche Registry, die du im
[Docker Store](https://store.docker.com/) kostenlos nutzen kannst. Aber was,
wenn du nicht willst, dass deine Images öffentlich verfügbar sind? Was, wenn du
deine Images an einem sicheren Ort haben willst, den du kontrollierst? Die
Lösung ist, eine private Docker Registry zu deployen. Auf Cloud Foundry geht das
ziemlich einfach.

## Registry-Binary erstellen

Zuerst müssen wir das Binary der Registry erstellen, um es mit dem
[Binary Buildpack](https://github.com/cloudfoundry/binary-buildpack) auf Cloud
Foundry hochzuladen. Dazu musst du
[Docker](https://docs.docker.com/engine/installation/) installiert haben. Führe
ein `git clone` auf dem
[Docker-Distribution-Repo auf GitHub](https://github.com/docker/distribution)
aus:

```shell
$ git clone https://github.com/docker/distribution.git
```

Es empfiehlt sich, für den Build den neuesten Tag des Repos auszuchecken. So
stellst du sicher, dass du eine unterstützte Version von Docker Distribution und
damit der Registry hast.

Wechsle dann mit `cd` hinein und kompiliere es mit Docker:

```shell
$ docker run --rm -v "${PWD}:/go/src/github.com/docker/distribution" -w /go/src/github.com/docker/distribution golang make binaries
```

Erstelle nach dem Kompilieren irgendwo auf deinem Rechner einen neuen Ordner und
kopiere die Datei `bin/registry` hinein. Das ist die Binärdatei, welche die
gesamte Registry-Applikation enthält:

```shell
$ mkdir ~/registry && cp bin/registry ~/registry
```

Das wird dein Arbeitsverzeichnis für dieses Tutorial.

## S3-Service erstellen

Standardmässig legt die Registry die gepushten Docker-Images im lokalen
Dateisystem ab. Da Apps gemäss dem
[Twelve-Factor-App-Manifest](https://12factor.net/processes) zustandslos sein
sollten, ändern wir dieses Verhalten und nutzen stattdessen ein S3-Backend.
Folge dazu
[diesem Tutorial](/de/blog/manage-buckets-on-cloud-foundry-s3-services/) auf
meinem Blog, um einen S3-Service samt Bucket zu erstellen, und nenne den Service
«registry-storage».

## Redis-Cache erstellen

Dieser Schritt ist optional. Wenn du ihn weglässt, musst du allerdings alles
Redis-Bezogene aus den Dateien entfernen, die in den folgenden Schritten
beschrieben werden.

Um die Performance unserer Registry zu verbessern, können wir einen
[Redis](https://redis.io/)-Cache hinzufügen. Erstelle zuerst einen in Cloud
Foundry:

```shell
$ cf create-service redis small registry-cache
```

Auch dieses Beispiel verwendet die Swisscom Application Cloud. Wenn du einen
anderen CF-Anbieter nutzt, kann der Befehl abweichen.

## Manifest-Datei erstellen

Wechsle jetzt mit `cd` in deinen Registry-Ordner und erstelle eine Datei
`manifest.yml`. Cloud Foundry legt damit fest, wie deine App gepusht und
gestartet werden soll. Füge dann folgende Zeilen ein:

```yaml
applications:
  - name: registry
    host: my-hostname
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/binary-buildpack.git
    command: ./entrypoint-cf.sh
    services:
      - registry-storage
      - registry-cache
    env:
      REGISTRY_STORAGE_S3_BUCKET: my-bucket
      REGISTRY_HTTP_SECRET: xxx
```

Vergiss nicht, `my-bucket` durch deinen eigenen Bucket-Namen und `host` durch
einen noch freien Hostnamen zu ersetzen. Ausserdem musst du einen zufälligen
String generieren und als `REGISTRY_HTTP_SECRET` verwenden.

## Entrypoint-Skript erstellen

Wie du oben siehst, gibt das Manifest ein Entrypoint-Skript als auszuführenden
Befehl an. Dieses Skript erzeugt die `config.yml` der Registry aus unserer
Service-Konfiguration (die in der Umgebungsvariable `VCAP_SERVICES` steht) und
startet dann die App. Erstelle das Skript unter dem Namen `entrypoint-cf.sh` und
fülle es mit folgendem Inhalt:

```bash
#!/bin/bash

set -e -u

if [ -z "${PORT}" ]; then
  echo "Error: No PORT found" >&2
  exit 1
fi
if [ -z "${VCAP_SERVICES}" ]; then
  echo "Error: No VCAP_SERVICES found" >&2
  exit 1
fi

s3_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["dynstrg"][0].credentials // ""')"
if [ -z "${s3_credentials}" ]; then
  echo "Error: Please bind an S3 service" >&2
  exit 1
fi

s3_regionendpoint="$(echo "${s3_credentials}" | jq -r '.accessHost // ""')"
s3_access_key="$(echo "${s3_credentials}" | jq -r '.accessKey // ""')"
s3_secret_key="$(echo "${s3_credentials}" | jq -r '.sharedSecret // ""')"

redis_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["redis"][0].credentials // ""')"
if [ -z "${redis_credentials}" ]; then
  echo "Error: Please bind a Redis service" >&2
  exit 1
fi

redis_host="$(echo "${redis_credentials}" | jq -r '.host // ""')"
redis_port="$(echo "${redis_credentials}" | jq -r '.port // ""')"
redis_password="$(echo "${redis_credentials}" | jq -r '.password // ""')"

# Template füllen und in config.yml schreiben
echo "
version: 0.1

storage:
  s3:
    regionendpoint: https://${s3_regionendpoint}
    region: nil
    accesskey: ${s3_access_key}
    secretkey: ${s3_secret_key}
  redirect:
    disable: true

http:
  addr: :${PORT}
  headers:
    X-Content-Type-Options: [nosniff]

redis:
  addr: ${redis_host}:${redis_port}
  password: ${redis_password}

health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
  tcp:
  - addr: ${redis_host}:${redis_port}
    timeout: 3s
    interval: 10s
    threshold: 3
" > config.yml

# Die App starten
./registry serve config.yml
```

Mache das Skript dann mit folgendem Befehl ausführbar:

```shell
$ chmod +x entrypoint-cf.sh
```

## Die Registry pushen

Deine Registry ist bereit zum Pushen. Führe einfach folgenden Befehl aus:

```shell
$ cf push
```

Deine Registry ist einsatzbereit!

## Ausprobieren

Jetzt solltest du ein lokales Docker-Image in deine Registry pushen können. Hol
dir zuerst ein Beispiel-Image aus dem Docker Store:

```shell
$ docker pull nginx
```

Benenne es dann um, damit es in deine Registry gepusht werden kann:

```shell
$ docker tag nginx my-hostname.scapp.io/my-nginx
```

Vergiss nicht, den Hostnamen «my-hostname» an den anzupassen, den du für deine
Registry-App in Cloud Foundry gewählt hast.

Pushe es dann in deine private Registry:

```shell
$ docker push my-hostname.scapp.io/my-nginx
```

Jetzt kannst du es mit folgendem Befehl pullen:

```shell
$ docker pull my-hostname.scapp.io/my-nginx
```
