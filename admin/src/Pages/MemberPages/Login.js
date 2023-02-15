import { Paper } from "@mui/material";
import LoginFrom from "../../Components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.webp';

const Login = (props) => {
    let navigate = useNavigate();
    return <Paper sx={{p: {xs: '0rem', md: '10% 25%'}, m: {xs: '1rem', md: '2rem 1rem'}, textAlign: 'center'}}>
        <img src={logo} style={{width: '50%', margin: '1rem'}} />
        <LoginFrom
            onComplete={() => { navigate("/dashboard") }}
            user={props.user}
            setUser={props.setUser}
        />
    </Paper>

}
export default Login;