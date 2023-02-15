import ReactToPrint from 'react-to-print';
import { Paper, Backdrop, Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import { useState, useRef } from 'react';
import logo from '../../assets/logo.webp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RegistrationInvoice = (props) => {
    const { registrations, close } = props;
    const [index, setIndex] = useState(0);
    const registrationDate = registrations[index].date ? new Date(registrations[index].date).toDateString() : 'N/A';
    const registrationTime = registrations[index].date ? new Date(registrations[index].date).toLocaleTimeString() : 'N/A';
    const payments = props.payments.filter((payment) => {
        return registrations[index]._id === payment.Invoice
    });
    const prev = () => {
        if (index >= 1) {
            setIndex((prevs) => index - 1);
        }
    }
    const next = () => {
        if (index <= registrations.length) {
            setIndex((prevs) => index + 1);
        }
    }
    var payment = 0;
    payments.map((paid) => {
        payment += Number(paid.amount)
    });
    const balance = Number(registrations[index].OrderTotal) - payment;
    const registrationRef = useRef(registrations[index]._id);
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    // onClick={props.onClick}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box ref={registrationRef} sx={{ p: '2rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ marginRight: 'auto' }} variant="h4" component="h4" gutterBottom>{`Download Invoice #${index + 1}`}</Typography>
                    <Box sx={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
                        <Tooltip title='prev'>
                            <IconButton onClick={prev}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{ marginRight: 'auto' }} variant="h6" component="h6" gutterBottom>{`${index + 1} Of ${registrations.length}`}</Typography>
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
                    <Typography sx={{ margin: 'auto' }} variant="h5" component="h5" gutterBottom>{`Invoice #${registrations[index]._id}`}</Typography>
                    <hr />
                </Box>
                <Box key='HeaderDetails' sx={{ display: 'flex' }}>
                    <Box sx={{ textAlign: 'left', marginRight: 'auto' }}>
                        <Typography variant="p" component="p" gutterBottom>{`Date: ${registrationDate}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Time: ${registrationTime}`}</Typography>
                        <Typography variant="h6" component="h6" gutterBottom>{`Team's Name: ${registrations[index].team.team}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Captain's Name: ${registrations[index].team.captain}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Captain's Cell: ${registrations[index].team.cell}`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Captain's Email: ${registrations[index].team.email || ''}`}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right', marginLeft: 'auto' }}>
                        <Typography variant="p" component="p" gutterBottom>{`Awareness Athletics Inc.`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`HST #: 717849715RT0001`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`19 Cottonwood Drive,`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Belleville, ON Canada,`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`K8N 0J3`}</Typography>
                        <Typography variant="p" component="p" gutterBottom>{`Info@spfacanada.ca`}</Typography>
                    </Box>
                </Box>
                <hr />
                <Box sx={{ margin: '1 0' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Registered Tournament Details
                        </Typography>
                    </Box>

                    <Table size="normal" aria-label="registrations">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Diamond</TableCell>
                                <TableCell>Division</TableCell>
                                <TableCell>Registration Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {registrations[index].tournament.dateTime ? new Date(registrations[index].tournament.dateTime.start.date).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>{registrations[index].tournament.location.city}</TableCell>
                                <TableCell>{registrations[index].tournament.location.diamond}</TableCell>
                                <TableCell>{registrations[index].team.division || 'Co-Ed'}</TableCell>
                                <TableCell>{`$${Number(registrations[index].tournament.cost).toFixed(2)}`}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'end', alignText: 'right', flexDirection: 'column' }}>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Subtotal: $${Number(registrations[index].tournament.cost).toFixed(2)}`}</Typography>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Tax: ( inclusive )`}</Typography>
                    <Typography sx={{ marginLeft: 'auto' }} variant="p" component="p" gutterBottom>{`Total: $${Number(registrations[index].OrderTotal).toFixed(2)}`}</Typography>
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
                    content={() => registrationRef.current}
                />
            </Box>
        </Paper>
    </Backdrop>
}
export default RegistrationInvoice;