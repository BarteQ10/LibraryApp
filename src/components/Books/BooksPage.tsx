import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchBooks, deleteBook } from "../../redux/booksSlice";
import { Book, CreateBookDTO } from "../../models/Book";
import { Button } from "react-bootstrap";
import BookModal from "../../utils/modals/BookModal";
import BookDeleteAlert from "../../utils/alerts/BookDeleteAlert";
import RowsPerPageSelect from "../RowsPerPageSelect";
import PaginationBar from "../PaginationBar";
import BooksTable from "./BooksTable";
import { BsPlusCircle } from "react-icons/bs";
import { Oval } from "react-loader-spinner";
import Alert from "../../utils/alerts/Alert";
import { AlertObject } from '../../utils/alerts/Alert';
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const BooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const defaultAlert: AlertObject = {
    show: false,
    header: '',
    message: '',
    variant: 'primary',
  };
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const [alert, setAlert] = useState(defaultAlert);
  useEffect(() => {
    if (error) {
      setAlert({ ...defaultAlert, show: true, header: 'Error', message: error, variant: 'danger' });
    }
  }, [error]);
  const BookDTO = (book: Book | null): CreateBookDTO | null => {
    if (!book) return null;

    const BookDTO: CreateBookDTO = {
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      coverImageFile: null,
      isAvailable: book.isAvailable,
    };
    return BookDTO;
  };
  const handleShowModal = () => setShowModal(true);
  const handleFetchBooks = () => {
    dispatch(fetchBooks() as any);
  };

  const handleCloseModal = async () => {
    await handleFetchBooks();
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleDeleteConfirmation = (bookId: number) => {
    setBookToDelete(bookId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteBook = async (bookId: number) => {
    await dispatch(deleteBook(bookId) as any);
    await handleFetchBooks();
  };

  useEffect(() => {
    handleFetchBooks(); // Initial fetchBooks on component mount
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="gradient-background d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Oval color="#00BFFF" height={100} width={100}/>
      </div>
    );
  }
  if (error) {
    return (
      <div className="gradient-background min-vh-100 ps-2 pe-2 pt-3">
          <Alert show={alert.show}
            header={alert.header}
            message={alert.message}
            variant={alert.variant}
            onClose={() => setAlert({...alert, show: false})}  
          />
      </div>
    );
  }

  return (
    <div className="gradient-background min-vh-100 ps-2 pe-2">
      <h5>Strona wyświetlająca książki</h5>
      <RowsPerPageSelect
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={books.length}
      />
      <BooksTable
        books={books}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handleDeleteConfirmation={handleDeleteConfirmation}
        setSelectedBook={setSelectedBook}
        handleShowModal={handleShowModal}
        imageUrl={imageUrl || ""}
      />
      <Button
        variant="success"
        onClick={() => {
          setSelectedBook(null);
          handleShowModal();
        }}
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BsPlusCircle />
        <span>Add Book</span>
      </Button>
      <PaginationBar
        currentPage={currentPage}
        totalPages={Math.ceil(books.length / rowsPerPage)}
        onPageChange={handlePageChange}
      />
      <BookModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        book={BookDTO(selectedBook)}
      />
      <BookDeleteAlert
        show={showDeleteConfirmation}
        bookId={bookToDelete || 0}
        onClose={() => setShowDeleteConfirmation(false)}
        onDelete={handleDeleteBook}
      />
    </div>
  );
};

export default BooksPage;
