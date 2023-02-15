import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TeamsDropDown = (props) => {
    const registrations = props.registrations.filter((registrations) => {
        return registrations.tournament._id === props.tournamentId;
    });
    return <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={props.open} timeout="auto" unmountOnExit>
                    {registrations.length < 1 ? <Typography sx={{width: '100%', textAlign: 'center'}} variant="p" component="p">
                        No Registrations Yet
                </Typography> : <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Team Details
                        </Typography>                
                </Box>}
            </Collapse>
        </TableCell>
    </TableRow>
}
export default TeamsDropDown;