import React from "react";
import { Button, Image } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { Book, CreateBookDTO } from "../../models/Book";

type BooksRowProps = {
  book: Book;
  handleDeleteConfirmation: (bookId: number) => void;
  setSelectedBook: (book: Book | null) => void;
  handleShowModal: () => void;
  imageUrl: string;
};
const BookDTO = (book: Book) => {
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
const BooksRow: React.FC<BooksRowProps> = ({
  book,
  handleDeleteConfirmation,
  setSelectedBook,
  handleShowModal,
  imageUrl,
}) => {
  return (
    <tr>
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>{book.description}</td>
      <td>
        {book.coverImage ? (
          <Image
            src={imageUrl + book.coverImage}
            height={"50px"}
            width={"50px"}
            alt="Book Cover"
          />
        ) : null}
      </td>
      <td>{book.isAvailable ? "true" : "false"}</td>
      <td>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            width: "150px",
          }}
        >
          <Button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70px",
            }}
            key="edit-button"
            onClick={() => {
              setSelectedBook(book);
              handleShowModal();
            }}
          >
            <BsPencilFill />
            <span>Edit</span>
          </Button>
          <Button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70px",
            }}
            className="btn-danger"
            key="delete-button"
            onClick={() => handleDeleteConfirmation(book.id)}
          >
            <BsTrashFill />
            <span>Delete</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default BooksRow;
