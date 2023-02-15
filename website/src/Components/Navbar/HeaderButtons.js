import LoginButton from "../../Components/Navbar/Buttons/LoginButton";
import CartButton from "../../Components/Navbar/Buttons/CartButton";
// import NotifactionButton from "../../Components/Navbar/Buttons/NotifactionButton";
import { Fragment } from "react";
const HeaderButtons = (props) => {
  return <Fragment>
    <LoginButton setUser={props.setUser} user={props.user}/>
    {/* <NotifactionButton count={2} /> */}
    <CartButton countCheck={props.cartCount} />
  </Fragment>
}

export default HeaderButtons;