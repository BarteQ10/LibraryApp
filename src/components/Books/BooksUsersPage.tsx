import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Book } from "../../models/Book";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/booksSlice";
import { useSelector } from "react-redux";
import BooksFilter from "../Books/BooksFilter";
import BookCard from "./BookCard";
import { createLoan } from "../../redux/loansSlice";
import Alert from '../../utils/alerts/Alert';

const BookUsersPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger" | "warning" | "info" | "primary" | "secondary" | "light" | "dark">("success");
  const [filterKey, setFilterKey] = useState<
    "title" | "genre" | "author" | null
  >(null);
  const [filterValue, setFilterValue] = useState("");
  const [sortKey, setSortKey] = useState<"title" | "genre" | "author" | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.loans.loading);
  const error = useSelector((state: RootState) => state.loans.error);
  const dispatch: AppDispatch = useDispatch();
  const imageUrl = process.env.REACT_APP_IMAGE_URL;

  useEffect(() => {
    if (!loading) {
      dispatch(fetchBooks());
    }
  }, [dispatch, loading]);

  const filteredBooks =
    filterKey && filterValue
      ? books.filter((book: Book) =>
          book[filterKey].toLowerCase().includes(filterValue.toLowerCase())
        )
      : books;

  const sortedBooks = sortKey
    ? [...filteredBooks].sort((a, b) =>
        sortOrder === "asc"
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey])
      )
    : filteredBooks;
    const handleBorrow = async (bookId: number) => {
      try {
        await dispatch(createLoan(bookId)).unwrap(); // Added .unwrap() to propagate the error if the promise is rejected
        await dispatch(fetchBooks());
        setAlertMessage("Book borrowed successfully!");
        setAlertVariant("success");
      } catch (error:any) {
        setAlertMessage(error.message || "Failed to borrow book."); // Display the actual error message if available
        setAlertVariant("danger");
      } finally {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);  // Hide the alert after 3 seconds
      }
    };
  return (
    <div className="gradient-background min-vh-100 ps-2 pe-2 pt-3">
      <Container>
        {showAlert && <Alert header="Borrow Book" message={alertMessage} variant={alertVariant} show={showAlert}/>}
        <BooksFilter
          onFilterChange={(key, value) => {
            setFilterKey(key);
            setFilterValue(value);
          }}
          onSortChange={(key, order) => {
            setSortKey(key);
            setSortOrder(order);
          }}
        />
        <Row>
          {sortedBooks.map((book: Book) => (
            <Col xs={12} md={6} lg={4} className="mb-4" key={book.id}>
              <BookCard
                book={book}
                onBorrow={handleBorrow}
                imageUrl={imageUrl || ""}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BookUsersPage;
