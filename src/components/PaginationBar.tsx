import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
 
const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination className="pb-0 mb-0 justify-content-center">
      <Pagination.First onClick={() => onPageChange(0)} />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      />
      <Pagination.Item onClick={() => onPageChange(currentPage)} active>
        {currentPage + 1}
      </Pagination.Item>
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      />
      <Pagination.Last onClick={() => onPageChange(totalPages - 1)} />
    </Pagination>
  );
};

export default PaginationBar;
