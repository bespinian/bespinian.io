---
title: Observables With Angular and Feathers
author: Lena Fuhrimann
pubDate: 2016-03-14
tags: ["angular", "feathers", "rxjs", "websockets", "observables"]
description:
  "Learn how to create Angular services that consume Feathers WebSocket APIs
  using RxJS Observables for real-time, reactive data streams."
image: ../../assets/blog/observe.jpg
---

[Feathers](http://feathersjs.com) is a modern API framework for Node.js. It
exposes its backend services as a REST API or as a WebSocket API. To consume the
exposed WebSockets from an Angular app, it makes sense to create Angular
services to abstract the respective Feathers services in a way that makes it
easy for our Angular components to consume them. This tutorial is assuming that
you are using the [Angular CLI](https://github.com/angular/angular-cli) for your
app.

In my example, I'll use a simple to-do service and a component that lists those
to-dos.

## Import libraries

As a first step, we'll need to add the two libraries `socket.io-client` and
`feathers-client` to our project. This can easily be done using npm:

```shell
$ npm install --save socket.io-client feathers-client
```

The TypeScript typings of `feathers-client` are already included in the library.
However, we need to include the ones for `socket.io-client` manually:

```shell
$ npm install --save @types/socket.io-client
```

## Create base API service

Then we create an abstract class to extend upon, which contains the basic
properties of a backend service:

```typescript
// src/app/api.service.ts

export abstract class ApiService {
  private _url: string = "https://my-todos-api.com";

  get url(): string {
    return this._url;
  }
}
```

## Create data model

Next, we create a class to represent our to-do's data model:

```typescript
// src/app/todos/todo.ts

export class Todo {
  title: string;
}
```

## Create actual service

Then we create the actual service which connects to the Feathers backend and
exposes it as a service in Angular. It inherits from the base service we've
created above. The Feathers service is exposed as an RxJS `Obersvable` which our
components can then subscribe to:

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

## Consume from component

Now, our Angular service is ready. To use the `Observable` it exposes in an
Angular component, follow the structure below:

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

Our component `TodosComponent` now has a property `todos` which contains the
to-dos it gets from the respective Feathers service and which can be used in the
app. It live-updates the UI every time a to-do in the Feathers API is removed or
added.
