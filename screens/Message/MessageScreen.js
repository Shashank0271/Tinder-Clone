import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../Chat/components/Header';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import SentMessage from './components/SentMessage';
import ReceivedMessage from './components/ReceivedMessage';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

export default function MessageScreen() {
  const {params} = useRoute();
  const {userData} = useSelector(({user}) => user);
  const {displayName, photoURL} = params.matchedUser;
  const {matchId} = params;
  const [messages, setMessages] = useState();
  const [textMessage, setTextMessage] = useState('');

  const onResult = querySnapshot => {
    setMessages(querySnapshot.docs);
  };

  useEffect(() => {
    const subcriber = firestore()
      .collection('Messages')
      .doc(matchId)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot(onResult, e => console.log(e));

    return () => subcriber();
  }, []);

  const sendMessage = async () => {
    try {
      if (textMessage.trim() !== '') {
        await firestore()
          .collection('Messages')
          .doc(matchId)
          .collection('messages')
          .add({
            userId: userData.userId,
            message: textMessage,
            timeStamp: firestore.FieldValue.serverTimestamp(),
          });
      }
    } catch (e) {
      console.log(e.toString());
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        style={{flex: 1, paddingBottom: 0}}>
        <Header enabled={true} pageTitle={displayName} />

        <FlatList
          data={messages}
          style={{flex: 1, paddingHorizontal: 10}}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            const {message, userId: messageUserId} = item.data();
            return messageUserId === userData.userId ? (
              <SentMessage message={message} />
            ) : (
              <ReceivedMessage message={message} photoURL={photoURL} />
            );
          }}
        />
        <View style={styles.keyboard}>
          <TextInput
            style={styles.input}
            placeholder="Enter message..."
            placeholderTextColor={'grey'}
            multiline
            onChangeText={message => setTextMessage(message)}
          />
          <TouchableHighlight style={styles.button} onPress={sendMessage}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'red'}}>SEND</Text>
            </View>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    alignSelf: 'flex-end',
  },
  button: {
    minWidth: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});
