---
title: Observables mit Angular und Feathers
author: Lena Fuhrimann
pubDate: 2016-03-14
tags: ["angular", "feathers", "rxjs", "websockets", "observables"]
description:
  "Lerne, wie du Angular-Services baust, die Feathers-WebSocket-APIs über
  RxJS-Observables konsumieren – für reaktive Datenströme in Echtzeit."
image: ../../../assets/blog/observe.jpg
---

[Feathers](http://feathersjs.com) ist ein modernes API-Framework für Node.js. Es
stellt seine Backend-Services als REST-API oder als WebSocket-API bereit. Um die
bereitgestellten WebSockets aus einer Angular-App zu konsumieren, ist es
sinnvoll, Angular-Services zu bauen, welche die jeweiligen Feathers-Services so
abstrahieren, dass unsere Angular-Komponenten sie einfach nutzen können. Dieses
Tutorial geht davon aus, dass du für deine App die
[Angular CLI](https://github.com/angular/angular-cli) verwendest.

In meinem Beispiel nutze ich einen einfachen To-do-Service und eine Komponente,
die diese To-dos auflistet.

## Bibliotheken einbinden

Als Erstes müssen wir die beiden Bibliotheken `socket.io-client` und
`feathers-client` zu unserem Projekt hinzufügen. Das geht bequem über npm:

```shell
$ npm install --save socket.io-client feathers-client
```

Die TypeScript-Typings von `feathers-client` sind bereits in der Bibliothek
enthalten. Diejenigen für `socket.io-client` müssen wir aber manuell hinzufügen:

```shell
$ npm install --save @types/socket.io-client
```

## Basis-API-Service erstellen

Danach erstellen wir eine abstrakte Klasse als Basis, welche die grundlegenden
Eigenschaften eines Backend-Service enthält:

```typescript
// src/app/api.service.ts

export abstract class ApiService {
  private _url: string = "https://my-todos-api.com";

  get url(): string {
    return this._url;
  }
}
```

## Datenmodell erstellen

Als Nächstes erstellen wir eine Klasse, die das Datenmodell unserer To-dos
abbildet:

```typescript
// src/app/todos/todo.ts

export class Todo {
  title: string;
}
```

## Den eigentlichen Service erstellen

Dann erstellen wir den eigentlichen Service, der sich mit dem Feathers-Backend
verbindet und es als Service in Angular bereitstellt. Er erbt vom Basis-Service,
den wir oben erstellt haben. Der Feathers-Service wird als RxJS-`Observable`
bereitgestellt, das unsere Komponenten dann abonnieren können:

```typescript
// src/app/todos/todo.service.ts

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import * as io from "socket.io-client";
import feathers from "feathers-client";

import { ApiService } from "../api.service";
import { Todo } from "./todo";

@Injectable()
export class TodoService extends APIService {
  public todos$: Observable<Todo[]>;
  private todosObserver: Observer<Todo[]>;
  private feathersService: any;
  private dataStore: {
    todos: Todo[];
  };

  constructor() {
    super();

    const socket = io(this.url);
    const client = feathers().configure(feathers.socketio(socket));
    this.feathersService = client.service("todo");

    this.feathersService.on("created", (todo) => this.onCreated(todo));
    this.feathersService.on("updated", (todo) => this.onUpdated(todo));
    this.feathersService.on("removed", (todo) => this.onRemoved(todo));

    this.todos$ = new Observable((observer) => (this.todosObserver = observer));

    this.dataStore = { todos: [] };
  }

  public find() {
    this.feathersService.find((err, todos: Todo[]) => {
      if (err) return console.error(err);

      this.dataStore.todos = todos;
      this.todosObserver.next(this.dataStore.todos);
    });
  }

  private getIndex(id: string): number {
    let foundIndex = -1;

    for (let i = 0; i < this.dataStore.todos.length; i++) {
      if (this.dataStore.todos[i].id === id) {
        foundIndex = i;
      }
    }

    return foundIndex;
  }

  private onCreated(todo: Todo) {
    this.dataStore.todos.push(todo);

    this.todosObserver.next(this.dataStore.todos);
  }

  private onUpdated(todo: Todo) {
    const index = this.getIndex(todo.id);

    this.dataStore.todos[index] = todo;

    this.todosObserver.next(this.dataStore.todos);
  }

  private onRemoved(todo) {
    const index = this.getIndex(todo.id);

    this.dataStore.todos.splice(index, 1);

    this.todosObserver.next(this.dataStore.todos);
  }
}
```

## Aus einer Komponente konsumieren

Jetzt ist unser Angular-Service bereit. Um das `Observable`, das er
bereitstellt, in einer Angular-Komponente zu nutzen, folgst du dieser Struktur:

```typescript
// todos/todos.component.ts

import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { TodoService } from "./todo.service";
import { Todo } from "./todo";

@Component({
  selector: "app-todos",
  providers: [TodoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./todos.component.html",
})
export class TodosComponent implements OnDestroy, OnInit {
  private todos: Todo[] = [];
  private subscription: Subscription;

  constructor(
    private todoService: TodoService,
    private ref: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.subscription = this.todoService.todos$.subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
        this.ref.markForCheck();
      },
      (err) => {
        console.error(err);
      },
    );
    this.todoService.find();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

Unsere Komponente `TodosComponent` hat jetzt eine Property `todos`, welche die
To-dos aus dem entsprechenden Feathers-Service enthält und in der App verwendet
werden kann. Sie aktualisiert das UI live, sobald in der Feathers-API ein To-do
entfernt oder hinzugefügt wird.
