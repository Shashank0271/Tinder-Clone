import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function SentMessage({message}) {
  return (
    <View style={styles.senderMessage}>
      <Text style={{color: 'white'}}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  senderMessage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 'auto',
    marginVertical: 3,
  },
});
