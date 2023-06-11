import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchLoans, createLoan, endLoan } from "../redux/loansSlice";
import { Table } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import { Loan, CreateLoanDTO, EndLoanDTO } from "../models/Loan";
import { Button } from "react-bootstrap";
import { BsTrashFill, BsCheck2 } from "react-icons/bs";
import LoanReturnAlert from "../utils/alerts/LoanReturnAlert";
import LoanBorrowAlert from "../utils/alerts/LoanBorrowAlert";

const LoansPage: React.FC = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state: RootState) => state.loans.loans);
  const loading = useSelector((state: RootState) => state.loans.loading);
  const error = useSelector((state: RootState) => state.loans.error);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showBorrowConfirmation, setShowBorrowConfirmation] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState<number | null>(null);

  useEffect(() => {
    handleFetchLoans();
  }, []);
  const CreateLoanDTO = (loan: Loan) => {
    const CreateLoanDTO: CreateLoanDTO = {
      bookId: loan.book.id,
      userId: loan.user.id,
      borrowDate: new Date(),
    };
    return CreateLoanDTO;
  };
  const EndLoanDTO = (loan: Loan) => {
    const EndLoanDTO: EndLoanDTO = {
      loanId: loan.id,
      returnDate: new Date(),
    };
    return EndLoanDTO;
  };
  const handleFetchLoans = async () => {
    dispatch(fetchLoans() as any);
  };
  const handleDeleteConfirmation = (loanId: number) => {
    setShowDeleteConfirmation(true);
    console.log(loanId);
  };
  const handleBorrowConfirmation = async (loan: Loan) => {
    setShowBorrowConfirmation(true);
    console.log(loan);
  };
  const handleBorrow = async (loan: Loan) => {
    await dispatch(createLoan(CreateLoanDTO(loan)) as any);
    await handleFetchLoans();
  };
  const handleReturnConfirmation = (loan: Loan) => {
    setShowReturnConfirmation(true);
    console.log(loan);
  };
  const handleReturn = async (loan: Loan) => {
    await dispatch(endLoan(EndLoanDTO(loan)) as any);
    await handleFetchLoans();
  };
  const handleDeleteLoan = async (bookId: number) => {
    // await dispatch(deleteBook(bookId) as any);
    await handleFetchLoans();
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
  if (loading) {
    return (
      <div className="gradient-background min-vh-100 ps-2 pe-2">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="gradient-background min-vh-100 ps-2 pe-2">{error}</div>
    );
  }
  return (
    <div className="gradient-background min-vh-100 ps-2 pe-2">
      <h5>Loans Page</h5>
      <select
        className="form-select-md ms-3 mb-2 bg-info"
        aria-label="Default select example"
        onChange={(e) => setRowsPerPage(Number(e.target.value))}
      >
        <option value={5} selected>
          5 Rows
        </option>
        <option value={10}>10 Rows</option>
        <option value={20}>20 Rows</option>
        <option value={loans.length}>All Rows</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>Id</th>
            <th onClick={() => handleSort("book.title")}>Title</th>
            <th onClick={() => handleSort("user.email")} align="right">
              User Email
            </th>
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
          {loans
            .slice()
            .sort((a, b) => {
              if (sortColumn === "book.title") {
                const aValue = a.book.title;
                const bValue = b.book.title;
                const aString = String(aValue).toLowerCase();
                const bString = String(bValue).toLowerCase();

                return (
                  aString.localeCompare(bString, undefined, {
                    sensitivity: "base",
                  }) * (sortDirection === "asc" ? 1 : -1)
                );
              }
              if (sortColumn === "user.email") {
                const aValue = a.user.email;
                const bValue = b.user.email;
                const aString = String(aValue).toLowerCase();
                const bString = String(bValue).toLowerCase();
                return (
                  aString.localeCompare(bString, undefined, {
                    sensitivity: "base",
                  }) * (sortDirection === "asc" ? 1 : -1)
                );
              }
              const aValue = a[sortColumn as keyof Loan];
              const bValue = b[sortColumn as keyof Loan];
              if (aValue < bValue) {
                return sortDirection === "asc" ? -1 : 1;
              } else if (aValue > bValue) {
                return sortDirection === "asc" ? 1 : -1;
              }
              return 0;
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.book.title}</td>
                <td align="right">{loan.user.email}</td>
                <td align="right">{new Date(loan.borrowDate).toUTCString()}</td>
                <td align="right">
                  {loan.returnDate
                    ? new Date(loan.returnDate).toUTCString()
                    : null}
                </td>
                <td align="right">{loan.isReturned ? "Yes" : "No"}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignContent: "center",
                    }}
                  >
                    {!loan.returnDate ? (
                      <Button
                        className="btn-success"
                        key="edit-button"
                        onClick={() => {
                          setSelectedLoan(loan);
                          handleReturnConfirmation(loan);
                        }}
                      >
                        <BsCheck2 />
                        Return
                      </Button>
                    ) : null}
                    {!loan.borrowDate ? (
                      <Button
                        className="btn-success"
                        key="edit-button"
                        onClick={() => {
                          setSelectedLoan(loan);
                          handleBorrowConfirmation(loan);
                        }}
                      >
                        <BsCheck2 />
                        Borrow
                      </Button>
                    ) : null}
                    <Button
                      className="btn-danger"
                      key="delete-button"
                      onClick={() => {
                        setSelectedLoan(loan);
                        handleDeleteConfirmation(loan.id);
                      }}
                    >
                      <BsTrashFill />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination className="pb-0 mb-0 justify-content-center">
        <Pagination.First onClick={() => setPage(0)} />
        <Pagination.Prev
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        />
        <Pagination.Item onClick={() => setPage(page)} active>
          {page + 1}
        </Pagination.Item>
        <Pagination.Next
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(loans.length / rowsPerPage) - 1}
        />
        <Pagination.Last
          onClick={() => setPage(Math.ceil(loans.length / rowsPerPage) - 1)}
        />
      </Pagination>
      {selectedLoan ? (
        <div>
          <LoanReturnAlert
            show={showReturnConfirmation}
            loan={selectedLoan}
            onClose={() => setShowReturnConfirmation(false)}
            onReturn={handleReturn}
          />
          <LoanBorrowAlert
            show={showBorrowConfirmation}
            loan={selectedLoan}
            onClose={() => setShowBorrowConfirmation(false)}
            onBorrow={handleBorrow}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LoansPage;
