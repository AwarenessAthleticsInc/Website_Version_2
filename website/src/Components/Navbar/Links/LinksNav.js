import styles from "./Links.module.css";
const LinksNav = (props) => {
    return <nav className={styles.navbar}>{props.children}</nav>
}
export default LinksNav;