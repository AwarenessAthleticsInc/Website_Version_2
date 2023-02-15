import HomeIcon from '@mui/icons-material/Home';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StoreIcon from '@mui/icons-material/Store';
import RuleIcon from '@mui/icons-material/Rule';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/logo.webp"
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LoginIcon from '@mui/icons-material/Login';
import $ from 'jquery';
import { SwipeableDrawer, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import KingstonLogo from '../../Assets/Images/Kingston.png'
import PeterboroughLogo from '../../Assets/Images/Peterborough.png'
import BellevilleLogo from '../../Assets/Images/Belleville.png'
import BowmanvilleLogo from '../../Assets/Images/Bowmanville.png'
import AjaxLogo from '../../Assets/Images/Ajax.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsIcon from '@mui/icons-material/Sports';

const MainMenuList = (props) => {
    const sponsors = [
        {
            name: 'Allstate Kingston',
            image: KingstonLogo,
            link: 'https://agents.allstate.ca/on/kingston/656-gardiners-rd.html'
        },
        {
            name: 'Allstate Peterborough',
            image: PeterboroughLogo,
            link: 'https://agents.allstate.ca/on/peterborough/815-high-st.html'
        },
        {
            name: 'Allstate Belleville',
            image: BellevilleLogo,
            link: 'https://agents.allstate.ca/on/belleville/365-north-front-st.html'
        },
        {
            name: 'Allstate Bowmanville',
            image: BowmanvilleLogo,
            link: 'https://agents.allstate.ca/on/bowmanville/1-hartwell-ave.html'
        },
        {
            name: 'Allstate Ajax',
            image: AjaxLogo,
            link: 'https://agents.allstate.ca/on/ajax/15-westney-rd-n.html'
        },

    ];
    // console.log(props.user);
    const logoStyle = {
        height: "50%",
        margin: '5% auto'
    }
    const logout = (event) => {
        event.preventDefault();
        toggleDrawer(false);
        $.ajax({
            type: "DELETE",
            url: "/api/user",
            success: function () {
                props.setUser(false);
            }
        });
    }
    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [props.anchor]: open });
    };
    const replaceLocation = (link) => {
        toggleDrawer(false);
        window.location.replace(link); 
        
    }
    return <Fragment>
        <Button sx={props.sx} startIcon={<MenuIcon />} onClick={toggleDrawer(true)} variant="text" color='action'>{props.text}</Button>
        <SwipeableDrawer
            sx={{ zIndex: 1200 }}
            anchor={props.anchor}
            open={state[props.anchor]}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'scroll' }}>
                {!props.user ? <Link sx={{ display: 'flex' }} to="/">
                    <img style={logoStyle} src={logo} alt="Slo pitch for awarness logo. It has four different colored puzzle peiece and a bat with with the text SPFA across it." />
                </Link> : <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                    <Avatar
                        alt={`${props.user.name.givenName} ${props.user.name.familyName}`}
                        src={props.user.profileImage}
                        sx={{ width: '50%', height: 'auto', aspectRatio: '1/1', margin: '1rem auto' }}
                    />
                    <p style={{ margin: '0' }}>{`${props.user.name.givenName} ${props.user.name.familyName}`}</p>
                    <p>{props.user.username}</p>
                </Box>}

                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', p: '1rem', }}>
                    <Link to='/'><Button onClick={toggleDrawer(false)} startIcon={<HomeIcon />} variant='text' color='action'>Home</Button></Link>
                    <Link to='/tournaments'><Button onClick={toggleDrawer(false)} startIcon={<SportsBaseballIcon />} variant='text' color='action'>Tournaments</Button></Link>
                    <Link to='/tournament-of-champions'><Button onClick={toggleDrawer(false)} startIcon={<EmojiEventsIcon />} variant='text' color='action'>Tournament of Champions</Button></Link>
                    <Link to='/store'><Button onClick={toggleDrawer(false)} startIcon={<StoreIcon />} variant='text' color='action'>Store</Button></Link>
                    <Link to='/about-us'><Button onClick={toggleDrawer(false)} startIcon={<InsertEmoticonIcon />} variant='text' color='action'>About Us</Button></Link>
                    <Link to='/rules-info'><Button onClick={toggleDrawer(false)} startIcon={<RuleIcon />} variant='text' color='action'>Rules & Info</Button></Link>
                    <hr />
                    {props.user && props.user.roles === 'admin' && <Box>
                        <Button onClick={() => { replaceLocation(`/dashboard`) }} startIcon={<SportsIcon />} variant='text' color='action'>Dashboard</Button>
                    </Box>}
                    {props.user && props.user.roles === 'Convener' &&
                    <Box>
                            <Button onClick={() => { replaceLocation(`/conveners/home/${props.user._id}`)}} startIcon={ <SportsIcon />} variant='text' color='action'>Convener Panel</Button>
                    </Box>}
                    {props.user && props.user.roles === 'admin' && <Box>
                        <Button onClick={() => { replaceLocation(`/conveners/home/${props.user._id}`) }} startIcon={<SportsIcon />} variant='text' color='action'>Convener Panel</Button>
                    </Box>}
                    {!props.user ? <Box>
                        <Link to='/login'><Button onClick={toggleDrawer(false)} startIcon={<LoginIcon />} variant='text' color='action'>Login</Button></Link>
                    </Box> : <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }} >
                            <Link to={`/account`}><Button onClick={toggleDrawer(false)} startIcon={<AccountCircleIcon />} variant='text' color='action'>Account</Button></Link>
                        {/* <Link to={`/settings/${props.user._id}`}><Button startIcon={<SettingsIcon />} variant='text' color='action'>Settings</Button></Link> */}
                        <Link onClick={logout} to={`/logout`}><Button startIcon={<PowerSettingsNewIcon />} variant='text' color='action'>Logout</Button></Link>
                    </Box>}
                </Box>
                <Box sx={{ width: '100%', textAlign: 'left', p: '1rem' }}>
                    <h6>Sponsers</h6>
                    {sponsors.map((sponser) => {
                        return <a href={sponser.link} rel="noreferrer" target="_blank" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <img height='50px' src={sponser.image} alt={`${sponser.name} logo`} />
                            <p>{sponser.name}</p>
                        </a>
                    })}
                </Box>
            </Box>
        </SwipeableDrawer>
    </Fragment>
}
export default MainMenuList;