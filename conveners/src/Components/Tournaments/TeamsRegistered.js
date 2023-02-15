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
    const handleClosePaymentForm = () => {
        setMakePayment(false);
    }
    const handleMakePayment = () => {
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
                                        <TableCell>Division</TableCell>
                                    </TableRow>
                            }


                        </TableHead>
                        <TableBody>
                            {row.map((reg) => {
                                return <TableRow key={reg._id}>
                                    <TableCell component="th" scope="row">
                                        {reg.team.team}
                                    </TableCell>
                                    <TableCell>{reg.team.captain}</TableCell>
                                    <TableCell>{reg.team.cell}</TableCell>
                                    <TableCell>{reg.team.email}</TableCell>
                                    <TableCell>{reg.team.division || 'Co-Ed'}</TableCell>
                                    <TableCell>
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