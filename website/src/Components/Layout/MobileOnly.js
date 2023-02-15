import styles from "./MobileOnly.module.css";

const MobileOnly = (props) => {
   return <div className={styles.mobileOnly}>{props.children}</div>
}
export default MobileOnly;