import { Button, TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FloatingInput from "../UI/Buttons/FloatingInput";

const TeamForm = (props) => {
    const [error, setError] = useState(false);
    const [team, setTeam] = useState({
        captain: props.team ? props.team.captain : '',
        email: props.team ? props.team.email : '',
        cell: props.team ? props.team.cell : ''
    });
    const setTeamHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setTeam((prevs) => {
            return {
                captain: id === 'captain' ? value : prevs.captain,
                email: id === 'email' ? value : prevs.email,
                cell: id === 'cell' ? value : prevs.cell
            }
        })
    }

    const onClick = () => {
        if (team.captain === '') {
            setError('Please fill the all fields');
            return;
        }
        if (team.cell === '') {
            setError('Please fill the all fields');
            return;
        }
        if (team.email === '') {
            setError('Please fill the all fields');
            return;
        }
        props.onClick(team);
    }

    return <Box>
        <h5 className="text-start">Captains Information</h5>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField fullWidth id="captain" label="Captain's Name" variant="standard" value={team.captain} onChange={setTeamHandler} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth id="cell" label="Captain's Cell" variant="standard" value={team.cell} onChange={setTeamHandler} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth id="email" label="Captain's Email" variant="standard" value={team.email} onChange={setTeamHandler} />
            </Grid>
        </Grid>
        <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
            <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="outlined" color="error">Close</Button>
            <Button onClick={onClick} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="contained" color={error ? "error" : "primary"}>Next</Button>
        </Box>
        {error && <p><strong>{error}</strong></p>}
    </Box>

}
export default TeamForm;