import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system"
import Logo from "../../Components/Logo";
import { useNavigate } from "react-router-dom";
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import StoreIcon from '@mui/icons-material/Store';
import { Grid } from "@mui/material";
import { monthNamesShort } from '../../Logic';
import { formatDateString } from "../../Logic";
import ImgNextGen from "../../Components/NextGenImages";
import styles from "./Toc.module.css";
import { useState } from "react";

const Toc = (props) => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    var array = [];
    var name = '';
    var location = '';
    if (props.toc.length > 0) {
        array = props.toc[0].poster.split('/');
        name = array[1];
        location = array[0];
    }
    return props.toc.length < 1 ?
        <Box sx={{ m: { xs: '5rem 1rem', md: '2rem 5rem' } }} >
            <Logo height='75px' margin='2rem' />
            <h1 className='showcard'><i class='fas fa-baseball-ball'></i> Tournament Of Champions</h1>
            <h6>{`Currently Nothing listed for ${new Date().getFullYear()}`}</h6>
            <br />
            <Button startIcon={<SportsBaseballIcon />} onClick={() => { navigate('/tournaments') }} variant="contained" color='success' sx={{ borderRadius: '50rem', width: { xs: '98%', md: '80%' }, margin: { xs: '1%', md: '1% 10%' } }}>Other Tournaments</Button>
            <Button startIcon={<StoreIcon />} onClick={() => { navigate('/store') }} variant="contained" color='primary' sx={{ borderRadius: '50rem', width: { xs: '98%', md: '80%' }, margin: { xs: '1%', md: '1% 10%' } }}>Shop Products</Button>
        </Box> : <Box sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem' } }} >
            <h1 class="showcard"><i class="fas fa-baseball-ball"></i> Tournament Of Champions</h1>
            <hr />
            <Grid container>
                <Grid item xs={12} sm={5} md={4}>
                    <ImgNextGen
                        fullscreen={true}
                        srcWebp={`${location}/${name}/500/${name}.webp`}
                        srcJpeg={`${location}/${name}/500/${name}.jpeg`}
                        fallback={`${location}/${name}/500/${name}.png`}
                        alt="Tournament of champions informational poster"
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                    {props.toc[0].dates.map((tournament) => {
                        var tournamentImageArray = tournament.assets.poster.split('/');
                        var tournamentImageName = tournamentImageArray[1];
                        var tournamentImageLocation = tournamentImageArray[0];
                        var date = new Date(formatDateString(tournament.dateTime.start.date));
                        return <div className={`${styles.tocEventDates} row d-flex justify-content-center align-items-center`}>
                            <div class='col-3 date rounded'>
                                <h2>{date.getDate()}</h2>
                                <h4>{monthNamesShort[date.getMonth()]}</h4>
                            </div>
                            <div class='col-6 d-flex align-items-center justify-content-center'>
                                <p>{`${tournament.location.city}, ${tournament.location.diamond}`}</p>
                            </div>
                            <div class='col-3 d-flex align-items-center justify-content-center'>
                                <ImgNextGen
                                    fullscreen={true}
                                    srcWebp={`${tournamentImageLocation}/${tournamentImageName}/500/${tournamentImageName}.webp`}
                                    srcJpeg={`${tournamentImageLocation}/${tournamentImageName}/500/${tournamentImageName}.jpeg`}
                                    fallback={`${tournamentImageLocation}/${tournamentImageName}/500/${tournamentImageName}.png`}
                                    alt={`${tournament.location.diamond}, ${tournament.location.city} poster`}
                                    style={{ width: '80%', margin: '5% 10%' }}
                                />
                            </div>
                        </div>

                    })}
                </Grid>
            </Grid>
            {props.toc[0].sections.map((section) => {
                return <Box>
                    <Paper elevation={3} className={styles.sectionDetails}>
                        <h4 className='showcard'>{section.title}</h4>
                        <p>{section.description}</p>
                        <Grid container spacing={2}>
                            {section.files.map((file) => {
                                var fileArray = file.split('/');
                                var fileName = fileArray[1];
                                var fileLocation = fileArray[0];
                                return <Grid item xs={12} sm={6} md={4} lg={3}><ImgNextGen
                                    fullscreen={true}
                                    srcWebp={`${fileLocation}/${fileName}/500/${fileName}.webp`}
                                    srcJpeg={`${fileLocation}/${fileName}/500/${fileName}.jpeg`}
                                    fallback={`${fileLocation}/${fileName}/500/${fileName}.png`}
                                    alt="Tournament of champions informational poster"
                                    style={{ width: '98%', margin: '2%' }}
                                /></Grid>
                            })}
                        </Grid>
                    </Paper>
                </Box>
            })}
            {/* toc sections here  */}
        </Box>
}
export default Toc;