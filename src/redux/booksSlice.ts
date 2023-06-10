import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Book, CreateBookDTO } from '../models/Book';

const apiUrl = process.env.REACT_APP_API_URL;


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
    const response = await axios.get(`${apiUrl}/Books`); 
    return response.data;
  } catch (error) {
    throw Error('Nie udało się pobrać listy książek.');
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
    const response = await axios.post(`${apiUrl}/Books`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw Error('Nie udało się dodać książki.');
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
    const response = await axios.put(`${apiUrl}/Books/${book.id}`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw Error('Nie udało się zaktualizować książki.');
  }
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId: number) => {
  try {
    await axios.delete(`${apiUrl}/Books/${bookId}`,{headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }});
    return bookId;
  } catch (error) {
    throw Error('Nie udało się usunąć książki.');
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
        state.error = action.error.message ?? 'Wystąpił błąd podczas pobierania listy książek.';
      });
  },
});

export default booksSlice.reducer;
