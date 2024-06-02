import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
export const fetchUserMatches = createAsyncThunk(
  'fetchUserMatches',
  async (currentUserId, {rejectWithValue}) => {
    try {
      return await firestore()
        .collection('Matches')
        .where('usersMatched', 'array-contains', currentUserId)
        .get()
        .then(querySnapShot =>
          querySnapShot.docs.map(document => {
            delete document.data().users[currentUserId];
            return {
              matchedUser: Object.entries(document.data().users)[0][1],
              matchId: document.data().matchId,
            };
          }),
        );
    } catch (e) {
      console.log(e.toString());
      rejectWithValue('fetching matches failed with an error : \t', e);
    }
  },
);
