import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Fragment, useState } from 'react';
import Chip from '@mui/material/Chip';
import $ from 'jquery';
const GeneralSearch = (props) => {
    const [searched, setSearch] = useState('');
    const search = (event) => {
        if (event.key === "Enter") {
            const query = event.target.value;
            setSearch(query);
            $.ajax({
                type: "POST",
                url: props.url,
                data: { query: query },
                success: function (teams) {
                    props.onSearch(teams);
                },
                error: () => {
                    props.onSearch([]);
                }
            });
              
        }
    }
    const handleClear = () => {
        props.onSearch([]);
        setSearch('');
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
                placeholder={`Search ${props.title || ""}`}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={search}
                onClick={search}
            />
            {searched.length > 0 && <Chip color='secondary' onClick={handleClear} label={searched} />}
        </Search>
    </Fragment>
}
export default GeneralSearch;