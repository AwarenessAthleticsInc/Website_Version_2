import styles from "./Home.module.css"
import TournamentSlider from "../../Components/Tournaments/Card/TournamentList";
import { Link } from "react-router-dom";
import StoreSlider from "../../Components/Store/Products/StoreSlider";
import { Box } from "@mui/material";

const Home = (props) => {
    return <div>
        <Box sx={{ p: { md: '1rem 5rem' } }}>
            <TournamentSlider tournaments={props.tournaments}
                setTournaments={props.setTournaments}
                registrations={props.registrations}
                setRegistration={props.setRegistration}
                user={props.user}
                setUser={props.setUser}
                userRegistrations={props.userRegistrations}
                setUserRegistrations={props.setUserRegistrations}
            />
            <hr />
            <StoreSlider products={props.products}
                setProducts={props.setProducts}
                stock={props.stock}
                setStock={props.setStock}
                setCart={props.setCart}
            />
        </Box></div>
}
export default Home;
