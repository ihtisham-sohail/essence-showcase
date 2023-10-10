export interface IPost {
  body: string;
  email: string;
  name: string;
  id: string;
  postId: number;
}

export interface IPostState {
  postList: IPost[];
  totalPostList: any[];
  cachedTotalPostList: any[];
  totalPostCount: number;
  isLoading: boolean;
  currIter: number;
  latestPage: number;
  sortState: ISortState;
}

export interface ISortState {
  message: boolean;
  email: boolean;
  name: boolean;
  id: boolean;
  postId: boolean;
}
