import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
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
  async (credentials: { email: string; password: string; confirmPassword: string }, thunkAPI) => {
    try {
      const response = await api.post(`/Account/register`, {
        "email": credentials.email, 
        "password": credentials.password, 
        "confirmPassword": credentials.confirmPassword,
        "role": 0
      });
      return response.data;
    } catch (error: any) {
      let errorMessage = "An unknown error occurred.";
      if (error.response && error.response.data) {
        errorMessage = typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
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
    builder.addCase(register.rejected, (state, action: PayloadAction<any, string, {arg: { email: string; password: string; confirmPassword: string; }; requestId: string; requestStatus: "rejected"; aborted: boolean; condition: boolean; }, SerializedError>) => {
      console.error('Błąd rejestracji:', action);
      state.status = 'failed';
    
      if (action.payload && typeof action.payload === 'string') {
        try {
          const payload = JSON.parse(action.payload);
          if (payload.errors && Object.keys(payload.errors).length > 0) {
            const firstKey = Object.keys(payload.errors)[0];
            if (Array.isArray(payload.errors[firstKey]) && payload.errors[firstKey].length > 0) {
              // Aby wyświetlić tylko pierwszy błąd
              state.error = payload.errors[firstKey][0];
            } else {
              state.error = 'Unknow error';
            }
          } else {
            state.error = payload.title || 'Unknow error';
          }
        } catch(err) {
          state.error = 'Unknow error';
        }
      } else if (action.error && typeof action.error.message === 'string') {
        state.error = action.error.message;
      } else {
        state.error = 'Unknow error';
      }
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
