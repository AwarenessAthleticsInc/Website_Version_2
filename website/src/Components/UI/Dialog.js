import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dialogs = (props) => {
    return <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
    >
        <AppBar color='secondary' sx={{ position: 'relative', borderBottomRightRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
        {props.children}
    </Dialog>
}
export default Dialogs;