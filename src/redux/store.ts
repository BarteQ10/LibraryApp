import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import authReducer from './authSlice';
import loansReducer from './loansSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    loans: loansReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
