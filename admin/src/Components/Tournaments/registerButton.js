import { formatDateString } from "../Logic";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from "@mui/system";
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

const RegisterButton = (props) => {
    const [registrations, setRegistrations] = useState([props.registrations]);
    const [division, setDivision] = useState(false);
    var CancellationDate = new Date(formatDateString(props.tournament.dateTime.EntryDeadline));
    var today = new Date();
    const todayDate = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
    const deadline = CancellationDate.getDate() + "-" + CancellationDate.getMonth() + "-" + CancellationDate.getFullYear();
    useEffect(() => {
        if (props.tournament.divisions.length > 0 && props.tournament.divisions[0].length > 0) {
            setDivision(props.tournament.divisions);
        }
    }, []);
    if (props.tournament.tournamentType.trim().includes("NSA")) {
        return <a href={props.tournament.externalLink} target='_blank' className='rounded-pill btn btn-outline-primary w-100' type='button'>Register (NSA)</a>
    }
    if (props.count <= 0) {
        return <button disabled className="rounded-pill btn btn-danger w-100" value={props.tournament._id}><i class="fa - solid fa - people - group"></i> Sold Out</button>
    }
    if (registrations.length > 0 && props.user) {
        if (division) {
            return <Box sx={{ width: '100%' }}>
                {division.map((div) => {
                    const check = props.registrations.some((registration) => {
                        return registration.team.captain === `${props.user.name.givenName} ${props.user.name.familyName}` &&
                            registration.team.cell === `${props.user.phones}` &&
                            registration.team.division === div;
                    })
                    if (check) {
                        return <Button startIcon={<CheckCircleIcon />} sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" color="success">{div}</Button>
                    } else {
                        if (todayDate !== deadline && CancellationDate < today) {
                            return <button disabled className={`rounded-pill btn btn-primary m-1 w-100 register regButton-${props.tournament._id}`} value={props.tournament._id}><AccessTimeIcon /> {div}</button>
                        }
                        return <button onClick={props.onClick} id={div} className={`rounded-pill btn btn-outline-primary w-100 m-1 register regButton-${props.tournament._id}`} value={props.tournament._id}>{div}</button>
                    }
                })}
            </Box>
        }
        const check = props.registrations.some((registration) => {
            return registration.team.captain === `${props.user.name.givenName} ${props.user.name.familyName}` &&
                registration.team.cell === `${props.user.phone}`;
        });
        if (check) {
            return <Button startIcon={<CheckCircleIcon />} sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" color="success">Registered</Button>
        }
    }
    if (division) {
        // this event has divsions
        return <Box sx={{ width: '100%' }}>
            {division.map((div) => {
                if (todayDate !== deadline && CancellationDate < today) {
                    return <button disabled className={`rounded-pill btn btn-primary m-1 w-100 register regButton-${props.tournament._id}`} value={props.tournament._id}><AccessTimeIcon /> {div}</button>
                }
                return <button onClick={props.onClick} id={div} className={`rounded-pill btn btn-outline-primary w-100 m-1 register regButton-${props.tournament._id}`} value={props.tournament._id}><SportsBaseballIcon /> {div}</button>
            })}
        </Box>
    }
    if (todayDate !== deadline && CancellationDate < today) {
        return <button disabled className={`rounded-pill btn btn-primary w-100 register regButton-${props.tournament._id}`} value={props.tournament._id}><AccessTimeIcon /> Deadline Passed</button>
    }
    return <button onClick={props.onClick} className={`rounded-pill btn btn-outline-primary w-100 register regButton-${props.tournament._id}`} value={props.tournament._id}><SportsBaseballIcon /> Register</button>
}
export default RegisterButton;