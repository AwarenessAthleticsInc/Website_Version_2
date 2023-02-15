import styles from "./GradiantBackground.module.css";

const GradiantBackground = (props) => {
    return <div className={styles.background}>
        {props.children}
    </div>
}
export default GradiantBackground