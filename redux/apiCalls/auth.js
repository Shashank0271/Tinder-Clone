import {createAsyncThunk} from '@reduxjs/toolkit';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  offlineAccess: false,
  webClientId:
    '855218286662-mp35jj0nescjrkmjv1goe2i3gk3l94e7.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

export const signInWithGoogle = createAsyncThunk(
  'signOutWithGoogle',

  async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('\nFIREBASE USER : ::::::::::', userInfo, '\n\n');
      const {idToken} = userInfo;
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);
      return userInfo;
    } catch (error) {
      console.error('=> Google Sign In', error);
      return null;
    }
  },
);

export const signOutWithGoogle = createAsyncThunk(
  'signOutWithGoogle',

  async () => {
    console.log('signing out ');
    try {
      await GoogleSignin.signOut(); // Sign out from Google
      await auth().signOut(); // Sign out from Firebase
    } catch (e) {
      console.log('=> Unable to Sign out', e);
    }
  },
);
