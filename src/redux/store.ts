// src/redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
