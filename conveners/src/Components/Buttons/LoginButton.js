import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import $ from "jquery";
import { Fragment, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsIcon from '@mui/icons-material/Sports';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/user/userSlice';

const LoginButton = (props) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const login = () => {
        window.location.replace('/login');
    }
    const logout = async () => {
        await $.ajax({
            type: "DELETE",
            url: "/api/user",
            data: {
                token: localStorage.getItem("token")
            },
            success: function (user) {
                dispatch(userActions.clearUser());
                localStorage.removeItem("token");

                window.location.replace('/');
            }
        });
    }
    const Icon = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return user.auth ?
            <Fragment>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 24, height: 24 }} alt={`${user.name.givenName} ${user.name.familyName}`} src={user.profileImage} />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            width: "25%",
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ display: 'flex', p: "2% 1rem", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Avatar
                            alt={`${user.name.givenName} ${user.name.familyName}`}
                            src={user.profileImage && user.profileImage}
                            sx={{ width: '75%', height: 'auto', aspectRatio: '1/1', margin: '1rem auto' }}
                        />
                        <p style={{ margin: "0.5rem 0 0 0" }}>{`${user.name.givenName} ${user.name.familyName}`}</p>
                        <p>{user.username}</p>
                    </Box>
                    <MenuItem onClick={() => { window.location.replace(`/`) }}>
                        <ListItemIcon>
                            <HomeIcon color="action" />
                        </ListItemIcon>
                        Home
                    </MenuItem>
                    {user.role === 'admin' && <MenuItem onClick={() => { window.location.replace(`/dashboard`) }}>
                        <ListItemIcon>
                            <DashboardIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        Dashboard
                    </MenuItem>}
                    {user.role === 'Convener' || user.role === 'admin' && <MenuItem onClick={() => { window.location.replace(`/conveners/home/${user._id}`) }}>
                        <ListItemIcon>
                            <SportsIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        Convener Panel
                    </MenuItem>}
                    <Divider style={{ width: '100%' }} color="action" />
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout color="action" fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Fragment>

            :
            <IconButton onClick={login} title="Login/Register">
                <AccountCircleIcon color="primary" />
            </IconButton>
    }
    const { loading = false } = props;
    return loading ? <Skeleton variant="circular" height={30} width={30} /> : <Icon />

}
export default LoginButton;
