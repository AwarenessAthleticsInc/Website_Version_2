import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import { Backdrop } from "@mui/material";
import ImgNextGen from "./NextGenImages";

const DocCard = (props) => {
    var array = [];
    var name = '';
    var location = '';
    if (props.doc.previewLocations.length > 0) {
        array = props.doc.previewLocations[0].split('/');
        name = array[1];
        location = array[0];
    }
    return <Paper elevation={3} sx={{ p: '1rem' }}>
        {props.doc.previewLocations.length < 1 ? <i className='far fa-file-pdf fa-5x'></i> : <ImgNextGen
            fullscreen={true}
            srcWebp={`/${array[0]}/${array[1]}/500/${array[1]}.webp`}
            srcJpeg={`/${array[0]}/${array[1]}/500/${array[1]}.jpeg`}
            fallback={`/${array[0]}/${array[1]}/500/${array[1]}.png`}
            alt={`${props.doc.title} image`}
            style={{ width: '100%' }}
        />}
        <h6 style={{ margin: '1rem auto' }}>{props.doc.title}</h6>
        <p>{props.doc.description}</p>
        <form action='/download' method='post'>
            {props.doc.documentLocations.map((location) => {
                return <Button sx={{ width: '100%' }} name='file' value={location} type='submit' color='secondary' variant='outlined'>{`Download: ${location}`}</Button>
            })}
        </form>

    </Paper>
}
export default DocCard;