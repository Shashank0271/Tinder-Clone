import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/reducers/user';
import loginReducer from './reducers/login';
import logoutReducer from './reducers/logout';
import allUsersReducer from './reducers/homepage';
import likedReducer from './reducers/like';

export default store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    logout: logoutReducer,
    allUsers: allUsersReducer,
    like: likedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
