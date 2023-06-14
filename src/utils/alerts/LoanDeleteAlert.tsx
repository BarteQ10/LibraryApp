import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Loan } from "../../models/Loan";

interface LoanDeleteAlertProps {
  show: boolean;
  loan: Loan;
  onClose: () => void;
  onDelete: (loanId: number) => void;
}

const LoanDeleteAlert: React.FC<LoanDeleteAlertProps> = ({
  show,
  loan,
  onClose,
  onDelete,
}) => {
  const handleDelete = async () => {
    onDelete(loan.id);
    onClose();
  };

  return (
    <>
      {show && (
        <Alert className="alert-fixed" variant="danger" onClose={onClose} dismissible>
          <Alert.Heading>Delete Loan</Alert.Heading>
          <p>Are you sure you want to delete Loan with id:{loan.id}?</p>
          <p>Book: {loan.book.title}</p>
          <p>User: {loan.user.email}</p>
          <div className="d-flex justify-content-end">
            <Button onClick={handleDelete} variant="danger" className="me-2">
              Delete
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

export default LoanDeleteAlert;
