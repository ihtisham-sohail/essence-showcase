import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPostState } from '../../interfaces/rbook.interface';

export const selectPostState = createFeatureSelector<IPostState>('rbook');
export const selectPostList = createSelector(selectPostState, (state) => {
  return state?.postList;
});
export const selectPostIsLoading = createSelector(
  selectPostState,
  (state) => state?.isLoading
);
export const selectCurrPage = createSelector(
  selectPostState,
  (state) => state?.currIter
);

export const selectLastestPage = createSelector(
  selectPostState,
  (state) => state?.latestPage
);

export const selectTotalPostCount = createSelector(
  selectPostState,
  (state) => state?.totalPostCount
);

export const selectSortState = createSelector(
  selectPostState,
  (state) => state?.sortState
);
