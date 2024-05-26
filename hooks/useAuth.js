import {GoogleSignin} from '@react-native-community/google-signin';
import {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext({});

GoogleSignin.configure({
  offlineAccess: false,
  webClientId:
    '855218286662-mp35jj0nescjrkmjv1goe2i3gk3l94e7.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(firebaseUser => {
      console.log(
        '\n\n\n\ FIREBASE USERz-----------------------  : ',
        firebaseUser,
      );
      setUser(firebaseUser);
      setLoadingInitial(false);
    });
  }, []);

  const _signInWithGoogle = async () => {
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
  };

  const _signOutWithGoogle = async () => {
    console.log('signing out ');
    try {
      await GoogleSignin.signOut(); // Sign out from Google
      await auth().signOut(); // Sign out from Firebase
    } catch (e) {
      console.log('=> Unable to Sign out', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle: _signInWithGoogle,
        signOutWithGoogle: _signOutWithGoogle,
        user: user,
      }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
