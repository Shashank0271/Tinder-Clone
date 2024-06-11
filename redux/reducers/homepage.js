import {createSlice} from '@reduxjs/toolkit';
import {fetchHomePageUsers} from '../apiCalls/homepage';

const initialState = {
  allUsersList: [],
  fetchingAllUsersDataError: null,
  fetchingAllUsersData: true,
};

const allUsersSlice = createSlice({
  name: 'allUserSlice',
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      const userIndex = action.payload;
      state.allUsersList.splice(userIndex, 1);
    },
  },
  extraReducers: builder => {
    //Handle HOME-PAGE users
    builder.addCase(fetchHomePageUsers.pending, (state, action) => {
      state.fetchingAllUsersData = true;
      state.fetchingAllUsersDataError = false;
    }),
      builder.addCase(fetchHomePageUsers.rejected, (state, action) => {
        state.fetchingAllUsersData = false;
        state.fetchingAllUsersDataError = action.payload;
      }),
      builder.addCase(fetchHomePageUsers.fulfilled, (state, action) => {
        state.allUsersList = action.payload;
        state.fetchingAllUsersData = false;
        state.fetchingAllUsersDataError = false;
      });
  },
});

export const {setAllUsers} = allUsersSlice.actions;
export default allUsersSlice.reducer;
