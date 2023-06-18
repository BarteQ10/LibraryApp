import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Book } from "../../models/Book";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/booksSlice";
import { useSelector } from "react-redux";

// Define your component
const BookUsersPage: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);
  const dispatch: AppDispatch = useDispatch();
  const imageUrl = process.env.REACT_APP_IMAGE_URL;
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="gradient-background min-vh-100 ps-2 pe-2 pt-3">
      <Container>
        <Row>
          {books.map((book: Book) => (
            <Col xs={12} md={6} lg={4} className="mb-4" key={book.id}>
              <Card className="mb-4 h-100 card-custom">
                <Card.Img
                  variant="top"
                  src={imageUrl + book.coverImage}
                  className="card-img-custom"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text className="card-text-custom">
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Genre:</strong> {book.genre} <br />
                    {book.description}
                  </Card.Text>
                  {book.isAvailable ? (
                    <Button variant="primary">Borrow</Button>
                  ) : (
                    <Button variant="secondary" disabled>
                      Unavailable
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BookUsersPage;
