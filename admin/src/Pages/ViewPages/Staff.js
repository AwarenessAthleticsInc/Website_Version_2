import StaffTable from "../../Components/Staff/StaffTable";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
import $ from 'jquery';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIconButtons from '../../Components/UI/Buttons/GroupIconButtons';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import StaffDetailCard from "../../Components/Staff/StaffDetailCard";

const Staff = (props) => {
    const [staff, setStaff] = useState(props.team);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newItem, setNew] = useState(false);

    const showDetailsHandler = (toc) => {
        setSelectedRow(toc);
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setStaff(array);
    }
    const headCells = [
        {
            id: 'image',
            numeric: false,
            disablePadding: true,
            label: 'Image',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'title',
            numeric: false,
            disablePadding: true,
            label: 'Title',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'E-mail Address',
        }
    ];
    const editSelected = () => {
        setEdit(!edit);
    }
    const deleteClick = () => {
        var result = window.confirm("You're about to DELETE a staff member, are you sure?");
        if (result) {
            $.ajax({
                type: 'DELETE',
                url: '/dashboard/staff',
                data: {
                    selected
                },
                success: (data) => {
                    alert(data);
                    window.location.reload();
                },
                error: (error) => {
                    alert(error.responseText);
                }
            });
        }

    }
    const selectionButtons = [
        {
            title: 'Edit',
            icon: <Edit color='secondary' />,
            onClick: editSelected
        },
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteClick
        }
    ]

    return <Box sx={{ width: '100%', pt: '1rem' }}>
        <StaffTable
            title='Staff Members'
            data={staff.length > 0 ? staff : props.team}
            headers={headCells}
            align="left"
            onClick={handleClick}
            selected={selected}
            selectedRow={selectedRow}
            showDetails={showDetailsHandler}
        >
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Tooltip title='Add Staff Member'>
                    <IconButton onClick={() => { setNew(!newItem) }}>
                        <AddIcon color='success' />
                    </IconButton>
                </Tooltip>
                {selected.length > 0 && <GroupIconButtons buttons={selectionButtons} />}
            </Box>
        </StaffTable>
        {edit && <StaffDetailCard close={() => {setEdit(!edit)}} staff={selectedRow[0]} />}
        {newItem && <StaffDetailCard close={() => { setNew(!newItem) }} />}
    </Box>
}
export default Staff;