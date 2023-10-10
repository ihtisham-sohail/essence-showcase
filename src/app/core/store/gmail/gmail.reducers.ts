import { createReducer, on } from '@ngrx/store';

import { IGmailState, IGmail } from '../../interfaces/gmail.interface';
import * as fromGmails from './index';

export const initialGmailState: IGmailState = {
  gmailList: [],
  nextPageAvl: '',
  isLoading: true,
  totalGmailList: [],
  currIter: -1,
  latestPage: -1,
};

export const reducer = createReducer<IGmailState>(
  initialGmailState,
  on(fromGmails.getGmails, (state) => {
    return {
      ...state,
    };
  }),
  on(fromGmails.getGmailSuccess, (state, { gmailList, nextPageAvl }) => {
    let totalGmailList = [];

    if (state?.totalGmailList.length) {
      totalGmailList = [...state?.totalGmailList, gmailList];
    } else {
      totalGmailList = [gmailList];
    }
    let iter = state?.currIter + 1;

    return {
      ...state,
      gmailList,
      totalGmailList,
      currIter: iter,
      isLoading: false,
      latestPage: iter,
      nextPageAvl,
    };
  }),
  on(fromGmails.getNextCacheGmails, (state) => {
    let iter = state?.currIter + 1;
    return {
      ...state,
      gmailList: state?.totalGmailList[iter],
      currIter: iter,
    };
  }),
  on(fromGmails.getBackCacheGmails, (state) => {
    let iter = state?.currIter - 1;
    return {
      ...state,
      gmailList: state?.totalGmailList[iter],
      currIter: iter,
    };
  })
);

export function gmailReducer(
  state = initialGmailState,
  actions: any
): IGmailState {
  return reducer(state, actions);
}
