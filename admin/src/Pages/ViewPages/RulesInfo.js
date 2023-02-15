import DocumentTable from "../../Components/Documents/DocumentTable";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
import $ from 'jquery';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIconButtons from '../../Components/UI/Buttons/GroupIconButtons';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import DocumentInfoCard from "../../Components/Documents/DocumentInfoCard";

const RulesInfo = (props) => {
    const [docs, setDocs] = useState(props.docs);
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
        setDocs(array);
    }
    const headCells = [
        {
            id: 'title',
            numeric: false,
            disablePadding: true,
            label: 'Title',
        },
        {
            id: 'imageLocation',
            numeric: false,
            disablePadding: true,
            label: 'Image Location',
        },
        {
            id: 'docCount',
            numeric: true,
            disablePadding: true,
            label: 'Document Count',
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: true,
            label: 'Description',
        }
    ];
    const editSelected = () => {
        setEdit(!edit);
    }
    const deleteClick = () => {
        var result = window.confirm("You're about to DELETE a document, are you sure?");
        if (result) {
            $.ajax({
                type: 'DELETE',
                url: '/dashboard/info',
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
        <DocumentTable
            title='Documents & Info'
            data={docs.length > 0 ? docs : props.docs}
            headers={headCells}
            align="left"
            onClick={handleClick}
            selected={selected}
            selectedRow={selectedRow}
            showDetails={showDetailsHandler}
        >
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Tooltip title='New Document'>
                    <IconButton onClick={() => { setNew(!newItem) }}>
                        <AddIcon color='success' />
                    </IconButton>
                </Tooltip>
                {selected.length > 0 && <GroupIconButtons buttons={selectionButtons} />}
            </Box>
        </DocumentTable>
        {edit && <DocumentInfoCard close={() => {setEdit(!edit)}} doc={selectedRow[0]} />}
        {newItem && <DocumentInfoCard close={() => { setNew(!newItem) }} />}
    </Box>
}
export default RulesInfo;