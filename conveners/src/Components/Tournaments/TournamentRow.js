import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TournamentRegistrations from './TeamsRegistered';
import Register from './register';
import RegisterButton from './registerButton';

const TournamentRow = (props) => {
    const [open, setOpen] = React.useState(false);
    const { isItemSelected, row, labelId, registrations, handleClick, payments } = props;
    console.log(row);
    const [startReg, setStartReg] = React.useState(false);
    const [division, setId] = React.useState();
    const register = (event) => {
        if (startReg) {
            setStartReg(false);
            window.scrollBy(0, -10);
            setId();
        } else {
            setId(event.target.id);
            window.scrollBy(0, 10);
            setStartReg(true);
        }
    }
    return <React.Fragment>
        <TableRow
            hover

            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row._id}
            selected={isItemSelected}
        >
            <TableCell key={`date-${row._id}`} align={props.align || 'center'}>{`${new Date(row.dateTime.start.date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}</TableCell>
            <TableCell key={`location-${row._id}`} align={props.align || 'center'}>{`${row.location.city}, ${row.location.diamond}`}</TableCell>
            <TableCell key={`location-${row._id}`} align={props.align || 'center'}>{`${row.teams.Min}`}</TableCell>
            <TableCell key={`registered-${row._id}`} align={props.align || 'center'}>{`${registrations.length}`}</TableCell>
            <TableCell key={`left-${row._id}`} align={props.align || 'center'}>{`${Number(row.teams.Max) - Number(registrations.length)}`}</TableCell>
            <TableCell key={`cancellation-${row._id}`} align={props.align || 'center'}>{`${new Date(row.dateTime.cancellationDate).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || 'Not Set'}`}</TableCell>
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
        <TournamentRegistrations open={open} row={registrations} payments={payments}/>
    </React.Fragment>
}
export default TournamentRow;