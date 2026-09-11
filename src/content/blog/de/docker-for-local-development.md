---
title: Docker für die lokale Entwicklung
author: Lena Fuhrimann
pubDate: 2017-06-08
tags: ["docker", "development", "containers", "local-development"]
description:
  "Lerne, wie du mit Docker Backend-Services für die lokale Entwicklung schnell
  aufsetzt und wieder abräumst – so bleibt deine Maschine sauber und dein
  Workflow effizient."
image: ../../../assets/blog/development.jpg
---

Ich benutze [Docker](https://www.docker.com/). Täglich. Es ist zu einem sehr
wertvollen Teil meiner Toolchain geworden, weil ich damit jedes Backend, das
meine Applikationen zum Laufen brauchen, schnell aufsetzen und in dem Moment
wieder abräumen kann, in dem ich es nicht mehr brauche. Vorbei sind die Zeiten,
in denen man alle möglichen Datenbanken und anderen Services installiert haben
musste, nur um seine Apps lokal laufen zu lassen. Mit Docker kannst du all das
tun und es von deiner Maschine isolieren.

Die meisten Backend-Systeme sind über HTTP und einen bestimmten Port erreichbar.
Das kannst du dir zunutze machen und viele Services betreiben, von denen jeder
in seinem eigenen Docker-Container läuft und den jeweiligen Port auf deinem
lokalen Host bereitstellt.

## Docker installieren

Falls du Docker noch nicht installiert hast, empfehle ich dir, das jetzt zu tun
und danach zurückzukommen. Ich für meinen Teil habe
[Docker for Mac](https://docs.docker.com/docker-for-mac/install/) richtig
schätzen gelernt. Du kannst es auch über [Homebrew](https://brew.sh/) mit
folgendem Befehl installieren:

```shell
$ brew cask install docker
```

Unter Windows installierst du Docker mit
[Docker for Windows](https://www.docker.com/docker-windows), und unter Linux
geht es denkbar einfach: Nimm einfach deinen lokalen Paketmanager.

## Services betreiben

Kommen wir dazu, die Services tatsächlich laufen zu lassen. Die Zauberformel ist
hier der folgende Befehl:

```shell
$ docker run -d -p <port>:<port> <service>
```

Ersetze `<port>` durch den Standardport deines Service und `<service>` durch
dessen Namen – und schon hast du eine laufende Instanz. Das Flag `-d` gibt an,
dass du den Docker-Container im
[Detached Mode](https://docs.docker.com/engine/reference/run/#detached--d)
laufen lassen willst. Das heisst, er läuft im Hintergrund weiter, auch wenn du
dein Terminal schliesst. Hier ein paar Beispiele, um Services mit dem obigen
Befehl zu starten:

```shell
# MongoDB
$ docker run -d -p 27017:27017 mongo
```

Einfach!

```shell
# Redis
$ docker run -d -p 6379:6379 redis:3
```

Hier haben wir zusätzlich die Redis-Version angegeben, die wir verwenden wollen.
Die verfügbaren Versionen findest du, indem du im
[Docker Store](https://store.docker.com) nach dem jeweiligen Image suchst.

```shell
# MySQL
$ docker run -d -p 3306:3306 -e 'MYSQL_ALLOW_EMPTY_PASSWORD=yes' mysql
```

In diesem Fall verwenden wir das Flag `-e`, um eine zusätzliche
Umgebungsvariable zu setzen, die das MySQL-Image benötigt.

Nach diesen Beispielen hast du die Idee sicher verstanden. Denk aber daran, dass
du diese Befehle auf fast jeden Service anwenden kannst, der in einem Container
läuft. Du kannst dich aus deiner Applikation jetzt mit den containerisierten
Services verbinden, als würden sie auf deiner lokalen Maschine laufen. Das liegt
daran, dass das Flag `-p` den Containern sagt, dass sie ihre internen Ports auf
deine lokalen weiterleiten sollen.

Wenn zum Beispiel ein MongoDB-Container läuft, der seinen Port `27017` auf
deinen lokalen Port `27017` weiterleitet, kannst du dich mit der `mongo`-Shell
problemlos mit der Datenbank im Container verbinden – genau so, als würde die DB
lokal laufen.

## Docker-Shortcuts

Beim Arbeiten mit Docker habe ich ein paar praktische Kurzbefehle entdeckt, mit
denen sich ungenutzte Services aufräumen lassen, damit sie deinen Rechner nicht
mehr zumüllen. Ein weiterer Vorteil: Du kannst deine Datenbanken und andere
persistente Services sauber und einfach leeren, um sicherzugehen, dass du gegen
einen frischen Zustand testest.

Ein erster wichtiger Kniff: Du kannst jede Container-ID immer auf ihre ersten
paar Zeichen abkürzen (solange es das einzige Objekt ist, dessen ID mit diesen
Zeichen beginnt). Statt die vollständige ID zu tippen und
`docker stop 4f263b9aad2d` zu schreiben, kann ich also einfach `docker stop 4f`
eingeben (solange dieser Container der einzige laufende mit einer ID ist, die
mit «4f» beginnt).

Weitere nützliche Befehle sind:

```shell
# Alle laufenden Container stoppen
$ docker stop $(docker ps -a -q)

# Alle gestoppten Container entfernen
$ docker rm $(docker ps -a -q)

# Alle ungenutzten Images entfernen
$ docker rmi $(docker images -q)

# Alle ungenutzten Volumes entfernen
$ docker volume rm $(docker volume ls -q)

# Alle ungenutzten Netzwerke entfernen
$ docker network rm $(docker network ls -q)

# Alles entfernen
$ docker system prune --all
```
