import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromPosts from '../store/rbook/index';

@Injectable({
  providedIn: 'root',
})
export class RBookResolverService implements Resolve<any> {
  constructor(private readonly _store: Store) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._store.pipe(
      select(fromPosts.selectPostList),
      tap((postList) => {
        if (!postList.length) {
          this._store.dispatch(fromPosts.getPosts());
        }
      }),
      take(1)
    );
  }
}
