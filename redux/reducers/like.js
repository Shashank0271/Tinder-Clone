import {createSlice} from '@reduxjs/toolkit';
import {addToLikedUsers} from '../apiCalls/like';

const initialState = {
  isLoadingLike: false,
  likedUser: null,
  matched: false,
};

const likeSlice = createSlice({
  name: 'likeSlice',
  initialState,
  reducers: {
    setMatched: (state, action) => {
      state.matched = action.payload.matched;
      state.likedUser = action.payload.likedUser;
    },
  },
  extraReducers: builder => {
    builder.addCase(addToLikedUsers.pending, (state, _) => {
      state.isLoadingLike = true;
      state.matched = false;
    });
    builder.addCase(addToLikedUsers.rejected, (state, _) => {
      state.isLoadingLike = false;
      state.matched = false;
      state.likedUser = null;
    });
    builder.addCase(addToLikedUsers.fulfilled, (state, _) => {
      state.isLoadingLike = false;
    });
  },
});

export const {setMatched} = likeSlice.actions;
export default likeSlice.reducer;
