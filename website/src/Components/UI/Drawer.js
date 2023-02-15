import { SwipeableDrawer, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import { Button } from '@mui/material';

const Drawer = (props) => {
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
    return <Fragment>
        {props.useIcon ? <Tooltip title={props.text}>
            {props.icon}
        </Tooltip> : 
        <Button sx={props.sx} startIcon={props.icon} onClick={toggleDrawer(true)} variant="text" color='action'>{props.text}</Button> }
        <SwipeableDrawer
            sx={{zIndex: 1200}}
            anchor={props.anchor}
            open={state[props.anchor]}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            {props.children}
        </SwipeableDrawer>
    </Fragment>
}
export default Drawer;