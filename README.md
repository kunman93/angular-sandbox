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

### `ngSwitch` directive

The `[ngSwitch]` directive on a container specifies an expression to match
against. The expressions to match are provided by ngSwitchCase directives on
views within the container. Every view that matches is rendered. If there are no
matches, a view with the `ngSwitchDefault` directive is rendered.

```html
<div [ngSwitch]="value">
    <p *ngSwitchCase="5">Value is 5</p>
    <p *ngSwitchCase="10">Value is 10</p>
    <p *ngSwitchCase="15">Value is 15</p>
    <p *ngSwitchDefault>Value is default</p>
</div>
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

#### `CockpitComponent`

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

## `@ViewChild`

Sometimes we might need the local reference before calling a function.
Previously, we used a local reference which was then passed to a function.
There is another way to access local reference, namely directly from the
TypeScript code of the component using `@ViewChild` decorator.

#### `CockpitComponent`

```typescript
import { ElementRef, ViewChild } from '@angular/core';
...
export class CockpitComponent implements OnInit {
  ...
  @ViewChild('serverContentInput') serverContentInput: ElementRef
  ...
  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      ...
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
  ...
}
```

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <!-- <input type="text" class="form-control" [(ngModel)]="newServerContent"> -->
    <input type="text" class="form-control" #serverContentInput>
    <br>
    <button
      class="btn btn-primary"
      (click)="onAddServer(serverNameInput)">Add Server</button>
      ...
  </div>
</div>
```

## Projecting Content into Components with ng-content 

Sometimes you have HTML code from e.g. `AppComponent` which you want to pass
into a component e.g. `ServerElementComponent`. By default, everything between
the component's opening and closing tag is lost. To prevent this the special
directive `<ng-content>` can be used. This element specifies where to project
content inside a component template. It serves as a hook to mark the place for
Angular, where it should add any content it finds between the opening and
closing tag. 

#### `ServerElementComponent`

```html
<div class="panel panel-default">
    <div class="panel-heading">{{ element.name }}</div>
    <div class="panel-body">
       <ng-content></ng-content>
    </div>
</div>
```

#### `AppComponent`

```html
<app-server-element 
    *ngFor="let serverElement of serverElements" 
    [element]="serverElement">
        <p>
            <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
            <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
        </p>
</app-server-element>
```

## `@ContentChild`

A nice little addition to `@ViewChild` is `@ContentChild`. We can for example
place a local reference `#contentParagraph` on the `<p>` element in the
template of `AppComponent`. We then use it in our `ServerElementComponent`,
which is where the content will end up (content projection). To access the
content from `ServerElement`, `@ContentChild` can be used as shown in the
following example.

#### `AppComponent`

```html
<app-server-element 
    *ngFor="let serverElement of serverElements" 
    [element]="serverElement">
    <p #contentParagraph>
        <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
        <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
    </p>
</app-server-element>
```

#### `ServerElementComponent`

```typescript
import { ..., OnInit, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

export class ServerElementComponent implements OnInit, AfterContentInit {
  ...
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;
  ...
  ngOnInit(): void {
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentInit() {
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }
}
```

```html
<div class="panel panel-default">
    ...
    <div class="panel-body">
       <ng-content></ng-content>
    </div>
</div>
```

## Component lifecycle and lifecycle hooks

