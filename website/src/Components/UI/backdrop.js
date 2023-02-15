import Backdrop from '@mui/material/Backdrop';
import { useState } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BackDrop = (props) => {
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <IconButton onClick={props.close} sx={{ position: "absolute", inset: "10px auto auto 10px" }}>
            <CloseIcon sx={{ color: '#fff' }} />
        </IconButton>
        {props.children}
    </Backdrop>
}
export default BackDrop;