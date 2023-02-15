import TocList from "../../Components/Toc/TocList";
import GeneralSearch from "../../Components/Search/GeneralSearch";
import { Box } from "@mui/system";
import { useState } from "react";
import { Tooltip, IconButton, Button } from "@mui/material";
import Edit from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewToc from "../../Components/Toc/NewToc";
import $ from 'jquery';

const Toc = (props) => {
    const [toc, setTocs] = useState(props.toc);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    // const [showDetails, setShowDetails] = useState(false);
    const [newTocCheck, setNew] = useState(false);
    const [editCheck, setEditCheck] = useState(false);

    const showDetailsHandler = (toc) => {
        setSelectedRow(toc);
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setTocs(array);
    }
    const headCells = [
        {
            id: 'poster',
            numeric: false,
            disablePadding: true,
            label: 'Poster',
        },
        {
            id: 'year',
            numeric: false,
            disablePadding: true,
            label: 'Year',
        },
        {
            id: 'sections',
            numeric: false,
            disablePadding: true,
            label: 'Page Sections',
        },
        {
            id: 'weeks',
            numeric: false,
            disablePadding: true,
            label: 'Number of weeks',
        }
    ];
    const editClick = () => {
       setEditCheck(true);
    }
    const deleteClick = () => {
        var result = window.confirm("You're about to DELETE a tournament of champions, are you sure?");
        if (result) {
            $.ajax({
                type: 'DELETE',
                url: '',
                data: {
                    ids: selected
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

    return <Box sx={{ width: '100%', pt: '1rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={() => { setNew(true) }} color='secondary' variant='outlined' startIcon={<AddCircleOutlineIcon />} sx={{ borderRadius: '50rem' }}>New Toc</Button>
        </Box>
        <TocList 
            registrations={props.registrations}
            payments={props.payments}
            toc={toc}
            title='Tournament of Champians'
            data={toc.length > 0 ? toc : props.toc}
            headers={headCells}
            align="left"
            onClick={handleClick}
            selected={selected}
            selectedRow={selectedRow}
            showDetails={showDetailsHandler}
        >
            <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                <GeneralSearch onSearch={handleSearch} title='Toc List' url='/dashboard/toc' />
                {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                    <Tooltip key={0} title='Edit'>
                        <IconButton key='editRegButton_iconButton' onClick={editClick}>
                            <Edit color='secondary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip key={1} title='Delete'>
                        <IconButton key='editRegButton_iconButton' onClick={deleteClick}>
                            <DeleteForeverIcon color='error' />
                        </IconButton>
                    </Tooltip>
                </Box>}
            </Box>
        </TocList>
        {newTocCheck && <NewToc registrations={props.registrations} onClick={() => { setNew(false); }} tournaments={props.tournaments} development={props.development} />}
        {editCheck && <NewToc registrations={props.registrations} onClick={() => { setEditCheck(false); }} toc={selectedRow} tournaments={props.tournaments} development={props.development} />}
    </Box>
        ;
}
export default Toc;