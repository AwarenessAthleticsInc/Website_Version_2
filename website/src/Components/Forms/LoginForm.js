import $ from "jquery";
import { useState } from "react";
import FloatingInput from "../../Components/UI/Buttons/FloatingInput"
import Alert from '@mui/material/Alert';
import { Button } from "@mui/material";
import ForgotPasswordFrom from "./ForgotPasswordForm";
const LoginFrom = (props) => {
    const [error, setError] = useState(false);
    const [registerButton, setRegisterButton] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: ""
    });
    const loginHandler = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        switch (name) {
            case "username":
                setLoginUser((prevs) => {
                    return {
                        username: value,
                        password: prevs.password
                    }
                });
                break;
            case "password":
                setLoginUser((prevs) => {
                    return {
                        username: prevs.username,
                        password: value
                    }
                });
                break;
            default:

                break;
        }
    }
    const loginClick = (event) => {
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: {
                username: loginUser.username,
                password: loginUser.password
            },
            success: function (user) {
                setError(false);
                props.setUser(user);
                props.onComplete();
            },
            error: function (error) {
                console.log(error);
                if (error.responseText === 'Unauthorized') {
                    setError('Incorrect username or password.');
                    return;
                }
                if (error.responseText.includes('No account')) {
                    setRegisterButton(true);
                    setError(error.responseText);
                }
                setError(error.responseText);
            }
        });
    }
    const enterCheck = (event) => {
       if(event.key === "Enter") {
         loginClick();
       }
    }
    return <div id="login" data-focus="true">
        <FloatingInput onChange={loginHandler} type="email" id="username" label="Email Address *" autocomplete="email" />
        <br />
        <FloatingInput onKeyDown={enterCheck} onChange={loginHandler}  type="password" id="password" label="Password *" autocomplete="password" />
        {error && registerButton && <Button variant="text" sx={{ display: 'flex', justifyContent: 'start', width: '100%', p: '0', textTransform: 'inherit' }}><Alert onClick={props.registerClick} severity="error" sx={{width: '100%'}}>{error}</Alert></Button>}
        {error && !registerButton && <Alert onClick={loginHandler} severity="error">{error}</Alert>}
        <br />
        <button onClick={loginClick} className="btn rounded-pill btn-lg btn-outline-primary w-100" type="button" name="button">Login</button>
        <Button onClick={() => {setForgot(!forgot)}} variant='text' color='action'>Forgot Password</Button>
        {forgot && <ForgotPasswordFrom close={() => { setForgot(!forgot) }} />}
    </div>
}
export default LoginFrom;