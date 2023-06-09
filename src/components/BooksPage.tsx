import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Book, fetchBooks } from "../redux/booksSlice";
import { Table } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import { Button } from "react-bootstrap";
import BookModal from "./modals/BookModal";
import { BsTrashFill, BsPencilFill } from "react-icons/bs";
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const BooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleFetchBooks = () => {
    dispatch(fetchBooks() as any);
  };

  const handleCloseModal = async () => {
    await handleFetchBooks();
    setShowModal(false);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Reverse the sort direction if the same column is clicked again
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set the new sort column and reset the sort direction to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    handleFetchBooks(); // Initial fetchBooks on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="gradient-background min-vh-100 ps-2 pe-2">
      <h5>Strona wyświetlająca książki</h5>
      <select
        className="form-select-md ms-3 mb-2 bg-info"
        aria-label="Default select example"
        onChange={(e) => setRowsPerPage(Number(e.target.value))}
        value={rowsPerPage}
      >
        <option value={5}>5 Rows</option>
        <option value={10}>10 Rows</option>
        <option value={20}>20 Rows</option>
        <option value={books.length}>All Rows</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>Id</th>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("author")}>Author</th>
            <th onClick={() => handleSort("genre")}>Genre</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th>Cover Image</th>
            <th onClick={() => handleSort("isAvailable")}>Is Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books
            .slice()
            .sort((a, b) => {
              const aValue = a[sortColumn as keyof Book];
              const bValue = b[sortColumn as keyof Book];

              if (aValue !== null && bValue !== null) {
                if (aValue < bValue) {
                  return sortDirection === "asc" ? -1 : 1;
                } else if (aValue > bValue) {
                  return sortDirection === "asc" ? 1 : -1;
                }
              }

              return 0;
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((book) => (
              <tr key={book.id}>
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
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      key="edit-button"
                      onClick={() => {
                        setSelectedBook(book);
                        handleShowModal();
                      }}
                    >
                      <BsPencilFill />
                    </Button>
                    <Button className="btn-danger" key="delete-button">
                      <BsTrashFill />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button
        variant="primary"
        onClick={() => {
          setSelectedBook(null);
          handleShowModal();
        }}
      >
        Add Book
      </Button>
      <Pagination className="pb-0 mb-0 justify-content-center">
        <Pagination.First onClick={() => setPage(0)} disabled={page === 0} />
        <Pagination.Prev
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        />
        <Pagination.Item onClick={() => setPage(page)} active>
          {page + 1}
        </Pagination.Item>
        <Pagination.Next
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(books.length / rowsPerPage) - 1}
        />
        <Pagination.Last
          onClick={() => setPage(Math.ceil(books.length / rowsPerPage) - 1)}
          disabled={page === Math.ceil(books.length / rowsPerPage) - 1}
        />
      </Pagination>
      <BookModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        book={selectedBook}
      />
    </div>
  );
};

export default BooksPage;
