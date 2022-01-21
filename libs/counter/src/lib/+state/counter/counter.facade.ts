import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import * as CounterSelectors from './counter.selectors';


@Injectable()
export class CounterFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  count$ = this.store.select(CounterSelectors.getCount);
  loaded$ = this.store.select(CounterSelectors.getCounterLoaded);

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CounterActions.init());
  }

  add() {
    this.store.dispatch(CounterActions.add());
  }
}
