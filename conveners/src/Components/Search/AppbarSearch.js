import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Fragment, useState } from 'react';
import $ from 'jquery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import TournamentList from "../../Components/Tournaments/List/TournamenList";
// import ProductListItem from '../Store/Products/ProductListItem';

const AppBarSearch = (props) => {
    const [array, setArray] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setArray([]);
    };
    const searchStore = (event) => {
        if (event.key === "Enter") {
            const query = event.target.value;
            $.ajax({
                type: "GET",
                url: '/api/search/store/' + query,
                success: function (products) {
                    setArray(products);
                },
                error: () => {
                    setArray([]);
                }
            });
            handleClick(event);
        }
    }
    const search = (event) => {
        if (event.key === "Enter") {
            const query = event.target.value;
            $.ajax({
                type: "GET",
                url: '/api/search/all/' + query,
                success: function (data) {
                    setArray(data);
                },
                error: () => {
                    setArray([]);
                }
            });
            handleClick(event);
        }
    }
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: '50rem',
        backgroundColor: '#fcfcfc',
        marginLeft: 0,
        width: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '35%',
            margin: '0 1rem'
        }

    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    return <Fragment>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={`Search ${props.searchType === 'tournaments' ? 'Tournaments' : 'Store'}`}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={props.searchType === 'tournaments' ? search : searchStore}
                onClick={props.searchType === 'tournaments' ? search : searchStore}
            />
        </Search>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    padding: '0',
                    overflowY: "scroll",
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: '20vh',
                    width: "100%",
                    maxHeight: "70vh",
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 0,
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
            <MenuItem sx={{ width: '100%', padding: '0'}}>
                {props.searchType === 'tournaments' ? null : null}
                {/* {props.searchType === 'tournaments' ? <TournamentList registrations={props.registrations} tournaments={array} user={props.user} setUser={props.setUser}/> : <ProductListItem setCart={props.setCart} product={array} stock={props.stock} />} */}
            </MenuItem>
        </Menu>
    </Fragment> 
}
export default AppBarSearch;