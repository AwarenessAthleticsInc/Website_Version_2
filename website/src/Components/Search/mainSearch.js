import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchButton from '../Navbar/Buttons/SearchButton';
import styles from "./mainSearch.module.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, Fragment, useEffect } from 'react';
import TournamentSearchCard from '../Tournaments/Card/TournamentSearchCard';
import $ from "jquery";
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
const MainSearch = (props) => {
  const [array, setArray] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = (event) => {
    if(event.key === "Enter"){
      const query = event.target.value;
      $.ajax({
        type: "GET",
        url: '/api/search/all/' + query,
        success: function (data) {
          setArray(data);
        },
        error: function (error) {
          alert(error.responseText);
        }
      });
      handleClick(event);
    }
  }
  const [width, setWidth] = useState({
    width: window.innerWidth,
    scale: window.innerWidth < 991 ? "100%" : "25%"
  });
  const handleResize = () => {
     setWidth(() => {
       return {
         width: window.innerWidth,
         scale: window.innerWidth < 991 ? "100%" : "25%"
       }
     })
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return <Fragment>
    {width.width > 991 ? <Paper className={styles.searchBar} elevation={0} sx={{ p: '2px', m: '0.2rem', display: 'flex', alignItems: 'center', width: width.scale, borderRadius: "50rem" }}>
      <InputBase onKeyDown={search} onClick={search} sx={{ ml: 1, flex: 1 }} placeholder="Search Tournaments" />
      <SearchButton />
    </Paper> : <Fragment>{props.mobileVisible && <Paper className={styles.searchBar} elevation={0} sx={{ p: '2px', m: '0.2rem', display: 'flex', alignItems: 'center', width: width.scale, borderRadius: "50rem" }}>
         <InputBase onKeyDown={search} onClick={search} sx={{ ml: 1, flex: 1 }} placeholder="Search Tournaments" />
        <SearchButton /></Paper>}
      </Fragment>
    }
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflowY: "scroll",
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          width: "100%",
          maxHeight: "75vh",
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
      {array.map((items) => {
        return <TournamentSearchCard image={items.assets.poster}
                                city={items.location.city}
                                diamond={items.location.diamond}
                                date={items.dateTime.start.date}
                                id={items._id}
                                key={items._id}
                                price={`$${Number(items.cost).toFixed(2)}`}
          />
        
      })}
    </Menu>
  </Fragment> 
}
export default MainSearch;
