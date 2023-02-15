import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';

const TableChecklessList = (props) => {
    const pagesArray = props.ItemsPerPageArray || [25, 50, 150, 250, 500]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pagesArray[0]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return <Paper sx={{ width: '100%', overflow: 'hidden', p: '1rem' }}>
        <Typography variant="h4" component="h4">{props.title}</Typography>
        {props.children}
        <TablePagination
            rowsPerPageOptions={pagesArray}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {props.headers.map((column) => (
                            <TableCell
                                key={column.id}
                                align={props.align || 'center'}
                                // style={{ minWidth: column.minWidth  }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item.code} onClick={props.onClick}>
                                    {props.headers.map((column) => {
                                        const value = item[column.id];
                                        return (
                                            <TableCell key={column.id} align={props.align || 'center'}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}
export default TableChecklessList;