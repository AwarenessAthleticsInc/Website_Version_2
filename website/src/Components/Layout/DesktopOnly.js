import styles from "./DesktopOnly.module.css";

const DesktopOnly = (props) => {
    return <div className={styles.desktopOnly}>{props.children}</div>
}
export default DesktopOnly;