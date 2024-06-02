import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {fetchUserMatches} from '../../../redux/apiCalls/matches';
import Chatrow from './Chatrow';

export default function ChatList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //it triggers a re-render of the component if the part of the state it is selecting has changed.
  const {isFetchingMatches, matches} = useSelector(({match}) => match);
  const {userData: currentUser} = useSelector(({user}) => user);
  const {userId: currentUserId} = currentUser;

  useEffect(() => {
    dispatch(fetchUserMatches(currentUserId));
    //this action changes the state of 'match' ,
    //and we have a use selector selecting the 'match' part of the state
    //the component is going to re-render
  }, []);

  return isFetchingMatches ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>PLEASE WAIT............</Text>
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <FlatList
        data={matches}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <Chatrow item={item} />}
      />
    </SafeAreaView>
  );
}

