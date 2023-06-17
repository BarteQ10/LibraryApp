import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Loan, CreateLoanDTO, EndLoanDTO } from '../models/Loan';
import jwt_decode from 'jwt-decode';

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
type Payload = {
  id: number,
  date: Date,
}


export const fetchLoans = createAsyncThunk('loans/fetchLoans', async () => {
try {
  const decodedToken: any = jwt_decode(token||"");
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      await refresh(); 
      const updatedToken = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/Loans`, {
        headers: {
          Authorization: `Bearer ${updatedToken}`,
        },
      });
      return response.data;
    } else {
      const response = await axios.get(`${apiUrl}/Loans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    throw new Error('Nie udało się pobrać listy wypożyczeń.');
  }
});

export const createLoan = createAsyncThunk(
  'loans/createLoan',
  async (loan: CreateLoanDTO, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/loans/create`, loan, {
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

export const startLoan = createAsyncThunk(
  'loans/borrow',
  async ({ id, date }: Payload, thunkAPI) => {
    try {
      const response = await axios.put(`${apiUrl}/loans/borrow/` + id, date, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Nie udało się zakończyć wypożyczenia.');
    }
  }
);

export const endLoan = createAsyncThunk(
  'loans/end',
  async ({ id, date }: Payload, thunkAPI) => {
    try {
      const response = await axios.put(`${apiUrl}/loans/end/` + id, date, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Nie udało się zakończyć wypożyczenia.');
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
async function refresh() {
  try {
    const response = await axios.post(
      `${apiUrl}/Account/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Token został odświeżony'+ response.data);
    localStorage.setItem('token', response.data);
    return response.data;
  } catch (error) {
    console.log('Błąd odświeżenia tokenu', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

