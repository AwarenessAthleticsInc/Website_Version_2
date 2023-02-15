import TournamentList from "../Tournaments/List/TournamenList";
import { Button, Paper } from "@mui/material";
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { useEffect, useState } from "react";
import $ from 'jquery';
import TournamenListItem from "../Tournaments/List/TournamentListItem";


const UserTournaments = (props) => {
    const [events, setEvents] = useState();
    useEffect(() => {
        if (props.user) {
            $.ajax({
                type: "POST",
                url: "/api/registrations/byUser",
                data: {
                    captain: `${props.user.name.givenName} ${props.user.name.familyName}`,
                    cell: props.user.phones
                },
                success: (data) => {
                    console.log(data);
                    setEvents(data);
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            });
        }
    }, [props.user])

    return props.user ? null:
        <Paper sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <SportsBaseballIcon color='error' sx={{ fontSize: 75, margin: '2rem' }}/>
                <h5>Please Login to see your events</h5>
                <Button onClick={() => { window.location.replace("/login") }} variant="contained" sx={{ borderRadius: '50rem', width: '75%', mt: '2rem'}}>Login Here</Button>
                <Button color='success' onClick={() => { window.location.replace("/tournaments") }} variant="outlined" sx={{ borderRadius: '50rem', width: '75%', margin: '2rem' }}>Tournament List</Button>
            </div>
            
        </Paper>
}
export default UserTournaments;