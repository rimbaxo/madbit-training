import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | undefined;
}

const initialState: AuthState = {
  accessToken: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | undefined>) {
      console.log("ACTION", action.payload)
      state.accessToken = action.payload;
    },
    logout(state) {
      state.accessToken = undefined;
    }
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
