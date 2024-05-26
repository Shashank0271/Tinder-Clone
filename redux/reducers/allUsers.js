import {createSlice} from '@reduxjs/toolkit';
import {fetchHomePageUsers} from '../apiCalls/allUsers';

const initialState = {
  allUsersList: [],
  fetchingAllUsersDataError: null,
  fetchingAllUsersData: true,
};

const allUsersSlice = createSlice({
  name: 'allUserSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
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

export default allUsersSlice.reducer;
