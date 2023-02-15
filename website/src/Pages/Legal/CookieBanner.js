import styles from "./CookieBanner.module.css";
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const CookieBanner = (props) => {
    const [cookieCheck, setCheck] = useState(false);
    const cookieCheckHandler = () => {
      setCheck(true);
    }
    return <Fragment>{!cookieCheck && !props.user && <div className={styles.cookieBanner}>
        <div class='row'>
            <div class='col-sm-4 d-flex justify-content-center align-items-center'>
                <i class='fas fa-cookie-bite fa-6x'></i>
            </div>
            <div class='col-sm-4 d-flex align-items-center'>
                <span class='mt-2'>We use third party cookies to personalize content and analyze site traffic. <Link to='/cookies'>Learn more <i class='fa fa-angle-right ml-2'></i></Link></span>
            </div>
            <div class='col-sm-4 d-flex align-items-center'>
                <button onClick={cookieCheckHandler} class='btn btn-sm rounded-pill btn-primary w-100' type='button'>Click To Agree</button>
            </div>
        </div>
    </div>}</Fragment>
}
export default CookieBanner