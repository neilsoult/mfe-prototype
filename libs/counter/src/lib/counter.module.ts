import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromCounter from './+state/counter/counter.reducer';
import { CounterEffects } from './+state/counter/counter.effects';
import { CounterFacade } from './+state/counter/counter.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCounter.COUNTER_FEATURE_KEY,
      fromCounter.reducer
    ),
    EffectsModule.forFeature([CounterEffects]),
  ],
  providers: [CounterFacade],
})
export class CounterModule {}
