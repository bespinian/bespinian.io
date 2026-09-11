---
title: Buckets auf Cloud Foundry S3 Services verwalten
author: Lena Fuhrimann
pubDate: 2017-03-17
tags: ["cloud-foundry", "s3", "storage", "buckets"]
description:
  "Lerne, wie du S3-Buckets auf Cloud Foundry erstellst und verwaltest – mit
  s3cmd oder der Open-Source-Applikation S3 Manager."
image: ../../../assets/blog/storage.jpg
---

[S3](https://aws.amazon.com/s3/) ist ein grossartiges Konzept, um statische
Dateien und grössere [BLOBs](https://de.wikipedia.org/wiki/Binary_Large_Object)
zu speichern. Schauen wir uns an, wie wir es in Cloud Foundry nutzen können.

S3 wurde ursprünglich von [Amazon Web Services](https://aws.amazon.com/)
entwickelt, aber mittlerweile gibt es viele Drittanbieter-Services, die zur
S3-API kompatibel sind. Einige Cloud-Foundry-Anbieter haben S3-kompatible
Services in ihrem Marketplace. Falls nicht, kannst du dir mit einem
[User-Provided Service](https://docs.cloudfoundry.org/devguide/services/user-provided.html)
deinen eigenen erstellen und die entsprechenden S3-Credentials hinterlegen (z.B.
von AWS).

Dieses Tutorial verwendet den
[Swisscom Application Cloud S3 Dynamic Storage](https://docs.developer.swisscom.com/service-offerings/dynamic.html),
du kannst aber auch jeden anderen S3-Anbieter nutzen.

Um einen S3-Service zu erstellen, führe folgenden Befehl aus:

```shell
$ cf create-service dynstrg usage my-storage
```

wobei `my-storage` der Name deiner Service-Instanz ist.

Danach erstellen wir einen Service Key, damit wir auf unseren Service zugreifen
können:

```shell
$ cf create-service-key my-storage my-key
```

Jetzt kannst du die Credentials für deinen S3-Service jederzeit mit diesem
Befehl abrufen:

```shell
$ cf service-key my-storage my-key
```

Die Credentials aus diesem Key verwenden wir in den nächsten Schritten.

## S3-Bucket erstellen

Jetzt, wo wir unseren S3-Service haben, brauchen wir einen Bucket für unsere
Daten. Ich empfehle dafür das CLI-Tool
[s3cmd](https://github.com/s3tools/s3cmd). Du kannst es entweder von der
[Releases](https://github.com/s3tools/s3cmd/releases)-Seite herunterladen oder
über [Homebrew](http://brew.sh/) installieren, falls du auf macOS bist. Sobald
es installiert ist, konfigurierst du es mit folgendem Befehl:

```shell
$ s3cmd --configure
```

Du wirst nach deinen Credentials gefragt. Die meisten davon findest du im oben
abgerufenen Service Key oder du übernimmst die Standardwerte.

Wenn du Swisscom Dynamic Storage verwendest, setze die Region auf `nil` und
beachte, dass `Secret Key` deinem `sharedSecret` und `S3 Endpoint` deinem
`accessHost` entspricht. Für
`DNS-style bucket+hostname:port template for accessing a bucket` kannst du
`%(bucket)s.<dein-accessHost>` mit deinem jeweiligen `accessHost` verwenden.

Jetzt solltest du Folgendes ausführen können:

```shell
$ s3cmd ls
```

Das gibt nichts zurück, wenn du noch keine Buckets hast, oder listet deine
bestehenden auf. Nun können wir endlich unseren Bucket namens «my-bucket» mit
folgendem Befehl erstellen:

```shell
$ s3cmd mb s3://my-bucket
```

## S3 Manager

Alternativ kannst du eine Open-Source-App verwenden, die ich entwickelt habe:
[S3 Manager](https://github.com/cloudlena/s3manager). Du kannst sie einfach
lokal laufen lassen oder auf Cloud Foundry deployen und dann die entsprechenden
Umgebungsvariablen setzen, um deine S3-Buckets und -Dateien zu verwalten.
