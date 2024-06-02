import {View, Text, Button} from 'react-native';
import React, {useDebugValue, useEffect, useState} from 'react';
import Header from './components/Header';
import ChatList from './components/ChatList';
export default function ChatScreen() {
  return (
    <View style={{flex: 1}}>
      <Header pageTitle={'Chat'} />
      <ChatList />
    </View>
  );
}
