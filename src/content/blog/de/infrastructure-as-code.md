---
title: Infrastructure as Code
author: Lena Fuhrimann & Mathis Kretz
pubDate: 2021-12-09
tags: ["infrastructure", "cloud", "terraform", "automation", "devops"]
description:
  "Lerne die Prinzipien von Infrastructure as Code kennen, dazu deklaratives
  Infrastruktur-Management und Tools wie Terraform, Packer und AWS
  CloudFormation. Wir zeigen Best Practices zum Versionieren, Testen und
  Automatisieren deiner Infrastruktur-Deployments."
image: ../../../assets/blog/infrastructure.jpg
---

Dieser Blogbeitrag ist der zweite Teil einer dreiteiligen Serie, die auf einer
GitOps-Webinar-Reihe basiert, die wir gemeinsam mit unseren Freunden von
[VSHN](https://www.vshn.ch/) produziert haben.

In diesem zweiten Teil schauen wir uns ein Thema an, das für jede moderne
cloud-native Umgebung entscheidend ist, um Stabilität und Gleichheit über
Umgebungen hinweg zu schaffen: Infrastructure as Code. Wir tauchen in einige
interessante Tools dieses Bereichs ein und vergleichen verschiedene Konzepte und
Konfigurationen, wie sich Infrastruktur vernünftig deployen und pflegen lässt.
Nach dem Lesen hast du ein gutes Verständnis von IaC und seinen Vorteilen und
einen ausgereiften Werkzeugkasten, um es in deinem Team umzusetzen.

Wenn du Fragen hast, stell sie gerne als Kommentar zu diesem Blogbeitrag. Wenn
du dich lieber zurücklehnen und diesen Teil als Webinar geniessen willst, schau
dir [die Aufzeichnung auf YouTube](https://youtu.be/OrGVV8q8yeo) an.

# Einleitung

Bevor wir in technische Lösungen und Frameworks für Infrastructure as Code
eintauchen, schauen wir uns zuerst an, was wir mit diesem Begriff meinen.

## Was ist nicht Infrastructure as Code?

Beginnen wir eigentlich damit, was wir nicht als Infrastructure as Code
bezeichnen würden. So grossartig sie für sich genommen auch sind: Tools wie
Ansible, Puppet und Chef, mit denen du Konfigurationen auf bestehende VMs
anwendest, zählen wir nicht dazu. Denn diese Tools kümmern sich in der Regel
nicht um das Erstellen der VM oder der Ressource selbst – und das halten wir,
wie du später sehen wirst, für einen wichtigen Teil von Infrastructure as Code.
Tools zur VM-Konfiguration haben in DevOps aber definitiv ihren Platz, wie wir
beim genaueren Blick auf Packer noch sehen werden.

Ebenso wenig würden wir imperative Skripte als Infrastructure as Code
bezeichnen, die VMs erstellen (und möglicherweise Dinge darauf installieren).
Denn Deklarativität halten wir für ein wesentliches Merkmal von Infrastructure
as Code, wie du gleich sehen wirst.

## Was ist Infrastructure as Code?

```hcl
resource "vm_instance" "my_vm" {
    name = "My VM"
    instance_type = "x-large"
    availability_zone = var.availability_zone
    security_group_ids = [security_group.my_sg.id]

    tags = {
        Name = "IaC-managed VM Instance"
    }
}
```

Was ist Infrastructure as Code also? Ähnlich wie Quellcode, der unverändert bei
jeder Kompilierung dasselbe Binary erzeugt, verlangt Infrastructure as Code,
dass dasselbe Modell – als Code in Textform – immer dieselbe Umgebung erzeugt.
Zudem erzeugt es die Umgebung automatisch, ohne manuelle Konfigurations- oder
Installationsschritte.

Oben siehst du ein Beispiel einer deklarativ beschriebenen VM, in diesem Fall in
Terraform-Syntax. Mehr zu Terraform erfährst du in diesem Blogbeitrag. Du
siehst, dass wir Name und Typ der VM angeben. Zudem nennen wir die Availability
Zone, in der diese VM erstellt werden soll, und eine Security Group, zu der sie
gehören wird. Die beiden letzten Parameter sind in dieser Deklaration nicht
hartcodiert, sondern referenzieren andere Ressourcen in der
Umgebungsdeklaration. Bei der Availability Zone referenzieren wir eine anderswo
deklarierte Variable, bei der Security Group eine als separate Ressource
deklarierte Security Group.

Die Möglichkeit, Ressourcendefinitionen und ihre Eigenschaften in anderen
Deklarationen zu referenzieren, ist ein entscheidender Aspekt einer
Infrastructure-as-Code-Lösung: Sie erlaubt uns, unsere Umgebungsdeklarationen zu
modularisieren und Wiederholungen zu vermeiden, wenn wir Varianten unserer
Umgebung bauen.

## … und warum?

Warum also willst du Infrastructure as Code? Hier die wichtigsten Gründe:

### Umgebungs-Drift verhindern

Der erste Grund: Es verhindert Umgebungs-Drift. Wenn deine Umgebungen
automatisch aus Code erzeugt werden, sollte niemand undokumentierte Änderungen
an einer bestimmten Umgebung einbringen können, indem er etwa manuell an einer
VM oder einem virtuellen Netzwerk konfiguriert. Das heisst, deine Applikationen
gehen beim Übergang von der Testumgebung in die Produktion nicht kaputt, nur
weil es Infrastruktur-Anpassungen gab, die nur auf Test und nicht auf Produktion
gemacht wurden.

### Schneeflocken verhindern

Der zweite Grund: Infrastructure as Code verhindert Schneeflocken. Mit
Schneeflocken meinen wir Infrastrukturkonfigurationen, die sich zusammen mit
deployten Applikationen intransparent und oft undokumentiert entwickelt haben.
Es ist meist unmöglich, dieselbe Konfiguration auf neuer Infrastruktur
nachzubauen, ohne wiederholt herumzuprobieren und im Grunde die Entwicklung des
ursprünglichen Systems nachzuspielen. Wenn deine Infrastruktur aus Code erzeugt
wird, bleibt ihre Entwicklung dokumentiert, und frische Rollouts enthalten alle
Änderungen dieser Entwicklung.

### Versionierbar

Der dritte Grund: Infrastructure as Code erlaubt dir, deine Umgebungsdeklaration
in einem Versionskontrollsystem wie Git zu versionieren, das wir
[im ersten Beitrag dieser Serie](/de/blog/git-the-important-parts/) behandelt
haben. Der Vorteil: Du kannst die Standardfunktionen der Versionskontrolle
nutzen, um deine Infrastruktur zu verwalten. Über die Commit-Historie findest du
heraus, wann und warum eine bestimmte Infrastrukturänderung gemacht wurde. Mit
diff vergleichst du zwei Zustände deiner Infrastruktur. Und mit Merge Requests
setzt du Review- und Freigabe-Workflows für Infrastrukturänderungen um.

### Reproduzierbar und wiederverwendbar

Der vierte Grund: Infrastructure as Code gibt dir einen reproduzierbaren und
deterministischen Weg, so viele Instanzen deiner Umgebung hochzufahren, wie du
brauchst. Das gibt dir mehr Flexibilität und den Leuten mehr Sicherheit bei
Änderungen.

### Dokumentiert

Der fünfte Grund: Indem du deklarativen Infrastrukturcode schreibst,
dokumentierst du die erzeugten Umgebungen automatisch. Weil diese Dokumentation
automatisch angewendet wird, wissen wir, dass sie immer aktuell ist und uns eine
gut lesbare Beschreibung von allem gibt, was wir deployt haben.

# Prinzipien

Jetzt, wo wir wissen, was Infrastructure as Code ist, tauchen wir etwas tiefer
in die Leitprinzipien ein, die es zum Funktionieren bringen. Diese Prinzipien
machen unseren Quellcode zur einzigen Quelle der Wahrheit und holen das Maximum
aus Infrastructure as Code heraus.

## Imperativ versus deklarativ

Das erste wichtige Prinzip von Infrastructure as Code ist Deklarativität. Aber
was meinen wir damit?

In der Kommunikation mit Systemen oder Maschinen ist es intuitiv, prozedural zu
beschreiben, welche Operationen nötig sind, um von einem Zustand in den nächsten
zu kommen. Das nennen wir den imperativen Stil. Dabei sagst du Dinge wie
«Erstelle zuerst eine neue VPC. Dann erstelle eine neue VM. Dann erstelle ein
neues Kubernetes-Cluster. Dann installiere Linux auf der VM» und so weiter.

```shell
$ cli create vpc

$ cli create vm ...

$ cli create k8s
```

Das Gegenteil von imperativ ist deklarativ. Eine deklarative Repräsentation
deiner Infrastruktur beschreibt einen gewünschten Zustand, in dem deine Umgebung
sein soll. Sie sagt Dinge wie «Es gibt eine VPC, es gibt eine VM und es gibt ein
Kubernetes-Cluster.» Sie sagt nicht, welche Schritte nötig sind, um vom
aktuellen Zustand deiner Umgebung zu diesem neuen gewünschten Zustand zu kommen.

```hcl
resource vpc {
...
}
resource vm {
...
}
resource k8s {
...
}
```

Warum bevorzugen wir beim Automatisieren von Infrastruktur also den deklarativen
Stil? Denken wir genauer über unser imperatives Beispiel nach, sehen wir viele
Fälle, die unser Skript abfangen muss, um korrekt zu funktionieren. Was, wenn
bereits eine VM mit demselben Namen existiert? Brechen wir ab? Tun wir etwas mit
der bestehenden VM? Oder was, wenn das Erstellen der VM lange dauert? Was
passiert, wenn das Skript auf halbem Weg fehlschlägt? Können wir es einfach
nochmals ausführen? All dieses Nachdenken über Spezialfälle, mögliche Fehler und
lang laufende asynchrone Operationen fällt im deklarativen Stil weg. Dort
beschreibst du einfach einen gewünschten Zustand und überlässt es deiner
Infrastructure-as-Code-Technologie, die nötigen Schritte dorthin zu ermitteln.

Das macht deklarative Repräsentationen von Infrastruktur für den Betrieb
deutlich sauberer und leichter nachvollziehbar. Ein weiterer Vorteil: Es ist
immer klar, was der gewünschte Zustand ist – auch wenn sich der Zustand deiner
Infrastruktur durch den Ausfall einer oder mehrerer Komponenten ändert. In so
einem Fall nutzt eine Infrastructure-as-Code-Technologie diese Repräsentation,
um deine Umgebung zurück in den gewünschten Zustand zu bringen.

Deklarative Repräsentationen haben einen offensichtlichen Nachteil: Sie machen
die Arbeit der jeweiligen Infrastructure-as-Code-Technologie deutlich
aufwendiger. Technologien, die das unterstützen, brauchen einen Weg, den
aktuellen Zustand deiner Infrastruktur zu ermitteln, das Delta zum gewünschten
Zustand zu berechnen und die richtigen Operationen anzuwenden, um diese Lücke zu
schliessen. Später in dieser Folge stellen wir Terraform vor, das genau diese
Art deklarativer Repräsentation bietet.

## Idempotenz

Das zweite wichtige Prinzip für Infrastructure as Code ist Idempotenz. Laut
Wikipedia heisst das, dass eine Konfiguration mehrfach angewendet werden kann,
ohne das Ergebnis über die erste Anwendung hinaus zu verändern. Technisch
gesagt: Eine Funktion oder Operation heisst idempotent, wenn sie dasselbe
Ergebnis liefert, egal ob sie auf eine beliebige Eingabe einmal oder viele Male
hintereinander angewendet wird.

In Infrastructure as Code macht Idempotenz das Leben im Betrieb einfacher: Man
kann die Infrastructure-as-Code-Technologie um einen bestimmten gewünschten
Zustand bitten, ohne die feinen Details des aktuellen Zustands einer Umgebung
kennen zu müssen. Tatsächlich sind Infrastructure-as-Code-Technologien, die auf
der deklarativen Repräsentation eines gewünschten Zustands basieren, automatisch
idempotent.

Dehnen wir die Definition von Idempotenz etwas, meinen wir meist auch, dass beim
Anwenden einer Zustandsdeklaration auf eine Umgebung jene
Infrastrukturkomponenten unangetastet bleiben, die dem gewünschten Zustand
bereits entsprechen. Auch das erleichtert den Betrieb, denn man kann sich darauf
verlassen, dass keine Komponenten wegen einer Änderung des gewünschten Zustands
unnötig unterbrochen werden.

## Haustiere versus Nutzvieh

![Haustiere vs. Nutzvieh](../../../assets/blog/infrastructure-as-code/pets-vs-cattle.png)

Das dritte wichtige Prinzip von Infrastructure as Code ist, dass jede
Infrastruktur wegwerfbar ist und jederzeit ohne manuellen Eingriff neu erstellt
werden kann – in der zugegebenermassen etwas grausamen Analogie wird
Infrastruktur wie Nutzvieh behandelt. Langlebige Komponenten, die im Betrieb
manuell gepflegt und aktualisiert werden, wären in derselben Analogie Haustiere
und eignen sich nicht für Infrastructure as Code. Wegwerfbare,
vollautomatisierte Infrastruktur hat den Vorteil, dass wir schmerzfrei Dinge
ausprobieren und ändern können, ohne uns Sorgen zu machen, manuell gepflegte
Haustier-Komponenten kaputtzumachen.

Wenn du also zum Beispiel einen Server hast, dem du viel Liebe geschenkt hast
und auf dem du Dinge manuell installierst und konfigurierst – vielleicht hast du
ihm sogar einen Namen gegeben, etwa Lenny, und würdest weinen, wenn Lenny stirbt
–, dann hast du ein Haustier geschaffen. Hast du dagegen eine Herde von Servern,
die einen Zweck erfüllen, aber jederzeit ohne manuellen Eingriff neu erstellt
werden können, dann hast du es mit Nutzvieh zu tun.

## Continuous Delivery

![Continuous Delivery](../../../assets/blog/infrastructure-as-code/continuous-delivery.png)

Das vierte wichtige Prinzip von Infrastructure as Code ist, dass eine Pipeline
existiert, die den aktuellen gewünschten Zustand kontinuierlich in deine
verschiedenen Umgebungen propagieren kann. Das verlangt auch automatische Tests
auf Infrastrukturebene. Wie solche Tests aussehen, sehen wir später.

Einen gewünschten Zustand auf Basis der deklarativen Repräsentation deiner
Infrastruktur in Git kontinuierlich durchzusetzen, ist das Thema des dritten
Beitrags dieser Serie – deshalb gehen wir hier noch nicht tiefer darauf ein.
Aber lies unbedingt den kommenden Beitrag!

# Tools

Jetzt, wo wir das theoretische Wissen rund um Infrastructure as Code haben,
schauen wir genauer, wie wir es tatsächlich anwenden und welche Tools helfen,
deine Ressourcen vernünftig zu verwalten.

## Terraform

![Terraform](../../../assets/blog/infrastructure-as-code/terraform.png)

Zuerst wäre da das Open-Source-Tool [Terraform](https://www.terraform.io/), das
praktisch zum De-facto-Standard für das deklarative Verwalten von Infrastruktur
geworden ist. Es ist ein unabhängiges Tool von
[HashiCorp](https://www.hashicorp.com/), also komplett anbieterunabhängig und
mit vielen Ressourcentypen einsetzbar. Das heisst aber nicht, dass du einfach
zwischen Anbietern hin- und herwechseln oder Lock-in verhindern kannst! Eine für
AWS erstellte VM lässt sich nicht einfach auf Azure anwenden. Du kannst also
Terraform-Code für jeden Anbieter schreiben und sie sogar in einem einzigen
Modul kombinieren – einzelne Ressourcen sind aber stark anbieterspezifisch und
lassen sich nicht einfach austauschen, weil eine VM in Azure andere Parameter
braucht als eine in AWS.

Terraform ist sehr modular, und die einzelnen Module und Provider werden von
einer riesigen, aktiven Community gepflegt. Das macht es zu einem Tool, das
immer aktuell ist, und neue Features der Infrastrukturanbieter sind rasch
verfügbar. Das beste Beispiel ist der AWS-Provider für Terraform, der mehrmals
täglich aktualisiert wird und mit dem hohen Tempo von AWS bei neuen Features und
Produkten gut mithält – und dabei sehr stabil bleibt, ohne deine bestehende
Konfiguration kaputtzumachen.

Für seine Ressourcendefinitionen verwendet Terraform eine eigene Sprache namens
[HCL bzw. HashiCorp Configuration Language](https://www.terraform.io/docs/language/syntax/configuration.html).
Neue Terraform-Nutzende müssen diese Sprache also lernen – wer sie kennt, kann
sie aber bei jedem Infrastrukturanbieter anwenden.

## AWS CloudFormation

![CloudFormation](../../../assets/blog/infrastructure-as-code/cloudformation.png)

Eine zweite Kategorie sind Tools, die von den grösseren Infrastrukturanbietern
selbst gepflegt und veröffentlicht werden. Als Beispiel haben wir
[AWS CloudFormation](https://aws.amazon.com/cloudformation/) genommen, das
IaC-Tool von Amazon. Es gibt aber sehr ähnliche Tools für Microsoft Azure
([Azure Resource Manager](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview))
und die Google Cloud Platform
([Google Cloud Resource Manager](https://cloud.google.com/resource-manager)).
Diese Tools sind immer anbieterspezifisch und lassen dich ihre Ressourcen nicht
mit denen anderer Anbieter kombinieren. Zudem werden sie meist nicht von einer
Open-Source-Community gepflegt, sondern von den Anbietern selbst.
Überraschenderweise ist Terraform bei neuen Features meist aktueller als das
Tooling, das die Infrastrukturanbieter selbst pflegen. Hurra, Open Source!

Der Vorteil solcher Tools ist, dass sie typischerweise sehr gut in das übrige
Tooling des Anbieters integriert sind – seien es CI/CD-Server oder ein schönes
GUI, um die deklarierten Infrastruktur-Stacks zu verwalten. Zudem sind sie in
einer Konfigurationssprache geschrieben, die den meisten Engineers bereits
vertraut ist, etwa JSON oder YAML, was das Lernen erleichtert. Unserer Erfahrung
nach sind diese Tools aber meist nicht so ausgereift, benutzerfreundlich und
mächtig wie Terraform.

## Pulumi

![Pulumi](../../../assets/blog/infrastructure-as-code/pulumi.png)

Wenn du lieber echten Code als blosse Konfigurationsdateien schreibst, trifft
[Pulumi](https://www.pulumi.com/) vielleicht deinen Geschmack. Es unterstützt
mehrere Programmiersprachen wie JavaScript, TypeScript, Go, .NET Core und Python
und lässt dich deine Infrastruktur als Programmcode deklarieren. Das läuft dem
deklarativen Ansatz etwas zuwider, aber die Pulumi-Bibliothek fördert meist
Code, der ziemlich deklarativ aussieht.

Der grosse Vorteil von Pulumi: Du musst keine neue Sprache lernen, weil dir
vermutlich eine der genannten bereits vertraut ist. Du kannst das gesamte
bestehende Tooling und Ökosystem dieser Sprache nutzen – Linting oder sogar Type
Checking. Dein Texteditor kann dir mit Autovervollständigung helfen und dir
sagen, wenn du eine Zahl statt eines Strings verwendet hast. Zudem kannst du
alle Features deiner Sprache nutzen, etwa Schleifen und If-Statements, um deine
Infrastruktur intelligenter zu machen. Der Nachteil: Du kannst den Code ziemlich
komplex und damit schwer testbar und schwer nutzbar machen.

# Terraform

Schauen wir uns Terraform genauer an. Wie erwähnt ist es dank seines intuitiven
und mächtigen Toolings, seiner Vielseitigkeit und des umgebenden Ökosystems zu
einer Art Industriestandard geworden. Wir wollen daran einige Bausteine von
IaC-Tools vorstellen.

## Provider

![Terraform-Provider](../../../assets/blog/infrastructure-as-code/terraform-providers.png)

Das erste Konzept nennt Terraform «Provider». Da es viele Infrastrukturanbieter
unterstützt und jeder davon von seiner eigenen Community gepflegt und verwaltet
wird, müssen Nutzende verschiedene Provider in ihr Setup einstecken können. Ein
typischer Provider wäre AWS, Azure, Cloudflare oder auch Kubernetes. Diese
enthalten und abstrahieren das domänenspezifische Wissen, das für die
Kommunikation mit dem jeweiligen Infrastrukturanbieter nötig ist, und wissen,
wie verschiedene Operationen auf verschiedenen Ressourcen in API-Aufrufe an den
jeweiligen Anbieter übersetzt werden. Der AWS-Provider weiss also zum Beispiel,
wie man eine VM in AWS provisioniert, konfiguriert und ändert – aber auch, wie
man sie löscht, wenn die entsprechende Ressource in Terraform gelöscht wird.

Das modulare Provider-Setup ist ein grosser Teil des Erfolgs von Terraform: Es
macht Terraform zu einem unglaublich vielseitigen und mächtigen Tool, das von
verschiedenen Communities genutzt werden kann und für Endnutzende sogar
Infrastruktur verschiedener Anbieter in einer einzigen Codebasis vereint.

Zur Veranschaulichung hier der Provider-Abschnitt aus dem Terraform-Modul, mit
dem wir unsere eigene Website deployen.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

provider "aws" {
  alias  = "us_east"
  region = "us-east-1"
}
```

## Module

![Terraform-Module](../../../assets/blog/infrastructure-as-code/terraform-modules.png)

Ein weiteres wichtiges Konzept in Terraform sind Module. Wie der Name andeutet,
erlauben sie uns, unsere Infrastruktur zu modularisieren und Abstraktionsebenen
zu schaffen. Ein Modul ist eine beliebige Menge von
Terraform-Ressourcendefinitionen, die zusammengehören und als Einheit über ihren
Lebenszyklus geführt werden. Ein gutes Beispiel ist
[Lenas Modul zum Erstellen einer Single-Page-Application auf AWS](https://github.com/cloudlena/terraform-spa).
Wie dieses Repo zeigt, machen Module unseren Code wiederverwendbar.
[Terraform hat eine riesige Registry solcher Module](https://registry.terraform.io)
für viele Anbieter, und es empfiehlt sich, sie wo immer möglich zu nutzen: Sie
helfen uns, weniger Code zu schreiben, Best Practices zu befolgen und
automatisch bei Änderungen des Infrastrukturanbieters aktuell zu bleiben.

Ein weiterer wesentlicher Aspekt von Modulen: Sie erlauben uns, Teile unserer
Infrastruktur zu testen. Infrastruktur testen, fragst du? Mehr dazu später.

## State

![Terraform State](../../../assets/blog/infrastructure-as-code/terraform-state.png)

In Terraform beschreibt der sogenannte State alle provisionierten Ressourcen
unserer Infrastruktur und deren Konfiguration auf einfache, für Menschen lesbare
Weise. Wir haben also immer eine einzige Datei, die den aktuellen Zustand
unserer gesamten Infrastruktur und die Konfiguration jedes Ressourcen-Parameters
beschreibt. Wenn wir etwas an der Deklaration unserer Module oder Ressourcen
ändern und diese Änderungen anwenden, nimmt Terraform die Änderungen zuerst über
den jeweiligen Provider vor und spricht damit die API des Infrastrukturanbieters
an. Danach aktualisiert es die State-Datei, um die jeweiligen Änderungen
abzubilden. Schauen wir uns so eine State-Datei an:

```json
{
  "version": 4,
  "terraform_version": "1.0.10",
  "serial": 99,
  "lineage": "2c3e0ed3-a77b-46ac-1ae6-ec00c8c0e1e0",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "aws_route53_record",
      "name": "email",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
      "instances": [
        {
          "schema_version": 2,
          "attributes": {
            "alias": [],
            "allow_overwrite": null,
            "failover_routing_policy": [],
            "fqdn": "bespinian.io",
            "geolocation_routing_policy": [],
            "health_check_id": "",
            "id": "Z1UVPIZKL5KPK0_bespinian.io_MX",
            "latency_routing_policy": [],
            "multivalue_answer_routing_policy": null,
            "name": "bespinian.io",
            [...]
          },
          [...]
        },
        [...]
      ]
    }
    [...]
}
```

State-Dateien lassen sich an verschiedenen Orten ablegen. Den einfachsten hast
du gerade gesehen: Die State-Datei kann in Git eingecheckt und mit der
Applikation versioniert werden. Das hat allerdings zwei Nachteile. Erstens kann
sich die State-Datei nach einem Deployment ändern. Wenn wir also CI/CD machen
und unser CD-Server etwas an der Infrastruktur ändert, ändert sich die
State-Datei und wir haben ein schmutziges Repository. Zweitens erlaubt es nicht
wirklich, dass mehrere Personen oder Systeme Terraform-Konfigurationen anwenden,
weil sie lokal unterschiedliche State-Dateien haben könnten – was irgendwann zu
Problemen führt. Es empfiehlt sich daher, den State zentral abzulegen, etwa in
einem S3-Bucket oder in Terraform Cloud. Terraform unterstützt viele
State-Backends.

Aber was passiert, wenn Leute Ressourcen manuell ohne Terraform ändern oder
sogar Ressourcen erstellen, die dann nicht von Terraform verwaltet werden? Das
nennen wir Drift. Es bedeutet, dass der tatsächliche Zustand der provisionierten
Infrastruktur vom in Terraform gespeicherten Zustand abgedriftet ist. Das ist
ein grosses Problem bei deklarativen Systemen und lässt sich nur entschärfen,
indem man entweder darauf vertraut, dass die Leute es nicht tun, oder es
verhindert, indem man ihnen in wichtigen Umgebungen wie der Produktion schlicht
keine Schreibrechte gibt. Das ist aber nicht immer eine Option. Es gibt ein sehr
nützliches Tool namens [driftctl](https://driftctl.com/), mit dem wir
Infrastruktur-Drift erkennen und sehen, welche Ressourcen nicht von Terraform
verwaltet werden oder deren Konfigurationszustand sich geändert hat. Schauen
wir, wie es funktioniert.

Nehmen wir wieder die bespinian-Website als Beispiel und navigieren zum
[Infrastruktur-Ordner in diesem Repo](https://github.com/bespinian/bespinian.io/tree/main/infrastructure).
Jetzt können wir ausführen

```shell
driftctl scan
```

und das Tool `driftctl` zeigt uns alle Unterschiede zwischen den in unserem
AWS-Account vorhandenen Ressourcen und den in unserem Terraform-Modul
deklarierten. Hier die Ausgabe, die wir in diesem Fall erhalten:

```shell
Scanned states (1)
Found resources not covered by IaC:
  aws_api_gateway_account:
    - api-gateway-account
  aws_iam_access_key:
    - AKIA33B5E5FBDSBJYYX2
        User: this
    - AKIA33B5E5FBEREZ7WF2
        User: github-action-bespinianio
    - AKIA33B5E5FBKDWXUF3B
        User: lena
  aws_iam_user:
    - gabriel
    - github-action-bespinianio
    - lena
    - this
  aws_route53_record:
    - Z1UVPIZKL5KPK0_blog.bespinian.io_CNAME
        Type: CNAME
Found 17 resource(s)
 - 47% coverage
 - 8 resource(s) managed by terraform
 - 9 resource(s) not managed by Terraform
 - 0 resource(s) found in a Terraform state but missing on the cloud provider
Scan duration: 13s
```

Wir sehen, dass `driftctl` einige Ressourcen erkannt hat, die in AWS ohne
entsprechende Ressource im Terraform-Modul erstellt wurden. Einige davon sind
absichtlich da, andere müssen tatsächlich aufgeräumt werden. Andererseits sind
alle von Terraform verwalteten Ressourcen synchron – in dieser Hinsicht sind wir
also gut aufgestellt.

## Ein typischer Workflow

Setzen wir unser Wissen ein und schauen uns einen typischen Workflow mit
Terraform an.

Zuerst initialisieren wir das Repo, was Terraform anweist, die jeweiligen
Provider und Module herunterzuladen. Das ist wichtig, um einen sauberen lokalen
State zu haben und den aktuellen Remote-State zu kennen. Das Flag «upgrade»
weist Terraform an, nach Abhängigkeiten zu suchen, die im erlaubten Rahmen
aktualisiert werden können. Wir können zum Beispiel einschränken, dass Provider
nicht über ihre Major- oder Minor-Version hinaus aktualisiert werden.

```shell
terraform init -upgrade
```

Der zweite Schritt sind unsere eigentlichen Änderungen. Hier nutzen wir vim, um
eine der Dateien zu bearbeiten – vielleicht um eine neue Ressource hinzuzufügen
oder eine bestehende zu ändern.

```shell
vim main.tf
```

Es kann nützlich sein, bestimmte Konfigurationen in unserer Terraform-Definition
zu linten. Das kann Applikationsausfälle von vornherein verhindern und dir
helfen, Best Practices von Terraform und den Providern zu befolgen. Zwei der
beliebtesten Linter sind erstens `tflint`, ein allgemeiner Linter für
Terraform-Code und AWS-, Azure- und GCP-Ressourcen. Ein zweiter sehr beliebter
Linter heisst `tfsec` und ist stark auf Sicherheit und das Verhindern von
Sicherheitslücken in deiner Infrastruktur ausgerichtet. Es empfiehlt sich daher
sehr, diese beiden regelmässig auszuführen oder sie sogar Teil deines
CI/CD-Prozesses zu machen.

```shell
tflint; tfsec
```

Als Nächstes führen wir den Befehl aus

```shell
terraform plan
```

der den aktuellen Infrastrukturzustand mit dem vergleicht, was wir anwenden
wollen. Wir bekommen einen sehr schönen Diff dessen, was sich bei Anwendung der
neuen Konfiguration ändern würde – so können wir prüfen, dass keine Änderung
ungewollt ist.

Als letzten Schritt wenden wir die geplanten Änderungen an mit

```shell
terraform apply
```

Das kann eine Weile dauern, weil jetzt tatsächlich mit den APIs des
Infrastrukturanbieters gesprochen wird, um die Ressourcen wie angegeben zu
provisionieren oder zu ändern. Danach ist unser State aktualisiert und die
Konfiguration angewendet.

## Automatisierung

Natürlich ist es ziemlich mühsam und inkonsistent, alle Änderungen an unserem
Repo manuell anwenden zu müssen. Wie jedes andere Deployment wollen wir diese
Schritte automatisieren und einem CI/CD-Server überlassen, der in einer
konsistenten Umgebung läuft und zuverlässig konsistente Deployments erzeugt.
Theoretisch geht das mit jedem beliebigen CI/CD-System, auf dem sich das
Terraform-Binary installieren lässt, denn es muss nur unsere Credentials
auslesen und `terraform apply` ausführen können. Für die gängigsten Systeme gibt
es aber nützliche Module, die diesen Prozess weiter vereinfachen. Für
Terraform-Befehle gibt es zum Beispiel eine ziemlich vielseitige GitHub Action,
wie unten zu sehen.

```shell
- uses: hashicorp/setup-terraform@v1

- run: terraform init

- run: terraform plan -no-color

- run: terraform apply -auto-approve
```

## Testen

![Terratest](../../../assets/blog/infrastructure-as-code/terratest.png)

Da sich Infrastruktur mit Terraform modularisieren lässt, ist es sinnvoll, diese
einzelnen Module zu testen – genau wie wir Tests für die einzelnen Funktionen
unserer Applikationen schreiben. Erstens, um sicherzustellen, dass sie
tatsächlich funktionieren. Zweitens, um zu prüfen, dass ihre Schnittstelle
sauber ist und alles bietet, was man für eine korrekte Nutzung braucht. Ein
Tool, das das automatisiert, ist [Terratest](https://terratest.gruntwork.io/).
Es erlaubt uns, einfachen Go-Code zu schreiben, der unter der Haube Terraform
aufruft. Es erstellt die in unserem Modul enthaltene Infrastruktur temporär, um
zu sehen, ob die Konfiguration gültig ist, und führt dann ein paar Tests darauf
aus. Sobald alle Tests durch sind, wird die Infrastruktur automatisch wieder
abgebaut und gelöscht.

Schauen wir, wie das in der Praxis aussieht:

```go
func TestTerraformBasicExample(t *testing.T) {
        t.Parallel()

        testID := strings.ToLower(random.UniqueId())
        hostname := "test-" + testID

        terraformOptions := terraform.WithDefaultRetryableErrors(t,
                &terraform.Options{
                        TerraformDir: "../examples/basic",
                        Vars: map[string]interface{}{
                                "hostname":        hostname,
                                "domain":          domain,
                                "resource_suffix": "-" + hostname,
                        },
                        NoColor: true,
                })

        defer terraform.Destroy(t, terraformOptions)

        terraform.InitAndApply(t, terraformOptions)

        fqdn := terraform.Output(t, terraformOptions, "fqdn")

        expectedFQDN := hostname + "." + domain
        if fqdn != expectedFQDN {
                t.Errorf("Expected FQDN to be %s, got %s", expectedFQDN, fqdn)
        }
}
```

Wie du siehst, werden Tests in Terratest in Go geschrieben. In diesem Beispiel
setzen wir zuerst ein paar Optionen und rufen dann `terraform init` und
`terraform apply` auf. In dieser Phase wird echte Infrastruktur provisioniert,
auf der wir dann unsere Tests ausführen. Hier prüfen wir, dass der FQDN eine
bestimmte Form hat. Am Ende des Tests rufen wir `terraform destroy` auf, wie du
am `defer`-Statement im Go-Code siehst.

Wie du gesehen hast, entstehen dabei echte Ressourcen in deinen Umgebungen. Es
ist deshalb entscheidend, das Aufräumen abzuwarten und sich der möglichen Kosten
bewusst zu sein. Die Ressourcen sind sehr kurzlebig, können aber trotzdem ins
Geld gehen. Zudem kann das Aufräumen manchmal fehlschlagen. Darum ist es
wichtig, das erwähnte driftctl von Zeit zu Zeit auszuführen und nach übrig
gebliebenen Ressourcen zu suchen, die manuell aufgeräumt werden müssen. Und
natürlich ist es essenziell, diese Tests nicht in einer produktiven Umgebung
laufen zu lassen – denn auch wenn sie das nicht sollten, können sie bei
schlechter Programmierung bestehende Ressourcen beeinträchtigen.

Insgesamt helfen diese Tests enorm, eine stabile Infrastruktur zu haben und beim
Release neuer Modulversionen sicherer zu sein – wir halten es daher für
entscheidend, sie zu haben und gut zu pflegen.

# Immutable Infrastructure

Ein weiteres Konzept, das wir uns heute ansehen wollen, ist Immutable
Infrastructure. Auch das ist eine gute Praxis rund um Infrastructure as Code,
denn sie vereinfacht die Verwaltung grosser Flotten von VMs und anderen
Ressourcen.

## Die Idee

Immutable Infrastructure ist eine weitere gute Praxis rund um Infrastructure as
Code und bedeutet, dass wir Infrastruktur erstellen – zum Beispiel VMs –, die
zur Laufzeit nicht verändert wird. Wenn wir das Basis-OS unserer VMs
aktualisieren wollen, loggen wir uns nicht in jede einzelne ein und führen einen
Update-Befehl aus. Bei Containern würde das niemand machen, oder? Wir sollten
vielmehr den guten Praktiken folgen, die wir von Containern kennen: ein neues
Image mit der neuen Version des Basis-OS erstellen und alle unsere VMs in einem
Rolling Upgrade mit dem neuen Image neu erstellen.

## Packer

![Packer](../../../assets/blog/infrastructure-as-code/packer.png)

[Packer](https://www.packer.io/) ist ein Tool, das das Erstellen von Immutable
Infrastructure stark vereinfacht. Es erlaubt uns, unsere VM-Images zu definieren
– genau wie wir es mit einem Dockerfile für Container-Images tun. Wir haben also
eine Konfigurationsdatei mit einem Basis-Image und den Schritten, die darauf
angewendet werden sollen. Packer nimmt diese Anweisungen, erstellt ein neues
Image mit unserer Applikation und all ihren Abhängigkeiten und veröffentlicht
dieses Image dann in der Image Registry des Infrastrukturanbieters. So können
wir alle guten Praktiken des Image-Ausrollens befolgen, die wir von Containern
kennen: sie mit allen nötigen Bibliotheken und Binaries ausliefern und zur
Laufzeit nicht verändern. Nur wenden wir sie diesmal auf VM-Images an und
behandeln unsere VMs in dieser Hinsicht gewissermassen wie Container.

Das hat natürlich viele Vorteile. Es beschleunigt die Startzeit unserer VMs,
weil wir nicht hunderte Tools und Pakete installieren müssen. Es macht unsere
Images und Applikationen portabler und testbarer, weil wir dasselbe Image nach
AWS, Google Cloud und auch in unsere lokale VirtualBox ausliefern können. Diese
Prozesse sollten auch die Stabilität unserer Umgebungen und VMs weiter
verbessern, weil keine undokumentierten Änderungen erlaubt sind und alle
Schritte bis zu unseren finalen Images in unserer Packer-Datei dokumentiert
sind. Schauen wir, wie das funktioniert.

Zuerst würden wir ein Packer-Template für das Image angeben, das wir bauen
wollen. Unten siehst du ein Beispiel eines Images, das auf `ubuntu-xenial-16.04`
basiert und NGINX installiert hat.

```hcl
source "amazon-ebs" "ubuntu" {
  ami_name      = "learn-packer-linux-aws"
  instance_type = "t2.micro"
  region        = "us-west-2"
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-xenial-16.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  name    = "learn-packer"
  sources = [
    "source.amazon-ebs.ubuntu"
  ]
  provisioner "shell" {
    inline = [
      "echo Installing NGINX",
      "sudo apt update",
      "sudo apt install -y nginx",
    ]
  }
}
```

Führen wir jetzt `packer build` auf diesem Template aus, wird in AWS eine
Ubuntu-VM hochgefahren und NGINX darauf installiert. Packer löst dann das
Erstellen eines Snapshots dieser VM aus und erzeugt daraus ein neues Image.

Damit sind wir am Ende des zweiten Teils dieser GitOps-Blogserie. Wir hoffen, er
hat dir gefallen – und dass dir auch der dritte Teil gefallen wird, in dem es um
GitOps selbst geht. Bleib dran für diesen spannenden Schlussteil!
