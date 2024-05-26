import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {signInWithGoogle} from '../redux/apiCalls/auth';
import {useDispatch} from 'react-redux';

export default function LoginScreen() {
  const dispatch = useDispatch();

  return (
    <ImageBackground
      style={{flex: 1}}
      source={{uri: 'https://tinder.com/static/tinder.png'}}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(signInWithGoogle())}>
        <Text style={styles.text}>Sign in & start swiping</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  text: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
  },
});
