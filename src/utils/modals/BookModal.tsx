import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreateBookDTO } from "../../models/Book";
import { createBook, updateBook } from "../../redux/booksSlice";

interface BookModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  book?: CreateBookDTO | null; // Pass the book object for editing
}

const BookModal: React.FC<BookModalProps> = ({
  showModal,
  handleCloseModal,
  book,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  useEffect(() => {
    if (book) {
      // Pre-fill the form fields with book details when editing
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setDescription(book.description);
      setIsAvailable(book.isAvailable !== undefined ? book.isAvailable : true);
    } else {
      // Clear form fields when adding a new book
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setIsAvailable(true);
    }
  }, [book]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      setCoverImage(file);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const form = event.currentTarget;
    const title = (form.querySelector("#title") as HTMLInputElement).value;
    const author = (form.querySelector("#author") as HTMLInputElement).value;
    const genre = (form.querySelector("#genre") as HTMLInputElement).value;
    const description = (
      form.querySelector("#description") as HTMLTextAreaElement
    ).value;
    const newBook: CreateBookDTO = {
      id: book ? book.id : 0,
      title: title,
      author: author,
      genre: genre,
      description: description,
      coverImageFile: coverImage,
      isAvailable: isAvailable,
    };

    if (book) {
      // Dispatch updateBook action when editing a book
      await dispatch<any>(updateBook(newBook));
    } else {
      // Dispatch createBook action when adding a new book
      await dispatch<any>(createBook(newBook));
    }

    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{book ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="isAvailable">
            <Form.Label>Is Available</Form.Label>
            <select
              className="form-control form-control-sm"
              value={isAvailable.toString()}
              onChange={(e) => setIsAvailable(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Form.Group>
          <Form.Group controlId="coverImage">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            {book ? "Save Changes" : "Add Book"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
