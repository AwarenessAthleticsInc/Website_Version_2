import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Accordions from "../../Components/UI/Accordion";
import LinkedPoster from "../../Components/UI/Links/LinkedPoster";
import { formatDateLong } from "../../Logic";
import ProfileTournamentList from '../../Components/ProfileRegistrations/ProfileTournamentsList';
const Profile = (props) => {
    return props.user && <Box sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem' } }}>
        <Paper elevation={3} sx={{ p: { xs: '1rem', md: '2rem' }, borderRadius: '1rem', backgroundColor: 'secondary.main' }}>
            <h4 style={{ textAlign: 'left' }}>My Profile Dashboard</h4>
            <p style={{ textAlign: 'left', fontSize: '0.8rem' }}>Welcome to your SPFA dashboard portal</p>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: { xs: '0rem', md: '2rem 2rem' }, borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Avatar
                            alt={`${props.user.name.givenName} ${props.user.name.familyName}`}
                            src={props.user.profileImage}
                            sx={{ width: '35%', height: 'auto', aspectRatio: '1/1', margin: '1rem auto' }}
                        />
                        <Box sx={{ textAlign: 'left', display: 'flex', p: '1rem' }}>
                            <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' } }}>My Profile</Typography>
                            <Box sx={{ margin: { xs: '0 auto', md: '0 0 0 auto'}, textAlign: { xs: 'center', md: 'right'}}}>
                                <h6 style={{ fontSize: '0.8rem' }}>{`${props.user.name.givenName} ${props.user.name.familyName}`}</h6>
                                <h6 style={{ fontSize: '0.8rem' }}>{props.user.username}</h6>
                            </Box>
                        </Box>
                        <hr />
                        <Box sx={{ textAlign: 'left', display: 'flex', p: '0 1rem' }}>
                            <p style={{ margin: '0' }}>Phone Number:</p>
                            <p style={{ margin: '0 0 0 auto', marginLeft: 'auto', textAlign: 'right' }}>{props.user.phone}</p>
                        </Box>
                        <hr />
                        <Box sx={{ textAlign: 'left', display: 'flex', p: '0 1rem 1rem 1rem' }}>
                            <p style={{ margin: '0' }}>Next Tournament Date: </p>
                            {props.registrations ? 
                                <p style={{ margin: '0 0 0 auto', marginLeft: 'auto', textAlign: 'right' }}>{formatDateLong(props.registrations[0].tournament.dateTime.start.date.replace(/-/g, '\/'))}</p> : 
                            <p style={{ margin: '0 0 0 auto', marginLeft: 'auto', textAlign: 'right' }}>N/A</p>}
                        </Box>
                    </Paper>
                </Grid>
                <Grid sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }} item xs={7}>
                    <Paper elevation={3} sx={{ p: { xs: '0rem', md: '1rem' }, mb: '1rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ textAlign: 'left' }}>My Tournaments</h4>
                        <p style={{ textAlign: 'left', fontSize: '0.8rem' }}>Your up and comming registered events</p>
                        <hr />
                        <Box sx={{maxHeight: '250px', overflowY: 'scroll'}}>
                            {!props.registrations ? <p>You haven't registered for an event yet</p> :
                            <ProfileTournamentList tournaments={props.registrations} payments={props.payments} />}
                        </Box>
                    </Paper>
                    <Paper elevation={3} sx={{ p: { xs: '0rem', md: '1rem' }, borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ textAlign: 'left' }}>My Order</h4>
                        <p style={{ textAlign: 'left', fontSize: '0.8rem' }}>Your recent product orders</p>
                        <hr />
                        <Box sx={{ maxHeight: '250px', overflowY: 'scroll' }}>
                           {!props.userOrders ? 
                           <p>You haven't order any products yet</p> : props.userOrders.map((order) =>{
                              return <Box sx={{textAlign: 'left'}}>
                                  <Accordions key={order._id} title={`Order Place: ${formatDateLong(order.date)}`}>
                                      {order.order.items.map((product) => {
                                          return <Grid sx={{ marginBottom: '1rem', alignItems: 'center' }} container spacing={2}>
                                              <Grid item xs={1}>
                                                  <img style={{ width: '100%' }} src={product.image} />
                                              </Grid>
                                              <Grid item xs={6}>
                                                  <h6 style={{ margin: '0' }}>{product.name}</h6>
                                                  <p style={{ margin: '0' }}>{`- Size: ${product.size}`}</p>
                                                  <p style={{ margin: '0' }}>{`- Color: ${product.color}`}</p>
                                              </Grid>
                                              <Grid item xs={2}>
                                                  <p>{`QTY: ${product.qty}`}</p>
                                              </Grid>
                                              <Grid item xs={3}>
                                                  <p>{`Line Total: $${Number(product.price * product.qty).toFixed(2)}`}</p>
                                              </Grid>
                                          </Grid>
                                      })}
                                      <p>{`Total: ${order.OrderTotal}`}</p>
                                   </Accordions>
                               </Box> })}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    </Box>
}
export default Profile;