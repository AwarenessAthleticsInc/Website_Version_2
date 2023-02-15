import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

const AppbarFooter = () => {
    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    });
    return <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
            <StyledFab size="medium" onClick={() => { alert('to') }} color="primary" aria-label="add">
                <SportsBaseballIcon />
            </StyledFab>
        </Toolbar>
    </AppBar>
}
export default AppbarFooter