import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectCount, selectDoubleCount } from '../store/counter.selectors';

@Component({
    selector: 'app-counter-output',
    templateUrl: './counter-output.component.html',
    styleUrls: ['./counter-output.component.css'],
    standalone: false
})
export class CounterOutputComponent {
  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.count$ = this.store.select(selectCount);
    this.doubleCount$ = this.store.select(selectDoubleCount);
  }
}
