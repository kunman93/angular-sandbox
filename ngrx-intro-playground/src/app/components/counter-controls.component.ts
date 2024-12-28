import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { decrement, increment } from '../store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
})
export class CounterControlsComponent {
  constructor(private store: Store) { }

  increment() {
    // dispatching increment action on click event with some metadata passed in as parameter
    this.store.dispatch(increment({ incrementValue: 2 }));
  }

  decrement() {
    // dispatching decrement action on click event with some metadata passed in as parameter
    this.store.dispatch(decrement({ decrementValue: 1 }));
  }
}
