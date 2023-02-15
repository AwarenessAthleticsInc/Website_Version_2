import { useState, Fragment } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Tooltip } from "@mui/material";
import PaymentForm from "../../../Components/Forms/MakePaymentForm";
import PaymentsIcon from '@mui/icons-material/Payments';
import OrderItems from "./OrderItems";

const OrderRow = (props) => {
    const [makePayment, setMakePayment] = useState(false);
    const handleClosePaymentForm = () => {
        setMakePayment(false);
    }
    const handleMakePayment = () => {
        setMakePayment(true);
    }
    const [open, setOpen] = useState(false);
    const { isItemSelected, row, labelId, handleClick, payments } = props;
    var payment = 0;
    payments.map((paid) => {
        payment += Number(paid.amount)
    });
    var itemCount = 0;
    row.order.items.map((item) => {
        itemCount += Number(item.qty)
    });
    return <Fragment key={row._id}>
        <TableRow
            hover

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
                    onClick={(event) => handleClick(event, row._id, row)}
                />
            </TableCell>
            <TableCell key={`date-${row._id}`} align={props.align || 'center'}>{new Date(row.date).toDateString()}</TableCell>
            <TableCell key={`address-${row._id}`} align={props.align || 'center'}>
                {`${row.client.shippingAddress.street}, ${row.client.shippingAddress.city},${row.client.shippingAddress.province}, ${row.client.shippingAddress.country || 'Canada'} ${row.client.shippingAddress.postal}`}
            </TableCell>
            <TableCell key={`balance-${row._id}`} align={props.align || 'center'}>{`$${Number(row.OrderTotal - payment).toFixed(2)}`}</TableCell>
            <TableCell key={`items-${row._id}`} align={props.align || 'center'}>{itemCount}</TableCell>
            <TableCell key={`paymentButton-${row._id}`} align={props.align || 'center'} sx={{ maxWidth: '50px' }}>
                <Tooltip title='Make Payment'>
                    <IconButton key={`payment_${row._id}`} onClick={handleMakePayment}>
                        <PaymentsIcon color='success' />
                    </IconButton>
                </Tooltip>
                {makePayment && <PaymentForm selected={[row._id]} handleClose={handleClosePaymentForm} makePayment={makePayment} />}
            </TableCell>
            <TableCell key={`teams-${row._id}`} align={props.align || 'center'}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>
        <OrderItems key={`orderItems_${row._id}`} open={open} row={row.order.items} />
    </Fragment>
}
export default OrderRow;