import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      axios.post(`${apiUrl}/Account/login`, {
        email: action.payload.email,
        password: action.payload.password,
      })
        .then(response => {
          const token = response.data;

          localStorage.setItem('token', token);
          state.isAuthenticated = true;
        })
        .catch(error => {
          console.log('Błąd logowania:', error);
        });
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
