import ReactToPrint from 'react-to-print';
import { Paper, Backdrop, Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import { useState, useRef } from 'react';
import logo from '../../assets/logo.webp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TournamentTeamsReport = (props) => {
    const { registrations, close } = props;
    const registrationRef = useRef(registrations[0].tournament._id);
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    // onClick={props.onClick}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box ref={registrationRef} sx={{ p: '2rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ marginRight: 'auto' }} variant="h4" component="h4" gutterBottom>{`Download Report`}</Typography>
                </Box>
                <hr />
                <Box key='InvoiceHeader' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <img src={logo} style={{ width: '250px', margin: 'auto', marginBottom: '1rem' }} />
                    <br />
                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="h4" gutterBottom component="div">
                            {`${registrations[0].tournament.location.city}, ${registrations[0].tournament.location.diamond} (${registrations[0].tournament.dateTime ? new Date(registrations[0].tournament.dateTime.start.date).toLocaleDateString() : 'Date N/A'})`}
                        </Typography>
                    </Box>

                </Box>
                <hr />
                <Box sx={{ margin: '1 0' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Registered Teams Report
                        </Typography>
                    </Box>

                    <Table size="normal" aria-label="registration">
                        <TableHead>
                            <TableRow>
                                <TableCell>Team Name</TableCell>
                                <TableCell>Captain's Name</TableCell>
                                <TableCell>Captain's Cell</TableCell>
                                <TableCell>Captain's Email</TableCell>
                                <TableCell>Division</TableCell>
                                <TableCell>Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.registrations.map((reg) => {
                                const payments = props.payments;
                                var totalPaid = 0;
                                if (payments.length > 0) {
                                    payments.map((paid) => {
                                        totalPaid += paid.amount;
                                        return totalPaid;
                                    });
                                }
                                return <TableRow key={reg._id}>
                                    <TableCell component="th" scope="row">
                                        {reg.team.team}
                                    </TableCell>
                                    <TableCell>{reg.team.captain}</TableCell>
                                    <TableCell>{reg.team.cell}</TableCell>
                                    <TableCell>{reg.team.email}</TableCell>
                                    <TableCell>{reg.team.division || 'Co-Ed'}</TableCell>
                                    <TableCell>{`$${Number(reg.OrderTotal - totalPaid).toFixed(2)}`}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button color='error' onClick={close} variant='outlined' sx={{ borderRadius: '50rem', width: { xs: '98%', md: '48%' }, m: '1%' }}>Cancel</Button>
                <ReactToPrint
                    trigger={() => <Button color='secondary' variant='contained' sx={{ borderRadius: '50rem', width: { xs: '98%', md: '48%' }, m: '1%' }}>{`Print`}</Button>}
                    content={() => registrationRef.current}
                />
            </Box>
        </Paper>
    </Backdrop>
}
export default TournamentTeamsReport;