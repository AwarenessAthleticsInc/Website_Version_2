import { useState } from 'react';

import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
const ImgNextGen = ({
  srcWebp,
  srcJpeg,
  fallback,
  alt,
  style,
  fullscreen,
  onClick,
  development
}) => {
  const [loaded, setLoaded] = useState(false);
  const [skeletonSize, setSkeletonSize] = useState({
    width: '100%',
    height: 'auto'
  });
  const SkeletonSizeHandler = (width, height) => {
    setSkeletonSize({
      width: width,
      height: height
    })
  }
  const onLoadError = (event) => {
    setLoaded(false);
    SkeletonSizeHandler(event.target.width, event.target.height);
    event.currentTarget.src = development ? `http://localhost:5000${fallback}` : fallback;
  }
  const onLoadSuccess = () => {
    setLoaded(true);
  }
  return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {!loaded && <Skeleton variant="rectangular" width={skeletonSize.width} height={skeletonSize.height} sx={{aspectRatio: '1/1'}} />}
    <picture>
      <source srcSet={development ? `http://localhost:5000${srcWebp}` : srcWebp} type="image/webp" />
      <source srcSet={development ? `http://localhost:5000${srcJpeg}` : srcJpeg} type="image/jpeg" />
      <source srcSet={development ? `http://localhost:5000${fallback}` : fallback} type="image/png" />
      <img src={development ? `http://localhost:5000${fallback}` : fallback}
        alt={alt}
        style={style}
        loading="lazy"
        onLoad={() => {setLoaded(true)}}
        onError={onLoadError}
      
      />
    </picture>
  </Box>
};

export default ImgNextGen;


// {/* <ImgNextGen
//   srcWebp={`/${location}/${name}/500/${name}.webp`}
//   srcJpeg={`/${location}/${name}/500/${name}.jpeg`}
//   fallback={`/${location}/${name}/500/${name}.png`}
//   alt='A poster of the current tournament'
//   onLoad={imageLoadingHandler}
// /> */}