import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ChatScreen from './ChatScreen';
import ModalScreen from './ModalScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setFireBaseUser} from '../redux/reducers/user';
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

export default function StackScreen() {
  const dispatch = useDispatch();
  const {firebaseUser} = useSelector(({user}) => user);

  useEffect(() => {
    console.log('----- entered stack screen ----------');
    auth().onAuthStateChanged(firebaseUser => {
      console.log(
        '\n\n\n FIREBASE USER-----------------------  : ',
        firebaseUser,
      );
      dispatch(setFireBaseUser(firebaseUser));
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {firebaseUser ? (
        <>
          <Stack.Screen name="homeScreen" component={HomeScreen} />
          <Stack.Screen name="chatScreen" component={ChatScreen} />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="modalScreen"
              component={ModalScreen}
              options={{presentation: 'modal'}}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="loginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
