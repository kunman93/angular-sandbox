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

```typescript
...
<p *ngIf="isServerCreated">{{ serverCreationStatus }}</p>
...
```

