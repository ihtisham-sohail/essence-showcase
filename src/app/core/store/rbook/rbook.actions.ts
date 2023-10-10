import { createAction, props } from '@ngrx/store';
import { IPost } from '../../interfaces/rbook.interface';

const prefix = '[rbook]';

export const getPosts = createAction(`${prefix} Get Posts`);
export const getNextCachePosts = createAction(`${prefix} Get Next Cache Post`);
export const getBackCachePosts = createAction(`${prefix} Get Previous Post`);
export const getSortedCachePosts = createAction(
  `${prefix} Get Sorted Post`,
  props<{
    sortBy: string;
  }>()
);

export const getSearchedName = createAction(
  `${prefix} Get Searched Post`,
  props<{
    searchFilter: string;
  }>()
);

export const getPostSuccess = createAction(
  `${getPosts.type} Success`,
  props<{
    postList: IPost[];
  }>()
);
