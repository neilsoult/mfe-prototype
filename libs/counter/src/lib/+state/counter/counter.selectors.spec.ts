import { CounterEntity } from './counter.models';
import {
  counterAdapter,
  CounterPartialState,
  initialState,
} from './counter.reducer';
import * as CounterSelectors from './counter.selectors';

describe('Counter Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCounterId = (it: CounterEntity) => it.id;
  const createCounterEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CounterEntity);

  let state: CounterPartialState;

  beforeEach(() => {
    state = {
      counter: counterAdapter.setAll(
        [
          createCounterEntity('PRODUCT-AAA'),
          createCounterEntity('PRODUCT-BBB'),
          createCounterEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Counter Selectors', () => {
    it('getAllCounter() should return the list of Counter', () => {
      const results = CounterSelectors.getAllCounter(state);
      const selId = getCounterId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CounterSelectors.getSelected(state) as CounterEntity;
      const selId = getCounterId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCounterLoaded() should return the current "loaded" status', () => {
      const result = CounterSelectors.getCounterLoaded(state);

      expect(result).toBe(true);
    });

    it('getCounterError() should return the current "error" state', () => {
      const result = CounterSelectors.getCounterError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
