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

const SearchTeamListForm = (props) => {
    const [teams, setTeams] = React.useState([]);
    React.useEffect(() => {
       setTeams(props.teams);
    }, []);
    const ItemsPerRow = [2, 5, 8, 10];
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('team');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(ItemsPerRow[0]);
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

    const handleClick = (selectedTeam) => {
        props.onSelection(selectedTeam);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teams.length) : 0;

    const TableHeader = (props) => {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
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
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
        );
    }

    return <Box sx={{ width: '100%', p: '1rem', mt: '1rem', mb: '1rem' }}>
        <TablePagination
            rowsPerPageOptions={ItemsPerRow}
            component="div"
            count={teams.length}
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
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={teams.length}
                    headers={headers}
                    align='center'
                />
                <TableBody>
                    {stableSort(teams, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const labelId = `table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(row)}
                                    role="checkbox"
                                    aria-checked={labelId}
                                    tabIndex={-1}
                                    key={row._id}
                                >
                                    {/* <DateCell tournaments={props.tournaments} registration={row} align={props.align || 'center'} /> */}
                                    <TableCell key={`${row._id}team`} align='center'>{row.team}</TableCell>
                                    <TableCell key={`${row._id}captain`} align='center'>{row.captain}</TableCell>
                                    <TableCell key={`${row._id}cell`} align='center'>{row.cell}</TableCell>
                                    <TableCell key={`${row._id}email`} align='center'>{row.email}</TableCell>
                                    <TableCell key={`${row._id}status`} align='center'>{row.status}</TableCell>
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
    </Box>
}
export default SearchTeamListForm;