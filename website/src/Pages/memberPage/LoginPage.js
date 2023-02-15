import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import logo from "../../Assets/Images/logo.webp";
import LoginForm from "../../Components/Forms/LoginForm";
import RegisterForm from "../../Components/Forms/RegisterForm";
import SliderButton from "../../Components/Buttons/SliderButton";

const LoginPage = (props) => {
    let navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const loginHandler = () => {
        if (login) {
            setLogin(false);
            return;
        }
        setLogin(true);
    }
    return <section className={styles.loginArea}>
        <SliderButton textOne="Login" textTwo="Register" onClick={loginHandler} status={login}/>
        <img src={logo} className={styles.logo} />
        {login ?
            <LoginForm onComplete={() => { navigate("/") }}
                registerClick={loginHandler}
                user={props.user}
                setUser={props.setUser}
            /> :
            <RegisterForm onComplete={() => { navigate("/") }}
                user={props.user}
                setUser={props.setUser}
            />
        }

    </section>
}
export default LoginPage;