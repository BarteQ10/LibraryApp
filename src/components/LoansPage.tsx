import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchLoans } from '../redux/loansSlice';
import { Table } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';

const LoansPage: React.FC = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state: RootState) => state.loans.loans);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchLoans() as any);
  }, [dispatch]);

  return (
    <div className='gradient-background min-vh-100 ps-2 pe-2'>
      <h5>Loans Page</h5>
      <select className="form-select-md ms-3 mb-2 bg-info" aria-label="Default select example" onChange={(e) => setRowsPerPage(Number(e.target.value))}>
        <option value={5} selected>5 Rows</option>
        <option value={10}>10 Rows</option>
        <option value={20}>20 Rows</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th align="right">Book Name</th>
            <th align="right">User Email</th>
            <th align="right">Borrow Date</th>
            <th align="right">Returned Date</th>
            <th align="right">Is Returned</th>
          </tr>
        </thead>
        <tbody>
          {loans
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((loan) => (
              <tr key={loan.id}>
                <td>{loan.book.title}</td>
                <td align="right">{loan.user.email}</td>
                <td align="right">{new Date(loan.borrowDate).toUTCString()}</td>
                <td align="right">{loan.borrowDate ? new Date(loan.borrowDate).toUTCString(): null}</td>
                <td align="right">{loan.returnDate ? new Date(loan.returnDate).toUTCString(): null}</td>
                <td align="right">{loan.isReturned ? 'Yes' : 'No'}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination className="pb-0 mb-0 justify-content-center">
        <Pagination.First onClick={() => setPage(0)} />
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
        <Pagination.Item onClick={() => setPage(page)} active>{page + 1}</Pagination.Item>
        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === Math.ceil(loans.length / rowsPerPage) - 1} />
        <Pagination.Last onClick={() => setPage(Math.ceil(loans.length / rowsPerPage) - 1)} />
      </Pagination>
    </div>
  );
};

export default LoansPage;