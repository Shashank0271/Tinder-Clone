import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

export default function MatchedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {currentUser, likedUser} = route.params;

  return (
    <View style={styles.screen}>
      <Image
        source={{uri: 'https://links.papareact.com/mg9'}}
        width={300}
        height={100}
        resizeMode="contain"
      />
      <Text>You and {likedUser.displayName} have liked each other !</Text>

      <View style={styles.photoContainer}>
        <Image source={{uri: currentUser.photoURL}} style={styles.photo} />
        <Image source={{uri: currentUser.photoURL}} style={styles.photo} />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('chatScreen');
        }}
        style={styles.button}>
        <Text style={{color: 'black', alignSelf: 'center', fontWeight: 'bold'}}>
          Send a message
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  photo: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginHorizontal: 20,
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    margin: 40,
  },
  screen: {
    flex: 1,
    backgroundColor: 'red',
    opacity: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
});
