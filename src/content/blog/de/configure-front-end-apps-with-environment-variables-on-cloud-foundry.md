---
title: Front-End-Apps auf Cloud Foundry mit Umgebungsvariablen konfigurieren
author: Lena Fuhrimann
pubDate: 2016-11-20
tags: ["cloud-foundry", "frontend", "configuration", "nginx", "staticfile"]
description:
  "Erfahre, wie du statische Front-End-Applikationen auf Cloud Foundry mit
  Umgebungsvariablen konfigurierst, indem du die Konfiguration über einen
  HTTP-Endpunkt mit nginx bereitstellst."
image: ../../../assets/blog/code.jpg
---

Das [12-Factor-Manifest](https://12factor.net/) sagt uns in Punkt III, dass Apps
ihre Konfiguration aus Umgebungsvariablen beziehen sollten, um **Konfiguration
und Code strikt zu trennen**. «Konfiguration» meint dabei alles, was sich
zwischen Deployments unterscheiden kann (Staging, Produktion,
Entwicklerumgebungen usw.). Cloud Foundry macht uns das einfach – entweder über
die Datei `manifest.yml` oder über den Befehl `cf set-env`. Das funktioniert
allerdings nur für Apps mit dynamischem Back End. Was, wenn wir eine
Front-End-App konfigurieren wollen, die wir mit dem
[Staticfile Buildpack](https://github.com/cloudfoundry/staticfile-buildpack) auf
Cloud Foundry gepusht haben? Diese Apps sind per Definition statisch und können
deshalb keine Umgebungsvariablen auslesen. Wenn wir dieses Buildpack also
verwenden, um eine [Angular](https://angular.io/)- oder
[React](https://facebook.github.io/react/)-App zu deployen, können wir diese
Variablen nicht nutzen.

Zum Glück kann unser [nginx](https://www.nginx.com/)-Server das (die
Technologie, die das Staticfile Buildpack verwendet). Das brachte uns auf die
Idee, die Konfiguration über einen HTTP-Endpunkt bereitzustellen. Die Datei
`nginx.conf` wird von Ruby geparst, bevor das Buildpack damit dein nginx
aufsetzt. Du kannst also die Umgebungsvariablen nutzen, um einen JSON-Endpunkt
zu konfigurieren, der die Konfiguration deiner Front-End-App bereitstellt.

## Anleitung

Um unseren eigenen Konfigurations-Endpunkt zu erhalten, müssen wir den folgenden
Block in eine eigene `nginx.conf` im Root-Verzeichnis unserer App einfügen:

```nginx
<% if ENV["APP_CONFIG"] %>
location /app-config {
  default_type application/json;
  return 200 '<%= ENV["APP_CONFIG"] %>';
}
<% end %>
```

Das fügt einen Endpunkt `/app-config` hinzu, der deine Konfiguration als JSON
ausliefert, sofern die Umgebungsvariable `APP_CONFIG` existiert. Existiert sie
nicht, wird der Endpunkt gar nicht erst bereitgestellt.

Falls du noch keine eigene `nginx.conf` hast, kannst du dieses Beispiel
verwenden, das den obigen Code bereits enthält:

```nginx
worker_processes 1;
daemon off;

error_log <%= ENV["APP_ROOT"] %>/nginx/logs/error.log;
events { worker_connections 1024; }

http {
  charset utf-8;
  log_format cloudfoundry '$http_x_forwarded_for - $http_referer - [$time_local] "$request" $status $body_bytes_sent';
  access_log <%= ENV["APP_ROOT"] %>/nginx/logs/access.log cloudfoundry;
  default_type application/octet-stream;
  include mime.types;
  sendfile on;

  gzip on;
  gzip_disable "msie6";
  gzip_comp_level 6;
  gzip_min_length 1100;
  gzip_buffers 16 8k;
  gzip_proxied any;
  gunzip on;
  gzip_static always;
  gzip_types text/plain text/css text/js text/xml text/javascript application/javascript application/x-javascript application/json application/xml application/xml+rss;
  gzip_vary on;

  tcp_nopush on;
  keepalive_timeout 30;
  port_in_redirect off; # Ensure that redirects don't include the internal container PORT - <%= ENV["PORT"] %>
  server_tokens off;

  server {
    listen <%= ENV["PORT"] %>;
    server_name localhost;

    location / {
      root <%= ENV["APP_ROOT"] %>/public;

      index index.html index.htm Default.htm;

      <% if ENV["FORCE_HTTPS"] %>
        if ($http_x_forwarded_proto != "https") {
          return 301 https://$host$request_uri;
        }
      <% end %>

      <% if ENV["APP_CONFIG"] %>
      location /app-config {
        default_type application/json;
        return 200 '<%= ENV["APP_CONFIG"] %>';
      }
      <% end %>
    }

  }
}
```

Diese Konfiguration funktioniert mit dem Staticfile Buildpack, deaktiviert aber
einige seiner optionalen Einstellungen. Um diese wieder zu aktivieren, musst du
den obigen Code entsprechend anpassen.

Pushe jetzt deine App mit `cf push` und setze die Umgebungsvariable `APP_CONFIG`
mit folgendem Befehl auf einen JSON-String:

```shell
$ cf push <app-name>
$ cf set-env <app-name> APP_CONFIG '{"apiUrl":"https://jsonplaceholder.typicode.com"}'
```

Danach führst du wie vorgeschlagen ein Restage deiner App durch:

```shell
$ cf restage <app-name>
```

Wenn du den Endpunkt `/app-config` deiner App aufrufst, sollte er das angegebene
JSON zurückgeben. Deine Front-End-App kann ihre Konfiguration jetzt dynamisch
von diesem Endpunkt beziehen. Für die lokale Entwicklung hast du vielleicht
einen Fallback für all diese Konfigurationswerte, falls du etwas wie den
[webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
verwendest. Natürlich kannst du deinen Dev-Server auch so konfigurieren, dass er
denselben Endpunkt bereitstellt, und dafür eine Entwicklungskonfiguration
anlegen.

## Anwendungsfälle

Du kannst diese Methode nutzen, um verschiedene Umgebungen zu konfigurieren, in
denen deine App laufen könnte. Zum Beispiel verwendest du für deine
Integrationsumgebung vielleicht einen anderen API-Server als für die
Produktionsumgebung.

Alternativ könntest du damit Feature Flags dynamisch umschalten, um
[A/B-Testing](https://de.wikipedia.org/wiki/A/B-Test) oder ein
[Canary Release](https://martinfowler.com/bliki/CanaryRelease.html)
durchzuführen.

Es gibt sicher noch viele weitere Anwendungsfälle. Der Hauptpunkt ist aber, dass
du mit dieser Methode einen einzigen Build-Job hast und diesen Build dann in
viele Umgebungen deployen kannst.

Vielen Dank an [Mathis Kretz](https://github.com/mkretz) für die Inspiration zu
diesem Beitrag!
