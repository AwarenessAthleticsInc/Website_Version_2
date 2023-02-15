/**
 * React Imports 
 */
import { useState } from "react";
/**
 * Material UI Imports
 */
import {
    Box,
    TextField,
    Grid,
    Checkbox,
    Tooltip,
    Chip,
    Backdrop,
    Button,
    Paper,
    Typography
} from "@mui/material";
/**
 * Jquery Packages
 */
import $ from 'jquery';
/**
 * Custom Components Import
 */
import UploadImages from "../../data/uploadImages";
import StockCard from "../../Store/Stock/StockCard";

const ProductDetailCard = (props) => {
    const [stock, setStock] = useState(props.stock ? props.stock : []);
    const updateStock = (stock) => {
        setStock([...stock]);
    }
    const [images, setImages] = useState(props.product ? props.product.assets.gallery : []); //used to hold the value of all uploaded images
    const newImageHandler = (array) => {
        setImages(array);
    }
    const [product, setProducts] = useState({
        name: props.product ? props.product.name : '',
        description: props.product ? props.product.description : '',
        pricing: {
            price: props.product ? props.product.pricing.price : Number(0).toFixed(2),
            onSale: props.product ? props.product.pricing.onSale : false,
            salePrice: props.product ? props.product.pricing.salePrice : Number(0).toFixed(2)
        },
        colors: props.product ? props.product.colors : [],
        sizes: props.product ? props.product.sizes : [],
        shipping: {
            weight: props.product ? props.product.shipping.weight : ''
        }
    });
    const setProductHandler = (event) => {
        const id = event.target.id;
        const value = id === 'onSale' ? event.target.checked : event.target.value;
        setProducts((prevs) => {
            return {
                name: id === 'name' ? value : prevs.name,
                description: id === 'description' ? value : prevs.description,
                pricing: {
                    price: id === 'price' ? Number(value).toFixed(2) : prevs.pricing.price,
                    onSale: id === 'onSale' ? value : prevs.pricing.onSale,
                    salePrice: id === 'salePrice' ? Number(value).toFixed(2) : prevs.pricing.salePrice
                },
                colors: prevs.colors,
                sizes: prevs.sizes,
                shipping: {
                    weight: id === 'weight' ? value : prevs.shipping.weight
                }
            }
        });
    }
    const setProductColorHandler = (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        const value = event.target.value;
        const index = product.colors.indexOf(value);
        if (index === 0) {
            alert('Color was already added');
            return;
        }
        if (index > -1) {
            return
        }
        setProducts((prevs) => {
            return {
                name: prevs.name,
                description: prevs.description,
                pricing: {
                    price: prevs.pricing.price,
                    onSale: prevs.pricing.onSale,
                    salePrice: prevs.pricing.salePrice
                },
                colors: [...prevs.colors, value],
                sizes: prevs.sizes,
                shipping: {
                    weight: prevs.shipping.weight
                }
            }
        });
        event.target.value = '';
    }
    const handleColorDelete = (color) => {
        const index = product.colors.indexOf(color);
        if (index === -1) {
            alert(`This color isn't on the list`);
            return;
        }
        product.colors.splice(index, 1);
        setProducts((prevs) => {
            return {
                name: prevs.name,
                description: prevs.description,
                pricing: {
                    price: prevs.pricing.price,
                    onSale: prevs.pricing.onSale,
                    salePrice: prevs.pricing.salePrice
                },
                colors: [...product.colors],
                sizes: prevs.sizes,
                shipping: {
                    weight: prevs.shipping.weight
                }
            }
        });
    }
    const setProductSizesHandler = (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        const value = event.target.value;
        const index = product.sizes.indexOf(value);
        if (index === 0) {
            alert('Size was already added');
            return;
        }
        if (index > -1) {
            return
        }
        setProducts((prevs) => {
            return {
                name: prevs.name,
                description: prevs.description,
                pricing: {
                    price: prevs.pricing.price,
                    onSale: prevs.pricing.onSale,
                    salePrice: prevs.pricing.salePrice
                },
                colors: prevs.colors,
                sizes: [...prevs.sizes, value],
                shipping: {
                    weight: prevs.shipping.weight
                }
            }
        });
        event.target.value = '';
    }
    const handleSizeDelete = (size) => {
        const index = product.colors.indexOf(size);
        if (index === -1) {
            alert(`This size isn't on the list`);
            return;
        }
        product.sizes.splice(index, 1);
        setProducts((prevs) => {
            return {
                name: prevs.name,
                description: prevs.description,
                pricing: {
                    price: prevs.pricing.price,
                    onSale: prevs.pricing.onSale,
                    salePrice: prevs.pricing.salePrice
                },
                colors: prevs.colors,
                sizes: [...product.sizes],
                shipping: {
                    weight: prevs.shipping.weight
                }
            }
        });
    }
    const [renderStock, setRenderStock] = useState(false);
    const renderStockHandler = () => {
        const name = product.name.length;
        const colorValue = product.colors.length;
        const sizesValue = product.sizes.length;
        if (name < 1, colorValue < 1, sizesValue < 1) {
            alert('To render stock the product must have a name, at lease one color, and at least one size');
            return;
        }
        setRenderStock(!renderStock);
    }
    const saveNew = () => {
        const name = product.name.length;
        const colorValue = product.colors.length;
        const sizesValue = product.sizes.length;
        if (name < 1, colorValue < 1, sizesValue < 1, product.pricing.price <= 0, images.length < 1) {
            alert('Please fill in all required feilds market with a star *');
            return;
        }
        if (stock.length < 1) {
            alert('Please render stock and fill in the values');
            return;
        }
        $.ajax({
            type: 'PUT',
            url: '/dashboard/products',
            data: {
                product: {
                    assets: {
                        Image: images[0],
                        gallery: images
                    },
                    pricing: {
                        price: product.pricing.price,
                        salePrice: product.pricing.salePrice,
                        onSale: product.pricing.onSale
                    },
                    name: product.name,
                    description: product.description,
                    sizes: product.sizes,
                    colors: product.colors,
                    shipping: {
                        weight: product.weight
                    }
                },
                stock
            },
            success: (response) => {
              alert(response);
              window.location.reload();
            },
            error: (error) => {
              alert(error.responseText);
            }
        });
    }
    const update = () => {

    }

    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>New Product</Typography>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={props.product ? update : saveNew} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>{props.product ? 'Update' : 'Save'}</Button>
            </Box>
            <hr />
            <UploadImages key='main' keyID='main' location='products' images={images} onUpload={newImageHandler} />
            <hr />
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <TextField sx={{ width: '100%' }} required id="name" label="Name" variant="standard" onChange={setProductHandler} value={product.name} />
                </Grid>
                <Grid item xs={11} md={3}>
                    <TextField sx={{ width: '100%' }} required type="number" id="price" label="Price" variant="standard" onChange={setProductHandler} value={product.pricing.price} />
                </Grid>
                <Grid item xs={1} md={1}>
                    <Tooltip title='On Sale ?'>
                        <Checkbox id='onSale' checked={product.pricing.onSale} onChange={setProductHandler} />
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%' }} required type="number" id="weight" label="Products Weight" variant="standard" onChange={setProductHandler} value={product.shipping.weight} />
                </Grid>
                {product.pricing.onSale && <Grid item xs={6}>
                    <TextField sx={{ width: '100%' }} required type="number" id="salePrice" label="Sale Price" variant="standard" onChange={setProductHandler} value={product.pricing.salePrice} />
                </Grid>}
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="standard"
                        value={product.description}
                        onChange={setProductHandler}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* colors  */}
                    <TextField sx={{ width: '100%' }} required id="colors" label="Colors" variant="standard" onKeyDown={setProductColorHandler} InputProps={{
                        endAdornment: product.colors.map((color) => {
                            return <Chip sx={{ backgroundColor: color, color: '#ffffff', m: '0.5rem' }} label={color} onDelete={() => { handleColorDelete(color) }} />
                        })
                    }} />
                </Grid>
                <Grid item xs={12}>
                    {/* sizes */}
                    <TextField sx={{ width: '100%' }} required id="sizes" label="Sizes" variant="standard" onKeyDown={setProductSizesHandler} InputProps={{
                        endAdornment: product.sizes.map((size) => {
                            return <Chip sx={{ m: '0.5rem' }} label={size} onDelete={() => { handleSizeDelete(size) }} />
                        })
                    }} />
                </Grid>
            </Grid>
            {renderStock && !props.product && <StockCard onChange={updateStock} sizes={product.sizes} colors={product.colors} name={product.name} stock={stock} />}
            {renderStock && props.product && <StockCard onChange={updateStock} product={props.product} stock={stock} />}
            <Button onClick={renderStockHandler} color='secondary' variant='outlined' sx={{ borderRadius: '50rem', m: '1%', width: '98%' }}>{renderStock ? 'Cancel Stock' : 'Load Stock'}</Button>
        </Paper>
    </Backdrop>
}
export default ProductDetailCard;