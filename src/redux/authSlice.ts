// src/redux/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  loginPressed: boolean;
}

const initialState: AuthState = {
  loginPressed: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginPressed(state, action: PayloadAction<boolean>) {
      state.loginPressed = action.payload;
    },
  },
});

export const {setLoginPressed} = authSlice.actions;
export default authSlice.reducer;
