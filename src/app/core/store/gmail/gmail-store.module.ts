import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GmailEffects } from './gmail.effects';
import { gmailReducer } from './gmail.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('gmail', gmailReducer),
    EffectsModule.forFeature([GmailEffects]),
  ],
})
export class GmailStoreModule {}
