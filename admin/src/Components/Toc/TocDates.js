import TournamentList from "../Tournaments/TournamentsList";
import { useEffect, useState } from "react";

const TocDates = (props) => {
    // console.log(props.registrations);
    const filteredTournaments = props.tournaments.filter((tournament) => {
        return tournament.tournamentType.toLowerCase() === 'toc';
    });
    const [tournaments, setTournaments] = useState(filteredTournaments);    
    const [selected, setSelected] = useState(props.selected ? props.selected : []);
    const [selectedRow, setSelectedRow] = useState(props.rows ? props.rows :[]);
    const [showDetails, setShowDetails] = useState(false);

    const showDetailsHandler = (tournament) => {
        setSelectedRow(tournament);
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
        props.onSelect(array);
    };
    const handleSearch = (array) => {
        setTournaments(array);
    }
    const headCells = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Date',
        },
        {
            id: 'tournament',
            numeric: false,
            disablePadding: true,
            label: 'Location',
        },
        {
            id: 'regCount',
            numeric: false,
            disablePadding: true,
            label: 'Registered',
        },
        {
            id: 'left',
            numeric: false,
            disablePadding: true,
            label: 'Spots Left',
        },
        {
            id: 'details',
            numeric: false,
            disablePadding: true,
            label: 'Details',
        }
    ];
    return <TournamentList 
        registrations={props.registrations}
        payments={props.payments}
        tournaments={tournaments}
        title='Select TOC dates'
        data={tournaments.length > 0 ? tournaments : props.tournaments}
        headers={headCells}
        align="left"
        onClick={handleClick}
        selected={selected}
        selectedRow={selectedRow}
        showDetails={showDetailsHandler}
    ></TournamentList>
}
export default TocDates;