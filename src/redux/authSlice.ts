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
    refresh: (state, action:PayloadAction) => {
      const token = localStorage.getItem('token');

      axios.put(`${apiUrl}/Account/refresh`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Token został odświeżony');
        })
        .catch(error => {
          console.log('Błąd odświeżenia tokenu', error);
        });
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
    },
    changePassword: (state, action: PayloadAction<{ currentPassword: string; newPassword: string }>) => {
      const token = localStorage.getItem('token');

      axios.put(`${apiUrl}/Account/changePassword`, {
        currentPassword: action.payload.currentPassword,
        newPassword: action.payload.newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Hasło zostało zmienione');
        })
        .catch(error => {
          console.log('Błąd zmiany hasła:', error);
        });
    },
    register: (state, action: PayloadAction<{ email: string; password: string; confirmPassword: string}>) => {
      axios.post(`${apiUrl}/Account/register`, {
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
        role: 0,
      })
        .then(response => {
          console.log('Konto zostało utworzone');
        })
        .catch(error => {
          console.log('Błąd rejestracji:', error);
        });
    },
  },
});

export const { login, logout, changePassword, register } = authSlice.actions;
export default authSlice.reducer;