After your application instantiates a component or directive by calling its
constructor, Angular calls the hook methods e.g. ngOnInit() you have
implemented at the appropriate point in the lifecycle of that instance. To
learn more see [Lifecycle Hooks](https://angular.io/guide/lifecycle-hooks).

## Attribute Directive using Renderer

To create a custom attribute directive `HighlightDirective`, the `@Directive`
decorator needs to be added to the class with its selector e.g.
`[appHighlight]`, since directives are used in templates. For any DOM
manipulation, the Renderer should be used. Accessing and setting the properties
as shown in the commented out variant can lead to errors, since Angular is able
render a template without a DOM, causing the properties to not be available.

```typescript
import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        // this.elementRef.nativeElement.style.backgroundColor = 'green';
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color', 'green'
        );
    }
}
```

The newly created attribute directive needs to be added to `AppModule`.

```typescript
...
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective
  ],
  ...
  bootstrap: [AppComponent]
})
export class AppModule { }
```

To use the `HighlightDirective`, add the directive as an attribute to the `<p>`
element in the HTML template.

```html
 <div class="container">
  <div class="row">
    <div class="col-xs-12">
      ...
      <p appHighlight>Style me with attribute directive!</p>
    </div>
  </div>
</div>
```

## HostListener with Renderer

`@HostListener` decorator can be used, if you want to react to some events,
e.g. mouse events, which changes e.g. the background color. The previous directive can therefore be modified as follows: 

```typescript
import { 
    Directive, 
    ElementRef, 
    HostListener, 
    OnInit, 
    Renderer2 
} from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color', 'green'
        );
    }

    @HostListener('mouseenter') mouseover(evenData: Event){
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color', 'green'
        );
    }

    @HostListener('mouseleave') mouseleave(evenData: Event){
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color', 'transparent'
        );
    }
}
```

## HostListener with HostBinding

With `@HostBinding`, we don't need to use the Renderer. There is nothing wrong
with the Renderer, but there is an easier way of simply changing the background
color as shown below.

```typescript
import { 
    Directive, 
    ElementRef, 
    HostBinding, 
    HostListener, 
    OnInit, 
    Renderer2 
} from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    @HostBinding('style.backgroundColor') backgroundColor: string = 'green';

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() { }

    @HostListener('mouseenter') mouseover(evenData: Event){
        this.backgroundColor = 'green';
    }

    @HostListener('mouseleave') mouseleave(evenData: Event){
        this.backgroundColor = 'transparent';
    }
}
```

## Binding to Directive Properties

In the previous examples the `backgroundColor` was hardcoded. To dynamically
set the color value, custom property binding can be applied. We therefore add
two fields `defaultColor` and `higlightColor`. How does Angular know if we want
to bind to a property of a paragraph - which of course doesn't have a
`defaultColor` or to a property of our own directive. Angular figures that out
on its own. Angular checks at first the own directives before checking the
native properties of elements.

```typescript
import { 
    Directive, 
    ElementRef, 
    HostBinding, 
    HostListener, 
    Input, 
    OnInit, 
    Renderer2 
} from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    @Input() defaultColor: string;
    @Input() highlightColor: string;
    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() { 
        this.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') mouseover(evenData: Event){
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseleave(evenData: Event){
        this.backgroundColor = this.defaultColor;
    }
}
```

The template using `HighlightDirective` can then set the properties as follows:

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      ...
      <p appHighlight 
      [defaultColor]="'yellow'" 
      [highlightColor]="'green'">Style me with attribute directive!</p>
    </div>
  </div>
</div>
```

## Building a Structural Directive

Below is a custom Structural Directive `*appUnless` which does the opposite of
`*ngIf`.  

```typescript
import { 
    Directive, 
    Input, 
    TemplateRef, 
    ViewContainerRef 
 } from "@angular/core";

@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective {
    @Input() set appUnless(condition: boolean) {
        if (!condition) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainerRef.clear();
        }
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) { }
}
```

The custom Structural Directive can then be used in the template as follows.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
       ...
      <ul class="list-group">
        <div *appUnless="onlyOdd">
          <li
            class="list-group-item"
            *ngFor="let evenNumber of evenNumbers">
            {{ evenNumber }}
          </li>
        </div>
      </ul>
      ...
    </div>
  </div>
</div>
```

## Services and DI via constructor injection

Services can make the code leaner, more centralized and easier to maintain;
complex output input chain where events and properties are passed to get data
from component A to component B can be avoided. Services e.g. `LoggingService`
can be created as normal classes. But for newer Angular versions, it is
recommended to use the `@Injectable()` decorator.

```typescript
@Injectable()
export class LoggingService {
    logStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status);
    }
}
```

A component e.g. `NewAccountComponent` using the service, needs to declare a
provider for the service - in this case, `LoggingService`. The service then
gets injected via constructor injection. Note, that there is a DI hierarchy.
For example, if there exists two components `AccountComponent` and
`NewAccountComponent` where the providers are declared to use a certain
service, then different instances of the same service will be injected for both
components. To use the same instance of the service for all components, declare
the providers array in the parent component e.g. `AppComponent` - the highest
possible level is in the `AppModule` - and remove the service from the providers
array of each child component, in this case from `NewAccountComponent` and
`AccountComponent`.

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  ...
  providers: [LoggingService]
})
export class NewAccountComponent {
  ...

  constructor(private loggingService: LoggingService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    ...
    this.loggingService.logStatusChange(accountStatus)
  }
}
```

### Injecting Services into Services

If you want to inject services into services, make sure to provide the service on the `AppModule` level and to add `@Injectable` to the service where you want to inject it in.

### Using Services for Cross-Component Communication

The example below illustrates how the `AccounstsService` can be used to
establish the Cross-Component Communication between `AccountComponent` and
`NewAccountComponent`.

```typescript
import { EventEmitter } from "@angular/core";

