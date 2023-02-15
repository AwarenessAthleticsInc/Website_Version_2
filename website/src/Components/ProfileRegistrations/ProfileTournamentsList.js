import * as React from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
    Grid
} from '@mui/material';
import BalanceCell from './BalanceCell';
import {
    KeyboardArrowDown,
    KeyboardArrowUp
} from '@mui/icons-material';
import PaypalButton from '../Buttons/paypalButton';
import $ from 'jquery';

const ProfileTournamentList = (props) => {
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const [balance, setBalance] = React.useState(0);
        const payments = props.payments.filter((payment) => {
            return String(row._id) === String(payment.Invoice);
        });
        const payment = (paymentData, id) => {
            $.ajax({
                type: "post",
                url: `/api/payments`,
                data: {
                    ids: [id],
                    paymentData: paymentData,
                    type: 'paypal'
                },
                success: () => {
                    alert('Your payment was made successfully!');
                    window.location.reload();
                },
                error: (error) => {
                    alert(error.responseText);
                    window.location.reload();
                }
            });
        }
        return <Grid key={row._id} sx={{ width: '100%', alignItems: 'center', pt: '1rem' }} container spacing={2}>
            <Grid item xs={2} md={3}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            </Grid>
            <Grid sx={{ textAlign: { xs: 'left', md: 'center' } }} item xs={10} md={3}>
                <Typography variant='p'>{row.tournament.dateTime.start.date}</Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: { xs: 'flex', sm: 'none' } }}>
            </Grid>
            <Grid sx={{ textAlign: { xs: 'left', md: 'center' } }} item xs={7} md={3}>
                <Typography variant='p'>{`${row.tournament.location.city}, ${row.tournament.location.diamond}`}</Typography>
            </Grid>
            <Grid item xs={3} md={3}>
                <BalanceCell tournament={row} payments={payments} setBalance={(balance) => {setBalance(balance);}} />
            </Grid>
            <Grid item sx={{justifyContent: 'center'}} xs={12}>
                {balance > 0 && <PaypalButton key={row._id} amount={balance} onComplete={(payment) => {payment(payment, row._id)}} />}
            </Grid>
            <Grid item xs={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Registration Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Team Name</TableCell>
                                    <TableCell align="left">Captain</TableCell>
                                    <TableCell align="left">Captains Cell</TableCell>
                                    <TableCell align="left">Division</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={row.team.team}>
                                    <TableCell component="th" scope="row">
                                        {row.team.team}
                                    </TableCell>
                                    <TableCell align="left">{row.team.captain}</TableCell>
                                    <TableCell align="left">{row.team.cell}</TableCell>
                                    <TableCell align="left">{row.team.division || 'Co-ed'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </Grid>
        </Grid>
    }

    return <Paper>
        {props.tournaments.map((row) => (
            <Row key={row._id} row={row} payments={props.payments} />
        ))}
    </Paper>
}
export default ProfileTournamentList;