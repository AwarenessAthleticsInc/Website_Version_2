import TableCell from '@mui/material/TableCell';

const DateCell = (props) => {
    const tournament = props.tournaments.filter((event) => {
        return event._id === props.registration.tournament._id;
    });
    return <TableCell key={`${props.registration._id}date`} align={props.align || 'center'}>{`${tournament.date || 'N/A'}`}</TableCell>

}
export default DateCell;