export class AccountsService {
  ...
  statusUpdatede = new EventEmitter<string>();
  ...
}
```

```typescript
...
import { AccountsService } from '../services/accounts.service';

...
export class AccountComponent {
  ...

  constructor(
    ...
    private accountsService: AccountsService
  ) { }

  onSetStatus(status: string) {
    ...
    this.accountsService.statusUpdatede.emit(status)
  }
}
```

```typescript
...
import { AccountsService } from '../services/accounts.service';

...
export class NewAccountComponent {

  constructor(
    ...
    private accountsService: AccountsService
  ) { 
    this.accountsService.statusUpdatede.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  ...
}
```

## Routing

### Setting up and Loading Routes

To define the routes, an application has, the constant `appRoutes` should be
declared. The constant should hold an array of multiple routes. The `path` e.g.
`users` refers to the value, entered in the URL after the domain e.g.
`http://localhost:4200/`. When a path is reached, an action e.g loading a
component, should also be declared; the desired action is assigned to
`component` property. The registration of the routes occurs by passing the
`appRoutes` to `RouterModule.forRoot(appRoutes)`

```typescript
...
import { NgModule } from '@angular/core';
...
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'servers', component: ServersComponent },
];

@NgModule({
  ...
  imports: [
    ...
    RouterModule.forRoot(appRoutes)
  ],
  ...
})
export class AppModule { }
```

To render the currently selected route in `app.component.html`,
`<router-outlet>` is used.

```html
 <div class="container">
  ...
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

### Navigating with Router Links

We can set the navigation by assigning a `path` e.g. `/users` to `href` (see
`app.component.html` below). By doing this, the routes are being loaded
correctly, however the app is being reloaded/refreshed each time we click on a
link. This means that the app is being restarted every time we click on a
navigation; our whole application state will be lost.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a href="/">Home</a></li>
        <li role="presentation"><a href="/servers">Servers</a></li>
        <li role="presentation"><a href="/users">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

The correct way to navigate is by using the `routerLink` directive Angular
provides; the navigation is handled differently.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a routerLink="/">Home</a></li>
        <li role="presentation"><a [routerLink]="['/servers']">Servers</a></li>
        <li role="presentation"><a [routerLink]="['/users']">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

### Styling Active Router Links

`RouterLinkActive` tracks whether the linked route of an element is currently
active, and allows you to specify one or more CSS classes to add to the element
when the linked route is active. By default it marks an element as active and
adds the CSS class if it contains the path you are on or if this link is part
of the path. That's why the *Home* nav tab is always active, when for example
*Servers* or *Users* nav tab is selected. To fix this, use
[routerLinkActiveOptions]="{exact: true}".

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a [routerLink]="['/']">Home</a></li>
        <li role="presentation" routerLinkActive="active"><a [routerLink]="['/servers']">Servers</a></li>
        <li role="presentation" routerLinkActive="active"><a [routerLink]="['/users']">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

### Navigating Programmatically using absolute or relative paths

In `home.component.html` we can navigate to `/servers` when clicking on the
button.

```html
...
<button class="btn btn-primary" (click)="onLoadServers()">Load Servers</button>
```

In `HomeComponent`, the router is injected and used in `onLoadServers()`.

```typescript
import { ..., OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

...
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onLoadServers() {
    // complex calculations

    // variant 1: navigating using the absolute path "/servers"
    // this.router.navigate(['/servers'])

    // variant 2: navigating using the  path "servers" relative to "this.route"
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
```

### Passing parameter to routes and fetching route parameters reactively

In `appRoutes` constant in AppModule, we define a new route with parameters.

```typescript
...
import { NgModule } from '@angular/core';

...
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  ...
  { path: 'users/:id/:name', component: UserComponent },
  ...
];

@NgModule({
  ...
  imports: [
    ...
    RouterModule.forRoot(appRoutes)
  ],
  ...
})
export class AppModule { }
```

In `UserComponent`, we can fetch the route parameters reactively with
`ActivatedRoute`. Set for example the path manually to `users/3/Max`.

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //  this.route.snapshot.params will only be excuted for the first initialization
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    }
    // to react to subsequent changes happening in this component, subscribe to route params and set the users id and name.
    this.route.params
      .subscribe((params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      })
  }
}
```

The corresponding template `user.component.html` looks as follows. If `Load
Anna (10)` link is clicked, `this.route.params.subscribe` declared above in
`ngOnInit` will be triggered and the string interpolation values will be
updated to id = 10 and name = 'Anna'. If the subscribe block wasn't there and
the link would have been clicked, the id = 3 and name = 'Max' would have still
remained, even though the path has changed to `/users/10/Anna`.

```html
<p>User with ID {{user.id}} loaded.</p>
<p>User name is {{user.name}}</p>
<hr>
<a [routerLink]="['/users', 10, 'Anna']">Load Anna (10)</a>
```

### Passing Query Parameters and Fragments

In AppModule, define a new route.

```typescript
...
import { NgModule } from '@angular/core';
...

import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  ...
  { path: 'servers/:id/edit', component: EditServerComponent },
];

@NgModule({
  ...
  imports: [
    ...
    RouterModule.forRoot(appRoutes)
  ],
  ...
})
export class AppModule { }
```

There are two ways to pass query parameters and fragments as shown below.

```html
...
<!-- passing query parameter and fragments programmatically -->
<button class="btn btn-primary" (click)="onLoadServer(1)">Load Server 1</button>
<!-- passing query parameter and fragments using RouterLink -->
<button 
    class="btn btn-primary" 
    [routerLink]="['/servers', 1, 'edit']"
    [queryParams]="{allowEdit: true}"
    fragment="loading">Load Server 1</button>
```

```typescript
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    ...
  ) { }

  ngOnInit() {
  }

  ...
  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'],
      {
        queryParams: { allowEdit: true },
        fragment: 'loading'
      }
    )
  }
}
```

The query parameter can then be retrieved by using `ActivatedRoute` inside the
component e.g.  EditServerComponent, which is loaded .

```typescript
import { OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

export class EditServerComponent implements OnInit {
  ...

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    var queryParameters = undefined;
    var fragment = undefined;
    this.route.queryParams.subscribe((queryParams) => queryParameters = queryParams);
    this.route.fragment.subscribe((f) => fragment = f);
    console.log(queryParameters);
    console.log(fragment);
    ...
  }

  ...
}
```

### Setting up Child (Nested) Routes

In `AppModule`, where we defined the routes, we can see some duplication. We
can fix this by defining parent routes e.g. `servers` and child routes e.g
`:id`.

```typescript
...
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  },
];
...
```

For the app to work we need to replace `<app-user>` and `<app-server>` with
`<router-outlet>` in the templates `users.component.html` and
`servers.component.html`, because the child routes need a separate outlet.
Below you can find the applied change for the template `user.component.html`. 

```html
<div class="row">
  <div class="col-xs-12 col-sm-4">
    <div class="list-group">
      <a
        [routerLink]="['/users', user.id, user.name]"
        href="#"
        class="list-group-item"
        *ngFor="let user of users">
        {{ user.name }}
      </a>
    </div>
  </div>
  <div class="col-xs-12 col-sm-4">
    <!-- <app-user></app-user> -->
    <router-outlet></router-outlet>
  </div>
</div>
```

### Redirecting and Wildcard Routes

In `appRoutes` in `app.module.ts` we can define a redirect to `/not-found` if
any invalid route is entered. Make sure that the generic route `**` is the last
one in the array of routes.

```typescript
...
const appRoutes: Routes = [
  ...
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'}
];
...
```

### Outsourcing the Route Configuration

Usually, the routing configuration is not done in `AppModule`, instead in
`AppRoutingModule`. `AppModule` then imports the `AppRoutingModule`.

```typescript
...
import { NgModule } from '@angular/core';
...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    AppRoutingModule
  ],
  ...
})
export class AppModule { }

```

There is no need to add `declarations` here, because these components are
already declared in `AppModule`. Make sure to configure the `RouterModule` in
`imports` with `RouterModule.forRoot(appRoutes)`, in `exports` we export the
configured RouterModule.

```tyescript
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
...

const appRoutes: Routes = [...];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Protecting Routes with canActivate Guard

To protect routes with `canActivate` Guard, we need to define an
`AuthGuardService` which implements the `canActivate` interface. In this
method, we then call `authService.isAuthenticated()`. The `authService` is
injected through constructor injection. The `@Injectable()` decorator is
declared, so that the `authService` within the `authGuardService` gets
injected.

```typescript
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService
            .isAuthenticated()
            .then((isAuthenticated: boolean) => {
                if (isAuthenticated) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
    }
}
```

In `AuthService`, we define simple methods which "simulate" an authentication
service.

```typescript
export class AuthService {
    isLoggedIn = false;

    isAuthenticated() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.isLoggedIn),
                    800
                });
            }
        );
    }

    login() {
        this.isLoggedIn = true;
    }

    logout () {
        this.isLoggedIn = false;
    }
}
```

The `login` and `logout` methods  are used in `HomeComponent`.

```typescript
import { ..., OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

...
export class HomeComponent implements OnInit {

  constructor(
    ...
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  ...
}
```

```html
...
<button class="btn btn-default" (click)="onLogin()">Login</button>
<button class="btn btn-default" (click)="onLogout()">Logout</button>
...
```

In `AppRoutingModule`, the `canActivate` Guard needs to be set for the route
which needs to be protected e.g. `/servers`.

```typescript
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
...
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
...
import { AuthGuardService } from "./auth-guard.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    ...
    {
        path: 'servers', canActivate: [AuthGuardService], component: ServersComponent, children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent }
        ]
    },
    ...
];

