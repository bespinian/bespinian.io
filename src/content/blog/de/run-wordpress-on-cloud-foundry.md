---
title: WordPress auf Cloud Foundry betreiben
author: Lena Fuhrimann
pubDate: 2017-08-25
tags: ["wordpress", "cloud-foundry", "php", "s3", "cms"]
description:
  "Deploye WordPress auf Cloud Foundry mit ausgelagertem Datei-Storage über S3,
  um Medien-Uploads cloud-nativ zu handhaben."
image: ../../../assets/blog/wordpress.jpg
---

[WordPress](https://wordpress.org/) betreibt einen riesigen Teil aller Websites
im Internet. Es liegt daher nahe, diese Software auf Cloud Foundry laufen zu
lassen. Es gibt nur ein kleines Problem: WordPress speichert alle hochgeladenen
Medien im Dateisystem. Auf Cloud Foundry und anderen containerbasierten Systemen
funktioniert das nicht, weil der Container jederzeit neu gestartet werden kann,
wodurch alle gespeicherten Dateien verschwinden würden. Deshalb müssen wir den
gesamten Datei-Storage in einen separaten Service auslagern. In unserem Fall
wird das ein S3-kompatibler Storage sein.

## WordPress herunterladen

Um WordPress zu erhalten, lädst du einfach die neueste Version von der
[Website](https://wordpress.org/download/) herunter und entpackst sie in ein
beliebiges Verzeichnis. Wechsle dann im Terminal mit `cd` in dieses Verzeichnis
und kopiere die Datei `wp-config-sample.php` nach `wp-config.php`.

```shell
$ cp wp-config-sample.php wp-config.php
```

Über diese Datei konfigurieren wir WordPress.

## Services erstellen

Als Nächstes müssen wir unsere Datenbank und den S3-Storage als Services in
Cloud Foundry anlegen. Führe zum Erstellen der Datenbank folgenden Befehl aus:

```shell
$ cf create-service mariadbent usage wp-db
```

Ich verwende die [Swisscom Application Cloud](https://developer.swisscom.com/).
Wenn du einen anderen Cloud-Foundry-Anbieter nutzt, kann dieser Befehl
abweichen. Achte einfach darauf, dass du einen SQL-Service namens «wp-db»
erstellst.

Als Nächstes brauchen wir einen S3-kompatiblen Storage mit einem öffentlich
zugänglichen Bucket. Folge dazu
[diesem Tutorial](/de/blog/manage-buckets-on-cloud-foundry-s3-services/) und
nenne den Service «wp-storage».

## WordPress konfigurieren

WordPress selbst läuft nicht out of the box auf Cloud Foundry. Wir müssen einige
Anpassungen an der Datei `wp-config.php` vornehmen. Öffne sie und ersetze diese
Zeilen:

```php
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'database_name_here');

/** MySQL database username */
define('DB_USER', 'username_here');

/** MySQL database password */
define('DB_PASSWORD', 'password_here');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
```

durch die folgenden:

```php
// ** Read service properties from _ENV['VCAP_SERVICES'] ** //
$services = json_decode(getenv('VCAP_SERVICES'), true);
$db_service = $services['mariadbent'][0];
$db_conf = $db_service['credentials'];
$s3_service = $services['dynstrg'][0];
$s3_conf = $s3_service['credentials'];

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', $db_conf['database']);

/** MySQL database username */
define('DB_USER', $db_conf['username']);

/** MySQL database password */
define('DB_PASSWORD', $db_conf['password']);

/** MySQL hostname */
define('DB_HOST', $db_conf['host'] . ':' . $db_conf['port']);

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** The endpoint of your S3 provider (defaults to AWS) */
define('S3_UPLOADS_ENDPOINT_URL', 'https://' . $s3_conf['accessHost']);

/** The name of your S3 bucket */
define('S3_UPLOADS_BUCKET', 'my-bucket');

/** Your S3 access key ID */
define('S3_UPLOADS_KEY', $s3_conf['accessKey']);

/** Your S3 secret access key */
define('S3_UPLOADS_SECRET', $s3_conf['sharedSecret']);

/** Your S3 region */
define('S3_UPLOADS_REGION', 'none');

/** The URL where your uploads will be available */
define('S3_UPLOADS_BUCKET_URL', 'https://' . $s3_conf['namespace'] . '.ds11s3ns.swisscom.com/' . S3_UPLOADS_BUCKET);
```

Vergiss nicht, `my-bucket` durch den tatsächlichen Namen deines Buckets zu
ersetzen.

Diese Konfiguration erlaubt es uns, die Credentials für die Datenbank und die
Konfiguration für unsere S3-Uploads aus der Umgebung zu beziehen, wie es in
Cloud-Foundry-Applikationen üblich ist.

## S3-Uploads-Plugin installieren

Zu unserem Glück gibt es ein nettes WordPress-Plugin, mit dem Uploads in S3
statt im lokalen Dateisystem abgelegt werden. Du findest das Plugin auf
[GitHub](https://github.com/humanmade/S3-Uploads). Wir klonen es direkt in das
`plugins`-Verzeichnis unseres WordPress, damit wir es zusammen mit WordPress
selbst auf Cloud Foundry pushen können:

```shell
$ git clone https://github.com/humanmade/S3-Uploads.git wp-content/plugins/S3-Uploads
```

Damit steht das Plugin im Admin-GUI von WordPress zur Aktivierung bereit.

## S3-Endpoint-Plugin erstellen

Diesen Schritt kannst du überspringen, wenn du AWS S3 verwendest.

Das S3-Uploads-Plugin funktioniert hervorragend mit
[AWS S3](https://aws.amazon.com/s3/). Wollen wir es aber mit einem
Drittanbieter-S3 nutzen (z.B. dem Dynamic Storage der Swisscom Application
Cloud), müssen wir etwas zusätzlichen Code ergänzen, damit wir auch einen
eigenen S3-Endpunkt angeben können. Dazu erstellen wir ein winziges Plugin, das
den Endpunkt aus `wp-config.php` liest. Lege im Verzeichnis `wp-content` ein
neues Verzeichnis namens `mu-plugins` an. Es enthält sogenannte
[Must Use Plugins](https://codex.wordpress.org/Must_Use_Plugins), die immer
geladen werden. Erstelle in diesem Verzeichnis eine Datei namens
`S3-endpoint.php` mit folgendem Inhalt:

```php
<?php
/*
Plugin Name:  S3 Uploads Endpoint
Description:  Add S3_UPLOADS_ENDPOINT_URL to S3-Uploads
Version:      1.0.0
*/

add_filter('s3_uploads_s3_client_params', 's3_uploads_add_endpoint_param');
function s3_uploads_add_endpoint_param($params)
{
    if (S3_UPLOADS_ENDPOINT_URL) {
        $params['endpoint'] = S3_UPLOADS_ENDPOINT_URL;
    }

    return $params;
}
```

Dieses einfache Ein-Datei-Plugin prüft, ob die Konstante
`S3_UPLOADS_ENDPOINT_URL` definiert ist, und ergänzt sie in diesem Fall als
Parameter `endpoint` in den S3-Parametern. Ist die Variable nicht definiert,
setzt es den Parameter `endpoint` nicht, sodass wieder der AWS-Standard
verwendet wird.

## manifest.yml erstellen

Zum Schluss erstellen wir eine Datei `manifest.yml`, um unsere App einfacher in
die Cloud zu pushen. Lege die Datei im Root deines `wordpress`-Verzeichnisses an
und fülle sie mit folgendem Inhalt:

```yaml
applications:
  - name: wordpress
    host: my-wordpress
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/php-buildpack.git
    services:
      - wp-db
      - wp-storage
```

Falls der Hostname bereits vergeben ist, wähle einen anderen. Du kannst nehmen,
was du willst.

## Die App pushen

Jetzt ist es Zeit, unsere App in die Cloud zu pushen. Führe folgenden Befehl
aus:

```shell
$ cf push
```

Rufe dann deine Site unter der entsprechenden URL auf und folge dem
WordPress-Installationsassistenten. Sobald du auf deiner WordPress-Admin-Seite
bist, gehst du in den Bereich «Plugins» und aktivierst das Plugin «S3 Uploads».
Ab jetzt sollten alle deine Uploads direkt in S3 landen. Du hast nun eine
cloud-native WordPress-Installation!
