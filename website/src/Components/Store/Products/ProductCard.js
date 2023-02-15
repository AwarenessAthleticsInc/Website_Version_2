import styles from "./ProductCard.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import ProductDialog from "./ProductDialog";
import ImgNextGen from "../../NextGenImages";
const ProductCard = (props) => {
    const [loading, setLoading] = useState(true);
    const loadingHandler = () => {
        setLoading(false);
    }
    const array = props.products.assets.Image.split('/');
    const name = array[1];
    const location = array[0];
    return <div className={`${styles.productContainer}`}><div className={`${styles.card} card w-100`}>
        {loading && <Skeleton animation="wave" sx={{ maxWidth: "98%", aspectRatio: "17 / 21" }} />}
        <ImgNextGen
            srcWebp={`/${location}/${name}/400/${name}.webp`}
            srcJpeg={`/${location}/${name}/400/${name}.jpeg`}
            fallback={`/${location}/${name}/400/${name}.png`}
            alt={`${props.products.name}`}
            onLoad={loadingHandler}
            style={{ width: '96%', margin: '2%' }}
        />
        <div class='card-body'>
            <h5 class='card-title'>{props.products.name}</h5>
            {props.products.colors.map((colors) => {
                return <i style={{ color: colors }} className={`fas fa-circle ${styles.colors}`}></i>
            })}
            {props.products.sizes.length > 1 ? <p>{`${props.products.sizes[0]} - ${props.products.sizes[props.products.sizes.length - 1]}`}</p> : <p>{props.products.sizes[0]}</p>}
            {props.products.pricing.onSale === true ? <Fragment>
                <h5 className={styles.priceOut}>{`$${Number(props.products.pricing.price).toFixed(2)}`}</h5>
                <p className={styles.price}> On Sale: <span className={styles.salePrice}>{`$${Number(props.products.pricing.salePrice).toFixed(2)}`}</span></p>
            </Fragment> : <h5 class='price'> Price: <span class='price'>{`$${Number(props.products.pricing.price).toFixed(2)}`}</span></h5>}
        </div>
        <ProductDialog setCart={props.setCart} product={props.products} stock={props.stock} />
    </div></div>
}
export default ProductCard;




