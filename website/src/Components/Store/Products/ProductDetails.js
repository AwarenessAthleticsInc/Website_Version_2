import Grid from '@mui/material/Grid';
import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import CircleIcon from '@mui/icons-material/Circle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CarouselContainer from '../../Layout/Carousel';
import $ from 'jquery';
import ImgNextGen from '../../NextGenImages';

const ProductDetails = (props) => {
    const [qty, setQty] = useState(1);
    const add = () => {
        setQty((prev) => {
            return Number(prev + 1);
        });
    }
    const remove = () => {
        if (qty !== 1) {
            setQty((prev) => {
                return Number(prev - 1);
            });
        }
    }
    const [selectedColor, setSelectedColor] = useState(props.product.colors[0]);
    const [selectedStock, setSelectStock] = useState();
    const [Stock, setStock] = useState([]);
    useEffect(() => {
        if (Stock.length < 1) {
            const newStock = props.stock.filter((stock) => {
                console.log(stock);
                return stock.color === selectedColor;
            });

            setStock(() => {
                return newStock;
            })
            return;
        }
    }, []);
    const selectColor = (event) => {
        const newStock = props.stock.filter((stock) => {
            return stock.color === event.target.id;
        });
        setStock(() => {
            return newStock;
        });
        setSelectedColor(event.target.id);
    }
    const ImageBreakpoints = {
        ONE: {
            breakpoint: { max: 10000, min: 0 },
            items: 1
        }
    }

     const addToCart = () => {
        const product = {
            id: props.product._id,
            name: props.product.name,
            price: props.product.pricing.onSale ? props.product.pricing.salePrice : props.product.pricing.price,
            size: selectedStock,
            color: selectedColor,
            image: props.product.assets.gallery,
            weight: props.product.shipping.weight,
            qty: qty
        }
         $.ajax({
             type: "POST",
             url: '/api/cart',
             data: product,
             success: function (data) { 
                props.setCart(data);
                props.handleClose();
             },
             error: function (error) {
                
             }
         });
     }

    return <Grid sx={{ p: '5%' }} container spacing={2}>
        <Grid item xs={12} md={4}>
            <CarouselContainer breakpoints={ImageBreakpoints}>
                {props.product.assets.gallery.map((image) => {
                    const array = image.split('/');
                    const name = array[1];
                    const location = array[0];
                    return <ImgNextGen
                        srcWebp={`/${location}/${name}/300/${name}.webp`}
                        srcJpeg={`/${location}/${name}/300/${name}.jpeg`}
                        fallback={`/${location}/${name}/300/${name}.png`}
                        alt={`${props.product.name}`}
                        style={{ width: '100%' }}
                    />
                })}
            </CarouselContainer>
        </Grid>
        <Grid sx={{ textAlign: 'left' }} item xs={12} md={8} >
            <div style={{ padding: '0 1rem' }}>
                <h1>{props.product.name}</h1>
                <hr />
                <p>{props.product.description}</p>
                <br />
                {props.product.pricing.onSale ?
                    <div>
                        <p className={styles['price-Saled']}>{`$${Number(props.product.pricing.price).toFixed(2)}`}</p>
                        <h2 className={styles.sale}>{`$${Number(props.product.pricing.salePrice).toFixed(2)}`}</h2>
                    </div> :
                    <h2 className={styles.price} >{`$${Number(props.product.pricing.price).toFixed(2)}`}</h2>}
                {props.product.colors.map((color) => {
                    return color === selectedColor ?
                        <Button startIcon={<CircleIcon />} onClick={selectColor} id={color} sx={{ color: color, border: '1px solid #00A1Cf' }}>{color}</Button> :
                        <Button startIcon={<CircleIcon />} onClick={selectColor} id={color} sx={{ color: color }}>{color}</Button>
                })}
                <Grid sx={{ m: '1rem 0.7rem' }} container spacing={0}>
                    {Stock.map((stock) => {
                        if (Number(stock.stock) < 1) {
                            return <Grid item xs={6} sm={3} md={4} lg={5}>
                                <p className={styles.outOfStock}>{stock.size}</p>
                                <p className={styles.outOfStockLabel}>Temporarily out of Stock</p>
                            </Grid>
                        } else {
                            return <Grid item xs={6} sm={5} lg={4}>
                                <p className={styles.InStock}>
                                    {stock.size === selectedStock ?
                                        <input checked id={stock.size} className={styles.sizeCheck} type='checkbox' onChange={() => { setSelectStock(stock.size) }} /> :
                                        <input id={stock.size} className={styles.sizeCheck} type='checkbox' onChange={() => { setSelectStock(stock.size) }} />
                                    } {`${stock.size}`}
                                </p>
                            </Grid>
                        }
                    })}
                </Grid>
                <ButtonGroup>
                    <IconButton onClick={remove}>
                        <RemoveIcon />
                    </IconButton>
                    <Button color="action" variant='text'>{qty}</Button>
                    <IconButton onClick={add}>
                        <AddIcon />
                    </IconButton>
                </ButtonGroup>
            </div>
            <br />
            <Button onClick={addToCart} startIcon={<ShoppingCartIcon />} variant='contained' sx={{ borderRadius: '50rem', width: '96%', m: '0 2%' }}>Add to Cart</Button>
        </Grid>
    </Grid>
}
export default ProductDetails;