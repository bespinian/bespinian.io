---
title: Blue-Green-Deployment auf Cloud Foundry
author: Lena Fuhrimann
pubDate: 2016-12-12
tags: ["cloud-foundry", "deployment", "devops", "automation"]
description:
  "Lerne, wie du Blue-Green-Deployment auf Cloud Foundry umsetzt, um Updates
  ohne Downtime auszurollen und Änderungen mit einem einfachen Shell-Skript
  sicher zurückzunehmen."
image: ../../../assets/blog/blue-green.jpg
---

Stell dir vor, du hast eine deiner Apps in Produktion und willst ein Update
dafür mit `cf push` ausrollen. Wenn du das tust, hat deine App eine kurze
Downtime, weil CF deine alte Applikation stoppen und danach die neue hochfahren
muss. In dieser kurzen Zeitspanne erhalten deine Nutzerinnen und Nutzer `404`er,
wenn sie auf deine Applikation zugreifen wollen. Und was, wenn die neue Version
deiner App einen Fehler enthält und auf Cloud Foundry gar nicht erst startet?
Dann steht deinen Nutzenden eine noch längere Downtime bevor, bis du den Bug
gefunden und behoben hast.

Um diese Unannehmlichkeiten für deine Nutzenden zu verhindern, erlaubt dir Cloud
Foundry ein sogenanntes «Blue-Green-Deployment». Ich gehe hier nicht in die
Tiefe dieses Konzepts, denn alles dazu findest du in der
[Cloud-Foundry-Dokumentation](https://docs.cloudfoundry.org/devguide/deploy-apps/blue-green.html).
Grundsätzlich kannst du damit zwei Instanzen deiner Applikation gleichzeitig
laufen lassen, wobei eine die alte und eine bereits die neue Version ist. Deine
Nutzenden werden dann per Load Balancing auf die beiden Apps verteilt, und
sobald die neue Version korrekt läuft, wird die alte heruntergefahren.

Cloud Foundry bietet diese Funktionalität nicht out of the box. Deshalb habe ich
ein einfaches Shell-Skript geschrieben, das dieses Blue-Green-Deployment für
dich übernimmt.

```bash
#!/usr/bin/env bash

# Deine ENV-Variablen (sollten extern gesetzt werden, z.B. export CF_USERNAME="myUsername123")
# CF_API=
# CF_SHARED_DOMAIN=
# CF_USERNAME=
# CF_PASSWORD=
# CF_ORG=
# CF_SPACE=

max_health_checks=20
expected_response="200"
temp_suffix="-temp"

# Aus manifest.yml lesen
app_name=$(grep " name:" manifest.yml | sed 's/.*://;s/ //g')
domain=$(grep " domain: " manifest.yml | sed 's/.*://;s/ //g')
hostname=$(grep " host: " manifest.yml | sed 's/.*://;s/ //g')

# Standardwerte setzen
: "${domain:="${CF_SHARED_DOMAIN}"}"
: "${hostname:="${app_name}"}"

# Temporäre App aufsetzen
temp_app_name="${app_name}${temp_suffix}"
temp_domain="${CF_SHARED_DOMAIN}"
temp_hostname="${app_name}${temp_suffix}"

# CF Login
cf api "${CF_API}"
cf login "${CF_USERNAME}" "${CF_PASSWORD}"
cf target -o "${CF_ORG}" -s "${CF_SPACE}"

# Green pushen
cf push "${temp_app_name}" --no-route

# Temporäre Route auf Green mappen
cf map-route "${temp_app_name}" "${temp_domain}" -n "${temp_hostname}"

# Warten, bis Green bereit ist
iterations=0
while [[ "${iterations}" -lt "${max_health_checks}" ]]
do
  response=$(curl -sIL -w "%{http_code}" -o /dev/null "${temp_hostname}.${temp_domain}")
  if [[ "${response}" == "${expected_response}" ]]; then
    printf "\n%s" "Got expected ${response} response"
    break
  else
    iterations=$(( iterations + 1 ))
    sleep 3 && printf "\n%s" "Waiting for ${expected_response} response... Got ${response} (${iterations}/${max_health_checks})"
  fi
done

if [[ "${iterations}" == "${max_health_checks}" ]]; then
  printf "\n%s\n\n" "Couldn't get ${expected_response} response. Reverting..."

  # Temporäre Route löschen
  cf delete-route "${temp_domain}" -n "${temp_hostname}" -f

  # Temporäre App stoppen
  cf stop "${temp_app_name}"

  exit 1
fi

# Route per Load Balancing zwischen Blue und Green verteilen
cf map-route "${temp_app_name}" "${domain}" -n "${hostname}"

# Blue aus dem Load Balancing nehmen
cf unmap-route "${app_name}" "${domain}" -n "${hostname}"

# Temporäre Route löschen
cf delete-route -f "${temp_domain}" -n "${temp_hostname}"

# Alte App löschen
cf delete -f -r "${app_name}"

# Green auf den alten App-Namen umbenennen
cf rename "${temp_app_name}" "${app_name}"
```

Das Skript versucht, einige Variablen aus deiner `manifest.yml` zu erraten, für
ein erfolgreiches Deployment musst du aber trotzdem einige Umgebungsvariablen
setzen:

- `CF_API`: Der API-Endpunkt der CF-Instanz, die du verwenden willst (z.B.
  `https://api.lyra-836.appcloud.swisscom.com`)
- `CF_SHARED_DOMAIN`: Die Shared Domain, die du für temporäre Routen zum
  Smoke-Testen deiner App verwenden willst
- `CF_USERNAME`: Dein Cloud-Foundry-Benutzername
- `CF_PASSWORD`: Dein Cloud-Foundry-Passwort
- `CF_ORG`: Die Cloud-Foundry-Org, in die du deployen willst
- `CF_SPACE`: Der Cloud-Foundry-Space, in den du deployen willst

Sobald du alle diese Variablen gesetzt hast, kannst du das Skript einfach
ausführen, und es erledigt ein ausführliches Blue-Green-Deployment für dich. Das
Skript deployt die neue Version deiner App und prüft, ob sie gesund wird. Du
kannst den Parameter `expected_response` auf einen anderen Wert ändern, etwa auf
`401`, falls deine App ohne Authentifizierung keinen `200`-Statuscode
zurückgibt.

## Einschränkungen

- Das Skript funktioniert derzeit nicht, wenn deine App keine Route verwendet.
- Das Skript funktioniert derzeit nicht, wenn deine App mehr als eine Route
  verwendet.

## Weiterführende Informationen

Es gibt zwei Plugins für die Cloud Foundry CLI, die bestimmte Schritte des
Blue-Green-Deployments ebenfalls automatisieren:

- [Autopilot](https://github.com/contraband/autopilot)
- [BlueGreenDeploy](https://github.com/bluemixgaragelondon/cf-blue-green-deploy)

Mein Skript soll dir zeigen, was hinter den Kulissen passiert, und ist für den
Einsatz in CI/CD-Systemen gedacht oder für den Fall, dass du feingranularere
Kontrolle darüber brauchst, was während des Deployments abläuft. Persönlich mag
ich das BlueGreenDeploy-Plugin sehr. Es ist einfach zu benutzen und erfüllt
seinen Zweck.
