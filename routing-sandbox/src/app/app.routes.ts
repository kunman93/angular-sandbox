import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChildAComponent } from './child-a/child-a.component';
import { ChildBComponent } from './child-b/child-b.component';

export const routes: Routes = [
  {
    path: 'first-component',
    title: 'First Component',
    component: FirstComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'child-a', // child route path
        title: 'Child A Component',
        component: ChildAComponent, // child route component that the router renders
      },
      {
        path: 'child-b',
        title: 'Child B Component',
        component: ChildBComponent, // another child route component that the router renders
      },
    ],
  },
  {
    path: 'second-component',
    title: 'Second Component',
    component: SecondComponent
  },
  {
    path: '',
    redirectTo: '/first-component',
    pathMatch: 'full'
  }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },
];
