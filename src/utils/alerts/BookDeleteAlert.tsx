import React from "react";
import { Alert, Button } from "react-bootstrap";

interface BookDeleteAlertProps {
  show: boolean;
  bookId: number;
  onClose: () => void;
  onDelete: (bookId: number) => void;
}

const BookDeleteAlert: React.FC<BookDeleteAlertProps> = ({
  show,
  bookId,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(bookId);
    onClose();
  };

  return (
    <>
      {show && (
        <Alert className="alert-fixed" variant="danger" onClose={onClose} dismissible>
          <Alert.Heading>Delete Book</Alert.Heading>
          <p>Are you sure you want to delete this book?</p>
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

export default BookDeleteAlert;
