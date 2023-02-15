import TournamentList from "../../Components/Tournaments/List/TournamenList";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import EventFilters from "../../Components/Tournaments/List/EventFilters";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
const Tournaments = (props) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [filteredList, setList] = useState();

    const filter = (filters) => {
        const month = monthFilter(props.tournaments, filters.month);
        const city = cityFilter(month, filters.city);
        const diamond = diamondFilter(city, filters.diamond);
        if (diamond.length < 1) {
            handleClick();
        }
        setList(diamond);
    }

    const monthFilter = (events, month) => {
        if (!month) {
            return events;
        }
        const filter = events.filter((event) => {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthDate = monthNames[new Date(event.dateTime.start.date).getMonth()];
            return monthDate === month;
        });
        return filter
    }
    const cityFilter = (events, city) => {
        if (!city) {
            return events
        }
        const filter = events.filter((event) => {
            return event.location.city === city
        });
        return filter;
    }
    const diamondFilter = (events, diamond) => {
        if (!diamond) {
            return events
        }
        const filter = events.filter((event) => {
            return event.location.diamond === diamond
        });
        return filter;
    }
    const closeSnack = () => {
        handleClose();
        setList()
    }
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    return <Box sx={{width: {xs: '98%', md: '90%'}, m: { xs: '2rem 1%', md: '2rem 5%'} }}>
        <EventFilters key='2' tournaments={filteredList ? filteredList : props.tournaments} onFilter={filter} onClear={() => { closeSnack() }} />
        <TournamentList
            tournaments={filteredList ? filteredList : props.tournaments}
            setTournaments={props.setTournaments}
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            user={props.user}
            setUser={props.setUser}
        />
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Not Events Found"
            action={action}
        />
    </Box>
}
export default Tournaments;