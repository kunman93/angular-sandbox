import { createReducer, on } from '@ngrx/store';

import { decrement, increment, set } from './counter.actions';

/**
 * The reducers are defined here.
 * 
 * - Reducers in NgRx are responsible for handling transitions from one state to the next state in your application. 
 *   Reducer functions handle these transitions by determining which actions to handle based on the action's type.
 * - Each reducer function takes the latest Action dispatched, the current state, and determines whether to return 
 *   a newly modified state or the original state.
 * 
 **/

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.incrementValue),
  on(decrement, (state, action) => state - action.decrementValue),
  on(set, (_state, action) => action.newValue),
);
