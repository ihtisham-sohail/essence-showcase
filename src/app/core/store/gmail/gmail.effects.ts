import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, exhaustMap } from 'rxjs/operators';

import * as fromGmails from './index';
import { GmailService } from '../../services/gmail/gmail.service';
import { IGmail } from '../../interfaces/gmail.interface';

@Injectable()
export class GmailEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly gmailService: GmailService
  ) {}

  getGmails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGmails.getGmails.type),
      exhaustMap(() => this.gmailService.getGmailInit()),
      map((gmailList: IGmail[]) => {
        return fromGmails.getGmailSuccess({
          gmailList,
          nextPageAvl: this.gmailService.getMextPageToken(),
        });
      })
    )
  );

  getNextPageGmails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGmails.getNextGmails.type),
      exhaustMap(() => this.gmailService.getNextPageGmail()),
      map((gmailList: IGmail[]) => {
        return fromGmails.getGmailSuccess({
          gmailList,
          nextPageAvl: this.gmailService.getMextPageToken(),
        });
      })
    )
  );
}
