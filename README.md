# angular-sandbox

## Setup

Install the Angular CLI to create projects, generate application etc.

```bash
npm install -g @angular/cli@latest
```

Create a new project which is called e.g. my-first-app.

```bash
ng new my-first-app
```

Install bootstrap for project you created instead of globally by simply
entering the following command.

```bash
npm install --save bootstrap@3
```

## Basics

### How is Angular triggered to run over the body of `index.html` file?

`ng serve` (re)builds the project, it creates JavaScript script bundles and
automatically add the imports in the `index.html` file. In the final file -
when inspecting `index.html` with the browser tool - these script imports are
present and contains our own code too. The first code which gets executed is
`main.ts` which then passes `AppModule`. `AppModule` tells Angular that there
is an `AppComponent` when it tries to start itself. Angular then analyses the
`AppComponent` with its *selector*, *templateUrl* and *styleUrls and uses it in
`index.html`. 

### Components

`AppComponent` is special component. it serves as a root component Angular
bootstraps with. Other components will be added in `AppComponent`.

### Role of AppModule and Component

Angular uses Components to build web pages and uses modules e.g. `AppModule`
to bundle different pieces e.g. Components of an app into packages.

#### AppModule

`@NgModule`: `@NgModule` is a decorator imported from '@angular/core'. In
there, there are four properties (`declarations`, `imports`, `providers` and
`bootstrap`). `bootstrap` property will only contain `AppComponent`. To
register a new Component e.g. `ServerComponent`, it needs to be added to the
`declarations` property as shown below, because by default Angular will not
scan all the files. `ServerComponent` needs also to be imported; the *.ts*
extension is not needed, `WebPack` adds it. *imports* property allows to add
new modules to `AppModule`. To make `AppModule` leaner, separate modules can be
created to outsource some stuff into other modules.

``` typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Component

A Component e.g. `ServersComponent` can be created manually or by using the
following command. This command creates the folder `servers` with respective
files. The newly created Component will also be automatically added to
`AppModule`.

```bash
ng g c servers
```

`@Component`: `@Component` is a decorator, which has *selector*,
*templateUrl/template* and *styleUrls/styles*.  The *templateUrl* references to
an external .html file, whereas the *styleUrls* to an external .css file. The
alternatives are *template* and *styles* properties, which serves the same
purpose with the notion you can do it inline e.g in `AppComponent`. The
*selector* instructs Angular to instantiate this component any time the tag
<app-servers> appears in a template as depicted below.

``` typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

}
```

## What is databinding?

Databinding is the communication the communication between the TypeScript code
(Business Logic) and Template (HTML) what the user sees. There are different
ways of communication e.g.:

- One-way-binding: output data from TypeScript code to Template (HTML), can be
  done with *String Interpolation* and *Property binding*. 
- One-way-binding: user clicks a button on a Template (HTML), we want to
  trigger something in our TypeScript code. We can react to user events with
event binding.
- Two-way-binding: Here, a user is able to react to events and output something
  at the same time.

### String Interpolation 

Example of string interpolation in `server.component.html`:

```html
<p>{{ 'Server' }} with ID {{ serverId}} {{ getServerStatus() }}</p>
```

The variable and the method in the curly brackets are defined in
`server.component.ts`:

```typescript
...
export class ServerComponent {
    serverId: number = 10;
    serverStatus: string = 'offline';

    getServerStatus() {
        return this.serverStatus;
    }
}
```

### Property binding 

Property binding in Angular helps you set values for properties of HTML
elements or directives, such as toggle button features.

To assign a value to a target property e.g. `disabled` square brackets are
required as shown below in `servers.component.html`:

```html
<p>Servers work!</p>
<button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>
<app-server />
<app-server />
```

`allowNewServer` is defined in `servers.component.ts`:

```typescript
...
export class ServersComponent {
  allowNewServer = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

}
```

### Event binding

Bind to an event with an event binding syntax; the syntax consists of a target
event name within parentheses as shown below:

```typescript
<button (click)="onSave()">Save</button>
```

The event binding listens for the button's click events and calls the
component's `onSave()` method whenever a click occurs.

#### Handling events

A common way to handle events is to pass the event object, `$event`, to the
method handling the event `onUpdateServerName($event)`:

```html
<p>Servers work!</p>
<label>Server name</label>
<input
    type="text"
    class="form-control"
    (input)="onUpdateServerName($event)"
