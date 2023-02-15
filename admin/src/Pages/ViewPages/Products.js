import ProductList from '../../Components/Store/Products/ProductList'
import { Box } from "@mui/system";
import { useState } from "react";
import GeneralSearch from '../../Components/Search/GeneralSearch';
import { Tooltip, IconButton, Button } from "@mui/material";
import $ from 'jquery';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupIconButtons from "../../Components/UI/Buttons/GroupIconButtons";
import Edit from '@mui/icons-material/Edit';
import ProductDetailCard from '../../Components/Store/Products/ProductDetailsCard'
import AddIcon from '@mui/icons-material/Add';
const Products = (props) => {
    const [products, setProducts] = useState(props.products);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newProduct, setNew] = useState(false);
    const deleteSelected = () => {
        var results = window.confirm("you're about to delete a product. Are you sure you want to proceed?");
        if (results) {
            $.ajax({
                type: "delete",
                url: "/dashboard/products",
                data: { selected },
                success: (response) => {
                    alert(response);
                    window.location.reload();
                },
                error: (error) => {
                    alert(error.responseText);
                }
            });
        }
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setProducts(array);
    }
    const editClick = () => {
        setEdit(!edit);
    }
    const newClick = () => {
        setNew(!newProduct);
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
            id: 'colors',
            numeric: false,
            disablePadding: true,
            label: 'Colors',
        },
        {
            id: 'sizes',
            numeric: false,
            disablePadding: true,
            label: 'Sizes',
        },
        {
            id: 'pricing',
            numeric: false,
            disablePadding: true,
            label: 'Pricing',
        }
    ];
    const selectionButtons = [
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        }
    ]
    return <Box sx={{ width: '100%' }} >

        <ProductList
            title='Products'
            data={products.length > 0 ? products : props.products}
            headers={headCells}
            align="center"
            onClick={handleClick}
            selected={selected}
            selectedRow={selectedRow}>
            <br />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <GeneralSearch onSearch={handleSearch} title='Products' url='/dashboard/products' />
                <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                    <Tooltip key='newButton_tooltip' title='New Product'>
                        <IconButton key='addNew' onClick={newClick}>
                            <AddIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    {selected.length > 0 && <GroupIconButtons buttons={selectionButtons} />}
                    {selected.length > 0 && selected.length < 2 && <Tooltip key='editRegButton_tooltip' title='Edit'>
                        <IconButton key='editRegButton_iconButton' onClick={editClick}>
                            <Edit color='secondary' />
                        </IconButton>
                    </Tooltip>}
                </Box>
            </Box>
        </ProductList>
        {edit && <ProductDetailCard close={editClick} stock={props.stock} product={selectedRow[0]} />}
        {newProduct && <ProductDetailCard close={newClick} />}
    </Box>;
}
export default Products;