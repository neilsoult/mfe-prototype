import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CounterActions from './counter.actions';
import { CounterEffects } from './counter.effects';

describe('CounterEffects', () => {
  let actions: Observable<Action>;
  let effects: CounterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CounterEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CounterEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CounterActions.init() });

      const expected = hot('-a-|', {
        a: CounterActions.loadCounterSuccess({ counter: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
