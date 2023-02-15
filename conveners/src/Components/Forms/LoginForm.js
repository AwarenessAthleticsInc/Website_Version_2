import $ from "jquery";
import { useState } from "react";
import FloatingInput from "../Buttons/FloatingInput";
import Alert from '@mui/material/Alert';

const LoginFrom = (props) => {
    const [error, setError] = useState(false);
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
                if (error.responseText === 'Unauthorized') {
                    setError('Incorrect username or password');
                    return;
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
        {error && <Alert severity="error">{error}</Alert>}
        <br />
        <button onClick={loginClick} class="btn rounded-pill btn-lg btn-outline-primary w-100" type="button" name="button">Login</button>
        <a class="btn w-100" href="/users/forgotPass">Forgot Password?</a>
    </div>
}
export default LoginFrom;