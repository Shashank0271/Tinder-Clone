import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const addToPassedUsers = async ({passedUser, firebaseUid}) => {
  try {
    await firestore()
      .collection('Users')
      .doc(firebaseUid)
      .collection('passed')
      .doc(passedUser.userId)
      .set(passedUser);
  } catch (e) {
    throw new Error('Error while passing \t\t', e.toString());
  }
};
