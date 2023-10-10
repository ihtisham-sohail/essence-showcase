import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IGmailState } from '../../interfaces/gmail.interface';

export const selectGmailState = createFeatureSelector<IGmailState>('gmail');
export const selectGmailList = createSelector(selectGmailState, (state) => {
  return state?.gmailList;
});
export const selectGmailIsLoading = createSelector(
  selectGmailState,
  (state) => state?.isLoading
);
export const selectNextPageAvl = createSelector(
  selectGmailState,
  (state) => state?.nextPageAvl
);
export const selectCurrPage = createSelector(
  selectGmailState,
  (state) => state?.currIter
);

export const selectLastestPage = createSelector(
  selectGmailState,
  (state) => state?.latestPage
);
