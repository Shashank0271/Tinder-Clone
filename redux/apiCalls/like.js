import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {setMatched} from '../reducers/like';

//make this as a seperate slice
const generateMatchId = (id1, id2) => {
  return id1 < id2 ? id1 + id2 : id2 + id1;
};

export const addToLikedUsers = createAsyncThunk(
  'addToLikedUsers',
  async ({likedUser, currentUser}, {rejectWithValue, dispatch}) => {
    try {
      const {userId: likedUserId} = likedUser;
      const {userId: currentUserId} = currentUser;

      //record the swipe
      await firestore()
        .collection('Users')
        .doc(currentUserId)
        .collection('liked')
        .doc(likedUserId)
        .set(likedUser);

      //check if the other user has liked  you (you = the logged in user)
      await firestore()
        .collection('Users')
        .doc(likedUserId)
        .collection('liked')
        .doc(currentUserId)
        .get()
        .then(async documentSnapshot => {
          if (documentSnapshot.exists) {
            //its a MATCH !!!!!

            //create the match
            const matchId = generateMatchId(currentUserId, likedUserId);
            await firestore()
              .collection('Matches')
              .doc(matchId)
              .set({
                users: {
                  [currentUserId]: currentUser,
                  [likedUserId]: likedUser,
                },
                usersMatched: [currentUserId, likedUserId],
                timestamp: firestore.FieldValue.serverTimestamp(),
              })
              //update the state to matched
              .then(() => dispatch(setMatched({matched: true, likedUser})))
              .catch(e => console.log(e.toString()));

            return likedUser;
          } else {
            //make sure the state is updated
            dispatch(setMatched({matched: false, likedUser: null}));
          }
        });
    } catch (e) {
      console.log(e.toString());
      return rejectWithValue(
        'error in adding user to liked : ---> \t',
        e.toString(),
      );
    }
  },
);


