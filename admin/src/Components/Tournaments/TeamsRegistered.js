import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Tooltip,
    IconButton
} from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PaymentForm from "../../Components/Forms/MakePaymentForm";
import PaymentsIcon from '@mui/icons-material/Payments';
import TournamentTeamsReport from '../Reports/TournamentTeamsReport';

const TournamentRegistrations = (props) => {
    const [makePayment, setMakePayment] = React.useState(false);
    const [printReport, SetPrintReport] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const handleClosePaymentForm = () => {
        setSelected([]);
        setMakePayment(false);
    }
    const handleMakePayment = (id) => {
        setSelected([id]);
        setMakePayment(true);
    }
    const { open, row } = props
    return <TableRow>
        <TableCell colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ marginRight: 'auto' }} variant="h6" gutterBottom component="div">
                            Teams Registered
                        </Typography>
                        <Tooltip title='Print Teams List'>
                            <IconButton onClick={() => { SetPrintReport(!printReport) }}>
                                <LocalPrintshopIcon color='secondary' />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Table size="normal" aria-label="registrations">
                        <TableHead>
                            {
                                row.length < 1 ?
                                    <TableRow>
                                        <TableCell>No Teams Registered Yet</TableCell>
                                    </TableRow> :
                                    <TableRow>
                                        <TableCell>Team Name</TableCell>
                                        <TableCell>Captain</TableCell>
                                        <TableCell>Cell Phone</TableCell>
                                        <TableCell>E-mail Address</TableCell>
                                        <TableCell>Registration Balance</TableCell>
                                    </TableRow>
                            }


                        </TableHead>
                        <TableBody>
                            {row.map((reg) => {
                                const payments = props.payments.filter((payment) => {
                                    return payment.Invoice === reg._id;
                                });
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
                                    <TableCell>{`$${Number(reg.OrderTotal - totalPaid).toFixed(2)}`}</TableCell>
                                    <TableCell>
                                        <Tooltip title='Make Payment'>
                                            <IconButton key={`payment_${reg._id}`} onClick={() => {handleMakePayment(reg._id)}}>
                                                <PaymentsIcon color='success' />
                                            </IconButton>
                                        </Tooltip>
                                        {printReport && <TournamentTeamsReport payments={payments} registrations={row} close={() => { SetPrintReport(!printReport) }} />}
                                        {makePayment && <PaymentForm key={reg._id} selected={selected} handleClose={handleClosePaymentForm} makePayment={makePayment} />}
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>

}
export default TournamentRegistrations;