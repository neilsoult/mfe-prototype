import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import { CounterEntity } from './counter.models';


export const COUNTER_FEATURE_KEY = 'counter';

export interface State extends EntityState<CounterEntity> {
  count: number;
  loaded: boolean; // has the Counter list been loaded
  error?: string | null; // last known error (if any)
}

export interface CounterPartialState {
  readonly [COUNTER_FEATURE_KEY]: State;
}

export const counterAdapter: EntityAdapter<CounterEntity> =
  createEntityAdapter<CounterEntity>();

export const initialState: State = counterAdapter.getInitialState({
  // set initial required properties
  count: 0,
  loaded: false,
});

const counterReducer = createReducer(
  initialState,
  on(CounterActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CounterActions.add, (state) => ({
    ...state,
    count: state.count + 1
  })),
  on(CounterActions.loadCounterSuccess, (state, { counter }) =>
    counterAdapter.setAll(counter, { ...state, loaded: true })
  ),
  on(CounterActions.loadCounterFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return counterReducer(state, action);
}
