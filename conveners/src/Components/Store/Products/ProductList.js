import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import ImgNextGen from '../../UI/NextGenImages'

const ProductList = (props) => {
    const ItemsPerRow = props.ItemsPerRow || [25, 50, 100, 150, 250]
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
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
                    {props.headers.map((headCell) => (
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
                            const array = row.assets.Image.split('/');
                            const name = array[1];
                            const location = array[0];
                            {/* const date = new Date(row.date).toDateString(); */ }
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
                                    <TableCell sx={{maxWidth: '100px'}} key={`${row._id}image`} align={props.align || 'center'}>
                                        <ImgNextGen
                                            srcWebp={`/${location}/${name}/200/${name}.webp`}
                                            srcJpeg={`/${location}/${name}/200/${name}.jpeg`}
                                            fallback={`/${location}/${name}/200/${name}.png`}
                                            alt={`${row.name}`}
                                            style={{width: '50%', display: 'flex', margin: 'auto'}}
                                        />
                                    </TableCell>
                                    <TableCell key={`${row._id}name`} align={props.align || 'center'}>{`${row.name}`}</TableCell>
                                    <TableCell key={`${row._id}colors`} align={props.align || 'center'}>{row.colors.length}</TableCell>
                                    <TableCell key={`${row._id}prices`} align={props.align || 'center'}>{row.sizes.length > 1 ? `${row.sizes[0]} - ${row.sizes[row.sizes.length - 1]}` : row.sizes[0]}</TableCell>
                                    <TableCell key={`${row._id}price`} align={props.align || 'center'}>{`$${Number(row.pricing.onSale ? row.pricing.salePrice : row.pricing.price).toFixed(2)}`}</TableCell>
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
export default ProductList;