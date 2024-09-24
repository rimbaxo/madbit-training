import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeToken } from '../constants';
import { AuthState } from '../types';

const initialState: AuthState = {
  accessToken: undefined,
  full_name: undefined,
  email: undefined,
  id: undefined,
  created_at: undefined,
  first_name: undefined,
  last_name: undefined,
  picture: undefined};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(
      state: AuthState,
      action: PayloadAction<string | undefined>,
    ) {
      state.accessToken = action.payload;
    },
    setUserInfo(
      state: AuthState,
      action: PayloadAction<{fullName: string; email: string; id: number, first_name: string, last_name: string, created_at: string, picture: string}>,
    ) {
      state.full_name = action.payload.fullName;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.created_at = action.payload.created_at;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.picture = action.payload.picture;
    },
    logout(state: AuthState) {
      removeToken();
      state.accessToken = undefined;
      state.full_name = undefined;
      state.email = undefined;
      state.id = undefined;
    },
  },
});

export const {setAccessToken, setUserInfo, logout} = authSlice.actions;
export default authSlice.reducer;
