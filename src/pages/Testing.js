import React, { useState } from 'react';
import Data from '../Data2.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

const Testing = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>NIP</TableCell>
                        <TableCell>Position</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                            <TableRow key={data.name}>
                                <TableCell component="th" scope="data">
                                    {data.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {data.nip}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {data.position}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            colSpan={3}
                            count={Data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

export default Testing;
