import { Fragment } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import ProductDialog from "./ProductDialog";
import styles from './ProductCard.module.css';
import CarouselContainer from "../../Layout/Carousel";
import ImgNextGen from "../../NextGenImages";

const ProductListItem = (props) => {
    const [loading, setLoading] = useState(true);
    const loadingHandler = () => {
        setLoading(false);
    }
    const breakpoints = {
        Small: {
            breakpoint: { max: 80000, min: 0 },
            items: 1
        },
    }
    return props.product.length > 0 &&
     props.product.map((products) => {
         return <Grid sx={{alignItems: 'center', p: '1rem'}} container space={1}>
             <Grid item xs={12} md={2} sx={{p: {xs: '0 15%', md: '0'}}}>
                 <CarouselContainer breakpoints={breakpoints} arrows={true}>
                     {products.assets.gallery.map((image) => {
                         const array = image.split('/');
                         const name = array[1];
                         const location = array[0];
                         return <ImgNextGen
                             srcWebp={`/${location}/${name}/200/${name}.webp`}
                             srcJpeg={`/${location}/${name}/200/${name}.jpeg`}
                             fallback={`/${location}/${name}/200/${name}.png`}
                             alt={`${props.product.name}`}
                             style={{ width: '100%' }}
                         />
                     })}
                 </CarouselContainer>
                 
             </Grid>
             <Grid item xs={12} md={6}>
                 <h5 class='card-title'>{products.name}</h5>
                 {products.colors.map((colors) => {
                     return <i style={{ color: colors }} className={`fas fa-circle ${styles.colors}`}></i>
                 })}
                 {products.sizes.length > 1 ? <p>{`${products.sizes[0]} - ${products.sizes[products.sizes.length - 1]}`}</p> : <p>{products.sizes[0]}</p>}
             </Grid>
             <Grid item xs={12} md={2}>
                 {products.pricing.onSale === true ? <Fragment>
                     <h5 className={styles.priceOut}>{`$${Number(products.pricing.price).toFixed(2)}`}</h5>
                     <p className={styles.price}> On Sale: <span className={styles.salePrice}>{`$${Number(products.pricing.salePrice).toFixed(2)}`}</span></p>
                 </Fragment> : <h5 class='price'> Price: <span class='price'>{`$${Number(products.pricing.price).toFixed(2)}`}</span></h5>}
             </Grid>
             <Grid item xs={12} md={2}>
                 <ProductDialog setCart={props.setCart} product={products} stock={props.stock} />
             </Grid>
         </Grid>
     })

}
export default ProductListItem;