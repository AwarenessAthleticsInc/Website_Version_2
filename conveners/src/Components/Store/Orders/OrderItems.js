import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const OrderItems = (props) => {
    const { open, row } = props;
    return <TableRow key={`ItemsTableRow_${row._id}`}>
        <TableCell colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Order Items
                        </Typography>
                    </Box>

                    <Table size="normal" aria-label="registrations">
                        <TableHead>
                            <TableRow>
                                <TableCell>Qty</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Line Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {row.map((items, index) => {
                                return <TableRow key={`${index}-${items._id}`}>
                                    <TableCell component="th" scope="row">
                                        {items.qty}
                                    </TableCell>
                                    <TableCell>{items.name}</TableCell>
                                    <TableCell>{items.size || 'One Size'}</TableCell>
                                    <TableCell>{items.color}</TableCell>
                                    <TableCell>{`$${Number(Number(items.price) * Number(items.qty)).toFixed(2)}`}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>

}
export default OrderItems;