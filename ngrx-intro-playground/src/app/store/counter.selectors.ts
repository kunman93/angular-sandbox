import { createSelector } from '@ngrx/store';

/**
 *  Selectors are pure functions used for obtaining slices of store state
 */

export const selectCount = (state: { counter: number }) => state.counter;
export const selectDoubleCount = createSelector(
  selectCount,
  (state) => state * 2
);
