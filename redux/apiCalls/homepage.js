import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchHomePageUsers = createAsyncThunk(
  'fetchHomePageUsersData',
  async (firebaseUid, {rejectWithValue}) => {
    try {
      let likedUserIds = await firestore()
        .collection('Users')
        .doc(firebaseUid)
        .collection('liked')
        .get()
        .then(querySnapshot =>
          querySnapshot.docs.map(userDoc => userDoc.data().userId),
        );

      let passedUserIds = await firestore()
        .collection('Users')
        .doc(firebaseUid)
        .collection('passed')
        .get()
        .then(querySnapshot =>
          querySnapshot.docs.map(userDoc => userDoc.data().userId),
        );

      if (likedUserIds.length === 0) {
        likedUserIds = ['testing']; //since the list cant be empty in "where" filter
      }

      if (passedUserIds.length === 0) {
        passedUserIds = ['testing'];
      }

      const users = firestore()
        .collection('Users')
        .where('userId', 'not-in', [
          ...likedUserIds,
          ...passedUserIds,
          firebaseUid,
        ])
        .get()
        .then(userDataSnapshot => userDataSnapshot.docs);

      return users;
    } catch (e) {
      console.error(e.toString());
      return rejectWithValue(
        'Fetching all users failed with error : ',
        e.toString(),
      );
    }
  },
);

