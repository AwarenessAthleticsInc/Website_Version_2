import styles from "./Links.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "../../UI/Buttons/IconButton";
import CloseIcon from '@mui/icons-material/Close';

const LinksButton = (props) => {
    const navToggle = () => {
        props.navToggle();
    }
    return <button className={styles["nav-toggle"]} onClick={navToggle}>{props.navState ? <CloseIcon color="action" /> : <MenuIcon color="action" />}</button>
}
export default LinksButton;