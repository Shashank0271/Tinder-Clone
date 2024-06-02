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
        querySnapshot => {
          console.log('onSnapshot triggered');
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const {message : lastMessage} = doc.data();
            setLastMessage(lastMessage);
          } 
        },
        error => {
          console.error('Error fetching snapshot:', error);
        },
      );
    // Cleanup function to unsubscribe from the listener
    return () => {
      console.log('Unsubscribing from snapshot listener');
      subscriber();
    };
  }, [item.matchId]);

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
