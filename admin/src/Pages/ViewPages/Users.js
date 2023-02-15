import { useState } from 'react';
import $ from 'jquery';
import { 
    Tabs,
    Tab,
    IconButton, 
    Tooltip,
    Typography,
    Box
} from '@mui/material';

import {
    DeleteForever,
    Add,
    Password,
    Sports,
    AdminPanelSettings,
    Person
} from '@mui/icons-material';

import GeneralSearch from "../../Components/Search/GeneralSearch";
import UserList from '../../Components/Users/UserList';
import SetUserPassword from '../../Components/Users/setUserPassword';

function TabPanel(props) {
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const Users = (props) => {
    const [value, setValue] = useState(0);
    const [users, setUsers] = useState(props.userList ? props.userList : []);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [edit, setEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        if (selected.length > 0) {
            var confirm = window.confirm(`You're about to switch tabs. All selected users will be unselected. Are you sure you want to continue?`);
            if (!confirm) {
                return;
            }
        }
        setSelected([]);
        setSelectedRow([]);
        setValue(newValue);
    };
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setUsers(array);
    }

    const deleteUsers = () => {
        const confirm = window.confirm(selected.length === 1 ? `You're about to delete ${selectedRow[0].name.givenName} ${selectedRow[0].name.familyName}. Are you sure you want to continue` : `You're about to delete all selected users. Are you sure you want to continue?`);
        if (!confirm) {
            return
        }
        $.ajax({
            type: 'delete',
            url: '/dashboard/users',
            data: {
                selected
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
    const updateUsers = (role) => {
        const confirm = window.confirm(selected.length === 1 ? `You're about to make ${selectedRow[0].name.givenName} ${selectedRow[0].name.familyName} a ${role}. Are you sure you want to continue` : `You're about to make all selected users a ${role}. Are you sure you want to continue?`);
        if (!confirm) {
            return
        }
        $.ajax({
            type: 'put',
            url: '/dashboard/users',
            data: {
                selected,
                role
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

    return (
        <Box sx={{ width: '100%' }}>
            {changePassword && <SetUserPassword username={selectedRow[0]} close={() => { setChangePassword(!changePassword) }} />}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '1rem auto 1rem 0' }} variant="h4" gutterBottom>Site Users</Typography>
                <GeneralSearch onSearch={handleSearch} title='site users' url='/dashboard/users' />
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Site Users" {...a11yProps(0)} />
                    <Tab label="Conveners" {...a11yProps(1)} />
                    <Tab label="Administrators" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {/* 
            **** Site users tab 
             */}
            <TabPanel value={value} index={0}>
                <UserList
                    data={users.length > 0 ? users : props.userList}
                    align="left"
                    onClick={handleClick}
                    selected={selected}
                    selectedRow={selectedRow}
                    role='Standard'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {selected.length > 0 &&
                            <Tooltip title='Delete'>
                                <IconButton onClick={deleteUsers}>
                                    <DeleteForever color='error' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length > 0 &&
                            <Tooltip title='Make Convener'>
                                <IconButton onClick={() => { updateUsers('Convener') }}>
                                    <Sports color='primary' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length > 0 &&
                            <Tooltip title='Make Admin'>
                                <IconButton onClick={() => {updateUsers('admin')}}>
                                    <AdminPanelSettings color='success' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length === 1 &&
                            <Tooltip title='Reset Password'>
                                <IconButton onClick={() => {setChangePassword(!changePassword)}}>
                                    <Password color='secondary' />
                                </IconButton>
                            </Tooltip>
                        }
                    </Box>
                </UserList>
            </TabPanel>

            {/* 
            **** Conveners Tab
             */}
            <TabPanel value={value} index={1}>
                <UserList
                    data={users.length > 0 ? users : props.userList}
                    align="left"
                    onClick={handleClick}
                    selected={selected}
                    selectedRow={selectedRow}
                    role='Convener'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {selected.length > 0 &&
                            <Tooltip title='Delete'>
                                <IconButton onClick={deleteUsers}>
                                    <DeleteForever color='error' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length > 0 &&
                            <Tooltip title='Site User'>
                                <IconButton onClick={() => { updateUsers('Standard') }}>
                                    <Person color='primary' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length > 0 &&
                            <Tooltip title='Make Admin'>
                                <IconButton onClick={() => { updateUsers('admin') }}>
                                    <AdminPanelSettings color='success' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length === 1 &&
                            <Tooltip title='Reset Password'>
                                <IconButton onClick={() => { setChangePassword(!changePassword) }}>
                                    <Password color='secondary' />
                                </IconButton>
                            </Tooltip>
                        }
                    </Box>
                </UserList>
            </TabPanel>

            {/* 
            **** Admin Tab 
             */}
            <TabPanel value={value} index={2}>
                <UserList
                    data={users.length > 0 ? users : props.userList}
                    align="left"
                    onClick={handleClick}
                    selected={selected}
                    selectedRow={selectedRow}
                    role='admin'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {selected.length > 0 &&
                            <Tooltip title='Delete'>
                                <IconButton onClick={deleteUsers}>
                                    <DeleteForever color='error' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length > 0 &&
                            <Tooltip title='Site User'>
                                <IconButton onClick={() => { updateUsers('Standard') }}>
                                    <Person color='primary' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length > 0 &&
                            <Tooltip title='Make Convener'>
                                <IconButton onClick={() => { updateUsers('Convener') }}>
                                    <Sports color='primary' />
                                </IconButton>
                            </Tooltip>
                        }
                        {selected.length === 1 &&
                            <Tooltip title='Reset Password'>
                                <IconButton onClick={() => { setChangePassword(!changePassword) }}>
                                    <Password color='secondary' />
                                </IconButton>
                            </Tooltip>
                        }
                    </Box>
                </UserList>
            </TabPanel>
        </Box>
    );
}
export default Users;