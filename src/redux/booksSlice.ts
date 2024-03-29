import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../services/api";
import { Book, CreateBookDTO } from '../models/Book';


interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};
const token = localStorage.getItem('token');
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  try {
    const response = await api.get(`/Books`); 
    if (response.status == 200) {
      return response.data;
    }
  } catch (error:any) {
    throw  Error(error.message ?? 'Failed to fetch books.');
  }
});

export const createBook = createAsyncThunk('books/createBook', async (book: CreateBookDTO, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    formData.append('description', book.description);
    formData.append('isAvailable', book.isAvailable.toString());
    if (book.coverImageFile) {
      formData.append('coverImage', book.coverImageFile);
    }
    const response = await api.post(`/Books`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error:any) {
    throw  Error(error.message ?? 'Failed to add book.');
  }
});

export const updateBook = createAsyncThunk('books/updateBook', async (book: CreateBookDTO) => {
  try {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    formData.append('description', book.description);
    formData.append('isAvailable', book.isAvailable.toString());
    if (book.coverImageFile) {
      formData.append('coverImage', book.coverImageFile);
    }
    const response = await api.put(`/Books/${book.id}`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } 
  catch (error:any) {
    throw  Error(error.message ?? 'Failed to update book.');
  }
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId: number) => {
  try {
    await api.delete(`/Books/${bookId}`,{headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }});
    return bookId;
  } catch (error:any) {
    throw  Error(error.message ?? 'Failed to delete book.');
  }
});
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch books.';
      });
  },
});

export default booksSlice.reducer;
