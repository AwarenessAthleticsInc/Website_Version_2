import * as React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
    Paper,
    Checkbox
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const TeamList = (props) => {
    const ItemsPerRow = props.ItemsPerRow || [25, 50, 100, 150, 250]
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('team');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(ItemsPerRow[0]);

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.data.map((item) => item._id);
            props.onClick && props.onClick(event, newSelecteds);
            return;
        }
        props.onClick && props.onClick(event, []);
    };

    const handleClick = (event, id, row) => {
        const selectedIndex = props.selected.indexOf(id);
        let newSelected = [];
        let newRow = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(props.selected, id);
            newRow = newRow.concat(props.selectedRow, row);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(props.selected.slice(1));
            newRow = newRow.concat(props.selectedRow.slice(1));
        } else if (selectedIndex === props.selected.length - 1) {
            newSelected = newSelected.concat(props.selected.slice(0, -1));
            newRow = newRow.concat(props.selectedRow.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                props.selected.slice(0, selectedIndex),
                props.selected.slice(selectedIndex + 1),
            );
            newRow = newRow.concat(
                props.selectedRow.slice(0, selectedIndex),
                props.selectedRow.slice(selectedIndex + 1)
            );
        }
        props.onClick && props.onClick(event, newSelected, newRow);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };
    const isSelected = (id) => props.selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

    const TableHeader = (props) => {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        const headers = [
            {
                id: 'team',
                numeric: false,
                disablePadding: true,
                label: 'Team',
            },
            {
                id: 'captain',
                numeric: false,
                disablePadding: false,
                label: 'Captain',
            },
            {
                id: 'cell',
                numeric: false,
                disablePadding: false,
                label: 'Cell',
            },
            {
                id: 'email',
                numeric: false,
                disablePadding: false,
                label: 'E-mail Address',
            },
            {
                id: 'status',
                numeric: false,
                disablePadding: false,
                label: 'Status',
            }
        ];
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headers.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={props.align || 'center'}
                            padding='normal'
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    return <Paper sx={{ width: '100%', p: '1rem', mt: '1rem', mb: '1rem' }}>
        <Typography variant="h4" component="h4">{props.title}</Typography>
        {props.children}
        <TablePagination
            rowsPerPageOptions={ItemsPerRow}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby={`${props.title} table with selectors`}
                size='medium'
            >
                <TableHeader
                    numSelected={props.selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={props.data.length}
                    headers={props.headers}
                    align={props.align}
                />
                <TableBody>
                    {stableSort(props.data, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const isItemSelected = isSelected(row._id);
                            const labelId = `table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row._id, row)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row._id}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    {/* <DateCell tournaments={props.tournaments} registration={row} align={props.align || 'center'} /> */}
                                    <TableCell key={`${row._id}team`} align={props.align || 'center'}>{row.team}</TableCell>
                                    <TableCell key={`${row._id}captain`} align={props.align || 'center'}>{row.captain}</TableCell>
                                    <TableCell key={`${row._id}cell`} align={props.align || 'center'}>{row.cell}</TableCell>
                                    <TableCell key={`${row._id}email`} align={props.align || 'center'}>{row.email}</TableCell>
                                    <TableCell key={`${row._id}status`} align={props.align || 'center'}>{row.status}</TableCell>
                                </TableRow>
                            );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: (53) * emptyRows }}>
                            <TableCell align={props.align || 'center'} colSpan={props.rowSpan} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}
export default TeamList;