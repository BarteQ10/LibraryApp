import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from "../services/api";

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
      api.post(`/Account/login`, {
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
    changePassword: (state, action: PayloadAction<{ currentPassword: string; newPassword: string }>) => {
      const token = localStorage.getItem('token');

      api.put(`/Account/changePassword`, {
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
      api.post(`/Account/register`, {
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