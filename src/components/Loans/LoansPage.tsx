import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  fetchLoans,
  createLoan,
  endLoan,
  deleteLoan,
} from "../../redux/loansSlice";
import { CreateLoanDTO, EndLoanDTO } from "../../models/Loan";
import LoansTable from "./LoansTable";
import { Loan } from "../../models/Loan";
import LoanReturnAlert from "../../utils/alerts/LoanReturnAlert";
import LoanBorrowAlert from "../../utils/alerts/LoanBorrowAlert";
import LoanDeleteAlert from "../../utils/alerts/LoanDeleteAlert";
import PaginationBar from "../PaginationBar";
import RowsPerPageSelect from "../RowsPerPageSelect";

const LoansPage: React.FC = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state: RootState) => state.loans.loans);
  const loading = useSelector((state: RootState) => state.loans.loading);
  const error = useSelector((state: RootState) => state.loans.error);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showReturnAlert, setShowReturnAlert] = useState(false); // Added state for controlling the LoanReturnAlert
  const [showBorrowAlert, setShowBorrowAlert] = useState(false); // Added state for controlling the LoanBorrowAlert
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // Added state for controlling the LoanDeleteAlert

  useEffect(() => {
    handleFetchLoans();
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFetchLoans = async () => {
    dispatch(fetchLoans() as any);
  };

  const handleBorrow = async (loan: Loan) => {
    const createLoanDTO: CreateLoanDTO = {
      bookId: loan.book.id,
      userId: loan.user.id,
      borrowDate: new Date(),
    };
    await dispatch(createLoan(createLoanDTO) as any);
    await handleFetchLoans();
  };

  const handleReturn = async (loan: Loan): Promise<void> => {
    const endLoanDTO: EndLoanDTO = {
      loanId: loan.id,
      returnDate: new Date(),
    };
    await dispatch(endLoan(endLoanDTO) as any);
    await handleFetchLoans();
  };

  const handleDeleteLoan = async (loanId: number) => {
    await dispatch(deleteLoan(loanId) as any);
    await handleFetchLoans();
  };

  const handleShowReturnAlert = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowReturnAlert(true);
  };

  const handleCloseReturnAlert = () => {
    setSelectedLoan(null);
    setShowReturnAlert(false);
  };

  const handleShowDeleteAlert = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowDeleteAlert(true);
  }

  const handleCloseDeleteAlert = () => {
    setSelectedLoan(null);
    setShowDeleteAlert(false);
  }

  const handleShowBorrowAlert = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowBorrowAlert(true);
  };

  const handleCloseBorrowAlert = () => {
    setSelectedLoan(null);
    setShowBorrowAlert(false);
  }

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
      <RowsPerPageSelect
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={loans.length}
      />
      <LoansTable
        loans={loans}
        onBorrow={handleShowBorrowAlert}
        onReturn={handleShowReturnAlert} // Use handleShowReturnAlert instead of handleReturn
        onDelete={handleShowDeleteAlert}
      />
      {selectedLoan && (
        <>
          <LoanReturnAlert
            loan={selectedLoan}
            onReturn={handleReturn}
            onClose={handleCloseReturnAlert}
            show={showReturnAlert} // Pass the show state to the LoanReturnAlert
          />
          <LoanBorrowAlert
            loan={selectedLoan}
            onBorrow={handleBorrow}
            onClose={handleCloseBorrowAlert}
            show={showBorrowAlert}
          />
          <LoanDeleteAlert
            loan={selectedLoan}
            onDelete={handleDeleteLoan}
            onClose={handleCloseDeleteAlert}
            show={showDeleteAlert}
          />
        </>
      )}
      <PaginationBar
        currentPage={currentPage}
        totalPages={Math.ceil(loans.length / rowsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LoansPage;
