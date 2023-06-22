import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import { Loan } from "../models/Loan";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

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
  id: number;
  date: Date;
};

export const fetchLoans = createAsyncThunk("loans/fetchLoans", async () => {
  try {
      const response = await api.get(`/Loans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    
  }catch (error) {
    throw new Error("Nie udało się pobrać listy wypożyczeń.");
  }
});

export const createLoan = createAsyncThunk(
  "loans/createLoan",
  async (bookid: number, { rejectWithValue }) => {
    try {
      var userId = 0
      if (token) {
        try {
          const decodedToken: any = jwt_decode(token || "");
          userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          userId = parseInt(userId.toString());
        } catch (err) {
          console.error("Problem with token decoding: ", err);
        }
      }
      
      
      const response = await api.post(
        `/loans/create`,
        {
          bookId: bookid,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Nie udało się utworzyć wypożyczenia.");
    }
  }
);

export const startLoan = createAsyncThunk(
  "loans/borrow",
  async ({ id, date }: Payload, thunkAPI) => {
    try {
      const response = await api.put(`/loans/borrow/` + id, date, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Nie udało się zakończyć wypożyczenia.");
    }
  }
);

export const endLoan = createAsyncThunk(
  "loans/end",
  async ({ id, date }: Payload, thunkAPI) => {
    try {
      const response = await api.put(`/loans/end/` + id, date, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Nie udało się zakończyć wypożyczenia.");
    }
  }
);

export const deleteLoan = createAsyncThunk(
  "loans/deleteLoan",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/Loans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue("Nie udało się usunąć wypożyczenia.");
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
      .addCase(createLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLoan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLoan.fulfilled, (state, action: PayloadAction<number>) => {
        state.loans = state.loans.filter((loan) => loan.id !== action.payload);
      });
  },
});
export default loansSlice.reducer;