import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Loan } from "../../models/Loan";

interface LoanReturnAlertProps {
  show: boolean;
  loan: Loan;
  onClose: () => void;
  onReturn: (loan: Loan) => void;
}

const LoanReturnAlert: React.FC<LoanReturnAlertProps> = ({
  show,
  loan,
  onClose,
  onReturn,
}) => {
  const handleDelete = () => {
    onReturn(loan);
    onClose();
  };

  return (
    <>
      {show && (
        <Alert className="alert-fixed" variant="success" onClose={onClose} dismissible>
          <Alert.Heading>Return Book</Alert.Heading>
          <p>Are you sure you want to return {loan.book.title}?</p>
          <p>Id Loan:{loan.id}</p>
          <div className="d-flex justify-content-end">
            <Button onClick={handleDelete} variant="success" className="me-2">
              Return
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

export default LoanReturnAlert;
