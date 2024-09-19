// src/redux/postsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsState, PostType } from '../types';
import { updatePostInfoReducer } from '../views/PostUpdateScreen';

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
    updateCommentPostNumber(state: PostsState, action: PayloadAction<number>){
      const postId = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments_count += 1;
      }
    },
    updatePostContent(state: PostsState, action: PayloadAction<updatePostInfoReducer>){
      const post = state.posts.find((post) => post.id === action.payload.id);
      if (post) {
        post.text = action.payload.newText;
        post.title = action.payload.newTitle;
        post.updated_at = action.payload.newUpdatedAt;
      }
    },
    // updateComment(state: PostsState, action: PayloadAction<CommentResponse>){
    //   const post = state.posts.find((post) => post.id === action.payload.id);
    //   if (post) {
    //     post = action.payload.newText;
    //     post.title = action.payload.newTitle;
    //     post.updated_at = action.payload.newUpdatedAt;
    //   }
    // },
    deletePostReducer(state: PostsState, action: PayloadAction<number>){
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
          state.posts = state.posts.filter((post) => post.id !== action.payload);
      }
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

export const {setPosts, setLoading, setError, clearPosts, updateCommentPostNumber, updatePostContent, deletePostReducer} = postsSlice.actions;
export default postsSlice.reducer;
