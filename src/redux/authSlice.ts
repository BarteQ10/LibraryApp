import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../services/api";
import jwt_decode from "jwt-decode";
interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await api.post(`/Account/login`, credentials);
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string; confirmPassword: string }) => {
    const response = await api.post(`/Account/register`, credentials);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (credentials: { currentPassword: string; newPassword: string }) => {
    const response = await api.put(`/Account/changePassword`, credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) =>{
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.jwtToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      const decodedToken: any = jwt_decode(action.payload.jwtToken || "");
      localStorage.setItem('userId', decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
      state.isAuthenticated = true;
      state.status = 'succeeded';
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('Błąd logowania:', action.error);
      state.status = 'failed';
      state.error = action.error.message || null;
    });
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(register.fulfilled, (state, action) => {});
    builder.addCase(register.rejected, (state, action) => {
      console.log('Błąd rejestracji:', action.error);
      state.status = 'failed';
      state.error = action.error.message || null;
    });
    builder.addCase(register.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {});
    builder.addCase(changePassword.rejected, (state, action) => {
      console.log('Błąd zmiany hasła:', action.error);
      state.status = 'failed';
      state.error = action.error.message || null;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.status = 'loading';
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
