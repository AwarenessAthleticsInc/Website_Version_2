import { Box, TextField, Button, Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import $ from 'jquery';


const SetPasswordFrom = () => {
    let params = useParams();
    const [error, setError] = useState(false);
    const [strong, setStrong] = useState(false);
    const [password, setPassword] = useState({
        password: '',
        confirm: ''
    });
    const setPasswordHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setPassword((prevs) => {
            return {
                password: id === 'password' ? value : prevs.password,
                confirm: id === 'confirm' ? value : prevs.confirm
            }
        });
    } 
    const validatePassword = (event) => {
        setPasswordHandler(event);
        const password = event.target.value;
        if (password.length < 1) {
            $(".pass-text").remove();
            return;
        }
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (strongRegex.test(password)) {
            $(".pass-text").remove();
            $(".password-strength").css({
                "background-color": "green",
                "width": "100%",
                "color": "white"
            }).append("<p class='pass-text'>Strong</p>");
            setStrong(true);
            return true;
        } else if (mediumRegex.test(password)) {
            $(".pass-text").remove();
            $(".password-strength").css({
                "background-color": "orange",
                "width": "66.66%",
                "color": "white"
            }).append("<p class='pass-text'>Medium</p>");
            setStrong(false);
            return true;
        } else {
            $(".pass-text").remove();
            $(".password-strength").css({
                "background-color": "red",
                "width": "33.33%",
                "color": "white"
            }).append("<p class='pass-text'>Week</p>");
            setStrong(false);
            return false;
        }
    }
    const postPassword = () => {
        if (password.password.length < 1 || password.confirm.length < 1) {
            setError({
                title: 'No Password Enter',
                message: 'Please Enter a password and fill in the confirm password feild'
            });
            return;
        }
        if (password.password !== password.confirm) {
            setError({
                title: 'Matching Error',
                message: 'You password does NOT match you confirmation field'
            });
            return;
        }
        $.ajax({
          url: `/reset/${params.token}`,
          type: 'POST',
          data: {
            password: password.password
          },
          success: (response) => {
             alert(response);
             window.location.replace('/login');
          }, 
          error: (error) => {
             setError({
                title: error.status,
                message: error.responseText
             })
          }
        })
    }
    return <Box sx={{padding: '25% 10%'}}>
        <h6>Please Enter your new password</h6>
        <TextField onClick={() => {setError(false)}} type='password' value={password.password} onChange={validatePassword} sx={{ width: '100%' }} id="password" label="New Password" variant="standard" />
        <TextField onClick={() => {setError(false)}} type='password' value={password.confirm} onChange={setPasswordHandler} sx={{ width: '100%' }} id="confirm" label="Confirm Password" variant="standard" />
        {error && <Alert severity="error" sx={{ textAlign: 'left', marginTop: '1%' }}>
            <AlertTitle>{error.title}</AlertTitle>
            {error.message}
        </Alert>}
        <div class="password-strength text-center"></div>
        {!strong && <Button disabled color='primary' variant="contained" sx={{ borderRadius: '50rem', m: '1%', width: '98%' }}>Complete Reset</Button>}
        {strong && <Button onClick={postPassword} color='primary' variant="contained" sx={{ borderRadius: '50rem', m: '1%', width: '98%' }}>Complete Reset</Button>}
    </Box> 
}
export default SetPasswordFrom;