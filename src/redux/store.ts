import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
