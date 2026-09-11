---
title: Piwik auf Cloud Foundry betreiben
author: Lena Fuhrimann
pubDate: 2016-11-30
tags: ["piwik", "analytics", "cloud-foundry", "php", "mysql"]
description:
  "Deploye Piwik, eine Open-Source-Analytics-Plattform, auf Cloud Foundry – als
  Alternative zu Google Analytics mit voller Kontrolle über deine Daten."
image: ../../../assets/blog/analytics.jpg
---

[Piwik](https://piwik.org/) ist eine Open-Source-Analytics-Plattform auf Basis
von [PHP](https://secure.php.net/) und [MySQL](https://www.mysql.com/). Das
macht sie zur perfekten Applikation für den Betrieb auf Cloud-Foundry-basierten
Plattformen. Falls du es also satt hast, all deine Daten an Google Analytics zu
schicken, und stattdessen lieber deine eigene Analytics-Plattform betreiben
willst, ist dieses Tutorial für dich. Wir schauen uns an, was es braucht, um
Piwik auf Cloud Foundry zu betreiben, und welche Anpassungen nötig sind, um es
sauber in unsere Plattform zu integrieren.

In diesem Tutorial verwende ich als Beispiel die
[Swisscom Application Cloud](https://developer.swisscom.com/), aber jede
[Cloud-Foundry-basierte Plattform](https://www.cloudfoundry.org/use/cloud-foundry-certified/)
tut es.

## Piwik beschaffen

Lade die neueste Version von Piwik unter <https://piwik.org/download> herunter.
Entpacke sie und wechsle mit `cd` in das Root-Verzeichnis. Der Ordner enthält
einen weiteren Unterordner namens «piwik» und einen Link zur Anleitung. Diese
verschachtelte Struktur brauchen wir nicht. Führe folgenden Befehl aus, um sie
zu begradigen:

```shell
$  cp -rf piwik .. && rm -rf piwik
```

## Datenbank einrichten

Als Erstes müssen wir den Service in Cloud Foundry erstellen:

```shell
$ cf create-service mariadbent usage piwik-db
```

In der Swisscom Application Cloud heisst der SQL-Service `mariadbent`.
Möglicherweise musst du das anpassen, wenn du einen anderen CF-Anbieter
verwendest.

Danach müssen wir Piwik anweisen, sich mit unserer als Cloud-Foundry-Service
bereitgestellten Datenbank zu verbinden. Erstelle im Root deines Projekts eine
neue Datei `bootstrap.php` mit folgendem Inhalt:

```php
<?php
  $_ENV["SQLDB"] = NULL;
  $_ENV["SQLHOST"] = NULL;
  $_ENV["SQLPORT"] = NULL;
  $_ENV["SQLUSER"] = NULL;
  $_ENV["SQLPASSWORD"] = NULL;

  $application = getenv("VCAP_APPLICATION");
  $application_json = json_decode($application,true);

  if (isset($application_json["application_uris"])) {
    $_ENV["APPURIS"] = $application_json["application_uris"];
  }

  $services = getenv("VCAP_SERVICES");
  $services_json = json_decode($services,true);

  if (isset($services_json)) {
    if (isset($services_json["mariadbent"][0]["credentials"])) {
      $mysql_config = $services_json["mariadbent"][0]["credentials"];
      $_ENV["SQLDB"] = $mysql_config["database"];
      $_ENV["SQLHOST"] = $mysql_config["host"];
      $_ENV["SQLPORT"] = $mysql_config["port"];
      $_ENV["SQLUSER"] = $mysql_config["username"];
      $_ENV["SQLPASSWORD"] = $mysql_config["password"];
    }
  }
?>
```

Dieser Code läuft, bevor Piwik startet, und erlaubt uns damit, die
Standardvariablen für die Datenbankverbindung zu überschreiben. Auch hier musst
du das Schlüsselwort `mariadbent` im Code anpassen, falls der SQL-Service bei
deinem CF-Anbieter anders heisst.

Beim ersten Start zeigt Piwik einen Konfigurationsassistenten, in dem die
Datenbank-Credentials eingegeben werden müssen. Wir können die Standardwerte
dafür mit jenen aus den Service-Umgebungsvariablen überschreiben, sodass du im
Assistenten einfach auf «Weiter» klicken kannst und sie nicht jedes Mal
nachschlagen musst. Öffne dazu die Datei
`plugins/Installation/FormDatabaseSetup.php` und navigiere zur Definition der
Methode `init`. Ersetze dort die folgenden Zeilen:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'host'          => '127.0.0.1',
                                                               'type'          => $defaultDatabaseType,
                                                               'tables_prefix' => 'piwik_',
                                                          )));
```

durch diese:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'host'          => $_ENV["SQLHOST"].':'.$_ENV["SQLPORT"],
                                                               'username'      => $_ENV["SQLUSER"],
                                                               'password'      => $_ENV["SQLPASSWORD"],
                                                               'dbname'        => $_ENV["SQLDB"],
                                                               'type'          => $defaultDatabaseType,
                                                               'tables_prefix' => 'piwik_',
                                                          )));
```

## Sicherheit

Als Nächstes müssen wir die URL unserer Site, die wir in `bootstrap.php`
ebenfalls aus der CF-Umgebung beziehen, in Piwik als Trusted Host hinterlegen.
Öffne die Datei `plugins/Installation/Controller.php` und navigiere zur
Definition der Methode `addTrustedHosts`. Ersetze dort die folgende Zeile

```php
$trustedHosts = array();
```

durch diese:

```php
$trustedHosts = Config::getInstance()->General['trusted_hosts'];

if (!is_array($trustedHosts)) {
    $trustedHosts = array();
}
```

Wir wollen, dass Piwik die Verwendung von HTTPS statt HTTP erzwingt. Um das zu
aktivieren, öffnest du die Datei `config/global.ini.php` und änderst die
Einstellung `force_ssl` auf `1`:

```php
force_ssl = 1
```

## Routing

Als Nächstes verbessern wir weitere Standardwerte, die Piwik im
Setup-Assistenten verwendet. Diese Änderungen schlagen vor, dass Piwik sich
selbst als erste Site trackt. Öffne die Datei
`plugins/Installation/FormFirstWebsiteSetup.php` und ersetze die folgenden
Zeilen der Methode `init`:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'url' => $urlExample,
                                                          )));
