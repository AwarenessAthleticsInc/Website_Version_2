import AppBarSearch from './AppbarSearch';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import StoreIcon from '@mui/icons-material/Store';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const SearchBar = (props) => {
    const [searchType, setSearchType] = useState('tournaments');
    return <Paper elevation={3} sx={{ display: 'flex', margin: 'inherit', borderRadius: '25rem', p: '0.25rem 0' }}>
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
}
export default SearchBar;