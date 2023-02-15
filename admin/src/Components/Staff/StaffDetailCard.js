import { useState } from "react";
import $ from 'jquery';
import Backdrop from "../UI/backdrop";
import { Paper, Button, Typography, TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";
import UploadImages from '../data/uploadImages';

const StaffDetailCard = (props) => {
    const [staff, setStaff] = useState({
        assets: {
            profileImage: props.staff ? props.staff.assets.profileImage : '',
            images: props.staff ? props.staff.assets.images : [],
        },
        details: {
            name: {
                givenName: props.staff ? props.staff.details.name.givenName : '',
                middleName: props.staff ? props.staff.details.name.middleName : '',
                familyName: props.staff ? props.staff.details.name.familyName : '',
            },
            username: props.staff ? props.staff.details.username : '',
        },
        work: {
            title: props.staff ? props.staff.work.title : '',
            description: props.staff ? props.staff.work.description : ''
        }
    });
    const setStaffHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setStaff((prevs) => {
            return {
                assets: {
                    profileImage: prevs.assets.profileImage,
                    images: prevs.assets.images,
                },
                details: {
                    name: {
                        givenName: id === 'givenName' ? value : prevs.details.name.givenName,
                        middleName: id === 'middleName' ? value : prevs.details.name.middleName,
                        familyName: id === 'familyName' ? value : prevs.details.name.familyName,
                    },
                    username: id === 'email' ? value : prevs.details.username,
                },
                work: {
                    title: id === 'title' ? value : prevs.work.title,
                    description: id === 'description' ? value : prevs.work.description
                }
            }
        });
    }
    const setImageHandler = (array) => {
        setStaff((prevs) => {
            return {
                assets: {
                    profileImage: array.length > 0 ? array[0] : '',
                    images: array,
                },
                details: {
                    name: {
                        givenName: prevs.details.name.givenName,
                        middleName: prevs.details.name.middleName,
                        familyName: prevs.details.name.familyName,
                    },
                    username: prevs.details.username,
                },
                work: {
                    title: prevs.work.title,
                    description: prevs.work.description
                }
            }
        });
    }
    const update = () => {
        $.post({
            type: 'PUT',
            url: '/dashboard/staff',
            data: { id: props.staff._id, staff: staff },
            success: (response) => {
                alert(response);
                window.location.reload();
            },
            error: (error) => {
                alert(error.responseText);
            }
        });
    }
    const saveNew = () => {
        $.post({
            type: 'POST',
            url: '/dashboard/staff',
            data: { staff },
            success: (response) => {
                alert(response);
                window.location.reload();
            },
            error: (error) => {
                alert(error.responseText);
            }
        });
    }

    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        close={props.close}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>{props.staff ? 'Update Staff' : 'New Staff'}</Typography>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={props.staff ? update : saveNew} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>{props.staff ? 'Update' : 'Save'}</Button>
            </Box>
            <hr />
            {/* keyID must be different on each upload component within the same page */}
            <UploadImages key='main' keyID='main' location='staff' images={staff.assets.images} onUpload={setImageHandler} />
            <Grid sx={{ m: '1rem 0' }} container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField sx={{ width: '100%' }} id="givenName" label="First Name" variant="standard" value={staff.details.name.givenName} onChange={setStaffHandler} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField sx={{ width: '100%' }} id="familyName" label="Last Name" variant="standard" value={staff.details.name.familyName} onChange={setStaffHandler} />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: '100%' }} id="email" label="E-Mail Address" variant="standard" value={staff.details.username} onChange={setStaffHandler} />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: '100%' }} id="title" label="Title / Position" variant="standard" value={staff.work.title} onChange={setStaffHandler} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="description" 
                        label="Job Description"
                        multiline
                        rows={4}
                        value={staff.work.description} 
                        onChange={setStaffHandler}
                        variant="standard"
                    />
                </Grid>
            </Grid>

        </Paper>
    </Backdrop>
}
export default StaffDetailCard;