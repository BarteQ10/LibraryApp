import React, { useState } from "react";
import { Table, Button, Image } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import BooksRow from "./BooksRow";
import { Book } from "../../models/Book";

type BooksTableProps = {
  books: Book[];
  currentPage: number;
  rowsPerPage: number;
  handleDeleteConfirmation: (bookId: number) => void;
  setSelectedBook: (book: Book | null) => void;
  handleShowModal: () => void;
  imageUrl: string;
};

const BooksTable: React.FC<BooksTableProps> = ({
  books,
  currentPage,
  rowsPerPage,
  handleDeleteConfirmation,
  setSelectedBook,
  handleShowModal,
  imageUrl,
}) => {
const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const getColumnValue = (obj: any, column: string) => {
    const properties = column.split(".");
    let value = obj;
    for (const prop of properties) {
      value = value[prop];
    }
    return value;
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedLoans = [...books].sort((a, b) => {
    const columnA = getColumnValue(a, sortColumn);
    const columnB = getColumnValue(b, sortColumn);

    if (columnA < columnB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });
  return (
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
            if (aValue < bValue) {
              return sortDirection === "asc" ? -1 : 1;
            } else if (aValue > bValue) {
              return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
          })
          .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
          .map((book) => (
            <BooksRow
              key={book.id}
              book={book}
              handleDeleteConfirmation={handleDeleteConfirmation}
              setSelectedBook={setSelectedBook}
              handleShowModal={handleShowModal}
              imageUrl={imageUrl}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default BooksTable;
