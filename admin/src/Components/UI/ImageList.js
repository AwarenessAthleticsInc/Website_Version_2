import { Grid } from "@mui/material"
import { useState } from "react"
import ImgNextGen from "./NextGenImages"

const ImageList = (props) => {
    const [images, setImages] = useState(props.images);

    return <Grid container sx={{ width: '100%', height: 250, p: '1rem' }}>
        {images.map((image, index) => {
            const array = image.split('/');
            const name = array[1];
            const location = array[0];
            return <Grid key={index} item xs={6} sm={4} md={3} xl={2}>
                <ImgNextGen
                    development={true}
                    key={index}
                    srcWebp={`/${location}/${name}/500/${name}.webp`}
                    srcJpeg={`/${location}/${name}/500/${name}.jpeg`}
                    fallback={`/${location}/${name}/500/${name}.png`}
                    alt={`Tournament of champians poster number ${index}`}
                    style={{ maxWidth: '75px' }}
                />
            </Grid>

        })}
    </Grid>
}
export default ImageList;