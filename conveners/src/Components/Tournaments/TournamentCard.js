//this component is used to save new tournaments and update excisting tournaments

import {
    Paper,
    Backdrop,
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    MenuItem,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    Select,
    OutlinedInput,
    Checkbox,
    ListItemText
} from "@mui/material";

import { useState } from "react";
import UploadImages from '../data/uploadImages';
import $ from 'jquery';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const TournamentCard = (props) => {
    //if a tournament prop is set then this start will mirror its data. This will be used durning updates
    const [tournament, setTournament] = useState({
        images: props.tournament ? props.tournament.assets.images : [],
        city: props.tournament ? props.tournament.location.city : '',
        diamond: props.tournament ? props.tournament.location.diamond : '',
        province: props.tournament ? props.tournament.location.province : '',
        FullAddress: props.tournament ? props.tournament.location.FullAddress : '',
        variant: props.tournament ? props.tournament.variation : '',
        cost: props.tournament ? props.tournament.cost : '0.00',
        type: props.tournament ? props.tournament.tournamentType : 'Normal',
        startTime: props.tournament ? props.tournament.dateTime.start.time : new Date().toTimeString(),
        startDate: props.tournament ? props.tournament.dateTime.start.date : new Date().toDateString(),
        endTime: props.tournament ? props.tournament.dateTime.end.time : new Date().toTimeString(),
        endDate: props.tournament ? props.tournament.dateTime.end.date : new Date().toDateString(),
        minTeam: props.tournament ? props.tournament.teams.Min : '',
        maxTeam: props.tournament ? props.tournament.teams.Max : '',
        EntryDeadline: props.tournament ? props.tournament.dateTime.EntryDeadline : new Date().toDateString(),
        notes: props.tournament ? props.tournament.Notes : '',
        divisions: props.tournament ? props.tournament.divisions : [],
        externalLink: props.tournament ? props.tournament.externalLink : '',
    });
    //this is used when inputs change to update their value in the tournament state
    const newTournamentHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setTournament((prevs) => {
            return {
                images: prevs.images,
                city: id === 'city' ? value : prevs.city,
                diamond: id === 'diamond' ? value : prevs.diamond,
                province: id === 'province' ? value : prevs.province,
                FullAddress: id === 'address' ? value : prevs.FullAddress,
                variant: id === 'variant' ? value : prevs.variant,
                cost: id === 'cost' ? Number(value).toFixed(2) : prevs.cost,
                type: id === 'type' ? value : prevs.type,
                startTime: id === 'startTime' ? value : prevs.startTime,
                startDate: id === 'startDate' ? value : prevs.startDate,
                endTime: id === 'endTime' ? value : prevs.endTime,
                endDate: id === 'endDate' ? value : prevs.endDate,
                minTeam: id === 'minTeam' ? value : prevs.minTeam,
                maxTeam: id === 'maxTeam' ? value : prevs.maxTeam,
                notes: id === 'notes' ? value : prevs.notes,
                EntryDeadline: id === 'deadline' ? value : prevs.EntryDeadline,
                divisions: prevs.divisions,
                externalLink: id === 'link' ? value : prevs.externalLink
            }
        });
    }
    //when the image component completes and upload it creates and array and spits it out. Using this handler will add the full array to the tournament
    const tournamentImageHandler = (imageArray) => {
        setTournament((prevs) => {
            return {
                images: imageArray,
                city: prevs.city,
                diamond: prevs.diamond,
                province: prevs.province,
                FullAddress: prevs.FullAddress,
                variant: prevs.variant,
                cost: prevs.cost,
                type: prevs.type,
                startTime: prevs.startTime,
                startDate: prevs.startDate,
                endTime: prevs.endTime,
                endDate: prevs.endDate,
                minTeam: prevs.minTeam,
                maxTeam: prevs.maxTeam,
                notes: prevs.notes,
                EntryDeadline: prevs.EntryDeadline,
                divisions: prevs.divisions,
                externalLink: prevs.externalLink
            }
        });
    }
    //the division component will create and array of divisions. This will add them to the tournament
    const setDivisionsHandler = (event) => {
        const divisions = event.target.value;
        setTournament((prevs) => {
            return {
                images: prevs.images,
                city: prevs.city,
                diamond: prevs.diamond,
                province: prevs.province,
                FullAddress: prevs.FullAddress,
                variant: prevs.variant,
                cost: prevs.cost,
                type: prevs.type,
                startTime: prevs.startTime,
                startDate: prevs.startDate,
                endTime: prevs.endTime,
                endDate: prevs.endDate,
                minTeam: prevs.minTeam,
                maxTeam: prevs.maxTeam,
                notes: prevs.notes,
                EntryDeadline: prevs.EntryDeadline,
                divisions: divisions,
                externalLink: prevs.externalLink
            }
        });
    }
    const setStartDate = (date) => {
        const newDate = new Date(date).toDateString();
        const newTime = new Date(date).toTimeString();
        setTournament((prevs) => {
            return {
                images: prevs.images,
                city: prevs.city,
                diamond: prevs.diamond,
                province: prevs.province,
                FullAddress: prevs.FullAddress,
                variant: prevs.variant,
                cost: prevs.cost,
                type: prevs.type,
                startTime: newTime,
                startDate: newDate,
                endTime: prevs.endTime,
                endDate: prevs.endDate,
                minTeam: prevs.minTeam,
                maxTeam: prevs.maxTeam,
                notes: prevs.notes,
                EntryDeadline: prevs.EntryDeadline,
                divisions: prevs.divisions,
                externalLink: prevs.externalLink
            }
        });
    }
    const setEndDate = (date) => {
        const newDate = new Date(date).toDateString();
        const newTime = new Date(date).toTimeString();
        setTournament((prevs) => {
            return {
                images: prevs.images,
                city: prevs.city,
                diamond: prevs.diamond,
                province: prevs.province,
                FullAddress: prevs.FullAddress,
                variant: prevs.variant,
                cost: prevs.cost,
                type: prevs.type,
                startTime: prevs.startTime,
                startDate: prevs.startDate,
                endTime: newTime,
                endDate: newDate,
                minTeam: prevs.minTeam,
                maxTeam: prevs.maxTeam,
                notes: prevs.notes,
                EntryDeadline: prevs.EntryDeadline,
                divisions: prevs.divisions,
                externalLink: prevs.externalLink
            }
        });
    }
    const setEntryDeadline = (date) => {
        const newDate = new Date(date).toDateString();
        setTournament((prevs) => {
            return {
                images: prevs.images,
                city: prevs.city,
                diamond: prevs.diamond,
                province: prevs.province,
                FullAddress: prevs.FullAddress,
                variant: prevs.variant,
                cost: prevs.cost,
                type: prevs.type,
                startTime: prevs.startTime,
                startDate: prevs.startDate,
                endTime: prevs.endTime,
                endDate: prevs.endDate,
                minTeam: prevs.minTeam,
                maxTeam: prevs.maxTeam,
                notes: prevs.notes,
                EntryDeadline: newDate,
                divisions: prevs.divisions,
                externalLink: prevs.externalLink
            }
        });
    }
    const setTypeHanlder = (event) => {
        const value = event.target.value;
        setTournament((prevs) => {
            return {
                images: prevs.images,
                city: prevs.city,
                diamond: prevs.diamond,
                province: prevs.province,
                FullAddress: prevs.FullAddress,
                variant: prevs.variant,
                cost: prevs.cost,
                type: value,
                startTime: prevs.startTime,
                startDate: prevs.startDate,
                endTime: prevs.endTime,
                endDate: prevs.endDate,
                minTeam: prevs.minTeam,
                maxTeam: prevs.maxTeam,
                notes: prevs.notes,
                EntryDeadline: prevs.EntryDeadline,
                divisions: prevs.divisions,
                externalLink: value === 'NSA' ? prevs.externalLink : ''
            }
        });
    }
    const checkCompletion = () => {
        return new Promise((resolve, reject) => {
            if (tournament.images.length < 1) {
                reject("Please add a poster for this tournament");
            }
            if (tournament.city === '' || tournament.diamond === '' || tournament.province === '' || tournament.variant === '' || tournament.FullAddress === '' || tournament.maxTeam === '' || tournament.minTeam === '') {
                reject('Please Filll in all required feilds mark with a star( * )');
            }
            if(tournament.divisions.length < 1) {
                reject('No division selected');
            }
            if(Number(tournament.cost) < 100) {
              reject('Please Fill in a price amount for this tournament. Minimum $100.00');
            }
            const startDate = new Date(tournament.startDate);
            const today = new Date();
            if(startDate <= today) {
                reject('Please fill in a date and time for this tournament');
            }
            const endDate = new Date(tournament.endDate);
            if(endDate < startDate) {
                reject('Ending date cannot be before the tournament starting date');
            }
            const entryDeadline = new Date(tournament.EntryDeadline);
            if(entryDeadline >= startDate) {
                reject('Entry deadline must pass before the start date');
            }
            resolve('Success');
        });
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const divisions = [
        'Co-Ed Rec',
        'Mens Rec',
        'Ladies Rec',
        'Co-Ed Int',
        'Mens Int',
        'Ladies Int'
    ];

    const save = () => {
        checkCompletion().then(() => {
            const startDay = new Date(tournament.startDate).getDate().toString();
            const startMonth = Number(new Date(tournament.startDate).getMonth() + 1).toString();
            const startYear = new Date(tournament.startDate).getFullYear();
            $.ajax({
                type: 'PUT',
                url: '/dashboard/tournaments',
                data: {
                    assets: {
                        poster: tournament.images[0],
                        images: tournament.images
                    },
                    location: {
                        city: tournament.city,
                        diamond: tournament.diamond,
                        province: tournament.province,
                        FullAddress: tournament.FullAddress
                    },
                    variation: tournament.variant,
                    cost: tournament.cost,
                    tournamentType: tournament.type,
                    dateTime: {
                        start: {
                            time: tournament.startTime,
                            date: `${startYear}-${startMonth.length === 1 ? `0${startMonth}` : startMonth}-${startDay.length === 1 ? `0${startDay}` : startDay}`
                        },
                        end: {
                            date: tournament.endDate,
                            time: tournament.endTime
                        },
                        EntryDeadline: tournament.EntryDeadline
                    },
                    teams: {
                        Min: tournament.minTeam,
                        Max: tournament.maxTeam
                    },
                    Notes: tournament.notes,
                    divisions: tournament.divisions,
                    externalLink: tournament.externalLink,
                },
                success: (data) => {
                   alert(data);
                   window.location.reload();
                },
                error: (error) => {
                   alert(error.responseText);
                }
            });
        }).catch((error) => {
           alert(error.responseText);
        });
    }
    const update = () => {
        checkCompletion().then(() => {
            const startDay = new Date(tournament.startDate).getDate().toString();
            const startMonth = Number(new Date(tournament.startDate).getMonth() + 1).toString();
            const startYear = new Date(tournament.startDate).getFullYear();
            $.ajax({
                type: 'PUT',
                url: `/dashboard/tournaments/${props.tournament._id}`,
                data: {
                    assets: {
                        poster: tournament.images[0],
                        images: tournament.images
                    },
                    location: {
                        city: tournament.city,
                        diamond: tournament.diamond,
                        province: tournament.province,
                        FullAddress: tournament.FullAddress
                    },
                    variation: tournament.variant,
                    cost: tournament.cost,
                    tournamentType: tournament.type,
                    dateTime: {
                        start: {
                            time: tournament.startTime,
                            date: `${startYear}-${startMonth.length === 1 ? `0${startMonth}` : startMonth}-${startDay.length === 1 ? `0${startDay}` : startDay}`
                        },
                        end: {
                            date: tournament.endDate,
                            time: tournament.endTime
                        },
                        EntryDeadline: tournament.EntryDeadline
                    },
                    teams: {
                        Min: tournament.minTeam,
                        Max: tournament.maxTeam
                    },
                    Notes: tournament.notes,
                    divisions: tournament.divisions,
                    externalLink: tournament.externalLink,
                },
                success: (data) => {
                    alert(data);
                    window.location.reload();
                },
                error: (error) => {
                    alert(error.responseText);
                }
            });
        }).catch((error) => {
            alert(error.responseText);
        });
    }

    return <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>{props.tournament ? 'Update Tournament' : 'New Tournament'}</Typography>
                <Button onClick={props.onClick} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={props.tournament ? update : save} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>{props.tournament ? 'Update' : 'Save'}</Button>
            </Box>
            <hr />
            {/* keyID must be different on each upload component within the same page */}
            <UploadImages key='main' keyID='main' location='tournaments' images={tournament.images} onUpload={tournamentImageHandler} />
            <hr />
            <Box sx={{ p: '1rem' }}>
                <Typography variant="h6" component="h6" gutterBottom>Locaiton Detials</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <TextField sx={{ width: '100%' }} required id="city" label="City" variant="standard" onChange={newTournamentHandler} value={tournament.city} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField sx={{ width: '100%' }} required id="diamond" label="Diamond" variant="standard" onChange={newTournamentHandler} value={tournament.diamond} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField sx={{ width: '100%' }} required id="province" label="Province" variant="standard" onChange={newTournamentHandler} value={tournament.province} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{ width: '100%' }} required id="variant" label="Variation" variant="standard" onChange={newTournamentHandler} value={tournament.variant} />
                    </Grid>
                    <Grid item xs={8} sm={9} xl={10}>
                        <TextField sx={{ width: '100%' }} required id="address" label="Full Address" variant="standard" onChange={newTournamentHandler} value={tournament.FullAddress} />
                    </Grid>
                    <Grid item xs={4} sm={3} xl={2}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="type"
                            select
                            required
                            variant="standard"
                            label="Type"
                            onChange={setTypeHanlder}
                            helperText="Please select Type"
                            value={tournament.type}
                        >
                            <MenuItem key='Normal' value='Normal'>Normal</MenuItem>
                            <MenuItem key='NSA' value='NSA'>NSA</MenuItem>
                            <MenuItem key='TOC' value='TOC'>TOC</MenuItem>
                        </TextField>
                    </Grid>
                    {tournament.type === 'NSA' && <Grid item xs={12}>
                        <TextField sx={{ width: '100%' }} required id="link" label="External Link" variant="standard" onChange={newTournamentHandler} value={tournament.externalLink} />
                    </Grid>}
                </Grid>
                <hr />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Typography variant="h6" component="h6" gutterBottom>Date & Time</Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <DateTimePicker
                                label="Start Date & Time"
                                onChange={setStartDate}
                                value={`${tournament.startDate} ${tournament.startTime}`}
                                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DateTimePicker
                                label="Ending Date & Time"
                                onChange={setEndDate}
                                value={`${tournament.endDate} ${tournament.endTime}`}
                                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DesktopDatePicker
                                label="Entry Deadline"
                                inputFormat="MM/dd/yyyy"
                                value={tournament.EntryDeadline}
                                onChange={setEntryDeadline}
                                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                <hr />
                <Typography variant="h6" component="h6" gutterBottom>Pricing and Divisions</Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} xl={3}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                            <Input
                                id="cost"
                                value={tournament.cost}
                                onChange={newTournamentHandler}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={8} xl={9}>
                        <FormControl sx={{ m: 1, width: '100%' }}>
                            <InputLabel>Divisions</InputLabel>
                            <Select
                                multiple
                                value={tournament.divisions}
                                onChange={setDivisionsHandler}
                                input={<OutlinedInput label="Divisions" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {divisions.map((division) => (
                                    <MenuItem key={division} value={division}>
                                        <Checkbox checked={tournament.divisions.indexOf(division) > -1} />
                                        <ListItemText primary={division} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <hr />
                <Typography variant="h6" component="h6" gutterBottom>Size & Notes</Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="minTeam"
                            label="Minimum Teams"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            value={tournament.minTeam}
                            onChange={newTournamentHandler}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="maxTeam"
                            label="Maximum Teams"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            value={tournament.maxTeam}
                            onChange={newTournamentHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="notes"
                            label="Notes"
                            multiline
                            rows={5}
                            variant="standard"
                            value={tournament.notes}
                            onChange={newTournamentHandler}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    </Backdrop>

}
export default TournamentCard;