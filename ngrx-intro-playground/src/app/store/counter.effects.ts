import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';

import { decrement, increment, init, set } from './counter.actions';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) { }

  loadCount$ = createEffect(() =>
    // listening for all dispatched actions through the Actions stream, but is only interested in the `[Counter] Init` event.
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');

        return storedCounter
          ? of(set({ newValue: +storedCounter }))
          : of(set({ newValue: 0 }));
      })
    )
  );

  saveCount$ = createEffect(() =>
    // listening for all dispatched actions through the Actions stream, but is only interested in the `[Counter] Increment` and `[Counter] Decrement` event.
    this.actions$.pipe(
      ofType(increment, decrement),
      /** 
       * The withLatestFrom operator is your best friend when you have one main observable whose emissions depend on the latest values from one or more other observables. 
       * Keep in mind that withLatestFrom only emits a value when the main observable - in this example `this.actions$` - emits, and after each additional observable has emitted at least once.
       * */
      withLatestFrom(this.store.select(selectCount)),
      tap(([action, counter]) => {
        console.log(action);
        localStorage.setItem('count', counter.toString());
      })
    ),
    { dispatch: false }
  );
}
