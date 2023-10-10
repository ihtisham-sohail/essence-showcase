import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostEffects } from './rbook.effects';
import { postReducer } from './rbook.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('rbook', postReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class RBookStoreModule {}
