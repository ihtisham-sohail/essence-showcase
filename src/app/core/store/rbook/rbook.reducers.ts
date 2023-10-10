import { createReducer, on } from '@ngrx/store';

import {
  IPostState,
  IPost,
  ISortState,
} from '../../interfaces/rbook.interface';
import * as fromPosts from './index';
import { maxResults } from 'src/app/configs/endpoint.constant';

export const initialPostState: IPostState = {
  postList: [],
  totalPostCount: 0,
  isLoading: true,
  totalPostList: [],
  cachedTotalPostList: [],
  currIter: 0,
  latestPage: 0,
  sortState: {
    message: false,
    email: false,
    name: false,
    id: false,
    postId: false,
  },
};

export const reducer = createReducer<IPostState>(
  initialPostState,
  on(fromPosts.getPosts, (state) => {
    return {
      ...state,
    };
  }),
  on(fromPosts.getPostSuccess, (state, { postList }) => {
    let iter = state?.currIter + maxResults;
    return {
      ...state,
      postList: postList.slice(0, iter),
      totalPostList: postList,
      currIter: iter,
      isLoading: false,
      latestPage: iter,
      totalPostCount: postList.length,
    };
  }),
  on(fromPosts.getNextCachePosts, (state) => {
    let iter = state?.currIter + maxResults;

    return {
      ...state,
      postList: state?.totalPostList.slice(state?.currIter, iter),
      currIter: iter,
    };
  }),
  on(fromPosts.getBackCachePosts, (state) => {
    let iter = state?.currIter - maxResults;
    return {
      ...state,
      postList: state?.totalPostList.slice(
        iter - maxResults,
        iter > state?.totalPostCount ? state?.totalPostCount : iter
      ),
      currIter: iter,
    };
  }),
  on(fromPosts.getSortedCachePosts, (state, { sortBy }) => {
    let sorted = [...state?.totalPostList];
    let sortState: any = { ...state?.sortState };
    let numb = sortState[sortBy] ? 1 : -1;
    sortState[sortBy] = !sortState[sortBy];

    sorted.sort((a, b) => (a[sortBy] > b[sortBy] ? numb : -numb));

    let iter = maxResults;
    return {
      ...state,
      postList: sorted.slice(0, iter),
      totalPostList: sorted,
      currIter: iter,
      sortState,
    };
  }),
  on(fromPosts.getSearchedName, (state, { searchFilter }) => {
    let totalPostList: any = [];
    let cachedTotalPostList: any = [...state?.cachedTotalPostList];
    if (searchFilter === '') {
      totalPostList = [...cachedTotalPostList];
      cachedTotalPostList = [];
    } else if (searchFilter) {
      if (!state?.cachedTotalPostList.length) {
        cachedTotalPostList = [...state?.totalPostList];
      }
      totalPostList = cachedTotalPostList.filter(
        (obj: IPost) =>
          obj.name.includes(searchFilter) ||
          obj.email.includes(searchFilter) ||
          obj.body.includes(searchFilter)
      );
    }
    let iter = maxResults;
    return {
      ...state,
      postList: totalPostList.slice(0, iter),
      totalPostList,
      cachedTotalPostList,
      currIter: iter,
      totalPostCount: totalPostList.length,
    };
  })
);

export function postReducer(
  state = initialPostState,
  actions: any
): IPostState {
  return reducer(state, actions);
}
