import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '../../UI/Dialog';
import ProductDetails from './ProductDetails';
import GradiantBackground from '../../Layout/GradiantBackground';

const ProductDialog = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button sx={{ borderRadius: '50rem', width: '90%', m: '5%' }} variant="contained" onClick={handleClickOpen} endIcon={<AddShoppingCartIcon />}> Add to Cart</Button>
            <Dialog open={open} handleClose={handleClose} title={props.product.name}>
                <ProductDetails handleClose={handleClose} setCart={props.setCart} product={props.product} stock={props.stock} />
            </Dialog>
        </div>
    );
}

export default ProductDialog;