import { Box } from "@mui/system";
import { Tooltip, IconButton } from "@mui/material";
import { useState } from "react";
import GeneralSearch from '../../Components/Search/GeneralSearch';
import GroupIconButtons from '../../Components/UI/Buttons/GroupIconButtons';
import Edit from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import $ from 'jquery';
import StockTable from "../../Components/Store/Stock/StockTable";

const Stock = (props) => {
    const [stock, setStock] = useState(props.stock);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const deleteSelected = () => {
        var results = window.confirm("you're about to delete stock but not the product. Are you sure you want to proceed?");
        if (results) {
            $.ajax({
                type: "delete",
                url: "/dashboard/stock",
                data: { stock: selected },
                success: (response) => {
                    alert(response);
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
        setStock(array);
    }
    const selectionButtons = [
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        }
    ]

    return <Box sx={{ width: '100%' }} >
        <StockTable title='Stock' data={stock.length > 0 ? stock : props.stock} stock={stock} setStock={props.setStock} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
            <br />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <GeneralSearch onSearch={handleSearch} title='Stock' url='/dashboard/registrations' />
                {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                    <GroupIconButtons buttons={selectionButtons} />
                </Box>}
            </Box>
        </StockTable>
    </Box>
}
export default Stock;