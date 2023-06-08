import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchBooks } from '../redux/booksSlice';
import { Table } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';

const imageUrl = process.env.REACT_APP_IMAGE_URL;

const BooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  useEffect(() => {
    dispatch(fetchBooks() as any);
  }, [dispatch]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  useEffect(() => {
    dispatch(fetchBooks() as any);
  }, [dispatch]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className='gradient-custom min-vh-100 ps-2 pe-2'>
      <h5>Strona wyświetlająca książki</h5>
      <select className="form-select-md ms-3 mb-2" aria-label="Default select example" onChange={(e) => setRowsPerPage(Number(e.target.value))}>
        <option value={5} selected>5 Pages</option>
        <option value={10}>10 Pages</option>
        <option value={20}>20 Pages</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genere</th>
            <th>Description</th>
            <th>Cover Image</th>
            <th>Is Available</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
              ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : books
            ).map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
              <td>{book.coverImage ? (
    <Image src={imageUrl+book.coverImage} height={"50px"} width={"50px"} alt="Book Cover" />
  ) : (
    null)}</td>
              <td>{book.isAvailable ? "true" : "false"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="pb-0 mb-0 justify-content-center">
        <Pagination.First onClick={() => setPage(0)} />
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
        <Pagination.Item onClick={() => setPage(page)} active>{page + 1}</Pagination.Item>
        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === Math.ceil(books.length / rowsPerPage) - 1} />
        <Pagination.Last onClick={() => setPage(Math.ceil(books.length / rowsPerPage) - 1)} />
      </Pagination>
    </div>    
  );
};

export default BooksPage;