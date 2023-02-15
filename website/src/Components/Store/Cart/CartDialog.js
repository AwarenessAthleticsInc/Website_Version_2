import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import BadgeButton from "../../UI/Buttons/BadgeButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { ListItem, Paper } from '@mui/material';
import { Grid } from '@mui/material';
import CarouselContainer from '../../Layout/Carousel';
import QtyInput from './QtyInput';
import { Box } from '@mui/system';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Checkout from './Checkout';

const TransitionUp = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionLeft = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CartDialog = (props) => {

    const [open, setOpen] = React.useState(false);
    const [checkoutOpen, setCheckoutOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCheckoutOpen = () => {
        // setOpen(false);
        setCheckoutOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setCheckoutOpen(false);
    };
    const ImageBreakpoints = {
        ONE: {
            breakpoint: { max: 10000, min: 0 },
            items: 1
        }
    }

    return <React.Fragment>
        <BadgeButton onClick={handleClickOpen} title="Shopping Cart" count={props.cart && props.cart.items.length > 0 ? props.cart.totalQty : 0} max={40} badgeColor="success">
            <ShoppingCartIcon color='action' />
        </BadgeButton>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionUp}
        >
            <AppBar color='primary' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Shopping Cart
                    </Typography>
                    <Button endIcon={<ShoppingCartCheckoutIcon />} autoFocus color="inherit" onClick={handleCheckoutOpen}>
                        Checkout
                    </Button>
                </Toolbar>
            </AppBar>
            {props.cart && props.cart.items.length > 0 ?
                <List sx={{ p: { xs: '1rem', sm: '5%' } }}>
                    {props.cart.items.map((item) => {
                        return <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <CarouselContainer arrows={false} breakpoints={ImageBreakpoints}>
                                        {item.image.map((image) => {
                                            return <img style={{ width: '80%', margin: '5% 10%' }} alt={`The product image for ${item.name}`} src={image} />
                                        })}
                                    </CarouselContainer>
                                </Grid>
                                <Grid sx={{ textAlign: 'center' }} item md={6} xs={12}>
                                    <h5>{item.name}</h5>
                                    <p style={{ margin: '0' }}> - Size: <em>{item.size}</em></p>
                                    <p style={{ margin: '0' }}> - Color: <em>{item.color}</em></p>
                                    <br />
                                </Grid>
                                <Grid sx={{ textAlign: 'center' }} item xs={12} md={3}>
                                    <h5>{`$${Number(item.price).toFixed(2)}`}</h5>
                                    <QtyInput setCart={props.setCart} product={item} />
                                </Grid>
                            </Grid>
                        </ListItem>
                    })}
                    <ListItem sx={{ justifyContent: 'center' }}>
                        <Button color="primary" variant="contained" sx={{ borderRadius: '50rem', width: '85%' }} endIcon={<ShoppingCartCheckoutIcon />} onClick={handleCheckoutOpen}>
                            Checkout
                        </Button>
                    </ListItem>
                </List> :
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div>
                        <RemoveShoppingCartIcon color='primary' sx={{ fontSize: 100, margin: '1rem' }} />
                        <h6>Your cart currently has not items in it</h6>
                    </div>
                </Box>
            }
        </Dialog>
        <Dialog
            fullScreen
            open={checkoutOpen}
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
        >
            <AppBar color='success' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Checkout
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: '1rem' }}>
                <Checkout cart={props.cart} />
            </Box>
        </Dialog>
    </React.Fragment>

}
export default CartDialog;