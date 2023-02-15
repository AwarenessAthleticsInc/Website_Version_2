import DesktopBar from "../../Components/Footer/DesktopBar";
import MobileBar from "../../Components/Footer/MobileBar";
const Footer = (props) => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return <MobileBar user={props.user}
            userOrders={props.userOrders}
            setUserOrders={props.setUserOrders}
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            payments={props.payments}
        />;
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return <MobileBar user={props.user}
            payments={props.payments}
            userOrders={props.userOrders}
            setUserOrders={props.setUserOrders}
            registrations={props.registrations}
            setRegistration={props.setRegistration}
        />;
    }
    return <DesktopBar />;
};

export default Footer;