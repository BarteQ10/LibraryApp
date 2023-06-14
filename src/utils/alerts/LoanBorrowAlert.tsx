import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Loan } from "../../models/Loan";

interface LoanBorrowAlertProps {
  show: boolean;
  loan: Loan;
  onClose: () => void;
  onBorrow: (loan: Loan) => void; // Update the parameter type to 'loan: Loan'
}

const LoanBorrowAlert: React.FC<LoanBorrowAlertProps> = ({
  show,
  loan,
  onClose,
  onBorrow,
}) => {
  const handleDelete = () => {
    onBorrow(loan);
    onClose();
  };

  return (
    <>
      {show && (
        <Alert className="alert-fixed" variant="success" onClose={onClose} dismissible>
          <Alert.Heading>Borrow Book</Alert.Heading>
          <p>Are you sure you want to borrow {loan.book.title}?</p>
          <p>Id Loan:{loan.id}</p>
          <div className="d-flex justify-content-end">
            <Button onClick={handleDelete} variant="success" className="me-2">
              Borrow
            </Button>
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
};

export default LoanBorrowAlert;
