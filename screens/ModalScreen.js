import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCurrentUserData} from '../redux/apiCalls/user';

export default function ModalScreen() {
  const dispatch = useDispatch();
  const {isFetchingUserData} = useSelector(({user}) => user);
  const navigation = useNavigation();
  const user = useSelector(state => state.user.userData);
  const firebaseUser = useSelector(({user}) => user);
  const [age, setAge] = useState(null);
  const [job, setJob] = useState(null);
  let incompleteForm = !age || !job;

  async function submitForm() {
    dispatch(
      updateCurrentUserData({
        userId: user.uid,
        age: age,
        job: job,
        displayName: user.displayName,
        timeStamp: firestore.FieldValue.serverTimestamp(),
        photoURL: firebaseUser.photoURL,
      }),
    ).then(() => navigation.goBack());
  }

  return isFetchingUserData ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, paddingTop: 40}}>
      <Image
        source={{uri: 'https://links.papareact.com/2pf'}}
        resizeMode="contain"
        height={70}
        style={{marginBottom: 25}}
      />
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: 'black',
            padding: 10,
            fontWeight: 'bold',
            marginBottom: 16,
          }}>
          Welcome {user.displayName}
        </Text>
        <Text style={{color: 'red', padding: 10}}>Step 1 : The job</Text>

        <TextInput
          onChangeText={enteredJob => setJob(enteredJob)}
          placeholder="Enter your occupation"
          placeholderTextColor={'grey'}
          style={{color: 'black'}}
        />

        <Text style={{color: 'red', padding: 10}}>Step 1 : Age</Text>

        <TextInput
          onChangeText={enteredAge => setAge(enteredAge)}
          placeholder="Enter your age"
          placeholderTextColor={'grey'}
          style={{color: 'black'}}
          maxLength={2}
        />
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          backgroundColor: 'red',
          alignSelf: 'center',
          paddingHorizontal: 64,
          paddingVertical: 20,
          borderRadius: 16,
          elevation: 5,
        }}
        onPress={() => {
          if (!incompleteForm) submitForm();
        }}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