...
export class AppRoutingModule { }
```

For Angular to be able to inject the two newly created services, they need to
be declared in the `providers`.

```typescript
...
import { NgModule } from '@angular/core';
...
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';


@NgModule({
  ...
  providers: [ServersService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Protecting Child (Nested) Routes with canActivateChild

The route protection above protects the parent route `/servers`. Which means
that we get redirected to `/`, in case we are not authenticated (see the
implementation of `canActivate` above). But sometimes we want to only protect
the child routes. This can be done by using `canActivateChild`.

```typescript
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService
            .isAuthenticated()
            .then((isAuthenticated: boolean) => {
                if (isAuthenticated) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
```

In `AppRoutingModule`, we can use `canActivateChild` instead of `canActivate`.

```typescript
...
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
...
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
...
import { AuthGuardService } from "./auth-guard.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    ...
    {
        path: 'servers', canActivateChild: [AuthGuardService], component: ServersComponent, children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent }
        ]
    },
    ...
];

...
export class AppRoutingModule { }
```


### Controlling Navigation with canDeactivate

If a user is e.g. editing `serverName` or `serverStatus` on
`EditServerComponent` and accidentally clicks "back" or somewhere else, he can
accidentally navigate away. With `canDeactivate` we can prevent this from
happening. We therefore define `CanDeactivateGuardService`.

```typescript
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

// our custom interface
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// the custom interface `CanComponentDeactivate is wrapped in `CanDeactivate`. 
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
        component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeactivate();
    }
}
```

The newly created service needs to be provided in `AppModule`. In
`AppRoutingModule`, we can then specify on which route the
`CanDeactivateGuardService` should be applied, in this example
`EditServerComponent`.

```typescript
...
import { NgModule } from '@angular/core';
...
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';

@NgModule({
  ... 
  providers: [..., CanDeactivateGuardService],
  ...
})
export class AppModule { }
```

```typescript
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
...
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
...
import { AuthGuardService } from "./auth-guard.service";
import { CanDeactivateGuardService } from "./servers/edit-server/can-deactivate-guard.service";

const appRoutes: Routes = [
    ...
    {
        path: 'servers', canActivateChild: [AuthGuardService], component: ServersComponent, children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService] }
        ]
    },
    ...
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

