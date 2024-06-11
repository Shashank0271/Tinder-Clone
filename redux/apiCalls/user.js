import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchCurrentUserData = createAsyncThunk(
  'fetchCurrentUserData',
  async (firebaseUserId, {rejectWithValue}) => {
    try {
      const currentUserDocument = await firestore()
        .collection('Users')
        .doc(firebaseUserId)
        .get();

      const currentUser = currentUserDocument.data();

      return currentUser;
    } catch (error) {
      return rejectWithValue('Request failed with error : ', error);
    }
  },
);

export const updateCurrentUserData = createAsyncThunk(
  'updateCurrentUserData',
  async (userProperties, {rejectWithValue}) => {
    const {userId, age, job, displayName, timeStamp} = userProperties;

    try {
      await firestore().collection('Users').doc(userId).set({
        userId,
        age,
        job,
        displayName,
        timeStamp,
      });

      const updatedUser = await firestore()
        .collection('Users')
        .doc(userId)
        .get();

      return updatedUser;
    } catch (e) {
      return rejectWithValue(e.toString());
    }
  },
);
