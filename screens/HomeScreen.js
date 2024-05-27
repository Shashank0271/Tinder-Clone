import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {signOutWithGoogle} from '../redux/apiCalls/auth';
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {fetchCurrentUserData} from '../redux/apiCalls/user';
import {fetchHomePageUsers} from '../redux/apiCalls/allUsers';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const {firebaseUser, isFetchingUserData, userData} = useSelector(
    ({user}) => user,
  );
  const {allUsersList, fetchingAllUsersData} = useSelector(
    ({allUsers}) => allUsers,
  );
  let swipedAll = false;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCurrentUserData(firebaseUser.uid));
      dispatch(fetchHomePageUsers(firebaseUser.uid));
      if (!isFetchingUserData && Object.keys(userData).length === 0) {
        //user is not present in firestore :
        navigation.navigate('modalScreen');
      }
    };
    fetchData();
  }, []);

  const swipeRightHandler = async ({likedUser, firebaseUid}) => {
    try {
      const {userId: likedUserId} = likedUser;

      await firestore()
        .collection('Users')
        .doc(firebaseUid)
        .collection('liked')
        .doc(likedUserId)
        .set(likedUser);

      //check if a match is there
      const likedUsersLikedList = await firestore()
        .collection('Users')
        .doc(likedUserId)
        .collection('liked')
        .get()
        .then(collectionQuerySnapshot =>
          collectionQuerySnapshot.docs.map(
            likedUserDoc => likedUserDoc.data().userId,
          ),
        );

      const matched = likedUsersLikedList.includes(firebaseUid);
      
      if (matched) {
        //navigate to matched page :
        navigation.navigate('matchedScreen', {
          currentUser: userData,
          likedUser,
        });
      }
    } catch (e) {
      throw new Error('error in adding user to liked : ---> \t', e.toString());
    }
  };

  const swipeLeftHandler = async ({passedUser, firebaseUid}) => {
    try {
      await firestore()
        .collection('Users')
        .doc(firebaseUid)
        .collection('passed')
        .doc(passedUser.userId)
        .set(passedUser);
    } catch (e) {
      throw new Error('error in adding user to passed : ---> \t', e.toString());
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {!firebaseUser || fetchingAllUsersData || isFetchingUserData ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black'}}>PLEASE WAIT............</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Sign out?',
                  'Are you sure you want to logout ?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        dispatch(signOutWithGoogle());
                      },
                      style: 'default',
                    },
                  ],
                  {cancelable: true},
                )
              }>
              <Image
                source={{uri: firebaseUser.photoURL}}
                style={styles.profile_pic}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('modalScreen')}>
              <Image
                style={styles.tinder_logo}
                source={require('../assets/images/tinder-logo.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('chatScreen')}>
              <ChatBubbleOvalLeftIcon color={'red'} size={40} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Swiper
              ref={swiperRef}
              cards={allUsersList}
              containerStyle={{backgroundColor: 'transparent'}}
              renderCard={card => {
                return card ? (
                  <View key={card.id} style={styles.container}>
                    <Text style={styles.text}>{card.data().displayName}</Text>
                    <Text style={styles.title}>{card.data().age}</Text>
                  </View>
                ) : (
                  <View style={styles.container}>
                    <Image
                      height={100}
                      width={100}
                      source={{uri: 'https://links.papareact.com/6gb'}}
                    />
                  </View>
                );
              }}
              onSwiped={cardIndex => {
                console.log(cardIndex);
              }}
              onSwipedAll={() => {
                // swipedAll = true;
              }}
              onSwipedRight={async index => {
                const currentCard = allUsersList[index];
                await swipeRightHandler({
                  likedUser: currentCard.data(),
                  firebaseUid: firebaseUser.uid,
                });
              }}
              onSwipedLeft={async index => {
                const currentCard = allUsersList[index];
                await swipeLeftHandler({
                  passedUser: currentCard.data(),
                  firebaseUid: firebaseUser.uid,
                });
              }}
              verticalSwipe={false}
              cardIndex={0}
              backgroundColor={'#FFFFFF'}
              stackSize={5}
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  style: {
                    label: {
                      textAlign: 'right',
                    },
                  },
                },
                right: {
                  title: 'YES',
                  style: {
                    label: {
                      textAlign: 'left',
                    },
                  },
                },
              }}
            />
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity
              onPress={() => {
                if (!swipedAll) swiperRef.current.swipeLeft();
              }}
              style={{padding: 20, borderRadius: 50, backgroundColor: 'pink'}}>
              <XMarkIcon size={20} color={'red'}></XMarkIcon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!swipedAll) swiperRef.current.swipeRight();
              }}
              style={styles.heartIcon}>
              <HeartIcon size={20} color={'green'}></HeartIcon>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tinder_logo: {width: 40, height: 40, resizeMode: 'contain'},
  profile_pic: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  header: {
    padding: 10,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: 'white',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: '75%',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    color: 'black',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'italic',
    color: 'black',
    fontSize: 20,
  },
  heartIcon: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'lightgreen',
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 50,
  },
});
