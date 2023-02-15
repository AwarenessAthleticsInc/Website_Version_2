import $ from "jquery";
import { useState } from "react";
import FloatingInput from "../../Components/UI/Buttons/FloatingInput"
import { Link } from "react-router-dom";
const RegisterForm = (props) => {
    const [regUser, setRegUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        password: ""
    });
    const registerHandler = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setRegUser((prevs) => {
            return {
                firstName: name === 'firstName' ? value : prevs.firstName,
                lastName: name === 'lastName' ? value : prevs.lastName,
                username: name === 'email' ? value : prevs.username,
                phone: name === 'phone' ? value : prevs.phone,
                password: name === 'password' ? value : prevs.password
            }
        });
    }
    const validatePassword = (event) => {
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
            registerHandler(event);
            return true;
        } else if (mediumRegex.test(password)) {
            $(".pass-text").remove();
            $(".password-strength").css({
                "background-color": "orange",
                "width": "66.66%",
                "color": "white"
            }).append("<p class='pass-text'>Medium</p>");
            registerHandler(event);
            return true;
        } else {
            $(".pass-text").remove();
            $(".password-strength").css({
                "background-color": "red",
                "width": "33.33%",
                "color": "white"
            }).append("<p class='pass-text'>Week</p>");
            return false;
        }
    }
    const registerClick = (event) => {
        $.ajax({
            type: "POST",
            url: "/api/register",
            data: regUser,
            success: function (user) {
                props.setUser(user);
                props.onComplete();
            },
            error: function (error) {
                alert(error.responseText);
            }
        });
    }
    return <div id="Create">
        <div class="row">
            <div class="col-12 col-md-6 p-2">
                <FloatingInput classes="name" onChange={registerHandler} type="text" id="firstName" label="First *" autocomplete="given-name" />
            </div>
            <div class="col-12 col-md-6 p-2">
                <FloatingInput classes="name" onChange={registerHandler} type="text" id="lastName" label="Last *" autocomplete="family-name" />
            </div>
            <div class="col-12 p-2">
                <FloatingInput onChange={registerHandler} type="email" id="email" label="Email Address *" autocomplete="email" />
            </div>
            <div class="col-12 p-2">
                <FloatingInput onChange={registerHandler} type="tel" classes="phone" id="phone" label="Phone *" autocomplete="tel" />
            </div>
            <div class="col-12 p-2">
                <FloatingInput type="password" onChange={validatePassword} id="password" label="Password *" />
                <br />
                <div class="password-strength text-center"></div>
            </div>
        </div>
        <br />
        <p>By clicking Register, you agree to our <Link to="/terms-conditions"><strong>Terms & Conditions</strong></Link> and <Link to="/privacy-policies"><strong>Privacy Policy</strong></Link></p>
        <button onClick={registerClick} class="btn rounded-pill btn-lg btn-success w-100 btn-create" type="button" name="button">Register</button>
    </div>
}
export default RegisterForm;