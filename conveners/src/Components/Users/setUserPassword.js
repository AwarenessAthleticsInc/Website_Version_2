import {
    Paper,
    Backdrop,
    Typography,
    Button,
    Box,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
    Input
} from "@mui/material";
import { useState } from "react";
import $ from 'jquery';
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

const SetUserPassword = (props) => {
    const [user, setUser] = useState({
        data: props.username,
        password: '',
        confirm: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState('');
    const setUserHandler = (event) => {
        const password = event.target.value;
        const id = event.target.id;
        setUser((prevs) => {
            return {
                data: prevs.data,
                password: id === 'password' ? password : prevs.password,
                confirm: id === 'confirm' ? password : prevs.confirm,
            }
        })
    }
    const update = () => {
        if(user.password.length < 8) {
            alert('Please enter a password with at least 8 characters or click "Auto Generate Password". ');
            return;
        }
        if(user.password !== user.confirm) {
            alert('Confirmation feild does NOT match your password field');
            return;
        }
        $.ajax({
            type: 'PUT',
            url: '/dashboard/user/setPassword',
            data: {
                data: user.data,
                password: user.password
            },
            success: (response) => {
               alert(response);
               window.location.reload();
            },
            error: (error) => {
               alert(error);
            }
        });
    }
    const generatePassword = () => {
        const randomPassword = Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 8);
        setUser((prevs) => {
            return {
                data: prevs.data,
                password: randomPassword,
                confirm: randomPassword,
            }
        });
        if (navigator.clipboard.writeText(randomPassword)) {
            setMessage("Password copied to your clipboard");
        }
    };
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>Reset Password</Typography>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={update} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>Set Password</Button>
            </Box>
            <hr />
            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    onChange={setUserHandler}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle new password visibility"
                                onClick={() => { setShowPassword(!showPassword) }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                <InputLabel htmlFor="confirm">Confirm</InputLabel>
                <Input
                    id="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={user.confirm}
                    onChange={setUserHandler}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirmation password visibility"
                                onClick={() => { setShowConfirm(!showConfirm) }}
                            >
                                {showConfirm ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Box sx={{display: 'flex', alignItem: 'center'}}>
                <Button sx={{marginRight: 'auto'}} onClick={generatePassword} variant="text" color='secondary'>Auto Generate Password</Button>
                <Typography variant="h6" component="h6" gutterBottom><em>{message}</em></Typography>
            </Box>
        </Paper>
    </Backdrop>
}
export default SetUserPassword;