/>
<p>{{ serverName }}</p>
```

The method is declared in the corresponding component:

```typescript
onUpdateServerName(event: Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
}
```

Notice that the casting is required to retrieve the value.

### Two-Way-Binding

`FormsModule` is required for Two-Way-Binding:

```typescript
...
import { FormsModule } from '@angular/forms';
...

@NgModule({
  ...
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Below, the *directive* `ngModel` is used for Two-Way-Binding. With
Two-Way-Binding, we combine event and property binding, hence `[(ngModel)]`. We
can then set `[(ngModel)]` equal to property in the Typescript code inside the
component. With Two-Way-Binding, the `serverName` will be updated when the
input event is triggered. The value of the input element will also be updated
when the `serverName` changes somewhere else:

```html
<!-- One-Way-Binding -->
<input
    type="text"
    class="form-control"
    (input)="onUpdateServerName($event)"
/>
<!-- Two-Way-Binding -->
<input
    type="text"
    class="form-control"
    [(ngModel)]="serverName"
/>
```

## Directives

Directives are Instructions in the DOM. Components are kind of directives with
templates. By placing  e.g. the selector of a component, we are instructing
angular to add the the content of the template and the business logic, where
the selector is used. You can also create custom directives or use the built-in directives such as `ngIf`, `ngClass`.

### `ngIf` directive

This directive works as an *if-statement*. The star in `*ngIf` indicates that
it is a structural directive which changes the structure of the DOM. The
example below adds the paragraph to the DOM or removes it from the DOM.

```html
...
<p *ngIf="isServerCreated">{{ serverCreationStatus }}</p>
...
```

### `ngStyle` directive

Unlike structural directives, attribute directives e.g. `ngStyle` do not add or
remove elements. They only change the element they were placed in. `ngStyle`
can be used as shown in the following example:

```html
<p [ngStyle]="{backgroundColor: getServerStatusColor()}">{{ 'Server' }} with ID {{ serverId}} {{ getServerStatus() }}</p>
```

For `ngStyle` to work, property binding must be used. The square brackets
indicate that we want to bind the directive `ngStyle` to some property which
happens to also be `ngStyle`.

### `ngClass` directive

`ngClass` works only with property binding, which takes a JavaScript object.
The keys are the CSS class names e.g. `online` and the value are the conditions
determining whether the class should be attached or not.

```html
<p [ngStyle]="{backgroundColor: getServerStatusColor()}">{{ 'Server' }} with ID {{ serverId}} {{ getServerStatus() }}</p>
```

```typescript
...
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white;
        }
    `]
})
export class ServerComponent {
...
}
```

### `ngFor` directive

`ngFor` is a structural directive, which loops through all the elements of the
array `servers` and assign the individual element to the dynamic variable
`server`. In this example multiple *app servers* are created as the `servers` array grows.

```html
<button 
    ...
    (click)="onCreateServer()">Add Server</button>
