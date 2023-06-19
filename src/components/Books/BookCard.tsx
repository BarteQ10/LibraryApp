import React from "react";
import { Card, Button } from "react-bootstrap";
import { Book } from "../../models/Book";
import { ArrowRightCircle } from 'react-bootstrap-icons';

interface BookCardProps {
  book: Book;
  onBorrow: (bookId: number) => void;
  imageUrl: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBorrow, imageUrl }) => {
  return (
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
          <Button variant="primary" onClick={() => onBorrow(book.id)}>
            Borrow <ArrowRightCircle />
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Unavailable
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookCard;