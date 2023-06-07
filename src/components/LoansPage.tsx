import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchLoans } from '../redux/loansSlice';
import { Typography, TablePagination  } from '@mui/material';
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

const LoansPage: React.FC = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state: RootState) => state.loans.loans);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  useEffect(() => {
    dispatch(fetchLoans() as any);
  }, [dispatch]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    dispatch(fetchLoans() as any);
  }, [dispatch]);
  return (
    <div>
      <Typography variant="h5">Loans Page</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>           
            <StyledTableCell align="right">Book Name</StyledTableCell>
            <StyledTableCell align="right">User Email</StyledTableCell>
            <StyledTableCell align="right">Borrow Date</StyledTableCell>
            <StyledTableCell align="right">Returned Date</StyledTableCell>
            <StyledTableCell align="right">Is Returned</StyledTableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
              ? loans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : loans
            ).map((loan) => (
            <StyledTableRow key={loan.id}>
              <StyledTableCell component="th" scope="row">
                {loan.user.email}
              </StyledTableCell>
              <StyledTableCell align="right">{loan.book.title}</StyledTableCell>
              <StyledTableCell align="right">{loan.user.email}</StyledTableCell>
              <StyledTableCell align="right">{new Date(loan.borrowDate).toUTCString()}</StyledTableCell>
              <StyledTableCell align="right">{loan.returnDate ? new Date(loan.returnDate).toUTCString(): null}</StyledTableCell>
              <StyledTableCell align="right">{loan.isReturned ? "true" : "false"}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={loans.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default LoansPage;