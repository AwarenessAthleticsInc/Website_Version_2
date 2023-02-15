import EventDate from "./EventDate";
import { useState } from "react";
import { formatDateShort } from "../../../Logic";
import SpotsLeft from "./spotsLeft";
import RegisterButton from "./registerButton";
import Register from "./register";
import { Button, Grid } from "@mui/material";
import ImgNextGen from "../../NextGenImages";
import { Typography } from "@mui/material";
const TournamenListItem = (props) => {
    const [showImage, setShowImage] = useState(false);
    const showImageHandler = () => {
        if (showImage) {
            setShowImage(false);
            return;
        }
        setShowImage(true);
    }
    const [startReg, setStartReg] = useState(false);
    const [division, setId] = useState();
    const register = (div) => {
        if (startReg) {
            setStartReg(false);
            window.scrollBy(0, -10);
            setId();
        } else {
            setId(div);
            window.scrollBy(0, 10);
            setStartReg(true);
        }
    }
    const registrations = props.registrations.filter((regs) => {
        return regs.tournament._id === props.tournament._id
    });
    const array = props.tournament.assets.poster.split('/');
    const name = array[1];
    const location = array[0];

    return <Grid container spacing={1} sx={{ alignItems: 'center', mb: '1rem', width: '100%' }}>
        <Grid item md={1} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <ImgNextGen
                srcWebp={`/${location}/${name}/300/${name}.webp`}
                srcJpeg={`/${location}/${name}/300/${name}.jpeg`}
                fallback={`/${location}/${name}/300/${name}.png`}
                alt={`${props.tournament.location.diamond}, ${props.tournament.location.city} poster`}
                style={{ width: '96%', margin: '2%' }}
            />
        </Grid>
        <Grid item xs={12} md={2} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <EventDate start={props.tournament.dateTime.start.date} end={props.tournament.dateTime.end.date} />
        </Grid>
        <Grid item md={6} xs={9} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <h6>{`${props.tournament.location.diamond}, ${props.tournament.location.city}`}</h6>
            {props.tournament.dateTime.EntryDeadline && <p className="small m-0">{`Deadline: ${new Date(props.tournament.dateTime.EntryDeadline).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}</p>}
            <SpotsLeft tournament={props.tournament} count={Number(props.tournament.teams.Max - registrations.length)} />
            {props.tournament.Notes && <p className="small m-0">{`Note: ${props.tournament.Notes}`}</p>}
        </Grid>
        <Grid item md={1} xs={3} sx={{ textAlign: { xs: 'right', md: 'center' } }}>
            <h6><strong>{`$${Number(props.tournament.cost).toFixed(2)}`}</strong></h6>
        </Grid>
        <Grid item md={2} xs={12}>
            <RegisterButton registrations={registrations} user={props.user} tournament={props.tournament} count={Number(props.tournament.teams.Max - registrations.length)} onClick={register} />
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
            <Button onClick={showImageHandler} color='success' variant="outlined" sx={{ borderRadius: '50rem', width: '100%', display: { xs: 'flex', md: 'none' }, marginTop: '0.5rem' }}>View Poster</Button>
            {showImage && <ImgNextGen
                srcWebp={`/${location}/${name}/500/${name}.webp`}
                srcJpeg={`/${location}/${name}/500/${name}.jpeg`}
                fallback={`/${location}/${name}/500/${name}.png`}
                alt={`${props.tournament.location.diamond}, ${props.tournament.location.city} poster`}
                style={{ width: '98%', margin: '1%' }}
            />}
        </Grid>
        {startReg && <Register tournament={props.tournament} setUser={props.setUser} user={props.user} division={division} close={register} />}
    </Grid>

}
export default TournamenListItem;