import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/reducers/user';
import loginReducer from './reducers/login';
import logoutReducer from './reducers/logout';
import allUsersReducer from './reducers/allUsers';
export default store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    logout: logoutReducer,
    allUsers: allUsersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
