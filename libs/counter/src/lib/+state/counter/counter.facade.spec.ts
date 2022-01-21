import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as CounterActions from './counter.actions';
import { CounterEffects } from './counter.effects';
import { CounterFacade } from './counter.facade';
import { CounterEntity } from './counter.models';
import {
  COUNTER_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './counter.reducer';
import * as CounterSelectors from './counter.selectors';

interface TestSchema {
  counter: State;
}

describe('CounterFacade', () => {
  let facade: CounterFacade;
  let store: Store<TestSchema>;
  const createCounterEntity = (id: string, name = ''): CounterEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COUNTER_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CounterEffects]),
        ],
        providers: [CounterFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CounterFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCounter$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCounter$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCounterSuccess` to manually update list
     */
    it('allCounter$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCounter$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CounterActions.loadCounterSuccess({
          counter: [createCounterEntity('AAA'), createCounterEntity('BBB')],
        })
      );

      list = await readFirst(facade.allCounter$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
