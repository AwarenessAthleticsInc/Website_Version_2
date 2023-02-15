import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import LoginButton from './Buttons/LoginButton';
import { Paper, Tooltip, Typography } from '@mui/material';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import Drawer from '../UI/Drawer';
import MobileMenu from './MainMenuList';
import AppBarSearch from './AppbarSearch';
import Logo from '../Logo';
import CartDialog from '../Store/Cart/CartDialog';
import { ButtonGroup } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GradiantBackground from '../Layout/GradiantBackground';


export default function PrimarySearchAppBar(props) {
    let location = useLocation();
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const [searchType, setSearchType] = React.useState('tournaments')
    const mobileMenuId = 'primary-search-account-menu-mobile';
    return (
        <Paper elevation={3} sx={{ flexGrow: 1, borderRadius: '0', position: { xs: 'static', md: 'fixed'}, top: 0, left: 0, right: 0, zIndex: 1100 }}>
            <GradiantBackground>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', p: '0 1rem' }}>
                    <Box sx={{ marginRight: 'auto' }}>
                        <MobileMenu setUser={props.setUser} user={props.user} />
                    </Box>
                    <Logo height='65px' margin='1rem' />
                    <Box sx={{ marginLeft: 'auto', display: { xs: 'flex', md: 'none' } }}>
                        <CartDialog setCart={props.setCart} cart={props.cart} />
                    </Box>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'flex' }, p: { xs: '0.5rem', md: '0.8rem 5rem' } }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Logo height='50px' margin='1rem' />
                    </Box>
                    <Paper elevation={3} sx={{ display: 'flex', margin: 'auto', borderRadius: '25rem', p: '0.25rem 0'}}>
                        <ButtonGroup variant="text" aria-label="tournament and store select search button group">
                            <IconButton onClick={() => { setSearchType('tournaments') }}>
                                <Tooltip title='Search Tournaments'>
                                    <SportsBaseballIcon color={searchType === 'tournaments' ? 'secondary' : 'inherit'} />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => { setSearchType('store') }}>
                                <Tooltip title='Search Store'>
                                    <StoreIcon color={searchType === 'store' ? 'secondary' : 'inherit'} />
                                </Tooltip>
                            </IconButton>
                        </ButtonGroup>
                        <AppBarSearch stock={props.stock} setUser={props.setUser} setCart={props.setCart} registrations={props.registrations} searchType={searchType} user={props.user} />
                    </Paper>
                    <Paper elevation={3} sx={{ display: { xs: 'none', md: 'flex' }, borderRadius: '25rem', p: '0.25rem 1rem', margin: 'auto', marginRight: '0', marginLeft: '0' }}>
                        <CartDialog setCart={props.setCart} cart={props.cart} />
                        <LoginButton setUser={props.setUser} user={props.user} />
                    </Paper>

                </Box>
            </GradiantBackground>
            <Box sx={{ margin: { xs: '1%', md: 'auto 25%' }, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', p: { xs: '0.5rem', md: '0.8rem' } }}>
                <Box sx={{ diaply: 'inline', margin: 'auto 1rem' }}>
                    <IconButton onClick={() => { navigate('/') }} sx={{ padding: '0' }}>
                        <Tooltip title='Home'>
                            <HomeIcon color={location.pathname === '/' ? 'primary' : 'action'} />
                        </Tooltip>
                    </IconButton>
                    <p style={{ margin: '0', fontSize: '0.8rem' }}>Home</p>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 1rem' }}>
                    <IconButton onClick={() => { navigate('/tournaments') }} sx={{ padding: '0' }}>
                        <Tooltip title='Tournaments'>
                            <SportsBaseballIcon color={location.pathname === '/tournaments' ? 'primary' : 'action'} />
                        </Tooltip>
                    </IconButton>
                    <p style={{ margin: '0', fontSize: '0.8rem' }}>Tournaments</p>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 1rem' }}>
                    <IconButton onClick={() => { navigate('/store') }} sx={{ padding: '0' }}>
                        <Tooltip title='Store'>
                            <StoreIcon color={location.pathname === '/store' ? 'primary' : 'action'} />
                        </Tooltip>
                    </IconButton>
                    <p style={{ margin: '0', fontSize: '0.8rem' }}>Store</p>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 1rem' }}>
                    <IconButton onClick={() => { navigate('/tournament-of-champions') }} sx={{ padding: '0' }}>
                        <Tooltip title='Tournament Of Champions'>
                            <EmojiEventsIcon color={location.pathname === '/tournament-of-champions' ? 'primary' : 'action'} />
                        </Tooltip>
                    </IconButton>
                    <p style={{ margin: '0', fontSize: '0.8rem' }}>TOC</p>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 1rem' }}>
                    <IconButton onClick={() => { navigate('/about-us') }} sx={{ padding: '0' }}>
                        <Tooltip title='About Us'>
                            <InfoIcon color={location.pathname === '/about-us' ? 'primary' : 'action'} />
                        </Tooltip>
                    </IconButton>
                    <p style={{ margin: '0', fontSize: '0.8rem' }}>About Us</p>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 1rem' }}>
                    <IconButton onClick={() => { navigate('/rules-info') }} sx={{ padding: '0' }}>
                        <Tooltip title='Rules & Info'>
                            <LibraryBooksIcon color={location.pathname === '/rules-info' ? 'primary' : 'action'} />
                        </Tooltip>
                    </IconButton>
                    <p style={{ margin: '0', fontSize: '0.8rem' }}>Rules</p>
                </Box>
            </Box>
        </Paper>
    );
}
