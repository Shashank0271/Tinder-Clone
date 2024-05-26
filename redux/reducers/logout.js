import {createSlice} from '@reduxjs/toolkit';
import {signOutWithGoogle} from '../apiCalls/auth';

const initialState = {
  isLoggingOut: false,
  logoutError: false,
  loggedOut: false,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signOutWithGoogle.pending, (state, action) => {
      state.isLoggingOut = true;
      state.loggedOut = false;
      state.logoutError = false;
    });
    builder.addCase(signOutWithGoogle.rejected, (state, action) => {
      state.isLoggingOut = false;
      state.loggedOut = false;
      state.logoutError = true;
    });
    builder.addCase(signOutWithGoogle.fulfilled, (state, action) => {
      state.isLoggingOut = false;
      state.loggedOut = true;
      state.logoutError = false;
      state.firebaseUser = null;
    });
  },
});

export default logoutSlice.reducer;
