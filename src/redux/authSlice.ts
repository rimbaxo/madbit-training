import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from '../types';

const initialState: AuthState = {
  accessToken: undefined,
  fullName: undefined,
  email: undefined,
  id: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
    },
    setUserInfo(
      state,
      action: PayloadAction<{fullName: string; email: string; id: number}>,
    ) {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout(state) {
      state.accessToken = undefined;
      state.fullName = undefined;
      state.email = undefined;
      state.id = undefined;
    },
  },
});

export const {setAccessToken, setUserInfo, logout} = authSlice.actions;
export default authSlice.reducer;
