import OrderList from "../../Components/Store/Orders/OrderList";
import GeneralSearch from "../../Components/Search/GeneralSearch";
import GroupIconButtons from "../../Components/UI/Buttons/GroupIconButtons";
import { useState } from "react";
import { Box } from "@mui/system";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import $ from 'jquery';
import { Tooltip, IconButton } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OrderInvoice from "../../Components/Reports/OrderInvoice";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArchiveIcon from '@mui/icons-material/Archive';

const Orders = (props) => {
    const [orders, setOrders] = useState(props.orders);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [printOrder, setPrintOrder] = useState(false);
    const showDetailsHandler = (tournament) => {
        setSelectedRow(tournament);
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setOrders(array);
    }

    const deleteSelected = () => {
        $.ajax({
            type: 'DELETE',
            url: '/dashboard/orders',
            data: {
                selected
            },
            success: (response) => {
                alert(response);
                window.location.reload();
            },
            error: (error) => {
                console.log(error);
                alert(error.responseText);
            }
        })
    }

    const headCells = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Date',
        },
        {
            id: 'address',
            numeric: false,
            disablePadding: true,
            label: 'Shipping Address',
        },
        {
            id: 'balance',
            numeric: false,
            disablePadding: true,
            label: 'Balance',
        },
        {
            id: 'items',
            numeric: false,
            disablePadding: true,
            label: 'Items',
        }
    ];

    const selectionButtons = [
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        },
        {
            title: 'Print',
            icon: <LocalPrintshopIcon color='secondary' />,
            onClick: () => { setPrintOrder(!printOrder) }
        }
    ]
    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const mark = (orders, marking) => {
        $.ajax({
          type: 'PUT',
            url: '/dashboard/orders',
            data: {
                orders,
                marking
            },
            success: (response) => {
              alert(response);
              window.location.reload();
            },
            error: (error) => {
               alert(error.responseText);
            }
        });
    }
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const resetSelected = (index) => {
        if(selected.length > 0) {
            const result = window.confirm('All selected items will be lost if you move to a new tab. Are you sure?');
            if (result) {
                setSelected([]);
                setSelectedRow([]);
            } else {
                setValue(index);
                a11yProps(index);
            }
        }
    }
    return <Box sx={{ width: '100%', pt: '1rem' }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab onClick={() => resetSelected(value)} label="New" {...a11yProps(0)} />
            <Tab onClick={() => resetSelected(value)} label="Recieved" {...a11yProps(1)} />
            <Tab onClick={() => resetSelected(value)} label="Shipped" {...a11yProps(2)} />
            <Tab onClick={() => resetSelected(value)} label="Archived" {...a11yProps(3)} />
            {/* <Tab label="Refunded" {...a11yProps(2)} /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
            <OrderList  payments={props.payments}
                title='New Orders'
                status='new'
                data={props.orders}
                headers={headCells}
                align="center"
                onClick={handleClick}
                selected={selected}
                selectedRow={selectedRow}
                showDetails={showDetailsHandler}
            >
                <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                    <GeneralSearch onSearch={handleSearch} title='Orders' url='/dashboard/orders' />
                    {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                        <GroupIconButtons buttons={selectionButtons} />
                        <Tooltip title='Mark as Recieved'>
                            <IconButton id='recieved' onClick={() => {mark(selected, 'recieved')}}>
                                <CheckBoxIcon color='success' />
                            </IconButton>
                        </Tooltip>
                    </Box>}
                </Box>
                {printOrder && <OrderInvoice payments={props.payments} close={() => { setPrintOrder(!printOrder) }} order={selectedRow} />}
            </OrderList>
        </TabPanel>

        <TabPanel value={value} index={1}>
            <OrderList payments={props.payments}
                title='Recieved Orders'
                status='recieved'
                data={props.orders}
                headers={headCells}
                align="center"
                onClick={handleClick}
                selected={selected}
                selectedRow={selectedRow}
                showDetails={showDetailsHandler}
            >
                <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                    <GeneralSearch onSearch={handleSearch} title='Orders' url='/dashboard/orders' />
                    {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                        <GroupIconButtons buttons={selectionButtons} />
                        <Tooltip title='Mark as Shipped'>
                            <IconButton id='shipped' onClick={() => { mark(selected, 'shipped') }}>
                                <LocalShippingIcon color='success' />
                            </IconButton>
                        </Tooltip>
                    </Box>}
                </Box>
                {printOrder && <OrderInvoice payments={props.payments} close={() => { setPrintOrder(!printOrder) }} order={selectedRow} />}
            </OrderList>
        </TabPanel>

        <TabPanel value={value} index={2}>
            <OrderList payments={props.payments}
                title='Shipped Orders'
                status='shipped'
                data={props.orders}
                headers={headCells}
                align="center"
                onClick={handleClick}
                selected={selected}
                selectedRow={selectedRow}
                showDetails={showDetailsHandler}
            >
                <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                    <GeneralSearch onSearch={handleSearch} title='Orders' url='/dashboard/orders' />
                    {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                        <GroupIconButtons buttons={selectionButtons} />
                        <Tooltip title='Archive'>
                            <IconButton id='archive' onClick={() => { mark(selected, 'archive') }}>
                                <ArchiveIcon color='success' />
                            </IconButton>
                        </Tooltip>
                    </Box>}
                </Box>
                {printOrder && <OrderInvoice payments={props.payments} close={() => { setPrintOrder(!printOrder) }} order={selectedRow} />}
            </OrderList>
        </TabPanel>

        <TabPanel value={value} index={3}>
            <OrderList payments={props.payments}
                title='Archived Orders'
                status='archive'
                data={props.orders}
                headers={headCells}
                align="center"
                onClick={handleClick}
                selected={selected}
                selectedRow={selectedRow}
                showDetails={showDetailsHandler}
            >
                <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                    <GeneralSearch onSearch={handleSearch} title='Orders' url='/dashboard/orders' />
                    {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                        <GroupIconButtons buttons={selectionButtons} />
                    </Box>}
                </Box>
                {printOrder && <OrderInvoice payments={props.payments} close={() => { setPrintOrder(!printOrder) }} order={selectedRow} />}
            </OrderList>
        </TabPanel>
    </Box>
}
export default Orders;