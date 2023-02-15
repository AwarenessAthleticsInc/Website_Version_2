import Grid from '@mui/material/Grid';
import styles from "./TournamentSearchCard.module.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const TournamentSearchCard = (props) => {
    var width = window.innerWidth;
    const [poster, setPoster] = useState(false);
    const showPoster = (event) => {
        event.preventDefault();
        if (poster) {
            setPoster(false);
        } else {
            setPoster(true);
        }
    }
    return <div className={styles.tournamentArea}>
        <Link to={`tournaments/#${props.id}`}>
            <Grid container spacing={1} >
                {width > 992 && <Grid item sm={1} md={1} sx={{ alignItems: "center" }}>
                    <img className={styles.poster} src={props.image} />
                </Grid>}
                <Grid item xs={12} sm={4} md={6} sx={{ textAlign: "center" }}>
                    <p>{`${props.city}, ${props.diamond}`}</p>
                </Grid>
                <Grid item xs={6} sm={4} md={2} sx={{ textAlign: "center" }}>
                    <p>{props.date}</p>
                </Grid>
                <Grid item xs={6} sm={4} md={3} sx={{ textAlign: "center" }}>
                    <p>{`${props.price}`}</p>
                </Grid>
            </Grid>
        </Link>
    </div>
}
export default TournamentSearchCard;