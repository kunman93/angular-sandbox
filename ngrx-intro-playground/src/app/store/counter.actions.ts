import { createAction, props } from '@ngrx/store';

/**
 * The actions are defined here.
 * 
 * - actions describe unique events that are dispatched from components and services.
 * - the type of the action is required. It must be unique! A convention is to use the name of the feature as a prefix between the brackets e.g. `[Counter]` followed by the action e.g. `Increment`
 * - the props method is used to define any additional metadata needed for the handling of the action.
 * 
 * */

export const init = createAction(
  '[Counter] Init'
);

export const set = createAction(
  '[Counter] Set',
  props<{ newValue: number }>(),
);

export const increment = createAction(
  '[Counter] Increment',
  props<{ incrementValue: number }>()
);

export const decrement = createAction(
  '[Counter] Decrement',
  props<{ decrementValue: number }>()
);
