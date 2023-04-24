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
`AppComponent` with its *selector* and *templateUrl* and uses it in
`index.html`. 

### Components

`AppComponent` is special component. it serves as a root component Angular
bootstraps with. Other components will be added in `AppComponent`.

### Role of AppModule and Component

Angular uses Components to build web pages and uses modules e.g. `AppModule`
to bundle different pieces e.g. Components of an app into packages.

#### AppModule

*@NgModule*: *@NgModule* is a decorator imported from '@angular/core'. In
there, there are four properties (*declarations, imports, providers and
bootstrap'*). *bootstrap* property will only contain *AppComponent*. To
register a new Component e.g. *ServerComponent*, it needs to be added to the
*declarations* property as shown below, because by default Angular will not
scan all the files. *ServerComponent* needs also to be imported; the *.ts*
extension is not needed, *WebPack* adds it. *imports* property allows to add
new modules to *AppModule*. To make *AppModule* leaner, separate modules can be
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
