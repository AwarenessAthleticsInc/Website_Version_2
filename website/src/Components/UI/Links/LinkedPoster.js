import { Link } from "react-router-dom";
import { useState } from "react";
import Skeleton from '@mui/material/Skeleton';

const LinkedPoster = (props) => {  
   const [imageLoading, setImageLoading] = useState(true);
   const imageLoadingHandler = () => {
      setImageLoading(false);
   }
   return <Link to={`/tournaments/#${props.id}`}>
      {imageLoading && <Skeleton animation="wave" sx={{ maxWidth: "98%", aspectRatio: "9 / 22" }} />}
      <img onLoad={imageLoadingHandler} loading="lazy" className={props.className} style={props.style} alt="Tournament Poster" src={props.src}/>
   </Link>
}
export default LinkedPoster;