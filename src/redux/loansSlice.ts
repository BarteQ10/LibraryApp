import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');
interface Loan {
id: number;
borrowDate: Date;
returnDate: Date;
isReturned: boolean;
book: Book;
user: User;
}
interface Book {
id: number;
title: string;
author: string;
genre: string;
description: string;
coverImage: string;
isAvailable: boolean;
}
interface User {
id: number;
email: string;
role: string;
}
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
      });
  },
});
export default loansSlice.reducer;
