import React from "react";

interface RowsPerPageSelectProps {
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  totalRows: number;
}

const RowsPerPageSelect: React.FC<RowsPerPageSelectProps> = ({
  rowsPerPage,
  setRowsPerPage,
  totalRows,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  return (
    <select
      className="form-select-md ms-3 mb-2 bg-info"
      aria-label="Default select example"
      onChange={handleChange}
      value={rowsPerPage}
    >
      <option value={5}>5 Rows</option>
      <option value={10}>10 Rows</option>
      <option value={20}>20 Rows</option>
      <option value={totalRows}>All Rows</option>
    </select>
  );
};

export default RowsPerPageSelect;
