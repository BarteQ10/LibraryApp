import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from '../../redux/store';
import { RootState } from "../../redux/store";
import {
  fetchLoans,
  startLoan,
  endLoan,
  deleteLoan,
} from "../../redux/loansSlice";
import LoansTable from "./LoansTable";
import { Loan } from "../../models/Loan";
import LoanReturnAlert from "../../utils/alerts/LoanReturnAlert";
import LoanBorrowAlert from "../../utils/alerts/LoanBorrowAlert";
import LoanDeleteAlert from "../../utils/alerts/LoanDeleteAlert";
import PaginationBar from "../PaginationBar";
import RowsPerPageSelect from "../RowsPerPageSelect";
import { tokenRefreshEventEmitter } from "../../services/api"; 
import Alert from "../../utils/alerts/Alert";
import { Oval } from "react-loader-spinner";
import { AlertObject } from '../../utils/alerts/Alert';

const LoansPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const defaultAlert: AlertObject = {
    show: false,
    header: '',
    message: '',
    variant: 'primary',
  };
  const loans = useSelector((state: RootState) => state.loans.loans);
  const loading = useSelector((state: RootState) => state.loans.loading);
  const error = useSelector((state: RootState) => state.loans.error);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showReturnAlert, setShowReturnAlert] = useState(false);
  const [showBorrowAlert, setShowBorrowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [alert, setAlert] = useState(defaultAlert);
  useEffect(() => {
    if (error) {
      setAlert({ ...defaultAlert, show: true, header: 'Error', message: error, variant: 'danger' });
    }
  }, [error]);
  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  useEffect(() => {
    const handleTokenRefresh = () => {
      dispatch(fetchLoans());
    };
    tokenRefreshEventEmitter.on('tokenRefreshed', handleTokenRefresh);
    return () => {
      tokenRefreshEventEmitter.off('tokenRefreshed', handleTokenRefresh);
    };
  }, [dispatch]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBorrow = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowBorrowAlert(true);
  };

  const handleReturn = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowReturnAlert(true);
  };

  const handleDeleteLoan = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowDeleteAlert(true);
  };

  const handleAlertConfirmation = async () => {
    if (selectedLoan) {
      if (showReturnAlert) {
        await dispatch(endLoan({ id: selectedLoan.id, date: new Date() }));
      } else if (showBorrowAlert) {
        await dispatch(startLoan({ id: selectedLoan.id, date: new Date() }));
      } else if (showDeleteAlert) {
        await dispatch(deleteLoan(selectedLoan.id));
      }
      setShowReturnAlert(false);
      setShowBorrowAlert(false);
      setShowDeleteAlert(false);
      dispatch(fetchLoans());
    }
  };

  const handleAlertClose = () => {
    setShowReturnAlert(false);
    setShowBorrowAlert(false);
    setShowDeleteAlert(false);
  };

  if (loading) {
    return (
      <div className="gradient-background d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Oval color="#00BFFF" height={100} width={100}/>
      </div>
    );
  }
  if (error) {
    return (
      <div className="gradient-background min-vh-100 ps-2 pe-2 pt-3">
          <Alert show={alert.show}
            header={alert.header}
            message={alert.message}
            variant={alert.variant}
            onClose={() => setAlert({...alert, show: false})}  
          />
      </div>
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
        onBorrow={handleBorrow}
        onReturn={handleReturn}
        onDelete={handleDeleteLoan} 
        currentPage={currentPage} 
        rowsPerPage={rowsPerPage}      
      />
      {selectedLoan && (
        <>
          <LoanReturnAlert
            loan={selectedLoan}
            onReturn={handleAlertConfirmation}
            onClose={handleAlertClose}
            show={showReturnAlert}
          />
          <LoanBorrowAlert
            loan={selectedLoan}
            onBorrow={handleAlertConfirmation}
            onClose={handleAlertClose}
            show={showBorrowAlert}
          />
          <LoanDeleteAlert
            loan={selectedLoan}
            onDelete={handleAlertConfirmation}
            onClose={handleAlertClose}
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
