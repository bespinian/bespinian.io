---
title: API-Contract-Definitionen
author: Lena Fuhrimann
pubDate: 2022-10-11
tags: ["api", "contracts", "openapi", "graphql", "grpc"]
description:
  "Erkunde verschiedene Technologien zur Definition von Service Contracts –
  OpenAPI, GraphQL und gRPC – und lerne Best Practices, um Spezifikation und
  Implementierung synchron zu halten."
image: ../../../assets/blog/api-contracts.jpg
---

Wenn du einen oder mehrere Services betreibst, ist es essenziell, dass sie
verlässliche
[Service Contracts](https://cloud.google.com/appengine/docs/legacy/standard/java/designing-microservice-api)
haben, welche die von ihnen bereitgestellten APIs definieren. Diese Contracts
bestehen meist aus deklarativen Interface-Definitionen, welche die vom
jeweiligen Service bereitgestellte API klar definieren und typisieren.
Entscheidend ist daher, dass der Code des Service das Interface exakt
implementiert und damit seine Seite des Vertrags erfüllt. Regressionen müssen
erkannt und Änderungen in einem gut kommunizierten Update des Contracts
abgebildet werden. Hier wollen wir uns verschiedene Wege ansehen, Contracts für
eines der verbreitetsten Protokolle zur Bereitstellung von Service-APIs zu
spezifizieren: **HTTP**.

HTTP eignet sich hervorragend als Kommunikationsmittel für Microservices, weil
es offen, verlässlich, programmiersprachen-agnostisch ist und über das Netz
bestens funktioniert. All diese Eigenschaften sind für moderne Services
entscheidend, denn sie erlauben Engineers, die zugrunde liegenden Technologien
zu wechseln (z.B. den Back-End-Code von Python auf Go umzustellen), ohne dass
das den Contract berührt. Die Konsumenten der API müssen die implementierende
Technologie also gar nicht kennen, und das bereitstellende Team kann unabhängig
entscheiden.

Service Contracts enthalten üblicherweise die folgenden vier Komponenten:

- Verfügbare Endpunkte und Operationen je Endpunkt
- Operationsparameter sowie Ein- und Ausgabe je Operation
- Authentifizierungsmethoden
- Kontaktinformationen, Lizenz, Nutzungsbedingungen und weitere Angaben

## Spezifikation und Implementierung

Wer mit Services und ihren Contracts arbeitet, muss sowohl die Spezifikation als
auch die Implementierung pflegen. Idealerweise sind diese immer synchron, denn
die beste Dokumentation nützt nichts, wenn sie die Realität der
API-Implementierung nicht korrekt abbildet.

### Manuelle Spezifikation

Der einfachste Weg, einen Contract zu erstellen, ist, ihn von Hand zu schreiben
und danach den Code zu schreiben, der ihn implementieren soll. Das ist ziemlich
mühsam und fehleranfällig, weil du im Grunde alles zweimal schreibst. Wenn du
deine Implementierung änderst, musst du daran denken, Dokumentation und Contract
auf exakt dieselbe Weise anzupassen – und umgekehrt. Ein deutlich besserer
Ansatz ist, entweder eine contract-basierte Technologie zu wählen, welche die
Interface-Spezifikation in die bereitgestellte API integriert, oder zumindest
die Generierung des Contracts aus der Implementierung (oder umgekehrt) zu
automatisieren.

### Automatisierte Generierung

Es gibt zwei grundlegende Ansätze, um Contract und Implementierung automatisiert
synchron zu halten. Der erste ist, zuerst den Code zu schreiben und daraus den
Contract zu generieren (_Implementation First_). Der zweite ist, den Contract zu
schreiben und daraus den Implementierungscode zu generieren (_Contract First_).

Beide Ansätze – Contract First wie Implementation First – garantieren eine
einzige Quelle der Wahrheit und dass der jeweils andere Teil immer synchron ist.
Beide sind daher gangbare Wege. Generell ist es aber vorzuziehen, zuerst den
Contract zu schreiben und daraus Implementierungscode zu generieren. Der Grund:
Wenn du mit der Implementierung deines Service beginnst, sollte der Contract
idealerweise bereits definiert und mit potenziellen Konsumenten deiner API
kommuniziert sein, damit diese unabhängig von deiner Implementierung arbeiten
können. Ein menschen- und maschinenlesbarer Contract in deinem
Quellcode-Repository erlaubt dir zudem, Änderungen daran über die Zeit
nachzuverfolgen, und dient zusätzlich als Dokumentation dessen, was der
Implementierungscode tut (oder zumindest tun sollte).

## Technologien

Hier schauen wir uns drei verschiedene Technologien an, mit denen sich ein klar
definierter und deklarativer Contract für deine Services schreiben lässt:
OpenAPI, GraphQL und gRPC. Alle haben ihre Vor- und Nachteile, die wir darlegen
und diskutieren. Natürlich gibt es noch viele weitere Technologien zur
Deklaration von Contracts, aber die hier vorgestellten sind drei sehr beliebte,
die einfach zu nutzen sind und starke Communities haben. Wir illustrieren sie am
einfachen Beispiel einer API, über die man Pokémon anhand ihrer ID abfragen
kann.

### OpenAPI

[OpenAPI](https://www.openapis.org/) (früher als Swagger bekannt) ist ein sehr
verbreiteter Weg, REST- und andere HTTP-APIs zu spezifizieren. Es lässt sich
leicht schreiben, weil die Spezifikation einfach eine JSON- oder YAML-Datei ist,
die gemäss einer klar definierten Spezifikation beschreibt, wie deine API
aussieht.

Eine HTTP-Endpunkt-Definition in OpenAPI könnte so aussehen:

```yaml
paths:
  /pokemon/{id}:
    get:
      summary: Gibt ein Pokémon zurück
      responses:
        "200": # status code
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Pokemon"

components:
  schemas:
    Pokemon:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
      required:
        - id
        - name
```

OpenAPI selbst bringt keine Tools mit, um die Spezifikation aus deiner
Implementierung zu generieren oder umgekehrt. Da es aber ein so beliebtes Format
ist, gibt es viele Tools, die deinen Implementierungscode (und allenfalls
zusätzliche Annotationen) parsen und daraus eine gültige OpenAPI-Spezifikation
erzeugen. Ein gutes Beispiel für so ein Tool ist
[`springdoc-openapi`](https://springdoc.org/), das Java-Klassen mit ihren
Properties, Methoden und Annotationen nimmt und daraus automatisch eine
OpenAPI-Spezifikation generiert. Es gibt auch Tools für die Gegenrichtung: Sie
nehmen eine bestehende OpenAPI-Spec und erzeugen daraus Boilerplate-Code für
eine konforme Implementierung. Ein beliebtes Beispiel dafür ist
[`oapi-codegen`](https://github.com/deepmap/oapi-codegen), das aus einer
gültigen Spezifikation Go-Code erzeugt.

Dass OpenAPI nicht direkt in die Implementierungs-Frameworks integriert ist, hat
natürlich einen grossen Nachteil: Es erzwingt nicht (z.B. zur Compile-Zeit),
dass deine Implementierung den spezifizierten Contract tatsächlich perfekt
erfüllt. Du kannst ein ähnliches Ergebnis aber erreichen, indem du eine Prüfung
der Konformität deines Codes in deine Automatisierungs-Pipeline aufnimmst, die
Releases verhindert, die ungewollt vom Contract abweichen.

An dieser Stelle ist erwähnenswert, dass REST-Applikationen sogenannte
[HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)-Links enthalten können. Das
sind URLs im Response Body einer Anfrage, die zu weiteren Endpunkten mit
Aktionen für ein Element führen. Wenn ein Client diesen Links automatisch folgt,
können sich Contracts darauf verlassen und einige der konkreten URLs und Pfade
aus ihrer Spezifikation weglassen. Allerdings implementieren nicht allzu viele
Applikationen in freier Wildbahn HATEOAS-Links zuverlässig, und sie haben ihre
Tücken und Schwächen.

### GraphQL

[GraphQL](https://graphql.org/) bezeichnet sich selbst als «eine Query-Sprache
für deine API». Bei dieser Technologie geht es darum, ein Schema zu definieren,
das deine Endpunkt-Methoden und die Objekte, die sie erwarten und zurückgeben,
streng typisiert.

Ein einfaches GraphQL-Schema könnte so aussehen:

```graphql
type Query {
  # Gibt ein Pokémon zurück
  pokemon(id: ID!): Pokemon
}

type Pokemon {
  id: ID!
  name: String!
}
```

Es ist nicht nur viel knapper als die obige OpenAPI-Spezifikation, sondern hat
auch grosse Vorteile, weil es Teil der GraphQL-Spezifikation ist. Fast jeder
GraphQL-Endpunkt stellt sein Schema automatisch bereit, und dieses ist ein
direktes Produkt der tatsächlich bereitgestellten Endpunkte. So können Clients
den Contract direkt beim Endpunkt abfragen und wissen damit, dass er immer
aktuell ist. Gegen dieses bereitgestellte Schema lassen sich Tests fahren, die
Breaking Changes automatisch erkennen und deren Release womöglich verhindern.
Diese Konventionen, wie der Endpunkt seine Dokumentation bereitstellt, erlauben
uns den Einsatz umfassender Client-Frameworks wie
[`apollo-client`](https://www.apollographql.com/).

Auch bei GraphQL gibt es Frameworks, mit denen sich zuerst ein Schema schreiben
und daraus der entsprechende Boilerplate-Code generieren lässt. Ein beliebtes
Tool dafür ist [`gqlgen`](https://gqlgen.com/) in Go.

### gRPC

Eine weitere beliebte Technologie zur Deklaration von Contracts ist
[gRPC](https://grpc.io/). Sie basiert auf
[Protocol Buffers](https://github.com/protocolbuffers/protobuf), einer Art,
festzulegen, wie strukturierte Daten serialisiert werden. Das Interface eines
Protocol Buffer wird in einer Datei definiert, die so aussehen könnte:

```protobuf
service PokemonService {
  // Gibt ein Pokémon zurück
  rpc GetPokemon (GetPokemonRequest) returns (Pokemon) {}
}

message GetPokemonRequest {
  string id = 1;
}

message Pokemon {
  string id = 1;
  string name = 2;
}
```

Ein grosser Unterschied von Protocol Buffers zu den anderen genannten
Technologien ist, dass die ausgetauschten Daten kein Klartext, sondern ein
Binärformat sind. Das macht sie sehr performant, aber auch schwerer zu debuggen
– weshalb ein klar definiertes Schema und eine klare API entscheidend sind. Ein
Compiler für solche Protocol-Buffer-Dateien ist in die Toolchain eingebaut und
erlaubt dir, aus der Spezifikation Boilerplate-Code zu generieren und die
Einhaltung des definierten Contracts zu erzwingen.

## Fazit

Es gibt viele Wege, Contracts für deine Service-APIs zu schreiben. Auf diese
Punkte solltest du bei einem guten Contract achten:

- Er ist für Menschen lesbar
- Er ist maschinenlesbar
- Er ist deklarativ und umfassend
- Er wird über Versionskontrolle nachverfolgt
- Er ist programmiersprachen-agnostisch
- Er erzwingt, dass die Implementierung den Contract erfüllt
- Breaking Changes am Contract werden erkannt und potenziellen Konsumenten
  sauber kommuniziert

Damit sind die oben genannten Technologien ausgezeichnete Optionen – und alle
ein grosser Fortschritt gegenüber dem blossen Festhalten des Contracts irgendwo
in einem Wiki.

Willst du deine eigenen API-Contract-Definitionen erstellen? Schau dir unseren
Service
[Cloud Native Empowerment](/de/services/cloud-native-empowerment?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=api_contract_definitions)
an und buche deinen kostenlosen Workshop.
