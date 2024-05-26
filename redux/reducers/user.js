import {createSlice} from '@reduxjs/toolkit';
import {fetchCurrentUserData, updateCurrentUserData} from '../apiCalls/user';

const initialState = {
  firebaseUser: null,
  userData: {},
  isFetchingUserData: true,
  isFetchingUserDataError: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFireBaseUser: (state, action) => {
      state.firebaseUser = action.payload;
    },
  },

  extraReducers: builder => {
    //PENDING
    builder.addMatcher(
      action =>
        action.type === fetchCurrentUserData.pending.type ||
        action.type === updateCurrentUserData.pending.type,
      (state, action) => {
        state.isFetchingUserData = true;
      },
    ),
      //FULFILLED
      builder.addMatcher(
        action =>
          action.type === fetchCurrentUserData.fulfilled.type ||
          action.type === updateCurrentUserData.fulfilled.type,
        (state, action) => {
          try {
            state.isFetchingUserData = false;
            if (action.payload && Object.keys(action.payload).length > 0) {
              const {age, displayName, job, userId} = action.payload;
              state.userData = {age, displayName, job, userId};
            }
          } catch (e) {
            console.log(e);
          }
        },
      ),
      //REJECTED
      builder.addMatcher(
        action =>
          action.type === fetchCurrentUserData.rejected.type ||
          action.type === updateCurrentUserData.rejected.type,
        (state, action) => {
          console.log('REJECTED----------------------WTF');
          state.isFetchingUserData = false;
          state.fetchingDataError = true;
        },
      );
  },
});

export const {setFireBaseUser} = userSlice.actions;
export default userSlice.reducer;
