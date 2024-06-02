import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/reducers/user';
import loginReducer from './reducers/login';
import logoutReducer from './reducers/logout';
import allUsersReducer from './reducers/homepage';
import likedReducer from './reducers/like';
import matchReducer from './reducers/matches';

//each slide reducer manages a different part of the global state tree
export default store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    logout: logoutReducer,
    allUsers: allUsersReducer,
    like: likedReducer,
    match: matchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

