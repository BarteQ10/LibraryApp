import React from "react";
import { Loan } from "../../models/Loan";
import { Button } from "react-bootstrap";
import { BsTrashFill, BsCheck2 } from "react-icons/bs";

interface LoanRowProps {
  loan: Loan;
  onBorrowConfirmation: (loan: Loan) => void;
  onReturnConfirmation: (loan: Loan) => void;
  onDeleteConfirmation: (loanId: number) => void;
}

const LoanRow: React.FC<LoanRowProps> = ({
  loan,
  onBorrowConfirmation,
  onReturnConfirmation,
  onDeleteConfirmation,
}) => {
  return (
    <tr>
      <td>{loan.id}</td>
      <td align="right">{loan.user.email}</td>
      <td>{loan.book.title}</td> 
      <td align="right">
        {loan.borrowDate ? new Date(loan.borrowDate).toUTCString() : null}
      </td>
      <td align="right">
        {loan.returnDate ? new Date(loan.returnDate).toUTCString() : null}
      </td>
      <td align="right">{loan.isReturned ? "Yes" : "No"}</td>
      <td>
        <div style={{ display: "flex", gap: "10px", alignContent: "center" }}>
          {!loan.borrowDate ? (
            <Button
              className="btn-success"
              onClick={() => onBorrowConfirmation(loan)}
            >
              <BsCheck2 />
              Borrow
            </Button>
          ) : null}
          {!loan.returnDate && loan.borrowDate ? (
            <Button
              className="btn-success"
              onClick={() => onReturnConfirmation(loan)}
            >
              <BsCheck2 />
              Return
            </Button>
          ) : null}

          <Button
            className="btn-danger"
            onClick={() => onDeleteConfirmation(loan.id)}
          >
            <BsTrashFill />
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default LoanRow;
