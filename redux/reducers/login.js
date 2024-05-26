import {createSlice} from '@reduxjs/toolkit';
import {signInWithGoogle, signOutWithGoogle} from '../apiCalls/auth';

const initialState = {
  isLoggedIn: false,
  loginError: false,
  isLoggingIn: false,
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signInWithGoogle.pending, (state, action) => {
      state.isLoggedIn = false;
      state.authError = false;
      state.changingAuthState = true;
    }),
      builder.addCase(signInWithGoogle.rejected, (state, action) => {
        state.authError = true;
        state.changingAuthState = false;
        state.isLoggedIn = false;
      }),
      builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.changingAuthState = false;
        state.authError = false;
      });
  },
});

export default loginSlice.reducer;
