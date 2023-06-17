import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import authReducer from './authSlice';
import loansReducer from './loansSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    loans: loansReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
