import { createAction, props } from '@ngrx/store';
import { IGmail } from '../../interfaces/gmail.interface';

const prefix = '[gmail]';

export const getGmails = createAction(`${prefix} Get Gmail`);
export const getNextGmails = createAction(`${prefix} Get Next Page`);
export const getNextCacheGmails = createAction(`${prefix} Get Next Cache Page`);
export const getBackCacheGmails = createAction(`${prefix} Get Previous Page`);

export const getGmailSuccess = createAction(
  `${getGmails.type} Success`,
  props<{
    gmailList: IGmail[];
    nextPageAvl: string;
  }>()
);
