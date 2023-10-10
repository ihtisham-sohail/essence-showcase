import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, exhaustMap } from 'rxjs/operators';

import * as fromPosts from './index';
import { RbookService } from '../../services/rbook/rbook.service';
import { IPost } from '../../interfaces/rbook.interface';

@Injectable()
export class PostEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly rbService: RbookService
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.getPosts.type),
      exhaustMap(() => this.rbService.getAllPosts()),
      map((postList: IPost[]) => {
        return fromPosts.getPostSuccess({
          postList,
        });
      })
    )
  );

  // getSortedPosts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromPosts.getSortedCachePosts.type),
  //     exhaustMap((action) => action),
  //     map((actions: any) => {
  //       return fromPosts.getSortedCachePosts({
  //         actions,
  //       });
  //     })
  //   )
  // );
}
