import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchBooks } from '../redux/booksSlice';

const BooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);

  useEffect(() => {
    // Pobranie listy książek po załadowaniu strony
    dispatch(fetchBooks() as any); // Dodaj rzutowanie na typ 'any'
  }, [dispatch]);

  return (
    <div>
      <h2>Strona wyświetlająca książki</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
