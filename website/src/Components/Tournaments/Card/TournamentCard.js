import styles from "./TournamentCard.module.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { formatDateString } from "../../../Logic";
import RegisterButton from "../List/registerButton";
import Register from "../List/register";
import { Box } from "@mui/system";
import ImgNextGen from "../../NextGenImages";
const TournamentCard = (props) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [startReg, setStartReg] = useState(false);
    const [division, setId] = useState();
    const imageLoadingHandler = () => {
        setImageLoading(false);
    }
    const register = (event) => {
        if (startReg) {
            setStartReg(false);
            setId();
        } else {
            setId(event.target.id);
            setStartReg(true);
        }
    }
    const registrations = props.registrations.filter((regs) => {
        return regs.tournament._id === props.tournament._id
    });
    const date = new Date(formatDateString(props.tournament.dateTime.start.date));
    const array = props.tournament.assets.poster.split('/');
    const name = array[1];
    const location = array[0];
    return <Box className={`${styles.card} card w-100`}>
        <Link className={styles["event-poster"]} to={`/tournaments/#${props.tournament._id}`}>
        {imageLoading && <Skeleton animation="wave" sx={{ maxWidth: "98%", aspectRatio: "17 / 21" }} />}
        <ImgNextGen
            srcWebp={`/${location}/${name}/300/${name}.webp`}
            srcJpeg={`/${location}/${name}/300/${name}.jpeg`}
            fallback={`/${location}/${name}/300/${name}.png`}
            alt='A poster of the current tournament'
            onLoad={imageLoadingHandler}
            style={{ borderRadius: '0.5rem', width: '100%'}}
        />
        </Link>
        <Box sx={{textAlign: 'left', p: '1rem 0'}}>
            {imageLoading ?
                <Typography variant="p"><Skeleton animation="wave" /></Typography> :
                <Typography sx={{color: 'black', fontWeight: '500', fontSize: '0.9rem'}} variant="p">{`${props.tournament.location.city}, ${props.tournament.location.diamond}`}</Typography>
                /* <p style={{color: 'black'}} aria-hidden="true" className={styles.label}>{`${props.tournament.location.city}, ${props.tournament.location.diamond}`}</p> */
            }
            {imageLoading ?
                <Typography variant="p"><Skeleton animation="wave" /></Typography> :
                <p aria-hidden="true" className={styles.price}> {`$${Number(props.tournament.cost).toFixed(2)}`}</p>
            }
            {imageLoading ?
                <Typography variant="p"><Skeleton animation="wave" /></Typography> :
                props.tournament.Notes && <p className="small m-0">{`Note: ${props.tournament.Notes}`}</p>
            }
        </Box>
        <RegisterButton registrations={registrations} user={props.user} tournament={props.tournament} count={Number(props.tournament.teams.Max - registrations.length)} onClick={register} />
        {startReg && <Register tournament={props.tournament} user={props.user} close={register} />}
    </Box>
}
export default TournamentCard;




// tournament = { tournaments }
// registrations = { registrations }
// user = { props.user }
// userRegistrations = { props.userRegistrations }