import React, { useState, useEffect } from "react";
import { User } from "../../models/User";
import UsersRow from "./UsersRow";
import { Table } from "react-bootstrap";

interface UsersTableProps {
  users: User[];
  currentPage: number;
  rowsPerPage: number;
  onActivateUser: (userId: number) => void;
  onDeactivateUser: (userId: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  currentPage,
  rowsPerPage,
  onActivateUser,
  onDeactivateUser,
}) => {
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  useEffect(() => {
    const savedSortColumn = localStorage.getItem("userSortColumn");
    const savedSortDirection = localStorage.getItem("userSortDirection");
    if (savedSortColumn) setSortColumn(savedSortColumn);
    if (savedSortDirection) setSortDirection(savedSortDirection);
  }, []);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      localStorage.setItem(
        "userSortDirection",
        sortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      localStorage.setItem("userSortColumn", column);
      setSortDirection("asc");
      localStorage.setItem("userSortDirection", "asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const columnA = a[sortColumn as keyof User];
    const columnB = b[sortColumn as keyof User];

    if (columnA < columnB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });
  // Pagination
  const startIndex = currentPage * rowsPerPage;
  const paginatedLoans = sortedUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => handleSort("id")}>ID</th>
          <th onClick={() => handleSort("email")}>Email</th>
          <th onClick={() => handleSort("role")}>Role</th>
          <th onClick={() => handleSort("isActive")}>Active</th>
          <th style={{ width: "120px" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {paginatedLoans.map((user) => (
          <UsersRow
            key={user.id}
            user={user}
            onActivateUser={onActivateUser}
            onDeactivateUser={onDeactivateUser}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
