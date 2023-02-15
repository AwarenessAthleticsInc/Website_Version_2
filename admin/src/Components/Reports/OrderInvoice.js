import ReactToPrint from 'react-to-print';
import { Paper, Backdrop, Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import { useState, useRef } from 'react';
import logo from '../../assets/logo.webp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OrderInvoice = (props) => {
    const { order, close } = props;
    const [index, setIndex] = useState(0);
    const orderDate = new Date(order[index].date).toDateString();
    const orderTime = new Date(order[index].date).toLocaleTimeString();
    const payments = props.payments.filter((payment) => {
        return order[index]._id === payment.Invoice
    });
    const prev = () => {
        if (index >= 1) {
            setIndex((prevs) => index - 1);
        }
    }
    const next = () => {
        if (index <= order.length) {
            setIndex((prevs) => index + 1);
        }
    }
    var payment = 0;
    payments.map((paid) => {
        payment += Number(paid.amount)
    });
    const balance = Number(order[index].OrderTotal) - payment;
    const orderRef = useRef(order[index]._id);
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    // onClick={props.onClick}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box ref={orderRef} sx={{ p: '2rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ marginRight: 'auto' }} variant="h4" component="h4" gutterBottom>{`Download Invoice #${index + 1}`}</Typography>
                    <Box sx={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
                        <Tooltip title='prev'>
                            <IconButton onClick={prev}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{ marginRight: 'auto' }} variant="h6" component="h6" gutterBottom>{`${index + 1} Of ${order.length}`}</Typography>
                        <Tooltip title='next'>
                            <IconButton onClick={next}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <hr />
                <Box key='InvoiceHeader' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <img src={logo} style={{ width: '250px', margin: 'auto', marginBottom: '1rem' }} />
                    <Typography sx={{ margin: 'auto' }} variant="h5" component="h5" gutterBottom>{`Invoice #${order[index]._id}`}</Typography>
                    <hr />
                </Box>
                <Box key='HeaderDetails' sx={{ display: 'flex' }}>
                    <Box sx={{ textAlign: 'left', marginRight: 'auto' }}>
                        <Typography variant="p" component="p" gutterBottom>{`Date: ${orderDate}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Time: ${orderTime}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Client: ${order[index].client.account.name.givenName} ${order[index].client.account.name.familyName}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Email: ${order[index].client.account.username}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Phone: ${order[index].client.account.cell || 'N/A'}`}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right', marginLeft: 'autp' }}>
                        <Typography variant="p" component="p" gutterBottom>{`Awareness Athletics Inc.`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`HST #: 717849715RT0001`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`19 Cottonwood Drive,`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Belleville, ON Canada,`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`K8N 0J3`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Info@spfacanada.ca`}</Typography>
                    </Box>
                </Box>
                <br />
                <Box key='Address' sx={{ display: 'flex' }}>
                    <Box sx={{ textAlign: 'left', marginRight: 'auto' }}>
                        <Typography variant="h5" component="h5" gutterBottom>{`Shipping Address`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`${order[index].client.shippingAddress.name}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`${order[index].client.shippingAddress.street}, ${order[index].client.shippingAddress.city},`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`${order[index].client.shippingAddress.province}, ${order[index].client.shippingAddress.country || 'Canada'}, ${order[index].client.shippingAddress.postal}`}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right', marginLeft: 'autp' }}>
                        <Typography variant="h5" component="h5" gutterBottom>{`Billing Address`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`${order[index].client.billingAddress.name}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`${order[index].client.billingAddress.street}, ${order[index].client.billingAddress.city},`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`${order[index].client.billingAddress.province}, ${order[index].client.billingAddress.country || 'Canada'}, ${order[index].client.billingAddress.postal}`}</Typography>
                    </Box>
                </Box>
                <hr />
                <Box sx={{ margin: '1 0' }}>
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
                            {order[index].order.items.map((items, index) => {
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
                <Box sx={{ display: 'flex', justifyContent: 'end', alignText: 'right', flexDirection: 'column' }}>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Subtotal: $${Number(order[index].order.subtotal).toFixed(2)}`}</Typography>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Tax: ( inclusive )`}</Typography>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Shipping(${order[index].shipping.carrier}): $${Number(order[index].shipping.total).toFixed(2)}`}</Typography>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Total: $${Number(order[index].OrderTotal).toFixed(2)}`}</Typography>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Paid: $${Number(payment).toFixed(2)}`}</Typography>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Balance: $${Number(balance).toFixed(2)}`}</Typography>
                </Box>
                {payment > 0 && <Box sx={{ margin: '1 0' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Payments
                        </Typography>
                    </Box>

                    <Table size="normal" aria-label="registrations">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Currency</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment, index) => {
                                return <TableRow key={`${index}-${payment._id}`}>
                                    <TableCell component="th" scope="row">
                                        {payment.date}
                                    </TableCell>
                                    <TableCell>{payment.type}</TableCell>
                                    <TableCell>{`$${Number(payment.amount).toFixed(2)}`}</TableCell>
                                    <TableCell>{payment.currency}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>}
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button color='error' onClick={close} variant='outlined' sx={{ borderRadius: '50rem', width: { xs: '98%', md: '48%' }, m: '1%' }}>Cancel</Button>
                <ReactToPrint
                    trigger={() => <Button color='secondary' variant='contained' sx={{ borderRadius: '50rem', width: { xs: '98%', md: '48%' }, m: '1%' }}>{`Print #${index + 1}`}</Button>}
                    content={() => orderRef.current}
                />
            </Box>
        </Paper>
    </Backdrop>
}
export default OrderInvoice;