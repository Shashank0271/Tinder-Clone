import {createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

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
        likedUserIds = ['testing'];
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

export const addToLikedUsers = createAsyncThunk(
  'addToLikedUsers',
  async ({likedUser, firebaseUid}, {rejectWithValue}) => {
    try {
      await firestore()
        .collection('Users')
        .doc(firebaseUid)
        .collection('liked')
        .doc(likedUser.userId)
        .set(likedUser);
    } catch (e) {
      return rejectWithValue(
        'error in adding user to liked : ---> \t',
        e.toString(),
      );
    }
  },
);

export const addToPassedUsers = createAsyncThunk(
  'addToPassedUsers',
  async ({passedUser, firebaseUid}, {rejectWithValue}) => {
    try {
      await firestore()
        .collection('Users')
        .doc(firebaseUid)
        .collection('passed')
        .doc(passedUser.userId)
        .set(passedUser);
    } catch (e) {
      return rejectWithValue(
        'error in adding user to liked : ---> \t',
        e.toString(),
      );
    }
  },
);

export const createMatch = createAsyncThunk('createMatch', async () => {});
