import { useState } from "react";
import $ from 'jquery';

import {
    Backdrop,
    Paper,
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    MenuItem
} from "@mui/material";

const TeamDetailCard = (props) => {
    const [team, setTeam] = useState({
        team: props.team.team,
        captain: props.team.captain,
        email: props.team.email || '',
        cell: props.team.cell,
        status: props.team.status
    });
    const setTeamHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setTeam((prevs) => {
            return {
                team: id === 'team' ? value : prevs.team,
                captain: id === 'captain' ? value : prevs.captain,
                email: id === 'email' ? value : prevs.email,
                cell: id === 'cell' ? value : prevs.cell,
                status: prevs.status
            }
        });
    }
    const setTeamStatusHandler = (event) => {
        const value = event.target.value;
        setTeam((prevs) => {
            return {
                team: prevs.team,
                captain: prevs.captain,
                email: prevs.email,
                cell: prevs.cell,
                status: value
            }
        });
    }
    const update = () => {
        $.ajax({
            type: 'put',
            url: '/dashboard/teams',
            data: {
                id: props.team._id,
                team: team
            },
            success: (response) => {
                alert(response);
                window.location.reload();
            },
            error: (error) => {
                alert(error.responseText);
            }
        })
    }

    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    // onClick={props.onClick}
    >
        <Paper sx={{
            padding: '1rem',
            m: { xs: '1%', md: '25% 10%', xl: '25%' },
            width: { xs: '98%', md: '50%', xl: '50%' }
        }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>Update Team Details</Typography>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={update} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>Update</Button>
            </Box>
            <hr />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="team"
                        label="Team Name"
                        variant="standard"
                        value={team.team}
                        onChange={setTeamHandler}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="captain"
                        label="Captain's Name"
                        variant="standard"
                        value={team.captain}
                        onChange={setTeamHandler}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="cell"
                        label="Cell Phone"
                        variant="standard"
                        value={team.cell}
                        onChange={setTeamHandler}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        select
                        fullWidth
                        id="status"
                        label="Status"
                        variant="standard"
                        value={team.status}
                        onChange={setTeamStatusHandler}
                    >
                        <MenuItem key='Good' value='Good' >Good</MenuItem>
                        <MenuItem key='Deposit' value='Deposit' >Deposit</MenuItem>
                        <MenuItem key='Prepay' value='Prepay' >Prepay</MenuItem>
                        <MenuItem key='new' value='new' >new</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="E-mail Address"
                        variant="standard"
                        value={team.email}
                        onChange={setTeamHandler}
                    />
                </Grid>
            </Grid>
        </Paper>
    </Backdrop>
}
export default TeamDetailCard;