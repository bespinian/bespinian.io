---
title: Entwicklung des IIoT-Gesundheitsmonitors BLOX
company: Comet X-Ray
logo: ../../../assets/customers/comet.svg
pubDate: 2024-11-06
results:
  - IIoT-Gesundheitsüberwachung für Röntgen-Flotte aufgebaut
  - Übergang zu präventiver Wartung ermöglicht
  - Kosteneffizientes Serverless auf AWS implementiert
  - Echtzeit-Monitoring & Alerts bereitgestellt
quote:
  "bespinians Expertise im Cloud-Native-Bereich ermöglichte unsere Reise von
  Ausfällen zu Durchbrüchen bei Röntgenmodulen. Die sehr agile Implementierung
  der BLOX-Gesundheitsüberwachung war der Schlüssel, um unseren Kunden den
  Übergang von reaktiver zu präventiver Wartung zu ermöglichen."
authorName: Pascal Corbat
authorTitle: Product Manager
authorImage: ../../../assets/customers/comet-pascal.jpeg
---

## Kunde

[Comet X-Ray](https://xray.comet.tech/) ist ein Schweizer Unternehmen mit Sitz
in Flamatt, das weltweit mehr als 1700 Mitarbeitende beschäftigt. Sie sind ein
führendes Technologieunternehmen, das Innovationen im Röntgen- und
Hochfrequenzgeschäft vorantreibt. Die Sparte Comet X-ray entwickelt und
produziert Röntgenmodule, die zerstörungsfreie Prüfungen von Materialien und
Industriekomponenten ermöglichen. Die geprüften Teile stammen aus der Luft- und
Raumfahrt, Automobil-, Batterie-, Halbleiter- und anderen Märkten.

## Hintergrund

Die Röntgenmodule, die Comet bei ihren Kunden weltweit eingesetzt hat, erfordern
regelmässige Wartung. Es ist entscheidend für eine effiziente Arbeit mit diesen
Geräten zu wissen, was genau in ihnen vor sich geht und wie sie verwendet
werden. Mit gezielter Datenvisualisierung und präventiven Warnungen kann man
Muster, Abweichungen, Lücken erkennen und fehlerhafte Nutzung erkennen sowie
Ausfälle verhindern. Deshalb wollte Comet in diesem Bereich innovativ sein und
ein solches IIoT (Industrial Internet of Things) Tool namens BLOX für sich und
seine Kunden entwickeln.

## Projektziel

Das Ziel von BLOX ist es, Comet und ihren Kunden das grosse Bild zu geben. Die
Transparenz und Übersicht zu schaffen, indem die Metriken und Daten jedes Geräts
auf eine Weise dargestellt werden, die leicht verständlich ist und zeigt, wie
das Gerät verwendet wurde. Benutzer können dann potenzielle Probleme des Geräts
untersuchen, indem sie in verschiedene Diagramme einer Vielzahl von Metriken
eintauchen. Sie erhalten auch Warnungen und Alerts, wenn das System
ungewöhnliche Muster und unerwartete Systemzustände erkennt. bespinian und Comet
bauen BLOX in enger Zusammenarbeit auf und sind sehr zufrieden damit, wie das
Tool bereits grossen Mehrwert bringt.

## bespinians Rolle

bespinian spielte eine Schlüsselrolle in den folgenden Bereichen:

### Infrastruktur-Setup

bespinian richtete die Infrastruktur von BLOX ein, indem mehrere separate
Umgebungen mit Terraform in AWS bereitgestellt wurden. Diese Infrastruktur
musste resilient, einfach zu warten und kosteneffizient sein. Durch die Wahl
hochgradig verwalteter serverloser Technologien wie AWS Lambda, Amazon DynamoDB
oder Amazon S3 für verschiedene Teile der Applikation konnte ein Grossteil der
Infrastruktur-Setup- und Wartungsarbeit an den Cloud-Provider delegiert werden.
Die Verwendung von Infrastructure as Code ermöglicht es uns, mehrere Umgebungen
einfach zu warten und sicherzustellen, dass Parität zwischen ihnen besteht.

### Backend-Entwicklung

Das Backend von BLOX ist das Herzstück der Applikation und wo die gesamte
Geschäftslogik liegt. Es ist in Python geschrieben, weil das eine bei Comet gut
bekannte Sprache ist, ein Bürger erster Klasse auf AWS Lambda und uns die
Flexibilität bietet, kleine iterative Änderungen vorzunehmen. Dies ist wichtig,
weil die Geschäftslogik, wie die Logs und Metriken von Geräten interpretiert
werden, ziemlich komplex und manchmal verwickelt ist. Durch die Verwendung von
sauber strukturiertem und getestetem Code ist diese Komplexität jedoch gut
dokumentiert und im BLOX-Backend-Code automatisiert.

### Frontend-Entwicklung

Für das Frontend, das in den Webbrowsern der Benutzer gerendert wird,
entschieden wir uns für Svelte und SvelteKit. Beides sind relativ neue, aber
leistungsstarke Technologien, die es uns ermöglichen, eine sichere und
performante Browser-Applikation zu bauen, die einfach zu bedienen und leicht
zugänglich ist. Für das Hosting dieser Applikation wurde eine Kombination aus S3
und CloudFront gewählt. Dadurch wird BLOX auf sehr kosteneffiziente Weise
bereitgestellt und ist für Comet und ihre Kunden weltweit zugänglich.

### Monitoring und Alerting

Da die gesamte Infrastruktur auf einem grossflächigen Cloud-Provider gehostet
wird, ist es ein einfacher Ansatz, die Monitoring-, Alerting- und Logging-Tools
zu verwenden, die sie bereitstellen. In diesem Fall entschieden wir uns für
Amazon CloudWatch, das die Logs des BLOX-Backends sammelt und Alerts auslöst,
wenn etwas schief geht. Durch die Verwendung dieser bereitgestellten Tools
können wir sicherstellen, dass die Monitoring- und Alerting-Infrastruktur selbst
immer verfügbar ist und ein umfassendes Feature-Set bietet.

## Verwendete Technologien

- **Infrastruktur**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Runtime**: AWS Lambda
- **Monitoring**: Amazon CloudWatch
- **Backend**: Python / Flask
- **Frontend**: Svelte / TypeScript
- **DB**: DynamoDB
