import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
    }
  },
});

export const { setIsLoggedIn, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
