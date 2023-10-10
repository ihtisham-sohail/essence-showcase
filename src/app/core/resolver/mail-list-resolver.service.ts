import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromGmails from '../store/gmail/index';

@Injectable({
  providedIn: 'root',
})
export class MailListResolverService implements Resolve<any> {
  constructor(private readonly _store: Store) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._store.pipe(
      select(fromGmails.selectGmailList),
      tap((gmailList) => {
        console.log(gmailList);
        if (!gmailList.length) {
          this._store.dispatch(fromGmails.getGmails());
        }
      }),
      take(1)
    );
    //this._store.dispatch(fromGmails.getGmails());
  }
}
