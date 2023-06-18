import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Loan } from "../../models/Loan";
import LoanRow from "./LoanRow";

interface LoansTableProps {
  loans: Loan[];
  currentPage: number;
  rowsPerPage: number;
  onBorrow: (loan: Loan) => void;
  onReturn: (loan: Loan) => void;
  onDelete: (loanId: Loan) => void;
}

const LoansTable: React.FC<LoansTableProps> = ({
  loans,
  currentPage,
  rowsPerPage,
  onBorrow,
  onReturn,
  onDelete,
}) => {
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  useEffect(() => {
    const savedSortColumn = localStorage.getItem("loanSortColumn");
    const savedSortDirection = localStorage.getItem("loanSortDirection");
    if (savedSortColumn) setSortColumn(savedSortColumn);
    if (savedSortDirection) setSortDirection(savedSortDirection);
  }, []);

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
      localStorage.setItem("loanSortDirection", sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      localStorage.setItem("loanSortColumn", column);
      setSortDirection("asc");
      localStorage.setItem("loanSortDirection", "asc");
    }
  };

  const sortedLoans = [...loans].sort((a, b) => {
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

  // Pagination
  const startIndex = (currentPage) * rowsPerPage;
  const paginatedLoans = sortedLoans.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => handleSort("id")}>Id</th>
          <th onClick={() => handleSort("user.email")} align="right">
            User Email
          </th>
          <th onClick={() => handleSort("book.title")}>Title</th>         
          <th onClick={() => handleSort("borrowDate")} align="right">
            Borrow Date
          </th>
          <th onClick={() => handleSort("returnedDate")} align="right">
            Returned Date
          </th>
          <th onClick={() => handleSort("isReturned")} align="right">
            Is Returned
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedLoans.map((loan) => (
          <LoanRow
            key={loan.id}
            loan={loan}
            onBorrowConfirmation={() => onBorrow(loan)}
            onReturnConfirmation={onReturn}
            onDeleteConfirmation={() => onDelete(loan)}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default LoansTable;
