import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Loan } from '../models/Loan';

const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

interface LoansState {
loans: Loan[];
loading: boolean;
error: string | null;
}
const initialState: LoansState = {
loans: [],
loading: false,
error: null,
};

export const fetchLoans = createAsyncThunk('loans/fetchLoans', async () => {
try {
const response = await axios.get(`${apiUrl}/Loans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },});
return response.data;
} catch (error) {
throw Error('Nie udało się pobrać listy wypożyczeń.');
}
});

export const createLoan = createAsyncThunk(
  'loans/createLoan',
  async (loan: Loan, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/Loans`, loan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Nie udało się utworzyć wypożyczenia.');
    }
  }
);

export const deleteLoan = createAsyncThunk(
  'loans/deleteLoan',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/Loans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue('Nie udało się usunąć wypożyczenia.');
    }
  }
);
const loansSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Wystąpił błąd podczas pobierania listy wypożyczeń.";
      })
      .addCase(createLoan.fulfilled, (state, action: PayloadAction<Loan>) => {
        state.loans.push(action.payload);
      })
      .addCase(deleteLoan.fulfilled, (state, action: PayloadAction<number>) => {
        state.loans = state.loans.filter((loan) => loan.id !== action.payload);
      });;
      
  },
});
export default loansSlice.reducer;
