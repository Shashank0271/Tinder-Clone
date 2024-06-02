import {createSlice} from '@reduxjs/toolkit';
import {fetchUserMatches} from '../apiCalls/matches';

const initialState = {
  isFetchingMatches: false,
  isFetchingMatchesError: true,
  matches: [],
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserMatches.pending, (state, action) => {
      state.isFetchingMatches = true;
      state.isFetchingMatchesError = false;
    });
    builder.addCase(fetchUserMatches.fulfilled, (state, action) => {
      state.isFetchingMatches = false;
      state.matches = action.payload;
      state.isFetchingMatchesError = false;
    });
    builder.addCase(fetchUserMatches.rejected, (state, action) => {
      state.isFetchingMatches = false;
      state.isFetchingMatchesError = true;
    });
  },
});

export default matchSlice.reducer;
