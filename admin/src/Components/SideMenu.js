import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DropdownListItem from './UI/List/DropdownListItem';
import logo from '../assets/logo.webp';
import { Link } from 'react-router-dom';
import Pages from './data/dashboardPages';
import LoginButton from './Buttons/LoginButton';
import { Typography } from '@mui/material';

const drawerWidth = window.innerWidth < 991 ? '85%' : '22vw';


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: '5rem',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(window.innerWidth < 991 ? false : true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{p: '1rem'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{display: 'flex', justifyContent: {xs: 'center', md: 'end'}, width: '100%'}}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: { xs: 'center', md: 'end' }}}>
                            {/* notifactions bell here  */}
                            <LoginButton setUser={props.setUser} user={props.user} />
                        </Box>

                    </Box>
                    
                    {/* search bar here  */}
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <img style={{width: '60%', margin: '1rem 20%'}} src={logo} alt='SPFA logo'/>
                <Divider />
                {Pages.map((item, index) => {
                    return <DropdownListItem key={index} title={item.pageName}>
                        {item.pages.map((route) => (
                            <ListItem key={route.title} disablePadding>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit', width: '100%' }} to={route.link}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {route.Icon}
                                        </ListItemIcon>
                                        <ListItemText primary={route.title} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </DropdownListItem>
                })}
            </Drawer>
            <Main open={open}>
                {props.children}
            </Main>
        </Box>
    );
}
