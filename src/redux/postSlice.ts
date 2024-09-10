// src/redux/postsSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PostsState, PostType} from '../types';

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state: PostsState, action: PayloadAction<PostType[]>) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state: PostsState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state: PostsState, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearPosts(state: PostsState) {
      state.posts = [];
    },
  },
});

export const {setPosts, setLoading, setError, clearPosts} = postsSlice.actions;
export default postsSlice.reducer;
