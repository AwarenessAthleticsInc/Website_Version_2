import {
    Box
} from "@mui/system";
import {
    Grid,
    Typography,
    Paper
} from "@mui/material";
import { 
    RegistrationGrowthChart,
    TeamGrowthChart,
    SiteUsersGrowth 
} from '../../Components/data/charts/Chart';


const Overview = (props) => {
    return <Box sx={{ width: '100%', p: '1rem' }}>
        <Typography variant="h4" gutterBottom>{props.user ? `Welcome, ${props.user.name.givenName} here is your Awareness Athletics overview` : `Welcome, heres your Awareness Athletics overview`}</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={4}>
                <Paper sx={{ p: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto', aspectRatio: '8/5.15' }}>
                    <Typography variant="h1" gutterBottom>{props.registrations.length}</Typography>
                    <Typography variant="h6" gutterBottom>{`Registration count`}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
                <TeamGrowthChart />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
                <RegistrationGrowthChart />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
                <SiteUsersGrowth />
            </Grid>
        </Grid> 

    </Box>
}
export default Overview;