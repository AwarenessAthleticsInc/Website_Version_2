import { useState } from 'react';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupIconButtons from '../../Components/UI/Buttons/GroupIconButtons';
import Edit from '@mui/icons-material/Edit';
import $ from 'jquery';
import CheckTableList from '../../Components/UI/List/CheckTableList';
// import GeneralSearch from '../../Components/Search/GeneralSearch';
import FaqDetailsCard from '../../Components/faqDetailsCard';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Faq = (props) => {
    const [faq, setFaq] = useState(props.faq);
    const [edit, setEdit] = useState(false);
    const [newItem, setNew] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);

    const handleSearch = (array) => {
        setFaq(array);
    }
    const headCells = [
        {
            id: 'question',
            numeric: false,
            disablePadding: true,
            label: 'Question',
        },
        {
            id: 'answer',
            numeric: false,
            disablePadding: false,
            label: 'Answer',
        },
    ];
    const editSelected = () => {
        setEdit(!edit);
    }
    const deleteSelected = () => {
        const result = window.confirm('Are you sure you want to delete this FAQ');
        if (!result) {
            return;
        }
        $.ajax({
            type: "delete",
            url: "/dashboard/faq",
            data: { selected },
            success: (data) => {
                alert(data);
                window.location.reload();
            },
            error: (error) => {
                alert(error.responseText);
                window.location.reload();
            }
        });
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
            onClick: deleteSelected
        }
    ]
    const [selected, setSelected] = useState([]);

    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };

    return <Box sx={{ width: '100%', pt: '1rem' }}>
        <CheckTableList title='FAQs' data={faq.length > 0 ? faq : props.faq} headers={headCells} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
            {/* <GeneralSearch onSearch={handleSearch} title='FAQs' url='/dashboard/faq' /> */}
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Tooltip title='New Faq'>
                    <IconButton onClick={() => { setNew(!newItem) }}>
                        <AddIcon color='success'/>
                    </IconButton>
                </Tooltip>
                {selected.length > 0 && <GroupIconButtons buttons={selectionButtons} />}
            </Box>
        </CheckTableList>
        {edit && <FaqDetailsCard faq={selectedRow[0]} close={() => { setEdit(!edit); }} />}
        {newItem && <FaqDetailsCard close={() => { setNew(!newItem) }} />}
    </Box>
}
export default Faq;