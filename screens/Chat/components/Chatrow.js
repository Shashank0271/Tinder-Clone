import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function Chatrow({item}) {
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState('Say Hi !');

  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .doc(item.matchId)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .limit(1)
      .onSnapshot(
        querySnapShot => {
          const {message: lastMessage} = querySnapShot.docs[0]?.data();
          setLastMessage(lastMessage);
        },
        err => {
          console.log(err);
        },
      );

    return subscriber();
  }, []);

  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('messageScreen', {
          matchedUser: item.matchedUser,
          matchId: item.matchId,
        })
      }
      style={{borderRadius: 20}}>
      <View style={styles.chatbox}>
        <Image
          source={{uri: item.matchedUser.photoURL}}
          width={50}
          height={50}
          style={{borderRadius: 100}}
        />
        <View style={styles.chatTileText}>
          <Text style={styles.name}>{item.matchedUser.displayName}</Text>
          <Text style={{color: 'black'}}>{lastMessage}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  chatbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
  },
  chatTileText: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 15,
  },
  name: {color: 'black', fontWeight: 'bold'},
});
