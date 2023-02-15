import { Box, Button, IconButton, Paper, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Grid from '@mui/material/Grid';
import $ from 'jquery';


const RegistrationDetails = (props) => {
    const [index, setIndex] = useState(0);
    const [registrations, setRegistrations] = useState(props.selected);
    const [team, setTeam] = useState({
        team: registrations[index].team.team,
        captain: registrations[index].team.captain,
        cell: registrations[index].team.cell,
        email: registrations[index].team.email,
        division: registrations[index].team.division
    });
    const handleIndexChange = (i) => {
        setTeam({
            team: registrations[i].team.team,
            captain: registrations[i].team.captain,
            cell: registrations[i].team.cell,
            email: registrations[i].team.email,
            division: registrations[i].team.division
        });
    }
    const next = () => {
        if (index + 1 === registrations.length) {
            return;
        }
        setIndex(index + 1);
        handleIndexChange(index + 1);
    }
    const prev = () => {
        if (index === 0) {
            return;
        }
        setIndex(index - 1);
        handleIndexChange(index - 1);
    }
    const handleTeamChange = (event) => {
       const id = event.target.id;
       const value = event.target.value;
       setTeam((prev) => {
          return {
              team: id === 'team' ? value : prev.team,
              captain: id === 'captain' ? value : prev.captain,
              cell: id === 'cell' ? value : prev.cell,
              email: id === 'email' ? value : prev.email,
              division: id === 'division' ? value : prev.division
          }
       });
    }
    const update = () => {
        const reg = registrations[index];
        reg.team = team;
        $.ajax({
            type: 'PUT',
            url: `/dashboard/registrations`,
            data: reg,
            success: (data) => {
                alert('Update successful!');
               window.location.reload();
            },
            error: (error) => {
               alert(error)
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
            {props.selected && <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="h6">{`${registrations[index].tournament.location.city}, ${registrations[index].tournament.location.diamond}`}</Typography>
                <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={prev}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h6" component="h6">{`${index + 1} of ${registrations.length}`}</Typography>
                    <IconButton onClick={next}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box> 
            </Box>}
            <hr />

            {/* <Button color='primary' variant='text'>Change Tournament...</Button> */}
            {props.selected && <Grid sx={{p: '1rem'}} container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">Team Detials</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{width: '100%'}} onChange={handleTeamChange} id={`team`} label="Teams Name" variant="standard" value={team.team}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%' }} onChange={handleTeamChange} id={`captain`} label="Captain" variant="standard" value={team.captain} />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%' }} onChange={handleTeamChange} id={`cell`} label="Cell Phone" variant="standard" value={team.cell} />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: '100%' }} onChange={handleTeamChange} id={`email`} label="Email Address" variant="standard" value={team.email} />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%' }} onChange={handleTeamChange} id={`division`} label="Division" variant="standard" value={team.division || 'Co-Ed'} />
                </Grid>
            </Grid>}
            <Grid sx={{ p: '1rem' }} container spacing={1}>
                <Button onClick={props.onClick} color='error' variant='outlined' sx={{borderRadius: '50rem', width: {xs: '98%', md: '48%'}, m: '1%'}}>Cancel</Button>
                <Button onClick={update} color='success' variant='outlined' sx={{ borderRadius: '50rem', width: { xs: '98%', md: '48%' }, m: '1%' }}>Update</Button>
            </Grid>
        </Paper>
    </Backdrop>
}
export default RegistrationDetails;