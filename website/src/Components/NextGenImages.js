import React, { Fragment, useState } from 'react';
import { Backdrop } from '@mui/material';
import { Skeleton } from '@mui/material';
const ImgNextGen = ({
  srcWebp,
  srcJpeg,
  fallback,
  alt,
  onLoad,
  style,
  fullscreen,
  onClick
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
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
    event.currentTarget.src = fallback;
  }
  const onLoadSuccess = () => {
    setLoaded(true);
  }
  return (<Fragment>
    {!loaded && <Skeleton variant="rectangular" width={skeletonSize.width} height={skeletonSize.height} sx={{ aspectRatio: '1/1' }} />}
    <picture>
      <source srcset={srcWebp} type="image/webp" />
      <source srcset={fallback} type="image/png" />
      <source srcset={srcJpeg} type="image/jpeg" />
      <img onClick={fullscreen ? handleToggle : onClick}
        src={srcJpeg}
        alt={alt}
        style={style}
        onLoad={() => { setLoaded(true); onLoad(); }}
        onError={onLoadError}
      />
    </picture>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%' }}
      open={open}
      onClick={handleClose}
    >
      <picture>
        <source srcset={srcWebp} type="image/webp" />
        <source srcset={fallback} type="image/png" />
        <source srcset={srcJpeg} type="image/jpeg" />
        <img onClick={fullscreen ? handleToggle : onClick}
          src={srcJpeg}
          alt={alt}
          style={style}
          onLoad={() => { setLoaded(true); onLoad(); }}
          onError={onLoadError}
        />
      </picture>
    </Backdrop>
  </Fragment>

  );
};

export default ImgNextGen;


{/* <ImgNextGen
  srcWebp={`/${location}/${name}/500/${name}.webp`}
  srcJpeg={`/${location}/${name}/500/${name}.jpeg`}
  fallback={`/${location}/${name}/500/${name}.png`}
  alt='A poster of the current tournament'
  onLoad={imageLoadingHandler}
/> */}