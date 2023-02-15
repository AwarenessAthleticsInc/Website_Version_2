import { useState, forwardRef } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Accordions from '../UI/Accordion';
import { Grid } from '@mui/material';
import LinkedPoster from '../UI/Links/LinkedPoster';
import { formatDateLong } from '../../Logic';
import ProfileTournamentList from '../ProfileRegistrations/ProfileTournamentsList'
const TransitionUp = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionLeft = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const MobileBar = (props) => {
    const [eventOpen, setEventOpen] = useState(false);
    const [ordersOpen, setOrdersOpen] = useState(false);

    const handleEventClose = () => {
        setEventOpen(false);
    }
    const handleOrdersClose = () => {
        setOrdersOpen(false);
    } 
    const handleOrdersOpen = () => {
        setOrdersOpen(true);
    }
    const handleEventOpen = () => {
        setEventOpen(true);
    }
    return <Paper sx={{ position: 'fixed', bottom: '0%', left: 0, right: 0, zIndex: "1200", padding: "0.6rem 0" }} elevation={3}>
        <BottomNavigation sx={{ width: '100%' }} value='show'>
            <BottomNavigationAction
                label="My Events"
                value="show"
                icon={<SportsBaseballIcon color='primary'/>}
                onClick={handleEventOpen}
            />
            <BottomNavigationAction
                label="My Orders"
                value="show"
                icon={<ShoppingBasketIcon color='primary'/>}
                onClick={handleOrdersOpen}
            />
        </BottomNavigation>
        <Dialog
            fullScreen
            open={eventOpen}
            onClose={handleEventClose}
            TransitionComponent={TransitionUp}
        >
            <AppBar color='primary' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleEventClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
                        My Tournaments
                    </Typography>
                </Toolbar>
            </AppBar>
            {!props.registrations ? <p>You haven't registered for an event yet</p> :
            <ProfileTournamentList tournaments={props.registrations} payments={props.payments} />}
        </Dialog>
        <Dialog
            fullScreen
            open={ordersOpen}
            onClose={handleOrdersClose}
            TransitionComponent={TransitionUp}
        >
            <AppBar color='primary' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleOrdersClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
                        My Orders
                    </Typography>
                </Toolbar>
            </AppBar>
            {!props.userOrders ?
                <p>You haven't order any products yet</p> : props.userOrders.map((order, index) => {
                    return <Box key={index} sx={{ textAlign: 'left' }}>
                        <Accordions key={order._id} title={`Ordered: ${formatDateLong(order.date)}`}>
                            {order.order.items.map((product, indexs) => {
                                return <Grid key={indexs} sx={{ marginBottom: '1rem', alignItems: 'center' }} container spacing={2}>
                                    <Grid item xs={4}>
                                        <img style={{ width: '100%' }} src={product.image} />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <h6 style={{ margin: '0' }}>{product.name}</h6>
                                        <p style={{ margin: '0' }}>{`- Size: ${product.size}`}</p>
                                        <p style={{ margin: '0' }}>{`- Color: ${product.color}`}</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p>{`QTY: ${product.qty}`}</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p>{`Line Total: $${Number(product.price * product.qty).toFixed(2)}`}</p>
                                    </Grid>
                                </Grid>
                            })}
                            <p>{`Total: $${Number(order.OrderTotal).toFixed(2)}`}</p>
                        </Accordions>
                    </Box>
                })}
        </Dialog>
    </Paper>
}
export default MobileBar;