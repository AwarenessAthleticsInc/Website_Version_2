import { Box } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = (props) => {
    const initialOptions = {
        "client-id": process.env.NODE_ENV === 'development' ? 'AU5x1CmyyI8AFq7JssxT4UpmDjj1T-SNzhsGkEUs0bpDl89lD3T0YpbzOsPSApY33U-Z1QoTjIpLR7Xm' : 'Aaw7unfKIH7zTVhX42PmqrmxkVXITXeQeBTqE3yZaed4ziMwTC-IY_IdMsfug39gUTic8JqC7hjPdHmo',
        currency: "CAD",
        intent: "capture",
    };
    return <Box sx={{ width: '97%', m: '0 0 0 3%' }}>
        <PayPalScriptProvider deferLoading={false} options={initialOptions}>
            <PayPalButtons forceReRender={[props.amount]} style={{
                shape: 'pill',
                color: 'blue',
                layout: 'horizontal',
                label: 'pay',
                height: 45
            }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{ "amount": { "currency_code": "CAD", "value": Number(props.amount) } }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(function (orderData) {
                        props.onComplete(orderData);  
                    });
                }}
                onError={(err) => {
                    console.log(err);
                }}
            />
        </PayPalScriptProvider>
    </Box>
}

export default PaypalButton;

