import { useState } from "react";
import styles from "./SliderButton.module.css";

const SliderButton = (props) => {
    return <div className={styles.container}>
        <button id="loginBtn" onClick={props.onClick} className={`${styles.primaryBtn} btn`} data-left-focus={props.status ? true : false}>{props.textOne}</button>
        <button id="registerBtn" onClick={props.onClick} className={`${styles.secondaryBtn} btn`} data-right-focus={props.status ? false : true}>{props.textTwo}</button>
    </div>
}
export default SliderButton;