`EditServerComponent` needs to implement the method `canDeactivate()` of the
interface `CanComponentDeactivate`. This method contains the logic, whether we
should navigate away or not.

```typescript
import { Component, OnInit } from '@angular/core';

...
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  ...
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    ...,
    private ActivatedRoute,
    private router: Router
  ) { }

  ...
  onUpdateServer() {
    ...
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  // provide logic, whether we are allowed to leave or not
  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.allowEdit) {
      return true;
    }

    if (this.hasServerNameOrStatusChanged() && !this.changesSaved) {
      return confirm('Do you want to discard the changes?')
    }
    return true;
  }

  private hasServerNameOrStatusChanged(): boolean {
    return this.serverName !== this.server.name
      || this.serverStatus !== this.server.status 
  }
}
```

### Passing Static Data to a Route

Static `data` can be passed to a route. Below we are passing a "404: Page not
found!" message.

```typescript
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
...
import { ErrorPageComponent } from "./error-page/error-page.component";

const appRoutes: Routes = [
    ...
    { path: 'not-found', component: ErrorPageComponent, data: {message: '404: Page not found!'} },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

In `ngOnInit` of `ErrorPageComponent`, we retrieve the data which will then be
displayed.

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    })
  }
}
```

```html
<h4>{{ errorMessage }}</h4>
```
