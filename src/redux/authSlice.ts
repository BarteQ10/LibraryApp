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
      // Przetwarzanie logiki logowania, np. wywołanie żądania do serwera
      axios.post(`${apiUrl}/Account/login`, {
        email: action.payload.email,
        password: action.payload.password,
      })
        .then(response => {
          // Odpowiedź z serwera zawierająca token
          const token = response.data;

          // Zapisanie tokenu w lokalnym składzie
          // Przykład użycia biblioteki redux-persist
          localStorage.setItem('token', token);

          // Ustawienie stanu uwierzytelnienia na true
          state.isAuthenticated = true;
        })
        .catch(error => {
          // Obsługa błędu logowania
          console.log('Błąd logowania:', error);
        });
    },
    logout: (state) => {
      // Wylogowanie użytkownika
      // Przykład usuwania tokenu z lokalnego składu
      localStorage.removeItem('token');

      // Ustawienie stanu uwierzytelnienia na false
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
