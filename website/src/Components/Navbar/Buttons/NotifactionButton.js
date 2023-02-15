import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Fragment, useState } from "react";
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
const NotifactionButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <Fragment>
        <Tooltip title="Notifacations">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            ><Badge badgeContent={1} max={20} color="success">
                    <NotificationsIcon color="primary" />
            </Badge>
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
                    width: "20%",
                    minWidth: "350px",
                    maxHeight: "50%",
                    overflowY: "scroll",
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
            <MenuItem>
                Notifacations here
            </MenuItem>
        </Menu>
    </Fragment>
}
export default NotifactionButton;