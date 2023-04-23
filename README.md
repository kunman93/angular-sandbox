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
`AppComponent` with its *selector* and *templateUrl* and uses it in `index.html`.
