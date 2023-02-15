import * as React from 'react';
import $ from 'jquery';

import {
    Box,
    Typography,
    Paper,
    Backdrop,
    Button,
    Tooltip,
    IconButton
} from '@mui/material';
import {
    DeleteForever,
    Edit
} from '@mui/icons-material';

import GroupIconButtons from '../../Components/UI/Buttons/GroupIconButtons';
import TeamList from '../../Components/Teams/teamList';
import GeneralSearch from '../../Components/Search/GeneralSearch';
import TeamDetailCard from '../../Components/Teams/teamDetailCard';

const Teams = (props) => {
    const [teams, setTeams] = React.useState(props.team);
    const [selected, setSelected] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [edit, setEdit] = React.useState(false);
    const deleteSelected = () => {
        var results = window.confirm("you're about to delete a registration. Are you sure you want to proceed?");
        if (results) {
            $.ajax({
                type: "delete",
                url: "/dashboard/registrations",
                data: { registrations: selected },
                success: () => {
                    window.location.reload();
                },
                error: (error) => {
                    alert(error.responseText);
                    window.location.reload();
                }
            });
        }
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setTeams(array);
    }
    return (
        <Box sx={{ width: '100%' }} >
            <TeamList title='Teams' data={teams.length > 0 ? teams : props.team} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', marginRight: 'auto', alignItems: 'center' }}>
                        {selected.length === 1 && <Tooltip title='Edit Team'>
                            <IconButton onClick={() => { setEdit(!edit) }}>
                                <Edit color='secondary' />
                            </IconButton>
                        </Tooltip>}
                        {selected.length > 0 && <Tooltip title='Delete Team(s)'>
                            <IconButton onClick={deleteSelected}>
                                <DeleteForever color='error' />
                            </IconButton>
                        </Tooltip>}
                    </Box>
                    <GeneralSearch onSearch={handleSearch} title='Teams' url='/dashboard/teams' />
                </Box>
            </TeamList>
            {edit && <TeamDetailCard close={() => { setEdit(!edit) }} team={selectedRow[0]} />}
        </Box>
    );
}


export default Teams;