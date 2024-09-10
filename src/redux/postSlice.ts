// src/redux/postsSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PostType} from '../types';

type PostsState = {
  posts: PostType[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<PostType[]>) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearPosts(state) {
      state.posts = [];
    },
  },
});

export const {setPosts, setLoading, setError, clearPosts} = postsSlice.actions;
export default postsSlice.reducer;