```

durch diese:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'siteName' => $_ENV["APPURIS"][0],
                                                               'url' => "https://" . $_ENV["APPURIS"][0],
                                                          )));
```

## Composer

Da Piwik seine Abhängigkeiten bereits installiert mitbringt, wollen wir nicht,
dass [Composer](https://getcomposer.org/) in Cloud Foundry nochmals läuft. Das
PHP-Buildpack führt Composer nicht aus, wenn es keine Dateien findet, die darauf
hindeuten. Ignorieren wir die Composer-Dateien also beim Pushen. Lege im Root
deines Projekts eine Datei `.cfignore` an und füge folgende Zeile ein:

```txt
/composer.*
```

## Buildpack-Konfiguration

Das PHP-Buildpack erlaubt uns, jede PHP-App über eine dedizierte Datei zu
konfigurieren. Erstelle im Root deines Projekts einen Ordner `.bp-config` und
darin eine Datei `options.json`. Diese Datei legt fest, welche PHP-Version
verwendet wird, welche Extensions installiert werden und vieles mehr. Mehr dazu
liest du
[hier](http://docs.cloudfoundry.org/buildpacks/php/gsg-php-config.html). Füge
folgenden Inhalt in unsere neue Datei ein, um die benötigten PHP-Extensions zu
installieren und die neueste PHP-Version zu verwenden:

```json
{
  "PHP_EXTENSIONS": [
    "bz2",
    "zlib",
    "curl",
    "mcrypt",
    "gd",
    "cli",
    "geoip",
    "pdo",
    "pdo_mysql",
    "mbstring",
    "openssl"
  ],
  "PHP_VERSION": "{PHP_70_LATEST}"
}
```

## manifest.yml

Um festzulegen, wie sich die App in Cloud Foundry verhalten soll, fügen wir im
Root unseres Projekts eine Datei `manifest.yml` mit folgendem Inhalt hinzu:

```yaml
applications:
  - name: piwik
    host: my-piwik
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/php-buildpack.git
    services:
      - piwik-db
```

Sei kreativ beim `host`, denn der Standardwert ist vermutlich schon vergeben.

## Deployen

Jetzt ist es Zeit, unsere App auf Cloud Foundry zu deployen. Da wir in unserer
Manifest-Datei bereits alles konfiguriert haben, brauchen wir nur noch

```shell
$ cf push
```

Wenn wir unsere Piwik-Instanz aufrufen, erscheint der Konfigurationsassistent.
Da wir oben alle korrekten Standardwerte gesetzt haben, kannst du bei den
meisten Schritten einfach auf «Weiter» klicken. Piwik wird sich darüber
beschweren, dass die Dateiintegritätsprüfung Fehler meldet – das können wir
bedenkenlos ignorieren, da wir es ja waren, die die Dateien geändert haben. Nach
dem Assistenten solltest du eine voll funktionsfähige Piwik-Installation auf
Cloud Foundry haben. Juhu!

Dieses Tutorial basiert auf einem sehr ähnlichen, aber veralteten Beitrag des
[Bluemix-Blogs](https://www.ibm.com/blogs/bluemix/2014/07/getting-started-piwik-ibm-bluemix/).
