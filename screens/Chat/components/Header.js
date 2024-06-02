import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ArrowLeftIcon, PhoneIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

export default function Header({pageTitle, enabled = false}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ArrowLeftIcon
          size={30}
          color={'red'}
          onPress={() => navigation.goBack()}
        />
        <View style={{margin: 20}}>
          <Text style={{color: '#000000', fontWeight: 600, fontSize: 20}}>
            {pageTitle}
          </Text>
        </View>
      </View>

      {enabled ? (
        <View style={styles.phoneIconView}>
          <PhoneIcon size={20} color={'red'} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  phoneIconView: {borderRadius: 100, padding: 10, backgroundColor: 'pink'},
});