...
<app-server *ngFor="let server of servers"/>
```

```typescript
...
export class ServersComponent {
  ...
  serverName = "Initial server name";
  isServerCreated = false;
  servers = ['Testserver', 'Testserver 2'];
  ...
  onCreateServer() {
    this.isServerCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Server ${this.serverName} was created!`
  }
  ...
}
```

## Custom Bindings

### Binding to Custom Properties

By default all properties of components are only accessible inside these
components, therefore not bindable from outside. For a parent component e.g.
`AppComponent` to bind to a custom property e.g. `element` of a
`ServerElementComponent`, the decorator `@Input()` needs to be added to the
specific property. 

#### Parent Component: `AppComponent`

```typescript
...
export class AppComponent {
  serverElements = [
    {
      type: 'server',
      name: 'Testserver',
      content: 'Just a test!'
    }
  ];
}

```

```html
<div class="container">
  ...
    <div class="col-xs-12">
      <app-server-element 
        *ngFor="let serverElement of serverElements" 
        [element]="serverElement"></app-server-element>
    </div>
 ...
</div>

```

#### Child Component: `ServerElementComponent`

```typescript
import { ...,  Input} from '@angular/core';
...
export class ServerElementComponent implements OnInit {
  @Input() element: {
    type: string,
    name: string,
    content: string
  };
  ...
}
``` 

```html
<div class="panel panel-default">
    <div class="panel-heading">{{ element.name }}</div>
    <div class="panel-body">
        <p>
            <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
            <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
        </p>
    </div>
</div>
```

### Binding to Custom Events

What happens when we have `CockpitComponent` and something changes in there and
we want to inform our parent `AppComponent`? In the example below, we want to
inform the `AppComponent`, that a new server or a blueprint was created by the `CockpitComponent`. 

#### Parent Component: `AppComponent`

The properties `serverCreated` and `blueprintCreated` call the respective
functions of `onServerAdded($event)` and `onBlueprintAdded($event)`, when an event was emitted from `CockpitComponent`. 

```typescript
...
export class AppComponent {
  serverElements = [{...}];

  onServerAdded(serverData : {
    serverName: string, 
    serverContent: string
  }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData : {
    serverName: string, 
    serverContent: string
  }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
}
```

```html
<div class="container">
  <app-cockpit 
    (serverCreated)="onServerAdded($event)"
    (blueprintCreated)="onBlueprintAdded($event)"></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element 
        *ngFor="let serverElement of serverElements" 
        [element]="serverElement"></app-server-element>
    </div>
  </div>
</div>
```

#### Child Component: `CockpitComponent`

In `CockpitComponent`, we define two properties `serverCreated` and
`blueprintCreated` which can emit events. The functions `onAddServer()` and
`onAddBlueprint()` "emit" the events. To make the properties listenable from
outside, `@Output()` decoration needs to be prepended to `serverCreated` and
`blueprintCreated`. 

```typescript
import { EventEmitter, Output, ... } from '@angular/core';
...
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerName = '';
  newServerContent = '';
  ...
  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }
}
```

```html
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" [(ngModel)]="newServerName">
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button
      class="btn btn-primary"
      (click)="onAddServer()">Add Server</button>
    <button
      class="btn btn-primary"
      (click)="onAddBlueprint()">Add Server Blueprint</button>
  </div>
</div>
```

## View encapsulation

In Angular, a component's styles can be encapsulated within the component's
host element so that they don't affect the rest of the application. The
`@Component` decorator provides the `encapsulation` option which can be used to
control how the encapsulation is applied on a per component basis. The default
is `ViewEncapsulation.Emulated`; `ViewEncapsulation.ShadowDom` and
`ViewEncapsulation.None` are the other available options.

```typescript
import { ..., ViewEncapsulation} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit {
  ...
}
```

## Local References

Sometimes instead of using Two-Way-Binding, local references e.g.
`#serverNameInput` can be used. The local reference can then be passed e.g. to
the function `onAddServer(...)`.

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <!-- <input type="text" class="form-control" [(ngModel)]="newServerName"> -->
    <input type="text" class="form-control" #serverNameInput>
    ...
    <button
      class="btn btn-primary"
      (click)="onAddServer(serverNameInput)">Add Server</button>
    ...
</div>
```

```typescript
...
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  ...
  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverNameInput.value,
      ...
    });
  }
  ...
```

