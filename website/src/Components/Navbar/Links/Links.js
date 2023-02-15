import { NavLink} from "react-router-dom";
import styles from "./Links.module.css";

const Links = (props) => {
    const navToggle = () => {
        props.navToggle();
    }
    return <ul id="menu" className={styles.menu} data-visible={props.navState ? "true" : "false"}>
            <li>
                <NavLink onClick={navToggle} to="/">Home</NavLink>
            </li>
            <li>
                <NavLink onClick={navToggle} to="/tournaments">Tournaments</NavLink>
            </li>
            <li>
                <NavLink onClick={navToggle} to="/tournament-of-champions">Tournament Of Champions</NavLink>
            </li>
            <li>
                <NavLink onClick={navToggle} to="/store">Store</NavLink>
            </li>
            <li>
                <NavLink onClick={navToggle} to="/about-us">About Us</NavLink>
            </li>
            <li>
                <NavLink onClick={navToggle} to="/rules-info">Rules & Info</NavLink>
            </li>
        </ul>

}
export default Links;