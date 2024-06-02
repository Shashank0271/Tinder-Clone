import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function ReceivedMessage({message, photoURL}) {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginRight: 'auto'}}>
      <Image
        source={{uri: photoURL}}
        width={40}
        height={40}
        borderRadius={50}
        resizeMethod="contain"
      />
      <View style={styles.receivedMessage}>
        <Text style={{color: 'white'}}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  receivedMessage: {
    borderTopStartRadius: 0,
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 3,
    marginLeft: 3,
  },
});
