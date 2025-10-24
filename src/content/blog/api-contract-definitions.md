---
title: API Contract Definitions
author: Lena Fuhrimann
date: 2022-10-11
tags: ["api", "contracts", "openapi", "graphql", "grpc"]
excerpt:
  "Explore different technologies for defining service contracts including
  OpenAPI, GraphQL, and gRPC, and learn best practices for maintaining
  specification and implementation in sync."
---

When running one or multiple services, it is essential that they have reliable
[service contracts](https://cloud.google.com/appengine/docs/legacy/standard/java/designing-microservice-api)
defining their exposed APIs. Those contracts mostly consist of declarative
interface definitions, which strongly define and type the API exposed by the
respective service. As such, it is crucial that the code making up the service
exactly implements the interface and therefore fulfills its side of the
contract. Regressions need to be detected and changes reflected in a well
communicated update to the contract. Here, we want to look at different ways of
specifying contracts for what is one of the most common protocols for exposing
service APIs: **HTTP**.

HTTP works great as a means of communication for microservices because it is
open, reliable, programming language-agnostic and works great over the wire. All
of these features are crucial to modern services, as they allow engineers to
change the underlying technologies (e.g., change the back end code from Python
to Go) without it affecting the contract. Therefore, the API's consumers don't
even need to know about the implementing technology and the providing team can
take independent decisions respectively.

Service contracts usually contain the following four components:

- Available endpoints and operations on each endpoint
- Operation parameters Input and output for each operation
- Authentication methods
- Contact information, license, terms of use and other information

## Specification and Implementation

When working with services and their respective contracts, one has to maintain
both the specification and the implementation. Ideally, these should always be
in sync, as the best documentation is useless, if it does not accurately reflect
the reality of the API implementation.

### Manual Specification

The easiest way of creating a contract is to manually write it, and then writing
the respective code that should implement the contract. This is quite tedious
and error-prone, as you have to basically write everything twice. When you
change your implementation, you have to think about also changing the
documentation and contract in the exact same way and vice versa. A way better
approach is to either pick a technology that is contract-based and incorporates
the interface specification in the exposed API, or to at least automate either
the generation of the contract from the implementation or the other way around.

### Automated Generation

There are two basic approaches to keeping the contract and the implementation in
sync in an automated way. The first one is to write the code first and have the
contract generated from that (_Implementation First_). The second approach is to
write the contract and have the respective implementation code generated from
that (_Contract First_).

Using either the contract first or implementation first approach guarantee that
there is a single source of truth and that the other part is always in sync. As
such, both are viable approaches. However, in general, it is preferred to write
the contract first and generate implementation code from it. The reason being
that when you begin implementing your service, ideally, the contract has already
been defined and communicated with potential consumers of your API to allow them
to work independently of your implementation. Having a human- and
machine-readable contract checked into your source code repository allows you to
track changes to that contract over time and additionally serves as
documentation for what the implementation code does (or at least what it should
do).

## Technologies

Here, we'll look at three different technologies that allow to write a clearly
defined and declarative contract to your services: OpenAPI, GraphQL, and gRPC.
These all have their advantages and disadvantages, which will be laid out and
discussed. Obviously, there are many more technologies which allow declaring
contracts, but the ones presented here are three very popular ones which are
easy to use and have great communities around them. They will be illustrated
along the simple example of an API where one can query Pokémon by their ID.

### OpenAPI

[OpenAPI](https://www.openapis.org/) (formerly known as Swagger) is a very
wide-spread way of specifying REST and other HTTP APIs. It is easy to write
because the specification is just a JSON or a YAML file which defines what your
API looks like by following a clearly defined specification.

An HTTP endpoint definition in OpenAPI might look as follows:

```yaml
paths:
  /pokemon/{id}:
    get:
      summary: Returns a pokemon
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

OpenAPI itself doesn't come with any tools to generate the specification from
your implementation or vice versa. However, because it is such a popular format,
there are many tools that allow to parse your implementation code (and possibly
additional annotations) and generate a valid OpenAPI specification from it. A
great example of such a tool is [`springdoc-openapi`](https://springdoc.org/)
which takes Java classes with their properties, methods, and annotations and
automatically generates an OpenAPI specification from those. There are also
tools to do it the other way around. These take an existing OpenAPI spec and
generate boilerplate code from it for a compliant implementation. A popular
example of such a tool is
[`oapi-codegen`](https://github.com/deepmap/oapi-codegen) which creates Go code
from a valid specification.

Obviously, OpenAPI not being directly integrated into the implementation
frameworks has a great disadvantage: It does not enforce (e.g., at compile time)
that your implementation actually perfectly fulfills the specified contract.
However, you can achieve a similar outcome by adding a check for your code's
compliance to your automation pipeline, which prevents releases that diverge
from their contract in an unwanted manner.

At this point, it is noteworthy, that REST applications can include so-called
[HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) links. These are URLs included
in the response body to a request, which lead to further endpoints providing
actions for an element. If a client automatically follows those links, contracts
can rely on that and therefore drop some of the actual URLs and paths from their
specification. However, not too many applications in the wild reliably implement
HATEOAS links, and they have their caveats and shortcomings.

### GraphQL

[GraphQL](https://graphql.org/) calls itself "a query language for your API".
The technology is about defining a schema which strongly types your endpoint
methods and the objects they expect and return.

A simple GraphQL schema might look as follows:

```graphql
type Query {
  # Returns a pokemon
  pokemon(id: ID!): Pokemon
}

type Pokemon {
  id: ID!
  name: String!
}
```

It is not only much more concise than the above OpenAPI specification, but also
has great advantages because it is part of the GraphQL specification. Almost
every GraphQL endpoint exposes its schema automatically, which is a direct
product of the endpoints it actually exposes. This allows clients to query the
contract directly from the endpoint and therefore know that it is always
up-to-date. Tests can be run against that exposed schema, which would detect
breaking changes automatically and potentially prevent releasing such. These
conventions of how the endpoint exposes its documentation allow us to use
comprehensive client frameworks such as
[`apollo-client`](https://www.apollographql.com/)

With GraphQL, there are also frameworks that allow writing a schema first and
generating the respective boilerplate code from it. A popular tool for doing so
is [`gqlgen`](https://gqlgen.com/) in Go.

### gRPC

Another popular technology for declaring contracts is [gRPC](https://grpc.io/).
It is based on [Protocol Buffers](https://github.com/protocolbuffers/protobuf),
which is a way of specifying how to serialize structured data. The interface of
a protocol buffer is defined in a file that might look like this:

```protobuf
service PokemonService {
  // Returns a pokemon
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

One big difference of protocol buffers to the other mentioned technologies is
that the exchanged data is not plain text, but rather a binary format. This
makes them very performant but also harder to debug, which makes having a
clearly defined schema and API crucial. A compiler of such a Protocol Buffer
file is built into the tool chain and lets you generate boilerplate code from
the specification and enforce compliance with the defined contract.

## Conclusion

There are many ways of writing contracts for your service APIs. Some points to
look for in a good contract are:

- It is human-readable
- It is machine-readable
- It is declarative and comprehensive
- It is tracked via version control
- It is programming language-agnostic
- It enforces that the implementation fulfills the contract
- Breaking changes to the contract are detected and properly communicated to
  potential consumers

This makes the above technologies excellent choices, and all of them are a great
step up from simply writing your contract somewhere in a wiki.
