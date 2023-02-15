import logo from "../Assets/Images/logo.webp"
import { Link } from "react-router-dom"
const Logo = (props) => {
    const logoStyle = {
        height: props.height,
        margin: props.margin
    }
    return <Link to="/">
        <img style={logoStyle} src={logo} alt="Slo pitch for awarness logo. It has four different colored puzzle peiece and a bat with with the text SPFA across it." />
    </Link>
}
export default Logo;