import $ from 'jquery';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Button } from '@mui/material';

const QtyInput = (props) => {
    const [qty, setQty] = useState(props.product.qty);
    const [change, setChange] = useState(false);
    const [oldQty, setOldQty] = useState();

    const updateQty = () => {
        const product = {
            id: props.product.id,
            price: props.product.price,
            size: props.product.size,
            color: props.product.color,
            qty: qty
        }
        $.ajax({
            type: "PUT",
            url: '/api/cart',
            data: product,
            success: function (data) {
                props.setCart(data);
                setChange(false);
            }
        });
    }
    const qtyHandler = (event) => {
        const value = event.target.value;
        setOldQty(qty);
        setQty(value);
        setChange(true);
    }

    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ display: 'inline', margin: '0' }}>QTY: </p>
        <input id={props.product.id}
            value={qty}
            onChange={qtyHandler}
            style={{ border: 'none', textAlign: 'center', width: '3rem' }}
        />
        {change && <Button color='error' onClick={()=> {setChange(false); setQty(oldQty)}} variant='text'>Cancel</Button>}
        {change && <Button onClick={updateQty} variant='text'>Confirm</Button>}
    </Box>
}
export default QtyInput;